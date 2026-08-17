module Api
  module V1
    class MissingOpportunitySubmissionsController < BaseController
      def create
        submission = MissingOpportunitySubmission.create!(submission_params.merge(user: current_user))
        render json: { data: { id: submission.id, status: submission.status } }, status: :created
      end

      private

      def submission_params
        params.require(:missing_opportunity_submission).permit(:title, :organization, :city, :region, :source_url, :contact_email, :notes)
      end
    end
  end
end
