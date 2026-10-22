class SourceCheck < ApplicationRecord
  validates :source_name, :source_url, :status, :checked_at, presence: true

  # Queued requests and failed checks are not evidence of refreshed data.
  scope :successful_imports, -> { where(status: "ok", source_name: "Legacy static opportunity import") }

  def self.last_successful_refresh_at
    successful_imports.maximum(:checked_at)
  end
end
