import { get } from '@/server/api/routers/goals/get'
import { post } from '@/server/api/routers/goals/post'
import { createTRPCRouter } from '~/server/api/trpc'

export const goalsRouter = createTRPCRouter({
	...get,
	...post,
})
