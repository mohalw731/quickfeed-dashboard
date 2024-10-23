import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  migrations: {
    prefix: "supabase",
  },
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgress://localhost:5432/drizzle",
  },

});
