class Opportunity < ApplicationRecord
  STATUSES = %w[active expired needs_review hidden].freeze

  belongs_to :organization_record, class_name: "Organization", optional: true
  has_many :saved_opportunities, dependent: :destroy
  has_many :feedback, dependent: :nullify

  validates :title, :organization, :description, :category, :city, :region, :source_url, presence: true
  validates :status, inclusion: { in: STATUSES }
  validates :age_min, numericality: { greater_than_or_equal_to: 0 }
  validates :age_max, numericality: { greater_than_or_equal_to: 0, allow_nil: true }

  scope :not_hidden, -> { where.not(status: "hidden") }
  scope :public_status, -> { where(status: %w[active needs_review]) }
  scope :recent_first, -> { order(Arel.sql("COALESCE(start_date, deadline, end_date) ASC NULLS LAST"), :title) }
  scope :expired_by_date, ->(now = Time.current) {
    where("COALESCE(end_date, deadline, start_date) < ?", now.beginning_of_day)
  }
  scope :publicly_visible, ->(now = Time.current) {
    public_status
      .where("COALESCE(end_date, deadline, start_date) IS NULL OR COALESCE(end_date, deadline, start_date) >= ?", now.beginning_of_day)
  }

  before_validation :normalize_arrays
  before_save :refresh_coordinates, if: -> { has_attribute?(:coordinates) && (will_save_change_to_latitude? || will_save_change_to_longitude?) }

  def date_expired?(now = Time.current)
    visible_until = end_date || deadline || start_date
    visible_until.present? && visible_until.end_of_day < now
  end

  def computed_status(now = Time.current)
    return "hidden" if status == "hidden"
    return "expired" if status == "expired" || date_expired?(now)

    status
  end

  def free_only?
    cost.to_s.downcase.include?("free") && !paid_position?
  end

  def high_school?
    volunteer_hours_eligible? || coop_eligible? || tags.any? { |tag| tag.match?(/teen|high school|shsm|mentor|leadership|volunteer/i) }
  end

  def as_api_json
    {
      id: id,
      title: title,
      organization: organization,
      provider: provider,
      description: description,
      summary: summary,
      type: opportunity_type,
      category: category,
      categories: categories,
      communityFocus: community_focus,
      city: city,
      region: region,
      address: address,
      latitude: latitude&.to_f,
      longitude: longitude&.to_f,
      virtual: virtual,
      startDate: start_date&.iso8601,
      endDate: end_date&.iso8601,
      deadline: deadline&.iso8601,
      ageMin: age_min,
      ageMax: age_max,
      grades: grades,
      language: language,
      cost: cost,
      sourceUrl: source_url,
      lastChecked: last_checked&.iso8601,
      lastSeen: last_seen&.iso8601,
      status: computed_status,
      accessibility: accessibility,
      equipment: equipment,
      food: food,
      capacity: capacity,
      commitment: commitment,
      registrationUrl: registration_url || source_url,
      providerContact: provider_contact,
      freeStatusProof: free_status_proof,
      lastVerified: last_verified&.iso8601,
      trustedSource: trusted_source,
      volunteerHoursEligible: volunteer_hours_eligible,
      coopEligible: coop_eligible,
      paidPosition: paid_position,
      distanceKm: distance_km,
      isNewFind: status == "needs_review",
      sourceConfidence: trusted_source ? "trusted" : "source-needs-checking",
      tags: tags,
      sources: sources
    }
  end

  private

  def normalize_arrays
    self.categories = Array(categories).compact_blank
    self.community_focus = Array(community_focus).compact_blank
    self.grades = Array(grades).compact_blank
    self.language = Array(language).compact_blank.presence || [ "en" ]
    self.accessibility = Array(accessibility).compact_blank
    self.tags = Array(tags).compact_blank.map(&:downcase).uniq
  end

  def refresh_coordinates
    return if latitude.blank? || longitude.blank?

    self.coordinates = "POINT(#{longitude} #{latitude})"
  rescue ActiveModel::MissingAttributeError, NoMethodError
    nil
  end

  def distance_km
    meters = self[:distance_meters] if has_attribute?(:distance_meters)
    return if meters.blank?

    (meters.to_f / 1_000).round(1)
  rescue ActiveModel::MissingAttributeError
    nil
  end
end
