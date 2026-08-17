namespace :gta_free_stem do
  desc "Import the current static opportunity database into Rails"
  task import_legacy_opportunities: :environment do
    result = Importers::LegacyOpportunityImporter.new.call
    puts "Imported #{result[:imported]} public listings and #{result[:review_candidates]} review candidates."
  end

  desc "Mark public listings with passed dates as expired"
  task expire_past_listings: :environment do
    count = Opportunity.expired_by_date.where.not(status: %w[hidden expired]).update_all(status: "expired", updated_at: Time.current)
    puts "Marked #{count} opportunities as expired."
  end

  desc "Refresh source-backed listings for the free beta"
  task refresh: :environment do
    Rake::Task["gta_free_stem:import_legacy_opportunities"].invoke
    Rake::Task["gta_free_stem:expire_past_listings"].invoke
  end
end
