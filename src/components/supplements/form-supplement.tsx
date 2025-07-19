'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import type { GetFullSupplementById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, CircleX, PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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

import { BackButton } from '../back-button'

export const dynamic = 'force-dynamic'

const fieldsMap = [
	{
		name: 'Calories w Fibre',
		field: 'caloriesWFibre',
	},
	{
		name: 'Calories',
		field: 'caloriesWOFibre',
	},
	{
		name: 'Protein',
		field: 'protein',
	},
	{
		name: 'Fat',
		field: 'fatTotal',
	},
	{
		name: 'Carbohydrate',
		field: 'totalDietaryFibre',
	},
	{
		name: 'Sugars',
		field: 'totalSugars',
	},
	{
		name: 'Starch',
		field: 'starch',
	},
	{
		name: 'Resistant Starch',
		field: 'resistantStarch',
	},
	{
		name: 'Available Carbohydrate Without Sugar Alcohol',
		field: 'availableCarbohydrateWithoutSugarAlcohols',
	},
	{
		name: 'Available Carbohydrate With Sugar Alcohol',
		field: 'availableCarbohydrateWithSugarAlcohols',
	},
	{
		name: 'Added Sugars',
		field: 'addedSugars',
	},
	{
		name: 'Free Sugars',
		field: 'freeSugars',
	},
	{
		name: 'Moisture',
		field: 'moisture',
	},
	{
		name: 'Nitrogen',
		field: 'nitrogen',
	},
	{
		name: 'Alcohol',
		field: 'alcohol',
	},
	{
		name: 'Fructose',
		field: 'fructose',
	},
	{
		name: 'Glucose',
		field: 'glucose',
	},
	{
		name: 'Sucrose',
		field: 'sucrose',
	},
	{
		name: 'Maltose',
		field: 'maltose',
	},
	{
		name: 'Lactose',
		field: 'lactose',
	},
	{
		name: 'Galactose',
		field: 'galactose',
	},
	{
		name: 'Maltotriose',
		field: 'maltotrios',
	},
	{
		name: 'Ash',
		field: 'ash',
	},
	{
		name: 'Dextrin',
		field: 'dextrin',
	},
	{
		name: 'Glycerol',
		field: 'glycerol',
	},
	{
		name: 'Glycogen',
		field: 'glycogen',
	},
	{
		name: 'Inulin',
		field: 'inulin',
	},
	{
		name: 'Erythritol',
		field: 'erythritol',
	},
	{
		name: 'Maltitol',
		field: 'maltitol',
	},
	{
		name: 'Mannitol',
		field: 'mannitol',
	},
	{
		name: 'Xylitol',
		field: 'xylitol',
	},
	{
		name: 'Maltodextrin',
		field: 'maltodextrin',
	},
	{
		name: 'Oleic Acid',
		field: 'oleicAcid',
	},
	{
		name: 'Polydextrose',
		field: 'polydextrose',
	},
	{
		name: 'Raffinose',
		field: 'raffinose',
	},
	{
		name: 'Stachyose',
		field: 'stachyose',
	},
	{
		name: 'Sorbitol',
		field: 'sorbitol',
	},
	{
		name: 'Acetic Acid',
		field: 'aceticAcid',
	},
	{
		name: 'Citric Acid',
		field: 'citricAcid',
	},
	{
		name: 'Fumaric Acid',
		field: 'fumaricAcid',
	},
	{
		name: 'Lactic Acid',
		field: 'lacticAcid',
	},
	{
		name: 'Malic Acid',
		field: 'malicAcid',
	},
	{
		name: 'Oxalic Acid',
		field: 'oxalicAcid',
	},
	{
		name: 'Propionic Acid',
		field: 'propionicAcid',
	},
	{
		name: 'Quinic Acid',
		field: 'quinicAcid',
	},
	{
		name: 'Shikimic Acid',
		field: 'shikimicAcid',
	},
	{
		name: 'Succinic Acid',
		field: 'succinicAcid',
	},
	{
		name: 'Tartaric Acid',
		field: 'tartaricAcid',
	},
	{
		name: 'Aluminium',
		field: 'aluminium',
	},
	{
		name: 'Antimony',
		field: 'antimony',
	},
	{
		name: 'Arsenic',
		field: 'arsenic',
	},
	{
		name: 'Cadmium',
		field: 'cadmium',
	},
	{
		name: 'Calcium',
		field: 'calcium',
	},
	{
		name: 'Chromium',
		field: 'chromium',
	},
	{
		name: 'Chloride',
		field: 'chloride',
	},
	{
		name: 'Cobalt',
		field: 'cobalt',
	},
	{
		name: 'Copper',
		field: 'copper',
	},
	{
		name: 'Fluoride',
		field: 'fluoride',
	},
	{
		name: 'Iodine',
		field: 'iodine',
	},
	{
		name: 'Iron',
		field: 'iron',
	},
	{
		name: 'Lead',
		field: 'lead',
	},
	{
		name: 'Magnesium',
		field: 'magnesium',
	},
	{
		name: 'Manganese',
		field: 'manganese',
	},
	{
		name: 'Mercury',
		field: 'mercury',
	},
	{
		name: 'Molybdenum',
		field: 'molybdenum',
	},
	{
		name: 'Nickel',
		field: 'nickel',
	},
	{
		name: 'Phosphorus',
		field: 'phosphorus',
	},
	{
		name: 'Potassium',
		field: 'potassium',
	},
	{
		name: 'Selenium',
		field: 'selenium',
	},
	{
		name: 'Sodium',
		field: 'sodium',
	},
	{
		name: 'Sulphur',
		field: 'sulphur',
	},
	{
		name: 'Tin',
		field: 'tin',
	},
	{
		name: 'Zinc',
		field: 'zinc',
	},
	{
		name: 'Retinol',
		field: 'retinol',
	},
	{
		name: 'Alpha Carotene',
		field: 'alphaCarotene',
	},
	{
		name: 'Beta Carotene',
		field: 'betaCarotene',
	},
	{
		name: 'Cryptoxanthin',
		field: 'cryptoxanthin',
	},
	{
		name: 'Beta Carotene Equivalents',
		field: 'betaCaroteneEquivalents',
	},
	{
		name: 'Vitamin ARetinol Equivalents',
		field: 'vitaminARetinolEquivalents',
	},
	{
		name: 'Lutein',
		field: 'lutein',
	},
	{
		name: 'Lycopene',
		field: 'lycopene',
	},
	{
		name: 'Xanthophyl',
		field: 'xanthophyl',
	},
	{
		name: 'Thiamin',
		field: 'thiamin',
	},
	{
		name: 'Riboflavin',
		field: 'riboflavin',
	},
	{
		name: 'Niacin',
		field: 'niacin',
	},
	{
		name: 'Niacin Derived From Tryptophan',
		field: 'niacinDerivedFromTryptophan',
	},
	{
		name: 'Niacin Derived Equivalents',
		field: 'niacinDerivedEquivalents',
	},
	{
		name: 'Pantothenic Acid',
		field: 'pantothenicAcid',
	},
	{
		name: 'Pyridoxine',
		field: 'pyridoxine',
	},
	{
		name: 'Biotin',
		field: 'biotin',
	},
	{
		name: 'Coalamin',
		field: 'cobalamin',
	},
	{
		name: 'Folate Natural',
		field: 'folateNatural',
	},
	{
		name: 'Folic Acid',
		field: 'folicAcid',
	},
	{
		name: 'Total Folates',
		field: 'totalFolates',
	},
	{
		name: 'Dietary Folate Equivalents',
		field: 'dietaryFolateEquivalents',
	},
	{
		name: 'Vitamin C',
		field: 'vitaminC',
	},
	{
		name: 'Cholecalciferol',
		field: 'cholecalciferol',
	},
	{
		name: 'Ergocalciferol',
		field: 'ergocalciferol',
	},
	{
		name: 'Hydroxy Cholecalciferol',
		field: 'hydroxyCholecalciferol',
	},
	{
		name: 'Hydroxy Ergocalciferol',
		field: 'hydroxyErgocalciferol',
	},
	{
		name: 'Vitamin DEquivalents',
		field: 'vitaminDEquivalents',
	},
	{
		name: 'Alpha Tocopherol',
		field: 'alphaTocopherol',
	},
	{
		name: 'Alpha Tocotrienol',
		field: 'alphaTocotrienol',
	},
	{
		name: 'Beta Tocopherol',
		field: 'betaTocopherol',
	},
	{
		name: 'Beta Tocotrienol',
		field: 'betaTocotrienol',
	},
	{
		name: 'Delta Tocopherol',
		field: 'deltaTocopherol',
	},
	{
		name: 'Delta Tocotrienol',
		field: 'deltaTocotrienol',
	},
	{
		name: 'Gamma Tocopherol',
		field: 'gammaTocopherol',
	},
	{
		name: 'Gamma Tocotrienol',
		field: 'gammaTocotrienol',
	},
	{
		name: 'Vitamin E',
		field: 'vitaminE',
	},
	{
		name: 'Total Saturated Fatty Acids',
		field: 'totalSaturatedFattyAcids',
	},
	{
		name: 'Total Monounsaturated Fatty Acids',
		field: 'totalMonounsaturatedFattyAcids',
	},
	{
		name: 'Total Polyunsaturated Fatty Acids',
		field: 'totalPolyunsaturatedFattyAcids',
	},
	{
		name: 'Total Long Chain Omega 3Fatty Acids',
		field: 'totalLongChainOmega3FattyAcids',
	},
	{
		name: 'Total Trans Fatty Acids',
		field: 'totalTransFattyAcids',
	},
	{
		name: 'Caffeine',
		field: 'caffeine',
	},
	{
		name: 'Cholesterol',
		field: 'cholesterol',
	},
	{
		name: 'Alanine',
		field: 'alanine',
	},
	{
		name: 'Arginine',
		field: 'arginine',
	},
	{
		name: 'Aspartic Acid',
		field: 'asparticAcid',
	},
	{
		name: 'Cystine Plus Cysteine',
		field: 'cystinePlusCysteine',
	},
	{
		name: 'Glutamic Acid',
		field: 'glutamicAcid',
	},
	{
		name: 'Glycine',
		field: 'glycine',
	},
	{
		name: 'Histidine',
		field: 'histidine',
	},
	{
		name: 'Isoleucine',
		field: 'isoleucine',
	},
	{
		name: 'Leucine',
		field: 'leucine',
	},
	{
		name: 'Lysine',
		field: 'lysine',
	},
	{
		name: 'Methionine',
		field: 'methionine',
	},
	{
		name: 'Phenylalanine',
		field: 'phenylalanine',
	},
	{
		name: 'Proline',
		field: 'proline',
	},
	{
		name: 'Serine',
		field: 'serine',
	},
	{
		name: 'Threonine',
		field: 'threonine',
	},
	{
		name: 'Tyrosine',
		field: 'tyrosine',
	},
	{
		name: 'Tryptophan',
		field: 'tryptophan',
	},
	{
		name: 'Valine',
		field: 'valine',
	},
	{
		name: 'C4',
		field: 'c4',
	},
	{
		name: 'C6',
		field: 'c6',
	},
	{
		name: 'C8',
		field: 'c8',
	},
	{
		name: 'C10',
		field: 'c10',
	},
	{
		name: 'C11',
		field: 'c11',
	},
	{
		name: 'C12',
		field: 'c12',
	},
	{
		name: 'C13',
		field: 'c13',
	},
	{
		name: 'C14',
		field: 'c14',
	},
	{
		name: 'C15',
		field: 'c15',
	},
	{
		name: 'C16',
		field: 'c16',
	},
	{
		name: 'C17',
		field: 'c17',
	},
	{
		name: 'C18',
		field: 'c18',
	},
	{
		name: 'C19',
		field: 'c19',
	},
	{
		name: 'C20',
		field: 'c20',
	},
	{
		name: 'C21',
		field: 'c21',
	},
	{
		name: 'C22',
		field: 'c22',
	},
	{
		name: 'C23',
		field: 'c23',
	},
	{
		name: 'C24',
		field: 'c24',
	},
	{
		name: 'Total Saturated Fatty Acids Equated',
		field: 'totalSaturatedFattyAcidsEquated',
	},
	{
		name: 'C10 1',
		field: 'c10_1',
	},
	{
		name: 'C12 1',
		field: 'c12_1',
	},
	{
		name: 'C14 1',
		field: 'c14_1',
	},
	{
		name: 'C15 1',
		field: 'c15_1',
	},
	{
		name: 'C16 1',
		field: 'c16_1',
	},
	{
		name: 'C17 1',
		field: 'c17_1',
	},
	{
		name: 'C18 1',
		field: 'c18_1',
	},
	{
		name: 'C18 1w5',
		field: 'c18_1w5',
	},
	{
		name: 'C18 1w6',
		field: 'c18_1w6',
	},
	{
		name: 'C18 1w7',
		field: 'c18_1w7',
	},
	{
		name: 'C18 1w9',
		field: 'c18_1w9',
	},
	{
		name: 'C20 1',
		field: 'c20_1',
	},
	{
		name: 'C20 1w9',
		field: 'c20_1w9',
	},
	{
		name: 'C20 1w13',
		field: 'c20_1w13',
	},
	{
		name: 'C20 1w11',
		field: 'c20_1w11',
	},
	{
		name: 'C22 1',
		field: 'c22_1',
	},
	{
		name: 'C22 1w9',
		field: 'c22_1w9',
	},
	{
		name: 'C22 1w11',
		field: 'c22_1w11',
	},
	{
		name: 'C24 1',
		field: 'c24_1',
	},
	{
		name: 'C24 1w9',
		field: 'c24_1w9',
	},
	{
		name: 'C24 1w11',
		field: 'c24_1w11',
	},
	{
		name: 'C24 1w13',
		field: 'c24_1w13',
	},
	{
		name: 'C12 2',
		field: 'c12_2',
	},
	{
		name: 'C16 2w4',
		field: 'c16_2w4',
	},
	{
		name: 'C16 3',
		field: 'c16_3',
	},
	{
		name: 'C18 2w6',
		field: 'c18_2w6',
	},
	{
		name: 'C18 3w3',
		field: 'c18_3w3',
	},
	{
		name: 'C18 3w4',
		field: 'c18_3w4',
	},
	{
		name: 'C18 3w6',
		field: 'c18_3w6',
	},
	{
		name: 'C18 4w1',
		field: 'c18_4w1',
	},
	{
		name: 'C18 4w3',
		field: 'c18_4w3',
	},
	{
		name: 'C20 2',
		field: 'c20_2',
	},
	{
		name: 'C20 2w6',
		field: 'c20_2w6',
	},
	{
		name: 'C20 3',
		field: 'c20_3',
	},
	{
		name: 'C20 3w3',
		field: 'c20_3w3',
	},
	{
		name: 'C20 3w6',
		field: 'c20_3w6',
	},
	{
		name: 'C20 4',
		field: 'c20_4',
	},
	{
		name: 'C20 4w3',
		field: 'c20_4w3',
	},
	{
		name: 'C20 4w6',
		field: 'c20_4w6',
	},
	{
		name: 'C20 5w3',
		field: 'c20_5w3',
	},
	{
		name: 'C21 5w3',
		field: 'c21_5w3',
	},
	{
		name: 'C22 2',
		field: 'c22_2',
	},
	{
		name: 'C22 2w6',
		field: 'c22_2w6',
	},
	{
		name: 'C22 4w6',
		field: 'c22_4w6',
	},
	{
		name: 'C22 5w3',
		field: 'c22_5w3',
	},
	{
		name: 'C22 5w6',
		field: 'c22_5w6',
	},
	{
		name: 'C22 6w3',
		field: 'c22_6w3',
	},
	{
		name: 'Total Polyunsaturated Fatty Acids Equated',
		field: 'totalPolyunsaturatedFattyAcidsEquated',
	},
	{
		name: 'Total Monounsaturated Fatty Acids Equated',
		field: 'totalMonounsaturatedFattyAcidsEquated',
	},
]

