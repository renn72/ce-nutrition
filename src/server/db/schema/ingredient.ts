import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core'

import { user } from './user'

export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)

export const ingredient = createTable('ingredient', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  userId: text('user_id').references(() => user.id),
  serveSize: text('serve_size'),
  serveUnit: text('serve_unit'),
  publicFoodKey: text('public_food_key'),
  classification: text('classification'),
  foodName: text('food_name'),
  energyWithFibre: text('energy_with_fibre'), // kJ
  energyWithoutFibre: text('energy_without_fibre'), // kJ
  moisture: text('moisture'), // g
  protein: text('protein'), // g
  nitrogen: text('nitrogen'), // g
  fatTotal: text('fat_total'), // g
  ash: text('ash'), // g
  totalDietaryFibre: text('total_dietary_fibre'), // g
  alcohol: text('alcohol'), // g
  fructose: text('fructose'), // g
  glucose: text('glucose'), // g
  sucrose: text('sucrose'), // g
  maltose: text('maltose'), // g
  lactose: text('lactose'), // g
  galactose: text('galactose'), // g
  maltotrios: text('maltotrios'), // g
  totalSugars: text('total_sugars'), // g
  addedSugars: text('added_sugars'), // g
  freeSugars: text('free_sugars'), // g
  starch: text('starch'), // g
  dextrin: text('dextrin'), // g
  glycerol: text('glycerol'), // g
  glycogen: text('glycogen'), // g
  inulin: text('inulin'), // g
  erythritol: text('erythritol'), // g
  maltitol: text('maltitol'), // g
  mannitol: text('mannitol'), // g
  xylitol: text('xylitol'), // g
  maltodextrin: text('maltodextrin'), // g
  oligosaccharides: text('oligosaccharides'), // g
  polydextrose: text('polydextrose'), // g
  raffinose: text('raffinose'), // g
  stachyose: text('stachyose'), // g
  sorbitol: text('sorbitol'), // g
  resistantStarch: text('resistant_starch'), // g
  availableCarbohydrateWithoutSugarAlcohols: text(
    'available_carbohydrate_without_sugar_alcohols',
  ), // g
  availableCarbohydrateWithSugarAlcohols: text(
    'available_carbohydrate_with_sugar_alcohols',
  ), // g
  aceticAcid: text('acetic_acid'), // g
  citricAcid: text('citric_acid'), // g
  fumaricAcid: text('fumaric_acid'), // g
  lacticAcid: text('lactic_acid'), // g
  malicAcid: text('malic_acid'), // g
  oxalicAcid: text('oxalic_acid'), // g
  propionicAcid: text('propionic_acid'), // g
  quinicAcid: text('quinic_acid'), // g
  shikimicAcid: text('shikimic_acid'), // g
  succinicAcid: text('succinic_acid'), // g
  tartaricAcid: text('tartaric_acid'), // g
  aluminium: text('aluminium'), // ug
  antimony: text('antimony'), // ug
  arsenic: text('arsenic'), // ug
  cadmium: text('cadmium'), // ug
  calcium: text('calcium'), // mg
  chromium: text('chromium'), // ug
  chloride: text('chloride'), // mg
  cobalt: text('cobalt'), // ug
  copper: text('copper'), // mg
  fluoride: text('fluoride'), // ug
  iodine: text('iodine'), // ug
  iron: text('iron'), // mg
  lead: text('lead'), // ug
  magnesium: text('magnesium'), // mg
  manganese: text('manganese'), // mg
  mercury: text('mercury'), // ug
  molybdenum: text('molybdenum'), // ug
  nickel: text('nickel'), // ug
  phosphorus: text('phosphorus'), // mg
  potassium: text('potassium'), // mg
  selenium: text('selenium'), // ug
  sodium: text('sodium'), // mg
  sulphur: text('sulphur'), // mg
  tin: text('tin'), // ug
  zinc: text('zinc'), // mg
  retinol: text('retinol'), // ug
  alphaCarotene: text('alpha_carotene'), // ug
  betaCarotene: text('beta_carotene'), // ug
  cryptoxanthin: text('cryptoxanthin'), // ug
  betaCaroteneEquivalents: text('beta_carotene_equivalents'), // ug
  vitaminARetinolEquivalents: text('vitamin_a_retinol_equivalents'), // ug
  lutein: text('lutein'), // ug
  lycopene: text('lycopene'), // ug
  xanthophyl: text('xanthophyl'), // ug
  thiamin: text('thiamin'), // mg
  riboflavin: text('riboflavin'), // mg
  niacin: text('niacin'), // mg
  niacinDerivedFromTryptophan: text('niacin_derived_from_tryptophan'), // mg
  niacinDerivedEquivalents: text('niacin_derived_equivalents'), // mg
  pantothenicAcid: text('pantothenic_acid'), // mg
  pyridoxine: text('pyridoxine'), // mg
  biotin: text('biotin'), // ug
  cobalamin: text('cobalamin'), // ug
  folateNatural: text('folate_natural'), // ug
  folicAcid: text('folic_acid'), // ug
  totalFolates: text('total_folates'), // ug
  dietaryFolateEquivalents: text('dietary_folate_equivalents'), // ug
  vitaminC: text('vitamin_c'), // mg
  cholecalciferol: text('cholecalciferol'), // ug
  ergocalciferol: text('ergocalciferol'), // ug
  vitaminD3Equivalents: text('vitamin_d3_equivalents'), // ug
  alphaTocopherol: text('alpha_tocopherol'), // mg
  alphaTocotrienol: text('alpha_tocotrienol'), // mg
  betaTocopherol: text('beta_tocopherol'), // mg
  deltaTocopherol: text('delta_tocopherol'), // mg
  gammaTocopherol: text('gamma_tocopherol'), // mg
  vitaminE: text('vitamin_e'), // mg
  caffeine: text('caffeine'), // mg
  cholesterol: text('cholesterol'), // mg
  alanine: text('alanine'), // mg/gN
  arginine: text('arginine'), // mg/gN
  asparticAcid: text('aspartic_acid'), // mg/gN
  cystinePlusCysteine: text('cystine_plus_cysteine'), // mg/gN
  glutamicAcid: text('glutamic_acid'), // mg/gN
  glycine: text('glycine'), // mg/gN
  histidine: text('histidine'), // mg/gN
  isoleucine: text('isoleucine'), // mg/gN
  leucine: text('leucine'), // mg/gN
  lysine: text('lysine'), // mg/gN
  methionine: text('methionine'), // mg/gN
  phenylalanine: text('phenylalanine'), // mg/gN
  proline: text('proline'), // mg/gN
  serine: text('serine'), // mg/gN
  threonine: text('threonine'), // mg/gN
  tyrosine: text('tyrosine'), // mg/gN
  tryptophan: text('tryptophan'), // mg/gN
  valine: text('valine'), // mg/gN
})

export const groceryStore = createTable('grocery_store', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  name: text('name'),
  locations: text('locations'),
})



