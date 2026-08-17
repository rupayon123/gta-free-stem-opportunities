class PagesController < ApplicationController
  def high_school
    @opportunities = Search::OpportunitySearch.new(search_params.merge(highSchool: true)).results
    render :opportunity_page
  end

  def volunteer_hours
    @title = "Volunteer Hours"
    @opportunities = Search::OpportunitySearch.new(search_params.merge(volunteerHours: true, highSchool: true)).results
    render :opportunity_page
  end

  def coop_shsm
    @title = "Co-op / SHSM"
    @opportunities = Search::OpportunitySearch.new(search_params.merge(coop: true, highSchool: true)).results
    render :opportunity_page
  end

  def mentorship
    @title = "Mentorship"
    @opportunities = Search::OpportunitySearch.new(search_params.merge(mentorship: true, highSchool: true)).results
    render :opportunity_page
  end

  def community_hosts
  end

  def accessibility_support
  end

  def feedback
  end

  def privacy
  end

  def terms
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
      :blackFocused,
      :girlsFocused,
      :indigenousFocused,
      :limit
    ).to_h
  end
end
