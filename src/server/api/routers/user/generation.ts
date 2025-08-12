import { generateName } from '~/lib/names'
import { rootProtectedProcedure } from '~/server/api/trpc'
import { user, userSettings } from '~/server/db/schema/user'
import { hash } from 'bcryptjs'

export const generation = {
	createFakeUsers: rootProtectedProcedure.mutation(async ({ ctx }) => {
		const users = [
			{
				firstName: generateName(),
				lastName: generateName(),
				isFake: true,
			},
			{
				firstName: generateName(),
				lastName: generateName(),
				isFake: true,
			},
			{
				firstName: generateName(),
				lastName: generateName(),
				isFake: true,
			},
			{
				firstName: generateName(),
				lastName: generateName(),
				isFake: true,
			},
			{
				firstName: generateName(),
				lastName: generateName(),
				isFake: true,
			},
			{
				firstName: generateName(),
				lastName: generateName(),
				isFake: true,
			},
			{
				firstName: generateName(),
				lastName: generateName(),
				isFake: true,
			},
			{
				firstName: generateName(),
				lastName: generateName(),
				isFake: true,
				isTrainer: true,
			},
		]
		const hashedPassword = await hash('hklasd', 10)
		const hashedJamie = await hash('jamiedash', 10)
		const res = await ctx.db.insert(user).values(
			users.map((user) => ({
				firstName: user.firstName,
				lastName: user.lastName,
				name: `${user.firstName} ${user.lastName}`,
				email: `${user.firstName.toLowerCase()}${user.lastName.toLowerCase()}@warner.systems`,
				password: hashedPassword,
				isFake: user.isFake,
				isTrainer: user.isTrainer || false,
			})),
		)
		const jamie = await ctx.db
			.insert(user)
			.values({
				firstName: 'Jamie',
				lastName: 'Dash',
				name: 'Jamie Dash',
				email: 'jamie@comp-edge.com.au',
				password: hashedJamie,
				isTrainer: false,
			})
			.returning({ id: user.id })

		await ctx.db.insert(userSettings).values({
			userId: jamie[0]?.id || '00',
			defaultWater: '600',
		})

		return res
	}),
}
