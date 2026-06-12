class Feedback < ApplicationRecord
  self.table_name = "feedback"

  STATUSES = %w[new reviewed resolved archived].freeze

  belongs_to :user, optional: true
  belongs_to :opportunity, optional: true

  normalizes :email, with: ->(email) { email.to_s.strip.downcase.presence }

  validates :message, presence: true, length: { maximum: 4_000 }
  validates :status, inclusion: { in: STATUSES }
end
