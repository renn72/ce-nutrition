import { createTRPCRouter, } from '~/server/api/trpc'

import { post } from '@/server/api/routers/goals/daily-logs/post'
import { updateDl } from '@/server/api/routers/goals/daily-logs/update-dl'
import { get } from '@/server/api/routers/goals/daily-logs/get'



export const dailyLogRouter = createTRPCRouter({
  ...post,
  ...updateDl,
  ...get,
})
