#!/usr/bin/env tsx
/**
 * Portfolio CMS — Supabase Setup Script
 *
 * Usage:
 *   npm run db:setup
 *
 * What it does:
 *   1. Runs the SQL migration (creates all tables + RLS policies)
 *   2. Seeds the database with your current portfolio content
 *   3. Creates Supabase Storage buckets
 *
 * Requirements:
 *   - .env.local with SUPABASE_SERVICE_ROLE_KEY set
 *   - npm install @supabase/supabase-js
 */

import { readFileSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "\n❌  Missing environment variables.\n" +
      "    Copy .env.example to .env.local and fill in your Supabase credentials.\n"
  );
  process.exit(1);
}

const supabase = createClient(url, key);

async function runSQL(sql: string, label: string) {
  console.log(`\n⏳  ${label}…`);
  const { error } = await supabase.rpc("exec_sql", { sql });
  if (error) {
    // exec_sql may not exist — fall back to splitting and running statements
    const statements = sql
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);

    let failed = 0;
    for (const stmt of statements) {
      const { error: e } = await supabase.rpc("exec_sql", { sql: stmt });
      if (e) failed++;
    }
    if (failed > 0) {
      console.warn(
        `⚠️   Some statements failed (${failed}/${statements.length}). ` +
          "If this is your first run, paste the SQL directly in the Supabase SQL Editor."
      );
    } else {
      console.log(`✅  ${label} complete`);
    }
    return;
  }
  console.log(`✅  ${label} complete`);
}

async function createBuckets() {
  console.log("\n⏳  Creating Storage buckets…");
  const buckets = [
    { id: "portfolio-images", name: "portfolio-images", public: true },
    { id: "portfolio-avatars", name: "portfolio-avatars", public: true },
  ];

  for (const bucket of buckets) {
    const { error } = await supabase.storage.createBucket(bucket.id, {
      public: bucket.public,
    });
    if (error && error.message !== "The resource already exists") {
      console.warn(`  ⚠️  Bucket ${bucket.id}: ${error.message}`);
    } else {
      console.log(`  ✅  Bucket: ${bucket.id}`);
    }
  }
}

async function main() {
  console.log("\n🚀  Portfolio CMS — Supabase Setup\n" + "=".repeat(40));

  const migrationsDir = join(process.cwd(), "supabase", "migrations");
  const seedPath = join(process.cwd(), "supabase", "seed.sql");

  // Run migration
  const migration = readFileSync(
    join(migrationsDir, "001_initial_schema.sql"),
    "utf8"
  );
  await runSQL(migration, "Running schema migration");

  // Seed data
  const seed = readFileSync(seedPath, "utf8");
  await runSQL(seed, "Seeding initial data");

  // Storage buckets
  await createBuckets();

  console.log(
    "\n🎉  Setup complete!\n\n" +
      "    Next steps:\n" +
      "    1. Start the dev server:  npm run dev\n" +
      "    2. Create your admin user in Supabase:\n" +
      "       Dashboard → Authentication → Users → Add User\n" +
      "    3. Visit /admin to manage your portfolio\n"
  );
}

main().catch((e) => {
  console.error("\n❌  Setup failed:", e.message);
  process.exit(1);
});
