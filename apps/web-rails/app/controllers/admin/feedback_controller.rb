module Admin
  class FeedbackController < ApplicationController
    before_action :require_admin!

    def index
      @feedback = Feedback.order(created_at: :desc).limit(100)
    end

    def update
      item = Feedback.find(params[:id])
      item.update!(params.require(:feedback).permit(:status))
      redirect_back fallback_location: admin_root_path, notice: "Feedback updated."
    end
  end
end
