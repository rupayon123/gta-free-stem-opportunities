class Organization < ApplicationRecord
  has_many :opportunities, foreign_key: :organization_record_id, dependent: :nullify, inverse_of: :organization_record

  normalizes :name, with: ->(name) { name.to_s.strip }
  normalizes :contact_email, with: ->(email) { email.to_s.strip.downcase.presence }

  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
