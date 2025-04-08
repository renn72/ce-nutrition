import { type Config } from "drizzle-kit";

import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./src/server/db/schema-pg/*",
  dialect: "postgresql",
  out: './drizzle-pg',
  dbCredentials: {
    url: process.env.DATABASE_TWO_URL ?? '',
  },
} satisfies Config;
