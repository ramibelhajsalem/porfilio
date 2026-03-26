/**
 * One-time script to create the admin user in Supabase Auth.
 *
 * Usage:
 *   npx tsx scripts/create-admin.ts
 *
 * Requires these env vars (from .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment."
  );
  console.error("Make sure .env.local is loaded (use dotenv or export them).");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: "ramibelhadjsalam@gmail.com",
    password: "teste@@@",
    email_confirm: true,
  });

  if (error) {
    if (error.message.includes("already been registered")) {
      console.log("Admin user already exists. No action needed.");
      return;
    }
    console.error("Error creating admin user:", error.message);
    process.exit(1);
  }

  console.log("Admin user created successfully!");
  console.log("User ID:", data.user.id);
  console.log("Email:", data.user.email);
}

main();
