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

  test "can hide new finds when requested" do
    active = create_opportunity(id: "active-stem", title: "Active STEM Lab", status: "active", start_date: 3.days.from_now)
    create_opportunity(id: "new-find-stem", title: "New STEM Find", status: "needs_review", start_date: 3.days.from_now)

    results = Search::OpportunitySearch.new({ includeNewFinds: false }).results

    assert_equal [ active ], results.to_a
  end

  test "public callers cannot opt unreviewed finds into search" do
    active = create_opportunity(id: "public-approved")
    create_opportunity(id: "private-review", status: "needs_review")

    [ {}, { includeNewFinds: true }, { includeNewFinds: false } ].each do |params|
      assert_equal [ active ], Search::OpportunitySearch.new(params).results.to_a
    end
    assert_equal 2, Search::OpportunitySearch.new({}, admin: true).results.count
  end

  test "high school search matches the inclusive fourteen to seventeen age overlap" do
    teen_stem = create_opportunity(id: "teen-stem-no-pathway-tags", age_min: 14, age_max: 17, tags: [])
    lower_boundary = create_opportunity(id: "ages-up-to-fourteen", age_min: 8, age_max: 14)
    upper_boundary = create_opportunity(id: "ages-seventeen-plus", age_min: 17, age_max: nil)
    create_opportunity(id: "adult-only-volunteer", age_min: 18, age_max: nil, volunteer_hours_eligible: true, tags: [ "volunteer", "mentor", "teen" ])
    create_opportunity(id: "children-only-coop-tag", age_min: 8, age_max: 13, coop_eligible: true, tags: [ "shsm" ])

    results = Search::OpportunitySearch.new({ highSchool: true }).results

    assert_equal [ teen_stem.id, lower_boundary.id, upper_boundary.id ].sort, results.pluck(:id).sort
    assert_equal 5, Search::OpportunitySearch.new.results.count
    assert_equal [ teen_stem.id, upper_boundary.id ].sort, Search::OpportunitySearch.new({ highSchool: true, age: 17 }).results.pluck(:id).sort
  end

  test "filters and sorts by distance" do
    nearby = create_opportunity(
      id: "nearby-stem",
      title: "Nearby STEM Lab",
      latitude: 43.6532,
      longitude: -79.3832,
      start_date: 5.days.from_now
    )
    create_opportunity(
      id: "far-stem",
      title: "Far STEM Lab",
      latitude: 43.8971,
      longitude: -78.8658,
      start_date: 2.days.from_now
    )

    results = Search::OpportunitySearch.new({
      latitude: 43.6532,
      longitude: -79.3832,
      distanceKm: 10,
      sort: "distance"
    }).results

    assert_equal [ nearby ], results.to_a
    assert_in_delta 0, results.first.as_api_json[:distanceKm], 0.1
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
        status: "active",
        start_date: 3.days.from_now,
        last_checked: Time.current.utc.to_date
      }.merge(attributes)
    )
  end
end
