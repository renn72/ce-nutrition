import { db } from '@/server/db'
import { log } from '@/server/db/schema/log'

export const createLog = async ({
	user,
	task,
	notes,
	userId,
	objectId,
}: {
	user: string
	task: string
	notes: string
	userId: string
	objectId: number | null | undefined
}) => {
	await db.insert(log).values({
		task: task,
		notes: notes,
		user: user,
		userId: userId,
		objectId: objectId,
	})
}
