class CreateGtaFreeStemCore < ActiveRecord::Migration[8.1]
  OPPORTUNITY_STATUSES = %w[active expired needs_review hidden].freeze
  FEEDBACK_STATUSES = %w[new reviewed resolved archived].freeze
  MISSING_STATUSES = %w[new reviewing approved rejected duplicate].freeze
  ANNOUNCEMENT_STATUSES = %w[active archived].freeze

  def up
    enable_optional_extension "pg_trgm"
    enable_optional_extension "postgis"

    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :role, null: false, default: "parent"
      t.string :grade
      t.boolean :verified, null: false, default: false
      t.string :api_token_digest
      t.datetime :deleted_at
      t.timestamps
    end
    add_index :users, "lower(email)", unique: true, name: "index_users_on_lower_email"
    add_index :users, :api_token_digest, unique: true, where: "api_token_digest IS NOT NULL"
    add_check_constraint :users, "role IN ('parent', 'student', 'admin')", name: "users_role_check"

    create_table :oauth_identities do |t|
      t.references :user, null: false, foreign_key: true
      t.string :provider, null: false
      t.string :uid, null: false
      t.string :email
      t.jsonb :raw_info, null: false, default: {}
      t.timestamps
    end
    add_index :oauth_identities, [ :provider, :uid ], unique: true

    create_table :organizations do |t|
      t.string :name, null: false
      t.string :website_url
      t.string :contact_email
      t.boolean :trusted, null: false, default: false
      t.timestamps
    end
    add_index :organizations, "lower(name)", unique: true, name: "index_organizations_on_lower_name"

    create_table :opportunities, id: :string do |t|
      t.references :organization_record, foreign_key: { to_table: :organizations }
      t.string :title, null: false
      t.string :organization, null: false
      t.string :provider
      t.text :description, null: false
      t.text :summary
      t.string :opportunity_type
      t.string :category, null: false
      t.string :categories, array: true, null: false, default: []
      t.string :community_focus, array: true, null: false, default: []
      t.string :city, null: false
      t.string :region, null: false
      t.string :address
      t.decimal :latitude, precision: 10, scale: 7
      t.decimal :longitude, precision: 10, scale: 7
      t.boolean :virtual, null: false, default: false
      t.datetime :start_date
      t.datetime :end_date
      t.datetime :deadline
      t.integer :age_min, null: false, default: 0
      t.integer :age_max
      t.string :grades, array: true, null: false, default: []
      t.string :language, array: true, null: false, default: [ "en" ]
      t.string :cost, null: false, default: "Free to join"
      t.string :source_url, null: false
      t.date :last_checked
      t.date :last_seen
      t.string :status, null: false, default: "needs_review"
      t.string :accessibility, array: true, null: false, default: []
      t.text :equipment
      t.text :food
      t.text :capacity
      t.text :commitment
      t.string :registration_url
      t.string :provider_contact
      t.text :free_status_proof
      t.date :last_verified
      t.boolean :trusted_source, null: false, default: false
      t.boolean :volunteer_hours_eligible, null: false, default: false
      t.boolean :coop_eligible, null: false, default: false
      t.boolean :paid_position, null: false, default: false
      t.string :tags, array: true, null: false, default: []
      t.jsonb :sources, null: false, default: []
      t.jsonb :admin_audit_trail, null: false, default: []
      t.timestamps
    end
    add_check_constraint :opportunities, "status IN (#{quoted_values(OPPORTUNITY_STATUSES)})", name: "opportunities_status_check"
    add_index :opportunities, :status
    add_index :opportunities, :city
    add_index :opportunities, :region
    add_index :opportunities, :category
    add_index :opportunities, :start_date
    add_index :opportunities, :deadline
    add_index :opportunities, :end_date
    add_index :opportunities, :source_url
    add_index :opportunities, :categories, using: :gin
    add_index :opportunities, :community_focus, using: :gin
    add_index :opportunities, :language, using: :gin
    add_index :opportunities, :tags, using: :gin
    add_trigram_index :opportunities, :title
    add_trigram_index :opportunities, :organization
    add_coordinates_column

    create_table :saved_opportunities do |t|
      t.references :user, null: false, foreign_key: true
      t.string :opportunity_id, null: false
      t.timestamps
    end
    add_foreign_key :saved_opportunities, :opportunities, column: :opportunity_id, primary_key: :id
    add_index :saved_opportunities, [ :user_id, :opportunity_id ], unique: true

    create_table :feedback do |t|
      t.references :user, foreign_key: true
      t.string :opportunity_id
      t.string :name
      t.string :email
      t.text :message, null: false
      t.string :status, null: false, default: "new"
      t.timestamps
    end
    add_foreign_key :feedback, :opportunities, column: :opportunity_id, primary_key: :id
    add_check_constraint :feedback, "status IN (#{quoted_values(FEEDBACK_STATUSES)})", name: "feedback_status_check"
    add_index :feedback, :status

    create_table :missing_opportunity_submissions do |t|
      t.references :user, foreign_key: true
      t.string :title, null: false
      t.string :organization
      t.string :city
      t.string :region
      t.string :source_url
      t.string :contact_email
      t.text :notes, null: false
      t.string :status, null: false, default: "new"
      t.timestamps
    end
    add_check_constraint :missing_opportunity_submissions, "status IN (#{quoted_values(MISSING_STATUSES)})", name: "missing_opportunity_status_check"
    add_index :missing_opportunity_submissions, :status

    create_table :announcements do |t|
      t.string :title, null: false
      t.text :message, null: false
      t.string :status, null: false, default: "active"
      t.timestamps
    end
    add_check_constraint :announcements, "status IN (#{quoted_values(ANNOUNCEMENT_STATUSES)})", name: "announcements_status_check"
    add_index :announcements, :status

    create_table :source_checks do |t|
      t.string :source_name, null: false
      t.string :source_url, null: false
      t.string :status, null: false
      t.datetime :checked_at, null: false
      t.jsonb :result, null: false, default: {}
      t.text :warning
      t.timestamps
    end
    add_index :source_checks, :checked_at
    add_index :source_checks, :status
  end

  def down
    drop_table :source_checks
    drop_table :announcements
    drop_table :missing_opportunity_submissions
    drop_table :feedback
    drop_table :saved_opportunities
    drop_table :opportunities
    drop_table :organizations
    drop_table :oauth_identities
    drop_table :users
  end

  private

  def enable_optional_extension(name)
    enable_extension name unless extension_enabled?(name)
  rescue ActiveRecord::StatementInvalid
    say "Skipping optional PostgreSQL extension #{name.inspect}; enable it in production when available."
  end

  def add_trigram_index(table, column)
    return unless extension_enabled?("pg_trgm")

    add_index table, column, using: :gin, opclass: :gin_trgm_ops, name: "index_#{table}_on_#{column}_trgm"
  rescue ActiveRecord::StatementInvalid
    say "Skipping trigram index on #{table}.#{column}."
  end

  def add_coordinates_column
    return unless extension_enabled?("postgis")

    execute "ALTER TABLE opportunities ADD COLUMN coordinates geography(Point,4326)"
    execute <<~SQL.squish
      UPDATE opportunities
      SET coordinates = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography
      WHERE longitude IS NOT NULL AND latitude IS NOT NULL
    SQL
    execute "CREATE INDEX index_opportunities_on_coordinates ON opportunities USING GIST (coordinates)"
  rescue ActiveRecord::StatementInvalid
    say "Skipping PostGIS coordinates column."
  end

  def quoted_values(values)
    values.map { |value| connection.quote(value) }.join(", ")
  end
end
