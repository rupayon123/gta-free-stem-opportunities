class SourceCheck < ApplicationRecord
  validates :source_name, :source_url, :status, :checked_at, presence: true
end
