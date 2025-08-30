import { createClient, type Client } from '@libsql/client'
import { drizzle, } from 'drizzle-orm/libsql'
import { eq } from 'drizzle-orm'
import dotenv  from 'dotenv'

dotenv.config()

import * as schema from '@/server/db/schema'

const globalForDb = globalThis as unknown as {
	client: Client | undefined
}

const client =
	globalForDb.client ??
	createClient({
		url: process.env.DATABASE_URL ?? '',
	})

const db = drizzle(client, { schema })


const run = async () => {
  const res = await db.query.dailyLog.findMany()

  for (const log of res) {
    if (!log.nap) continue
    if (log.nap === '') continue
    await db.update(schema.dailyLog).set({
      nap: Math.floor(Number(log.nap) * 60).toString(),
    }).where(eq(schema.dailyLog.id, log.id))
  }
}


run()
