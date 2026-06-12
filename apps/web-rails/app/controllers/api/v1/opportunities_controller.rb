module Api
  module V1
    class OpportunitiesController < BaseController
      def index
        opportunities = Search::OpportunitySearch.new(search_params).results
        render json: {
          data: opportunities.map(&:as_api_json),
          meta: {
            activeCount: Opportunity.publicly_visible.count,
            lastUpdated: SourceCheck.order(checked_at: :desc).pick(:checked_at)&.iso8601
          }
        }
      end

      def show
        opportunity = Opportunity.publicly_visible.find(params[:id])
        render json: { data: opportunity.as_api_json }
      end

      private

      def search_params
        params.permit(
          :query,
          :region,
          :city,
          :category,
          :age,
          :language,
          :latitude,
          :longitude,
          :distanceKm,
          :highSchool,
          :volunteerHours,
          :coop,
          :mentorship,
          :leadership,
          :blackFocused,
          :girlsFocused,
          :indigenousFocused,
          :limit
        )
      end
    end
  end
end
