require "test_helper"

class ApiPublicationTest < ActionDispatch::IntegrationTest
  DUMMY_TOKEN = "publication-regression-test-token".freeze

  setup do
    @user = User.create!(
      name: "Publication Test Parent",
      email: "publication-test-#{SecureRandom.hex(6)}@example.invalid",
      role: "parent",
      api_token_digest: User.digest_token(DUMMY_TOKEN)
    )
  end

  test "public list excludes pending and unavailable records even when new finds are requested" do
    visible = create_opportunity(id: "api-public-visible")
    create_opportunity(id: "api-public-pending", status: "needs_review")
    create_opportunity(id: "api-public-hidden", status: "hidden")
    create_opportunity(id: "api-public-expired", start_date: 1.day.ago)
    create_opportunity(id: "api-public-stale", last_checked: Time.current.utc.to_date - 15)
    create_opportunity(id: "api-public-undated", start_date: nil)

    get api_v1_opportunities_path, params: { includeNewFinds: true }, as: :json

    assert_response :success
    assert_equal [ visible.id ], response.parsed_body.fetch("data").map { |row| row.fetch("id") }
    assert_equal 1, response.parsed_body.dig("meta", "activeCount")
  end

  test "public detail requires a currently visible opportunity" do
    visible = create_opportunity(id: "api-detail-visible")
    unavailable = [
      create_opportunity(id: "api-detail-pending", status: "needs_review"),
      create_opportunity(id: "api-detail-hidden", status: "hidden"),
      create_opportunity(id: "api-detail-expired", start_date: 1.day.ago),
      create_opportunity(id: "api-detail-stale", last_checked: Time.current.utc.to_date - 15),
      create_opportunity(id: "api-detail-undated", start_date: nil)
    ]

    get api_v1_opportunity_path(visible), as: :json
    assert_response :success
    assert_equal visible.id, response.parsed_body.dig("data", "id")

    unavailable.each do |opportunity|
      get api_v1_opportunity_path(opportunity), as: :json
      assert_response :not_found
    end
  end

  test "new saves require a currently visible opportunity" do
    visible = create_opportunity(id: "api-save-visible")
    unavailable = [
      create_opportunity(id: "api-save-pending", status: "needs_review"),
      create_opportunity(id: "api-save-hidden", status: "hidden"),
      create_opportunity(id: "api-save-expired", start_date: 1.day.ago),
      create_opportunity(id: "api-save-stale", last_checked: Time.current.utc.to_date - 15),
      create_opportunity(id: "api-save-undated", start_date: nil)
    ]

    assert_difference "@user.saved_opportunities.count", 1 do
      post api_v1_saved_opportunities_path,
        params: { opportunity_id: visible.id }, headers: authorization_headers, as: :json
    end
    assert_response :created
    assert_equal visible.id, response.parsed_body.dig("data", "opportunityId")

    unavailable.each do |opportunity|
      assert_no_difference "@user.saved_opportunities.count" do
        post api_v1_saved_opportunities_path,
          params: { opportunity_id: opportunity.id }, headers: authorization_headers, as: :json
      end
      assert_response :not_found
    end
  end

  test "saved list hides withdrawn and pending opportunities while preserving expired history" do
    visible = create_opportunity(id: "api-saved-visible")
    withdrawn = create_opportunity(id: "api-saved-withdrawn")
    pending = create_opportunity(id: "api-saved-pending")
    expired = create_opportunity(id: "api-saved-expired")
    [ visible, withdrawn, pending, expired ].each do |opportunity|
      @user.saved_opportunities.create!(opportunity: opportunity)
    end
    withdrawn.update!(status: "hidden")
    pending.update!(status: "needs_review", start_date: 1.day.ago)
    expired.update!(status: "expired", start_date: 1.day.ago)

    assert_no_difference "@user.saved_opportunities.count" do
      get api_v1_saved_opportunities_path, headers: authorization_headers, as: :json
    end

    assert_response :success
    rows = response.parsed_body.fetch("data")
    assert_equal [ visible.id, expired.id ].sort, rows.map { |row| row.fetch("id") }.sort
    visible_row = rows.find { |row| row.fetch("id") == visible.id }
    expired_row = rows.find { |row| row.fetch("id") == expired.id }
    assert_equal "current", visible_row.fetch("currentPublicationState")
    assert_equal false, visible_row.fetch("archived")
    assert_equal false, visible_row.fetch("requiresVerification")
    assert_equal "expired", expired_row.fetch("status")
    assert_equal "expired", expired_row.fetch("currentPublicationState")
    assert_equal true, expired_row.fetch("archived")
    assert_equal false, expired_row.fetch("requiresVerification")
    assert rows.all? { |row| row.fetch("savedAt").present? }
  end

  test "approved saved history requiring verification retains full IDs and remains removable" do
    stale = create_opportunity(id: "api-saved-stale-approved")
    undated = create_opportunity(id: "api-saved-undated-approved")
    unchecked = create_opportunity(id: "api-saved-unchecked-approved")
    pending = create_opportunity(id: "api-saved-stale-pending")
    [ stale, undated, unchecked, pending ].each do |opportunity|
      @user.saved_opportunities.create!(opportunity: opportunity)
    end
    stale.update!(last_checked: Time.current.utc.to_date - 15)
    undated.update!(start_date: nil)
    unchecked.update!(last_checked: nil)
    pending.update!(status: "needs_review", last_checked: Time.current.utc.to_date - 15)

    assert_no_difference "@user.saved_opportunities.count" do
      get api_v1_saved_opportunities_path, headers: authorization_headers, as: :json
    end

    assert_response :success
    rows = response.parsed_body.fetch("data")
    assert_equal [ stale.id, undated.id, unchecked.id ].sort, rows.map { |row| row.fetch("id") }.sort
    rows.each do |row|
      assert_equal "verification_required", row.fetch("currentPublicationState")
      assert_equal true, row.fetch("archived")
      assert_equal true, row.fetch("requiresVerification")
      assert row.fetch("savedAt").present?
    end
    assert_equal "needs_review", rows.find { |row| row.fetch("id") == stale.id }.fetch("status")

    assert_difference "@user.saved_opportunities.count", -1 do
      delete api_v1_saved_opportunity_path(stale.id), headers: authorization_headers, as: :json
    end

    assert_response :success
    assert_equal stale.id, response.parsed_body.dig("data", "opportunityId")
    assert_equal false, response.parsed_body.dig("data", "saved")
    assert_not @user.saved_opportunities.exists?(opportunity_id: stale.id)
  end

  test "expired saved history retains its expiry state when verification is also stale" do
    expired = create_opportunity(status: "expired", start_date: 1.day.ago, last_checked: Time.current.utc.to_date - 15)
    @user.saved_opportunities.create!(opportunity: expired)

    get api_v1_saved_opportunities_path, headers: authorization_headers, as: :json

    assert_response :success
    row = response.parsed_body.fetch("data").sole
    assert_equal expired.id, row.fetch("id")
    assert_equal "expired", row.fetch("currentPublicationState")
    assert_equal true, row.fetch("archived")
    assert_equal true, row.fetch("requiresVerification")
  end

  private

  def authorization_headers
    { "Authorization" => "Bearer #{DUMMY_TOKEN}" }
  end

  def create_opportunity(attributes = {})
    Opportunity.create!(
      {
        id: SecureRandom.hex(8),
        title: "Public Library STEM Club",
        organization: "Public Library",
        description: "Hands-on STEM learning.",
        category: "STEM",
        city: "Toronto",
        region: "Toronto",
        age_min: 8,
        age_max: 18,
        cost: "Free to join",
        source_url: "https://example.invalid/#{SecureRandom.hex(3)}",
        status: "active",
        start_date: 3.days.from_now,
        last_checked: Time.current.utc.to_date
      }.merge(attributes)
    )
  end
end
