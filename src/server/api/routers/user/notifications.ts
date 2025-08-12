import { createLog } from '@/server/api/routers/admin-log'
import { protectedProcedure, rootProtectedProcedure } from '~/server/api/trpc'
import {userSettings} from '~/server/db/schema/user'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const notifications = {
}
