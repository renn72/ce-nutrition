import { adminLogs } from '@/server/api/routers/user/admin-logs'
import { generation } from '@/server/api/routers/user/generation'
import { get } from '@/server/api/routers/user/get'
import { post } from '@/server/api/routers/user/post'
import { roles } from '@/server/api/routers/user/roles'
import { update } from '@/server/api/routers/user/update'
import { notifications } from '@/server/api/routers/user/notifications'
import { createTRPCRouter } from '~/server/api/trpc'

export const userRouter = createTRPCRouter({
	...get,
	...update,
	...roles,
	...generation,
	...post,
	...adminLogs,
  ...notifications,
})
