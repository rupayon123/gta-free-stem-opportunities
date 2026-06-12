class SavedOpportunity < ApplicationRecord
  belongs_to :user
  belongs_to :opportunity

  validates :opportunity_id, uniqueness: { scope: :user_id }
end
