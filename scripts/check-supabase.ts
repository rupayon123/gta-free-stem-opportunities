import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnvFile(path: string) {
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...parts] = trimmed.split("=");
    if (process.env[key]) continue;
    process.env[key] = parts.join("=").replace(/^["']|["']$/g, "");
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function masked(value: string) {
  if (value.length <= 12) return `${value.slice(0, 3)}...`;
  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}

async function main() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase is not connected yet.");
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local and Vercel.");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { count, error } = await supabase.from("opportunities").select("id", { count: "exact", head: true });

  if (error) {
    console.error("Supabase credentials were found, but the public opportunities table check failed.");
    console.error(error.message);
    process.exit(1);
  }

  console.log("Supabase production connection check passed.");
  console.log(`URL: ${masked(supabaseUrl)}`);
  console.log(`Public active opportunities visible through RLS: ${count ?? 0}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
