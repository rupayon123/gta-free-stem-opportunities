module Admin
  class OpportunitiesController < ApplicationController
    before_action :require_admin!

    def index
      @opportunities = Search::OpportunitySearch.new(search_params, admin: true).results
    end

    def update
      opportunity = Opportunity.find(params[:id])
      opportunity.update!(params.require(:opportunity).permit(:status, :category, :last_verified, :trusted_source))
      redirect_back fallback_location: admin_root_path, notice: "Opportunity updated."
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
