module Api
  module V1
    class AnnouncementsController < BaseController
      def index
        render json: { data: Announcement.active.map { |announcement| announcement.slice(:id, :title, :message, :status, :created_at) } }
      end
    end
  end
end
