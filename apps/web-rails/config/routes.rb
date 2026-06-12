Rails.application.routes.draw do
  root "home#index"

  resources :opportunities, only: %i[index show]

  get "high-school", to: "pages#high_school", as: :high_school
  get "volunteer-hours", to: "pages#volunteer_hours", as: :volunteer_hours
  get "coop-shsm", to: "pages#coop_shsm", as: :coop_shsm
  get "mentorship", to: "pages#mentorship", as: :mentorship
  get "community-hosts", to: "pages#community_hosts", as: :community_hosts
  get "accessibility-support", to: "pages#accessibility_support", as: :accessibility_support
  get "feedback", to: "pages#feedback", as: :feedback_page
  get "privacy", to: "pages#privacy", as: :privacy
  get "terms", to: "pages#terms", as: :terms

  namespace :admin do
    root "dashboard#index"
    resources :opportunities, only: %i[index update]
    resources :feedback, only: %i[index update]
    resources :missing_opportunity_submissions, only: %i[index update]
  end

  namespace :api do
    namespace :v1 do
      resources :opportunities, only: %i[index show]
      resources :announcements, only: %i[index]
      resources :feedback, only: %i[create]
      resources :missing_opportunity_submissions, only: %i[create]
      resources :saved_opportunities, only: %i[index create destroy], param: :opportunity_id
      resource :account, only: %i[destroy]
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
end
