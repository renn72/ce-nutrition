import { db } from '@/server/db'
import { sendPushNotification } from '@/server/api/utils/send-push'
import { createLog } from '@/server/api/routers/admin-log'
import {
	dailyLog,
	notification,
	pushSubscription,
	user,
  images,
} from '@/server/db/schema'
import { protectedProcedure } from '~/server/api/trpc'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

const sendTrainerNotification = async ({
	title,
	userId,
}: {
	userId: string
	title: string
}) => {
	const userRes = await db.query.user.findFirst({
		where: eq(user.id, userId),
		with: {
			trainers: {
				with: {
					trainer: true,
				},
			},
		},
	})

	if (!userRes) return

	for (const trainer of userRes.trainers) {
		await db.insert(notification).values({
			userId: trainer.trainer.id,
			code: 'image-upload',
			title: `${userRes.name} has uploaded ${title}`,
			description: '',
			notes: '',
		})
		const sub = await db.query.pushSubscription.findFirst({
			where: eq(pushSubscription.userId, trainer.trainer.id),
		})
		if (sub) {
			await sendPushNotification(JSON.parse(sub.subscription), `${userRes.name} has uploaded ${title}`, '')
		}
	}
}

export const image = {
  getImageOverlay: protectedProcedure
    .input(
      z.object({
        dataId: z.number(),
        imageType: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {

    if (input.imageType === 'front') {
      const res = await ctx.db.query.dailyLog.findFirst({
        where: eq(dailyLog.id, input.dataId),
        columns: {
          frontImageSvg: true,
        },
      })

      return { overlay: res?.frontImageSvg }
    }
    if (input.imageType === 'side') {
      const res = await ctx.db.query.dailyLog.findFirst({
        where: eq(dailyLog.id, input.dataId),
        columns: {
          sideImageSvg: true,
        },
      })

      return { overlay: res?.sideImageSvg }
    }
    if (input.imageType === 'back') {
      const res = await ctx.db.query.dailyLog.findFirst({
        where: eq(dailyLog.id, input.dataId),
        columns: {
          backImageSvg: true,
        },
      })

      return { overlay: res?.backImageSvg }
    }

    const res = await ctx.db.query.images.findFirst({
      where: eq(images.id, input.dataId),
      columns: {
        svg: true,
      },
    })


      return { overlay: res?.svg }
    }),
	updateFrontImage: protectedProcedure
		.input(
			z.object({
				logId: z.number(),
				image: z.string(),
				isNotifyTrainer: z.boolean(),
				userId: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Front Image',
				notes: JSON.stringify(input),
				objectId: null,
			})

			const res = await ctx.db
				.update(dailyLog)
				.set({ frontImage: input.image })
				.where(eq(dailyLog.id, input.logId))

			if (input.isNotifyTrainer) {
				sendTrainerNotification({
					title: 'Front Pose',
					userId: input.userId,
				})
			}

			return res
		}),
  updateFrontImageOverlay: protectedProcedure
    .input(
      z.object({
        logId: z.number(),
        overlay: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'Update Front Image Overlay',
        notes: JSON.stringify(input),
        objectId: null,
      })

      const res = await ctx.db
        .update(dailyLog)
        .set({ frontImageSvg: input.overlay })
        .where(eq(dailyLog.id, input.logId))


      return res
    }),
	updateSideImage: protectedProcedure
		.input(
			z.object({
				logId: z.number(),
				image: z.string(),
				isNotifyTrainer: z.boolean(),
				userId: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update side Image',
				notes: JSON.stringify(input),
				objectId: null,
			})

			const res = await ctx.db
				.update(dailyLog)
				.set({ sideImage: input.image })
				.where(eq(dailyLog.id, input.logId))

			if (input.isNotifyTrainer) {
				sendTrainerNotification({
					title: 'Side Pose',
					userId: input.userId,
				})
			}

			return res
		}),
  updateSideImageOverlay: protectedProcedure
    .input(
      z.object({
        logId: z.number(),
        overlay: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'Update Side Image Overlay',
        notes: JSON.stringify(input),
        objectId: null,
      })

      const res = await ctx.db
        .update(dailyLog)
        .set({ sideImageSvg: input.overlay })
        .where(eq(dailyLog.id, input.logId))


      return res
    }),
	updateBackImage: protectedProcedure
		.input(
			z.object({
				logId: z.number(),
				image: z.string(),
				isNotifyTrainer: z.boolean(),
				userId: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update  Back Image',
				notes: JSON.stringify(input),
				objectId: null,
			})

			const res = await ctx.db
				.update(dailyLog)
				.set({ backImage: input.image })
				.where(eq(dailyLog.id, input.logId))

			if (input.isNotifyTrainer) {
				sendTrainerNotification({
					title: 'Back Pose',
					userId: input.userId,
				})
			}

			return res
		}),
  updateBackImageOverlay: protectedProcedure
    .input(
      z.object({
        logId: z.number(),
        overlay: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'Update Back Image Overlay',
        notes: JSON.stringify(input),
        objectId: null,
      })

      const res = await ctx.db
        .update(dailyLog)
        .set({ backImageSvg: input.overlay })
        .where(eq(dailyLog.id, input.logId))


      return res
    }),
	updateBodyBuilderImage: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				image: z.string(),
				name: z.string(),
				userId: z.string(),
				isNotifyTrainer: z.boolean(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			await ctx.db
				.delete(images)
				.where(
					and(
						eq(images.date, input.date),
						eq(images.name, input.name),
						eq(images.userId, input.userId),
					),
				)

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: `Update Image ${input.name} `,
				notes: JSON.stringify(input),
				objectId: null,
			})

			const res = await ctx.db
				.insert(images)
				.values({
					userId: input.userId,
					name: input.name,
					date: input.date,
					image: input.image,
				})
				.returning({ id: images.id })

			if (input.isNotifyTrainer) {
				sendTrainerNotification({
					title: input.name,
					userId: input.userId,
				})
			}

			return res
		}),
  updateBodyBuilderImageOverlay: protectedProcedure
    .input(
      z.object({
        imageId: z.number(),
        overlay: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'Update Body Builder Image Overlay',
        notes: JSON.stringify(input),
        objectId: null,
      })

      const res = await ctx.db
        .update(images)
        .set({ svg: input.overlay })
        .where(eq(images.id, input.imageId))


      return res
    }),
}
