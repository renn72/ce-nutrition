import { readFileSync } from 'fs'

import { db } from '@/server/db'
import { schema } from '@/server/db/index'
import {
  groceryStore,
  ingredient,
  ingredientAdditionOne,
  ingredientAdditionThree,
  ingredientAdditionTwo,
} from '@/server/db/schema/ingredient'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { parse } from 'csv-parse/sync'
import { pgGenerate } from 'drizzle-dbml-generator' // Using Postgres for this example
import { eq } from 'drizzle-orm'
import { z } from 'zod'

function isTuple<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0
}

export const testRouter = createTRPCRouter({
  createDBMap: protectedProcedure.mutation(async ({ ctx }) => {
    const out = './schema.dbml'
    const relational = true

    pgGenerate({ schema, out, relational })

    return true
  }),
  generateGroceryStores: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.insert(groceryStore).values([
      {
        name: 'Coles',
      },
      {
        name: 'Woolworths',
      },
      {
        name: 'IGA',
      },
    ])
    return res
  }),
  deleteAllIngredients: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(ingredient)
    return res
  }),
  importAFCDLiquid: protectedProcedure.mutation(async ({ ctx }) => {
    const file = readFileSync('./src/server/data/ingredient-liquid.csv', 'utf8')
    const csvData = parse(file, {
      columns: true,
      skip_empty_lines: true,
    })

    // @ts-ignore
    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, 'renn@warner.systems'),
      columns: {
        id: true,
      },
    })

    const r = await ctx.db
      .insert(ingredient)
      .values(
        // @ts-ignore
        csvData.map((row) => ({
          userId: user?.id ?? '',
          serveSize: '100',
          serveUnit: 'mls',
          isAusFood: true,
          isAllStores: true,
          publicFoodKey: row['Public Food Key'],
          classification: row['Classification'],
          foodName: row['Food name'],
          name: row['Food name'],
          caloriesWFibre: (
            Number(row['Energy with dietary fibre, equated \n(kJ)']) * 0.239
          ).toFixed(2),
          caloriesWOFibre: (
            Number(row['Energy, without dietary fibre, equated \n(kJ)']) * 0.239
          ).toFixed(2),
          protein: row['Protein \n(g)'],
          fatTotal: row['Fat, total \n(g)'],
          totalDietaryFibre: row['Total dietary fibre \n(g)'],
          totalSugars: row['Total sugars (g)'],
          starch: row['Starch \n(g)'],
          resistantStarch: row['Resistant starch \n(g)'],
          availableCarbohydrateWithoutSugarAlcohols:
            row['Available carbohydrate, without sugar alcohols \n(g)'],
          availableCarbohydrateWithSugarAlcohols:
            row['Available carbohydrate, with sugar alcohols \n(g)'],
        })),
      )
      .returning({
        id: ingredient.id,
        publicFoodKey: ingredient.publicFoodKey,
      })
    console.log(r)

    const insertOne = async (csv: any) => {
      await ctx.db.insert(ingredientAdditionOne).values(
        // @ts-ignore
        csv.map((row) => ({
          ingredientId:
            r.find((i) => i.publicFoodKey == row['Public Food Key'])?.id ||
            null,
          energyWithDietaryFibre:
            row['Energy with dietary fibre, equated \n(kJ)'],
          energyWithoutDietaryFibre:
            row['Energy, without dietary fibre, equated \n(kJ)'],
          addedSugars: row['Added sugars (g)'],
          freeSugars: row['Free sugars \n(g)'],
          moisture: row['Moisture (water) \n(g)'],
          nitrogen: row['Nitrogen \n(g)'],
          alcohol: row['Alcohol \n(g)'],
          fructose: row['Fructose \n(g)'],
          glucose: row['Glucose \n(g)'],
          sucrose: row['Sucrose\n(g)'],
          maltose: row['Maltose \n(g)'],
          lactose: row['Lactose \n(g)'],
          galactose: row['Galactose \n(g)'],
          maltotrios: row['Maltotrios \n(g)'],
          ash: row['Ash \n(g)'],
          dextrin: row['Dextrin \n(g)'],
          glycerol: row['Glycerol \n(g)'],
          glycogen: row['Glycogen \n(g)'],
          inulin: row['Inulin \n(g)'],
          erythritol: row['Erythritol \n(g)'],
          maltitol: row['Maltitol \n(g)'],
          mannitol: row['Mannitol \n(g)'],
          xylitol: row['Xylitol \n(g)'],
          maltodextrin: row['Maltodextrin (g)'],
          oligosaccharides: row['Oligosaccharides  \n(g)'],
          polydextrose: row['Polydextrose \n(g)'],
          raffinose: row['Raffinose \n(g)'],
          stachyose: row['Stachyose \n(g)'],
          sorbitol: row['Sorbitol \n(g)'],
        })),
      )
    }

    await insertOne(csvData)

    const insertTwo = async (csv: any) => {
      await ctx.db.insert(ingredientAdditionTwo).values(
        // @ts-ignore
        csv.map((row) => ({
          ingredientId:
            r.find((i) => i.publicFoodKey == row['Public Food Key'])?.id ||
            null,
          aceticAcid: row['Acetic acid \n(g)'],
          citricAcid: row['Citric acid \n(g)'],
          fumaricAcid: row['Fumaric acid \n(g)'],
          lacticAcid: row['Lactic acid \n(g)'],
          malicAcid: row['Malic acid\n (g)'],
          oxalicAcid: row['Oxalic acid \n(g)'],
          propionicAcid: row['Propionic acid \n(g)'],
          quinicAcid: row['Quinic acid \n(g)'],
          shikimicAcid: row['Shikimic acid \n(g)'],
          succinicAcid: row['Succinic acid \n(g)'],
          tartaricAcid: row['Tartaric acid \n(g)'],
          aluminium: row['Aluminium (Al) \n(ug)'],
          antimony: row['Antimony (Sb) \n(ug)'],
          arsenic: row['Arsenic (As) \n(ug)'],
          cadmium: row['Cadmium (Cd) \n(ug)'],
          calcium: row['Calcium (Ca) \n(mg)'],
          chromium: row['Chromium (Cr) \n(ug)'],
          chloride: row['Chloride (Cl) \n(mg)'],
          cobalt: row['Cobalt (Co) \n(ug)'],
          copper: row['Copper (Cu) \n(mg)'],
          fluoride: row['Fluoride (F) \n(ug)'],
          iodine: row['Iodine (I) \n(ug)'],
          iron: row['Iron (Fe) \n(mg)'],
          lead: row['Lead (Pb) \n(ug)'],
          magnesium: row['Magnesium (Mg) \n(mg)'],
          manganese: row['Manganese (Mn) \n(mg)'],
          mercury: row['Mercury (Hg) \n(ug)'],
          molybdenum: row['Molybdenum (Mo) \n(ug)'],
          nickel: row['Nickel (Ni) \n(ug)'],
          phosphorus: row['Phosphorus (P) \n(mg)'],
          potassium: row['Potassium (K) \n(mg)'],
          selenium: row['Selenium (Se) \n(ug)'],
          sodium: row['Sodium (Na) \n(mg)'],
          sulphur: row['Sulphur (S) \n(mg)'],
          tin: row['Tin (Sn) \n(ug)'],
          zinc: row['Zinc (Zn) \n(mg)'],
          retinol: row['Retinol (preformed vitamin A) \n(ug)'],
          alphaCarotene: row['Alpha-carotene \n(ug)'],
          betaCarotene: row['Beta-carotene \n(ug)'],
          cryptoxanthin: row['Cryptoxanthin \n(ug)'],
          betaCaroteneEquivalents:
            row['Beta-carotene equivalents (provitamin A) \n(ug)'],
          vitaminARetinolEquivalents:
            row['Vitamin A retinol equivalents \n(ug)'],
          lutein: row['Lutein \n(ug)'],
          lycopene: row['Lycopene \n(ug)'],
          xanthophyl: row['Xanthophyl \n(ug)'],
          thiamin: row['Thiamin (B1) \n(mg)'],
          riboflavin: row['Riboflavin (B2) \n(mg)'],
          niacin: row['Niacin (B3) \n(mg)'],
          niacinDerivedFromTryptophan:
            row['Niacin derived from tryptophan \n(mg)'],
          niacinDerivedEquivalents: row['Niacin derived equivalents \n(mg)'],
          pantothenicAcid: row['Pantothenic acid (B5) \n(mg)'],
          pyridoxine: row['Pyridoxine (B6) \n(mg)'],
          biotin: row['Biotin (B7) \n(ug)'],
          cobalamin: row['Cobalamin (B12) \n(ug)'],
          folateNatural: row['Folate, natural \n(ug)'],
          folicAcid: row['Folic acid \n(ug)'],
          totalFolates: row['Total folates \n(ug)'],
          dietaryFolateEquivalents: row['Dietary folate equivalents \n(ug)'],
          vitaminC: row['Vitamin C \n(mg)'],
          cholecalciferol: row['Cholecalciferol (D3) \n(ug)'],
          ergocalciferol: row['Ergocalciferol (D2) \n(ug)'],
          hydroxyCholecalciferol:
            row['25-hydroxy cholecalciferol (25-OH D3) \n(ug)'],
          hydroxyErgocalciferol:
            row['25-hydroxy ergocalciferol (25-OH D2) \n(ug)'],
          vitaminDEquivalents: row['Vitamin D3 equivalents \n(ug)'],
          alphaTocopherol: row['Alpha tocopherol \n(mg)'],
          alphaTocotrienol: row['Alpha tocotrienol \n(mg)'],
          betaTocopherol: row['Beta tocopherol \n(mg)'],
          betaTocotrienol: row['Beta tocotrienol \n(mg)'],
          deltaTocopherol: row['Delta tocopherol \n(mg)'],
          deltaTocotrienol: row['Delta tocotrienol \n(mg)'],
          gammaTocopherol: row['Gamma tocopherol \n(mg)'],
          gammaTocotrienol: row['Gamma tocotrienol \n(mg)'],
          vitaminE: row['Vitamin E \n(mg)'],
        })),
      )
    }

    await insertTwo(csvData)

    const insertThree = async (csv: any) => {
      await ctx.db.insert(ingredientAdditionThree).values(
        // @ts-ignore
        csv.map((row) => ({
          ingredientId:
            r.find((i) => i.publicFoodKey == row['Public Food Key'])?.id ||
            null,
          totalSaturatedFattyAcids:
            row['Total saturated fatty acids, equated (%T)'],
          totalMonounsaturatedFattyAcids:
            row['Total monounsaturated fatty acids, equated (%T)'],
          totalPolyunsaturatedFattyAcids:
            row['Total polyunsaturated fatty acids, equated (%T)'],
          totalLongChainOmega3FattyAcids:
            row['Total long chain omega 3 fatty acids, equated \n(%T)'],
          totalTransFattyAcids: row['Total trans fatty acids, imputed \n(%T)'],
          caffeine: row['Caffeine \n(mg)'],
          cholesterol: row['Cholesterol \n(mg)'],
          alanine: row['Alanine \n(mg/gN)'],
          arginine: row['Arginine \n(mg/gN)'],
          asparticAcid: row['Aspartic acid \n(mg/gN)'],
          cystinePlusCysteine: row['Cystine plus cysteine \n(mg/gN)'],
          glutamicAcid: row['Glutamic acid \n(mg/gN)'],
          glycine: row['Glycine \n(mg/gN)'],
          histidine: row['Histidine \n(mg/gN)'],
          isoleucine: row['Isoleucine \n(mg/gN)'],
          leucine: row['Leucine \n(mg/gN)'],
          lysine: row['Lysine \n(mg/gN)'],
          methionine: row['Methionine \n(mg/gN)'],
          phenylalanine: row['Phenylalanine \n(mg/gN)'],
          proline: row['Proline \n(mg/gN)'],
          serine: row['Serine \n(mg/gN)'],
          threonine: row['Threonine \n(mg/gN)'],
          tyrosine: row['Tyrosine \n(mg/gN)'],
          tryptophan: row['Tryptophan \n(mg/gN)'],
          valine: row['Valine \n(mg/gN)'],
          c4: row['C4 (%T)'],
          c6: row['C6 (%T)'],
          c8: row['C8 (%T)'],
          c10: row['C10 (%T)'],
          c11: row['C11 (%T)'],
          c12: row['C12 (%T)'],
          c13: row['C13 (%T)'],
          c14: row['C14 (%T)'],
          c15: row['C15 (%T)'],
          c16: row['C16 (%T)'],
          c17: row['C17 (%T)'],
          c18: row['C18 (%T)'],
          c19: row['C19 (%T)'],
          c20: row['C20 (%T)'],
          c21: row['C21 (%T)'],
          c22: row['C22 (%T)'],
          c23: row['C23 (%T)'],
          c24: row['C24 (%T)'],
          totalSaturatedFattyAcidsEquated:
            row['Total saturated fatty acids, equated (%T)'],
          c10_1: row['C10:1 (%T)'],
          c12_1: row['C12:1 (%T)'],
          c14_1: row['C14:1 (%T)'],
          c15_1: row['C15:1 (%T)'],
          c16_1: row['C16:1 (%T)'],
          c17_1: row['C17:1 (%T)'],
          c18_1: row['C18:1 (%T)'],
          c18_1w5: row['C18:1w5 (%T)'],
          c18_1w6: row['C18:1w6 (%T)'],
          c18_1w7: row['C18:1w7 (%T)'],
          c18_1w9: row['C18:1w9 (%T)'],
          c20_1: row['C20:1 (%T)'],
          c20_1w9: row['C20:1w9 (%T)'],
          c20_1w13: row['C20:1w13 (%T)'],
          c20_1w11: row['C20:1w11 (%T)'],
          c22_1: row['C22:1 (%T)'],
          c22_1w9: row['C22:1w9 (%T)'],
          c22_1w11: row['C22:1w11 (%T)'],
          c24_1: row['C24:1 (%T)'],
          c24_1w9: row['C24:1w9 (%T)'],
          c24_1w11: row['C24:1w11 (%T)'],
          c24_1w13: row['C24:1w13 (%T)'],
          totalMonounsaturatedFattyAcidsEquated:
            row['Total monounsaturated fatty acids, equated (%T)'],
          c12_2: row['C12:2 (%T)'],
          c16_2w4: row['C16:2w4 (%T)'],
          c16_3: row['C16:3 (%T)'],
          c18_2w6: row['C18:2w6 (%T)'],
          c18_3w3: row['C18:3w3 (%T)'],
          c18_3w4: row['C18:3w4 (%T)'],
          c18_3w6: row['C18:3w6 (%T)'],
          c18_4w1: row['C18:4w1 (%T)'],
          c18_4w3: row['C18:4w3 (%T)'],
          c20_2: row['C20:2 (%T)'],
          c20_2w6: row['C20:2w6 (%T)'],
          c20_3: row['C20:3 (%T)'],
          c20_3w3: row['C20:3w3 (%T)'],
          c20_3w6: row['C20:3w6 (%T)'],
          c20_4: row['C20:4 (%T)'],
          c20_4w3: row['C20:4w3 (%T)'],
          c20_4w6: row['C20:4w6 (%T)'],
          c20_5w3: row['C20:5w3 (%T)'],
          c21_5w3: row['C21:5w3 (%T)'],
          c22_2: row['C22:2 (%T)'],
          c22_2w6: row['C22:2w6 (%T)'],
          c22_4w6: row['C22:4w6 (%T)'],
          c22_5w3: row['C22:5w3 (%T)'],
          c22_5w6: row['C22:5w6 (%T)'],
          c22_6w3: row['C22:6w3 (%T)'],
          totalPolyunsaturatedFattyAcidsEquated:
            row['Total polyunsaturated fatty acids, equated (%T)'],
        })),
      )
    }

    await insertThree(csvData)

    return r
  }),
  importAFCDSolid: protectedProcedure.mutation(async ({ ctx }) => {
    const file = readFileSync('./src/server/data/ingredient-solid.csv', 'utf8')
    const csvData = parse(file, {
      columns: true,
      skip_empty_lines: true,
    })

    const csv1 = csvData.slice(0, 200)
    const csv2 = csvData.slice(200, 400)
    const csv3 = csvData.slice(400, 600)
    const csv4 = csvData.slice(600, 800)
    const csv5 = csvData.slice(800, 1000)
    const csv6 = csvData.slice(1000, 1200)
    const csv7 = csvData.slice(1200, 1400)
    const csv8 = csvData.slice(1400, csvData.length)

    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, 'renn@warner.systems'),
      columns: {
        id: true,
      },
    })

    const r = await ctx.db
      .insert(ingredient)
      .values(
        // @ts-ignore
        csvData.map((row) => ({
          userId: user?.id ?? '',
          serveSize: '100',
          serveUnit: 'grams',
          isAusFood: true,
          publicFoodKey: row['Public Food Key'],
          classification: row['Classification'],
          foodName: row['Food Name'],
          name: row['Food Name'],
          caloriesWFibre: (
            Number(row['Energy with dietary fibre, equated \n(kJ)']) * 0.239
          ).toFixed(2),
          caloriesWOFibre: (
            Number(row['Energy, without dietary fibre, equated \n(kJ)']) * 0.239
          ).toFixed(2),
          protein: row['Protein \n(g)'],
          fatTotal: row['Fat, total \n(g)'],
          totalDietaryFibre: row['Total dietary fibre \n(g)'],
          totalSugars: row['Total sugars (g)'],
          starch: row['Starch \n(g)'],
          resistantStarch: row['Resistant starch \n(g)'],
          availableCarbohydrateWithoutSugarAlcohols:
            row['Available carbohydrate, without sugar alcohols \n(g)'],
          availableCarbohydrateWithSugarAlcohols:
            row['Available carbohydrate, with sugar alcohols \n(g)'],
        })),
      )
      .returning({
        id: ingredient.id,
        publicFoodKey: ingredient.publicFoodKey,
      })
    console.log(r)

    const insertOne = async (csv: any) => {
      await ctx.db.insert(ingredientAdditionOne).values(
        // @ts-ignore
        csv.map((row) => ({
          ingredientId:
            r.find((i) => i.publicFoodKey == row['Public Food Key'])?.id ||
            null,
          energyWithDietaryFibre:
            row['Energy with dietary fibre, equated \n(kJ)'],
          energyWithoutDietaryFibre:
            row['Energy, without dietary fibre, equated \n(kJ)'],
          addedSugars: row['Added sugars (g)'],
          freeSugars: row['Free sugars \n(g)'],
          moisture: row['Moisture (water) \n(g)'],
          nitrogen: row['Nitrogen \n(g)'],
          alcohol: row['Alcohol \n(g)'],
          fructose: row['Fructose \n(g)'],
          glucose: row['Glucose \n(g)'],
          sucrose: row['Sucrose\n(g)'],
          maltose: row['Maltose \n(g)'],
          lactose: row['Lactose \n(g)'],
          galactose: row['Galactose \n(g)'],
          maltotrios: row['Maltotrios \n(g)'],
          ash: row['Ash \n(g)'],
          dextrin: row['Dextrin \n(g)'],
          glycerol: row['Glycerol \n(g)'],
          glycogen: row['Glycogen \n(g)'],
          inulin: row['Inulin \n(g)'],
          erythritol: row['Erythritol \n(g)'],
          maltitol: row['Maltitol \n(g)'],
          mannitol: row['Mannitol \n(g)'],
          xylitol: row['Xylitol \n(g)'],
          maltodextrin: row['Maltodextrin (g)'],
          oligosaccharides: row['Oligosaccharides  \n(g)'],
          polydextrose: row['Polydextrose \n(g)'],
          raffinose: row['Raffinose \n(g)'],
          stachyose: row['Stachyose \n(g)'],
          sorbitol: row['Sorbitol \n(g)'],
        })),
      )
    }

    await insertOne(csv1)
    await insertOne(csv2)
    await insertOne(csv3)
    await insertOne(csv4)
    await insertOne(csv5)
    await insertOne(csv6)
    await insertOne(csv7)
    await insertOne(csv8)

    const insertTwo = async (csv: any) => {
      await ctx.db.insert(ingredientAdditionTwo).values(
        // @ts-ignore
        csv.map((row) => ({
          ingredientId:
            r.find((i) => i.publicFoodKey == row['Public Food Key'])?.id ||
            null,
          aceticAcid: row['Acetic acid \n(g)'],
          citricAcid: row['Citric acid \n(g)'],
          fumaricAcid: row['Fumaric acid \n(g)'],
          lacticAcid: row['Lactic acid \n(g)'],
          malicAcid: row['Malic acid\n (g)'],
          oxalicAcid: row['Oxalic acid \n(g)'],
          propionicAcid: row['Propionic acid \n(g)'],
          quinicAcid: row['Quinic acid \n(g)'],
          shikimicAcid: row['Shikimic acid \n(g)'],
          succinicAcid: row['Succinic acid \n(g)'],
          tartaricAcid: row['Tartaric acid \n(g)'],
          aluminium: row['Aluminium (Al) \n(ug)'],
          antimony: row['Antimony (Sb) \n(ug)'],
          arsenic: row['Arsenic (As) \n(ug)'],
          cadmium: row['Cadmium (Cd) \n(ug)'],
          calcium: row['Calcium (Ca) \n(mg)'],
          chromium: row['Chromium (Cr) \n(ug)'],
          chloride: row['Chloride (Cl) \n(mg)'],
          cobalt: row['Cobalt (Co) \n(ug)'],
          copper: row['Copper (Cu) \n(mg)'],
          fluoride: row['Fluoride (F) \n(ug)'],
          iodine: row['Iodine (I) \n(ug)'],
          iron: row['Iron (Fe) \n(mg)'],
          lead: row['Lead (Pb) \n(ug)'],
          magnesium: row['Magnesium (Mg) \n(mg)'],
          manganese: row['Manganese (Mn) \n(mg)'],
          mercury: row['Mercury (Hg) \n(ug)'],
          molybdenum: row['Molybdenum (Mo) \n(ug)'],
          nickel: row['Nickel (Ni) \n(ug)'],
          phosphorus: row['Phosphorus (P) \n(mg)'],
          potassium: row['Potassium (K) \n(mg)'],
          selenium: row['Selenium (Se) \n(ug)'],
          sodium: row['Sodium (Na) \n(mg)'],
          sulphur: row['Sulphur (S) \n(mg)'],
          tin: row['Tin (Sn) \n(ug)'],
          zinc: row['Zinc (Zn) \n(mg)'],
          retinol: row['Retinol (preformed vitamin A) \n(ug)'],
          alphaCarotene: row['Alpha-carotene \n(ug)'],
          betaCarotene: row['Beta-carotene \n(ug)'],
          cryptoxanthin: row['Cryptoxanthin \n(ug)'],
          betaCaroteneEquivalents:
            row['Beta-carotene equivalents (provitamin A) \n(ug)'],
          vitaminARetinolEquivalents:
            row['Vitamin A retinol equivalents \n(ug)'],
          lutein: row['Lutein \n(ug)'],
          lycopene: row['Lycopene \n(ug)'],
          xanthophyl: row['Xanthophyl \n(ug)'],
          thiamin: row['Thiamin (B1) \n(mg)'],
          riboflavin: row['Riboflavin (B2) \n(mg)'],
          niacin: row['Niacin (B3) \n(mg)'],
          niacinDerivedFromTryptophan:
            row['Niacin derived from tryptophan \n(mg)'],
          niacinDerivedEquivalents: row['Niacin derived equivalents \n(mg)'],
          pantothenicAcid: row['Pantothenic acid (B5) \n(mg)'],
          pyridoxine: row['Pyridoxine (B6) \n(mg)'],
          biotin: row['Biotin (B7) \n(ug)'],
          cobalamin: row['Cobalamin (B12) \n(ug)'],
          folateNatural: row['Folate, natural \n(ug)'],
          folicAcid: row['Folic acid \n(ug)'],
          totalFolates: row['Total folates \n(ug)'],
          dietaryFolateEquivalents: row['Dietary folate equivalents \n(ug)'],
          vitaminC: row['Vitamin C \n(mg)'],
          cholecalciferol: row['Cholecalciferol (D3) \n(ug)'],
          ergocalciferol: row['Ergocalciferol (D2) \n(ug)'],
          hydroxyCholecalciferol:
            row['25-hydroxy cholecalciferol (25-OH D3) \n(ug)'],
          hydroxyErgocalciferol:
            row['25-hydroxy ergocalciferol (25-OH D2) \n(ug)'],
          vitaminDEquivalents: row['Vitamin D3 equivalents \n(ug)'],
          alphaTocopherol: row['Alpha tocopherol \n(mg)'],
          alphaTocotrienol: row['Alpha tocotrienol \n(mg)'],
          betaTocopherol: row['Beta tocopherol \n(mg)'],
          betaTocotrienol: row['Beta tocotrienol \n(mg)'],
          deltaTocopherol: row['Delta tocopherol \n(mg)'],
          deltaTocotrienol: row['Delta tocotrienol \n(mg)'],
          gammaTocopherol: row['Gamma tocopherol \n(mg)'],
          gammaTocotrienol: row['Gamma tocotrienol \n(mg)'],
          vitaminE: row['Vitamin E \n(mg)'],
        })),
      )
    }

    await insertTwo(csv1)
    await insertTwo(csv2)
    await insertTwo(csv3)
    await insertTwo(csv4)
    await insertTwo(csv5)
    await insertTwo(csv6)
    await insertTwo(csv7)
    await insertTwo(csv8)

    const insertThree = async (csv: any) => {
      await ctx.db.insert(ingredientAdditionThree).values(
        // @ts-ignore
        csv.map((row) => ({
          ingredientId:
            r.find((i) => i.publicFoodKey == row['Public Food Key'])?.id ||
            null,
          totalSaturatedFattyAcids:
            row['Total saturated fatty acids, equated (%T)'],
          totalMonounsaturatedFattyAcids:
            row['Total monounsaturated fatty acids, equated (%T)'],
          totalPolyunsaturatedFattyAcids:
            row['Total polyunsaturated fatty acids, equated (%T)'],
          totalLongChainOmega3FattyAcids:
            row['Total long chain omega 3 fatty acids, equated \n(%T)'],
          totalTransFattyAcids: row['Total trans fatty acids, imputed \n(%T)'],
          caffeine: row['Caffeine \n(mg)'],
          cholesterol: row['Cholesterol \n(mg)'],
          alanine: row['Alanine \n(mg/gN)'],
          arginine: row['Arginine \n(mg/gN)'],
          asparticAcid: row['Aspartic acid \n(mg/gN)'],
          cystinePlusCysteine: row['Cystine plus cysteine \n(mg/gN)'],
          glutamicAcid: row['Glutamic acid \n(mg/gN)'],
          glycine: row['Glycine \n(mg/gN)'],
          histidine: row['Histidine \n(mg/gN)'],
          isoleucine: row['Isoleucine \n(mg/gN)'],
          leucine: row['Leucine \n(mg/gN)'],
          lysine: row['Lysine \n(mg/gN)'],
          methionine: row['Methionine \n(mg/gN)'],
          phenylalanine: row['Phenylalanine \n(mg/gN)'],
          proline: row['Proline \n(mg/gN)'],
          serine: row['Serine \n(mg/gN)'],
          threonine: row['Threonine \n(mg/gN)'],
          tyrosine: row['Tyrosine \n(mg/gN)'],
          tryptophan: row['Tryptophan \n(mg/gN)'],
          valine: row['Valine \n(mg/gN)'],
          c4: row['C4 (%T)'],
          c6: row['C6 (%T)'],
          c8: row['C8 (%T)'],
          c10: row['C10 (%T)'],
          c11: row['C11 (%T)'],
          c12: row['C12 (%T)'],
          c13: row['C13 (%T)'],
          c14: row['C14 (%T)'],
          c15: row['C15 (%T)'],
          c16: row['C16 (%T)'],
          c17: row['C17 (%T)'],
          c18: row['C18 (%T)'],
          c19: row['C19 (%T)'],
          c20: row['C20 (%T)'],
          c21: row['C21 (%T)'],
          c22: row['C22 (%T)'],
          c23: row['C23 (%T)'],
          c24: row['C24 (%T)'],
          totalSaturatedFattyAcidsEquated:
            row['Total saturated fatty acids, equated (%T)'],
          c10_1: row['C10:1 (%T)'],
          c12_1: row['C12:1 (%T)'],
          c14_1: row['C14:1 (%T)'],
          c15_1: row['C15:1 (%T)'],
          c16_1: row['C16:1 (%T)'],
          c17_1: row['C17:1 (%T)'],
          c18_1: row['C18:1 (%T)'],
          c18_1w5: row['C18:1w5 (%T)'],
          c18_1w6: row['C18:1w6 (%T)'],
          c18_1w7: row['C18:1w7 (%T)'],
          c18_1w9: row['C18:1w9 (%T)'],
          c20_1: row['C20:1 (%T)'],
          c20_1w9: row['C20:1w9 (%T)'],
          c20_1w13: row['C20:1w13 (%T)'],
          c20_1w11: row['C20:1w11 (%T)'],
          c22_1: row['C22:1 (%T)'],
          c22_1w9: row['C22:1w9 (%T)'],
          c22_1w11: row['C22:1w11 (%T)'],
          c24_1: row['C24:1 (%T)'],
          c24_1w9: row['C24:1w9 (%T)'],
          c24_1w11: row['C24:1w11 (%T)'],
          c24_1w13: row['C24:1w13 (%T)'],
          totalMonounsaturatedFattyAcidsEquated:
            row['Total monounsaturated fatty acids, equated (%T)'],
          c12_2: row['C12:2 (%T)'],
          c16_2w4: row['C16:2w4 (%T)'],
          c16_3: row['C16:3 (%T)'],
          c18_2w6: row['C18:2w6 (%T)'],
          c18_3w3: row['C18:3w3 (%T)'],
          c18_3w4: row['C18:3w4 (%T)'],
          c18_3w6: row['C18:3w6 (%T)'],
          c18_4w1: row['C18:4w1 (%T)'],
          c18_4w3: row['C18:4w3 (%T)'],
          c20_2: row['C20:2 (%T)'],
          c20_2w6: row['C20:2w6 (%T)'],
          c20_3: row['C20:3 (%T)'],
          c20_3w3: row['C20:3w3 (%T)'],
          c20_3w6: row['C20:3w6 (%T)'],
          c20_4: row['C20:4 (%T)'],
          c20_4w3: row['C20:4w3 (%T)'],
          c20_4w6: row['C20:4w6 (%T)'],
          c20_5w3: row['C20:5w3 (%T)'],
          c21_5w3: row['C21:5w3 (%T)'],
          c22_2: row['C22:2 (%T)'],
          c22_2w6: row['C22:2w6 (%T)'],
          c22_4w6: row['C22:4w6 (%T)'],
          c22_5w3: row['C22:5w3 (%T)'],
          c22_5w6: row['C22:5w6 (%T)'],
          c22_6w3: row['C22:6w3 (%T)'],
          totalPolyunsaturatedFattyAcidsEquated:
            row['Total polyunsaturated fatty acids, equated (%T)'],
        })),
      )
    }

    await insertThree(csv1)
    await insertThree(csv2)
    await insertThree(csv3)
    await insertThree(csv4)
    await insertThree(csv5)
    await insertThree(csv6)
    await insertThree(csv7)
    await insertThree(csv8)

    return r
  }),
})
