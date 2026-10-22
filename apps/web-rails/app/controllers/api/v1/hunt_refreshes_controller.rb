module Api
  module V1
    class HuntRefreshesController < BaseController
      def create
        render json: {
          data: { status: "unavailable" },
          error: "On-demand hunt refresh is unavailable. Opportunities are updated through scheduled published-feed refreshes."
        }, status: :service_unavailable
      end
    end
  end
end
