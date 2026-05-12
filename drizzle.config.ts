import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import { expand } from "dotenv-expand";

const env = dotenv.config({
  path: ".env.local",
});

expand(env);

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
