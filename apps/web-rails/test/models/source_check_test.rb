require "test_helper"

class SourceCheckTest < ActiveSupport::TestCase
  test "queued failed and unrelated checks cannot advance refresh time" do
    successful_at = 2.hours.ago
    SourceCheck.create!(source_name: "Legacy static opportunity import", source_url: "file://legacy-next-static", status: "ok", checked_at: successful_at)
    SourceCheck.create!(source_name: "Legacy static opportunity import", source_url: "file://legacy-next-static", status: "error", checked_at: 1.hour.ago)
    SourceCheck.create!(source_name: "iOS prioritized hunt refresh", source_url: "app://gta-free-stem/hunt-refresh", status: "queued", checked_at: Time.current)
    SourceCheck.create!(source_name: "Unrelated source check", source_url: "https://example.invalid", status: "ok", checked_at: Time.current)

    assert_in_delta successful_at.to_f, SourceCheck.last_successful_refresh_at.to_f, 0.001
  end

  test "refresh time is unknown before a successful import" do
    assert_nil SourceCheck.last_successful_refresh_at
  end
end
