import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'

import { recipeToIngredient } from './recipe'
import { userIngredient } from './user-plan'
import { user } from './user'

const createTable = sqliteTable

export const ingredient = createTable(
  'ingredient',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
      () => new Date(),
    ),
    userId: text('user_id').references(() => user.id),
    favouriteAt: int('favourite_at', { mode: 'timestamp' }),
    deletedAt: int('deleted_at', { mode: 'timestamp' }),
    hiddenAt: int('hidden_at', { mode: 'timestamp' }),
    isAusFood: int('is_aus_food', { mode: 'boolean' }),
    isAllStores: int('is_all_stores', { mode: 'boolean' }).default(true),
    serveSize: text('serve_size'),
    serveUnit: text('serve_unit'),
    publicFoodKey: text('public_food_key'),
    classification: text('classification'),
    foodName: text('food_name'),
    name: text('name'),
    caloriesWFibre: text('calories_w_fibre'),
    caloriesWOFibre: text('calories_wo_fibre'),
    protein: text('protein'),
    fatTotal: text('fat_total'),
    totalDietaryFibre: text('total_dietary_fibre'),
    totalSugars: text('total_sugars'),
    starch: text('starch'),
    resistantStarch: text('resistant_starch'),
    availableCarbohydrateWithoutSugarAlcohols: text(
      'available_carbohydrate_without_sugar_alcohols',
    ),
    availableCarbohydrateWithSugarAlcohols: text(
      'available_carbohydrate_with_sugar_alcohols',
    ),
    isUserCreated: int('is_user_created', { mode: 'boolean' }).default(false),
  },
)

export const ingredientAdditionOne = createTable('ingredient_addition_one', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  ingredientId: int('ingredient_id').references(() => ingredient.id, {
    onDelete: 'cascade',
  }),
  energyWithDietaryFibre: text('energy_with_dietary_fibre'),
  energyWithoutDietaryFibre: text('energy_without_dietary_fibre'),
  addedSugars: text('added_sugars'),
  freeSugars: text('free_sugars'),
  moisture: text('moisture'),
  nitrogen: text('nitrogen'),
  alcohol: text('alcohol'),
  fructose: text('fructose'),
  glucose: text('glucose'),
  sucrose: text('sucrose'),
  maltose: text('maltose'),
  lactose: text('lactose'),
  galactose: text('galactose'),
  maltotrios: text('maltotrios'),
  ash: text('ash'),
  dextrin: text('dextrin'),
  glycerol: text('glycerol'),
  glycogen: text('glycogen'),
  inulin: text('inulin'),
  erythritol: text('erythritol'),
  maltitol: text('maltitol'),
  mannitol: text('mannitol'),
  xylitol: text('xylitol'),
  maltodextrin: text('maltodextrin'),
  oligosaccharides: text('oligosaccharides'),
  polydextrose: text('polydextrose'),
  raffinose: text('raffinose'),
  stachyose: text('stachyose'),
  sorbitol: text('sorbitol'),
})

