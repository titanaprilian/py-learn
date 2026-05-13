import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import { expand } from "dotenv-expand";

const env = dotenv.config({
  path: ".env.local",
});

expand(env);

console.log("Connecting to:", process.env.DATABASE_URL);

export default {
  schema: "./src/shared/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
