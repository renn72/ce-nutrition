import { env } from '@/env'
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/server/db/schema/*',
  dialect: 'sqlite',
  dbCredentials: {
    url: env.DATABASE_URL ?? '',
    // url: env.DATABASE_SYNC_URL ?? '',
    // authToken: env.DATABASE_AUTH_TOKEN ?? '',
  },
} satisfies Config
