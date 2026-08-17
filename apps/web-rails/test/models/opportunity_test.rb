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
        status: "active"
      }.merge(attributes)
    )
  end
end
