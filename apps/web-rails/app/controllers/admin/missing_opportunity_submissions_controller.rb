module Admin
  class MissingOpportunitySubmissionsController < ApplicationController
    before_action :require_admin!

    def index
      @missing_submissions = MissingOpportunitySubmission.order(created_at: :desc).limit(100)
    end

    def update
      submission = MissingOpportunitySubmission.find(params[:id])
      submission.update!(params.require(:missing_opportunity_submission).permit(:status))
      redirect_back fallback_location: admin_root_path, notice: "Submission updated."
    end
  end
end
