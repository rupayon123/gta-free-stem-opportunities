module Api
  module V1
    class FeedbackController < BaseController
      def create
        feedback = Feedback.create!(feedback_params.merge(user: current_user))
        render json: { data: { id: feedback.id, status: feedback.status } }, status: :created
      end

      private

      def feedback_params
        params.require(:feedback).permit(:opportunity_id, :name, :email, :message)
      end
    end
  end
end