const formSchema = z.object({
	name: z.string().min(1),
	serveSize: z.number(),
	serveUnit: z.string().min(1),
	caloriesWFibre: z.number().nullable(),
	caloriesWOFibre: z.number().nullable(),
	protein: z.number().nullable(),
	fatTotal: z.number().nullable(),
	totalDietaryFibre: z.number().nullable(),
	totalSugars: z.number().nullable(),
	starch: z.number().nullable(),
	resistantStarch: z.number().nullable(),
	availableCarbohydrateWithoutSugarAlcohols: z.number().nullable(),
	availableCarbohydrateWithSugarAlcohols: z.number().nullable(),
	addedSugars: z.number().nullable(),
	freeSugars: z.number().nullable(),
	moisture: z.number().nullable(),
	nitrogen: z.number().nullable(),
	alcohol: z.number().nullable(),
	fructose: z.number().nullable(),
	glucose: z.number().nullable(),
	sucrose: z.number().nullable(),
	maltose: z.number().nullable(),
	lactose: z.number().nullable(),
	galactose: z.number().nullable(),
	maltotrios: z.number().nullable(),
	ash: z.number().nullable(),
	dextrin: z.number().nullable(),
	glycerol: z.number().nullable(),
	glycogen: z.number().nullable(),
	inulin: z.number().nullable(),
	erythritol: z.number().nullable(),
	maltitol: z.number().nullable(),
	mannitol: z.number().nullable(),
	xylitol: z.number().nullable(),
	maltodextrin: z.number().nullable(),
	oligosaccharides: z.number().nullable(),
	polydextrose: z.number().nullable(),
	raffinose: z.number().nullable(),
	stachyose: z.number().nullable(),
	sorbitol: z.number().nullable(),
	aceticAcid: z.number().nullable(),
	citricAcid: z.number().nullable(),
	fumaricAcid: z.number().nullable(),
	lacticAcid: z.number().nullable(),
	malicAcid: z.number().nullable(),
	oxalicAcid: z.number().nullable(),
	propionicAcid: z.number().nullable(),
	quinicAcid: z.number().nullable(),
	shikimicAcid: z.number().nullable(),
	succinicAcid: z.number().nullable(),
	tartaricAcid: z.number().nullable(),
	aluminium: z.number().nullable(),
	antimony: z.number().nullable(),
	arsenic: z.number().nullable(),
	cadmium: z.number().nullable(),
	calcium: z.number().nullable(),
	chromium: z.number().nullable(),
	chloride: z.number().nullable(),
	cobalt: z.number().nullable(),
	copper: z.number().nullable(),
	fluoride: z.number().nullable(),
	iodine: z.number().nullable(),
	iron: z.number().nullable(),
	lead: z.number().nullable(),
	magnesium: z.number().nullable(),
	manganese: z.number().nullable(),
	mercury: z.number().nullable(),
	molybdenum: z.number().nullable(),
	nickel: z.number().nullable(),
	phosphorus: z.number().nullable(),
	potassium: z.number().nullable(),
	selenium: z.number().nullable(),
	sodium: z.number().nullable(),
	sulphur: z.number().nullable(),
	tin: z.number().nullable(),
	zinc: z.number().nullable(),
	retinol: z.number().nullable(),
	alphaCarotene: z.number().nullable(),
	betaCarotene: z.number().nullable(),
	cryptoxanthin: z.number().nullable(),
	betaCaroteneEquivalents: z.number().nullable(),
	vitaminARetinolEquivalents: z.number().nullable(),
	lutein: z.number().nullable(),
	lycopene: z.number().nullable(),
	xanthophyl: z.number().nullable(),
	thiamin: z.number().nullable(),
	riboflavin: z.number().nullable(),
	niacin: z.number().nullable(),
	niacinDerivedFromTryptophan: z.number().nullable(),
	niacinDerivedEquivalents: z.number().nullable(),
	pantothenicAcid: z.number().nullable(),
	pyridoxine: z.number().nullable(),
	biotin: z.number().nullable(),
	cobalamin: z.number().nullable(),
	folateNatural: z.number().nullable(),
	folicAcid: z.number().nullable(),
	totalFolates: z.number().nullable(),
	dietaryFolateEquivalents: z.number().nullable(),
	vitaminC: z.number().nullable(),
	cholecalciferol: z.number().nullable(),
	ergocalciferol: z.number().nullable(),
	hydroxyCholecalciferol: z.number().nullable(),
	hydroxyErgocalciferol: z.number().nullable(),
	vitaminDEquivalents: z.number().nullable(),
	alphaTocopherol: z.number().nullable(),
	alphaTocotrienol: z.number().nullable(),
	betaTocopherol: z.number().nullable(),
	betaTocotrienol: z.number().nullable(),
	deltaTocopherol: z.number().nullable(),
	deltaTocotrienol: z.number().nullable(),
	gammaTocopherol: z.number().nullable(),
	gammaTocotrienol: z.number().nullable(),
	vitaminE: z.number().nullable(),
	totalSaturatedFattyAcids: z.number().nullable(),
	totalMonounsaturatedFattyAcids: z.number().nullable(),
	totalPolyunsaturatedFattyAcids: z.number().nullable(),
	totalLongChainOmega3FattyAcids: z.number().nullable(),
	totalTransFattyAcids: z.number().nullable(),
	caffeine: z.number().nullable(),
	cholesterol: z.number().nullable(),
	alanine: z.number().nullable(),
	arginine: z.number().nullable(),
	asparticAcid: z.number().nullable(),
	cystinePlusCysteine: z.number().nullable(),
	glutamicAcid: z.number().nullable(),
	glycine: z.number().nullable(),
	histidine: z.number().nullable(),
	isoleucine: z.number().nullable(),
	leucine: z.number().nullable(),
	lysine: z.number().nullable(),
	methionine: z.number().nullable(),
	phenylalanine: z.number().nullable(),
	proline: z.number().nullable(),
	serine: z.number().nullable(),
	threonine: z.number().nullable(),
	tyrosine: z.number().nullable(),
	tryptophan: z.number().nullable(),
	valine: z.number().nullable(),
	c4: z.number().nullable(),
	c6: z.number().nullable(),
	c8: z.number().nullable(),
	c10: z.number().nullable(),
	c11: z.number().nullable(),
	c12: z.number().nullable(),
	c13: z.number().nullable(),
	c14: z.number().nullable(),
	c15: z.number().nullable(),
	c16: z.number().nullable(),
	c17: z.number().nullable(),
	c18: z.number().nullable(),
	c19: z.number().nullable(),
	c20: z.number().nullable(),
	c21: z.number().nullable(),
	c22: z.number().nullable(),
	c23: z.number().nullable(),
	c24: z.number().nullable(),
	totalSaturatedFattyAcidsEquated: z.number().nullable(),
	c10_1: z.number().nullable(),
	c12_1: z.number().nullable(),
	c14_1: z.number().nullable(),
	c15_1: z.number().nullable(),
	c16_1: z.number().nullable(),
	c17_1: z.number().nullable(),
	c18_1: z.number().nullable(),
	c18_1w5: z.number().nullable(),
	c18_1w6: z.number().nullable(),
	c18_1w7: z.number().nullable(),
	c18_1w9: z.number().nullable(),
	c20_1: z.number().nullable(),
	c20_1w9: z.number().nullable(),
	c20_1w13: z.number().nullable(),
	c20_1w11: z.number().nullable(),
	c22_1: z.number().nullable(),
	c22_1w9: z.number().nullable(),
	c22_1w11: z.number().nullable(),
	c24_1: z.number().nullable(),
	c24_1w9: z.number().nullable(),
	c24_1w11: z.number().nullable(),
	c24_1w13: z.number().nullable(),
	totalMonounsaturatedFattyAcidsEquated: z.number().nullable(),
	c12_2: z.number().nullable(),
	c16_2w4: z.number().nullable(),
	c16_3: z.number().nullable(),
	c18_2w6: z.number().nullable(),
	c18_3w3: z.number().nullable(),
	c18_3w4: z.number().nullable(),
	c18_3w6: z.number().nullable(),
	c18_4w1: z.number().nullable(),
	c18_4w3: z.number().nullable(),
	c20_2: z.number().nullable(),
	c20_2w6: z.number().nullable(),
	c20_3: z.number().nullable(),
	c20_3w3: z.number().nullable(),
	c20_3w6: z.number().nullable(),
	c20_4: z.number().nullable(),
	c20_4w3: z.number().nullable(),
	c20_4w6: z.number().nullable(),
	c20_5w3: z.number().nullable(),
	c21_5w3: z.number().nullable(),
	c22_2: z.number().nullable(),
	c22_2w6: z.number().nullable(),
	c22_4w6: z.number().nullable(),
	c22_5w3: z.number().nullable(),
	c22_5w6: z.number().nullable(),
	c22_6w3: z.number().nullable(),
	totalPolyunsaturatedFattyAcidsEquated: z.number().nullable(),
})

const FormSupplement = ({
	supplement = null,
}: {
	supplement?: GetFullSupplementById | null
}) => {
	const [search, setSearch] = useState('')
	const ingredient = supplement
	const ctx = api.useUtils()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: ingredient?.name || '',
			serveSize: Number(ingredient?.serveSize) || 0,
			serveUnit: ingredient?.serveUnit || '',
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
	const onSubmit = (data: z.infer<typeof formSchema>) => {}

	return (
		<div className='flex flex-col gap-4'>
			<BackButton />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex flex-col gap-4'>
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
												onChange={(e) => field.onChange(Number(e.target.value))}
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
									className={cn('cursor-pointer active:scale-95', search === '' ? 'hidden' : '')}
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
										name={f.field}
										render={({ field }) => (
											<FormItem>
												<FormLabel>{f.name}</FormLabel>
												<FormControl>
													<Input
														placeholder={f.name}
														{...field}
														onChange={(e) =>
															field.onChange(Number(e.target.value))
														}
														type='number'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								))}
						</div>

						<div>
							<Button type='submit'>Submit</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	)
}

export { FormSupplement }
