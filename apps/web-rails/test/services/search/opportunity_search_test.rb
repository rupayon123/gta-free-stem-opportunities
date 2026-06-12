require "test_helper"

class Search::OpportunitySearchTest < ActiveSupport::TestCase
  test "filters by query and high school pathway" do
    robotics = create_opportunity(
      id: "robotics-volunteer",
      title: "Robotics Volunteer Lab",
      tags: [ "robotics", "volunteer", "teen" ],
      volunteer_hours_eligible: true,
      start_date: 3.days.from_now
    )
    create_opportunity(id: "art-club", title: "Art Club", tags: [ "art" ], start_date: 3.days.from_now)

    results = Search::OpportunitySearch.new({ query: "robotics", highSchool: true }).results

    assert_equal [ robotics ], results.to_a
  end

  test "filters by community focus" do
    black_focused = create_opportunity(
      id: "black-youth-stem",
      title: "Black Youth STEM Lab",
      community_focus: [ "Black-focused" ],
      start_date: 3.days.from_now
    )
    create_opportunity(id: "general-stem", title: "General STEM Lab", start_date: 3.days.from_now)

    results = Search::OpportunitySearch.new({ blackFocused: true }).results

    assert_equal [ black_focused ], results.to_a
  end

  private

  def create_opportunity(attributes = {})
    Opportunity.create!(
      {
        id: SecureRandom.hex(8),
        title: "STEM Club",
        organization: "Community Centre",
        description: "Hands-on learning.",
        category: "STEM",
        city: "Brampton",
        region: "Peel",
        age_min: 8,
        age_max: 18,
        cost: "Free to join",
        source_url: "https://example.com/#{SecureRandom.hex(3)}",
        status: "active"
      }.merge(attributes)
    )
  end
end
