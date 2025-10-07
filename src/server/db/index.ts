import { env } from '@/env'
import { instrumentDrizzle } from '@kubiks/otel-drizzle'
import { createClient, type Client } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { sqliteTableCreator } from 'drizzle-orm/sqlite-core'

import * as schema from './schema'

export const createTable = sqliteTableCreator((name) => `${name}`)

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
	})
if (env.NODE_ENV !== 'production') globalForDb.client = client

export const db = drizzle(client, { schema })

instrumentDrizzle(client, { dbSystem: 'sqlite', maxQueryTextLength: 3000 })
