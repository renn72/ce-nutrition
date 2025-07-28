import { db } from '@/server/db'
import { dailyLog, dailySupplement } from '@/server/db/schema/daily-logs'
import {
	ingredient,
	ingredientAdditionOne,
	ingredientAdditionThree,
	ingredientAdditionTwo,
} from '@/server/db/schema/ingredient'
import { log } from '@/server/db/schema/log'
import {
	supplementStack,
	supplementToSupplementStack,
} from '@/server/db/schema/user'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { and, asc, eq } from 'drizzle-orm'
import { z } from 'zod'

import {
	formSchema as createSchema,
	updateSchema,
} from '@/components/supplements/store'

const createLog = async ({
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

export const supplementsRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(ingredient)
        .set({
          deletedAt: new Date(),
        })
        .where(eq(ingredient.id, input.id))
      return res
    }),
	getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id
		const res = await ctx.db.query.ingredient.findMany({
			where: (ingredient, { isNull, and, eq }) =>
				and(
					isNull(ingredient.hiddenAt),
					isNull(ingredient.deletedAt),
					eq(ingredient.isSupplement, true),
          eq(ingredient.isUserCreated, false),
				),
			with: {
				user: {
					columns: {
						id: true,
						name: true,
					},
				},
			},
			orderBy: [asc(ingredient.name)],
		})

    const filterRes = res.filter((item) => {
      if (item.isPrivate) {
        if (item.userId === userId) return true
        if (item.viewableBy?.split(',').includes(userId)) return true
        return false
      }
      return true
    })

		return filterRes
	}),
	getSupplementFromDailyLog: protectedProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input, ctx }) => {
			if (input.id === -1) return false

			const res = await ctx.db.query.dailySupplement.findFirst({
				where: (supplement, { eq }) => eq(supplement.id, input.id),
				with: {
					supplement: true,
				},
			})
			return res ? true : false
		}),
	getFullSupplement: protectedProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input, ctx }) => {
			const res = await ctx.db.query.ingredient.findFirst({
				where: (ingredient, { eq }) => eq(ingredient.id, input.id),
				with: {
					ingredientAdditionOne: true,
					ingredientAdditionTwo: true,
					ingredientAdditionThree: true,
					user: {
						columns: {
							id: true,
							name: true,
						},
					},
				},
			})
			return res
		}),
	getSupplement: protectedProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input, ctx }) => {
			const res = await ctx.db.query.ingredient.findFirst({
				where: (ingredient, { eq }) => eq(ingredient.id, input.id),
				with: {
					user: {
						columns: {
							id: true,
							name: true,
						},
					},
				},
			})
			return res
		}),
	addTime: protectedProcedure
		.input(
			z.object({
				time: z.string(),
				userId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.insert(supplementStack)
				.values({
					userId: input.userId,
					time: input.time,
				})
				.returning({ id: supplementStack.id })
			return res
		}),
	getSuppFromPlan: protectedProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ ctx, input }) => {
			const res = await ctx.db.query.supplementToSupplementStack.findFirst({
				where: (supplement, { eq }) => eq(supplement.id, input.id),
				with: {
					supplement: true,
				},
			})
			return res
		}),
	addToUser: protectedProcedure
		.input(
			z.object({
				suppId: z.number(),
				userId: z.string(),
				time: z.string(),
				size: z.string(),
				unit: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const userTimes = await ctx.db.query.supplementStack.findMany({
				where: (stack, { eq }) => eq(stack.userId, input.userId),
			})
			let timeId =
				userTimes.find((stack) => stack.time === input.time)?.id || null

			if (!timeId) {
				const res = await ctx.db
					.insert(supplementStack)
					.values({
						userId: input.userId,
						time: input.time,
					})
					.returning({ id: supplementStack.id })
				if (!res || res[0]?.id === undefined)
					throw new TRPCError({ code: 'BAD_REQUEST' })
				timeId = res[0]?.id
			}

			await ctx.db.insert(supplementToSupplementStack).values({
				supplementId: input.suppId,
				supplementStackId: timeId,
				size: input.size,
				unit: input.unit,
			})

			return true
		}),
	logSupplement: protectedProcedure
		.input(
			z.object({
				suppId: z.number(),
				date: z.string(),
				time: z.string(),
				amount: z.string(),
				unit: z.string(),
				stackId: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			let logId = log?.id as number | undefined

			if (!log) {
				const res = await ctx.db
					.insert(dailyLog)
					.values({
						date: input.date,
						userId: ctx.session.user.id,
					})
					.returning({ id: dailyLog.id })
				logId = res[0]?.id
			}

			if (!logId) throw new TRPCError({ code: 'NOT_FOUND' })

			await ctx.db.insert(dailySupplement).values({
				dailyLogId: logId,
				supplementId: input.suppId,
				amount: input.amount,
				unit: input.unit,
				time: input.time,
				notes: input.stackId.toString(),
			})
			return true
		}),
	unLogSupplement: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ input, ctx }) => {
			await ctx.db
				.delete(dailySupplement)
				.where(eq(dailySupplement.id, input.id))
			return true
		}),
	deleteFromUser: protectedProcedure
		.input(z.object({ suppId: z.number(), suppStackId: z.number() }))
		.mutation(async ({ input, ctx }) => {
			await ctx.db
				.delete(supplementToSupplementStack)
				.where(
					and(
						eq(supplementToSupplementStack.supplementId, input.suppId),
						eq(
							supplementToSupplementStack.supplementStackId,
							input.suppStackId,
						),
					),
				)

			return true
		}),
	deleteTime: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ input, ctx }) => {
			await ctx.db
				.delete(supplementStack)
				.where(eq(supplementStack.id, input.id))
			return true
		}),
	update: protectedProcedure
		.input(updateSchema)
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.session.user.id

			const res = await ctx.db
				.update(ingredient)
				.set({
					serveUnit: input.serveUnit,
					serveSize: input.serveSize.toString(),
					name: input.name,
          isPrivate: input.isPrivate,
          viewableBy: input.viewableBy,
					userId: userId,
					caloriesWFibre:
						input.caloriesWFibre === 0 ? null : input.caloriesWFibre.toString(),
					caloriesWOFibre:
						input.caloriesWOFibre === 0
							? null
							: input.caloriesWOFibre.toString(),
					protein: input.protein === 0 ? null : input.protein.toString(),
					fatTotal: input.fatTotal === 0 ? null : input.fatTotal.toString(),
					totalDietaryFibre:
						input.totalDietaryFibre === 0
							? null
							: input.totalDietaryFibre.toString(),
					totalSugars:
						input.totalSugars === 0 ? null : input.totalSugars.toString(),
					starch: input.starch === 0 ? null : input.starch.toString(),
					resistantStarch:
						input.resistantStarch === 0
							? null
							: input.resistantStarch.toString(),
					availableCarbohydrateWithoutSugarAlcohols:
						input.availableCarbohydrateWithoutSugarAlcohols === 0
							? null
							: input.availableCarbohydrateWithoutSugarAlcohols.toString(),
					availableCarbohydrateWithSugarAlcohols:
						input.availableCarbohydrateWithSugarAlcohols === 0
							? null
							: input.availableCarbohydrateWithSugarAlcohols.toString(),
					isSupplement: true,
					notes: '',
				})
				.where(eq(ingredient.id, input.id))

			await ctx.db.batch([
				ctx.db
					.update(ingredientAdditionOne)
					.set({
						ingredientId: input.id,
						addedSugars:
							input.addedSugars === 0 ? null : input.addedSugars.toString(),
						freeSugars:
							input.freeSugars === 0 ? null : input.freeSugars.toString(),
						moisture: input.moisture === 0 ? null : input.moisture.toString(),
						nitrogen: input.nitrogen === 0 ? null : input.nitrogen.toString(),
						alcohol: input.alcohol === 0 ? null : input.alcohol.toString(),
						fructose: input.fructose === 0 ? null : input.fructose.toString(),
						glucose: input.glucose === 0 ? null : input.glucose.toString(),
						sucrose: input.sucrose === 0 ? null : input.sucrose.toString(),
						maltose: input.maltose === 0 ? null : input.maltose.toString(),
						lactose: input.lactose === 0 ? null : input.lactose.toString(),
						galactose:
							input.galactose === 0 ? null : input.galactose.toString(),
						maltotrios:
							input.maltotrios === 0 ? null : input.maltotrios.toString(),
						ash: input.ash === 0 ? null : input.ash.toString(),
						dextrin: input.dextrin === 0 ? null : input.dextrin.toString(),
						glycerol: input.glycerol === 0 ? null : input.glycerol.toString(),
						glycogen: input.glycogen === 0 ? null : input.glycogen.toString(),
						inulin: input.inulin === 0 ? null : input.inulin.toString(),
						erythritol:
							input.erythritol === 0 ? null : input.erythritol.toString(),
						maltitol: input.maltitol === 0 ? null : input.maltitol.toString(),
						mannitol: input.mannitol === 0 ? null : input.mannitol.toString(),
						xylitol: input.xylitol === 0 ? null : input.xylitol.toString(),
						maltodextrin:
							input.maltodextrin === 0 ? null : input.maltodextrin.toString(),
						oligosaccharides:
							input.oligosaccharides === 0
								? null
								: input.oligosaccharides.toString(),
						polydextrose:
							input.polydextrose === 0 ? null : input.polydextrose.toString(),
						raffinose:
							input.raffinose === 0 ? null : input.raffinose.toString(),
						stachyose:
							input.stachyose === 0 ? null : input.stachyose.toString(),
						sorbitol: input.sorbitol === 0 ? null : input.sorbitol.toString(),
					})
					.where(eq(ingredientAdditionOne.ingredientId, input.id)),
				ctx.db
					.update(ingredientAdditionTwo)
					.set({
						ingredientId: input.id,
						aceticAcid:
							input.aceticAcid === 0 ? null : input.aceticAcid.toString(),
						citricAcid:
							input.citricAcid === 0 ? null : input.citricAcid.toString(),
						fumaricAcid:
							input.fumaricAcid === 0 ? null : input.fumaricAcid.toString(),
						lacticAcid:
							input.lacticAcid === 0 ? null : input.lacticAcid.toString(),
						malicAcid:
							input.malicAcid === 0 ? null : input.malicAcid.toString(),
						oxalicAcid:
							input.oxalicAcid === 0 ? null : input.oxalicAcid.toString(),
						propionicAcid:
							input.propionicAcid === 0 ? null : input.propionicAcid.toString(),
						quinicAcid:
							input.quinicAcid === 0 ? null : input.quinicAcid.toString(),
						shikimicAcid:
							input.shikimicAcid === 0 ? null : input.shikimicAcid.toString(),
						succinicAcid:
							input.succinicAcid === 0 ? null : input.succinicAcid.toString(),
						tartaricAcid:
							input.tartaricAcid === 0 ? null : input.tartaricAcid.toString(),
						aluminium:
							input.aluminium === 0 ? null : input.aluminium.toString(),
						antimony: input.antimony === 0 ? null : input.antimony.toString(),
						arsenic: input.arsenic === 0 ? null : input.arsenic.toString(),
						cadmium: input.cadmium === 0 ? null : input.cadmium.toString(),
						calcium: input.calcium === 0 ? null : input.calcium.toString(),
						chromium: input.chromium === 0 ? null : input.chromium.toString(),
						chloride: input.chloride === 0 ? null : input.chloride.toString(),
						cobalt: input.cobalt === 0 ? null : input.cobalt.toString(),
						copper: input.copper === 0 ? null : input.copper.toString(),
						fluoride: input.fluoride === 0 ? null : input.fluoride.toString(),
						iodine: input.iodine === 0 ? null : input.iodine.toString(),
						iron: input.iron === 0 ? null : input.iron.toString(),
						lead: input.lead === 0 ? null : input.lead.toString(),
						magnesium:
							input.magnesium === 0 ? null : input.magnesium.toString(),
						manganese:
							input.manganese === 0 ? null : input.manganese.toString(),
						mercury: input.mercury === 0 ? null : input.mercury.toString(),
						molybdenum:
							input.molybdenum === 0 ? null : input.molybdenum.toString(),
						nickel: input.nickel === 0 ? null : input.nickel.toString(),
						phosphorus:
							input.phosphorus === 0 ? null : input.phosphorus.toString(),
						potassium:
							input.potassium === 0 ? null : input.potassium.toString(),
						selenium: input.selenium === 0 ? null : input.selenium.toString(),
						sodium: input.sodium === 0 ? null : input.sodium.toString(),
						sulphur: input.sulphur === 0 ? null : input.sulphur.toString(),
						tin: input.tin === 0 ? null : input.tin.toString(),
						zinc: input.zinc === 0 ? null : input.zinc.toString(),
						retinol: input.retinol === 0 ? null : input.retinol.toString(),
						alphaCarotene:
							input.alphaCarotene === 0 ? null : input.alphaCarotene.toString(),
						betaCarotene:
							input.betaCarotene === 0 ? null : input.betaCarotene.toString(),
						cryptoxanthin:
							input.cryptoxanthin === 0 ? null : input.cryptoxanthin.toString(),
						betaCaroteneEquivalents:
							input.betaCaroteneEquivalents === 0
								? null
								: input.betaCaroteneEquivalents.toString(),
						vitaminARetinolEquivalents:
							input.vitaminARetinolEquivalents === 0
								? null
								: input.vitaminARetinolEquivalents.toString(),
						lutein: input.lutein === 0 ? null : input.lutein.toString(),
						lycopene: input.lycopene === 0 ? null : input.lycopene.toString(),
						xanthophyl:
							input.xanthophyl === 0 ? null : input.xanthophyl.toString(),
						thiamin: input.thiamin === 0 ? null : input.thiamin.toString(),
						riboflavin:
							input.riboflavin === 0 ? null : input.riboflavin.toString(),
						niacin: input.niacin === 0 ? null : input.niacin.toString(),
						niacinDerivedFromTryptophan:
							input.niacinDerivedFromTryptophan === 0
								? null
								: input.niacinDerivedFromTryptophan.toString(),
						niacinDerivedEquivalents:
							input.niacinDerivedEquivalents === 0
								? null
								: input.niacinDerivedEquivalents.toString(),
						pantothenicAcid:
							input.pantothenicAcid === 0
								? null
								: input.pantothenicAcid.toString(),
						pyridoxine:
							input.pyridoxine === 0 ? null : input.pyridoxine.toString(),
						biotin: input.biotin === 0 ? null : input.biotin.toString(),
						cobalamin:
							input.cobalamin === 0 ? null : input.cobalamin.toString(),
						folateNatural:
							input.folateNatural === 0 ? null : input.folateNatural.toString(),
						folicAcid:
							input.folicAcid === 0 ? null : input.folicAcid.toString(),
						totalFolates:
							input.totalFolates === 0 ? null : input.totalFolates.toString(),
						dietaryFolateEquivalents:
							input.dietaryFolateEquivalents === 0
								? null
								: input.dietaryFolateEquivalents.toString(),
						vitaminC: input.vitaminC === 0 ? null : input.vitaminC.toString(),
						cholecalciferol:
							input.cholecalciferol === 0
								? null
								: input.cholecalciferol.toString(),
						ergocalciferol:
							input.ergocalciferol === 0
								? null
								: input.ergocalciferol.toString(),
						hydroxyCholecalciferol:
							input.hydroxyCholecalciferol === 0
								? null
								: input.hydroxyCholecalciferol.toString(),
						hydroxyErgocalciferol:
							input.hydroxyErgocalciferol === 0
								? null
								: input.hydroxyErgocalciferol.toString(),
						vitaminDEquivalents:
							input.vitaminDEquivalents === 0
								? null
								: input.vitaminDEquivalents.toString(),
						alphaTocopherol:
							input.alphaTocopherol === 0
								? null
								: input.alphaTocopherol.toString(),
						alphaTocotrienol:
							input.alphaTocotrienol === 0
								? null
								: input.alphaTocotrienol.toString(),
						betaTocopherol:
							input.betaTocopherol === 0
								? null
								: input.betaTocopherol.toString(),
						betaTocotrienol:
							input.betaTocotrienol === 0
								? null
								: input.betaTocotrienol.toString(),
						deltaTocopherol:
							input.deltaTocopherol === 0
								? null
								: input.deltaTocopherol.toString(),
						deltaTocotrienol:
							input.deltaTocotrienol === 0
								? null
								: input.deltaTocotrienol.toString(),
						gammaTocopherol:
							input.gammaTocopherol === 0
								? null
								: input.gammaTocopherol.toString(),
						gammaTocotrienol:
							input.gammaTocotrienol === 0
								? null
								: input.gammaTocotrienol.toString(),
						vitaminE: input.vitaminE === 0 ? null : input.vitaminE.toString(),
					})
					.where(eq(ingredientAdditionTwo.ingredientId, input.id)),
				ctx.db
					.update(ingredientAdditionThree)
					.set({
						ingredientId: input.id,
						totalSaturatedFattyAcids:
							input.totalSaturatedFattyAcids === 0
								? null
								: input.totalSaturatedFattyAcids.toString(),
						totalMonounsaturatedFattyAcids:
							input.totalMonounsaturatedFattyAcids === 0
								? null
								: input.totalMonounsaturatedFattyAcids.toString(),
						totalPolyunsaturatedFattyAcids:
							input.totalPolyunsaturatedFattyAcids === 0
								? null
								: input.totalPolyunsaturatedFattyAcids.toString(),
						totalLongChainOmega3FattyAcids:
							input.totalLongChainOmega3FattyAcids === 0
								? null
								: input.totalLongChainOmega3FattyAcids.toString(),
						totalTransFattyAcids:
							input.totalTransFattyAcids === 0
								? null
								: input.totalTransFattyAcids.toString(),
						caffeine: input.caffeine === 0 ? null : input.caffeine.toString(),
						cholesterol:
							input.cholesterol === 0 ? null : input.cholesterol.toString(),
						alanine: input.alanine === 0 ? null : input.alanine.toString(),
						arginine: input.arginine === 0 ? null : input.arginine.toString(),
						asparticAcid:
							input.asparticAcid === 0 ? null : input.asparticAcid.toString(),
						cystinePlusCysteine:
							input.cystinePlusCysteine === 0
								? null
								: input.cystinePlusCysteine.toString(),
						glutamicAcid:
							input.glutamicAcid === 0 ? null : input.glutamicAcid.toString(),
						glycine: input.glycine === 0 ? null : input.glycine.toString(),
						histidine:
							input.histidine === 0 ? null : input.histidine.toString(),
						isoleucine:
							input.isoleucine === 0 ? null : input.isoleucine.toString(),
						leucine: input.leucine === 0 ? null : input.leucine.toString(),
						lysine: input.lysine === 0 ? null : input.lysine.toString(),
						methionine:
							input.methionine === 0 ? null : input.methionine.toString(),
						phenylalanine:
							input.phenylalanine === 0 ? null : input.phenylalanine.toString(),
						proline: input.proline === 0 ? null : input.proline.toString(),
						serine: input.serine === 0 ? null : input.serine.toString(),
						threonine:
							input.threonine === 0 ? null : input.threonine.toString(),
						tyrosine: input.tyrosine === 0 ? null : input.tyrosine.toString(),
						tryptophan:
							input.tryptophan === 0 ? null : input.tryptophan.toString(),
						valine: input.valine === 0 ? null : input.valine.toString(),
						c4: input.c4 === 0 ? null : input.c4.toString(),
						c6: input.c6 === 0 ? null : input.c6.toString(),
						c8: input.c8 === 0 ? null : input.c8.toString(),
						c10: input.c10 === 0 ? null : input.c10.toString(),
						c11: input.c11 === 0 ? null : input.c11.toString(),
						c12: input.c12 === 0 ? null : input.c12.toString(),
						c13: input.c13 === 0 ? null : input.c13.toString(),
						c14: input.c14 === 0 ? null : input.c14.toString(),
						c15: input.c15 === 0 ? null : input.c15.toString(),
						c16: input.c16 === 0 ? null : input.c16.toString(),
						c17: input.c17 === 0 ? null : input.c17.toString(),
						c18: input.c18 === 0 ? null : input.c18.toString(),
						c19: input.c19 === 0 ? null : input.c19.toString(),
						c20: input.c20 === 0 ? null : input.c20.toString(),
						c21: input.c21 === 0 ? null : input.c21.toString(),
						c22: input.c22 === 0 ? null : input.c22.toString(),
						c23: input.c23 === 0 ? null : input.c23.toString(),
						c24: input.c24 === 0 ? null : input.c24.toString(),
						totalSaturatedFattyAcidsEquated:
							input.totalSaturatedFattyAcidsEquated === 0
								? null
								: input.totalSaturatedFattyAcidsEquated.toString(),
						c10_1: input.c10_1 === 0 ? null : input.c10_1.toString(),
						c12_1: input.c12_1 === 0 ? null : input.c12_1.toString(),
						c14_1: input.c14_1 === 0 ? null : input.c14_1.toString(),
						c15_1: input.c15_1 === 0 ? null : input.c15_1.toString(),
						c16_1: input.c16_1 === 0 ? null : input.c16_1.toString(),
						c17_1: input.c17_1 === 0 ? null : input.c17_1.toString(),
						c18_1: input.c18_1 === 0 ? null : input.c18_1.toString(),
						c18_1w5: input.c18_1w5 === 0 ? null : input.c18_1w5.toString(),
						c18_1w6: input.c18_1w6 === 0 ? null : input.c18_1w6.toString(),
						c18_1w7: input.c18_1w7 === 0 ? null : input.c18_1w7.toString(),
						c18_1w9: input.c18_1w9 === 0 ? null : input.c18_1w9.toString(),
						c20_1: input.c20_1 === 0 ? null : input.c20_1.toString(),
						c20_1w9: input.c20_1w9 === 0 ? null : input.c20_1w9.toString(),
						c20_1w13: input.c20_1w13 === 0 ? null : input.c20_1w13.toString(),
						c20_1w11: input.c20_1w11 === 0 ? null : input.c20_1w11.toString(),
						c22_1: input.c22_1 === 0 ? null : input.c22_1.toString(),
						c22_1w9: input.c22_1w9 === 0 ? null : input.c22_1w9.toString(),
						c22_1w11: input.c22_1w11 === 0 ? null : input.c22_1w11.toString(),
						c24_1: input.c24_1 === 0 ? null : input.c24_1.toString(),
						c24_1w9: input.c24_1w9 === 0 ? null : input.c24_1w9.toString(),
						c24_1w11: input.c24_1w11 === 0 ? null : input.c24_1w11.toString(),
						c24_1w13: input.c24_1w13 === 0 ? null : input.c24_1w13.toString(),
						totalMonounsaturatedFattyAcidsEquated:
							input.totalMonounsaturatedFattyAcidsEquated === 0
								? null
								: input.totalMonounsaturatedFattyAcidsEquated.toString(),
						c12_2: input.c12_2 === 0 ? null : input.c12_2.toString(),
						c16_2w4: input.c16_2w4 === 0 ? null : input.c16_2w4.toString(),
						c16_3: input.c16_3 === 0 ? null : input.c16_3.toString(),
						c18_2w6: input.c18_2w6 === 0 ? null : input.c18_2w6.toString(),
						c18_3w3: input.c18_3w3 === 0 ? null : input.c18_3w3.toString(),
						c18_3w4: input.c18_3w4 === 0 ? null : input.c18_3w4.toString(),
						c18_3w6: input.c18_3w6 === 0 ? null : input.c18_3w6.toString(),
						c18_4w1: input.c18_4w1 === 0 ? null : input.c18_4w1.toString(),
						c18_4w3: input.c18_4w3 === 0 ? null : input.c18_4w3.toString(),
						c20_2: input.c20_2 === 0 ? null : input.c20_2.toString(),
						c20_2w6: input.c20_2w6 === 0 ? null : input.c20_2w6.toString(),
						c20_3: input.c20_3 === 0 ? null : input.c20_3.toString(),
						c20_3w3: input.c20_3w3 === 0 ? null : input.c20_3w3.toString(),
						c20_3w6: input.c20_3w6 === 0 ? null : input.c20_3w6.toString(),
						c20_4: input.c20_4 === 0 ? null : input.c20_4.toString(),
						c20_4w3: input.c20_4w3 === 0 ? null : input.c20_4w3.toString(),
						c20_4w6: input.c20_4w6 === 0 ? null : input.c20_4w6.toString(),
						c20_5w3: input.c20_5w3 === 0 ? null : input.c20_5w3.toString(),
						c21_5w3: input.c21_5w3 === 0 ? null : input.c21_5w3.toString(),
						c22_2: input.c22_2 === 0 ? null : input.c22_2.toString(),
						c22_2w6: input.c22_2w6 === 0 ? null : input.c22_2w6.toString(),
						c22_4w6: input.c22_4w6 === 0 ? null : input.c22_4w6.toString(),
						c22_5w3: input.c22_5w3 === 0 ? null : input.c22_5w3.toString(),
						c22_5w6: input.c22_5w6 === 0 ? null : input.c22_5w6.toString(),
						c22_6w3: input.c22_6w3 === 0 ? null : input.c22_6w3.toString(),
						totalPolyunsaturatedFattyAcidsEquated:
							input.totalPolyunsaturatedFattyAcidsEquated === 0
								? null
								: input.totalPolyunsaturatedFattyAcidsEquated.toString(),
					})
					.where(eq(ingredientAdditionThree.ingredientId, input.id))
			])

			return res
		}),
	create: protectedProcedure
		.input(createSchema)
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.session.user.id
			const res = await ctx.db
				.insert(ingredient)
				.values({
					serveUnit: input.serveUnit,
					serveSize: input.serveSize.toString(),
					name: input.name,
          isPrivate: input.isPrivate,
          viewableBy: input.viewableBy,
					userId: userId,
					caloriesWFibre:
						input.caloriesWFibre === 0 ? null : input.caloriesWFibre.toString(),
					caloriesWOFibre:
						input.caloriesWOFibre === 0
							? null
							: input.caloriesWOFibre.toString(),
					protein: input.protein === 0 ? null : input.protein.toString(),
					fatTotal: input.fatTotal === 0 ? null : input.fatTotal.toString(),
					totalDietaryFibre:
						input.totalDietaryFibre === 0
							? null
							: input.totalDietaryFibre.toString(),
					totalSugars:
						input.totalSugars === 0 ? null : input.totalSugars.toString(),
					starch: input.starch === 0 ? null : input.starch.toString(),
					resistantStarch:
						input.resistantStarch === 0
							? null
							: input.resistantStarch.toString(),
					availableCarbohydrateWithoutSugarAlcohols:
						input.availableCarbohydrateWithoutSugarAlcohols === 0
							? null
							: input.availableCarbohydrateWithoutSugarAlcohols.toString(),
					availableCarbohydrateWithSugarAlcohols:
						input.availableCarbohydrateWithSugarAlcohols === 0
							? null
							: input.availableCarbohydrateWithSugarAlcohols.toString(),
					isSupplement: true,
					notes: '',
				})
				.returning({ id: ingredient.id })

			await ctx.db.batch([
				ctx.db.insert(ingredientAdditionOne).values({
					ingredientId: res[0]?.id,
					addedSugars:
						input.addedSugars === 0 ? null : input.addedSugars.toString(),
					freeSugars:
						input.freeSugars === 0 ? null : input.freeSugars.toString(),
					moisture: input.moisture === 0 ? null : input.moisture.toString(),
					nitrogen: input.nitrogen === 0 ? null : input.nitrogen.toString(),
					alcohol: input.alcohol === 0 ? null : input.alcohol.toString(),
					fructose: input.fructose === 0 ? null : input.fructose.toString(),
					glucose: input.glucose === 0 ? null : input.glucose.toString(),
					sucrose: input.sucrose === 0 ? null : input.sucrose.toString(),
					maltose: input.maltose === 0 ? null : input.maltose.toString(),
					lactose: input.lactose === 0 ? null : input.lactose.toString(),
					galactose: input.galactose === 0 ? null : input.galactose.toString(),
					maltotrios:
						input.maltotrios === 0 ? null : input.maltotrios.toString(),
					ash: input.ash === 0 ? null : input.ash.toString(),
					dextrin: input.dextrin === 0 ? null : input.dextrin.toString(),
					glycerol: input.glycerol === 0 ? null : input.glycerol.toString(),
					glycogen: input.glycogen === 0 ? null : input.glycogen.toString(),
					inulin: input.inulin === 0 ? null : input.inulin.toString(),
					erythritol:
						input.erythritol === 0 ? null : input.erythritol.toString(),
					maltitol: input.maltitol === 0 ? null : input.maltitol.toString(),
					mannitol: input.mannitol === 0 ? null : input.mannitol.toString(),
					xylitol: input.xylitol === 0 ? null : input.xylitol.toString(),
					maltodextrin:
						input.maltodextrin === 0 ? null : input.maltodextrin.toString(),
					oligosaccharides:
						input.oligosaccharides === 0
							? null
							: input.oligosaccharides.toString(),
					polydextrose:
						input.polydextrose === 0 ? null : input.polydextrose.toString(),
					raffinose: input.raffinose === 0 ? null : input.raffinose.toString(),
					stachyose: input.stachyose === 0 ? null : input.stachyose.toString(),
					sorbitol: input.sorbitol === 0 ? null : input.sorbitol.toString(),
				}),
				ctx.db.insert(ingredientAdditionTwo).values({
					ingredientId: res[0]?.id,
					aceticAcid:
						input.aceticAcid === 0 ? null : input.aceticAcid.toString(),
					citricAcid:
						input.citricAcid === 0 ? null : input.citricAcid.toString(),
					fumaricAcid:
						input.fumaricAcid === 0 ? null : input.fumaricAcid.toString(),
					lacticAcid:
						input.lacticAcid === 0 ? null : input.lacticAcid.toString(),
					malicAcid: input.malicAcid === 0 ? null : input.malicAcid.toString(),
					oxalicAcid:
						input.oxalicAcid === 0 ? null : input.oxalicAcid.toString(),
					propionicAcid:
						input.propionicAcid === 0 ? null : input.propionicAcid.toString(),
					quinicAcid:
						input.quinicAcid === 0 ? null : input.quinicAcid.toString(),
					shikimicAcid:
						input.shikimicAcid === 0 ? null : input.shikimicAcid.toString(),
					succinicAcid:
						input.succinicAcid === 0 ? null : input.succinicAcid.toString(),
					tartaricAcid:
						input.tartaricAcid === 0 ? null : input.tartaricAcid.toString(),
					aluminium: input.aluminium === 0 ? null : input.aluminium.toString(),
					antimony: input.antimony === 0 ? null : input.antimony.toString(),
					arsenic: input.arsenic === 0 ? null : input.arsenic.toString(),
					cadmium: input.cadmium === 0 ? null : input.cadmium.toString(),
					calcium: input.calcium === 0 ? null : input.calcium.toString(),
					chromium: input.chromium === 0 ? null : input.chromium.toString(),
					chloride: input.chloride === 0 ? null : input.chloride.toString(),
					cobalt: input.cobalt === 0 ? null : input.cobalt.toString(),
					copper: input.copper === 0 ? null : input.copper.toString(),
					fluoride: input.fluoride === 0 ? null : input.fluoride.toString(),
					iodine: input.iodine === 0 ? null : input.iodine.toString(),
					iron: input.iron === 0 ? null : input.iron.toString(),
					lead: input.lead === 0 ? null : input.lead.toString(),
					magnesium: input.magnesium === 0 ? null : input.magnesium.toString(),
					manganese: input.manganese === 0 ? null : input.manganese.toString(),
					mercury: input.mercury === 0 ? null : input.mercury.toString(),
					molybdenum:
						input.molybdenum === 0 ? null : input.molybdenum.toString(),
					nickel: input.nickel === 0 ? null : input.nickel.toString(),
					phosphorus:
						input.phosphorus === 0 ? null : input.phosphorus.toString(),
					potassium: input.potassium === 0 ? null : input.potassium.toString(),
					selenium: input.selenium === 0 ? null : input.selenium.toString(),
					sodium: input.sodium === 0 ? null : input.sodium.toString(),
					sulphur: input.sulphur === 0 ? null : input.sulphur.toString(),
					tin: input.tin === 0 ? null : input.tin.toString(),
					zinc: input.zinc === 0 ? null : input.zinc.toString(),
					retinol: input.retinol === 0 ? null : input.retinol.toString(),
					alphaCarotene:
						input.alphaCarotene === 0 ? null : input.alphaCarotene.toString(),
					betaCarotene:
						input.betaCarotene === 0 ? null : input.betaCarotene.toString(),
					cryptoxanthin:
						input.cryptoxanthin === 0 ? null : input.cryptoxanthin.toString(),
					betaCaroteneEquivalents:
						input.betaCaroteneEquivalents === 0
							? null
							: input.betaCaroteneEquivalents.toString(),
					vitaminARetinolEquivalents:
						input.vitaminARetinolEquivalents === 0
							? null
							: input.vitaminARetinolEquivalents.toString(),
					lutein: input.lutein === 0 ? null : input.lutein.toString(),
					lycopene: input.lycopene === 0 ? null : input.lycopene.toString(),
					xanthophyl:
						input.xanthophyl === 0 ? null : input.xanthophyl.toString(),
					thiamin: input.thiamin === 0 ? null : input.thiamin.toString(),
					riboflavin:
						input.riboflavin === 0 ? null : input.riboflavin.toString(),
					niacin: input.niacin === 0 ? null : input.niacin.toString(),
					niacinDerivedFromTryptophan:
						input.niacinDerivedFromTryptophan === 0
							? null
							: input.niacinDerivedFromTryptophan.toString(),
					niacinDerivedEquivalents:
						input.niacinDerivedEquivalents === 0
							? null
							: input.niacinDerivedEquivalents.toString(),
					pantothenicAcid:
						input.pantothenicAcid === 0
							? null
							: input.pantothenicAcid.toString(),
					pyridoxine:
						input.pyridoxine === 0 ? null : input.pyridoxine.toString(),
					biotin: input.biotin === 0 ? null : input.biotin.toString(),
					cobalamin: input.cobalamin === 0 ? null : input.cobalamin.toString(),
					folateNatural:
						input.folateNatural === 0 ? null : input.folateNatural.toString(),
					folicAcid: input.folicAcid === 0 ? null : input.folicAcid.toString(),
					totalFolates:
						input.totalFolates === 0 ? null : input.totalFolates.toString(),
					dietaryFolateEquivalents:
						input.dietaryFolateEquivalents === 0
							? null
							: input.dietaryFolateEquivalents.toString(),
					vitaminC: input.vitaminC === 0 ? null : input.vitaminC.toString(),
					cholecalciferol:
						input.cholecalciferol === 0
							? null
							: input.cholecalciferol.toString(),
					ergocalciferol:
						input.ergocalciferol === 0 ? null : input.ergocalciferol.toString(),
					hydroxyCholecalciferol:
						input.hydroxyCholecalciferol === 0
							? null
							: input.hydroxyCholecalciferol.toString(),
					hydroxyErgocalciferol:
						input.hydroxyErgocalciferol === 0
							? null
							: input.hydroxyErgocalciferol.toString(),
					vitaminDEquivalents:
						input.vitaminDEquivalents === 0
							? null
							: input.vitaminDEquivalents.toString(),
					alphaTocopherol:
						input.alphaTocopherol === 0
							? null
							: input.alphaTocopherol.toString(),
					alphaTocotrienol:
						input.alphaTocotrienol === 0
							? null
							: input.alphaTocotrienol.toString(),
					betaTocopherol:
						input.betaTocopherol === 0 ? null : input.betaTocopherol.toString(),
					betaTocotrienol:
						input.betaTocotrienol === 0
							? null
							: input.betaTocotrienol.toString(),
					deltaTocopherol:
						input.deltaTocopherol === 0
							? null
							: input.deltaTocopherol.toString(),
					deltaTocotrienol:
						input.deltaTocotrienol === 0
							? null
							: input.deltaTocotrienol.toString(),
					gammaTocopherol:
						input.gammaTocopherol === 0
							? null
							: input.gammaTocopherol.toString(),
					gammaTocotrienol:
						input.gammaTocotrienol === 0
							? null
							: input.gammaTocotrienol.toString(),
					vitaminE: input.vitaminE === 0 ? null : input.vitaminE.toString(),
				}),
				ctx.db.insert(ingredientAdditionThree).values({
					ingredientId: res[0]?.id,
					totalSaturatedFattyAcids:
						input.totalSaturatedFattyAcids === 0
							? null
							: input.totalSaturatedFattyAcids.toString(),
					totalMonounsaturatedFattyAcids:
						input.totalMonounsaturatedFattyAcids === 0
							? null
							: input.totalMonounsaturatedFattyAcids.toString(),
					totalPolyunsaturatedFattyAcids:
						input.totalPolyunsaturatedFattyAcids === 0
							? null
							: input.totalPolyunsaturatedFattyAcids.toString(),
					totalLongChainOmega3FattyAcids:
						input.totalLongChainOmega3FattyAcids === 0
							? null
							: input.totalLongChainOmega3FattyAcids.toString(),
					totalTransFattyAcids:
						input.totalTransFattyAcids === 0
							? null
							: input.totalTransFattyAcids.toString(),
					caffeine: input.caffeine === 0 ? null : input.caffeine.toString(),
					cholesterol:
						input.cholesterol === 0 ? null : input.cholesterol.toString(),
					alanine: input.alanine === 0 ? null : input.alanine.toString(),
					arginine: input.arginine === 0 ? null : input.arginine.toString(),
					asparticAcid:
						input.asparticAcid === 0 ? null : input.asparticAcid.toString(),
					cystinePlusCysteine:
						input.cystinePlusCysteine === 0
							? null
							: input.cystinePlusCysteine.toString(),
					glutamicAcid:
						input.glutamicAcid === 0 ? null : input.glutamicAcid.toString(),
					glycine: input.glycine === 0 ? null : input.glycine.toString(),
					histidine: input.histidine === 0 ? null : input.histidine.toString(),
					isoleucine:
						input.isoleucine === 0 ? null : input.isoleucine.toString(),
					leucine: input.leucine === 0 ? null : input.leucine.toString(),
					lysine: input.lysine === 0 ? null : input.lysine.toString(),
					methionine:
						input.methionine === 0 ? null : input.methionine.toString(),
					phenylalanine:
						input.phenylalanine === 0 ? null : input.phenylalanine.toString(),
					proline: input.proline === 0 ? null : input.proline.toString(),
					serine: input.serine === 0 ? null : input.serine.toString(),
					threonine: input.threonine === 0 ? null : input.threonine.toString(),
					tyrosine: input.tyrosine === 0 ? null : input.tyrosine.toString(),
					tryptophan:
						input.tryptophan === 0 ? null : input.tryptophan.toString(),
					valine: input.valine === 0 ? null : input.valine.toString(),
					c4: input.c4 === 0 ? null : input.c4.toString(),
					c6: input.c6 === 0 ? null : input.c6.toString(),
					c8: input.c8 === 0 ? null : input.c8.toString(),
					c10: input.c10 === 0 ? null : input.c10.toString(),
					c11: input.c11 === 0 ? null : input.c11.toString(),
					c12: input.c12 === 0 ? null : input.c12.toString(),
					c13: input.c13 === 0 ? null : input.c13.toString(),
					c14: input.c14 === 0 ? null : input.c14.toString(),
					c15: input.c15 === 0 ? null : input.c15.toString(),
					c16: input.c16 === 0 ? null : input.c16.toString(),
					c17: input.c17 === 0 ? null : input.c17.toString(),
					c18: input.c18 === 0 ? null : input.c18.toString(),
					c19: input.c19 === 0 ? null : input.c19.toString(),
					c20: input.c20 === 0 ? null : input.c20.toString(),
					c21: input.c21 === 0 ? null : input.c21.toString(),
					c22: input.c22 === 0 ? null : input.c22.toString(),
					c23: input.c23 === 0 ? null : input.c23.toString(),
					c24: input.c24 === 0 ? null : input.c24.toString(),
					totalSaturatedFattyAcidsEquated:
						input.totalSaturatedFattyAcidsEquated === 0
							? null
							: input.totalSaturatedFattyAcidsEquated.toString(),
					c10_1: input.c10_1 === 0 ? null : input.c10_1.toString(),
					c12_1: input.c12_1 === 0 ? null : input.c12_1.toString(),
					c14_1: input.c14_1 === 0 ? null : input.c14_1.toString(),
					c15_1: input.c15_1 === 0 ? null : input.c15_1.toString(),
					c16_1: input.c16_1 === 0 ? null : input.c16_1.toString(),
					c17_1: input.c17_1 === 0 ? null : input.c17_1.toString(),
					c18_1: input.c18_1 === 0 ? null : input.c18_1.toString(),
					c18_1w5: input.c18_1w5 === 0 ? null : input.c18_1w5.toString(),
					c18_1w6: input.c18_1w6 === 0 ? null : input.c18_1w6.toString(),
					c18_1w7: input.c18_1w7 === 0 ? null : input.c18_1w7.toString(),
					c18_1w9: input.c18_1w9 === 0 ? null : input.c18_1w9.toString(),
					c20_1: input.c20_1 === 0 ? null : input.c20_1.toString(),
					c20_1w9: input.c20_1w9 === 0 ? null : input.c20_1w9.toString(),
					c20_1w13: input.c20_1w13 === 0 ? null : input.c20_1w13.toString(),
					c20_1w11: input.c20_1w11 === 0 ? null : input.c20_1w11.toString(),
					c22_1: input.c22_1 === 0 ? null : input.c22_1.toString(),
					c22_1w9: input.c22_1w9 === 0 ? null : input.c22_1w9.toString(),
					c22_1w11: input.c22_1w11 === 0 ? null : input.c22_1w11.toString(),
					c24_1: input.c24_1 === 0 ? null : input.c24_1.toString(),
					c24_1w9: input.c24_1w9 === 0 ? null : input.c24_1w9.toString(),
					c24_1w11: input.c24_1w11 === 0 ? null : input.c24_1w11.toString(),
					c24_1w13: input.c24_1w13 === 0 ? null : input.c24_1w13.toString(),
					totalMonounsaturatedFattyAcidsEquated:
						input.totalMonounsaturatedFattyAcidsEquated === 0
							? null
							: input.totalMonounsaturatedFattyAcidsEquated.toString(),
					c12_2: input.c12_2 === 0 ? null : input.c12_2.toString(),
					c16_2w4: input.c16_2w4 === 0 ? null : input.c16_2w4.toString(),
					c16_3: input.c16_3 === 0 ? null : input.c16_3.toString(),
					c18_2w6: input.c18_2w6 === 0 ? null : input.c18_2w6.toString(),
					c18_3w3: input.c18_3w3 === 0 ? null : input.c18_3w3.toString(),
					c18_3w4: input.c18_3w4 === 0 ? null : input.c18_3w4.toString(),
					c18_3w6: input.c18_3w6 === 0 ? null : input.c18_3w6.toString(),
					c18_4w1: input.c18_4w1 === 0 ? null : input.c18_4w1.toString(),
					c18_4w3: input.c18_4w3 === 0 ? null : input.c18_4w3.toString(),
					c20_2: input.c20_2 === 0 ? null : input.c20_2.toString(),
					c20_2w6: input.c20_2w6 === 0 ? null : input.c20_2w6.toString(),
					c20_3: input.c20_3 === 0 ? null : input.c20_3.toString(),
					c20_3w3: input.c20_3w3 === 0 ? null : input.c20_3w3.toString(),
					c20_3w6: input.c20_3w6 === 0 ? null : input.c20_3w6.toString(),
					c20_4: input.c20_4 === 0 ? null : input.c20_4.toString(),
					c20_4w3: input.c20_4w3 === 0 ? null : input.c20_4w3.toString(),
					c20_4w6: input.c20_4w6 === 0 ? null : input.c20_4w6.toString(),
					c20_5w3: input.c20_5w3 === 0 ? null : input.c20_5w3.toString(),
					c21_5w3: input.c21_5w3 === 0 ? null : input.c21_5w3.toString(),
					c22_2: input.c22_2 === 0 ? null : input.c22_2.toString(),
					c22_2w6: input.c22_2w6 === 0 ? null : input.c22_2w6.toString(),
					c22_4w6: input.c22_4w6 === 0 ? null : input.c22_4w6.toString(),
					c22_5w3: input.c22_5w3 === 0 ? null : input.c22_5w3.toString(),
					c22_5w6: input.c22_5w6 === 0 ? null : input.c22_5w6.toString(),
					c22_6w3: input.c22_6w3 === 0 ? null : input.c22_6w3.toString(),
					totalPolyunsaturatedFattyAcidsEquated:
						input.totalPolyunsaturatedFattyAcidsEquated === 0
							? null
							: input.totalPolyunsaturatedFattyAcidsEquated.toString(),
				}),
			])

			return res
		}),
})