export const ingredientAdditionTwo = createTable('ingredient_addition_two', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  ingredientId: int('ingredient_id').references(() => ingredient.id, {
    onDelete: 'cascade',
  }),
  aceticAcid: text('acetic_acid'),
  citricAcid: text('citric_acid'),
  fumaricAcid: text('fumaric_acid'),
  lacticAcid: text('lactic_acid'),
  malicAcid: text('malic_acid'),
  oxalicAcid: text('oxalic_acid'),
  propionicAcid: text('propionic_acid'),
  quinicAcid: text('quinic_acid'),
  shikimicAcid: text('shikimic_acid'),
  succinicAcid: text('succinic_acid'),
  tartaricAcid: text('tartaric_acid'),
  aluminium: text('aluminium'),
  antimony: text('antimony'),
  arsenic: text('arsenic'),
  cadmium: text('cadmium'),
  calcium: text('calcium'),
  chromium: text('chromium'),
  chloride: text('chloride'),
  cobalt: text('cobalt'),
  copper: text('copper'),
  fluoride: text('fluoride'),
  iodine: text('iodine'),
  iron: text('iron'),
  lead: text('lead'),
  magnesium: text('magnesium'),
  manganese: text('manganese'),
  mercury: text('mercury'),
  molybdenum: text('molybdenum'),
  nickel: text('nickel'),
  phosphorus: text('phosphorus'),
  potassium: text('potassium'),
  selenium: text('selenium'),
  sodium: text('sodium'),
  sulphur: text('sulphur'),
  tin: text('tin'),
  zinc: text('zinc'),
  retinol: text('retinol'),
  alphaCarotene: text('alpha_carotene'),
  betaCarotene: text('beta_carotene'),
  cryptoxanthin: text('cryptoxanthin'),
  betaCaroteneEquivalents: text('beta_carotene_equivalents'),
  vitaminARetinolEquivalents: text('vitamin_a_retinol_equivalents'),
  lutein: text('lutein'),
  lycopene: text('lycopene'),
  xanthophyl: text('xanthophyl'),
  thiamin: text('thiamin'),
  riboflavin: text('riboflavin'),
  niacin: text('niacin'),
  niacinDerivedFromTryptophan: text('niacin_derived_from_tryptophan'),
  niacinDerivedEquivalents: text('niacin_derived_equivalents'),
  pantothenicAcid: text('pantothenic_acid'),
  pyridoxine: text('pyridoxine'),
  biotin: text('biotin'),
  cobalamin: text('cobalamin'),
  folateNatural: text('folate_natural'),
  folicAcid: text('folic_acid'),
  totalFolates: text('total_folates'),
  dietaryFolateEquivalents: text('dietary_folate_equivalents'),
  vitaminC: text('vitamin_c'),
  cholecalciferol: text('cholecalciferol'),
  ergocalciferol: text('ergocalciferol'),
  hydroxyCholecalciferol: text('hydroxy_cholecalciferol'),
  hydroxyErgocalciferol: text('hydroxy_ergocalciferol'),
  vitaminDEquivalents: text('vitamin_d_equivalents'),
  alphaTocopherol: text('alpha_tocopherol'),
  alphaTocotrienol: text('alpha_tocotrienol'),
  betaTocopherol: text('beta_tocopherol'),
  betaTocotrienol: text('beta_tocotrienol'),
  deltaTocopherol: text('delta_tocopherol'),
  deltaTocotrienol: text('delta_tocotrienol'),
  gammaTocopherol: text('gamma_tocopherol'),
  gammaTocotrienol: text('gamma_tocotrienol'),
  vitaminE: text('vitamin_e'),
})

export const ingredientAdditionThree = createTable(
  'ingredient_addition_three',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
      () => new Date(),
    ),
    ingredientId: int('ingredient_id').references(() => ingredient.id, {
      onDelete: 'cascade',
    }),
    totalSaturatedFattyAcids: text('total_saturated_fatty_acids'),
    totalMonounsaturatedFattyAcids: text('total_monounsaturated_fatty_acids'),
    totalPolyunsaturatedFattyAcids: text('total_polyunsaturated_fatty_acids'),
    totalLongChainOmega3FattyAcids: text(
      'total_long_chain_omega_3_fatty_acids',
    ),
    totalTransFattyAcids: text('total_trans_fatty_acids'),
    caffeine: text('caffeine'),
    cholesterol: text('cholesterol'),
    alanine: text('alanine'),
    arginine: text('arginine'),
    asparticAcid: text('aspartic_acid'),
    cystinePlusCysteine: text('cystine_plus_cysteine'),
    glutamicAcid: text('glutamic_acid'),
    glycine: text('glycine'),
    histidine: text('histidine'),
    isoleucine: text('isoleucine'),
    leucine: text('leucine'),
    lysine: text('lysine'),
    methionine: text('methionine'),
    phenylalanine: text('phenylalanine'),
    proline: text('proline'),
    serine: text('serine'),
    threonine: text('threonine'),
    tyrosine: text('tyrosine'),
    tryptophan: text('tryptophan'),
    valine: text('valine'),
    c4: text('c4'),
    c6: text('c6'),
    c8: text('c8'),
    c10: text('c10'),
    c11: text('c11'),
    c12: text('c12'),
    c13: text('c13'),
    c14: text('c14'),
    c15: text('c15'),
    c16: text('c16'),
    c17: text('c17'),
    c18: text('c18'),
    c19: text('c19'),
    c20: text('c20'),
    c21: text('c21'),
    c22: text('c22'),
    c23: text('c23'),
    c24: text('c24'),
    totalSaturatedFattyAcidsEquated: text(
      'total_saturated_fatty_acids_equated',
    ),
    c10_1: text('c10_1'),
    c12_1: text('c12_1'),
    c14_1: text('c14_1'),
    c15_1: text('c15_1'),
    c16_1: text('c16_1'),
    c17_1: text('c17_1'),
    c18_1: text('c18_1'),
    c18_1w5: text('c18_1w5'),
    c18_1w6: text('c18_1w6'),
    c18_1w7: text('c18_1w7'),
    c18_1w9: text('c18_1w9'),
    c20_1: text('c20_1'),
    c20_1w9: text('c20_1w9'),
    c20_1w13: text('c20_1w13'),
    c20_1w11: text('c20_1w11'),
    c22_1: text('c22_1'),
    c22_1w9: text('c22_1w9'),
    c22_1w11: text('c22_1w11'),
    c24_1: text('c24_1'),
    c24_1w9: text('c24_1w9'),
    c24_1w11: text('c24_1w11'),
    c24_1w13: text('c24_1w13'),
    totalMonounsaturatedFattyAcidsEquated: text(
      'total_monounsaturated_fatty_acids_equated',
    ),
    c12_2: text('c12_2'),
    c16_2w4: text('c16_2w4'),
    c16_3: text('c16_3'),
    c18_2w6: text('c18_2w6'),
    c18_3w3: text('c18_3w3'),
    c18_3w4: text('c18_3w4'),
    c18_3w6: text('c18_3w6'),
    c18_4w1: text('c18_4w1'),
    c18_4w3: text('c18_4w3'),
    c20_2: text('c20_2'),
    c20_2w6: text('c20_2w6'),
    c20_3: text('c20_3'),
    c20_3w3: text('c20_3w3'),
    c20_3w6: text('c20_3w6'),
    c20_4: text('c20_4'),
    c20_4w3: text('c20_4w3'),
    c20_4w6: text('c20_4w6'),
    c20_5w3: text('c20_5w3'),
    c21_5w3: text('c21_5w3'),
    c22_2: text('c22_2'),
    c22_2w6: text('c22_2w6'),
    c22_4w6: text('c22_4w6'),
    c22_5w3: text('c22_5w3'),
    c22_5w6: text('c22_5w6'),
    c22_6w3: text('c22_6w3'),
    totalPolyunsaturatedFattyAcidsEquated: text(
      'total_polyunsaturated_fatty_acids_equated',
    ),
  },
)
export const groceryStore = createTable('grocery_store', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  name: text('name'),
  location: text('locations'),
})

