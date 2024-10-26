import { createClient, type Client } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

import { env } from '@/env'
import * as user from './schema/user'
import * as notification from './schema/notification'
import * as ingredient from './schema/ingredient'
import * as settings from './schema/settings'
import * as recipe from './schema/recipe'
import * as plan from './schema/plan'

const schema = {
  ...user,
  ...notification,
  ...ingredient,
  ...settings,
  ...recipe,
  ...plan,
}

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */

const globalForDb = globalThis as unknown as {
  client: Client | undefined
}

export const client =
  globalForDb.client ??
  createClient({
    url: env.DATABASE_URL,
    syncUrl: env.DATABASE_SYNC_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
    syncInterval: 600,
  })
if (env.NODE_ENV !== 'production') globalForDb.client = client

export const db = drizzle(client, { schema, logger: false })
