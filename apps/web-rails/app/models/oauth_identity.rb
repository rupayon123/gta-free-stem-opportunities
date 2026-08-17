class OauthIdentity < ApplicationRecord
  PROVIDERS = %w[apple google microsoft].freeze

  belongs_to :user

  validates :provider, inclusion: { in: PROVIDERS }
  validates :uid, presence: true, uniqueness: { scope: :provider }
end
