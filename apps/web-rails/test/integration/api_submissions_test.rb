require "test_helper"

class ApiSubmissionsTest < ActionDispatch::IntegrationTest
  test "accepts public feedback" do
    assert_difference "Feedback.count", 1 do
      post api_v1_feedback_index_path,
        params: { feedback: { name: "Parent", email: "parent@example.com", message: "Please add more York programs." } },
        as: :json
    end

    assert_response :created
    assert_equal "new", Feedback.last.status
  end

  test "accepts missing opportunity submissions" do
    assert_difference "MissingOpportunitySubmission.count", 1 do
      post api_v1_missing_opportunity_submissions_path,
        params: {
          missing_opportunity_submission: {
            title: "Library STEM Night",
            organization: "Local Library",
            city: "Markham",
            source_url: "https://example.com",
            notes: "Free weekly program."
          }
        },
        as: :json
    end

    assert_response :created
    assert_equal "new", MissingOpportunitySubmission.last.status
  end

  test "reports app hunt refresh unavailable without storing submitted hunt data" do
    assert_no_difference "SourceCheck.count" do
      post api_v1_hunt_refresh_path,
        params: {
          hunt: {
            query: "robotics",
            city: "Toronto",
            latitude: "43.6532",
            longitude: "-79.3832",
            distance_km: "25",
            sort: "distance"
          }
        },
        as: :json
    end

    assert_response :service_unavailable
    assert_equal "unavailable", response.parsed_body.dig("data", "status")
    assert_match /scheduled published-feed refreshes/, response.parsed_body.fetch("error")
    assert_nil response.parsed_body.dig("data", "id")
    refute_includes response.body, "robotics"
    refute_includes response.body, "43.6532"
    refute_includes response.body, "-79.3832"
  end

  test "repeated app hunt refresh requests do not create source checks" do
    assert_no_difference "SourceCheck.count" do
      3.times do
        post api_v1_hunt_refresh_path,
          params: { hunt: { query: "robotics", city: "Toronto", latitude: "43.6532", longitude: "-79.3832" } },
          as: :json

        assert_response :service_unavailable
        assert_equal "unavailable", response.parsed_body.dig("data", "status")
      end
    end
  end
end
