class User < ApplicationRecord
  ROLES = %w[parent student admin].freeze

  has_many :oauth_identities, dependent: :destroy
  has_many :saved_opportunities, dependent: :destroy
  has_many :saved_public_opportunities, through: :saved_opportunities, source: :opportunity
  has_many :feedback, dependent: :nullify
  has_many :missing_opportunity_submissions, dependent: :nullify

  normalizes :email, with: ->(email) { email.to_s.strip.downcase }

  validates :name, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :role, inclusion: { in: ROLES }

  scope :active, -> { where(deleted_at: nil) }

  def admin?
    role == "admin"
  end

  def parent?
    role == "parent"
  end

  def student?
    role == "student"
  end

  def issue_api_token!
    token = SecureRandom.urlsafe_base64(32)
    update!(api_token_digest: self.class.digest_token(token))
    token
  end

  def soft_delete!
    transaction do
      oauth_identities.destroy_all
      saved_opportunities.destroy_all
      update!(
        deleted_at: Time.current,
        email: "deleted-user-#{id}@example.invalid",
        name: "Deleted user",
        api_token_digest: nil,
        verified: false
      )
    end
  end

  def self.find_by_api_token(token)
    return if token.blank?

    active.find_by(api_token_digest: digest_token(token))
  end

  def self.digest_token(token)
    Digest::SHA256.hexdigest(token.to_s)
  end
end
