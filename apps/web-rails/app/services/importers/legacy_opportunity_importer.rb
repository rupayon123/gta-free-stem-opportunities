module Importers
  class LegacyOpportunityImporter
    LIBRARY_FILE = Rails.root.join("../../lib/generatedLibraryOpportunities.ts").expand_path
    REVIEW_FILE = Rails.root.join("../../lib/generatedDiscoveryReview.ts").expand_path

    def initialize(library_file: LIBRARY_FILE, review_file: REVIEW_FILE)
      @library_file = Pathname(library_file)
      @review_file = Pathname(review_file)
    end

    def call
      imported = import_file(@library_file, "generatedLibraryOpportunities")
      reviewed = import_file(@review_file, "generatedDiscoveryReviewCandidates")
      expire_past_opportunities
      SourceCheck.create!(
        source_name: "Legacy static opportunity import",
        source_url: "file://legacy-next-static",
        status: "ok",
        checked_at: Time.current,
        result: { imported: imported, review_candidates: reviewed }
      )
      { imported: imported, review_candidates: reviewed }
    end

    private

    def import_file(path, constant_name)
      return 0 unless path.exist?

      extract_array(path.read, constant_name).sum do |raw|
        import_one(raw)
        1
      rescue ActiveRecord::RecordInvalid => error
        SourceCheck.create!(
          source_name: "Legacy import error",
          source_url: raw["sourceUrl"].presence || path.to_s,
          status: "error",
          checked_at: Time.current,
          warning: error.message,
          result: raw
        )
        0
      end
    end

    def extract_array(text, constant_name)
      match = text.match(/export const #{Regexp.escape(constant_name)} = (\[.*?\])\s+satisfies/m)
      JSON.parse(match[1])
    rescue NoMethodError, JSON::ParserError => error
      raise "Could not parse #{constant_name}: #{error.message}"
    end

    def import_one(raw)
      organization = Organization.find_or_create_by!(name: raw["organization"].presence || raw["provider"].presence || "Community provider")
      attrs = map_attributes(raw).merge(organization_record: organization)
      Opportunity.find_or_initialize_by(id: raw.fetch("id")).tap do |opportunity|
        opportunity.assign_attributes(attrs)
        opportunity.save!
      end
    end

    def map_attributes(raw)
      {
        title: raw["title"],
        organization: raw["organization"].presence || raw["provider"].presence || "Community provider",
        provider: raw["provider"].presence || raw["organization"],
        description: raw["description"].presence || raw["summary"].presence || raw["title"],
        summary: raw["summary"].presence || raw["description"],
        opportunity_type: raw["type"].presence || raw["opportunityType"],
        category: raw["category"].presence || "STEM",
        categories: Array(raw["categories"].presence || raw["category"]).compact,
        community_focus: Array(raw["communityFocus"].presence || "Open to all").compact,
        city: raw["city"].presence || "GTA",
        region: raw["region"].presence || "Toronto",
        address: raw["address"],
        latitude: raw["latitude"],
        longitude: raw["longitude"],
        virtual: raw["virtual"] || false,
        start_date: parse_time(raw["startDate"]),
        end_date: parse_time(raw["endDate"]),
        deadline: parse_time(raw["deadline"]),
        age_min: raw["ageMin"].presence || raw.dig("ages", "min") || 0,
        age_max: raw["ageMax"].presence || raw.dig("ages", "max"),
        grades: Array(raw["grades"]),
        language: Array(raw["language"].presence || raw["languages"].presence || "en"),
        cost: raw["cost"].presence || "Free to join",
        source_url: raw["sourceUrl"],
        last_checked: parse_date(raw["lastChecked"]),
        last_seen: parse_date(raw["lastSeen"]),
        status: normalize_status(raw["status"]),
        accessibility: Array(raw["accessibility"]),
        equipment: raw["equipment"],
        food: raw["food"],
        capacity: raw["capacity"],
        commitment: raw["commitment"],
        registration_url: raw["registrationUrl"].presence || raw["sourceUrl"],
        provider_contact: raw["providerContact"],
        free_status_proof: raw["freeStatusProof"],
        last_verified: parse_date(raw["lastVerified"]),
        trusted_source: raw["trustedSource"] || raw["confidence"] == "high",
        volunteer_hours_eligible: raw["volunteerHoursEligible"] || Array(raw["tags"]).any? { |tag| tag.match?(/volunteer|hours/i) },
        coop_eligible: raw["coopEligible"] || Array(raw["tags"]).any? { |tag| tag.match?(/co-?op|shsm/i) },
        paid_position: raw["paidPosition"] || false,
        tags: Array(raw["tags"]),
        sources: Array(raw["sources"].presence || { label: raw["sourceName"].presence || "Source page", url: raw["sourceUrl"], capturedAt: Time.current.iso8601, confidence: raw["confidence"].presence || "needs-review" }),
        admin_audit_trail: Array(raw["adminAuditTrail"].presence || { label: "Imported for Rails beta", at: Time.current.iso8601, actor: "Rails importer", detail: Array(raw["reviewReasons"]).join("; ").presence || "Imported from current public beta data." })
      }
    end

    def normalize_status(status)
      status = status.to_s
      Opportunity::STATUSES.include?(status) ? status : "needs_review"
    end

    def parse_time(value)
      Time.zone.parse(value.to_s) if value.present?
    rescue ArgumentError
      nil
    end

    def parse_date(value)
      Date.parse(value.to_s) if value.present?
    rescue ArgumentError
      nil
    end

    def expire_past_opportunities
      Opportunity.expired_by_date.where.not(status: "hidden").update_all(status: "expired", updated_at: Time.current)
    end
  end
end
