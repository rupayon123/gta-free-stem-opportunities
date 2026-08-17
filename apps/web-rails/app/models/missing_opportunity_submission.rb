class MissingOpportunitySubmission < ApplicationRecord
  STATUSES = %w[new reviewing approved rejected duplicate].freeze

  belongs_to :user, optional: true

  normalizes :contact_email, with: ->(email) { email.to_s.strip.downcase.presence }

  validates :title, presence: true
  validates :notes, presence: true, length: { maximum: 4_000 }
  validates :status, inclusion: { in: STATUSES }
end
