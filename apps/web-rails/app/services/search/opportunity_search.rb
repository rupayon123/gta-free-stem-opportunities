module Search
  class OpportunitySearch
    DEFAULT_LIMIT = 60

    attr_reader :params, :admin

    def initialize(params = {}, admin: false)
      @params = params.to_h.with_indifferent_access
      @admin = admin
    end

    def results
      scope = base_scope
      scope = text(scope)
      scope = exact(scope, :region)
      scope = exact(scope, :city)
      scope = category(scope)
      scope = age(scope)
      scope = language(scope)
      scope = community_focus(scope, "blackFocused", "Black-focused")
      scope = community_focus(scope, "girlsFocused", "Girls/women-focused")
      scope = community_focus(scope, "indigenousFocused", "Indigenous-focused")
      scope = tag_or_flag(scope, "volunteerHours", flag: :volunteer_hours_eligible, tags: [ "volunteer", "volunteer hours" ])
      scope = tag_or_flag(scope, "coop", flag: :coop_eligible, tags: [ "co-op", "coop", "shsm" ])
      scope = tag_or_flag(scope, "mentorship", tags: [ "mentorship", "mentor" ])
      scope = tag_or_flag(scope, "leadership", tags: [ "leadership", "youth leadership" ])
      scope = high_school(scope)
      scope = distance(scope)
      sorted(scope).limit(limit)
    end

    private

    def base_scope
      return Opportunity.not_hidden if admin
      return Opportunity.publicly_visible if include_new_finds?

      Opportunity.publicly_visible.where(status: "active")
    end

    def text(scope)
      query = params[:query].to_s.strip
      return scope if query.blank?

      pattern = "%#{ActiveRecord::Base.sanitize_sql_like(query)}%"
      scope.where(
        "title ILIKE :pattern OR organization ILIKE :pattern OR description ILIKE :pattern OR :query = ANY(tags)",
        pattern: pattern,
        query: query.downcase
      )
    end

    def exact(scope, key)
      value = params[key].to_s.strip
      return scope if value.blank? || value.casecmp("all").zero?

      scope.where(key => value)
    end

    def category(scope)
      value = params[:category].to_s.strip
      return scope if value.blank? || value.casecmp("all").zero?

      scope.where("category = :value OR :value = ANY(categories)", value: value)
    end

    def age(scope)
      value = params[:age].to_s.strip
      return scope if value.blank? || value.casecmp("all").zero?

      age = value.to_i
      scope.where("age_min <= ? AND (age_max IS NULL OR age_max >= ?)", age, age)
    end

    def language(scope)
      value = params[:language].to_s.strip
      return scope if value.blank? || value.casecmp("all").zero?

      scope.where("? = ANY(language)", value)
    end

    def community_focus(scope, param_key, label)
      truthy?(params[param_key]) ? scope.where("? = ANY(community_focus)", label) : scope
    end

    def tag_or_flag(scope, param_key, flag: nil, tags: [])
      return scope unless truthy?(params[param_key])

      filtered = scope.none
      filtered = filtered.or(flag_scope(scope, flag)) if flag
      tags.each do |tag|
        filtered = filtered.or(scope.where("? = ANY(tags)", tag))
      end
      filtered
    end

    def flag_scope(scope, flag)
      return scope.where(volunteer_hours_eligible: true) if flag == :volunteer_hours_eligible
      return scope.where(coop_eligible: true) if flag == :coop_eligible

      raise ArgumentError, "Unsupported flag filter"
    end

    def high_school(scope)
      return scope unless truthy?(params[:highSchool])

      scope.where(
        "volunteer_hours_eligible = TRUE OR coop_eligible = TRUE OR ? = ANY(tags) OR ? = ANY(tags) OR ? = ANY(tags) OR ? = ANY(tags) OR ? = ANY(tags) OR ? = ANY(tags) OR ? = ANY(tags)",
        "teen",
        "high school",
        "shsm",
        "mentor",
        "mentorship",
        "leadership",
        "volunteer"
      )
    end

    def distance(scope)
      lat = decimal_param(:latitude)
      lng = decimal_param(:longitude)
      km = decimal_param(:distanceKm)
      return scope if lat.blank? || lng.blank? || km.blank?
      return scope unless Opportunity.column_names.include?("coordinates")

      scope.where(
        "coordinates IS NOT NULL AND ST_DWithin(coordinates, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)",
        lng,
        lat,
        [[ km, 1 ].max, 150 ].min * 1_000
      )
    rescue ActiveRecord::StatementInvalid
      scope
    end

    def sorted(scope)
      case params[:sort].to_s
      when "distance"
        sort_by_distance(scope)
      when "relevance"
        sort_by_relevance(scope)
      else
        scope.recent_first
      end
    end

    def sort_by_distance(scope)
      lat = decimal_param(:latitude)
      lng = decimal_param(:longitude)
      return scope.recent_first if lat.blank? || lng.blank?
      return scope.recent_first unless Opportunity.column_names.include?("coordinates")

      point_sql = ActiveRecord::Base.sanitize_sql_array([ "ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography", lng, lat ])
      scope
        .select("opportunities.*, ST_Distance(coordinates, #{point_sql}) AS distance_meters")
        .order(Arel.sql("distance_meters ASC NULLS LAST"))
        .order(Arel.sql("COALESCE(start_date, deadline, end_date) ASC NULLS LAST"))
    rescue ActiveRecord::StatementInvalid
      scope.recent_first
    end

    def sort_by_relevance(scope)
      query = params[:query].to_s.strip
      return scope.recent_first if query.blank?

      order_sql = ActiveRecord::Base.sanitize_sql_array([
        "GREATEST(similarity(title, ?), similarity(organization, ?), similarity(description, ?)) DESC",
        query,
        query,
        query
      ])
      scope.order(Arel.sql(order_sql)).recent_first
    rescue ActiveRecord::StatementInvalid
      scope.recent_first
    end

    def limit
      raw = params[:limit].to_i
      raw.positive? ? [ raw, 200 ].min : DEFAULT_LIMIT
    end

    def decimal_param(key)
      BigDecimal(params[key].to_s)
    rescue ArgumentError
      nil
    end

    def include_new_finds?
      return true unless params.key?(:includeNewFinds)

      truthy?(params[:includeNewFinds])
    end

    def truthy?(value)
      ActiveModel::Type::Boolean.new.cast(value)
    end
  end
end
