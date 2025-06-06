import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema/*",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL ?? "",
    // url: env.DATABASE_SYNC_URL ?? '',
    // authToken: env.DATABASE_AUTH_TOKEN ?? '',
  },
} satisfies Config;
