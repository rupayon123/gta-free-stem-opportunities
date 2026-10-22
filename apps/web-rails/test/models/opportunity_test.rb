require "test_helper"

class OpportunityTest < ActiveSupport::TestCase
  test "public search hides expired listings but keeps records" do
    active = create_opportunity(id: "active-one", start_date: 2.days.from_now, status: "active")
    expired = create_opportunity(id: "expired-one", start_date: 2.days.ago, status: "active")

    assert_includes Opportunity.publicly_visible, active
    assert_not_includes Opportunity.publicly_visible, expired
    assert_equal "expired", expired.computed_status
  end

  test "free only rejects paid positions" do
    opportunity = create_opportunity(id: "free-role", cost: "Free to join", paid_position: false)
    paid = create_opportunity(id: "paid-role", cost: "Free to join", paid_position: true)

    assert opportunity.free_only?
    assert_not paid.free_only?
  end

  test "public search excludes unreviewed undated and stale records" do
    active = create_opportunity(id: "verified-current")
    pending = create_opportunity(id: "pending-current", status: "needs_review")
    undated = create_opportunity(id: "undated-current", start_date: nil)
    stale = create_opportunity(id: "stale-current", last_checked: 15.days.ago.to_date)
    unchecked = create_opportunity(id: "unchecked-current", last_checked: nil)

    assert_includes Opportunity.publicly_visible, active
    [ pending, undated, stale, unchecked ].each { |record| assert_not_includes Opportunity.publicly_visible, record }
    assert_equal "needs_review", stale.computed_status
    assert_equal "needs_review", unchecked.computed_status
  end

  test "exact event end and registration cutoff are enforced" do
    ended = create_opportunity(id: "ended-now", start_date: 2.hours.ago, end_date: 1.hour.ago)
    closed = create_opportunity(id: "registration-closed", deadline: 1.hour.ago)
    ongoing = create_opportunity(id: "ongoing-drop-in", start_date: 1.hour.ago, deadline: 1.hour.ago, end_date: 1.hour.from_now)
    ongoing.update!(deadline: ongoing.start_date)

    [ ended, closed ].each do |record|
      assert_not_includes Opportunity.publicly_visible, record
      assert_equal "expired", record.computed_status
    end
    assert_includes Opportunity.publicly_visible, ongoing
  end

  test "verification remains current through the fourteenth UTC day" do
    now = Time.utc(2026, 10, 22, 23, 59, 59)
    current = create_opportunity(id: "fourteen-days", start_date: now + 2.days, last_checked: Date.new(2026, 10, 8))

    assert_not current.verification_stale?(now)
    assert_includes Opportunity.publicly_visible(now), current
    assert current.verification_stale?(now + 2.seconds)
    assert_not_includes Opportunity.publicly_visible(now + 2.seconds), current
  end

  test "high school classification requires age overlap rather than pathway tags" do
    assert create_opportunity(age_min: 14, age_max: 17, tags: []).high_school?
    assert create_opportunity(age_min: 8, age_max: 14).high_school?
    assert create_opportunity(age_min: 17, age_max: nil).high_school?
    assert_not create_opportunity(age_min: 18, age_max: nil, volunteer_hours_eligible: true, tags: [ "mentor", "teen" ]).high_school?
    assert_not create_opportunity(age_min: 8, age_max: 13, coop_eligible: true, tags: [ "shsm" ]).high_school?
  end

  private

  def create_opportunity(attributes = {})
    Opportunity.create!(
      {
        id: SecureRandom.hex(8),
        title: "Robotics Club",
        organization: "Public Library",
        description: "Build robots and learn teamwork.",
        category: "Coding & Robotics",
        city: "Toronto",
        region: "Toronto",
        age_min: 10,
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
