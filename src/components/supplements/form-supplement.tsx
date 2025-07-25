'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetFullSupplementById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleX } from 'lucide-react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

import { BackButton } from '../back-button'
import { fieldsMapWUnit as fieldsMap, formSchema } from './store'

export const dynamic = 'force-dynamic'

const FormSupplement = ({
	supplement = null,
}: {
	supplement?: GetFullSupplementById | null
}) => {
	const [search, setSearch] = useState('')
	const ingredient = supplement
	const ctx = api.useUtils()

  const { mutate: createSupplement } = api.supplement.create.useMutation({
    onSettled: () => {
      ctx.supplement.invalidate()
      form.reset()
    },
    onError: () => {
      toast.error('error conflict')
    },
  })

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: ingredient?.name || '',
			serveSize: Number(ingredient?.serveSize) || 1,
			serveUnit: ingredient?.serveUnit || 'gram',
			caloriesWFibre: Number(ingredient?.caloriesWFibre) || 0,
			caloriesWOFibre: Number(ingredient?.caloriesWOFibre) || 0,
			protein: Number(ingredient?.protein) || 0,
			fatTotal: Number(ingredient?.fatTotal) || 0,
			totalDietaryFibre: Number(ingredient?.totalDietaryFibre) || 0,
			totalSugars: Number(ingredient?.totalSugars) || 0,
			starch: Number(ingredient?.starch) || 0,
			resistantStarch: Number(ingredient?.resistantStarch) || 0,
			availableCarbohydrateWithoutSugarAlcohols:
				Number(ingredient?.availableCarbohydrateWithoutSugarAlcohols) || 0,
			availableCarbohydrateWithSugarAlcohols:
				Number(ingredient?.availableCarbohydrateWithSugarAlcohols) || 0,
			addedSugars: Number(ingredient?.ingredientAdditionOne?.addedSugars) || 0,
			freeSugars: Number(ingredient?.ingredientAdditionOne?.freeSugars) || 0,
			moisture: Number(ingredient?.ingredientAdditionOne?.moisture) || 0,
			nitrogen: Number(ingredient?.ingredientAdditionOne?.nitrogen) || 0,
			alcohol: Number(ingredient?.ingredientAdditionOne?.alcohol) || 0,
			fructose: Number(ingredient?.ingredientAdditionOne?.fructose) || 0,
			glucose: Number(ingredient?.ingredientAdditionOne?.glucose) || 0,
			sucrose: Number(ingredient?.ingredientAdditionOne?.sucrose) || 0,
			maltose: Number(ingredient?.ingredientAdditionOne?.maltose) || 0,
			lactose: Number(ingredient?.ingredientAdditionOne?.lactose) || 0,
			galactose: Number(ingredient?.ingredientAdditionOne?.galactose) || 0,
			maltotrios: Number(ingredient?.ingredientAdditionOne?.maltotrios) || 0,
			ash: Number(ingredient?.ingredientAdditionOne?.ash) || 0,
			dextrin: Number(ingredient?.ingredientAdditionOne?.dextrin) || 0,
			glycerol: Number(ingredient?.ingredientAdditionOne?.glycerol) || 0,
			glycogen: Number(ingredient?.ingredientAdditionOne?.glycogen) || 0,
			inulin: Number(ingredient?.ingredientAdditionOne?.inulin) || 0,
			erythritol: Number(ingredient?.ingredientAdditionOne?.erythritol) || 0,
			maltitol: Number(ingredient?.ingredientAdditionOne?.maltitol) || 0,
			mannitol: Number(ingredient?.ingredientAdditionOne?.mannitol) || 0,
			xylitol: Number(ingredient?.ingredientAdditionOne?.xylitol) || 0,
			maltodextrin:
				Number(ingredient?.ingredientAdditionOne?.maltodextrin) || 0,
			oligosaccharides:
				Number(ingredient?.ingredientAdditionOne?.oligosaccharides) || 0,
			polydextrose:
				Number(ingredient?.ingredientAdditionOne?.polydextrose) || 0,
			raffinose: Number(ingredient?.ingredientAdditionOne?.raffinose) || 0,
			stachyose: Number(ingredient?.ingredientAdditionOne?.stachyose) || 0,
			sorbitol: Number(ingredient?.ingredientAdditionOne?.sorbitol) || 0,
			aceticAcid: Number(ingredient?.ingredientAdditionTwo?.aceticAcid) || 0,
			citricAcid: Number(ingredient?.ingredientAdditionTwo?.citricAcid) || 0,
			fumaricAcid: Number(ingredient?.ingredientAdditionTwo?.fumaricAcid) || 0,
			lacticAcid: Number(ingredient?.ingredientAdditionTwo?.lacticAcid) || 0,
			malicAcid: Number(ingredient?.ingredientAdditionTwo?.malicAcid) || 0,
			oxalicAcid: Number(ingredient?.ingredientAdditionTwo?.oxalicAcid) || 0,
			propionicAcid:
				Number(ingredient?.ingredientAdditionTwo?.propionicAcid) || 0,
			quinicAcid: Number(ingredient?.ingredientAdditionTwo?.quinicAcid) || 0,
			shikimicAcid:
				Number(ingredient?.ingredientAdditionTwo?.shikimicAcid) || 0,
			succinicAcid:
				Number(ingredient?.ingredientAdditionTwo?.succinicAcid) || 0,
			tartaricAcid:
				Number(ingredient?.ingredientAdditionTwo?.tartaricAcid) || 0,
			aluminium: Number(ingredient?.ingredientAdditionTwo?.aluminium) || 0,
			antimony: Number(ingredient?.ingredientAdditionTwo?.antimony) || 0,
			arsenic: Number(ingredient?.ingredientAdditionTwo?.arsenic) || 0,
			cadmium: Number(ingredient?.ingredientAdditionTwo?.cadmium) || 0,
			calcium: Number(ingredient?.ingredientAdditionTwo?.calcium) || 0,
			chromium: Number(ingredient?.ingredientAdditionTwo?.chromium) || 0,
			chloride: Number(ingredient?.ingredientAdditionTwo?.chloride) || 0,
			cobalt: Number(ingredient?.ingredientAdditionTwo?.cobalt) || 0,
			copper: Number(ingredient?.ingredientAdditionTwo?.copper) || 0,
			fluoride: Number(ingredient?.ingredientAdditionTwo?.fluoride) || 0,
			iodine: Number(ingredient?.ingredientAdditionTwo?.iodine) || 0,
			iron: Number(ingredient?.ingredientAdditionTwo?.iron) || 0,
			lead: Number(ingredient?.ingredientAdditionTwo?.lead) || 0,
			magnesium: Number(ingredient?.ingredientAdditionTwo?.magnesium) || 0,
			manganese: Number(ingredient?.ingredientAdditionTwo?.manganese) || 0,
			mercury: Number(ingredient?.ingredientAdditionTwo?.mercury) || 0,
			molybdenum: Number(ingredient?.ingredientAdditionTwo?.molybdenum) || 0,
			nickel: Number(ingredient?.ingredientAdditionTwo?.nickel) || 0,
			phosphorus: Number(ingredient?.ingredientAdditionTwo?.phosphorus) || 0,
			potassium: Number(ingredient?.ingredientAdditionTwo?.potassium) || 0,
			selenium: Number(ingredient?.ingredientAdditionTwo?.selenium) || 0,
			sodium: Number(ingredient?.ingredientAdditionTwo?.sodium) || 0,
			sulphur: Number(ingredient?.ingredientAdditionTwo?.sulphur) || 0,
			tin: Number(ingredient?.ingredientAdditionTwo?.tin) || 0,
			zinc: Number(ingredient?.ingredientAdditionTwo?.zinc) || 0,
			retinol: Number(ingredient?.ingredientAdditionTwo?.retinol) || 0,
			alphaCarotene:
				Number(ingredient?.ingredientAdditionTwo?.alphaCarotene) || 0,
			betaCarotene:
				Number(ingredient?.ingredientAdditionTwo?.betaCarotene) || 0,
			cryptoxanthin:
				Number(ingredient?.ingredientAdditionTwo?.cryptoxanthin) || 0,
			betaCaroteneEquivalents:
				Number(ingredient?.ingredientAdditionTwo?.betaCaroteneEquivalents) || 0,
			vitaminARetinolEquivalents:
				Number(ingredient?.ingredientAdditionTwo?.vitaminARetinolEquivalents) ||
				0,
			lutein: Number(ingredient?.ingredientAdditionTwo?.lutein) || 0,
			lycopene: Number(ingredient?.ingredientAdditionTwo?.lycopene) || 0,
			xanthophyl: Number(ingredient?.ingredientAdditionTwo?.xanthophyl) || 0,
			thiamin: Number(ingredient?.ingredientAdditionTwo?.thiamin) || 0,
			riboflavin: Number(ingredient?.ingredientAdditionTwo?.riboflavin) || 0,
			niacin: Number(ingredient?.ingredientAdditionTwo?.niacin) || 0,
			niacinDerivedFromTryptophan:
				Number(
					ingredient?.ingredientAdditionTwo?.niacinDerivedFromTryptophan,
				) || 0,
			niacinDerivedEquivalents:
				Number(ingredient?.ingredientAdditionTwo?.niacinDerivedEquivalents) ||
				0,
			pantothenicAcid:
				Number(ingredient?.ingredientAdditionTwo?.pantothenicAcid) || 0,
			pyridoxine: Number(ingredient?.ingredientAdditionTwo?.pyridoxine) || 0,
			biotin: Number(ingredient?.ingredientAdditionTwo?.biotin) || 0,
			cobalamin: Number(ingredient?.ingredientAdditionTwo?.cobalamin) || 0,
			folateNatural:
				Number(ingredient?.ingredientAdditionTwo?.folateNatural) || 0,
			folicAcid: Number(ingredient?.ingredientAdditionTwo?.folicAcid) || 0,
			totalFolates:
				Number(ingredient?.ingredientAdditionTwo?.totalFolates) || 0,
			dietaryFolateEquivalents:
				Number(ingredient?.ingredientAdditionTwo?.dietaryFolateEquivalents) ||
				0,
			vitaminC: Number(ingredient?.ingredientAdditionTwo?.vitaminC) || 0,
			cholecalciferol:
				Number(ingredient?.ingredientAdditionTwo?.cholecalciferol) || 0,
			ergocalciferol:
				Number(ingredient?.ingredientAdditionTwo?.ergocalciferol) || 0,
			hydroxyCholecalciferol:
				Number(ingredient?.ingredientAdditionTwo?.hydroxyCholecalciferol) || 0,
			hydroxyErgocalciferol:
				Number(ingredient?.ingredientAdditionTwo?.hydroxyErgocalciferol) || 0,
			vitaminDEquivalents:
				Number(ingredient?.ingredientAdditionTwo?.vitaminDEquivalents) || 0,
			alphaTocopherol:
				Number(ingredient?.ingredientAdditionTwo?.alphaTocopherol) || 0,
			alphaTocotrienol:
				Number(ingredient?.ingredientAdditionTwo?.alphaTocotrienol) || 0,
			betaTocopherol:
				Number(ingredient?.ingredientAdditionTwo?.betaTocopherol) || 0,
			betaTocotrienol:
				Number(ingredient?.ingredientAdditionTwo?.betaTocotrienol) || 0,
			deltaTocopherol:
				Number(ingredient?.ingredientAdditionTwo?.deltaTocopherol) || 0,
			deltaTocotrienol:
				Number(ingredient?.ingredientAdditionTwo?.deltaTocotrienol) || 0,
			gammaTocopherol:
				Number(ingredient?.ingredientAdditionTwo?.gammaTocopherol) || 0,
			gammaTocotrienol:
				Number(ingredient?.ingredientAdditionTwo?.gammaTocotrienol) || 0,
			vitaminE: Number(ingredient?.ingredientAdditionTwo?.vitaminE) || 0,
			totalSaturatedFattyAcids:
				Number(ingredient?.ingredientAdditionThree?.totalSaturatedFattyAcids) ||
				0,
			totalMonounsaturatedFattyAcids:
				Number(
					ingredient?.ingredientAdditionThree?.totalMonounsaturatedFattyAcids,
				) || 0,
			totalPolyunsaturatedFattyAcids:
				Number(
					ingredient?.ingredientAdditionThree?.totalPolyunsaturatedFattyAcids,
				) || 0,
			totalLongChainOmega3FattyAcids:
				Number(
					ingredient?.ingredientAdditionThree?.totalLongChainOmega3FattyAcids,
				) || 0,
			totalTransFattyAcids:
				Number(ingredient?.ingredientAdditionThree?.totalTransFattyAcids) || 0,
			caffeine: Number(ingredient?.ingredientAdditionThree?.caffeine) || 0,
			cholesterol:
				Number(ingredient?.ingredientAdditionThree?.cholesterol) || 0,
			alanine: Number(ingredient?.ingredientAdditionThree?.alanine) || 0,
			arginine: Number(ingredient?.ingredientAdditionThree?.arginine) || 0,
			asparticAcid:
				Number(ingredient?.ingredientAdditionThree?.asparticAcid) || 0,
			cystinePlusCysteine:
				Number(ingredient?.ingredientAdditionThree?.cystinePlusCysteine) || 0,
			glutamicAcid:
				Number(ingredient?.ingredientAdditionThree?.glutamicAcid) || 0,
			glycine: Number(ingredient?.ingredientAdditionThree?.glycine) || 0,
			histidine: Number(ingredient?.ingredientAdditionThree?.histidine) || 0,
			isoleucine: Number(ingredient?.ingredientAdditionThree?.isoleucine) || 0,
			leucine: Number(ingredient?.ingredientAdditionThree?.leucine) || 0,
			lysine: Number(ingredient?.ingredientAdditionThree?.lysine) || 0,
			methionine: Number(ingredient?.ingredientAdditionThree?.methionine) || 0,
			phenylalanine:
				Number(ingredient?.ingredientAdditionThree?.phenylalanine) || 0,
			proline: Number(ingredient?.ingredientAdditionThree?.proline) || 0,
			serine: Number(ingredient?.ingredientAdditionThree?.serine) || 0,
			threonine: Number(ingredient?.ingredientAdditionThree?.threonine) || 0,
			tyrosine: Number(ingredient?.ingredientAdditionThree?.tyrosine) || 0,
			tryptophan: Number(ingredient?.ingredientAdditionThree?.tryptophan) || 0,
			valine: Number(ingredient?.ingredientAdditionThree?.valine) || 0,
			c4: Number(ingredient?.ingredientAdditionThree?.c4) || 0,
			c6: Number(ingredient?.ingredientAdditionThree?.c6) || 0,
			c8: Number(ingredient?.ingredientAdditionThree?.c8) || 0,
			c10: Number(ingredient?.ingredientAdditionThree?.c10) || 0,
			c11: Number(ingredient?.ingredientAdditionThree?.c11) || 0,
			c12: Number(ingredient?.ingredientAdditionThree?.c12) || 0,
			c13: Number(ingredient?.ingredientAdditionThree?.c13) || 0,
			c14: Number(ingredient?.ingredientAdditionThree?.c14) || 0,
			c15: Number(ingredient?.ingredientAdditionThree?.c15) || 0,
			c16: Number(ingredient?.ingredientAdditionThree?.c16) || 0,
			c17: Number(ingredient?.ingredientAdditionThree?.c17) || 0,
			c18: Number(ingredient?.ingredientAdditionThree?.c18) || 0,
			c19: Number(ingredient?.ingredientAdditionThree?.c19) || 0,
			c20: Number(ingredient?.ingredientAdditionThree?.c20) || 0,
			c21: Number(ingredient?.ingredientAdditionThree?.c21) || 0,
			c22: Number(ingredient?.ingredientAdditionThree?.c22) || 0,
			c23: Number(ingredient?.ingredientAdditionThree?.c23) || 0,
			c24: Number(ingredient?.ingredientAdditionThree?.c24) || 0,
			totalSaturatedFattyAcidsEquated:
				Number(
					ingredient?.ingredientAdditionThree?.totalSaturatedFattyAcidsEquated,
				) || 0,
			c10_1: Number(ingredient?.ingredientAdditionThree?.c10_1) || 0,
			c12_1: Number(ingredient?.ingredientAdditionThree?.c12_1) || 0,
			c14_1: Number(ingredient?.ingredientAdditionThree?.c14_1) || 0,
			c15_1: Number(ingredient?.ingredientAdditionThree?.c15_1) || 0,
			c16_1: Number(ingredient?.ingredientAdditionThree?.c16_1) || 0,
			c17_1: Number(ingredient?.ingredientAdditionThree?.c17_1) || 0,
			c18_1: Number(ingredient?.ingredientAdditionThree?.c18_1) || 0,
			c18_1w5: Number(ingredient?.ingredientAdditionThree?.c18_1w5) || 0,
			c18_1w6: Number(ingredient?.ingredientAdditionThree?.c18_1w6) || 0,
			c18_1w7: Number(ingredient?.ingredientAdditionThree?.c18_1w7) || 0,
			c18_1w9: Number(ingredient?.ingredientAdditionThree?.c18_1w9) || 0,
			c20_1: Number(ingredient?.ingredientAdditionThree?.c20_1) || 0,
			c20_1w9: Number(ingredient?.ingredientAdditionThree?.c20_1w9) || 0,
			c20_1w13: Number(ingredient?.ingredientAdditionThree?.c20_1w13) || 0,
			c20_1w11: Number(ingredient?.ingredientAdditionThree?.c20_1w11) || 0,
			c22_1: Number(ingredient?.ingredientAdditionThree?.c22_1) || 0,
			c22_1w9: Number(ingredient?.ingredientAdditionThree?.c22_1w9) || 0,
			c22_1w11: Number(ingredient?.ingredientAdditionThree?.c22_1w11) || 0,
			c24_1: Number(ingredient?.ingredientAdditionThree?.c24_1) || 0,
			c24_1w9: Number(ingredient?.ingredientAdditionThree?.c24_1w9) || 0,
			c24_1w11: Number(ingredient?.ingredientAdditionThree?.c24_1w11) || 0,
			c24_1w13: Number(ingredient?.ingredientAdditionThree?.c24_1w13) || 0,
			totalMonounsaturatedFattyAcidsEquated:
				Number(
					ingredient?.ingredientAdditionThree
						?.totalMonounsaturatedFattyAcidsEquated,
				) || 0,
			c12_2: Number(ingredient?.ingredientAdditionThree?.c12_2) || 0,
			c16_2w4: Number(ingredient?.ingredientAdditionThree?.c16_2w4) || 0,
			c16_3: Number(ingredient?.ingredientAdditionThree?.c16_3) || 0,
			c18_2w6: Number(ingredient?.ingredientAdditionThree?.c18_2w6) || 0,
			c18_3w3: Number(ingredient?.ingredientAdditionThree?.c18_3w3) || 0,
			c18_3w4: Number(ingredient?.ingredientAdditionThree?.c18_3w4) || 0,
			c18_3w6: Number(ingredient?.ingredientAdditionThree?.c18_3w6) || 0,
			c18_4w1: Number(ingredient?.ingredientAdditionThree?.c18_4w1) || 0,
			c18_4w3: Number(ingredient?.ingredientAdditionThree?.c18_4w3) || 0,
			c20_2: Number(ingredient?.ingredientAdditionThree?.c20_2) || 0,
			c20_2w6: Number(ingredient?.ingredientAdditionThree?.c20_2w6) || 0,
			c20_3: Number(ingredient?.ingredientAdditionThree?.c20_3) || 0,
			c20_3w3: Number(ingredient?.ingredientAdditionThree?.c20_3w3) || 0,
			c20_3w6: Number(ingredient?.ingredientAdditionThree?.c20_3w6) || 0,
			c20_4: Number(ingredient?.ingredientAdditionThree?.c20_4) || 0,
			c20_4w3: Number(ingredient?.ingredientAdditionThree?.c20_4w3) || 0,
			c20_4w6: Number(ingredient?.ingredientAdditionThree?.c20_4w6) || 0,
			c20_5w3: Number(ingredient?.ingredientAdditionThree?.c20_5w3) || 0,
			c21_5w3: Number(ingredient?.ingredientAdditionThree?.c21_5w3) || 0,
			c22_2: Number(ingredient?.ingredientAdditionThree?.c22_2) || 0,
			c22_2w6: Number(ingredient?.ingredientAdditionThree?.c22_2w6) || 0,
			c22_4w6: Number(ingredient?.ingredientAdditionThree?.c22_4w6) || 0,
			c22_5w3: Number(ingredient?.ingredientAdditionThree?.c22_5w3) || 0,
			c22_5w6: Number(ingredient?.ingredientAdditionThree?.c22_5w6) || 0,
			c22_6w3: Number(ingredient?.ingredientAdditionThree?.c22_6w3) || 0,
			totalPolyunsaturatedFattyAcidsEquated:
				Number(
					ingredient?.ingredientAdditionThree
						?.totalPolyunsaturatedFattyAcidsEquated,
				) || 0,
		},
	})
	const onSubmit = (data: z.infer<typeof formSchema>) => {
    createSupplement(data)
  }

	return (
		<div className='flex flex-col gap-4'>
			<BackButton />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex flex-col gap-4'>
						<div>
							<Button type='submit'>Submit</Button>
						</div>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Food Name</FormLabel>
									<FormControl>
										<Input placeholder='Name' {...field} type='text' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex gap-4 justify-between'>
							<FormField
								control={form.control}
								name='serveSize'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Serving Size</FormLabel>
										<FormControl>
											<Input
												placeholder='serving size'
												{...field}
												onChange={(e) => field.onChange(Number(e.target.value))}
												type='number'
												className='w-full'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='serveUnit'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Serving Unit</FormLabel>
										<FormControl>
											<Input
												placeholder='serving unit'
												{...field}
												className='w-full'
											/>
										</FormControl>

										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex gap-1 flex-col max-w-full'>
							<Label>Search</Label>
							<div className='flex gap-4 items-center'>
								<Input
									placeholder='Search...'
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className='h-8 w-full lg:w-[250px]'
								/>
								<CircleX
									size={18}
									className={cn(
										'cursor-pointer active:scale-95',
										search === '' ? 'hidden' : '',
									)}
									onClick={() => setSearch('')}
								/>
							</div>
						</div>
						<div className='flex gap-1 flex-col'>
							{fieldsMap
								.filter((f) =>
									f.name.toLowerCase().includes(search.toLowerCase()),
								)
								.map((f) => (
										<FormField
											key={f.field}
											control={form.control}
											// @ts-ignore
											name={f.field}
											render={({ field }) => field.value === null ? null : (
												<FormItem>
													<FormLabel>{`${f.name} (${f.unit})`}</FormLabel>
													<FormControl>
														<Input
															placeholder={f.name}
															{...field}
															type='number'
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									)
								)}
						</div>

					</div>
				</form>
			</Form>
		</div>
	)
}

export { FormSupplement }