export const ingredientToGroceryStore = createTable(
  'ingredient_to_grocery_store',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    ingredientId: int('ingredient_id').references(() => ingredient.id, {
      onDelete: 'cascade',
    }),
    groceryStoreId: int('grocery_store_id').references(() => groceryStore.id, {
      onDelete: 'cascade',
    }),
  },
)

export const groceryStoreRelations = relations(groceryStore, ({ many }) => ({
  ingredientToGroceryStore: many(ingredientToGroceryStore),
}))

export const ingredientToGroceryStoreRelations = relations(
  ingredientToGroceryStore,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [ingredientToGroceryStore.ingredientId],
      references: [ingredient.id],
    }),
    groceryStore: one(groceryStore, {
      fields: [ingredientToGroceryStore.groceryStoreId],
      references: [groceryStore.id],
    }),
  }),
)

export const ingredientRelations = relations(ingredient, ({ one, many }) => ({
  user: one(user, { fields: [ingredient.userId], references: [user.id] }),
  recipeToIngredient: many(recipeToIngredient, { relationName: 'ingredient' }),
  recipeToIngredientAlternate: many(recipeToIngredient, { relationName: 'alternateIngredient' }),
  userIngredient: many(userIngredient, { relationName: 'ingredient' }),
  userInhgredientAlternate: many(userIngredient, { relationName: 'alternateIngredient' }),
  ingredientAdditionOne: one(ingredientAdditionOne, {
    fields: [ingredient.id],
    references: [ingredientAdditionOne.ingredientId],
  }),
  ingredientAdditionTwo: one(ingredientAdditionTwo, {
    fields: [ingredient.id],
    references: [ingredientAdditionTwo.ingredientId],
  }),
  ingredientAdditionThree: one(ingredientAdditionThree, {
    fields: [ingredient.id],
    references: [ingredientAdditionThree.ingredientId],
  }),
  ingredientToGroceryStore: many(ingredientToGroceryStore),
}))

export const ingredientAdditionOneRelations = relations(
  ingredientAdditionOne,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [ingredientAdditionOne.ingredientId],
      references: [ingredient.id],
    }),
  }),
)

export const ingredientAdditionTwoRelations = relations(
  ingredientAdditionTwo,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [ingredientAdditionTwo.ingredientId],
      references: [ingredient.id],
    }),
  }),
)

export const ingredientAdditionThreeRelations = relations(
  ingredientAdditionThree,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [ingredientAdditionThree.ingredientId],
      references: [ingredient.id],
    }),
  }),
)
