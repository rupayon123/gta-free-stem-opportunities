import { opportunities } from "../lib/data";

function sqlString(value: string | undefined | null) {
  if (value === undefined || value === null || value === "") return "null";
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlArray(values: string[]) {
  if (!values.length) return "'{}'";
  return `array[${values.map((value) => sqlString(value)).join(", ")}]`;
}

function sqlTimestamp(value: string | undefined) {
  return value ? `${sqlString(value)}::timestamptz` : "null";
}

function sqlDate(value: string) {
  return `${sqlString(value)}::date`;
}

const rows = opportunities.map((opportunity) => {
  const location =
    opportunity.latitude && opportunity.longitude
      ? `st_setsrid(st_makepoint(${opportunity.longitude}, ${opportunity.latitude}), 4326)::geography`
      : "null";

  return `(
    ${sqlString(opportunity.id)},
    ${sqlString(opportunity.title)},
    ${sqlString(opportunity.organization)},
    ${sqlString(opportunity.description)},
    ${sqlString(opportunity.city)},
    ${sqlString(opportunity.region)}::public.gta_region,
    ${opportunity.ageMin},
    ${opportunity.ageMax ?? "null"},
    ${sqlString(opportunity.category)},
    ${sqlString(opportunity.cost)},
    ${sqlArray(opportunity.language)},
    ${sqlTimestamp(opportunity.deadline)},
    ${sqlTimestamp(opportunity.startDate)},
    ${sqlTimestamp(opportunity.endDate)},
    ${sqlString(opportunity.sourceUrl)},
    ${sqlDate(opportunity.lastChecked)},
    ${sqlDate(opportunity.lastSeen)},
    ${sqlString(opportunity.status)}::public.opportunity_status,
    ${sqlArray(opportunity.tags)},
    ${sqlString(opportunity.address)},
    ${location}
  )`;
});

const sql = `-- Generated from lib/data.ts.
-- Run supabase/schema.sql first.

insert into public.opportunities (
  id,
  title,
  organization,
  description,
  city,
  region,
  age_min,
  age_max,
  category,
  cost,
  language,
  deadline,
  start_date,
  end_date,
  source_url,
  last_checked,
  last_seen,
  status,
  tags,
  address,
  location
) values
${rows.join(",\n")}
on conflict (id) do update set
  title = excluded.title,
  organization = excluded.organization,
  description = excluded.description,
  city = excluded.city,
  region = excluded.region,
  age_min = excluded.age_min,
  age_max = excluded.age_max,
  category = excluded.category,
  cost = excluded.cost,
  language = excluded.language,
  deadline = excluded.deadline,
  start_date = excluded.start_date,
  end_date = excluded.end_date,
  source_url = excluded.source_url,
  last_checked = excluded.last_checked,
  last_seen = excluded.last_seen,
  status = excluded.status,
  tags = excluded.tags,
  address = excluded.address,
  location = excluded.location,
  updated_at = now();
`;

console.log(sql);
