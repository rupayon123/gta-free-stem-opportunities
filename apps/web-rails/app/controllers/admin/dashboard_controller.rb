module Admin
  class DashboardController < ApplicationController
    before_action :require_admin!

    def index
      @needs_review = Opportunity.where(status: "needs_review").recent_first.limit(50)
      @expired = Opportunity.where(status: "expired").order(updated_at: :desc).limit(50)
      @feedback = Feedback.where(status: "new").order(created_at: :desc).limit(25)
      @missing_submissions = MissingOpportunitySubmission.where(status: %w[new reviewing]).order(created_at: :desc).limit(25)
    end
  end
end
