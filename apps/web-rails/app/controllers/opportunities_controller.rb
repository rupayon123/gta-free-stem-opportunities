class OpportunitiesController < ApplicationController
  def index
    @opportunities = Search::OpportunitySearch.new(search_params).results
    @selected = @opportunities.first
    @active_count = Opportunity.publicly_visible.count
    @last_checked = SourceCheck.last_successful_refresh_at || Opportunity.publicly_visible.maximum(:last_checked)
  end

  def show
    @opportunity = Opportunity.publicly_visible.find(params[:id])
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
