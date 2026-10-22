require "test_helper"
require "tmpdir"

class Importers::LegacyOpportunityImporterTest < ActiveSupport::TestCase
  test "missing required inputs roll back rows and do not advance the successful refresh timestamp" do
    baseline = record_successful_refresh

    [ :library, :review ].each do |missing_input|
      with_input_files(library: [ opportunity_row ], review: []) do |library_file, review_file|
        missing_file = missing_input == :library ? library_file : review_file
        missing_file.delete

        assert_no_difference [ "Opportunity.count", "Organization.count", "SourceCheck.count" ] do
          error = assert_raises(RuntimeError) { importer(library_file, review_file).call }
          assert_match /Required opportunity input is missing/, error.message
        end

        assert_equal baseline, SourceCheck.last_successful_refresh_at
      end
    end
  end

  test "an invalid later row rolls back earlier updates and does not record a successful refresh" do
    original = opportunity_row("id" => "atomic-original", "title" => "Original title")

    with_input_files(library: [ original ], review: []) do |library_file, review_file|
      importer(library_file, review_file).call
      baseline = SourceCheck.last_successful_refresh_at
      write_input(library_file, "generatedLibraryOpportunities", [
        original.merge("title" => "Uncommitted change"),
        opportunity_row("id" => "invalid-later-row", "sourceUrl" => nil, "organization" => "New provider")
      ])

      assert_no_difference [ "Opportunity.count", "Organization.count", "SourceCheck.count" ] do
        assert_raises(ActiveRecord::RecordInvalid) { importer(library_file, review_file).call }
      end

      assert_equal "Original title", Opportunity.find("atomic-original").title
      assert_not Opportunity.exists?("invalid-later-row")
      assert_equal baseline, SourceCheck.last_successful_refresh_at
    end
  end

  test "hidden moderation survives reimport while source fields update" do
    row = opportunity_row("id" => "moderated-hidden")

    with_input_files(library: [ row ], review: []) do |library_file, review_file|
      importer(library_file, review_file).call
      Opportunity.find(row.fetch("id")).update!(status: "hidden")
      write_input(library_file, "generatedLibraryOpportunities", [ row.merge("title" => "Updated source title", "status" => "active") ])

      importer(library_file, review_file).call

      opportunity = Opportunity.find(row.fetch("id"))
      assert_equal "hidden", opportunity.status
      assert_equal "Updated source title", opportunity.title
    end
  end

  test "review input cannot publish a candidate marked active" do
    row = opportunity_row("id" => "review-candidate", "status" => "active")

    with_input_files(library: [], review: [ row ]) do |library_file, review_file|
      result = importer(library_file, review_file).call

      assert_equal({ imported: 0, review_candidates: 1 }, result)
      assert_equal "needs_review", Opportunity.find(row.fetch("id")).status
      assert_not_includes Opportunity.publicly_visible.pluck(:id), row.fetch("id")
    end
  end

  test "past review candidates remain quarantined instead of entering the approved expired archive" do
    row = opportunity_row("id" => "past-review-candidate", "status" => "active", "startDate" => 3.days.ago.iso8601)

    with_input_files(library: [], review: [ row ]) do |library_file, review_file|
      importer(library_file, review_file).call
      opportunity = Opportunity.find(row.fetch("id"))

      assert_equal "needs_review", opportunity.status
      assert_equal "expired", opportunity.computed_status
      assert_not_includes Opportunity.publicly_visible.pluck(:id), opportunity.id
    end
  end

  test "date-only events remain open through their Toronto calendar day" do
    Time.use_zone("America/Toronto") do
      travel_to Time.zone.local(2026, 10, 22, 12) do
        row = opportunity_row("id" => "toronto-date-only", "startDate" => "2026-10-23", "deadline" => "2026-10-23")

        with_input_files(library: [ row ], review: []) do |library_file, review_file|
          importer(library_file, review_file).call
          opportunity = Opportunity.find(row.fetch("id"))
          cutoff = Time.zone.local(2026, 10, 23).end_of_day.change(usec: 999999)

          assert_equal Time.zone.local(2026, 10, 23), opportunity.start_date
          assert_equal opportunity.start_date, opportunity.deadline
          assert_equal cutoff, opportunity.end_date
          assert_not opportunity.date_expired?(cutoff)
          assert opportunity.date_expired?(cutoff + 1.second)
        end
      end
    end
  end

  test "date-only registration deadlines use Toronto end of day while exact timestamps are preserved" do
    Time.use_zone("America/Toronto") do
      travel_to Time.zone.local(2026, 10, 22, 12) do
        date_only = opportunity_row("id" => "toronto-registration", "startDate" => "2026-10-25", "deadline" => "2026-10-23")
        exact = opportunity_row(
          "id" => "exact-timestamps",
          "startDate" => "2026-10-24T14:30:00Z",
          "endDate" => "2026-10-24T16:15:00Z",
          "deadline" => "2026-10-23T18:45:00Z"
        )

        with_input_files(library: [ date_only, exact ], review: []) do |library_file, review_file|
          importer(library_file, review_file).call
          registration = Opportunity.find(date_only.fetch("id"))
          event = Opportunity.find(exact.fetch("id"))

          assert_equal Time.zone.local(2026, 10, 23).end_of_day.change(usec: 999999), registration.deadline
          assert_equal Time.iso8601(exact.fetch("startDate")), event.start_date
          assert_equal Time.iso8601(exact.fetch("endDate")), event.end_date
          assert_equal Time.iso8601(exact.fetch("deadline")), event.deadline
          assert_not event.date_expired?(event.deadline)
          assert event.date_expired?(event.deadline + 1.second)
        end
      end
    end
  end

  private

  def importer(library_file, review_file)
    Importers::LegacyOpportunityImporter.new(library_file: library_file, review_file: review_file)
  end

  def with_input_files(library:, review:)
    Dir.mktmpdir("legacy-opportunity-importer") do |directory|
      library_file = Pathname(directory).join("library.ts")
      review_file = Pathname(directory).join("review.ts")
      write_input(library_file, "generatedLibraryOpportunities", library)
      write_input(review_file, "generatedDiscoveryReviewCandidates", review)
      yield library_file, review_file
    end
  end

  def write_input(path, constant_name, rows)
    path.write("export const #{constant_name} = #{rows.to_json} satisfies readonly Opportunity[];\n")
  end

  def record_successful_refresh
    SourceCheck.create!(
      source_name: "Legacy static opportunity import",
      source_url: "file://legacy-next-static",
      status: "ok",
      checked_at: 2.days.ago,
      result: { imported: 1, review_candidates: 0 }
    )
    SourceCheck.last_successful_refresh_at
  end

  def opportunity_row(attributes = {})
    {
      "id" => "import-#{SecureRandom.hex(6)}",
      "title" => "Library Robotics Club",
      "organization" => "Public Library",
      "description" => "Build robots and learn teamwork.",
      "category" => "STEM",
      "city" => "Toronto",
      "region" => "Toronto",
      "sourceUrl" => "https://example.invalid/robotics",
      "status" => "active",
      "startDate" => 3.days.from_now.iso8601,
      "lastChecked" => Time.current.utc.to_date.iso8601
    }.merge(attributes)
  end
end
