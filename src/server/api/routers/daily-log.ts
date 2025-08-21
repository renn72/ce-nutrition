import { createTRPCRouter, } from '~/server/api/trpc'

import { post } from '@/server/api/routers/daily-logs/post'
import { updateDl } from '@/server/api/routers/daily-logs/update-dl'
import { get } from '@/server/api/routers/daily-logs/get'
import { image } from '@/server/api/routers/daily-logs/image'

export const dailyLogRouter = createTRPCRouter({
  ...post,
  ...updateDl,
  ...get,
  ...image,
})
