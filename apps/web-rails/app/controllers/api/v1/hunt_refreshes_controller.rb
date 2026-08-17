module Api
  module V1
    class HuntRefreshesController < BaseController
      def create
        check = SourceCheck.create!(
          source_name: "iOS prioritized hunt refresh",
          source_url: "app://gta-free-stem/hunt-refresh",
          status: "queued",
          checked_at: Time.current,
          result: hunt_params.to_h
        )
        render json: { data: { id: check.id, status: check.status } }, status: :accepted
      end

      private

      def hunt_params
        params.fetch(:hunt, {}).permit(
          :query,
          :mode,
          :region,
          :city,
          :category,
          :age,
          :language,
          :latitude,
          :longitude,
          :distance_km,
          :sort
        )
      end
    end
  end
end
