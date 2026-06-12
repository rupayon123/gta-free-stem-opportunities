class Announcement < ApplicationRecord
  STATUSES = %w[active archived].freeze

  validates :title, :message, presence: true
  validates :status, inclusion: { in: STATUSES }

  scope :active, -> { where(status: "active").order(created_at: :desc) }
end
