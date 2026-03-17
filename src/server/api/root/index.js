var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/env.js
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
var env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_SYNC_URL: z.string(),
    DATABASE_AUTH_TOKEN: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),
    EMAIL_SERVER_USER: z.string(),
    EMAIL_SERVER_PASSWORD: z.string(),
    EMAIL_SERVER_PORT: z.string(),
    EMAIL_SERVER_HOST: z.string(),
    EMAIL_FROM: z.string(),
    VAPID_PRIVATE_KEY: z.string(),
    UPLOADTHING_TOKEN: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development")
  },
  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: z.string()
  },
  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_SYNC_URL: process.env.DATABASE_SYNC_URL,
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_FROM: process.env.EMAIL_FROM,
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
});

// src/server/db/index.ts
import { instrumentDrizzle } from "@kubiks/otel-drizzle";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { sqliteTableCreator } from "drizzle-orm/sqlite-core";

// src/server/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  account: () => account,
  accountsRelations: () => accountsRelations,
  bodyFat: () => bodyFat,
  bodyFatRelations: () => bodyFatRelations,
  bodyWeight: () => bodyWeight,
  bodyWeightRelations: () => bodyWeightRelations,
  dailyLog: () => dailyLog,
  dailyLogRelations: () => dailyLogRelations,
  dailyMeal: () => dailyMeal,
  dailyMealRelations: () => dailyMealRelations,
  dailySupplement: () => dailySupplement,
  dailySupplementRelations: () => dailySupplementRelations,
  girthMeasurement: () => girthMeasurement,
  girthMeasurementRelations: () => girthMeasurementRelations,
  goals: () => goals,
  goalsRelations: () => goalsRelations,
  groceryStore: () => groceryStore,
  groceryStoreRelations: () => groceryStoreRelations,
  images: () => images,
  imagesRelations: () => imagesRelations,
  ingredient: () => ingredient,
  ingredientAdditionOne: () => ingredientAdditionOne,
  ingredientAdditionOneRelations: () => ingredientAdditionOneRelations,
  ingredientAdditionThree: () => ingredientAdditionThree,
  ingredientAdditionThreeRelations: () => ingredientAdditionThreeRelations,
  ingredientAdditionTwo: () => ingredientAdditionTwo,
  ingredientAdditionTwoRelations: () => ingredientAdditionTwoRelations,
  ingredientRelations: () => ingredientRelations,
  ingredientToGroceryStore: () => ingredientToGroceryStore,
  ingredientToGroceryStoreRelations: () => ingredientToGroceryStoreRelations,
  leanMass: () => leanMass,
  leanMassRelations: () => leanMassRelations,
  log: () => log,
  logNew: () => logNew,
  meal: () => meal,
  mealRelations: () => mealRelations,
  mealToRecipe: () => mealToRecipe,
  mealToRecipeRelations: () => mealToRecipeRelations,
  mealToVegeStack: () => mealToVegeStack,
  mealToVegeStackRelations: () => mealToVegeStackRelations,
  message: () => message,
  messageRelations: () => messageRelations,
  notification: () => notification,
  notificationRelations: () => notificationRelations,
  notificationToggle: () => notificationToggle,
  notificationToggleRelations: () => notificationToggleRelations,
  plan: () => plan,
  planFolder: () => planFolder,
  planFolderRelations: () => planFolderRelations,
  planRelations: () => planRelations,
  planToMeal: () => planToMeal,
  planToMealRelations: () => planToMealRelations,
  poopLog: () => poopLog,
  poopLogRelations: () => poopLogRelations,
  pushSubscription: () => pushSubscription,
  recipe: () => recipe,
  recipeRelations: () => recipeRelations,
  recipeToIngredient: () => recipeToIngredient,
  recipeToIngredientRelations: () => recipeToIngredientRelations,
  role: () => role,
  roleRelations: () => roleRelations,
  session: () => session,
  sessionsRelations: () => sessionsRelations,
  settings: () => settings,
  shoppingList: () => shoppingList,
  shoppingListItem: () => shoppingListItem,
  shoppingListItemRelations: () => shoppingListItemRelations,
  shoppingListRelations: () => shoppingListRelations,
  skinfold: () => skinfold,
  skinfoldRelations: () => skinfoldRelations,
  supplementStack: () => supplementStack,
  supplementStackRelations: () => supplementStackRelations,
  supplementToSupplementStack: () => supplementToSupplementStack,
  supplementToSupplementStackRelations: () => supplementToSupplementStackRelations,
  tag: () => tag,
  tagRelations: () => tagRelations,
  tagToDailyLog: () => tagToDailyLog,
  tagToDailyLogRelations: () => tagToDailyLogRelations,
  trainerNotes: () => trainerNotes,
  trainerNotesRelations: () => trainerNotesRelations,
  user: () => user,
  userCategory: () => userCategory,
  userCategoryRelations: () => userCategoryRelations,
  userIngredient: () => userIngredient,
  userIngredientRelations: () => userIngredientRelations,
  userMeal: () => userMeal,
  userMealRelations: () => userMealRelations,
  userPlan: () => userPlan,
  userPlanRelations: () => userPlanRelations,
  userRecipe: () => userRecipe,
  userRecipeRelations: () => userRecipeRelations,
  userRelations: () => userRelations,
  userSettings: () => userSettings,
  userSettingsRelations: () => userSettingsRelations,
  userToTrainer: () => userToTrainer,
  userToTrainerRelations: () => userToTrainerRelations,
  userToUserCategory: () => userToUserCategory,
  usertoUserCategoryRelations: () => usertoUserCategoryRelations,
  vegeStack: () => vegeStack,
  vegeStackRelations: () => vegeStackRelations,
  verificationToken: () => verificationToken,
  waterLog: () => waterLog,
  waterLogRelations: () => waterLogRelations,
  weighIn: () => weighIn,
  weighInRelations: () => weighInRelations
});

// src/server/db/schema/user.ts
import { relations as relations9, sql as sql9 } from "drizzle-orm";
import {
  index as index9,
  int as int9,
  primaryKey,
  sqliteTable as sqliteTable9,
  text as text9
} from "drizzle-orm/sqlite-core";

// src/server/db/schema/daily-logs.ts
import { relations as relations4, sql as sql4 } from "drizzle-orm";
import { index as index4, int as int4, sqliteTable as sqliteTable4, text as text4 } from "drizzle-orm/sqlite-core";

// src/server/db/schema/ingredient.ts
import { relations as relations3, sql as sql3 } from "drizzle-orm";
import { int as int3, sqliteTable as sqliteTable3, text as text3, index as index3 } from "drizzle-orm/sqlite-core";

// src/server/db/schema/recipe.ts
import { relations, sql } from "drizzle-orm";
import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";
var createTable = sqliteTable;
var recipe = createTable(
  "recipe",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    name: text("name").notNull(),
    description: text("description").notNull(),
    image: text("image").notNull(),
    notes: text("notes").notNull(),
    calories: int("calories", { mode: "number" }).notNull(),
    creatorId: text("creator_id").references(() => user.id).notNull(),
    isUserRecipe: int("is_user_recipe", { mode: "boolean" }).default(false),
    isGlobal: int("is_global", { mode: "boolean" }).default(false),
    recipeCategory: text("recipe_category").notNull(),
    favouriteAt: int("favourite_at", { mode: "timestamp" }),
    deletedAt: int("deleted_at", { mode: "timestamp" }),
    hiddenAt: int("hidden_at", { mode: "timestamp" })
  },
  (table) => [
    index("recipe_user_id_idx").on(table.creatorId),
    index("recipe_is_user_recipe_idx").on(table.isUserRecipe)
  ]
);
var recipeToIngredient = createTable(
  "recipe_to_ingredient",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
    recipeId: int("recipe_id").references(() => recipe.id, {
      onDelete: "cascade"
    }).notNull(),
    ingredientId: int("ingredient_id").references(() => ingredient.id, {
      onDelete: "cascade"
    }).notNull(),
    index: int("index", { mode: "number" }).notNull(),
    alternateId: int("alternate_id").references(() => ingredient.id),
    serveSize: text("serve").notNull(),
    serveUnit: text("serve_unit").notNull(),
    note: text("note"),
    isUserCreated: int("is_user_created", { mode: "boolean" }).default(false)
  },
  (table) => [
    index("recipe_to_ingredient_recipe_id_index").on(table.recipeId),
    index("recipe_to_ingredient_ingredient_id_index").on(table.ingredientId)
  ]
);
var recipeToIngredientRelations = relations(
  recipeToIngredient,
  ({ one }) => ({
    recipe: one(recipe, {
      fields: [recipeToIngredient.recipeId],
      references: [recipe.id]
    }),
    ingredient: one(ingredient, {
      fields: [recipeToIngredient.ingredientId],
      references: [ingredient.id],
      relationName: "ingredient"
    }),
    alternateIngredient: one(ingredient, {
      fields: [recipeToIngredient.alternateId],
      references: [ingredient.id],
      relationName: "alternateIngredient"
    })
  })
);
var recipeRelations = relations(recipe, ({ one, many }) => ({
  creator: one(user, { fields: [recipe.creatorId], references: [user.id] }),
  recipeToIngredient: many(recipeToIngredient)
}));

// src/server/db/schema/user-plan.ts
import { relations as relations2, sql as sql2 } from "drizzle-orm";
import { index as index2, int as int2, sqliteTable as sqliteTable2, text as text2 } from "drizzle-orm/sqlite-core";
var createTable2 = sqliteTable2;
var userPlan = createTable2(
  "user_plan",
  {
    id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int2("created_at", { mode: "timestamp" }).default(sql2`(unixepoch())`).notNull(),
    updatedAt: int2("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    finishedAt: int2("finished_at", { mode: "timestamp" }),
    startAt: int2("start_at", { mode: "timestamp" }),
    isActive: int2("is_active", { mode: "boolean" }),
    name: text2("name").notNull(),
    description: text2("description").notNull(),
    image: text2("image").notNull(),
    notes: text2("notes").notNull(),
    numberOfMeals: int2("number_of_meals", { mode: "number" }),
    creatorId: text2("creator_id").references(() => user.id, {
      onDelete: "cascade"
    }).notNull(),
    userId: text2("user_id").references(() => user.id, {
      onDelete: "cascade"
    }).notNull(),
    favouriteAt: int2("favourite_at", { mode: "timestamp" }),
    deletedAt: int2("deleted_at", { mode: "timestamp" }),
    hiddenAt: int2("hidden_at", { mode: "timestamp" })
  },
  (table) => [index2("user_plan_user_id_idx").on(table.userId)]
);
var userMeal = createTable2(
  "user_meal",
  {
    id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int2("created_at", { mode: "timestamp" }).default(sql2`(unixepoch())`).notNull(),
    updatedAt: int2("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userPlanId: int2("user_plan_id").references(() => userPlan.id, {
      onDelete: "cascade"
    }).notNull(),
    mealIndex: int2("index", { mode: "number" }),
    mealTitle: text2("meal_title"),
    calories: text2("calories"),
    protein: text2("protein"),
    targetProtein: text2("target_protein"),
    targetCalories: text2("target_calories"),
    vegeCalories: text2("vege_calories"),
    veges: text2("veges"),
    vegeNotes: text2("vege_notes"),
    note: text2("note")
  },
  (table) => [index2("user_meal_user_plan_id_idx").on(table.userPlanId)]
);
var userRecipe = createTable2(
  "user_recipe",
  {
    id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int2("created_at", { mode: "timestamp" }).default(sql2`(unixepoch())`).notNull(),
    updatedAt: int2("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    mealIndex: int2("meal_index", { mode: "number" }),
    recipeIndex: int2("recipe_index", { mode: "number" }),
    userPlanId: int2("user_plan_id").references(() => userPlan.id, {
      onDelete: "cascade"
    }),
    dailyMealId: int2("daily_meal_id").references(() => dailyMeal.id, {
      onDelete: "cascade"
    }),
    parentId: int2("parent_id"),
    name: text2("name"),
    index: int2("index", { mode: "number" }),
    serve: text2("serve"),
    serveUnit: text2("serve_unit"),
    note: text2("note"),
    isLog: int2("is_log", { mode: "boolean" }),
    dailyLogId: int2("daily_log_id").references(() => dailyLog.id),
    isUserCreated: int2("is_user_created", { mode: "boolean" }).default(false)
  },
  (table) => [
    index2("user_recipe_daily_meal_id_index").on(table.dailyMealId),
    index2("user_recipe_user_plan_id_idx").on(table.userPlanId),
    index2("user_recipe_daily_log_id_idx").on(table.dailyLogId)
  ]
);
var userIngredient = createTable2(
  "user_ingredient",
  {
    id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int2("created_at", { mode: "timestamp" }).default(sql2`(unixepoch())`).notNull(),
    updatedAt: int2("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    ingredientId: int2("ingredient_id").references(() => ingredient.id, {
      onDelete: "cascade"
    }).notNull(),
    userPlanId: int2("user_plan_id").references(() => userPlan.id, {
      onDelete: "cascade"
    }),
    dailyMealId: int2("daily_meal_id").references(() => dailyMeal.id, {
      onDelete: "cascade"
    }),
    name: text2("name"),
    mealIndex: int2("meal_index", { mode: "number" }),
    recipeIndex: int2("recipe_index", { mode: "number" }),
    alternateId: int2("alternate_id").references(() => ingredient.id),
    serve: text2("serve"),
    serveUnit: text2("serve_unit"),
    note: text2("note"),
    dailyLogId: int2("daily_log_id").references(() => dailyLog.id),
    isUserCreated: int2("is_user_created", { mode: "boolean" }).default(false)
  },
  (table) => [
    index2("user_ingredient_daily_meal_id_index").on(table.dailyMealId),
    index2("user_ingredient_user_plan_id_idx").on(table.userPlanId),
    index2("user_ingredient_daily_log_id_idx").on(table.dailyLogId)
  ]
);
var userPlanRelations = relations2(userPlan, ({ one, many }) => ({
  user: one(user, {
    fields: [userPlan.userId],
    references: [user.id],
    relationName: "user"
  }),
  creator: one(user, {
    fields: [userPlan.creatorId],
    references: [user.id],
    relationName: "creator"
  }),
  userMeals: many(userMeal),
  userRecipes: many(userRecipe),
  userIngredients: many(userIngredient)
}));
var userMealRelations = relations2(userMeal, ({ one }) => ({
  userPlan: one(userPlan, {
    fields: [userMeal.userPlanId],
    references: [userPlan.id]
  })
}));
var userRecipeRelations = relations2(userRecipe, ({ one }) => ({
  userPlan: one(userPlan, {
    fields: [userRecipe.userPlanId],
    references: [userPlan.id]
  }),
  dailyMeal: one(dailyMeal, {
    fields: [userRecipe.dailyMealId],
    references: [dailyMeal.id]
  })
}));
var userIngredientRelations = relations2(userIngredient, ({ one }) => ({
  ingredient: one(ingredient, {
    fields: [userIngredient.ingredientId],
    references: [ingredient.id],
    relationName: "ingredient"
  }),
  alternateIngredient: one(ingredient, {
    fields: [userIngredient.alternateId],
    references: [ingredient.id],
    relationName: "alternateIngredient"
  }),
  userPlan: one(userPlan, {
    fields: [userIngredient.userPlanId],
    references: [userPlan.id]
  }),
  dailyMeal: one(dailyMeal, {
    fields: [userIngredient.dailyMealId],
    references: [dailyMeal.id]
  })
}));

// src/server/db/schema/ingredient.ts
var createTable3 = sqliteTable3;
var ingredient = createTable3(
  "ingredient",
  {
    id: int3("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int3("created_at", { mode: "timestamp" }).default(sql3`(unixepoch())`).notNull(),
    updatedAt: int3("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text3("user_id").references(() => user.id),
    favouriteAt: int3("favourite_at", { mode: "timestamp" }),
    deletedAt: int3("deleted_at", { mode: "timestamp" }),
    hiddenAt: int3("hidden_at", { mode: "timestamp" }),
    isAusFood: int3("is_aus_food", { mode: "boolean" }),
    isAllStores: int3("is_all_stores", { mode: "boolean" }).default(true),
    serveSize: text3("serve_size"),
    serveUnit: text3("serve_unit"),
    publicFoodKey: text3("public_food_key"),
    classification: text3("classification"),
    foodName: text3("food_name"),
    name: text3("name"),
    caloriesWFibre: text3("calories_w_fibre"),
    caloriesWOFibre: text3("calories_wo_fibre"),
    protein: text3("protein"),
    fatTotal: text3("fat_total"),
    totalDietaryFibre: text3("total_dietary_fibre"),
    totalSugars: text3("total_sugars"),
    starch: text3("starch"),
    resistantStarch: text3("resistant_starch"),
    availableCarbohydrateWithoutSugarAlcohols: text3(
      "available_carbohydrate_without_sugar_alcohols"
    ),
    availableCarbohydrateWithSugarAlcohols: text3(
      "available_carbohydrate_with_sugar_alcohols"
    ),
    isUserCreated: int3("is_user_created", { mode: "boolean" }).default(false),
    isSupplement: int3("is_supplement", { mode: "boolean" }).default(false),
    isPrivate: int3("is_private", { mode: "boolean" }).default(false),
    viewableBy: text3("viewable_by"),
    intervale: text3("intervale"),
    notes: text3("notes")
  }
);
var ingredientAdditionOne = createTable3("ingredient_addition_one", {
  id: int3("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int3("created_at", { mode: "timestamp" }).default(sql3`(unixepoch())`).notNull(),
  updatedAt: int3("updated_at", { mode: "timestamp" }).$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
  ingredientId: int3("ingredient_id").references(() => ingredient.id, {
    onDelete: "cascade"
  }),
  energyWithDietaryFibre: text3("energy_with_dietary_fibre"),
  energyWithoutDietaryFibre: text3("energy_without_dietary_fibre"),
  addedSugars: text3("added_sugars"),
  freeSugars: text3("free_sugars"),
  moisture: text3("moisture"),
  nitrogen: text3("nitrogen"),
  alcohol: text3("alcohol"),
  fructose: text3("fructose"),
  glucose: text3("glucose"),
  sucrose: text3("sucrose"),
  maltose: text3("maltose"),
  lactose: text3("lactose"),
  galactose: text3("galactose"),
  maltotrios: text3("maltotrios"),
  ash: text3("ash"),
  dextrin: text3("dextrin"),
  glycerol: text3("glycerol"),
  glycogen: text3("glycogen"),
  inulin: text3("inulin"),
  erythritol: text3("erythritol"),
  maltitol: text3("maltitol"),
  mannitol: text3("mannitol"),
  xylitol: text3("xylitol"),
  maltodextrin: text3("maltodextrin"),
  oligosaccharides: text3("oligosaccharides"),
  polydextrose: text3("polydextrose"),
  raffinose: text3("raffinose"),
  stachyose: text3("stachyose"),
  sorbitol: text3("sorbitol")
});
var ingredientAdditionTwo = createTable3("ingredient_addition_two", {
  id: int3("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int3("created_at", { mode: "timestamp" }).default(sql3`(unixepoch())`).notNull(),
  updatedAt: int3("updated_at", { mode: "timestamp" }).$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
  ingredientId: int3("ingredient_id").references(() => ingredient.id, {
    onDelete: "cascade"
  }),
  aceticAcid: text3("acetic_acid"),
  citricAcid: text3("citric_acid"),
  fumaricAcid: text3("fumaric_acid"),
  lacticAcid: text3("lactic_acid"),
  malicAcid: text3("malic_acid"),
  oxalicAcid: text3("oxalic_acid"),
  propionicAcid: text3("propionic_acid"),
  quinicAcid: text3("quinic_acid"),
  shikimicAcid: text3("shikimic_acid"),
  succinicAcid: text3("succinic_acid"),
  tartaricAcid: text3("tartaric_acid"),
  aluminium: text3("aluminium"),
  antimony: text3("antimony"),
  arsenic: text3("arsenic"),
  cadmium: text3("cadmium"),
  calcium: text3("calcium"),
  chromium: text3("chromium"),
  chloride: text3("chloride"),
  cobalt: text3("cobalt"),
  copper: text3("copper"),
  fluoride: text3("fluoride"),
  iodine: text3("iodine"),
  iron: text3("iron"),
  lead: text3("lead"),
  magnesium: text3("magnesium"),
  manganese: text3("manganese"),
  mercury: text3("mercury"),
  molybdenum: text3("molybdenum"),
  nickel: text3("nickel"),
  phosphorus: text3("phosphorus"),
  potassium: text3("potassium"),
  selenium: text3("selenium"),
  sodium: text3("sodium"),
  sulphur: text3("sulphur"),
  tin: text3("tin"),
  zinc: text3("zinc"),
  retinol: text3("retinol"),
  alphaCarotene: text3("alpha_carotene"),
  betaCarotene: text3("beta_carotene"),
  cryptoxanthin: text3("cryptoxanthin"),
  betaCaroteneEquivalents: text3("beta_carotene_equivalents"),
  vitaminARetinolEquivalents: text3("vitamin_a_retinol_equivalents"),
  lutein: text3("lutein"),
  lycopene: text3("lycopene"),
  xanthophyl: text3("xanthophyl"),
  thiamin: text3("thiamin"),
  riboflavin: text3("riboflavin"),
  niacin: text3("niacin"),
  niacinDerivedFromTryptophan: text3("niacin_derived_from_tryptophan"),
  niacinDerivedEquivalents: text3("niacin_derived_equivalents"),
  pantothenicAcid: text3("pantothenic_acid"),
  pyridoxine: text3("pyridoxine"),
  biotin: text3("biotin"),
  cobalamin: text3("cobalamin"),
  folateNatural: text3("folate_natural"),
  folicAcid: text3("folic_acid"),
  totalFolates: text3("total_folates"),
  dietaryFolateEquivalents: text3("dietary_folate_equivalents"),
  vitaminC: text3("vitamin_c"),
  cholecalciferol: text3("cholecalciferol"),
  ergocalciferol: text3("ergocalciferol"),
  hydroxyCholecalciferol: text3("hydroxy_cholecalciferol"),
  hydroxyErgocalciferol: text3("hydroxy_ergocalciferol"),
  vitaminDEquivalents: text3("vitamin_d_equivalents"),
  alphaTocopherol: text3("alpha_tocopherol"),
  alphaTocotrienol: text3("alpha_tocotrienol"),
  betaTocopherol: text3("beta_tocopherol"),
  betaTocotrienol: text3("beta_tocotrienol"),
  deltaTocopherol: text3("delta_tocopherol"),
  deltaTocotrienol: text3("delta_tocotrienol"),
  gammaTocopherol: text3("gamma_tocopherol"),
  gammaTocotrienol: text3("gamma_tocotrienol"),
  vitaminE: text3("vitamin_e")
});
var ingredientAdditionThree = createTable3(
  "ingredient_addition_three",
  {
    id: int3("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int3("created_at", { mode: "timestamp" }).default(sql3`(unixepoch())`).notNull(),
    updatedAt: int3("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    ingredientId: int3("ingredient_id").references(() => ingredient.id, {
      onDelete: "cascade"
    }),
    totalSaturatedFattyAcids: text3("total_saturated_fatty_acids"),
    totalMonounsaturatedFattyAcids: text3("total_monounsaturated_fatty_acids"),
    totalPolyunsaturatedFattyAcids: text3("total_polyunsaturated_fatty_acids"),
    totalLongChainOmega3FattyAcids: text3(
      "total_long_chain_omega_3_fatty_acids"
    ),
    totalTransFattyAcids: text3("total_trans_fatty_acids"),
    caffeine: text3("caffeine"),
    cholesterol: text3("cholesterol"),
    alanine: text3("alanine"),
    arginine: text3("arginine"),
    asparticAcid: text3("aspartic_acid"),
    cystinePlusCysteine: text3("cystine_plus_cysteine"),
    glutamicAcid: text3("glutamic_acid"),
    glycine: text3("glycine"),
    histidine: text3("histidine"),
    isoleucine: text3("isoleucine"),
    leucine: text3("leucine"),
    lysine: text3("lysine"),
    methionine: text3("methionine"),
    phenylalanine: text3("phenylalanine"),
    proline: text3("proline"),
    serine: text3("serine"),
    threonine: text3("threonine"),
    tyrosine: text3("tyrosine"),
    tryptophan: text3("tryptophan"),
    valine: text3("valine"),
    c4: text3("c4"),
    c6: text3("c6"),
    c8: text3("c8"),
    c10: text3("c10"),
    c11: text3("c11"),
    c12: text3("c12"),
    c13: text3("c13"),
    c14: text3("c14"),
    c15: text3("c15"),
    c16: text3("c16"),
    c17: text3("c17"),
    c18: text3("c18"),
    c19: text3("c19"),
    c20: text3("c20"),
    c21: text3("c21"),
    c22: text3("c22"),
    c23: text3("c23"),
    c24: text3("c24"),
    totalSaturatedFattyAcidsEquated: text3(
      "total_saturated_fatty_acids_equated"
    ),
    c10_1: text3("c10_1"),
    c12_1: text3("c12_1"),
    c14_1: text3("c14_1"),
    c15_1: text3("c15_1"),
    c16_1: text3("c16_1"),
    c17_1: text3("c17_1"),
    c18_1: text3("c18_1"),
    c18_1w5: text3("c18_1w5"),
    c18_1w6: text3("c18_1w6"),
    c18_1w7: text3("c18_1w7"),
    c18_1w9: text3("c18_1w9"),
    c20_1: text3("c20_1"),
    c20_1w9: text3("c20_1w9"),
    c20_1w13: text3("c20_1w13"),
    c20_1w11: text3("c20_1w11"),
    c22_1: text3("c22_1"),
    c22_1w9: text3("c22_1w9"),
    c22_1w11: text3("c22_1w11"),
    c24_1: text3("c24_1"),
    c24_1w9: text3("c24_1w9"),
    c24_1w11: text3("c24_1w11"),
    c24_1w13: text3("c24_1w13"),
    totalMonounsaturatedFattyAcidsEquated: text3(
      "total_monounsaturated_fatty_acids_equated"
    ),
    c12_2: text3("c12_2"),
    c16_2w4: text3("c16_2w4"),
    c16_3: text3("c16_3"),
    c18_2w6: text3("c18_2w6"),
    c18_3w3: text3("c18_3w3"),
    c18_3w4: text3("c18_3w4"),
    c18_3w6: text3("c18_3w6"),
    c18_4w1: text3("c18_4w1"),
    c18_4w3: text3("c18_4w3"),
    c20_2: text3("c20_2"),
    c20_2w6: text3("c20_2w6"),
    c20_3: text3("c20_3"),
    c20_3w3: text3("c20_3w3"),
    c20_3w6: text3("c20_3w6"),
    c20_4: text3("c20_4"),
    c20_4w3: text3("c20_4w3"),
    c20_4w6: text3("c20_4w6"),
    c20_5w3: text3("c20_5w3"),
    c21_5w3: text3("c21_5w3"),
    c22_2: text3("c22_2"),
    c22_2w6: text3("c22_2w6"),
    c22_4w6: text3("c22_4w6"),
    c22_5w3: text3("c22_5w3"),
    c22_5w6: text3("c22_5w6"),
    c22_6w3: text3("c22_6w3"),
    totalPolyunsaturatedFattyAcidsEquated: text3(
      "total_polyunsaturated_fatty_acids_equated"
    )
  }
);
var groceryStore = createTable3("grocery_store", {
  id: int3("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int3("created_at", { mode: "timestamp" }).default(sql3`(unixepoch())`).notNull(),
  name: text3("name"),
  location: text3("locations")
});
var ingredientToGroceryStore = createTable3(
  "ingredient_to_grocery_store",
  {
    id: int3("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int3("created_at", { mode: "timestamp" }).default(sql3`(unixepoch())`).notNull(),
    ingredientId: int3("ingredient_id").references(() => ingredient.id, {
      onDelete: "cascade"
    }),
    groceryStoreId: int3("grocery_store_id").references(() => groceryStore.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index3("ingredient_to_grocery_store_ingredient_id_index").on(table.ingredientId)]
);
var groceryStoreRelations = relations3(groceryStore, ({ many }) => ({
  ingredientToGroceryStore: many(ingredientToGroceryStore)
}));
var ingredientToGroceryStoreRelations = relations3(
  ingredientToGroceryStore,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [ingredientToGroceryStore.ingredientId],
      references: [ingredient.id]
    }),
    groceryStore: one(groceryStore, {
      fields: [ingredientToGroceryStore.groceryStoreId],
      references: [groceryStore.id]
    })
  })
);
var ingredientRelations = relations3(ingredient, ({ one, many }) => ({
  user: one(user, { fields: [ingredient.userId], references: [user.id] }),
  recipeToIngredient: many(recipeToIngredient, { relationName: "ingredient" }),
  recipeToIngredientAlternate: many(recipeToIngredient, { relationName: "alternateIngredient" }),
  userIngredient: many(userIngredient, { relationName: "ingredient" }),
  userInhgredientAlternate: many(userIngredient, { relationName: "alternateIngredient" }),
  ingredientAdditionOne: one(ingredientAdditionOne, {
    fields: [ingredient.id],
    references: [ingredientAdditionOne.ingredientId]
  }),
  ingredientAdditionTwo: one(ingredientAdditionTwo, {
    fields: [ingredient.id],
    references: [ingredientAdditionTwo.ingredientId]
  }),
  ingredientAdditionThree: one(ingredientAdditionThree, {
    fields: [ingredient.id],
    references: [ingredientAdditionThree.ingredientId]
  }),
  ingredientToGroceryStore: many(ingredientToGroceryStore),
  supplementStack: many(supplementToSupplementStack),
  dailySupplements: many(dailySupplement)
}));
var ingredientAdditionOneRelations = relations3(
  ingredientAdditionOne,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [ingredientAdditionOne.ingredientId],
      references: [ingredient.id]
    })
  })
);
var ingredientAdditionTwoRelations = relations3(
  ingredientAdditionTwo,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [ingredientAdditionTwo.ingredientId],
      references: [ingredient.id]
    })
  })
);
var ingredientAdditionThreeRelations = relations3(
  ingredientAdditionThree,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [ingredientAdditionThree.ingredientId],
      references: [ingredient.id]
    })
  })
);

// src/server/db/schema/daily-logs.ts
var createTable4 = sqliteTable4;
var dailyLog = createTable4(
  "daily_log",
  {
    id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
    updatedAt: int4("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text4("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    date: text4("date").notNull(),
    morningWeight: text4("morning_weight"),
    notes: text4("notes"),
    fastedBloodGlucose: text4("fasted_blood_glucose"),
    fastedBloodGlucoseTiming: text4("fasted_blood_glucose_time"),
    sleep: text4("sleep"),
    sleepQuality: text4("sleep_quality"),
    isHiit: int4("is_hiit", { mode: "boolean" }),
    isCardio: int4("is_cardio", { mode: "boolean" }),
    isLift: int4("is_lift", { mode: "boolean" }),
    isLiss: int4("is_liss", { mode: "boolean" }),
    isPeriod: int4("is_period", { mode: "boolean" }),
    isOvulation: int4("is_ovulation", { mode: "boolean" }),
    isBulk: int4("is_bulk", { mode: "boolean" }),
    isCut: int4("is_cut", { mode: "boolean" }),
    isHigh: int4("is_high", { mode: "boolean" }),
    isLow: int4("is_low", { mode: "boolean" }),
    isStarred: int4("is_starred", { mode: "boolean" }).default(false),
    hiit: text4("hiit"),
    cardio: text4("cardio"),
    weight: text4("weight"),
    liss: text4("liss"),
    posing: text4("posing"),
    steps: text4("steps"),
    sauna: text4("sauna"),
    mobility: text4("mobility"),
    coldPlunge: text4("cold_plunge"),
    cardioType: text4("cardio_type"),
    image: text4("image"),
    frontImage: text4("front_image"),
    sideImage: text4("side_image"),
    backImage: text4("back_image"),
    frontImageSvg: text4("front_image_svg"),
    sideImageSvg: text4("side_image_svg"),
    backImageSvg: text4("back_image_svg"),
    frontPoseImage: text4("front_pose_image"),
    sidePoseImage: text4("side_pose_image"),
    backPoseImage: text4("back_pose_image"),
    spareImageOne: text4("spare_image"),
    spareImageTwo: text4("spare_image"),
    waistMeasurement: text4("waist_measurement"),
    nap: text4("nap")
  },
  (table) => [index4("daily_log_user_id_index").on(table.userId)]
);
var dailyLogRelations = relations4(dailyLog, ({ one, many }) => ({
  user: one(user, { fields: [dailyLog.userId], references: [user.id] }),
  dailyMeals: many(dailyMeal),
  waterLogs: many(waterLog),
  poopLogs: many(poopLog),
  tags: many(tagToDailyLog),
  supplements: many(dailySupplement)
}));
var dailySupplement = createTable4(
  "daily_supplement",
  {
    id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
    dailyLogId: int4("daily_log_id").notNull().references(() => dailyLog.id, {
      onDelete: "cascade"
    }),
    supplementId: int4("supplement_id").notNull().references(() => ingredient.id, {
      onDelete: "cascade"
    }),
    amount: text4("amount"),
    unit: text4("unit"),
    time: text4("time"),
    notes: text4("notes")
  },
  (table) => [
    index4("daily_supplement_daily_log_id_index").on(table.dailyLogId)
  ]
);
var dailySupplementRelations = relations4(
  dailySupplement,
  ({ one }) => ({
    dailyLog: one(dailyLog, {
      fields: [dailySupplement.dailyLogId],
      references: [dailyLog.id],
      relationName: "dailyLog"
    }),
    supplement: one(ingredient, {
      fields: [dailySupplement.supplementId],
      references: [ingredient.id],
      relationName: "supplement"
    })
  })
);
var tag = createTable4("tag", {
  id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
  name: text4("name").notNull(),
  icon: text4("icon").notNull(),
  color: text4("color").notNull(),
  userId: text4("user_id").notNull().references(() => user.id, {
    onDelete: "cascade"
  })
});
var tagRelations = relations4(tag, ({ one, many }) => ({
  user: one(user, {
    fields: [tag.userId],
    references: [user.id]
  }),
  dailyLogs: many(tagToDailyLog)
}));
var tagToDailyLog = createTable4(
  "tag_to_daily_log",
  {
    id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    tagId: int4("tag_id").notNull().references(() => tag.id, {
      onDelete: "cascade"
    }),
    dailyLogId: int4("daily_log_id").notNull().references(() => dailyLog.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index4("tag_to_daily_log_tag_id_index").on(table.tagId)]
);
var tagToDailyLogRelations = relations4(tagToDailyLog, ({ one }) => ({
  tag: one(tag, {
    fields: [tagToDailyLog.tagId],
    references: [tag.id]
  }),
  dailyLog: one(dailyLog, {
    fields: [tagToDailyLog.dailyLogId],
    references: [dailyLog.id]
  })
}));
var poopLog = createTable4(
  "poop_log",
  {
    id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
    dailyLogId: int4("daily_log_id").notNull().references(() => dailyLog.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index4("poop_log_daily_log_id_index").on(table.dailyLogId)]
);
var poopLogRelations = relations4(poopLog, ({ one, many }) => ({
  dailyLog: one(dailyLog, {
    fields: [poopLog.dailyLogId],
    references: [dailyLog.id]
  })
}));
var waterLog = createTable4(
  "water_log",
  {
    id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
    dailyLogId: int4("daily_log_id").notNull().references(() => dailyLog.id, {
      onDelete: "cascade"
    }),
    amount: text4("water")
  },
  (table) => [index4("water_log_daily_log_id_index").on(table.dailyLogId)]
);
var waterLogRelations = relations4(waterLog, ({ one, many }) => ({
  dailyLog: one(dailyLog, {
    fields: [waterLog.dailyLogId],
    references: [dailyLog.id]
  })
}));
var dailyMeal = createTable4(
  "daily_meal",
  {
    id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
    dailyLogId: int4("daily_log_id").notNull().references(() => dailyLog.id, {
      onDelete: "cascade"
    }),
    mealIndex: int4("meal_index", { mode: "number" }),
    date: int4("date", { mode: "timestamp" }),
    recipeId: int4("recipe_id"),
    vegeCalories: text4("vege_calories"),
    veges: text4("veges")
  },
  (table) => [index4("daily_meal_daily_log_id_index").on(table.dailyLogId)]
);
var dailyMealRelations = relations4(dailyMeal, ({ one, many }) => ({
  dailyLog: one(dailyLog, {
    fields: [dailyMeal.dailyLogId],
    references: [dailyLog.id]
  }),
  recipe: many(userRecipe),
  ingredients: many(userIngredient)
}));

// src/server/db/schema/message.ts
import { relations as relations5, sql as sql5 } from "drizzle-orm";
import { int as int5, sqliteTable as sqliteTable5, text as text5, index as index5 } from "drizzle-orm/sqlite-core";
var createTable5 = sqliteTable5;
var message = createTable5(
  "message",
  {
    id: int5("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int5("created_at", { mode: "timestamp" }).default(sql5`(unixepoch())`).notNull(),
    userId: text5("user_id").references(() => user.id, {
      onDelete: "cascade"
    }),
    subject: text5("subject"),
    isImportant: int5("is_important", { mode: "boolean" }),
    isRead: int5("is_read", { mode: "boolean" }).default(false),
    isViewed: int5("is_viewed", { mode: "boolean" }).default(false),
    isDeleted: int5("is_deleted", { mode: "boolean" }).default(false),
    isNotified: int5("is_notified", { mode: "boolean" }).default(false),
    message: text5("message"),
    image: text5("image"),
    fromUserId: text5("from_user_id").references(() => user.id, {
      onDelete: "cascade"
    })
  },
  (table) => [
    index5("message_user_id_idx").on(table.userId),
    index5("message_from_user_id_idx").on(table.fromUserId),
    index5("message_is_read_idx").on(table.isRead)
  ]
);
var messageRelations = relations5(message, ({ one }) => ({
  user: one(user, {
    fields: [message.userId],
    references: [user.id],
    relationName: "userMessages"
  }),
  fromUser: one(user, {
    fields: [message.fromUserId],
    references: [user.id],
    relationName: "sentMessages"
  })
}));

// src/server/db/schema/metrics.ts
import { relations as relations6, sql as sql6 } from "drizzle-orm";
import { index as index6, int as int6, sqliteTable as sqliteTable6, text as text6 } from "drizzle-orm/sqlite-core";
var createTable6 = sqliteTable6;
var skinfold = createTable6(
  "skinfold",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    userId: text6("user_id").notNull().references(() => user.id),
    creatorId: text6("creator_id").references(() => user.id),
    date: text6("date").notNull(),
    chin: text6("chin"),
    cheek: text6("cheek"),
    lowerAbdominal: text6("lower_abdominal"),
    pectoral: text6("pectoral"),
    biceps: text6("biceps"),
    triceps: text6("triceps"),
    subscapular: text6("subscapular"),
    midAxillary: text6("mid_axillary"),
    suprailiac: text6("suprailiac"),
    umbilical: text6("umbilical"),
    lowerBack: text6("lower_back"),
    quadriceps: text6("quadriceps"),
    hamstrings: text6("hamstrings"),
    medialCalf: text6("medial_calf"),
    knee: text6("knee"),
    shoulder: text6("shoulder"),
    notes: text6("notes"),
    formula: text6("formula"),
    test: text6("test")
  },
  (table) => [index6("skinfold_user_id_idx").on(table.userId)]
);
var girthMeasurement = createTable6("girth_measurement", {
  id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
  userId: text6("user_id").notNull().references(() => user.id, {
    onDelete: "cascade"
  }),
  date: text6("date").notNull(),
  waist: text6("waist"),
  glutePeak: text6("glute_peaks"),
  bicep: text6("bicep"),
  cheastPeak: text6("chest_peak"),
  thighPeak: text6("thigh_peak"),
  calfPeak: text6("calf_peak"),
  frontRelaxedImage: text6("front_relaxed_image"),
  frontPosedImage: text6("front_posed_image"),
  sideRelaxedImage: text6("side_relaxed_image"),
  sidePosedImage: text6("side_posed_image"),
  backRelaxedImage: text6("back_relaxed_image"),
  backPosedImage: text6("back_posed_image"),
  gluteRelaxedImage: text6("glute_relaxed_image"),
  glutePosedImage: text6("glute_posed_image"),
  isDailyLog: int6("is_daily_log", { mode: "boolean" }).default(false)
});
var images = createTable6(
  "images",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    userId: text6("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    name: text6("name").notNull(),
    date: text6("date").notNull(),
    image: text6("image").notNull(),
    svg: text6("svg")
  },
  (table) => [index6("images_user_id_idx").on(table.userId)]
);
var imagesRelations = relations6(images, ({ one }) => ({
  user: one(user, {
    fields: [images.userId],
    references: [user.id]
  })
}));
var girthMeasurementRelations = relations6(
  girthMeasurement,
  ({ one }) => ({
    user: one(user, {
      fields: [girthMeasurement.userId],
      references: [user.id]
    })
  })
);
var skinfoldRelations = relations6(skinfold, ({ one, many }) => ({
  user: one(user, {
    fields: [skinfold.userId],
    references: [user.id],
    relationName: "user"
  }),
  creator: one(user, {
    fields: [skinfold.creatorId],
    references: [user.id],
    relationName: "creator"
  }),
  bodyFat: many(bodyFat),
  leanMass: many(leanMass),
  bodyWeight: many(bodyWeight)
}));
var bodyFat = createTable6(
  "body_fat",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    userId: text6("user_id").notNull().references(() => user.id),
    date: text6("date").notNull(),
    bodyFat: text6("body_fat"),
    notes: text6("notes"),
    formula: text6("formula"),
    skinfoldId: int6("skinfold_id").references(() => skinfold.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index6("body_fat_user_id_idx").on(table.userId)]
);
var bodyFatRelations = relations6(bodyFat, ({ one }) => ({
  user: one(user, {
    fields: [bodyFat.userId],
    references: [user.id]
  }),
  skinfold: one(skinfold, {
    fields: [bodyFat.skinfoldId],
    references: [skinfold.id]
  })
}));
var leanMass = createTable6(
  "lean_mass",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    userId: text6("user_id").notNull().references(() => user.id),
    date: text6("date").notNull(),
    leanMass: text6("lean_mass"),
    notes: text6("notes"),
    formula: text6("formula"),
    skinfoldId: int6("skinfold_id").references(() => skinfold.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index6("lean_mass_user_id_idx").on(table.userId)]
);
var leanMassRelations = relations6(leanMass, ({ one }) => ({
  user: one(user, {
    fields: [leanMass.userId],
    references: [user.id]
  }),
  skinfold: one(skinfold, {
    fields: [leanMass.skinfoldId],
    references: [skinfold.id]
  })
}));
var bodyWeight = createTable6(
  "body_weight",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    userId: text6("user_id").notNull().references(() => user.id),
    date: text6("date").notNull(),
    bodyWeight: text6("body_weight"),
    source: text6("source"),
    notes: text6("notes"),
    skinfoldId: int6("skinfold_id").references(() => skinfold.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index6("body_weight_user_id_idx").on(table.userId)]
);
var bodyWeightRelations = relations6(bodyWeight, ({ one }) => ({
  user: one(user, {
    fields: [bodyWeight.userId],
    references: [user.id]
  }),
  skinfold: one(skinfold, {
    fields: [bodyWeight.skinfoldId],
    references: [skinfold.id]
  })
}));

// src/server/db/schema/notification.ts
import { relations as relations7, sql as sql7 } from "drizzle-orm";
import { index as index7, int as int7, sqliteTable as sqliteTable7, text as text7 } from "drizzle-orm/sqlite-core";
var createTable7 = sqliteTable7;
var notification = createTable7(
  "notification",
  {
    id: int7("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int7("created_at", { mode: "timestamp" }).default(sql7`(unixepoch())`).notNull(),
    userId: text7("user_id").references(() => user.id, {
      onDelete: "cascade"
    }),
    code: text7("code"),
    title: text7("title"),
    description: text7("description"),
    isRead: int7("is_read", { mode: "boolean" }).default(false),
    isViewed: int7("is_viewed", { mode: "boolean" }).default(false),
    isDeleted: int7("is_deleted", { mode: "boolean" }).default(false),
    isNotified: int7("is_notified", { mode: "boolean" }).default(false),
    notes: text7("notes")
  },
  (table) => [
    index7("notification_user_id_idx").on(table.userId),
    index7("notification_is_read_idx").on(table.isRead)
  ]
);
var notificationRelations = relations7(notification, ({ one }) => ({
  user: one(user, {
    fields: [notification.userId],
    references: [user.id]
  })
}));

// src/server/db/schema/shopping-list.ts
import { relations as relations8, sql as sql8 } from "drizzle-orm";
import { index as index8, int as int8, sqliteTable as sqliteTable8, text as text8 } from "drizzle-orm/sqlite-core";
var createTable8 = sqliteTable8;
var shoppingList = createTable8(
  "shopping_list",
  {
    id: int8("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int8("created_at", { mode: "timestamp" }).default(sql8`(unixepoch())`).notNull(),
    updatedAt: int8("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text8("user_id").references(() => user.id, {
      onDelete: "cascade"
    }).notNull(),
    creatorId: text8("creator_id").references(() => user.id, {
      onDelete: "cascade"
    }).notNull(),
    name: text8("name").notNull(),
    isActive: int8("is_active", { mode: "boolean" }).default(true).notNull(),
    archivedAt: int8("archived_at", { mode: "timestamp" }),
    emailedAt: int8("emailed_at", { mode: "timestamp" })
  },
  (table) => [
    index8("shopping_list_user_id_idx").on(table.userId),
    index8("shopping_list_creator_id_idx").on(table.creatorId),
    index8("shopping_list_user_active_idx").on(table.userId, table.isActive)
  ]
);
var shoppingListItem = createTable8(
  "shopping_list_item",
  {
    id: int8("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int8("created_at", { mode: "timestamp" }).default(sql8`(unixepoch())`).notNull(),
    updatedAt: int8("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    shoppingListId: int8("shopping_list_id").references(() => shoppingList.id, {
      onDelete: "cascade"
    }).notNull(),
    ingredientId: int8("ingredient_id").references(() => ingredient.id, {
      onDelete: "set null"
    }),
    name: text8("name").notNull(),
    amount: text8("amount").notNull(),
    unit: text8("unit").notNull(),
    isChecked: int8("is_checked", { mode: "boolean" }).default(false).notNull(),
    source: text8("source"),
    note: text8("note")
  },
  (table) => [
    index8("shopping_list_item_list_id_idx").on(table.shoppingListId),
    index8("shopping_list_item_ingredient_id_idx").on(table.ingredientId)
  ]
);
var shoppingListRelations = relations8(
  shoppingList,
  ({ one, many }) => ({
    user: one(user, {
      fields: [shoppingList.userId],
      references: [user.id],
      relationName: "shoppingLists"
    }),
    creator: one(user, {
      fields: [shoppingList.creatorId],
      references: [user.id],
      relationName: "shoppingListsCreator"
    }),
    items: many(shoppingListItem)
  })
);
var shoppingListItemRelations = relations8(
  shoppingListItem,
  ({ one }) => ({
    shoppingList: one(shoppingList, {
      fields: [shoppingListItem.shoppingListId],
      references: [shoppingList.id]
    }),
    ingredient: one(ingredient, {
      fields: [shoppingListItem.ingredientId],
      references: [ingredient.id]
    })
  })
);

// src/server/db/schema/user.ts
var createTable9 = sqliteTable9;
var user = createTable9(
  "user",
  {
    id: text9("id", { length: 255 }).notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text9("name"),
    firstName: text9("first_name"),
    lastName: text9("last_name"),
    clerkId: text9("clerk_id"),
    birthDate: int9("birth_date", { mode: "timestamp" }),
    gender: text9("gender"),
    address: text9("address"),
    notes: text9("notes"),
    instagram: text9("instagram"),
    openLifter: text9("open_lifter"),
    phone: text9("phone"),
    email: text9("email").unique(),
    emailVerified: int9("email_verified", {
      mode: "timestamp"
    }),
    password: text9("password"),
    currentPlanId: int9("current_plan_id"),
    image: text9("image"),
    partnerId: text9("partner_id").references(() => user.id, {
      onDelete: "set null"
    }),
    isActive: int9("is_active", { mode: "boolean" }).default(true),
    isFake: int9("is_fake", { mode: "boolean" }).default(false),
    isTrainer: int9("is_trainer", { mode: "boolean" }).default(false),
    isRoot: int9("is_root", { mode: "boolean" }).default(false),
    isCreator: int9("is_creator", { mode: "boolean" }).default(false),
    isAllTrainers: int9("is_all_trainers", { mode: "boolean" }).default(false),
    createdAt: int9("created_at", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
    updatedAt: int9("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    )
  },
  (table) => [
    index9("user_email_idx").on(table.email),
    index9("user_is_creator_idx").on(table.isCreator),
    index9("user_partner_id_idx").on(table.partnerId)
  ]
);
var userRelations = relations9(user, ({ one, many }) => ({
  partner: one(user, {
    fields: [user.partnerId],
    references: [user.id],
    relationName: "userPartner"
  }),
  partneredUsers: many(user, { relationName: "userPartner" }),
  roles: many(role),
  notifications: many(notification),
  notificationsToggles: many(notificationToggle),
  shoppingLists: many(shoppingList, { relationName: "shoppingLists" }),
  shoppingListsCreator: many(shoppingList, {
    relationName: "shoppingListsCreator"
  }),
  messages: many(message, { relationName: "userMessages" }),
  sentMessages: many(message, { relationName: "sentMessages" }),
  accounts: many(account),
  trainers: many(userToTrainer, { relationName: "trainers" }),
  clients: many(userToTrainer, { relationName: "clients" }),
  userPlans: many(userPlan, { relationName: "user" }),
  userPlansCreator: many(userPlan, { relationName: "creator" }),
  dailyLogs: many(dailyLog),
  weighIns: many(weighIn, { relationName: "user" }),
  weighInsTrainer: many(weighIn, { relationName: "trainer" }),
  skinfolds: many(skinfold, { relationName: "user" }),
  skinfoldsCreator: many(skinfold, { relationName: "creator" }),
  bodyFat: many(bodyFat),
  leanMass: many(leanMass),
  bodyWeight: many(bodyWeight),
  images: many(images),
  settings: one(userSettings, {
    fields: [user.id],
    references: [userSettings.userId]
  }),
  tags: many(tag),
  girthMeasurements: many(girthMeasurement),
  goals: many(goals, { relationName: "user" }),
  goalsTrainer: many(goals, { relationName: "trainer" }),
  trainerNotes: many(trainerNotes, { relationName: "user" }),
  trainerNotesTrainer: many(trainerNotes, { relationName: "trainer" }),
  supplementStacks: many(supplementStack),
  category: many(userToUserCategory)
}));
var notificationToggle = createTable9(
  "notification_toggle",
  {
    id: int9("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int9("created_at", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
    userId: text9("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    type: text9("type"),
    interval: text9("interval"),
    sleep: text9("sleep")
  },
  (table) => [index9("notification_toggle_user_id_idx").on(table.userId)]
);
var notificationToggleRelations = relations9(
  notificationToggle,
  ({ one }) => ({
    user: one(user, {
      fields: [notificationToggle.userId],
      references: [user.id],
      relationName: "user"
    })
  })
);
var userToUserCategory = createTable9(
  "user_to_user_category",
  {
    userId: text9("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    categoryId: int9("category_id").notNull().references(() => userCategory.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index9("user_to_user_category_user_id_idx").on(table.userId)]
);
var usertoUserCategoryRelations = relations9(
  userToUserCategory,
  ({ one }) => ({
    user: one(user, {
      fields: [userToUserCategory.userId],
      references: [user.id]
    }),
    category: one(userCategory, {
      fields: [userToUserCategory.categoryId],
      references: [userCategory.id]
    })
  })
);
var userCategory = createTable9("user_category", {
  id: int9("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text9("name")
});
var userCategoryRelations = relations9(userCategory, ({ many }) => ({
  users: many(userToUserCategory)
}));
var supplementStack = createTable9(
  "supplement_stack",
  {
    id: int9("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int9("created_at", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
    updatedAt: int9("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text9("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    name: text9("name"),
    time: text9("time"),
    isTemplate: int9("is_template", { mode: "boolean" }).default(false),
    order: int9("order").default(0)
  },
  (table) => [index9("supplement_stack_user_id_idx").on(table.userId)]
);
var supplementStackRelations = relations9(
  supplementStack,
  ({ one, many }) => ({
    user: one(user, {
      fields: [supplementStack.userId],
      references: [user.id],
      relationName: "user"
    }),
    supplements: many(supplementToSupplementStack)
  })
);
var supplementToSupplementStack = createTable9(
  "supplement_to_supplement_stack",
  {
    id: int9("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    supplementId: int9("supplement_id").references(() => ingredient.id, {
      onDelete: "cascade"
    }).notNull(),
    supplementStackId: int9("supplement_stack_id").references(() => supplementStack.id, {
      onDelete: "cascade"
    }).notNull(),
    size: text9("size"),
    unit: text9("unit"),
    order: int9("order").default(0)
  }
);
var supplementToSupplementStackRelations = relations9(
  supplementToSupplementStack,
  ({ one }) => ({
    supplement: one(ingredient, {
      fields: [supplementToSupplementStack.supplementId],
      references: [ingredient.id],
      relationName: "supplement"
    }),
    supplementStack: one(supplementStack, {
      fields: [supplementToSupplementStack.supplementStackId],
      references: [supplementStack.id],
      relationName: "supplementStack"
    })
  })
);
var trainerNotes = createTable9(
  "trainer_notes",
  {
    id: int9("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int9("created_at", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
    updatedAt: int9("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text9("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    title: text9("title"),
    description: text9("description"),
    state: text9("state"),
    trainerId: text9("trainer_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index9("trainer_notes_user_id_idx").on(table.userId)]
);
var trainerNotesRelations = relations9(trainerNotes, ({ one }) => ({
  user: one(user, {
    fields: [trainerNotes.userId],
    references: [user.id],
    relationName: "user"
  }),
  trainer: one(user, {
    fields: [trainerNotes.trainerId],
    references: [user.id],
    relationName: "trainer"
  })
}));
var goals = createTable9(
  "goals",
  {
    id: int9("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int9("created_at", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
    updatedAt: int9("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text9("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    title: text9("title"),
    description: text9("description"),
    state: text9("state"),
    completedAt: int9("completed_at", { mode: "timestamp" }),
    trainerId: text9("trainer_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index9("goals_user_id_idx").on(table.userId)]
);
var goalsRelations = relations9(goals, ({ one }) => ({
  user: one(user, {
    fields: [goals.userId],
    references: [user.id],
    relationName: "user"
  }),
  trainer: one(user, {
    fields: [goals.trainerId],
    references: [user.id],
    relationName: "trainer"
  })
}));
var userSettings = createTable9(
  "user_settings",
  {
    id: int9("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int9("created_at", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
    updatedAt: int9("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text9("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    defaultWater: text9("default_water"),
    defaultChartRange: text9("default_chart_range"),
    isPosing: int9("is_posing", { mode: "boolean" }).default(false),
    isBloodGlucose: int9("is_blood_glucose", { mode: "boolean" }).default(false),
    isSleep: int9("is_sleep", { mode: "boolean" }).default(true),
    isSleepQuality: int9("is_sleep_quality", { mode: "boolean" }).default(true),
    isNap: int9("is_nap", { mode: "boolean" }).default(true),
    isWeightTraining: int9("is_weight", { mode: "boolean" }).default(true),
    isHiit: int9("is_hiit", { mode: "boolean" }).default(true),
    isLiss: int9("is_liss", { mode: "boolean" }).default(true),
    isNotes: int9("is_notes", { mode: "boolean" }).default(true),
    isSteps: int9("is_steps", { mode: "boolean" }).default(true),
    isSauna: int9("is_sauna", { mode: "boolean" }).default(true),
    isColdPlunge: int9("is_cold_plunge", { mode: "boolean" }).default(true),
    isMobility: int9("is_mobility", { mode: "boolean" }).default(false),
    isPeriodOvulaion: int9("is_period_ovulaion", { mode: "boolean" }).default(
      false
    ),
    isHighLow: int9("is_high_low", { mode: "boolean" }).default(false),
    isBulkCut: int9("is_bulk_cut", { mode: "boolean" }).default(false),
    ovulaionStartAt: int9("ovulaion_start_at", { mode: "timestamp" }),
    periodStartAt: int9("period_start_at", { mode: "timestamp" }),
    cutStartAt: int9("cut_start_at", { mode: "timestamp" }),
    cutFinishAt: int9("cut_finish_at", { mode: "timestamp" }),
    bulkStartAt: int9("bulk_start_at", { mode: "timestamp" }),
    bulkFinishAt: int9("bulk_finish_at", { mode: "timestamp" }),
    periodLength: int9("period_length").default(5).notNull(),
    periodInterval: int9("period_interval").default(28).notNull()
  },
  (table) => [index9("user_settings_user_id_idx").on(table.userId)]
);
var userSettingsRelations = relations9(userSettings, ({ one }) => ({
  user: one(user, {
    fields: [userSettings.userId],
    references: [user.id]
  })
}));
var weighIn = createTable9(
  "weigh_in",
  {
    id: int9("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int9("created_at", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
    userId: text9("user_id").notNull().references(() => user.id),
    trainerId: text9("trainer_id").notNull().references(() => user.id),
    date: int9("date", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
    bodyWeight: text9("body_weight"),
    leanMass: text9("lean_mass"),
    bodyFat: text9("body_fat"),
    bloodPressure: text9("blood_pressure"),
    image: text9("image"),
    notes: text9("notes")
  },
  (table) => [index9("weigh_in_user_id_idx").on(table.userId)]
);
var weighInRelations = relations9(weighIn, ({ one }) => ({
  user: one(user, {
    fields: [weighIn.userId],
    references: [user.id],
    relationName: "user"
  }),
  trainer: one(user, {
    fields: [weighIn.trainerId],
    references: [user.id],
    relationName: "trainer"
  })
}));
var userToTrainer = createTable9(
  "user_to_trainer",
  {
    userId: text9("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    trainerId: text9("trainer_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    })
  },
  (table) => [
    index9("user_to_trainer_user_id_idx").on(table.userId),
    index9("user_to_trainer_trainer_id_idx").on(table.trainerId)
  ]
);
var role = createTable9(
  "role",
  {
    id: int9("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int9("created_at", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
    updatedAt: int9("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text9("user_id").references(() => user.id, {
      onDelete: "cascade"
    }),
    name: text9("name")
  },
  (table) => [index9("role_user_id_idx").on(table.userId)]
);
var account = createTable9(
  "account",
  {
    userId: text9("user_id", { length: 255 }).notNull().references(() => user.id),
    type: text9("type", { length: 255 }).$type().notNull(),
    provider: text9("provider", { length: 255 }).notNull(),
    providerAccountId: text9("provider_account_id", { length: 255 }).notNull(),
    refresh_token: text9("refresh_token"),
    access_token: text9("access_token"),
    expires_at: int9("expires_at"),
    token_type: text9("token_type", { length: 255 }),
    scope: text9("scope", { length: 255 }),
    id_token: text9("id_token"),
    session_state: text9("session_state", { length: 255 })
  },
  (account2) => ({
    compoundKey: primaryKey({
      columns: [account2.provider, account2.providerAccountId]
    })
  })
);
var verificationToken = createTable9(
  "verification_token",
  {
    identifier: text9("identifier", { length: 255 }).notNull(),
    token: text9("token", { length: 255 }).notNull(),
    expires: int9("expires", { mode: "timestamp" }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
);
var session = createTable9("session", {
  sessionToken: text9("session_token", { length: 255 }).notNull().primaryKey(),
  userId: text9("userId", { length: 255 }).notNull().references(() => user.id),
  expires: int9("expires", { mode: "timestamp" }).notNull()
});
var sessionsRelations = relations9(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] })
}));
var accountsRelations = relations9(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] })
}));
var roleRelations = relations9(role, ({ one }) => ({
  user: one(user, {
    fields: [role.userId],
    references: [user.id]
  })
}));
var userToTrainerRelations = relations9(userToTrainer, ({ one }) => ({
  user: one(user, {
    fields: [userToTrainer.userId],
    references: [user.id],
    relationName: "trainers"
  }),
  trainer: one(user, {
    fields: [userToTrainer.trainerId],
    references: [user.id],
    relationName: "clients"
  })
}));

// src/server/db/schema/settings.ts
import { int as int10, sqliteTable as sqliteTable10 } from "drizzle-orm/sqlite-core";
var createTable10 = sqliteTable10;
var settings = createTable10("settings", {
  id: int10("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  isCaloriesWithFibre: int10("is_calories_with_fibre", { mode: "boolean" })
});

// src/server/db/schema/plan.ts
import { relations as relations11, sql as sql11 } from "drizzle-orm";
import { int as int12, sqliteTable as sqliteTable12, text as text11, index as index11 } from "drizzle-orm/sqlite-core";

// src/server/db/schema/meal.ts
import { relations as relations10, sql as sql10 } from "drizzle-orm";
import { index as index10, int as int11, sqliteTable as sqliteTable11, text as text10 } from "drizzle-orm/sqlite-core";
var createTable11 = sqliteTable11;
var meal = createTable11(
  "meal",
  {
    id: int11("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int11("created_at", { mode: "timestamp" }).default(sql10`(unixepoch())`).notNull(),
    updatedAt: int11("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    planId: int11("plan_id").references(() => plan.id, {
      onDelete: "cascade"
    }),
    name: text10("name"),
    description: text10("description"),
    image: text10("image"),
    notes: text10("notes"),
    creatorId: text10("creator_id").references(() => user.id),
    mealCategory: text10("meal_category"),
    favouriteAt: int11("favourite_at", { mode: "timestamp" }),
    deletedAt: int11("deleted_at", { mode: "timestamp" }),
    hiddenAt: int11("hidden_at", { mode: "timestamp" }),
    vegeNotes: text10("vege_notes"),
    vege: text10("vege"),
    vegeCalories: text10("vege_calories"),
    mealIndex: int11("index", { mode: "number" }),
    calories: text10("calories")
  },
  (table) => [index10("meal_plan_id_idx").on(table.planId)]
);
var mealToRecipe = createTable11(
  "meal_to_recipe",
  {
    id: int11("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int11("created_at", { mode: "timestamp" }).default(sql10`(unixepoch())`).notNull(),
    mealId: int11("meal_id").references(() => meal.id, {
      onDelete: "cascade"
    }),
    recipeId: int11("recipe_id").references(() => recipe.id, {
      onDelete: "cascade"
    }),
    index: int11("index", { mode: "number" }).notNull(),
    note: text10("note")
  },
  (table) => [
    index10("meal_to_recipe_meal_id_idx").on(table.mealId),
    index10("meal_to_recipe_recipe_id_idx").on(table.recipeId)
  ]
);
var vegeStack = createTable11("vege_stack", {
  id: int11("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int11("created_at", { mode: "timestamp" }).default(sql10`(unixepoch())`).notNull(),
  updatedAt: int11("updated_at", { mode: "timestamp" }).$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
  name: text10("name"),
  veges: text10("veges"),
  notes: text10("notes"),
  calories: text10("calories")
});
var mealToVegeStack = createTable11(
  "meal_to_vege_stack",
  {
    id: int11("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int11("created_at", { mode: "timestamp" }).default(sql10`(unixepoch())`).notNull(),
    mealId: int11("meal_id").references(() => meal.id, {
      onDelete: "cascade"
    }),
    vegeStackId: int11("vege_stack_id").references(() => vegeStack.id, {
      onDelete: "cascade"
    }),
    calories: text10("calories"),
    note: text10("note")
  },
  (table) => [
    index10("meal_to_vege_meal_id_idx").on(table.mealId),
    index10("meal_to_vege_vege_id_idx").on(table.vegeStackId)
  ]
);
var mealRelations = relations10(meal, ({ one, many }) => ({
  creator: one(user, { fields: [meal.creatorId], references: [user.id] }),
  mealToRecipe: many(mealToRecipe),
  mealToVegeStack: many(mealToVegeStack),
  planToMeal: many(planToMeal),
  plan: one(plan, {
    fields: [meal.planId],
    references: [plan.id]
  })
}));
var vegeStackRelations = relations10(vegeStack, ({ one, many }) => ({
  mealToVegeStack: many(mealToVegeStack)
}));
var mealToVegeStackRelations = relations10(
  mealToVegeStack,
  ({ one }) => ({
    meal: one(meal, {
      fields: [mealToVegeStack.mealId],
      references: [meal.id]
    }),
    vegeStack: one(vegeStack, {
      fields: [mealToVegeStack.vegeStackId],
      references: [vegeStack.id]
    })
  })
);
var mealToRecipeRelations = relations10(mealToRecipe, ({ one }) => ({
  meal: one(meal, {
    fields: [mealToRecipe.mealId],
    references: [meal.id]
  }),
  recipe: one(recipe, {
    fields: [mealToRecipe.recipeId],
    references: [recipe.id]
  })
}));

// src/server/db/schema/plan.ts
var createTable12 = sqliteTable12;
var plan = createTable12(
  "plan",
  {
    id: int12("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int12("created_at", { mode: "timestamp" }).default(sql11`(unixepoch())`).notNull(),
    updatedAt: int12("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    name: text11("name"),
    description: text11("description"),
    image: text11("image"),
    notes: text11("notes"),
    numberOfMeals: int12("number_of_meals", { mode: "number" }),
    creatorId: text11("creator_id").references(() => user.id),
    isGlobal: int12("is_global", { mode: "boolean" }).default(false),
    planCategory: text11("recipe_category"),
    favouriteAt: int12("favourite_at", { mode: "timestamp" }),
    deletedAt: int12("deleted_at", { mode: "timestamp" }),
    hiddenAt: int12("hidden_at", { mode: "timestamp" }),
    planFolderId: int12("plan_folder_id").references(() => planFolder.id)
  },
  (table) => [
    index11("plan_user_id_idx").on(table.creatorId),
    index11("plan_createAt_id_idx").on(table.createdAt)
  ]
);
var planToMeal = createTable12(
  "plan_to_meal",
  {
    id: int12("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int12("created_at", { mode: "timestamp" }).default(sql11`(unixepoch())`).notNull(),
    planId: int12("plan_id").references(() => plan.id, {
      onDelete: "cascade"
    }),
    mealId: int12("meal_id").references(() => meal.id, {
      onDelete: "cascade"
    }),
    mealIndex: int12("index", { mode: "number" }),
    mealTitle: text11("meal_title"),
    calories: text11("calories"),
    vegeCalories: text11("vege_calories"),
    note: text11("note")
  },
  (table) => [
    index11("plan_to_meal_plan_id_idx").on(table.planId),
    index11("plan_to_meal_meal_id_idx").on(table.mealId)
  ]
);
var planRelations = relations11(plan, ({ one, many }) => ({
  creator: one(user, { fields: [plan.creatorId], references: [user.id] }),
  planToMeal: many(planToMeal),
  meals: many(meal),
  planFolder: one(planFolder, {
    fields: [plan.planFolderId],
    references: [planFolder.id]
  })
}));
var planToMealRelations = relations11(planToMeal, ({ one }) => ({
  meal: one(meal, {
    fields: [planToMeal.mealId],
    references: [meal.id]
  }),
  plan: one(plan, {
    fields: [planToMeal.planId],
    references: [plan.id]
  })
}));
var planFolder = createTable12("plan_folder", {
  id: int12("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int12("created_at", { mode: "timestamp" }).default(sql11`(unixepoch())`).notNull(),
  name: text11("name"),
  parentId: int12("parent_id")
});
var planFolderRelations = relations11(planFolder, ({ one, many }) => ({
  plans: many(plan),
  parent: one(planFolder, {
    fields: [planFolder.parentId],
    references: [planFolder.id]
  })
}));

// src/server/db/schema/log.ts
import { sql as sql12 } from "drizzle-orm";
import { int as int13, sqliteTable as sqliteTable13, text as text12 } from "drizzle-orm/sqlite-core";
var createTable13 = sqliteTable13;
var log = createTable13("log", {
  id: int13("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int13("created_at", { mode: "timestamp" }).default(sql12`(unixepoch())`).notNull(),
  objectId: int13("object_id"),
  task: text12("task"),
  notes: text12("notes"),
  user: text12("user"),
  userId: text12("user_id")
});
var logNew = createTable13("log_new", {
  id: int13("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int13("created_at", { mode: "timestamp" }).default(sql12`(unixepoch())`).notNull(),
  input: text12("input"),
  type: text12("type"),
  path: text12("path"),
  duration: int13("duration"),
  source: text12("source"),
  info: text12("info"),
  error: text12("error"),
  user: text12("user"),
  userId: text12("user_id")
});

// src/server/db/schema/push-subscription.ts
import { sql as sql13 } from "drizzle-orm";
import { int as int14, sqliteTable as sqliteTable14, text as text13 } from "drizzle-orm/sqlite-core";
var createTable14 = sqliteTable14;
var pushSubscription = createTable14(
  "push_subscription",
  {
    id: int14("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int14("created_at", { mode: "timestamp" }).default(sql13`(unixepoch())`).notNull(),
    updatedAt: int14("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    subscription: text13("subscription").notNull(),
    userId: text13("user_id").notNull()
  }
);

// src/server/db/index.ts
var createTable15 = sqliteTableCreator((name) => `${name}`);
var globalForDb = globalThis;
var client = globalForDb.client ?? createClient({
  url: env.DATABASE_URL
});
if (env.NODE_ENV !== "production") globalForDb.client = client;
var db = drizzle(client, { schema: schema_exports });
instrumentDrizzle(client, { dbSystem: "sqlite", maxQueryTextLength: 3e3 });

// src/server/auth/index.ts
import { cache } from "react";
import NextAuth from "next-auth";

// src/server/auth/config.ts
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";
var authConfig = {
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user: user2 }) {
      if (!user2) {
      }
      return true;
    },
    // signIn: async ({ user, account, email,  }) => {
    //     // console.log('credentials', credentials)
    // 	console.log('user', user, account, email)
    // 	if (!user) return false
    // 	const dbUser = await db.query.user.findFirst({
    // 		where: (u, { eq }) => eq(u.email, user.email?.toLowerCase() as string),
    // 		columns: {
    // 			id: true,
    // 		},
    // 	})
    // 	if (dbUser) return true
    // 	return false
    // },
    session: async ({ session: session2, token }) => {
      if (session2.user && token.uid) {
        const dbUser = await db.query.user.findFirst({
          // @ts-ignore
          where: (user2, { eq: eq30 }) => eq30(user2.id, token.uid),
          columns: {
            id: true,
            isTrainer: true,
            isCreator: true
          },
          with: {
            roles: true
          }
        });
        if (dbUser) {
          session2.user = {
            ...session2.user,
            id: dbUser.id,
            isTrainer: dbUser.isTrainer || false,
            isCreator: dbUser.isCreator || false,
            isAdmin: dbUser.roles?.find((role2) => role2.name === "admin") ? true : false
          };
        }
      }
      return {
        ...session2
      };
    },
    jwt: async ({ user: user2, token }) => {
      if (user2) {
        token.uid = user2.id;
      }
      return token;
    }
  },
  adapter: DrizzleAdapter(db, {
    usersTable: user,
    accountsTable: account,
    sessionsTable: session,
    verificationTokensTable: verificationToken
  }),
  providers: [
    Resend({
      // If your environment variable is named differently than default
      apiKey: env.EMAIL_SERVER_PASSWORD,
      from: env.EMAIL_FROM
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);
        if (!credentials) return null;
        const maybeUser = await db.query.user.findFirst({
          where: (user2, { eq: eq30 }) => eq30(user2.email, credentials.username)
        });
        if (!maybeUser) throw new Error("user not found");
        if (!maybeUser.password) throw new Error("invalid password");
        if (maybeUser.isFake) throw new Error("invalid credentials");
        const isValid = await compare(
          credentials.password,
          maybeUser.password
        );
        if (maybeUser && isValid) {
          return {
            id: maybeUser.id,
            email: maybeUser.email,
            name: `${maybeUser.firstName} ${maybeUser.lastName}`,
            isCreator: maybeUser.isCreator
          };
        }
        return null;
      }
    })
  ]
};

// src/server/auth/index.ts
var result = NextAuth(authConfig);
var signIn = result.signIn;
var signOut = result.signOut;
var handlers = result.handlers;
var auth = cache(result.auth);

// src/server/api/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
var t = initTRPC.context().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});
var createCallerFactory = t.createCallerFactory;
var createTRPCRouter = t.router;
var timingMiddleware = t.middleware(async (opts) => {
  const start = Date.now();
  const result2 = await opts.next();
  const input = await opts.getRawInput();
  const end = Date.now();
  if (env.NODE_ENV === "development") {
  } else {
  }
  return result2;
});
var publicProcedure = t.procedure.use(timingMiddleware);
var protectedProcedure = t.procedure.use(timingMiddleware).use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are a poohead"
    });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});
var adminProtectedProcedure = t.procedure.use(timingMiddleware).use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are a poohead"
    });
  }
  const sessionUser = ctx.session.user;
  if (!sessionUser) return next({ ctx });
  const user2 = await ctx.db.query.user.findFirst({
    where: (user3, { eq: eq30 }) => eq30(user3.id, sessionUser.id),
    with: {
      roles: true
    }
  });
  console.log("user in protected", user2);
  if (!user2?.roles.find((role2) => role2.name === "admin")) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "You are not poo" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});
var rootProtectedProcedure = t.procedure.use(timingMiddleware).use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are a poohead"
    });
  }
  const sessionUser = ctx.session.user;
  if (!sessionUser) return next({ ctx });
  const user2 = await ctx.db.query.user.findFirst({
    where: (user3, { eq: eq30 }) => eq30(user3.id, sessionUser.id)
  });
  console.log("user in protected", user2);
  if (!user2?.isRoot) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "You are not poo" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});

// src/server/api/routers/admin-log.ts
import { z as z2 } from "zod";
var createLog = async ({
  user: user2,
  task,
  notes,
  userId,
  objectId
}) => {
  await db.insert(log).values({
    task,
    notes,
    user: user2,
    userId,
    objectId
  });
};
var logRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z2.object({
      task: z2.string(),
      notes: z2.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: input.task,
      notes: input.notes,
      objectId: null
    });
    return true;
  })
});

// src/server/api/routers/daily-logs/post.ts
import { TRPCError as TRPCError2 } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z as z3 } from "zod";

// src/lib/period.ts
var calculateDayDifference = (dateA, dateB) => {
  const MS_PER_DAY = 864e5;
  const utc1 = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
  const utc2 = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
  return Math.floor((utc1 - utc2) / MS_PER_DAY);
};
var isDuringPeriod = (checkDate, lastPeriodStart, cycleLengthDays, periodDurationDays) => {
  if (cycleLengthDays <= 0 || periodDurationDays <= 0) {
    throw new Error(
      "Cycle length and period duration must be positive numbers."
    );
  }
  const daysSinceStart = calculateDayDifference(
    checkDate,
    lastPeriodStart
  );
  if (daysSinceStart < 0) {
    const daysSincePreviousStart = daysSinceStart + cycleLengthDays;
    const daysIntoRelevantCycle = (daysSinceStart % cycleLengthDays + cycleLengthDays) % cycleLengthDays;
    return daysIntoRelevantCycle >= 0 && daysIntoRelevantCycle < periodDurationDays;
  }
  const daysIntoCurrentCycle = daysSinceStart % cycleLengthDays;
  return daysIntoCurrentCycle < periodDurationDays;
};

// src/server/api/routers/daily-logs/post.ts
var isDateWithinRange = ({
  date,
  start,
  finish
}) => {
  if (!start || !finish) return false;
  const target = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
  const startDay = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  ).getTime();
  const finishDay = new Date(
    finish.getFullYear(),
    finish.getMonth(),
    finish.getDate()
  ).getTime();
  const min = Math.min(startDay, finishDay);
  const max = Math.max(startDay, finishDay);
  return target >= min && target <= max;
};
var post = {
  create: protectedProcedure.input(
    z3.object({
      date: z3.string(),
      morningWeight: z3.string().optional(),
      fastedBloodGlucose: z3.string().optional(),
      notes: z3.string().optional(),
      sleep: z3.string().optional(),
      sleepQuality: z3.string().optional(),
      nap: z3.string().optional(),
      waistMeasurement: z3.string().optional(),
      isHiit: z3.boolean().optional(),
      isCardio: z3.boolean().optional(),
      isLift: z3.boolean().optional(),
      isLiss: z3.boolean().optional(),
      image: z3.string().optional(),
      userId: z3.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and(
        eq(dailyLog.date, input.date),
        eq(dailyLog.userId, input.userId)
      )
    });
    if (log2) throw new TRPCError2({ code: "CONFLICT" });
    const userSetting = await ctx.db.query.userSettings.findFirst({
      where: eq(userSettings.userId, input.userId)
    });
    console.log(userSetting);
    const isPeriodEnabled = userSetting?.isPeriodOvulaion;
    const start = userSetting?.periodStartAt ?? /* @__PURE__ */ new Date();
    const ovulaionStart = userSetting?.ovulaionStartAt ?? /* @__PURE__ */ new Date();
    const interval = userSetting?.periodInterval ?? 28;
    const duration = userSetting?.periodLength ?? 5;
    const today = new Date(input.date ?? Date.now());
    const isPeriod = isPeriodEnabled ? isDuringPeriod(today, start, interval, duration) : false;
    const isOvulation = isPeriodEnabled ? isDuringPeriod(today, ovulaionStart, interval, 1) : false;
    const isBulk = isDateWithinRange({
      date: today,
      start: userSetting?.bulkStartAt,
      finish: userSetting?.bulkFinishAt
    });
    const isCut = isDateWithinRange({
      date: today,
      start: userSetting?.cutStartAt,
      finish: userSetting?.cutFinishAt
    });
    const res = await ctx.db.insert(dailyLog).values({
      ...input,
      isPeriod,
      isOvulation,
      isBulk,
      isCut,
      date: input.date
    }).returning({ id: dailyLog.id });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Create Daily Log",
      notes: JSON.stringify(input),
      objectId: res[0]?.id
    });
    return { res };
  }),
  deleteMeal: protectedProcedure.input(
    z3.object({
      mealIndex: z3.number(),
      logId: z3.number()
    })
  ).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(userIngredient).where(
      and(
        eq(userIngredient.dailyLogId, input.logId),
        eq(userIngredient.mealIndex, input.mealIndex)
      )
    );
    await ctx.db.delete(userRecipe).where(
      and(
        eq(userRecipe.dailyLogId, input.logId),
        eq(userRecipe.mealIndex, input.mealIndex)
      )
    );
    await ctx.db.delete(dailyMeal).where(
      and(
        eq(dailyMeal.dailyLogId, input.logId),
        eq(dailyMeal.mealIndex, input.mealIndex)
      )
    );
    return true;
  }),
  copyWeek: protectedProcedure.input(
    z3.object({
      userId: z3.string(),
      logId: z3.number()
    })
  ).mutation(async ({ input, ctx }) => {
    const referenceLog = await ctx.db.select().from(dailyLog).where(eq(dailyLog.id, input.logId)).then((res) => res[0]);
    if (!referenceLog || referenceLog.date === null) {
      throw new Error("Reference log not found.");
    }
    const startDate = new Date(referenceLog.date);
    console.log("startDate1", startDate.toDateString());
    const logs = await createBlankLogs(input.userId, startDate);
    await Promise.all(
      logs.map(async (log2) => {
        if (log2) {
          const meals = await ctx.db.query.dailyMeal.findMany({
            where: eq(dailyMeal.dailyLogId, input.logId)
          });
          meals.forEach(async (meal2) => {
            if (meal2) {
              const recipes = await db.select().from(userRecipe).where(eq(userRecipe.dailyMealId, meal2.id));
              const ingredients = await db.select().from(userIngredient).where(eq(userIngredient.dailyMealId, meal2.id));
              const newMeal = await db.insert(dailyMeal).values({
                ...meal2,
                id: void 0,
                dailyLogId: log2.id
              }).returning({ id: dailyMeal.id });
              await Promise.all(
                recipes.map(async (recipe2) => {
                  await db.insert(userRecipe).values({
                    ...recipe2,
                    id: void 0,
                    dailyMealId: newMeal[0]?.id
                  });
                })
              );
              await Promise.all(
                ingredients.map(async (ingredient2) => {
                  await db.insert(userIngredient).values({
                    ...ingredient2,
                    id: void 0,
                    dailyMealId: newMeal[0]?.id
                  });
                })
              );
            }
          });
        }
      })
    );
    return true;
  }),
  clearDay: protectedProcedure.input(
    z3.object({
      logId: z3.number()
    })
  ).mutation(async ({ input, ctx }) => {
    const dailyMeals = await ctx.db.delete(dailyMeal).where(eq(dailyMeal.dailyLogId, input.logId));
    return dailyMeals;
  }),
  addUserCreatedRecipe: protectedProcedure.input(
    z3.object({
      mealIndex: z3.number(),
      logId: z3.number(),
      recipe: z3.object({
        name: z3.string(),
        description: z3.string(),
        image: z3.string(),
        notes: z3.string(),
        recipeCategory: z3.string(),
        calories: z3.number(),
        ingredients: z3.array(
          z3.object({
            ingredientId: z3.number(),
            alternateId: z3.string(),
            note: z3.string(),
            serveSize: z3.string(),
            serveUnit: z3.string(),
            index: z3.number(),
            isAlternate: z3.boolean().optional()
          })
        )
      })
    })
  ).mutation(async ({ input, ctx }) => {
    console.log("input", input);
    await ctx.db.batch([
      ctx.db.delete(userIngredient).where(
        and(
          eq(userIngredient.dailyLogId, input.logId ?? -1),
          eq(userIngredient.mealIndex, input.mealIndex ?? -1)
        )
      ),
      ctx.db.delete(userRecipe).where(
        and(
          eq(userRecipe.dailyLogId, input.logId ?? -1),
          eq(userRecipe.mealIndex, input.mealIndex ?? -1)
        )
      ),
      ctx.db.delete(dailyMeal).where(
        and(
          eq(dailyMeal.dailyLogId, input.logId ?? -1),
          eq(dailyMeal.mealIndex, input.mealIndex ?? -1)
        )
      )
    ]);
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Add Meal",
      notes: input.recipe.name ?? "",
      objectId: input.logId
    });
    const meal2 = await ctx.db.insert(dailyMeal).values({
      dailyLogId: input.logId,
      mealIndex: input.mealIndex,
      vegeCalories: "",
      veges: ""
    }).returning({ id: dailyMeal.id });
    const dailyMealId = meal2?.[0]?.id;
    console.log("create 1");
    if (!dailyMealId) return;
    const recipeInsert = await ctx.db.insert(userRecipe).values({
      name: input.recipe.name,
      mealIndex: input.mealIndex,
      recipeIndex: 0,
      dailyMealId,
      dailyLogId: input.logId,
      isLog: true,
      isUserCreated: true
    }).returning({ id: userRecipe.id });
    const ingredientInsert = await ctx.db.insert(userIngredient).values(
      input.recipe.ingredients.map((ingredient2) => {
        return {
          ingredientId: ingredient2.ingredientId,
          recipeId: recipeInsert?.[0]?.id,
          mealIndex: input.mealIndex,
          recipeIndex: 0,
          alternateId: ingredient2.alternateId ? Number(ingredient2.alternateId) : null,
          dailyMealId,
          dailyLogId: input.logId,
          isLog: true,
          serve: ingredient2.serveSize,
          serveUnit: ingredient2.serveUnit,
          isUserCreated: true
        };
      })
    ).returning({ id: userIngredient.id });
    return { meal: meal2, recipe: recipeInsert, ingredient: ingredientInsert };
  }),
  addMeal: protectedProcedure.input(
    z3.object({
      userId: z3.string(),
      planId: z3.number(),
      mealIndex: z3.number().nullable(),
      recipeIndex: z3.number().nullable().optional(),
      recipeId: z3.number().nullable().optional(),
      date: z3.date(),
      logId: z3.number().nullable()
    })
  ).mutation(async ({ input, ctx }) => {
    console.log("input", input);
    const plan2 = await ctx.db.query.userPlan.findFirst({
      where: eq(userPlan.id, input.planId),
      with: {
        userMeals: true,
        userRecipes: true,
        userIngredients: true
      }
    });
    if (!plan2) return;
    const recipe2 = plan2.userRecipes.find(
      (recipe3) => recipe3.id === input.recipeId
    );
    if (!recipe2) return;
    const ingredients = plan2.userIngredients.filter(
      (ingredient2) => ingredient2.recipeIndex === recipe2.recipeIndex && ingredient2.mealIndex === recipe2.mealIndex
    );
    if (!ingredients) return;
    if (input.logId === null || input.logId === void 0) {
      const log2 = await ctx.db.insert(dailyLog).values({
        date: input.date.toDateString(),
        morningWeight: "",
        notes: input.date.toDateString(),
        sleep: "",
        sleepQuality: "",
        waistMeasurement: "",
        isHiit: false,
        isCardio: false,
        isLift: false,
        isLiss: false,
        image: "",
        userId: input.userId
      }).returning({ id: dailyLog.id });
      const logId = log2?.[0]?.id;
      if (!logId) throw new Error("Log not found");
      const meal3 = await ctx.db.insert(dailyMeal).values({
        dailyLogId: logId,
        mealIndex: input.mealIndex,
        recipeId: input.recipeId,
        vegeCalories: "",
        veges: ""
      }).returning({ id: dailyMeal.id });
      const dailyMealId2 = meal3?.[0]?.id;
      console.log("dailyMealId", dailyMealId2);
      if (!dailyMealId2) throw new Error("Daily meal not found");
      const { id: id2, createdAt: createdAt2, updatedAt: updatedAt2, userPlanId: userPlanId2, ...recipeInput2 } = recipe2;
      const recipeInsert2 = await ctx.db.insert(userRecipe).values({
        ...recipeInput2,
        mealIndex: input.mealIndex,
        dailyMealId: dailyMealId2,
        dailyLogId: logId,
        parentId: input.recipeId,
        isLog: true
      }).returning({ id: userRecipe.id });
      const ingredientInsert2 = await ctx.db.insert(userIngredient).values(
        ingredients.map((ingredient2) => {
          return {
            id: void 0,
            ingredientId: ingredient2.ingredientId,
            recipeId: recipeInsert2?.[0]?.id,
            mealIndex: input.mealIndex,
            recipeIndex: input.recipeIndex,
            alternateId: ingredient2.alternateId,
            dailyMealId: dailyMealId2,
            dailyLogId: logId,
            isLog: true,
            serve: ingredient2.serve,
            serveUnit: ingredient2.serveUnit
          };
        })
      ).returning({ id: userIngredient.id });
      return { meal: meal3 };
    }
    await ctx.db.batch([
      ctx.db.delete(userIngredient).where(
        and(
          eq(userIngredient.dailyLogId, input.logId ?? -1),
          eq(userIngredient.mealIndex, input.mealIndex ?? -1)
        )
      ),
      ctx.db.delete(userRecipe).where(
        and(
          eq(userRecipe.dailyLogId, input.logId ?? -1),
          eq(userRecipe.mealIndex, input.mealIndex ?? -1)
        )
      ),
      ctx.db.delete(dailyMeal).where(
        and(
          eq(dailyMeal.dailyLogId, input.logId ?? -1),
          eq(dailyMeal.mealIndex, input.mealIndex ?? -1)
        )
      )
    ]);
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Add Meal",
      notes: recipe2.name ?? "",
      objectId: input.logId
    });
    const meal2 = await ctx.db.insert(dailyMeal).values({
      dailyLogId: input.logId,
      mealIndex: input.mealIndex,
      recipeId: input.recipeId,
      vegeCalories: "",
      veges: ""
    }).returning({ id: dailyMeal.id });
    const dailyMealId = meal2?.[0]?.id;
    console.log("create 1");
    if (!dailyMealId) return;
    const { id, createdAt, updatedAt, userPlanId, ...recipeInput } = recipe2;
    const recipeInsert = await ctx.db.insert(userRecipe).values({
      ...recipeInput,
      mealIndex: input.mealIndex,
      recipeIndex: input.recipeIndex,
      dailyMealId,
      dailyLogId: input.logId,
      parentId: input.recipeId,
      isLog: true
    }).returning({ id: userRecipe.id });
    const ingredientInsert = await ctx.db.insert(userIngredient).values(
      ingredients.map((ingredient2) => {
        return {
          ingredientId: ingredient2.ingredientId,
          recipeId: recipeInsert?.[0]?.id,
          mealIndex: input.mealIndex,
          recipeIndex: input.recipeIndex,
          alternateId: ingredient2.alternateId,
          dailyMealId,
          dailyLogId: input.logId,
          isLog: true,
          serve: ingredient2.serve,
          serveUnit: ingredient2.serveUnit
        };
      })
    ).returning({ id: userIngredient.id });
    return { meal: meal2, recipe: recipeInsert, ingredient: ingredientInsert };
  }),
  delete: protectedProcedure.input(z3.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(dailyLog).where(eq(dailyLog.id, input));
    return res;
  }),
  deleteAll: protectedProcedure.input(z3.string()).mutation(async ({ input, ctx }) => {
    if (input === "") throw new TRPCError2({ code: "NOT_FOUND" });
    const res = await ctx.db.delete(dailyLog).where(eq(dailyLog.userId, input));
    return res;
  })
};

// src/server/api/routers/daily-logs/update-dl.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
import { and as and2, eq as eq2 } from "drizzle-orm";
import { z as z4 } from "zod";
var updateDl = {
  update: protectedProcedure.input(
    z4.object({
      id: z4.number(),
      date: z4.string(),
      morningWeight: z4.string().optional(),
      notes: z4.string().optional(),
      sleep: z4.string().optional(),
      sleepQuality: z4.string().optional(),
      fastedBloodGlucose: z4.string().optional(),
      nap: z4.string().optional(),
      waistMeasurement: z4.string().optional(),
      isHiit: z4.boolean().optional(),
      isCardio: z4.boolean().optional(),
      isLift: z4.boolean().optional(),
      isLiss: z4.boolean().optional(),
      image: z4.string().optional(),
      userId: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const {
      id,
      date,
      morningWeight,
      notes,
      sleep,
      sleepQuality,
      fastedBloodGlucose,
      waistMeasurement,
      isHiit,
      isCardio,
      isLift,
      isLiss,
      image: image2,
      userId,
      nap
    } = input;
    const res = await ctx.db.update(dailyLog).set({
      date,
      morningWeight,
      notes,
      sleep,
      sleepQuality,
      fastedBloodGlucose,
      waistMeasurement,
      nap,
      isHiit,
      isCardio,
      isLift,
      isLiss,
      image: image2,
      userId
    }).where(eq2(dailyLog.id, id));
    createLog({
      user: ctx.session.user.name,
      task: "Update Daily Log",
      notes: JSON.stringify(input),
      userId: ctx.session.user.id,
      objectId: id
    });
    return { res };
  }),
  updateIsStarred: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      isStarred: z4.boolean()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Star Daily Log",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        isStarred: input.isStarred,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ isStarred: input.isStarred }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateIsPeriod: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      isPeriod: z4.boolean()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "toggle period",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        isPeriod: input.isPeriod,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ isPeriod: input.isPeriod }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateIsOvulation: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      isOvulation: z4.boolean()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "toggle ovualtion",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        isOvulation: input.isOvulation,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ isOvulation: input.isOvulation }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateIsBulk: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      isBulk: z4.boolean()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "toggle bulk",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        isBulk: input.isBulk,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ isBulk: input.isBulk }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateIsCut: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      isCut: z4.boolean()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "toggle cut",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        isCut: input.isCut,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ isCut: input.isCut }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateIsLowOrHigh: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      isLow: z4.boolean(),
      isHigh: z4.boolean()
    }).refine((value) => !(value.isLow && value.isHigh), {
      message: "isLow and isHigh cannot both be true"
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "toggle low or high",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        isLow: input.isLow,
        isHigh: input.isHigh,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({
      isLow: input.isLow,
      isHigh: input.isHigh
    }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSupplement: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      suppId: z4.number(),
      amount: z4.number(),
      unit: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Supplement",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      throw new TRPCError3({ code: "NOT_FOUND" });
    }
    const res = await ctx.db.insert(dailySupplement).values({
      dailyLogId: log2.id,
      supplementId: input.suppId,
      amount: input.amount.toString(),
      unit: input.unit
    }).returning({ id: dailySupplement.id });
    return res;
  }),
  updateNote: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      notes: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    console.log("-------------------------------------enter");
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    console.log("-------------------------------------log");
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Note",
      notes: JSON.stringify(input),
      objectId: null
    });
    console.log("-------------------------------------log");
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        notes: input.notes,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ notes: input.notes }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updatePosing: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      posing: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Posing",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        posing: input.posing,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ posing: input.posing }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSleep: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      sleep: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Sleep",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        sleep: input.sleep,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ sleep: input.sleep }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSleepQuality: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      sleepQuality: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Sleep Qual",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        sleepQuality: input.sleepQuality,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ sleepQuality: input.sleepQuality }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSteps: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      steps: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    if (!log2) return;
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Steps",
      notes: JSON.stringify(input),
      objectId: log2?.id
    });
    const res = await ctx.db.update(dailyLog).set({ steps: input.steps }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSauna: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      sauna: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    if (!log2) return;
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Sauna",
      notes: JSON.stringify(input),
      objectId: log2?.id
    });
    const res = await ctx.db.update(dailyLog).set({ sauna: input.sauna }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateColdPlunge: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      coldPlunge: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    if (!log2) return;
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Cold Plunge",
      notes: JSON.stringify(input),
      objectId: log2?.id
    });
    const res = await ctx.db.update(dailyLog).set({ coldPlunge: input.coldPlunge }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateNap: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      nap: z4.string(),
      userId: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const userId = input.userId;
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(eq2(dailyLog.date, input.date), eq2(dailyLog.userId, userId))
    });
    console.log("log", log2);
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Nap",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      console.log("create");
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        nap: input.nap,
        userId
      });
      console.log("res-c", res2);
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ nap: input.nap }).where(and2(eq2(dailyLog.date, input.date), eq2(dailyLog.userId, userId)));
    console.log("res", res);
    return res;
  }),
  updateHiit: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      hiit: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update hiit",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        hiit: input.hiit,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ hiit: input.hiit }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateCardio: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      cardio: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Cardio",
      notes: JSON.stringify(input),
      objectId: log2?.id
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        cardio: input.cardio,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ cardio: input.cardio }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateWeightTraining: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      weight: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Weight Training",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        weight: input.weight,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ weight: input.weight }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateLiss: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      liss: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Liss",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        liss: input.liss,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ liss: input.liss }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateMobility: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      mobility: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Mobility",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        mobility: input.mobility,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ mobility: input.mobility }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateWaistMeasurement: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      waistMeasurement: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Girth",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        waistMeasurement: input.waistMeasurement,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ waistMeasurement: input.waistMeasurement }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateWeight: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      morningWeight: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Weight",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        morningWeight: input.morningWeight,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ morningWeight: input.morningWeight }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateBloodGlucose: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      fastedBloodGlucose: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: `Update Blood Glucose`,
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        fastedBloodGlucose: input.fastedBloodGlucose,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ fastedBloodGlucose: input.fastedBloodGlucose }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateBloodGlucoseTiming: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      fastedBloodGlucoseTiming: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: `Update Blood Glucose Timing`,
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        fastedBloodGlucoseTiming: input.fastedBloodGlucoseTiming,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({
      fastedBloodGlucoseTiming: input.fastedBloodGlucoseTiming
    }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateImage: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      image: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: `Update Image' + ${log2 ? "" : " and Create Log"}`,
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      throw new Error("Log not found");
    }
    const res = await ctx.db.update(dailyLog).set({ image: input.image }).where(
      and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    );
    return true;
  }),
  addWaterLog: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      amount: z4.number()
    })
  ).mutation(async ({ input, ctx }) => {
    let isCreateLog = false;
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(
        eq2(dailyLog.date, input.date),
        eq2(dailyLog.userId, ctx.session.user.id)
      )
    });
    let logId = log2?.id;
    if (!logId) {
      const res = await ctx.db.insert(dailyLog).values({
        date: input.date,
        userId: ctx.session.user.id
      }).returning({ id: dailyLog.id });
      logId = res[0]?.id;
      isCreateLog = true;
    }
    if (!logId) throw new Error("Log not found");
    const water = await ctx.db.insert(waterLog).values({
      amount: input.amount.toString(),
      dailyLogId: logId
    }).returning({ id: waterLog.id });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: water[0]?.id,
      task: "Add Water " + input.amount.toString() + "ml",
      notes: isCreateLog ? "Created new log" : ""
    });
    return water;
  }),
  deleteWaterLog: protectedProcedure.input(z4.object({ id: z4.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(waterLog).where(eq2(waterLog.id, input.id));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: input.id,
      task: "Deleted water",
      notes: ""
    });
    return res;
  }),
  addPoopLog: protectedProcedure.input(
    z4.object({
      date: z4.string(),
      userId: z4.string()
    })
  ).mutation(async ({ input, ctx }) => {
    let isCreateLog = false;
    console.log("input", input);
    const userId = input.userId;
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and2(eq2(dailyLog.date, input.date), eq2(dailyLog.userId, userId))
    });
    let logId = log2?.id;
    console.log("logId", log2);
    if (!logId) {
      console.log("create");
      const res = await ctx.db.insert(dailyLog).values({
        date: input.date,
        userId
      }).returning({ id: dailyLog.id });
      logId = res[0]?.id;
      isCreateLog = true;
    }
    if (!logId) throw new Error("Log not found");
    const poop = await ctx.db.insert(poopLog).values({
      dailyLogId: logId
    }).returning({ id: poopLog.id });
    console.log("poop", poop);
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: poop[0]?.id,
      task: "Add poo ",
      notes: isCreateLog ? "Created new log" : ""
    });
    return poop;
  }),
  deletePoopLog: protectedProcedure.input(z4.object({ id: z4.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(poopLog).where(eq2(poopLog.id, input.id));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: input.id,
      task: "Deleted Poo",
      notes: ""
    });
    return res;
  })
};

// src/server/api/routers/daily-logs/get.ts
import { TRPCError as TRPCError4 } from "@trpc/server";
import { eq as eq3 } from "drizzle-orm";
import { z as z5 } from "zod";
var get = {
  getUserLimit: protectedProcedure.input(z5.object({ id: z5.string(), limit: z5.number() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.dailyLog.findMany({
      where: eq3(dailyLog.userId, input.id),
      with: {
        waterLogs: true,
        poopLogs: true,
        supplements: {
          with: {
            supplement: true
          }
        },
        tags: {
          with: {
            tag: true
          }
        },
        dailyMeals: {
          with: {
            recipe: true,
            ingredients: {
              with: {
                ingredient: true
              }
            }
          }
        }
      },
      orderBy: (data, { desc: desc11 }) => desc11(data.createdAt),
      limit: input.limit
    });
    return res;
  }),
  getAllUser: protectedProcedure.input(z5.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError4({ code: "NOT_FOUND" });
    const res = await ctx.db.query.dailyLog.findMany({
      where: eq3(dailyLog.userId, input),
      with: {
        waterLogs: true,
        poopLogs: true,
        supplements: {
          with: {
            supplement: true
          }
        },
        tags: {
          with: {
            tag: true
          }
        },
        dailyMeals: {
          with: {
            recipe: true,
            ingredients: {
              with: {
                ingredient: true
              }
            }
          }
        }
      },
      orderBy: (data, { desc: desc11 }) => desc11(data.createdAt)
    });
    return res;
  }),
  getAllCurrentUser: protectedProcedure.input(z5.object({ id: z5.string() }).optional()).query(async ({ ctx, input }) => {
    let userId = ctx.session?.user.id;
    if (input?.id && input.id !== "") userId = input.id;
    if (!userId) return null;
    const res = await ctx.db.query.dailyLog.findMany({
      where: eq3(dailyLog.userId, userId),
      with: {
        poopLogs: true,
        waterLogs: true,
        supplements: {
          with: {
            supplement: true
          }
        },
        tags: {
          with: {
            tag: true
          }
        },
        dailyMeals: {
          with: {
            recipe: true,
            ingredients: {
              with: {
                ingredient: true
              }
            }
          }
        }
      }
    });
    return res.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }),
  getSimple: protectedProcedure.input(z5.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.dailyLog.findFirst({
      where: eq3(dailyLog.id, input)
    });
    return res;
  }),
  get: protectedProcedure.input(z5.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.dailyLog.findFirst({
      where: eq3(dailyLog.id, input),
      with: {
        poopLogs: true,
        waterLogs: true,
        supplements: {
          with: {
            supplement: true
          }
        },
        tags: {
          with: {
            tag: true
          }
        },
        dailyMeals: {
          with: {
            recipe: true,
            ingredients: {
              with: {
                ingredient: true
              }
            }
          }
        }
      }
    });
    return res;
  })
};

// src/server/api/utils/send-push.ts
import webpush from "web-push";
webpush.setVapidDetails(
  "mailto:admin@warner.systems",
  env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  env.VAPID_PRIVATE_KEY
);
async function sendPushNotification(subscription, title, body, url = "/", icon = "/ce.png") {
  const payload = JSON.stringify({
    title,
    body,
    // url: url, // Include URL in payload for service worker
    icon,
    url: "poo"
  });
  try {
    await webpush.sendNotification(subscription, payload);
    console.log("Push notification sent successfully!");
    return { success: true, message: "Notification sent" };
  } catch (error) {
    console.error("Error sending push notification:", error);
    if (error.statusCode === 410) {
      console.warn(
        "Subscription expired. You should delete it from your database."
      );
      return { success: false, message: "Subscription expired" };
    }
    return {
      success: false,
      message: `Failed to send notification: ${error.message}`
    };
  }
}

// src/server/api/routers/daily-logs/image.ts
import { and as and3, eq as eq4 } from "drizzle-orm";
import { z as z6 } from "zod";
var sendTrainerNotification = async ({
  title,
  userId
}) => {
  const userRes = await db.query.user.findFirst({
    where: eq4(user.id, userId),
    with: {
      trainers: {
        with: {
          trainer: true
        }
      }
    }
  });
  if (!userRes) return;
  for (const trainer of userRes.trainers) {
    await db.insert(notification).values({
      userId: trainer.trainer.id,
      code: "image-upload",
      title: `${userRes.name} has uploaded ${title}`,
      description: "",
      notes: ""
    });
    const sub = await db.query.pushSubscription.findFirst({
      where: eq4(pushSubscription.userId, trainer.trainer.id)
    });
    if (sub) {
      await sendPushNotification(JSON.parse(sub.subscription), `${userRes.name} has uploaded ${title}`, "");
    }
  }
};
var image = {
  getImageOverlay: protectedProcedure.input(
    z6.object({
      dataId: z6.number(),
      imageType: z6.string()
    })
  ).query(async ({ input, ctx }) => {
    if (input.imageType === "front") {
      const res2 = await ctx.db.query.dailyLog.findFirst({
        where: eq4(dailyLog.id, input.dataId),
        columns: {
          frontImageSvg: true
        }
      });
      return { overlay: res2?.frontImageSvg };
    }
    if (input.imageType === "side") {
      const res2 = await ctx.db.query.dailyLog.findFirst({
        where: eq4(dailyLog.id, input.dataId),
        columns: {
          sideImageSvg: true
        }
      });
      return { overlay: res2?.sideImageSvg };
    }
    if (input.imageType === "back") {
      const res2 = await ctx.db.query.dailyLog.findFirst({
        where: eq4(dailyLog.id, input.dataId),
        columns: {
          backImageSvg: true
        }
      });
      return { overlay: res2?.backImageSvg };
    }
    const res = await ctx.db.query.images.findFirst({
      where: eq4(images.id, input.dataId),
      columns: {
        svg: true
      }
    });
    return { overlay: res?.svg };
  }),
  updateFrontImage: protectedProcedure.input(
    z6.object({
      logId: z6.number(),
      image: z6.string(),
      isNotifyTrainer: z6.boolean(),
      userId: z6.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Front Image",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ frontImage: input.image }).where(eq4(dailyLog.id, input.logId));
    if (input.isNotifyTrainer) {
      sendTrainerNotification({
        title: "Front Pose",
        userId: input.userId
      });
    }
    return res;
  }),
  updateFrontImageOverlay: protectedProcedure.input(
    z6.object({
      logId: z6.number(),
      overlay: z6.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Front Image Overlay",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ frontImageSvg: input.overlay }).where(eq4(dailyLog.id, input.logId));
    return res;
  }),
  updateSideImage: protectedProcedure.input(
    z6.object({
      logId: z6.number(),
      image: z6.string(),
      isNotifyTrainer: z6.boolean(),
      userId: z6.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update side Image",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ sideImage: input.image }).where(eq4(dailyLog.id, input.logId));
    if (input.isNotifyTrainer) {
      sendTrainerNotification({
        title: "Side Pose",
        userId: input.userId
      });
    }
    return res;
  }),
  updateSideImageOverlay: protectedProcedure.input(
    z6.object({
      logId: z6.number(),
      overlay: z6.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Side Image Overlay",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ sideImageSvg: input.overlay }).where(eq4(dailyLog.id, input.logId));
    return res;
  }),
  updateBackImage: protectedProcedure.input(
    z6.object({
      logId: z6.number(),
      image: z6.string(),
      isNotifyTrainer: z6.boolean(),
      userId: z6.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update  Back Image",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ backImage: input.image }).where(eq4(dailyLog.id, input.logId));
    if (input.isNotifyTrainer) {
      sendTrainerNotification({
        title: "Back Pose",
        userId: input.userId
      });
    }
    return res;
  }),
  updateBackImageOverlay: protectedProcedure.input(
    z6.object({
      logId: z6.number(),
      overlay: z6.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Back Image Overlay",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ backImageSvg: input.overlay }).where(eq4(dailyLog.id, input.logId));
    return res;
  }),
  updateBodyBuilderImage: protectedProcedure.input(
    z6.object({
      date: z6.string(),
      image: z6.string(),
      name: z6.string(),
      userId: z6.string(),
      isNotifyTrainer: z6.boolean()
    })
  ).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(images).where(
      and3(
        eq4(images.date, input.date),
        eq4(images.name, input.name),
        eq4(images.userId, input.userId)
      )
    );
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: `Update Image ${input.name} `,
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.insert(images).values({
      userId: input.userId,
      name: input.name,
      date: input.date,
      image: input.image
    }).returning({ id: images.id });
    if (input.isNotifyTrainer) {
      sendTrainerNotification({
        title: input.name,
        userId: input.userId
      });
    }
    return res;
  }),
  updateBodyBuilderImageOverlay: protectedProcedure.input(
    z6.object({
      imageId: z6.number(),
      overlay: z6.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Body Builder Image Overlay",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(images).set({ svg: input.overlay }).where(eq4(images.id, input.imageId));
    return res;
  })
};

// src/server/api/routers/daily-log.ts
var dailyLogRouter = createTRPCRouter({
  ...post,
  ...updateDl,
  ...get,
  ...image
});

// src/server/api/routers/goals/get.ts
import { z as z7 } from "zod";
var get2 = {
  getUser: protectedProcedure.input(z7.object({ userId: z7.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.goals.findMany({
      where: (goal, { eq: eq30 }) => eq30(goal.userId, input.userId)
    });
    return res;
  }),
  get: protectedProcedure.input(z7.object({ id: z7.number() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.goals.findFirst({
      where: (goal, { eq: eq30 }) => eq30(goal.id, input.id)
    });
    return res;
  })
};

// src/server/api/routers/goals/post.ts
import { eq as eq5 } from "drizzle-orm";
import { z as z8 } from "zod";
var post2 = {
  create: protectedProcedure.input(
    z8.object({
      userId: z8.string(),
      title: z8.string(),
      description: z8.string(),
      state: z8.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const trainerId = ctx.session?.user.id;
    const res = await ctx.db.insert(goals).values({
      userId: input.userId,
      title: input.title,
      description: input.description,
      state: input.state,
      trainerId
    }).returning({ id: goals.id });
    return res;
  }),
  update: protectedProcedure.input(
    z8.object({
      id: z8.number(),
      title: z8.string(),
      description: z8.string(),
      state: z8.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(goals).set({
      title: input.title,
      description: input.description,
      state: input.state
    }).where(eq5(goals.id, input.id));
    return res;
  }),
  delete: protectedProcedure.input(z8.object({ id: z8.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(goals).where(eq5(goals.id, input.id));
    return res;
  })
};

// src/server/api/routers/goals.ts
var goalsRouter = createTRPCRouter({
  ...get2,
  ...post2
});

// src/server/api/schema/ingredient.ts
import { z as z9 } from "zod";
var createIngredientSchema = z9.object({
  name: z9.string().min(1),
  serveSize: z9.string(),
  serveUnit: z9.string().min(1),
  caloriesWFibre: z9.string(),
  caloriesWOFibre: z9.string(),
  protein: z9.string(),
  fatTotal: z9.string(),
  totalDietaryFibre: z9.string(),
  totalSugars: z9.string(),
  starch: z9.string(),
  resistantStarch: z9.string(),
  availableCarbohydrateWithoutSugarAlcohols: z9.string(),
  availableCarbohydrateWithSugarAlcohols: z9.string(),
  isAllStores: z9.boolean(),
  stores: z9.array(z9.string())
});
var updateIngredientSchema = z9.object({
  id: z9.number(),
  name: z9.string().min(1),
  serveSize: z9.string(),
  serveUnit: z9.string().min(1),
  caloriesWFibre: z9.string(),
  caloriesWOFibre: z9.string(),
  protein: z9.string(),
  fatTotal: z9.string(),
  totalDietaryFibre: z9.string(),
  totalSugars: z9.string(),
  starch: z9.string(),
  resistantStarch: z9.string(),
  availableCarbohydrateWithoutSugarAlcohols: z9.string(),
  availableCarbohydrateWithSugarAlcohols: z9.string(),
  isAllStores: z9.boolean(),
  stores: z9.array(z9.string())
});

// src/server/api/routers/ingredient.ts
import { asc, eq as eq6 } from "drizzle-orm";
import { z as z10 } from "zod";
var ingredientRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.ingredient.findMany({
      where: (ingredient2, { isNull: isNull2, and: and15, eq: eq30 }) => and15(
        isNull2(ingredient2.hiddenAt),
        isNull2(ingredient2.deletedAt),
        eq30(ingredient2.isSupplement, false),
        eq30(ingredient2.isPrivate, false),
        eq30(ingredient2.isUserCreated, false)
      ),
      with: {
        user: {
          columns: {
            id: true,
            name: true
          }
        },
        ingredientToGroceryStore: {
          with: {
            groceryStore: true
          }
        }
      },
      orderBy: [asc(ingredient.name)]
    });
    return res;
  }),
  getAllFav: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.ingredient.findMany({
      where: (ingredient2, { isNull: isNull2, and: and15, eq: eq30 }) => and15(
        isNull2(ingredient2.hiddenAt),
        isNull2(ingredient2.deletedAt),
        eq30(ingredient2.isSupplement, false),
        eq30(ingredient2.isPrivate, false),
        eq30(ingredient2.isUserCreated, false)
      ),
      with: {
        ingredientToGroceryStore: {
          with: {
            groceryStore: true
          }
        }
      },
      orderBy: [asc(ingredient.favouriteAt)]
    });
    return res;
  }),
  get: protectedProcedure.input(z10.object({ id: z10.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.ingredient.findFirst({
      where: (ingredient2, { eq: eq30 }) => eq30(ingredient2.id, input.id),
      with: {
        user: {
          columns: {
            id: true,
            name: true
          }
        },
        ingredientToGroceryStore: {
          with: {
            groceryStore: true
          }
        }
      }
    });
    return res;
  }),
  updateHiddenAt: protectedProcedure.input(z10.object({ id: z10.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(ingredient).set({
      hiddenAt: /* @__PURE__ */ new Date()
    }).where(eq6(ingredient.id, input.id));
    console.log(res);
    return res;
  }),
  deleteHiddenAt: protectedProcedure.input(z10.object({ id: z10.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(ingredient).set({
      hiddenAt: null
    }).where(eq6(ingredient.id, input.id));
    return res;
  }),
  updateFavourite: protectedProcedure.input(z10.object({ id: z10.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(ingredient).set({
      favouriteAt: /* @__PURE__ */ new Date()
    }).where(eq6(ingredient.id, input.id));
    return res;
  }),
  deleteFavourite: protectedProcedure.input(z10.object({ id: z10.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(ingredient).set({
      favouriteAt: null
    }).where(eq6(ingredient.id, input.id));
    return res;
  }),
  update: protectedProcedure.input(updateIngredientSchema).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { id, stores, ...rest } = input;
    console.log({ stores, ...rest });
    const res = await ctx.db.update(ingredient).set({
      ...rest,
      userId
    }).where(eq6(ingredient.id, id)).returning({ id: ingredient.id });
    const ingredientId = res[0]?.id;
    if (stores.length > 0 && ingredientId) {
      await ctx.db.delete(ingredientToGroceryStore).where(eq6(ingredientToGroceryStore.ingredientId, ingredientId));
      await ctx.db.insert(ingredientToGroceryStore).values(
        stores.map((store) => ({
          ingredientId,
          groceryStoreId: Number(store)
        }))
      );
    }
    return res;
  }),
  create: protectedProcedure.input(createIngredientSchema).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { stores, ...rest } = input;
    console.log({ stores, ...rest });
    const res = await ctx.db.insert(ingredient).values({
      ...rest,
      userId
    }).returning({
      id: ingredient.id,
      name: ingredient.name,
      serveSize: ingredient.serveSize,
      serveUnit: ingredient.serveUnit,
      caloriesWFibre: ingredient.caloriesWFibre
    });
    const ingredientId = res[0]?.id;
    if (stores.length > 0 && ingredientId) {
      await ctx.db.insert(ingredientToGroceryStore).values(
        stores.map((store) => ({
          ingredientId,
          groceryStoreId: Number(store)
        }))
      );
    }
    return res;
  }),
  delete: protectedProcedure.input(z10.object({ id: z10.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(ingredient).where(eq6(ingredient.id, input.id));
    return res;
  })
});

// src/server/api/routers/meal.ts
import { desc as desc2, eq as eq7 } from "drizzle-orm";
import { z as z11 } from "zod";
var mealRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.meal.findMany({
      orderBy: [desc2(meal.createdAt)],
      with: {
        mealToVegeStack: {
          with: {
            vegeStack: true
          }
        },
        mealToRecipe: {
          with: {
            recipe: {
              with: {
                recipeToIngredient: {
                  with: {
                    ingredient: {
                      with: {
                        ingredientToGroceryStore: {
                          with: {
                            groceryStore: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    return res;
  }),
  get: protectedProcedure.input(z11.object({ id: z11.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.meal.findFirst({
      where: (meal2, { eq: eq30 }) => eq30(meal2.id, input.id),
      with: {
        mealToVegeStack: {
          with: {
            vegeStack: true
          }
        },
        mealToRecipe: {
          with: {
            recipe: {
              with: {
                recipeToIngredient: {
                  with: {
                    ingredient: {
                      with: {
                        ingredientToGroceryStore: {
                          with: {
                            groceryStore: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    return res;
  }),
  create: protectedProcedure.input(
    z11.object({
      name: z11.string(),
      description: z11.string(),
      image: z11.string(),
      notes: z11.string(),
      mealCategory: z11.string(),
      veges: z11.object({
        vegeStackId: z11.number(),
        note: z11.string(),
        calories: z11.string()
      }).optional(),
      recipes: z11.array(
        z11.object({
          recipeId: z11.number(),
          note: z11.string(),
          index: z11.number()
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { veges, recipes, ...data } = input;
    const res = await ctx.db.insert(meal).values({
      ...data,
      creatorId: userId
    }).returning({ id: meal.id });
    const resId = res?.[0]?.id;
    if (!resId) return res;
    const recipeRes = await ctx.db.insert(mealToRecipe).values(
      recipes.map((recipe2) => ({
        ...recipe2,
        mealId: resId
      }))
    ).returning({ id: mealToRecipe.id });
    if (veges && veges?.vegeStackId !== 0) {
      await ctx.db.insert(mealToVegeStack).values({
        ...veges,
        mealId: resId
      });
    }
    return { res, recipeRes };
  }),
  update: protectedProcedure.input(
    z11.object({
      id: z11.number(),
      name: z11.string(),
      description: z11.string(),
      image: z11.string(),
      notes: z11.string(),
      mealCategory: z11.string(),
      veges: z11.object({
        vegeStackId: z11.number(),
        note: z11.string(),
        calories: z11.string()
      }).optional(),
      recipes: z11.array(
        z11.object({
          recipeId: z11.number(),
          note: z11.string(),
          index: z11.number()
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    const { veges, recipes, id, ...data } = input;
    const res = await ctx.db.update(meal).set({
      ...data
    }).where(eq7(meal.id, input.id));
    await ctx.db.delete(mealToRecipe).where(eq7(mealToRecipe.mealId, input.id));
    const recipeRes = await ctx.db.insert(mealToRecipe).values(
      recipes.map((recipe2) => ({
        ...recipe2,
        mealId: input.id
      }))
    ).returning({ id: mealToRecipe.id });
    await ctx.db.delete(mealToVegeStack).where(eq7(mealToVegeStack.mealId, input.id));
    if (veges && veges.vegeStackId != 0) {
      await ctx.db.insert(mealToVegeStack).values({
        ...veges,
        mealId: input.id
      });
    }
    return { res, recipeRes };
  }),
  updateFavourite: protectedProcedure.input(z11.object({ id: z11.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(meal).set({
      favouriteAt: /* @__PURE__ */ new Date()
    }).where(eq7(meal.id, input.id));
    return res;
  }),
  deleteFavourite: protectedProcedure.input(z11.object({ id: z11.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(meal).set({
      favouriteAt: null
    }).where(eq7(meal.id, input.id));
    return res;
  }),
  delete: protectedProcedure.input(z11.object({ id: z11.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(meal).where(eq7(meal.id, input.id));
    return res;
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(meal);
    return res;
  })
});

// src/server/api/routers/message.ts
import { and as and5, eq as eq8 } from "drizzle-orm";
import { z as z12 } from "zod";
var createLog2 = async ({
  user: user2,
  task,
  notes,
  userId,
  objectId
}) => {
  await db.insert(log).values({
    task,
    notes,
    user: user2,
    userId,
    objectId
  });
};
var messageRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z12.object({
      userId: z12.string(),
      fromUserId: z12.string(),
      subject: z12.string(),
      message: z12.string(),
      isImportant: z12.boolean(),
      image: z12.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(message).values({
      ...input
    }).returning({ id: message.id });
    createLog2({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Create Message",
      notes: JSON.stringify(input),
      objectId: res[0]?.id
    });
    return { res };
  }),
  getAllUser: protectedProcedure.input(z12.string()).query(async ({ ctx, input }) => {
    let userId = input;
    if (input === "") {
      userId = ctx.session?.user.id;
    }
    const res = await ctx.db.query.message.findMany({
      where: eq8(message.userId, userId),
      orderBy: (data, { desc: desc11 }) => desc11(data.createdAt),
      with: {
        fromUser: true,
        user: true
      }
    });
    return res;
  }),
  getAllUserUnread: protectedProcedure.input(z12.string()).query(async ({ ctx, input }) => {
    let userId = input;
    if (input === "") {
      userId = ctx.session?.user.id;
    }
    const res = await ctx.db.query.message.findMany({
      where: and5(eq8(message.userId, userId), eq8(message.isRead, false)),
      orderBy: (data, { desc: desc11 }) => desc11(data.createdAt),
      with: {
        fromUser: true,
        user: true
      }
    });
    return res;
  }),
  getAllFromUser: protectedProcedure.input(z12.string()).query(async ({ ctx, input }) => {
    let userId = input;
    if (input === "") {
      userId = ctx.session?.user.id;
    }
    const res = await ctx.db.query.message.findMany({
      where: eq8(message.fromUserId, userId),
      orderBy: (data, { desc: desc11 }) => desc11(data.createdAt),
      with: {
        fromUser: true,
        user: true
      }
    });
    return res;
  }),
  get: protectedProcedure.input(z12.number()).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.message.findFirst({
      where: eq8(message.id, input)
    });
    return res;
  }),
  markAsViewed: protectedProcedure.input(z12.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({ isViewed: true }).where(eq8(message.id, input));
    return res;
  }),
  markAsRead: protectedProcedure.input(z12.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({ isRead: true }).where(eq8(message.id, input));
    createLog2({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark Message as Read",
      notes: "",
      objectId: input
    });
    return res;
  }),
  markAllAsViewed: protectedProcedure.input(z12.string()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({
      isViewed: true,
      isRead: true
    }).where(eq8(message.userId, input));
    createLog2({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark All Messages as Viewed/Read",
      notes: "",
      objectId: null
    });
    return res;
  }),
  markAsNotified: protectedProcedure.input(z12.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({ isNotified: true }).where(eq8(message.id, input));
    createLog2({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark Message as Notified",
      notes: "",
      objectId: input
    });
    return res;
  }),
  markFromUserAsViewedAndRead: protectedProcedure.input(z12.string()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({
      isViewed: true,
      isRead: true
    }).where(eq8(message.fromUserId, input));
    createLog2({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark Message as Read",
      notes: "",
      objectId: null
    });
    return res;
  }),
  delete: protectedProcedure.input(z12.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({ isDeleted: true }).where(eq8(message.id, input));
    return res;
  }),
  deletePermanently: protectedProcedure.input(z12.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(message).where(eq8(message.id, input));
    return res;
  })
});

// src/server/api/routers/metric.ts
import { eq as eq9 } from "drizzle-orm";
import { z as z13 } from "zod";
var createLog3 = async ({
  user: user2,
  task,
  notes,
  userId,
  objectId
}) => {
  await db.insert(log).values({
    task,
    notes,
    user: user2,
    userId,
    objectId
  });
};
var metricsRouter = createTRPCRouter({
  updateGallery: protectedProcedure.input(
    z13.object({
      image: z13.string(),
      userId: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await db.insert(log).values({
      task: `Update gallery ${input.image}`,
      notes: "",
      user: ctx.session.user.name,
      userId: input.userId,
      objectId: null
    });
    return { res };
  }),
  getUserSkinfolds: protectedProcedure.input(z13.string()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.skinfold.findMany({
      where: eq9(skinfold.userId, input),
      with: {
        bodyFat: true,
        leanMass: true,
        bodyWeight: true
      }
    });
    return res;
  }),
  getAllSkinfolds: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.skinfold.findMany({
      with: {
        bodyFat: true,
        leanMass: true,
        bodyWeight: true,
        user: true
      }
    });
    return res;
  }),
  getSkinfold: protectedProcedure.input(z13.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.skinfold.findFirst({
      where: eq9(skinfold.id, input),
      with: {
        bodyFat: true,
        leanMass: true,
        bodyWeight: true
      }
    });
    return res;
  }),
  deleteSkinfold: protectedProcedure.input(z13.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(skinfold).where(eq9(skinfold.id, input));
    return res;
  }),
  createSkinfold: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      chin: z13.string(),
      cheek: z13.string(),
      lowerAbdominal: z13.string(),
      pectoral: z13.string(),
      biceps: z13.string(),
      triceps: z13.string(),
      subscapular: z13.string(),
      midAxillary: z13.string(),
      suprailiac: z13.string(),
      umbilical: z13.string(),
      lowerBack: z13.string(),
      quadriceps: z13.string(),
      hamstrings: z13.string(),
      medialCalf: z13.string(),
      knee: z13.string(),
      shoulder: z13.string(),
      notes: z13.string(),
      userId: z13.string(),
      bodyWeight: z13.string(),
      leanMass: z13.string(),
      bodyFat: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(skinfold).values({ ...input }).returning({ id: skinfold.id });
    const skinfoldId = res[0]?.id;
    if (!skinfoldId) throw new Error("Skinfold not created");
    await ctx.db.insert(leanMass).values({
      date: input.date,
      userId: input.userId,
      leanMass: input.leanMass,
      skinfoldId
    });
    await ctx.db.insert(bodyFat).values({
      date: input.date,
      userId: input.userId,
      bodyFat: input.bodyFat,
      skinfoldId
    });
    await ctx.db.insert(bodyWeight).values({
      date: input.date,
      userId: input.userId,
      bodyWeight: input.bodyWeight,
      source: "skinfold",
      skinfoldId
    });
    createLog3({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Create Skinfold",
      notes: JSON.stringify(input),
      objectId: res[0]?.id
    });
    return { res };
  })
});

// src/server/api/routers/notification.ts
import { eq as eq10, and as and7 } from "drizzle-orm";
import { z as z14 } from "zod";
var notificationRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z14.object({
      userId: z14.string(),
      code: z14.string(),
      title: z14.string(),
      description: z14.string().optional(),
      notes: z14.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(notification).values({
      userId: input.userId,
      code: input.code,
      title: input.title,
      description: input.description,
      notes: input.notes
    });
    const sub = await ctx.db.query.pushSubscription.findFirst({
      where: eq10(pushSubscription.userId, input.userId)
    });
    if (sub) {
      await sendPushNotification(
        JSON.parse(sub.subscription),
        input.title,
        input.description || "hi"
      );
    }
    return res;
  }),
  get: protectedProcedure.input(z14.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.notification.findFirst({
      where: eq10(notification.id, input)
    });
    return res;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.notification.findMany({
      where: eq10(notification.isRead, false),
      orderBy: (data, { desc: desc11 }) => desc11(data.createdAt)
    });
    return res;
  }),
  getAllUser: protectedProcedure.input(z14.string()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.notification.findMany({
      where: eq10(notification.userId, input),
      orderBy: (data, { desc: desc11 }) => desc11(data.createdAt)
    });
    return res;
  }),
  getAllUserUnread: protectedProcedure.input(z14.string()).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.notification.findMany({
      where: and7(eq10(notification.userId, input), eq10(notification.isRead, false)),
      orderBy: (data, { desc: desc11 }) => desc11(data.createdAt)
    });
    return res;
  }),
  delete: protectedProcedure.input(z14.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(notification).where(eq10(notification.id, input));
    return res;
  }),
  markAsRead: protectedProcedure.input(z14.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(notification).set({
      isRead: true
    }).where(eq10(notification.id, input));
    return res;
  }),
  markAsNotified: protectedProcedure.input(z14.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(notification).set({
      isNotified: true
    }).where(eq10(notification.id, input));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark Notification as Notified",
      notes: JSON.stringify(input),
      objectId: null
    });
    return res;
  }),
  markAllAsViewed: protectedProcedure.input(z14.string()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(notification).set({
      isRead: true,
      isViewed: true
    }).where(eq10(notification.userId, input));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark All Notifications as Viewed",
      notes: JSON.stringify(input),
      objectId: null
    });
    return res;
  }),
  markAsViewed: protectedProcedure.input(z14.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(notification).set({
      isViewed: true,
      isRead: true
    }).where(eq10(notification.id, input));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark Notification as Viewed",
      notes: JSON.stringify(input),
      objectId: null
    });
    return res;
  })
});

// src/server/api/routers/plan.ts
import { desc as desc4, eq as eq11 } from "drizzle-orm";
import { z as z15 } from "zod";
var planRouter = createTRPCRouter({
  getFolders: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.planFolder.findMany({
      orderBy: [desc4(planFolder.createdAt)],
      with: {
        parent: true
      }
    });
    return res;
  }),
  createFolder: protectedProcedure.input(
    z15.object({
      name: z15.string(),
      parentId: z15.number().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(planFolder).values({
      ...input
    }).returning({ id: planFolder.id });
    return { res };
  }),
  deleteFolder: protectedProcedure.input(z15.object({ id: z15.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(planFolder).where(eq11(planFolder.id, input.id));
    return res;
  }),
  getAllName: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.plan.findMany({
      orderBy: [desc4(plan.createdAt)],
      columns: {
        updatedAt: true,
        name: true,
        id: true,
        planCategory: true,
        creatorId: true
      }
    });
    return res;
  }),
  getAllMySimple: protectedProcedure.input(z15.object({ userId: z15.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.plan.findMany({
      orderBy: [desc4(plan.createdAt)],
      where: (plan2, { eq: eq30 }) => eq30(plan2.creatorId, input.userId),
      with: {
        creator: true
      }
    });
    return res;
  }),
  getAllSimple: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.plan.findMany({
      orderBy: [desc4(plan.createdAt)],
      with: {
        creator: true
      }
    });
    return res;
  }),
  getAllMy: protectedProcedure.input(z15.object({ userId: z15.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.plan.findMany({
      orderBy: [desc4(plan.createdAt)],
      where: (plan2, { eq: eq30 }) => eq30(plan2.creatorId, input.userId),
      with: {
        creator: true,
        meals: {
          with: {
            mealToRecipe: {
              with: {
                recipe: {
                  with: {
                    recipeToIngredient: {
                      with: {
                        ingredient: true,
                        alternateIngredient: true
                      }
                    }
                  }
                }
              }
            },
            mealToVegeStack: {
              with: {
                vegeStack: true
              }
            }
          }
        }
      }
    });
    return res;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.plan.findMany({
      orderBy: [desc4(plan.createdAt)],
      with: {
        creator: true,
        meals: {
          with: {
            mealToRecipe: {
              with: {
                recipe: {
                  with: {
                    recipeToIngredient: {
                      with: {
                        ingredient: true,
                        alternateIngredient: true
                      }
                    }
                  }
                }
              }
            },
            mealToVegeStack: {
              with: {
                vegeStack: true
              }
            }
          }
        }
      }
    });
    return res;
  }),
  getSimple: protectedProcedure.input(z15.object({ id: z15.number() })).query(async ({ input, ctx }) => {
    if (input.id === 0) return null;
    const res = await ctx.db.query.plan.findFirst({
      where: (plan2, { eq: eq30 }) => eq30(plan2.id, input.id),
      with: {
        creator: true
      }
    });
    return res;
  }),
  get: protectedProcedure.input(z15.object({ id: z15.number() })).query(async ({ input, ctx }) => {
    if (input.id === 0) return null;
    console.log("input get", input);
    const res = await ctx.db.query.plan.findFirst({
      where: (plan2, { eq: eq30 }) => eq30(plan2.id, input.id),
      with: {
        creator: true,
        meals: {
          with: {
            mealToRecipe: {
              with: {
                recipe: {
                  with: {
                    recipeToIngredient: {
                      with: {
                        alternateIngredient: true,
                        ingredient: true
                      }
                    }
                  }
                }
              }
            },
            mealToVegeStack: {
              with: {
                vegeStack: true
              }
            }
          }
        }
      }
    });
    return res;
  }),
  update: protectedProcedure.input(
    z15.object({
      id: z15.number(),
      name: z15.string(),
      description: z15.string(),
      image: z15.string(),
      notes: z15.string(),
      planCategory: z15.string(),
      numberOfMeals: z15.number(),
      meals: z15.array(
        z15.object({
          mealIndex: z15.number(),
          mealTitle: z15.string(),
          calories: z15.string(),
          vegeCalories: z15.string(),
          vegeNotes: z15.string(),
          vege: z15.string(),
          note: z15.string(),
          recipes: z15.array(
            z15.object({
              recipeId: z15.number(),
              note: z15.string()
            })
          )
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(plan).where(eq11(plan.id, input.id));
    const userId = ctx.session.user.id;
    const { id, meals, ...data } = input;
    const res = await ctx.db.insert(plan).values({
      ...data,
      creatorId: userId
    }).returning({ id: plan.id });
    const resId = res?.[0]?.id;
    if (!resId) return res;
    for (const _m of meals) {
      const { recipes, ...m } = _m;
      const mealRes = await ctx.db.insert(meal).values({
        name: m.mealTitle,
        notes: m.note,
        vegeNotes: m.vegeNotes,
        vege: m.vege,
        vegeCalories: m.vegeCalories,
        planId: resId,
        mealIndex: m.mealIndex,
        calories: m.calories,
        creatorId: userId
      }).returning({ id: meal.id });
      const mealId = mealRes?.[0]?.id || 0;
      const recipeRes = await ctx.db.insert(mealToRecipe).values(
        recipes.map((recipe2, i) => ({
          recipeId: recipe2.recipeId,
          index: i,
          note: recipe2.note,
          mealId
        }))
      ).returning({ id: mealToRecipe.id });
    }
    return { res };
  }),
  saveAsPlan: protectedProcedure.input(
    z15.object({
      name: z15.string(),
      description: z15.string(),
      image: z15.string(),
      notes: z15.string(),
      planCategory: z15.string(),
      numberOfMeals: z15.number(),
      meals: z15.array(
        z15.object({
          mealIndex: z15.number(),
          mealTitle: z15.string(),
          calories: z15.string(),
          vegeCalories: z15.string(),
          vegeNotes: z15.string(),
          vege: z15.string(),
          note: z15.string(),
          recipes: z15.array(
            z15.object({
              id: z15.number(),
              note: z15.string(),
              name: z15.string(),
              calories: z15.string(),
              ingredients: z15.array(
                z15.object({
                  ingredientId: z15.number(),
                  alternateId: z15.number().nullable(),
                  name: z15.string(),
                  serve: z15.string(),
                  serveUnit: z15.string(),
                  note: z15.string()
                })
              )
            })
          )
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { meals, ...data } = input;
    const recipes = meals.map((meal2) => meal2.recipes).flat();
    const recipeIdMap = /* @__PURE__ */ new Map();
    for (const r of recipes) {
      const res2 = await ctx.db.insert(recipe).values({
        name: r.name,
        description: "",
        image: "",
        hiddenAt: /* @__PURE__ */ new Date(),
        notes: r.note,
        recipeCategory: r.id.toString(),
        calories: Number(r.calories),
        creatorId: userId
      }).returning({ id: recipe.id });
      const resId2 = res2?.[0]?.id;
      if (!resId2) return res2;
      recipeIdMap.set(r.id, resId2);
      await ctx.db.insert(recipeToIngredient).values(
        r.ingredients.map((ingredient2, i) => ({
          index: i,
          ingredientId: ingredient2.ingredientId,
          alternateId: ingredient2.alternateId,
          serveSize: ingredient2.serve,
          serveUnit: ingredient2.serveUnit,
          note: ingredient2.note,
          recipeId: resId2
        }))
      );
    }
    const res = await ctx.db.insert(plan).values({
      ...data,
      creatorId: userId
    }).returning({ id: plan.id });
    const resId = res?.[0]?.id;
    if (!resId) return res;
    for (const _m of meals) {
      const { recipes: recipes2, ...m } = _m;
      const mealRes = await ctx.db.insert(meal).values({
        name: m.mealTitle,
        notes: m.note,
        vegeNotes: m.vegeNotes,
        vege: m.vege,
        vegeCalories: m.vegeCalories,
        planId: resId,
        mealIndex: m.mealIndex,
        calories: m.calories,
        creatorId: userId
      }).returning({ id: meal.id });
      const mealId = mealRes?.[0]?.id || 0;
      const recipeRes = await ctx.db.insert(mealToRecipe).values(
        recipes2.map((recipe2, i) => ({
          recipeId: recipeIdMap.get(recipe2.id),
          index: i,
          note: recipe2.note,
          mealId
        }))
      ).returning({ id: mealToRecipe.id });
    }
    return { res };
  }),
  updatePlanCategory: protectedProcedure.input(
    z15.object({
      id: z15.number(),
      planCategory: z15.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(plan).set({
      planCategory: input.planCategory
    }).where(eq11(plan.id, input.id));
    return res;
  }),
  create: protectedProcedure.input(
    z15.object({
      name: z15.string(),
      description: z15.string(),
      image: z15.string(),
      notes: z15.string(),
      planCategory: z15.string(),
      numberOfMeals: z15.number(),
      meals: z15.array(
        z15.object({
          mealIndex: z15.number(),
          mealTitle: z15.string(),
          calories: z15.string(),
          vegeCalories: z15.string(),
          vegeNotes: z15.string(),
          vege: z15.string(),
          note: z15.string(),
          recipes: z15.array(
            z15.object({
              recipeId: z15.number(),
              note: z15.string()
            })
          )
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { meals, ...data } = input;
    const res = await ctx.db.insert(plan).values({
      ...data,
      creatorId: userId
    }).returning({ id: plan.id });
    const resId = res?.[0]?.id;
    if (!resId) return res;
    for (const _m of meals) {
      const { recipes, ...m } = _m;
      const mealRes = await ctx.db.insert(meal).values({
        name: m.mealTitle,
        notes: m.note,
        vegeNotes: m.vegeNotes,
        vege: m.vege,
        vegeCalories: m.vegeCalories,
        planId: resId,
        mealIndex: m.mealIndex,
        calories: m.calories,
        creatorId: userId
      }).returning({ id: meal.id });
      const mealId = mealRes?.[0]?.id || 0;
      const recipeRes = await ctx.db.insert(mealToRecipe).values(
        recipes.map((recipe2, i) => ({
          recipeId: recipe2.recipeId,
          index: i,
          note: recipe2.note,
          mealId
        }))
      ).returning({ id: mealToRecipe.id });
    }
    return { res };
  }),
  delete: protectedProcedure.input(z15.object({ id: z15.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(plan).where(eq11(plan.id, input.id));
    return res;
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(plan);
    return res;
  })
});

// src/server/api/routers/push-subscription.ts
import { eq as eq12 } from "drizzle-orm";
import { z as z16 } from "zod";
var pushSubscriptionRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z16.object({
      userId: z16.string(),
      subscription: z16.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const sub = await ctx.db.query.pushSubscription.findFirst({
      where: eq12(pushSubscription.userId, input.userId)
    });
    if (sub) {
      const res2 = await ctx.db.update(pushSubscription).set({
        subscription: input.subscription
      }).where(eq12(pushSubscription.id, sub.id));
      return res2;
    }
    const res = await ctx.db.insert(pushSubscription).values({
      ...input
    }).returning({ id: pushSubscription.id });
    return res;
  }),
  get: protectedProcedure.input(z16.string()).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.pushSubscription.findFirst({
      where: eq12(pushSubscription.userId, input)
    });
    return res;
  })
});

// src/server/api/routers/recipe.ts
import { TRPCError as TRPCError5 } from "@trpc/server";
import { desc as desc5, eq as eq13, and as and8, isNull } from "drizzle-orm";
import { z as z17 } from "zod";
import { aliasedTable } from "drizzle-orm";
var altIngredient = aliasedTable(ingredient, "alt_ingredient");
var recipeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.recipe.findMany({
      where: (recipe2, { eq: eq30 }) => eq30(recipe2.isUserRecipe, false),
      orderBy: [desc5(recipe.createdAt)],
      with: {
        creator: true,
        recipeToIngredient: {
          with: {
            alternateIngredient: true,
            ingredient: true
          }
        }
      }
    });
    return res;
  }),
  getAllForPlan: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.select({
      // Recipe Fields
      recipe: {
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        image: recipe.image,
        createdAt: recipe.createdAt,
        calories: recipe.calories,
        recipeCategory: recipe.recipeCategory
      },
      // Creator Fields
      creator: {
        id: user.id,
        name: user.name
      },
      // Junction/Ingredient Fields
      recipeToIngredient: {
        id: recipeToIngredient.id,
        serveSize: recipeToIngredient.serveSize,
        serveUnit: recipeToIngredient.serveUnit,
        index: recipeToIngredient.index
      },
      // Ingredient Fields
      ingredient: {
        id: ingredient.id,
        name: ingredient.name,
        caloriesWFibre: ingredient.caloriesWFibre,
        caloriesWOFibre: ingredient.caloriesWOFibre,
        protein: ingredient.protein,
        fatTotal: ingredient.fatTotal,
        totalSugars: ingredient.totalSugars,
        availableCarbohydrateWithSugarAlcohols: ingredient.availableCarbohydrateWithSugarAlcohols,
        hiddenAt: ingredient.hiddenAt,
        serveUnit: ingredient.serveUnit,
        serveSize: ingredient.serveSize
      },
      // Alternate Ingredient Fields (aliased)
      altIngredient: {
        id: altIngredient.id,
        name: altIngredient.name,
        caloriesWFibre: altIngredient.caloriesWFibre,
        caloriesWOFibre: altIngredient.caloriesWOFibre,
        protein: altIngredient.protein,
        fatTotal: altIngredient.fatTotal,
        totalSugars: altIngredient.totalSugars,
        availableCarbohydrateWithSugarAlcohols: altIngredient.availableCarbohydrateWithSugarAlcohols,
        hiddenAt: altIngredient.hiddenAt,
        serveUnit: altIngredient.serveUnit,
        serveSize: altIngredient.serveSize
      }
    }).from(recipe).leftJoin(user, eq13(recipe.creatorId, user.id)).leftJoin(recipeToIngredient, eq13(recipe.id, recipeToIngredient.recipeId)).leftJoin(ingredient, eq13(recipeToIngredient.ingredientId, ingredient.id)).leftJoin(
      altIngredient,
      eq13(recipeToIngredient.alternateId, altIngredient.id)
    ).where(and8(eq13(recipe.isUserRecipe, false), isNull(recipe.hiddenAt))).orderBy(desc5(recipe.createdAt));
    const result2 = rows.reduce((acc, row) => {
      const { recipe: recipe2, creator, recipeToIngredient: recipeToIngredient2, ingredient: ingredient2, altIngredient: altIngredient2 } = row;
      let recipeEntry = acc.find((r) => r.id === recipe2.id);
      if (!recipeEntry) {
        recipeEntry = {
          ...recipe2,
          creator,
          recipeToIngredient: []
        };
        acc.push(recipeEntry);
      }
      if (recipeToIngredient2) {
        recipeEntry.recipeToIngredient.push({
          ...recipeToIngredient2,
          ingredient: ingredient2?.id ? ingredient2 : null,
          alternateIngredient: altIngredient2?.id ? altIngredient2 : null
        });
      }
      return acc;
    }, []);
    return result2;
  }),
  getAllUserCreated: protectedProcedure.input(z17.object({ userId: z17.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.recipe.findMany({
      where: (recipe2, { eq: eq30, and: and15 }) => and15(
        eq30(recipe2.creatorId, input.userId),
        eq30(recipe2.isUserRecipe, true)
      ),
      orderBy: [desc5(recipe.createdAt)],
      with: {
        creator: true,
        recipeToIngredient: {
          with: {
            alternateIngredient: true,
            ingredient: {
              with: {
                ingredientToGroceryStore: {
                  with: {
                    groceryStore: true
                  }
                }
              }
            }
          }
        }
      }
    });
    return res;
  }),
  get: protectedProcedure.input(z17.object({ id: z17.number() })).query(async ({ input, ctx }) => {
    if (input.id === 0) throw new TRPCError5({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.recipe.findFirst({
      where: (recipe2, { eq: eq30 }) => eq30(recipe2.id, input.id),
      with: {
        creator: true,
        recipeToIngredient: {
          with: {
            ingredient: true,
            alternateIngredient: true
          }
        }
      }
    });
    return res;
  }),
  update: protectedProcedure.input(
    z17.object({
      id: z17.number(),
      name: z17.string(),
      description: z17.string(),
      image: z17.string(),
      notes: z17.string(),
      recipeCategory: z17.string(),
      calories: z17.number(),
      isUserRecipe: z17.boolean().optional(),
      ingredients: z17.array(
        z17.object({
          ingredientId: z17.number(),
          alternateId: z17.string(),
          note: z17.string(),
          serveSize: z17.string(),
          serveUnit: z17.string(),
          index: z17.number(),
          isAlternate: z17.boolean().optional()
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { ingredients, ...data } = input;
    const res = await ctx.db.update(recipe).set(data).where(eq13(recipe.id, input.id)).returning({ id: recipe.id });
    const resId = res?.[0]?.id;
    if (!resId) return res;
    await ctx.db.delete(recipeToIngredient).where(eq13(recipeToIngredient.recipeId, resId));
    const ingredientsRes = await ctx.db.insert(recipeToIngredient).values(
      ingredients.map((ingredient2) => ({
        index: ingredient2.index,
        ingredientId: ingredient2.ingredientId,
        isAlternate: ingredient2.isAlternate,
        alternateId: ingredient2.alternateId === "" ? null : Number(ingredient2.alternateId),
        serveSize: ingredient2.serveSize,
        serveUnit: ingredient2.serveUnit,
        note: ingredient2.note,
        recipeId: resId
      }))
    ).returning({ id: recipeToIngredient.id });
    return { res, ingredientsRes };
  }),
  duplicate: protectedProcedure.input(z17.object({ id: z17.number() })).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const recipeRes = await ctx.db.query.recipe.findFirst({
      where: eq13(recipe.id, input.id),
      with: {
        recipeToIngredient: {}
      }
    });
    if (!recipeRes) return;
    const {
      recipeToIngredient: ingredients,
      id,
      createdAt,
      updatedAt,
      ...data
    } = recipeRes;
    const res = await ctx.db.insert(recipe).values({
      ...data,
      name: `${data.name}-copy`,
      creatorId: userId
    }).returning({ id: recipe.id });
    const resId = res?.[0]?.id;
    if (!resId) return res;
    const ingredientsRes = await ctx.db.insert(recipeToIngredient).values(
      ingredients.map((ingredient2) => ({
        index: ingredient2.index,
        ingredientId: ingredient2.ingredientId,
        alternateId: ingredient2.alternateId,
        serveSize: ingredient2.serveSize,
        serveUnit: ingredient2.serveUnit,
        note: ingredient2.note,
        recipeId: resId
      }))
    ).returning({ id: recipeToIngredient.id });
    return { res, ingredientsRes };
  }),
  create: protectedProcedure.input(
    z17.object({
      name: z17.string(),
      description: z17.string(),
      image: z17.string(),
      notes: z17.string(),
      recipeCategory: z17.string(),
      calories: z17.number(),
      isUserRecipe: z17.boolean().optional(),
      ingredients: z17.array(
        z17.object({
          ingredientId: z17.number(),
          alternateId: z17.string(),
          note: z17.string(),
          serveSize: z17.string(),
          serveUnit: z17.string(),
          index: z17.number()
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { ingredients, ...data } = input;
    const res = await ctx.db.insert(recipe).values({
      ...data,
      creatorId: userId
    }).returning({ id: recipe.id });
    const resId = res?.[0]?.id;
    if (!resId) return res;
    const ingredientsRes = await ctx.db.insert(recipeToIngredient).values(
      ingredients.map((ingredient2) => ({
        index: ingredient2.index,
        ingredientId: ingredient2.ingredientId,
        alternateId: ingredient2.alternateId === "" ? null : Number(ingredient2.alternateId),
        serveSize: ingredient2.serveSize,
        serveUnit: ingredient2.serveUnit,
        note: ingredient2.note,
        recipeId: resId
      }))
    ).returning({ id: recipeToIngredient.id });
    return { res, ingredientsRes };
  }),
  delete: protectedProcedure.input(z17.object({ id: z17.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(recipe).where(eq13(recipe.id, input.id));
    return res;
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(recipe);
    return res;
  })
});

// src/server/api/routers/settings.ts
import { z as z18 } from "zod";
var settingsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ input, ctx }) => {
    const res = await ctx.db.query.settings.findFirst();
    return res;
  }),
  updateCalories: protectedProcedure.input(z18.boolean()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(settings).set({
      isCaloriesWithFibre: input
    });
    return res;
  })
});

// src/lib/shopping-list.ts
import { z as z19 } from "zod";
var shoppingListRecipeItemInputSchema = z19.object({
  ingredientId: z19.number(),
  name: z19.string(),
  amount: z19.number(),
  unit: z19.string(),
  source: z19.string().nullable().optional(),
  note: z19.string().nullable().optional()
});
var toShoppingAmountNumber = (amount) => {
  const parsedAmount = typeof amount === "number" ? amount : Number.parseFloat(amount ?? "0");
  if (!Number.isFinite(parsedAmount)) return 0;
  return parsedAmount;
};
var formatShoppingUnit = (unit) => {
  if (unit === "each") return "ea";
  if (unit === "grams") return "g";
  return unit;
};
var formatShoppingAmount = (amount) => {
  const numericAmount = toShoppingAmountNumber(amount);
  if (Number.isInteger(numericAmount)) return numericAmount.toString();
  return numericAmount.toFixed(numericAmount >= 10 ? 1 : 2).replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
};
var formatShoppingQuantity = (amount, unit) => `${formatShoppingAmount(amount)} ${formatShoppingUnit(unit ?? "")}`.trim();

// src/server/api/utils/send-shopping-list-email.ts
var escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
var formatTextList = (value, separator = ", ") => (value ?? "").split("\n").map((entry) => entry.trim()).filter(Boolean).join(separator);
var renderItemText = (shoppingList2) => shoppingList2.items.map((item) => {
  const source = formatTextList(item.source);
  const note = formatTextList(item.note);
  const meta = [source, note].filter(Boolean).join(" | ");
  return `${item.isChecked ? "[x]" : "[ ]"} ${formatShoppingQuantity(item.amount, item.unit)} ${item.name}${meta ? ` - ${meta}` : ""}`;
}).join("\n");
var renderItemRows = (shoppingList2, checked) => shoppingList2.items.filter((item) => item.isChecked === checked).map((item) => {
  const source = formatTextList(item.source);
  const note = formatTextList(item.note, " \u2022 ");
  return `
				<tr>
					<td style="padding:14px 16px;border-bottom:1px solid #e5e7eb;vertical-align:top;">
						<div style="font-size:16px;font-weight:600;color:#111827;">
							${escapeHtml(formatShoppingQuantity(item.amount, item.unit))} ${escapeHtml(item.name)}
						</div>
						${source ? `<div style="margin-top:4px;color:#6b7280;font-size:13px;">From ${escapeHtml(source)}</div>` : ""}
						${note ? `<div style="margin-top:4px;color:#6b7280;font-size:12px;">${escapeHtml(note)}</div>` : ""}
					</td>
				</tr>
			`;
}).join("");
var buildShoppingListEmailHtml = ({
  recipientName,
  shoppingList: shoppingList2
}) => {
  const remainingItems = shoppingList2.items.filter((item) => !item.isChecked);
  const checkedItems = shoppingList2.items.filter((item) => item.isChecked);
  const headingName = recipientName?.trim() || "there";
  const updatedAt = shoppingList2.updatedAt.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  return `
		<div style="margin:0;padding:32px 16px;background:#f3f4f6;font-family:Arial,sans-serif;color:#111827;">
			<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e5e7eb;">
				<div style="padding:32px;background:linear-gradient(135deg,#111827 0%,#1f2937 100%);color:#ffffff;">
					<div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.72;">CE Nutrition</div>
					<h1 style="margin:12px 0 8px;font-size:30px;line-height:1.1;">${escapeHtml(shoppingList2.name)}</h1>
					<p style="margin:0;font-size:15px;line-height:1.6;opacity:0.88;">
						Hi ${escapeHtml(headingName)}, here is your latest shopping list snapshot from ${escapeHtml(updatedAt)}.
					</p>
				</div>
				<div style="padding:24px;">
					<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px;">
						<div style="min-width:180px;padding:16px;border-radius:16px;background:#eff6ff;border:1px solid #bfdbfe;">
							<div style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#1d4ed8;">Need to buy</div>
							<div style="margin-top:8px;font-size:28px;font-weight:700;color:#111827;">${remainingItems.length}</div>
						</div>
						<div style="min-width:180px;padding:16px;border-radius:16px;background:#f9fafb;border:1px solid #e5e7eb;">
							<div style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;">Checked off</div>
							<div style="margin-top:8px;font-size:28px;font-weight:700;color:#111827;">${checkedItems.length}</div>
						</div>
					</div>
					<div style="margin-bottom:24px;">
						<h2 style="margin:0 0 12px;font-size:18px;color:#111827;">Still to buy</h2>
						<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
							<tbody>
								${remainingItems.length > 0 ? renderItemRows(shoppingList2, false) : '<tr><td style="padding:16px;color:#6b7280;">Everything on your list is checked off.</td></tr>'}
							</tbody>
						</table>
					</div>
					${checkedItems.length > 0 ? `
									<div>
										<h2 style="margin:0 0 12px;font-size:18px;color:#111827;">Checked off</h2>
										<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:18px;overflow:hidden;">
											<tbody>
												${renderItemRows(shoppingList2, true)}
											</tbody>
										</table>
									</div>
								` : ""}
				</div>
			</div>
		</div>
	`;
};
var buildShoppingListEmailText = ({
  recipientName,
  shoppingList: shoppingList2
}) => {
  const name = recipientName?.trim() || "there";
  return [
    `Hi ${name},`,
    "",
    `Here is your current shopping list: ${shoppingList2.name}.`,
    "",
    renderItemText(shoppingList2)
  ].join("\n");
};
var sendShoppingListEmail = async ({
  recipientEmail,
  recipientName,
  shoppingList: shoppingList2
}) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.EMAIL_SERVER_PASSWORD}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [recipientEmail],
      subject: shoppingList2.name,
      html: buildShoppingListEmailHtml({
        recipientName,
        shoppingList: shoppingList2
      }),
      text: buildShoppingListEmailText({
        recipientName,
        shoppingList: shoppingList2
      })
    })
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error?.message ?? "Failed to send shopping list");
  }
  return payload;
};

// src/server/api/routers/shopping-list.ts
import { TRPCError as TRPCError6 } from "@trpc/server";
import { and as and9, asc as asc2, desc as desc6, eq as eq14 } from "drizzle-orm";
import { z as z20 } from "zod";
var createShoppingListName = () => `Shopping List ${new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric"
}).format(/* @__PURE__ */ new Date())}`;
var createSharedShoppingListName = (names) => {
  const label = names.map((name) => name?.trim()).filter((name) => Boolean(name)).join(" & ");
  return label ? `Shared Shopping List ${new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(/* @__PURE__ */ new Date())} - ${label}` : `Shared ${createShoppingListName()}`;
};
var normalizeShoppingText = (value) => value?.trim().toLowerCase() ?? "";
var mergeTextList = (...values) => {
  const mergedValues = Array.from(
    new Set(
      values.flatMap((value) => value?.split("\n") ?? []).map((value) => value.trim()).filter(Boolean)
    )
  );
  return mergedValues.length > 0 ? mergedValues.join("\n") : null;
};
var getItemMergeKey = ({
  ingredientId,
  name,
  unit
}) => `${ingredientId ?? `manual:${normalizeShoppingText(name)}`}:${normalizeShoppingText(unit)}`;
var mergeShoppingItems = (items) => {
  const mergedItems = /* @__PURE__ */ new Map();
  for (const item of items) {
    const key = getItemMergeKey({
      ingredientId: item.ingredientId,
      name: item.name,
      unit: item.unit
    });
    const existingItem = mergedItems.get(key);
    if (!existingItem) {
      mergedItems.set(key, {
        ingredientId: item.ingredientId,
        name: item.name.trim() || "Ingredient",
        amount: formatShoppingAmount(item.amount),
        amountNumber: toShoppingAmountNumber(item.amount),
        unit: item.unit?.trim() ?? "",
        source: item.source ?? null,
        note: item.note ?? null
      });
      continue;
    }
    existingItem.amountNumber += toShoppingAmountNumber(item.amount);
    existingItem.amount = formatShoppingAmount(existingItem.amountNumber);
    existingItem.source = mergeTextList(existingItem.source, item.source);
    existingItem.note = mergeTextList(existingItem.note, item.note);
  }
  return Array.from(mergedItems.values()).map(
    ({ amountNumber: _amountNumber, ...item }) => ({
      ...item
    })
  );
};
var assertAuthenticated = (ctx) => {
  const sessionUser = ctx.session?.user;
  if (!sessionUser) {
    throw new TRPCError6({
      code: "UNAUTHORIZED",
      message: "You must be signed in to manage shopping lists"
    });
  }
  return sessionUser;
};
var assertUserAccess = async (ctx, userId) => {
  const sessionUser = assertAuthenticated(ctx);
  const targetUser = await ctx.db.query.user.findFirst({
    where: eq14(user.id, userId),
    columns: {
      id: true,
      name: true,
      email: true,
      partnerId: true
    },
    with: {
      partner: {
        columns: {
          id: true,
          name: true,
          email: true
        }
      },
      trainers: {
        columns: {
          trainerId: true
        }
      }
    }
  });
  if (!targetUser) {
    throw new TRPCError6({
      code: "NOT_FOUND",
      message: "User not found"
    });
  }
  const canAccessUser = targetUser.id === sessionUser.id || sessionUser.isAdmin || targetUser.trainers.some((trainer) => {
    return trainer.trainerId === sessionUser.id;
  });
  if (!canAccessUser) {
    throw new TRPCError6({
      code: "FORBIDDEN",
      message: "You do not have access to this shopping list"
    });
  }
  return targetUser;
};
var ensureActiveShoppingList = async (ctx, userId) => {
  let activeList = await getActiveShoppingList(ctx, userId);
  if (activeList) return activeList;
  const activeListId = await createActiveShoppingList({
    ctx,
    userId
  });
  activeList = await getShoppingListWithItems(ctx, activeListId);
  if (!activeList) {
    throw new TRPCError6({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to access active shopping list"
    });
  }
  return activeList;
};
var getShoppingListWithItems = async (ctx, listId) => {
  return await ctx.db.query.shoppingList.findFirst({
    where: eq14(shoppingList.id, listId),
    with: {
      items: {
        orderBy: [
          asc2(shoppingListItem.isChecked),
          asc2(shoppingListItem.name)
        ]
      }
    }
  }) ?? null;
};
var getActiveShoppingList = async (ctx, userId) => {
  return await ctx.db.query.shoppingList.findFirst({
    where: and9(
      eq14(shoppingList.userId, userId),
      eq14(shoppingList.isActive, true)
    ),
    with: {
      items: {
        orderBy: [
          asc2(shoppingListItem.isChecked),
          asc2(shoppingListItem.name)
        ]
      }
    },
    orderBy: [desc6(shoppingList.updatedAt), desc6(shoppingList.createdAt)]
  }) ?? null;
};
var createActiveShoppingList = async ({
  ctx,
  userId,
  name = createShoppingListName()
}) => {
  const sessionUser = assertAuthenticated(ctx);
  await ctx.db.update(shoppingList).set({
    isActive: false,
    archivedAt: /* @__PURE__ */ new Date()
  }).where(
    and9(eq14(shoppingList.userId, userId), eq14(shoppingList.isActive, true))
  );
  const createdLists = await ctx.db.insert(shoppingList).values({
    userId,
    creatorId: sessionUser.id,
    name,
    isActive: true,
    archivedAt: null
  }).returning({ id: shoppingList.id });
  const createdListId = createdLists[0]?.id;
  if (!createdListId) {
    throw new TRPCError6({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to create shopping list"
    });
  }
  return createdListId;
};
var getListItemWithAccess = async (ctx, itemId) => {
  const item = await ctx.db.query.shoppingListItem.findFirst({
    where: eq14(shoppingListItem.id, itemId),
    with: {
      shoppingList: true
    }
  });
  if (!item) {
    throw new TRPCError6({
      code: "NOT_FOUND",
      message: "Shopping list item not found"
    });
  }
  await assertUserAccess(ctx, item.shoppingList.userId);
  return item;
};
var touchShoppingList = async (ctx, listId) => {
  await ctx.db.update(shoppingList).set({
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq14(shoppingList.id, listId));
};
var shoppingListRouter = createTRPCRouter({
  getAllForUser: protectedProcedure.input(z20.object({ userId: z20.string() })).query(async ({ ctx, input }) => {
    await assertUserAccess(ctx, input.userId);
    return ctx.db.query.shoppingList.findMany({
      where: eq14(shoppingList.userId, input.userId),
      with: {
        items: {
          orderBy: [
            asc2(shoppingListItem.isChecked),
            asc2(shoppingListItem.name)
          ]
        }
      },
      orderBy: [
        desc6(shoppingList.isActive),
        desc6(shoppingList.updatedAt),
        desc6(shoppingList.createdAt)
      ]
    });
  }),
  getActive: protectedProcedure.input(z20.object({ userId: z20.string() })).query(async ({ ctx, input }) => {
    await assertUserAccess(ctx, input.userId);
    return getActiveShoppingList(ctx, input.userId);
  }),
  addRecipe: protectedProcedure.input(
    z20.object({
      userId: z20.string(),
      items: z20.array(shoppingListRecipeItemInputSchema).min(1)
    })
  ).mutation(async ({ ctx, input }) => {
    await assertUserAccess(ctx, input.userId);
    const activeList = await ensureActiveShoppingList(ctx, input.userId);
    const existingItemsByKey = new Map(
      activeList.items.map((item) => [
        getItemMergeKey({
          ingredientId: item.ingredientId,
          name: item.name,
          unit: item.unit
        }),
        item
      ])
    );
    const itemsToInsert = [];
    for (const incomingItem of input.items) {
      const key = getItemMergeKey({
        ingredientId: incomingItem.ingredientId,
        name: incomingItem.name,
        unit: incomingItem.unit
      });
      const existingItem = existingItemsByKey.get(key);
      if (!existingItem) {
        itemsToInsert.push({
          shoppingListId: activeList.id,
          ingredientId: incomingItem.ingredientId,
          name: incomingItem.name,
          amount: formatShoppingAmount(incomingItem.amount),
          unit: incomingItem.unit,
          source: incomingItem.source ?? null,
          note: incomingItem.note ?? null
        });
        continue;
      }
      await ctx.db.update(shoppingListItem).set({
        amount: formatShoppingAmount(
          toShoppingAmountNumber(existingItem.amount) + incomingItem.amount
        ),
        isChecked: false,
        source: mergeTextList(existingItem.source, incomingItem.source),
        note: mergeTextList(existingItem.note, incomingItem.note)
      }).where(eq14(shoppingListItem.id, existingItem.id));
    }
    if (itemsToInsert.length > 0) {
      await ctx.db.insert(shoppingListItem).values(itemsToInsert);
    }
    await touchShoppingList(ctx, activeList.id);
    return getShoppingListWithItems(ctx, activeList.id);
  }),
  addCustomItem: protectedProcedure.input(
    z20.object({
      userId: z20.string(),
      name: z20.string().trim().min(1),
      amount: z20.number().positive(),
      unit: z20.string().trim().max(40).optional().default("")
    })
  ).mutation(async ({ ctx, input }) => {
    await assertUserAccess(ctx, input.userId);
    const activeList = await ensureActiveShoppingList(ctx, input.userId);
    const itemKey = getItemMergeKey({
      ingredientId: null,
      name: input.name,
      unit: input.unit
    });
    const existingItem = activeList.items.find(
      (item) => getItemMergeKey({
        ingredientId: item.ingredientId,
        name: item.name,
        unit: item.unit
      }) === itemKey
    );
    if (existingItem) {
      await ctx.db.update(shoppingListItem).set({
        amount: formatShoppingAmount(
          toShoppingAmountNumber(existingItem.amount) + input.amount
        ),
        isChecked: false
      }).where(eq14(shoppingListItem.id, existingItem.id));
    } else {
      await ctx.db.insert(shoppingListItem).values({
        shoppingListId: activeList.id,
        ingredientId: null,
        name: input.name.trim(),
        amount: formatShoppingAmount(input.amount),
        unit: input.unit.trim(),
        source: null,
        note: null
      });
    }
    await touchShoppingList(ctx, activeList.id);
    return getShoppingListWithItems(ctx, activeList.id);
  }),
  mergeWithPartner: protectedProcedure.input(z20.object({ userId: z20.string() })).mutation(async ({ ctx, input }) => {
    const targetUser = await assertUserAccess(ctx, input.userId);
    const partnerUser = targetUser.partner;
    if (!partnerUser) {
      throw new TRPCError6({
        code: "BAD_REQUEST",
        message: "This user does not have a linked partner"
      });
    }
    const [activeList, partnerActiveList] = await Promise.all([
      getActiveShoppingList(ctx, targetUser.id),
      getActiveShoppingList(ctx, partnerUser.id)
    ]);
    const mergedItems = mergeShoppingItems([
      ...activeList?.items.filter((item) => !item.isChecked).map((item) => ({
        ingredientId: item.ingredientId,
        name: item.name,
        amount: item.amount,
        unit: item.unit,
        source: item.source,
        note: item.note
      })) ?? [],
      ...partnerActiveList?.items.filter((item) => !item.isChecked).map((item) => ({
        ingredientId: item.ingredientId,
        name: item.name,
        amount: item.amount,
        unit: item.unit,
        source: item.source,
        note: item.note
      })) ?? []
    ]);
    if (mergedItems.length === 0) {
      throw new TRPCError6({
        code: "BAD_REQUEST",
        message: "There are no active shopping list items to merge"
      });
    }
    const listName = createSharedShoppingListName([
      targetUser.name,
      partnerUser.name
    ]);
    const [userListId, partnerListId] = await Promise.all([
      createActiveShoppingList({
        ctx,
        userId: targetUser.id,
        name: listName
      }),
      createActiveShoppingList({
        ctx,
        userId: partnerUser.id,
        name: listName
      })
    ]);
    await ctx.db.insert(shoppingListItem).values(
      mergedItems.flatMap((item) => [
        {
          shoppingListId: userListId,
          ingredientId: item.ingredientId,
          name: item.name,
          amount: item.amount,
          unit: item.unit,
          isChecked: false,
          source: item.source,
          note: item.note
        },
        {
          shoppingListId: partnerListId,
          ingredientId: item.ingredientId,
          name: item.name,
          amount: item.amount,
          unit: item.unit,
          isChecked: false,
          source: item.source,
          note: item.note
        }
      ])
    );
    return {
      success: true,
      partnerUserId: partnerUser.id
    };
  }),
  setItemChecked: protectedProcedure.input(
    z20.object({
      itemId: z20.number(),
      checked: z20.boolean()
    })
  ).mutation(async ({ ctx, input }) => {
    const item = await getListItemWithAccess(ctx, input.itemId);
    await ctx.db.update(shoppingListItem).set({
      isChecked: input.checked
    }).where(eq14(shoppingListItem.id, item.id));
    await touchShoppingList(ctx, item.shoppingList.id);
    return true;
  }),
  updateItemAmount: protectedProcedure.input(
    z20.object({
      itemId: z20.number(),
      amount: z20.number().positive()
    })
  ).mutation(async ({ ctx, input }) => {
    const item = await getListItemWithAccess(ctx, input.itemId);
    await ctx.db.update(shoppingListItem).set({
      amount: formatShoppingAmount(input.amount),
      isChecked: false
    }).where(eq14(shoppingListItem.id, item.id));
    await touchShoppingList(ctx, item.shoppingList.id);
    return true;
  }),
  deleteItem: protectedProcedure.input(z20.object({ itemId: z20.number() })).mutation(async ({ ctx, input }) => {
    const item = await getListItemWithAccess(ctx, input.itemId);
    await ctx.db.delete(shoppingListItem).where(eq14(shoppingListItem.id, item.id));
    await touchShoppingList(ctx, item.shoppingList.id);
    return true;
  }),
  deleteList: protectedProcedure.input(z20.object({ listId: z20.number() })).mutation(async ({ ctx, input }) => {
    const list = await getShoppingListWithItems(ctx, input.listId);
    if (!list) {
      throw new TRPCError6({
        code: "NOT_FOUND",
        message: "Shopping list not found"
      });
    }
    await assertUserAccess(ctx, list.userId);
    await ctx.db.delete(shoppingList).where(eq14(shoppingList.id, list.id));
    return true;
  }),
  createNew: protectedProcedure.input(z20.object({ userId: z20.string() })).mutation(async ({ ctx, input }) => {
    await assertUserAccess(ctx, input.userId);
    const newListId = await createActiveShoppingList({
      ctx,
      userId: input.userId
    });
    return getShoppingListWithItems(ctx, newListId);
  }),
  duplicate: protectedProcedure.input(z20.object({ listId: z20.number() })).mutation(async ({ ctx, input }) => {
    const sourceList = await getShoppingListWithItems(ctx, input.listId);
    if (!sourceList) {
      throw new TRPCError6({
        code: "NOT_FOUND",
        message: "Shopping list not found"
      });
    }
    await assertUserAccess(ctx, sourceList.userId);
    const duplicatedListId = await createActiveShoppingList({
      ctx,
      userId: sourceList.userId,
      name: `${sourceList.name} copy`
    });
    if (sourceList.items.length > 0) {
      await ctx.db.insert(shoppingListItem).values(
        sourceList.items.map((item) => ({
          shoppingListId: duplicatedListId,
          ingredientId: item.ingredientId,
          name: item.name,
          amount: item.amount,
          unit: item.unit,
          isChecked: false,
          source: item.source,
          note: item.note
        }))
      );
    }
    return getShoppingListWithItems(ctx, duplicatedListId);
  }),
  email: protectedProcedure.input(z20.object({ listId: z20.number() })).mutation(async ({ ctx, input }) => {
    const list = await getShoppingListWithItems(ctx, input.listId);
    if (!list) {
      throw new TRPCError6({
        code: "NOT_FOUND",
        message: "Shopping list not found"
      });
    }
    const targetUser = await assertUserAccess(ctx, list.userId);
    if (!targetUser.email) {
      throw new TRPCError6({
        code: "BAD_REQUEST",
        message: "This user does not have an email address"
      });
    }
    if (list.items.length === 0) {
      throw new TRPCError6({
        code: "BAD_REQUEST",
        message: "There are no shopping list items to email"
      });
    }
    await sendShoppingListEmail({
      recipientEmail: targetUser.email,
      recipientName: targetUser.name,
      shoppingList: {
        name: list.name,
        updatedAt: list.updatedAt ?? list.createdAt,
        items: list.items.map((item) => ({
          name: item.name,
          amount: item.amount,
          unit: item.unit,
          isChecked: item.isChecked,
          source: item.source,
          note: item.note
        }))
      }
    });
    await ctx.db.update(shoppingList).set({
      updatedAt: /* @__PURE__ */ new Date(),
      emailedAt: /* @__PURE__ */ new Date()
    }).where(eq14(shoppingList.id, list.id));
    return { success: true };
  })
});

// src/server/api/schema/store.ts
import { z as z21 } from "zod";
var createStoreSchema = z21.object({
  name: z21.string().min(1),
  location: z21.string()
});

// src/server/api/routers/store.ts
import { eq as eq15 } from "drizzle-orm";
import { z as z22 } from "zod";
var groceryStoreRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.groceryStore.findMany();
    return res;
  }),
  get: protectedProcedure.input(z22.object({ id: z22.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.groceryStore.findFirst({
      where: (store, { eq: eq30 }) => eq30(store.id, input.id)
    });
    return res;
  }),
  create: protectedProcedure.input(createStoreSchema).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(groceryStore).values({
      ...input
    });
    return res;
  }),
  delete: protectedProcedure.input(z22.object({ id: z22.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(groceryStore).where(eq15(groceryStore.id, input.id));
    return res;
  })
});

// src/server/api/routers/supplements.ts
import { TRPCError as TRPCError7 } from "@trpc/server";
import { and as and10, asc as asc3, eq as eq16 } from "drizzle-orm";
import { z as z24 } from "zod";

// src/components/supplements/store.ts
import { z as z23 } from "zod";
var templateSchema = z23.object({
  name: z23.string().min(1),
  time: z23.string()
});
var applyTemplateSchema = z23.object({
  templateId: z23.number(),
  userId: z23.string(),
  time: z23.string().optional()
});
var updateSchema = z23.object({
  id: z23.number(),
  isPrivate: z23.boolean(),
  viewableBy: z23.string(),
  name: z23.string().min(1),
  serveSize: z23.number(),
  serveUnit: z23.string().min(1),
  caloriesWFibre: z23.number(),
  caloriesWOFibre: z23.number(),
  protein: z23.number(),
  fatTotal: z23.number(),
  totalDietaryFibre: z23.number(),
  totalSugars: z23.number(),
  starch: z23.number(),
  resistantStarch: z23.number(),
  availableCarbohydrateWithoutSugarAlcohols: z23.number(),
  availableCarbohydrateWithSugarAlcohols: z23.number(),
  addedSugars: z23.number(),
  freeSugars: z23.number(),
  moisture: z23.number(),
  nitrogen: z23.number(),
  alcohol: z23.number(),
  fructose: z23.number(),
  glucose: z23.number(),
  sucrose: z23.number(),
  maltose: z23.number(),
  lactose: z23.number(),
  galactose: z23.number(),
  maltotrios: z23.number(),
  ash: z23.number(),
  dextrin: z23.number(),
  glycerol: z23.number(),
  glycogen: z23.number(),
  inulin: z23.number(),
  erythritol: z23.number(),
  maltitol: z23.number(),
  mannitol: z23.number(),
  xylitol: z23.number(),
  maltodextrin: z23.number(),
  oligosaccharides: z23.number(),
  polydextrose: z23.number(),
  raffinose: z23.number(),
  stachyose: z23.number(),
  sorbitol: z23.number(),
  aceticAcid: z23.number(),
  citricAcid: z23.number(),
  fumaricAcid: z23.number(),
  lacticAcid: z23.number(),
  malicAcid: z23.number(),
  oxalicAcid: z23.number(),
  propionicAcid: z23.number(),
  quinicAcid: z23.number(),
  shikimicAcid: z23.number(),
  succinicAcid: z23.number(),
  tartaricAcid: z23.number(),
  aluminium: z23.number(),
  antimony: z23.number(),
  arsenic: z23.number(),
  cadmium: z23.number(),
  calcium: z23.number(),
  chromium: z23.number(),
  chloride: z23.number(),
  cobalt: z23.number(),
  copper: z23.number(),
  fluoride: z23.number(),
  iodine: z23.number(),
  iron: z23.number(),
  lead: z23.number(),
  magnesium: z23.number(),
  manganese: z23.number(),
  mercury: z23.number(),
  molybdenum: z23.number(),
  nickel: z23.number(),
  phosphorus: z23.number(),
  potassium: z23.number(),
  selenium: z23.number(),
  sodium: z23.number(),
  sulphur: z23.number(),
  tin: z23.number(),
  zinc: z23.number(),
  retinol: z23.number(),
  alphaCarotene: z23.number(),
  betaCarotene: z23.number(),
  cryptoxanthin: z23.number(),
  betaCaroteneEquivalents: z23.number(),
  vitaminARetinolEquivalents: z23.number(),
  lutein: z23.number(),
  lycopene: z23.number(),
  xanthophyl: z23.number(),
  thiamin: z23.number(),
  riboflavin: z23.number(),
  niacin: z23.number(),
  niacinDerivedFromTryptophan: z23.number(),
  niacinDerivedEquivalents: z23.number(),
  pantothenicAcid: z23.number(),
  pyridoxine: z23.number(),
  biotin: z23.number(),
  cobalamin: z23.number(),
  folateNatural: z23.number(),
  folicAcid: z23.number(),
  totalFolates: z23.number(),
  dietaryFolateEquivalents: z23.number(),
  vitaminC: z23.number(),
  cholecalciferol: z23.number(),
  ergocalciferol: z23.number(),
  hydroxyCholecalciferol: z23.number(),
  hydroxyErgocalciferol: z23.number(),
  vitaminDEquivalents: z23.number(),
  alphaTocopherol: z23.number(),
  alphaTocotrienol: z23.number(),
  betaTocopherol: z23.number(),
  betaTocotrienol: z23.number(),
  deltaTocopherol: z23.number(),
  deltaTocotrienol: z23.number(),
  gammaTocopherol: z23.number(),
  gammaTocotrienol: z23.number(),
  vitaminE: z23.number(),
  totalSaturatedFattyAcids: z23.number(),
  totalMonounsaturatedFattyAcids: z23.number(),
  totalPolyunsaturatedFattyAcids: z23.number(),
  totalLongChainOmega3FattyAcids: z23.number(),
  totalTransFattyAcids: z23.number(),
  caffeine: z23.number(),
  cholesterol: z23.number(),
  alanine: z23.number(),
  arginine: z23.number(),
  asparticAcid: z23.number(),
  cystinePlusCysteine: z23.number(),
  glutamicAcid: z23.number(),
  glycine: z23.number(),
  histidine: z23.number(),
  isoleucine: z23.number(),
  leucine: z23.number(),
  lysine: z23.number(),
  methionine: z23.number(),
  phenylalanine: z23.number(),
  proline: z23.number(),
  serine: z23.number(),
  threonine: z23.number(),
  tyrosine: z23.number(),
  tryptophan: z23.number(),
  valine: z23.number(),
  c4: z23.number(),
  c6: z23.number(),
  c8: z23.number(),
  c10: z23.number(),
  c11: z23.number(),
  c12: z23.number(),
  c13: z23.number(),
  c14: z23.number(),
  c15: z23.number(),
  c16: z23.number(),
  c17: z23.number(),
  c18: z23.number(),
  c19: z23.number(),
  c20: z23.number(),
  c21: z23.number(),
  c22: z23.number(),
  c23: z23.number(),
  c24: z23.number(),
  totalSaturatedFattyAcidsEquated: z23.number(),
  c10_1: z23.number(),
  c12_1: z23.number(),
  c14_1: z23.number(),
  c15_1: z23.number(),
  c16_1: z23.number(),
  c17_1: z23.number(),
  c18_1: z23.number(),
  c18_1w5: z23.number(),
  c18_1w6: z23.number(),
  c18_1w7: z23.number(),
  c18_1w9: z23.number(),
  c20_1: z23.number(),
  c20_1w9: z23.number(),
  c20_1w13: z23.number(),
  c20_1w11: z23.number(),
  c22_1: z23.number(),
  c22_1w9: z23.number(),
  c22_1w11: z23.number(),
  c24_1: z23.number(),
  c24_1w9: z23.number(),
  c24_1w11: z23.number(),
  c24_1w13: z23.number(),
  totalMonounsaturatedFattyAcidsEquated: z23.number(),
  c12_2: z23.number(),
  c16_2w4: z23.number(),
  c16_3: z23.number(),
  c18_2w6: z23.number(),
  c18_3w3: z23.number(),
  c18_3w4: z23.number(),
  c18_3w6: z23.number(),
  c18_4w1: z23.number(),
  c18_4w3: z23.number(),
  c20_2: z23.number(),
  c20_2w6: z23.number(),
  c20_3: z23.number(),
  c20_3w3: z23.number(),
  c20_3w6: z23.number(),
  c20_4: z23.number(),
  c20_4w3: z23.number(),
  c20_4w6: z23.number(),
  c20_5w3: z23.number(),
  c21_5w3: z23.number(),
  c22_2: z23.number(),
  c22_2w6: z23.number(),
  c22_4w6: z23.number(),
  c22_5w3: z23.number(),
  c22_5w6: z23.number(),
  c22_6w3: z23.number(),
  totalPolyunsaturatedFattyAcidsEquated: z23.number()
});
var formSchema = z23.object({
  name: z23.string().min(1),
  isPrivate: z23.boolean(),
  viewableBy: z23.string(),
  serveSize: z23.number(),
  serveUnit: z23.string().min(1),
  caloriesWFibre: z23.number(),
  caloriesWOFibre: z23.number(),
  protein: z23.number(),
  fatTotal: z23.number(),
  totalDietaryFibre: z23.number(),
  totalSugars: z23.number(),
  starch: z23.number(),
  resistantStarch: z23.number(),
  availableCarbohydrateWithoutSugarAlcohols: z23.number(),
  availableCarbohydrateWithSugarAlcohols: z23.number(),
  addedSugars: z23.number(),
  freeSugars: z23.number(),
  moisture: z23.number(),
  nitrogen: z23.number(),
  alcohol: z23.number(),
  fructose: z23.number(),
  glucose: z23.number(),
  sucrose: z23.number(),
  maltose: z23.number(),
  lactose: z23.number(),
  galactose: z23.number(),
  maltotrios: z23.number(),
  ash: z23.number(),
  dextrin: z23.number(),
  glycerol: z23.number(),
  glycogen: z23.number(),
  inulin: z23.number(),
  erythritol: z23.number(),
  maltitol: z23.number(),
  mannitol: z23.number(),
  xylitol: z23.number(),
  maltodextrin: z23.number(),
  oligosaccharides: z23.number(),
  polydextrose: z23.number(),
  raffinose: z23.number(),
  stachyose: z23.number(),
  sorbitol: z23.number(),
  aceticAcid: z23.number(),
  citricAcid: z23.number(),
  fumaricAcid: z23.number(),
  lacticAcid: z23.number(),
  malicAcid: z23.number(),
  oxalicAcid: z23.number(),
  propionicAcid: z23.number(),
  quinicAcid: z23.number(),
  shikimicAcid: z23.number(),
  succinicAcid: z23.number(),
  tartaricAcid: z23.number(),
  aluminium: z23.number(),
  antimony: z23.number(),
  arsenic: z23.number(),
  cadmium: z23.number(),
  calcium: z23.number(),
  chromium: z23.number(),
  chloride: z23.number(),
  cobalt: z23.number(),
  copper: z23.number(),
  fluoride: z23.number(),
  iodine: z23.number(),
  iron: z23.number(),
  lead: z23.number(),
  magnesium: z23.number(),
  manganese: z23.number(),
  mercury: z23.number(),
  molybdenum: z23.number(),
  nickel: z23.number(),
  phosphorus: z23.number(),
  potassium: z23.number(),
  selenium: z23.number(),
  sodium: z23.number(),
  sulphur: z23.number(),
  tin: z23.number(),
  zinc: z23.number(),
  retinol: z23.number(),
  alphaCarotene: z23.number(),
  betaCarotene: z23.number(),
  cryptoxanthin: z23.number(),
  betaCaroteneEquivalents: z23.number(),
  vitaminARetinolEquivalents: z23.number(),
  lutein: z23.number(),
  lycopene: z23.number(),
  xanthophyl: z23.number(),
  thiamin: z23.number(),
  riboflavin: z23.number(),
  niacin: z23.number(),
  niacinDerivedFromTryptophan: z23.number(),
  niacinDerivedEquivalents: z23.number(),
  pantothenicAcid: z23.number(),
  pyridoxine: z23.number(),
  biotin: z23.number(),
  cobalamin: z23.number(),
  folateNatural: z23.number(),
  folicAcid: z23.number(),
  totalFolates: z23.number(),
  dietaryFolateEquivalents: z23.number(),
  vitaminC: z23.number(),
  cholecalciferol: z23.number(),
  ergocalciferol: z23.number(),
  hydroxyCholecalciferol: z23.number(),
  hydroxyErgocalciferol: z23.number(),
  vitaminDEquivalents: z23.number(),
  alphaTocopherol: z23.number(),
  alphaTocotrienol: z23.number(),
  betaTocopherol: z23.number(),
  betaTocotrienol: z23.number(),
  deltaTocopherol: z23.number(),
  deltaTocotrienol: z23.number(),
  gammaTocopherol: z23.number(),
  gammaTocotrienol: z23.number(),
  vitaminE: z23.number(),
  totalSaturatedFattyAcids: z23.number(),
  totalMonounsaturatedFattyAcids: z23.number(),
  totalPolyunsaturatedFattyAcids: z23.number(),
  totalLongChainOmega3FattyAcids: z23.number(),
  totalTransFattyAcids: z23.number(),
  caffeine: z23.number(),
  cholesterol: z23.number(),
  alanine: z23.number(),
  arginine: z23.number(),
  asparticAcid: z23.number(),
  cystinePlusCysteine: z23.number(),
  glutamicAcid: z23.number(),
  glycine: z23.number(),
  histidine: z23.number(),
  isoleucine: z23.number(),
  leucine: z23.number(),
  lysine: z23.number(),
  methionine: z23.number(),
  phenylalanine: z23.number(),
  proline: z23.number(),
  serine: z23.number(),
  threonine: z23.number(),
  tyrosine: z23.number(),
  tryptophan: z23.number(),
  valine: z23.number(),
  c4: z23.number(),
  c6: z23.number(),
  c8: z23.number(),
  c10: z23.number(),
  c11: z23.number(),
  c12: z23.number(),
  c13: z23.number(),
  c14: z23.number(),
  c15: z23.number(),
  c16: z23.number(),
  c17: z23.number(),
  c18: z23.number(),
  c19: z23.number(),
  c20: z23.number(),
  c21: z23.number(),
  c22: z23.number(),
  c23: z23.number(),
  c24: z23.number(),
  totalSaturatedFattyAcidsEquated: z23.number(),
  c10_1: z23.number(),
  c12_1: z23.number(),
  c14_1: z23.number(),
  c15_1: z23.number(),
  c16_1: z23.number(),
  c17_1: z23.number(),
  c18_1: z23.number(),
  c18_1w5: z23.number(),
  c18_1w6: z23.number(),
  c18_1w7: z23.number(),
  c18_1w9: z23.number(),
  c20_1: z23.number(),
  c20_1w9: z23.number(),
  c20_1w13: z23.number(),
  c20_1w11: z23.number(),
  c22_1: z23.number(),
  c22_1w9: z23.number(),
  c22_1w11: z23.number(),
  c24_1: z23.number(),
  c24_1w9: z23.number(),
  c24_1w11: z23.number(),
  c24_1w13: z23.number(),
  totalMonounsaturatedFattyAcidsEquated: z23.number(),
  c12_2: z23.number(),
  c16_2w4: z23.number(),
  c16_3: z23.number(),
  c18_2w6: z23.number(),
  c18_3w3: z23.number(),
  c18_3w4: z23.number(),
  c18_3w6: z23.number(),
  c18_4w1: z23.number(),
  c18_4w3: z23.number(),
  c20_2: z23.number(),
  c20_2w6: z23.number(),
  c20_3: z23.number(),
  c20_3w3: z23.number(),
  c20_3w6: z23.number(),
  c20_4: z23.number(),
  c20_4w3: z23.number(),
  c20_4w6: z23.number(),
  c20_5w3: z23.number(),
  c21_5w3: z23.number(),
  c22_2: z23.number(),
  c22_2w6: z23.number(),
  c22_4w6: z23.number(),
  c22_5w3: z23.number(),
  c22_5w6: z23.number(),
  c22_6w3: z23.number(),
  totalPolyunsaturatedFattyAcidsEquated: z23.number()
});

// src/server/api/routers/supplements.ts
var createLog4 = async ({
  user: user2,
  task,
  notes,
  userId,
  objectId
}) => {
  await db.insert(log).values({
    task,
    notes,
    user: user2,
    userId,
    objectId
  });
};
var supplementsRouter = createTRPCRouter({
  delete: protectedProcedure.input(z24.object({ id: z24.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(ingredient).set({
      deletedAt: /* @__PURE__ */ new Date()
    }).where(eq16(ingredient.id, input.id));
    return res;
  }),
  getAllTemplates: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.supplementStack.findMany({
      where: (stack, { eq: eq30 }) => eq30(stack.isTemplate, true),
      with: {
        supplements: {
          with: {
            supplement: true
          }
        }
      },
      orderBy: [asc3(supplementStack.name)]
    });
    return res;
  }),
  createTemplate: protectedProcedure.input(templateSchema).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(supplementStack).values({
      userId: ctx.session.user.id,
      name: input.name,
      time: input.time,
      isTemplate: true
    }).returning({ id: supplementStack.id });
    return res;
  }),
  applyTemplateToUser: protectedProcedure.input(
    z24.object({
      templateId: z24.number(),
      userId: z24.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const template = await ctx.db.query.supplementStack.findFirst({
      where: (stack, { eq: eq30, and: and15 }) => and15(eq30(stack.id, input.templateId), eq30(stack.isTemplate, true)),
      with: {
        supplements: true
      }
    });
    if (!template) throw new TRPCError7({ code: "NOT_FOUND" });
    const userStacks = await ctx.db.query.supplementStack.findMany({
      where: (stack, { eq: eq30 }) => and10(eq30(stack.userId, input.userId), eq30(stack.isTemplate, false))
    });
    let userStackId = userStacks.find((stack) => stack.time === template.time)?.id || null;
    if (!userStackId) {
      const res = await ctx.db.insert(supplementStack).values({
        userId: input.userId,
        isTemplate: false,
        time: template.time,
        name: template.name
      }).returning({ id: supplementStack.id });
      if (!res[0]) throw new TRPCError7({ code: "BAD_REQUEST" });
      userStackId = res[0].id;
    }
    for (const supp of template.supplements) {
      await ctx.db.insert(supplementToSupplementStack).values({
        supplementId: supp.supplementId,
        supplementStackId: userStackId,
        size: supp.size,
        unit: supp.unit,
        order: supp.order
      });
    }
    return true;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    const res = await ctx.db.query.ingredient.findMany({
      where: (ingredient2, { isNull: isNull2, and: and15, eq: eq30 }) => and15(
        isNull2(ingredient2.hiddenAt),
        isNull2(ingredient2.deletedAt),
        eq30(ingredient2.isSupplement, true),
        eq30(ingredient2.isUserCreated, false)
      ),
      with: {
        user: {
          columns: {
            id: true,
            name: true
          }
        }
      },
      orderBy: [asc3(ingredient.name)]
    });
    const filterRes = res.filter((item) => {
      if (item.isPrivate) {
        if (item.userId === userId) return true;
        if (item.viewableBy?.split(",").includes(userId)) return true;
        return false;
      }
      return true;
    });
    return filterRes;
  }),
  getSupplementFromDailyLog: protectedProcedure.input(z24.object({ id: z24.number() })).query(async ({ input, ctx }) => {
    if (input.id === -1) return false;
    const res = await ctx.db.query.dailySupplement.findFirst({
      where: (supplement, { eq: eq30 }) => eq30(supplement.id, input.id),
      with: {
        supplement: true
      }
    });
    return res ? true : false;
  }),
  getFullSupplement: protectedProcedure.input(z24.object({ id: z24.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.ingredient.findFirst({
      where: (ingredient2, { eq: eq30 }) => eq30(ingredient2.id, input.id),
      with: {
        ingredientAdditionOne: true,
        ingredientAdditionTwo: true,
        ingredientAdditionThree: true,
        user: {
          columns: {
            id: true,
            name: true
          }
        }
      }
    });
    return res;
  }),
  getSupplement: protectedProcedure.input(z24.object({ id: z24.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.ingredient.findFirst({
      where: (ingredient2, { eq: eq30 }) => eq30(ingredient2.id, input.id),
      with: {
        user: {
          columns: {
            id: true,
            name: true
          }
        }
      }
    });
    return res;
  }),
  addTime: protectedProcedure.input(
    z24.object({
      time: z24.string(),
      userId: z24.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(supplementStack).values({
      userId: input.userId,
      time: input.time
    }).returning({ id: supplementStack.id });
    return res;
  }),
  getSuppFromPlan: protectedProcedure.input(z24.object({ id: z24.number() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.supplementToSupplementStack.findFirst({
      where: (supplement, { eq: eq30 }) => eq30(supplement.id, input.id),
      with: {
        supplement: true
      }
    });
    return res;
  }),
  addSupplementToTemplate: protectedProcedure.input(
    z24.object({
      suppId: z24.number(),
      stackId: z24.number(),
      size: z24.string(),
      unit: z24.string()
    })
  ).mutation(async ({ input, ctx }) => {
    await ctx.db.insert(supplementToSupplementStack).values({
      supplementId: input.suppId,
      supplementStackId: input.stackId,
      size: input.size,
      unit: input.unit
    });
    return true;
  }),
  addToUser: protectedProcedure.input(
    z24.object({
      suppId: z24.number(),
      userId: z24.string(),
      time: z24.string(),
      size: z24.string(),
      unit: z24.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const userTimes = await ctx.db.query.supplementStack.findMany({
      where: (stack, { eq: eq30 }) => eq30(stack.userId, input.userId)
    });
    let timeId = userTimes.find((stack) => stack.time === input.time)?.id || null;
    if (!timeId) {
      const res = await ctx.db.insert(supplementStack).values({
        userId: input.userId,
        time: input.time
      }).returning({ id: supplementStack.id });
      if (!res || res[0]?.id === void 0)
        throw new TRPCError7({ code: "BAD_REQUEST" });
      timeId = res[0]?.id;
    }
    await ctx.db.insert(supplementToSupplementStack).values({
      supplementId: input.suppId,
      supplementStackId: timeId,
      size: input.size,
      unit: input.unit
    });
    const notif = await ctx.db.query.notification.findMany({
      where: and10(
        eq16(notification.userId, input.userId),
        eq16(notification.code, "supplement_update"),
        eq16(notification.isViewed, false)
      )
    });
    if (notif.length === 0) {
      await ctx.db.insert(notification).values({
        userId: input.userId,
        code: "supplement_update",
        title: "Your supplements have been updated",
        description: "You have a new supplement update",
        isViewed: false,
        isRead: false
      });
    }
    return true;
  }),
  logSupplement: protectedProcedure.input(
    z24.object({
      suppId: z24.number(),
      suppName: z24.string(),
      date: z24.string(),
      time: z24.string(),
      amount: z24.string(),
      unit: z24.string(),
      stackId: z24.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and10(
        eq16(dailyLog.date, input.date),
        eq16(dailyLog.userId, ctx.session.user.id)
      )
    });
    let logId = log2?.id;
    if (!log2) {
      const res = await ctx.db.insert(dailyLog).values({
        date: input.date,
        userId: ctx.session.user.id
      }).returning({ id: dailyLog.id });
      logId = res[0]?.id;
    }
    createLog4({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Log Supplement",
      notes: JSON.stringify(input),
      objectId: logId
    });
    if (!logId) throw new TRPCError7({ code: "NOT_FOUND" });
    await ctx.db.insert(dailySupplement).values({
      dailyLogId: logId,
      supplementId: input.suppId,
      amount: input.amount,
      unit: input.unit,
      time: input.time,
      notes: input.stackId.toString()
    });
    return true;
  }),
  logMultipleSupplements: protectedProcedure.input(
    z24.object({
      date: z24.string(),
      supplements: z24.array(
        z24.object({
          suppId: z24.number(),
          suppName: z24.string(),
          time: z24.string(),
          amount: z24.string(),
          unit: z24.string(),
          stackId: z24.string()
        })
      ).min(1)
    })
  ).mutation(async ({ input, ctx }) => {
    const existingLog = await ctx.db.query.dailyLog.findFirst({
      where: and10(
        eq16(dailyLog.date, input.date),
        eq16(dailyLog.userId, ctx.session.user.id)
      )
    });
    let logId = existingLog?.id;
    if (!existingLog) {
      const res = await ctx.db.insert(dailyLog).values({
        date: input.date,
        userId: ctx.session.user.id
      }).returning({ id: dailyLog.id });
      logId = res[0]?.id;
    }
    if (!logId) throw new TRPCError7({ code: "NOT_FOUND" });
    createLog4({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Log Multiple Supplements",
      notes: JSON.stringify(input),
      objectId: logId
    });
    await ctx.db.insert(dailySupplement).values(
      input.supplements.map((supplement) => ({
        dailyLogId: logId,
        supplementId: supplement.suppId,
        amount: supplement.amount,
        unit: supplement.unit,
        time: supplement.time,
        notes: supplement.stackId.toString()
      }))
    );
    return true;
  }),
  unLogSupplement: protectedProcedure.input(z24.object({ id: z24.number() })).mutation(async ({ input, ctx }) => {
    createLog4({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "unLog Supplement",
      notes: JSON.stringify(input),
      objectId: null
    });
    await ctx.db.delete(dailySupplement).where(eq16(dailySupplement.id, input.id));
    return true;
  }),
  deleteFromUser: protectedProcedure.input(z24.object({ suppId: z24.number(), suppStackId: z24.number() })).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(supplementToSupplementStack).where(
      and10(
        eq16(supplementToSupplementStack.supplementId, input.suppId),
        eq16(
          supplementToSupplementStack.supplementStackId,
          input.suppStackId
        )
      )
    );
    return true;
  }),
  deleteTime: protectedProcedure.input(z24.object({ id: z24.number() })).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(supplementStack).where(eq16(supplementStack.id, input.id));
    return true;
  }),
  userCreate: protectedProcedure.input(
    z24.object({
      name: z24.string(),
      serveSize: z24.number(),
      serveUnit: z24.string(),
      isPrivate: z24.boolean(),
      stackId: z24.number(),
      viewableBy: z24.string().optional(),
      userId: z24.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(ingredient).values({
      name: input.name,
      serveSize: input.serveSize.toString(),
      serveUnit: input.serveUnit,
      isPrivate: input.isPrivate,
      viewableBy: input.viewableBy,
      userId: input.userId,
      isUserCreated: true,
      isSupplement: true
    }).returning({ id: ingredient.id });
    const suppId = res[0]?.id;
    if (!suppId) throw new TRPCError7({ code: "NOT_FOUND" });
    createLog4({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "User Create Supplement",
      notes: JSON.stringify(input),
      objectId: suppId
    });
    await ctx.db.insert(supplementToSupplementStack).values({
      supplementId: suppId,
      supplementStackId: input.stackId,
      size: input.serveSize.toString(),
      unit: input.serveUnit
    });
    return res;
  }),
  update: protectedProcedure.input(updateSchema).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const res = await ctx.db.update(ingredient).set({
      serveUnit: input.serveUnit,
      serveSize: input.serveSize.toString(),
      name: input.name,
      isPrivate: input.isPrivate,
      viewableBy: input.viewableBy,
      userId,
      caloriesWFibre: input.caloriesWFibre === 0 ? null : input.caloriesWFibre.toString(),
      caloriesWOFibre: input.caloriesWOFibre === 0 ? null : input.caloriesWOFibre.toString(),
      protein: input.protein === 0 ? null : input.protein.toString(),
      fatTotal: input.fatTotal === 0 ? null : input.fatTotal.toString(),
      totalDietaryFibre: input.totalDietaryFibre === 0 ? null : input.totalDietaryFibre.toString(),
      totalSugars: input.totalSugars === 0 ? null : input.totalSugars.toString(),
      starch: input.starch === 0 ? null : input.starch.toString(),
      resistantStarch: input.resistantStarch === 0 ? null : input.resistantStarch.toString(),
      availableCarbohydrateWithoutSugarAlcohols: input.availableCarbohydrateWithoutSugarAlcohols === 0 ? null : input.availableCarbohydrateWithoutSugarAlcohols.toString(),
      availableCarbohydrateWithSugarAlcohols: input.availableCarbohydrateWithSugarAlcohols === 0 ? null : input.availableCarbohydrateWithSugarAlcohols.toString(),
      isSupplement: true,
      notes: ""
    }).where(eq16(ingredient.id, input.id));
    await ctx.db.batch([
      ctx.db.update(ingredientAdditionOne).set({
        ingredientId: input.id,
        addedSugars: input.addedSugars === 0 ? null : input.addedSugars.toString(),
        freeSugars: input.freeSugars === 0 ? null : input.freeSugars.toString(),
        moisture: input.moisture === 0 ? null : input.moisture.toString(),
        nitrogen: input.nitrogen === 0 ? null : input.nitrogen.toString(),
        alcohol: input.alcohol === 0 ? null : input.alcohol.toString(),
        fructose: input.fructose === 0 ? null : input.fructose.toString(),
        glucose: input.glucose === 0 ? null : input.glucose.toString(),
        sucrose: input.sucrose === 0 ? null : input.sucrose.toString(),
        maltose: input.maltose === 0 ? null : input.maltose.toString(),
        lactose: input.lactose === 0 ? null : input.lactose.toString(),
        galactose: input.galactose === 0 ? null : input.galactose.toString(),
        maltotrios: input.maltotrios === 0 ? null : input.maltotrios.toString(),
        ash: input.ash === 0 ? null : input.ash.toString(),
        dextrin: input.dextrin === 0 ? null : input.dextrin.toString(),
        glycerol: input.glycerol === 0 ? null : input.glycerol.toString(),
        glycogen: input.glycogen === 0 ? null : input.glycogen.toString(),
        inulin: input.inulin === 0 ? null : input.inulin.toString(),
        erythritol: input.erythritol === 0 ? null : input.erythritol.toString(),
        maltitol: input.maltitol === 0 ? null : input.maltitol.toString(),
        mannitol: input.mannitol === 0 ? null : input.mannitol.toString(),
        xylitol: input.xylitol === 0 ? null : input.xylitol.toString(),
        maltodextrin: input.maltodextrin === 0 ? null : input.maltodextrin.toString(),
        oligosaccharides: input.oligosaccharides === 0 ? null : input.oligosaccharides.toString(),
        polydextrose: input.polydextrose === 0 ? null : input.polydextrose.toString(),
        raffinose: input.raffinose === 0 ? null : input.raffinose.toString(),
        stachyose: input.stachyose === 0 ? null : input.stachyose.toString(),
        sorbitol: input.sorbitol === 0 ? null : input.sorbitol.toString()
      }).where(eq16(ingredientAdditionOne.ingredientId, input.id)),
      ctx.db.update(ingredientAdditionTwo).set({
        ingredientId: input.id,
        aceticAcid: input.aceticAcid === 0 ? null : input.aceticAcid.toString(),
        citricAcid: input.citricAcid === 0 ? null : input.citricAcid.toString(),
        fumaricAcid: input.fumaricAcid === 0 ? null : input.fumaricAcid.toString(),
        lacticAcid: input.lacticAcid === 0 ? null : input.lacticAcid.toString(),
        malicAcid: input.malicAcid === 0 ? null : input.malicAcid.toString(),
        oxalicAcid: input.oxalicAcid === 0 ? null : input.oxalicAcid.toString(),
        propionicAcid: input.propionicAcid === 0 ? null : input.propionicAcid.toString(),
        quinicAcid: input.quinicAcid === 0 ? null : input.quinicAcid.toString(),
        shikimicAcid: input.shikimicAcid === 0 ? null : input.shikimicAcid.toString(),
        succinicAcid: input.succinicAcid === 0 ? null : input.succinicAcid.toString(),
        tartaricAcid: input.tartaricAcid === 0 ? null : input.tartaricAcid.toString(),
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
        molybdenum: input.molybdenum === 0 ? null : input.molybdenum.toString(),
        nickel: input.nickel === 0 ? null : input.nickel.toString(),
        phosphorus: input.phosphorus === 0 ? null : input.phosphorus.toString(),
        potassium: input.potassium === 0 ? null : input.potassium.toString(),
        selenium: input.selenium === 0 ? null : input.selenium.toString(),
        sodium: input.sodium === 0 ? null : input.sodium.toString(),
        sulphur: input.sulphur === 0 ? null : input.sulphur.toString(),
        tin: input.tin === 0 ? null : input.tin.toString(),
        zinc: input.zinc === 0 ? null : input.zinc.toString(),
        retinol: input.retinol === 0 ? null : input.retinol.toString(),
        alphaCarotene: input.alphaCarotene === 0 ? null : input.alphaCarotene.toString(),
        betaCarotene: input.betaCarotene === 0 ? null : input.betaCarotene.toString(),
        cryptoxanthin: input.cryptoxanthin === 0 ? null : input.cryptoxanthin.toString(),
        betaCaroteneEquivalents: input.betaCaroteneEquivalents === 0 ? null : input.betaCaroteneEquivalents.toString(),
        vitaminARetinolEquivalents: input.vitaminARetinolEquivalents === 0 ? null : input.vitaminARetinolEquivalents.toString(),
        lutein: input.lutein === 0 ? null : input.lutein.toString(),
        lycopene: input.lycopene === 0 ? null : input.lycopene.toString(),
        xanthophyl: input.xanthophyl === 0 ? null : input.xanthophyl.toString(),
        thiamin: input.thiamin === 0 ? null : input.thiamin.toString(),
        riboflavin: input.riboflavin === 0 ? null : input.riboflavin.toString(),
        niacin: input.niacin === 0 ? null : input.niacin.toString(),
        niacinDerivedFromTryptophan: input.niacinDerivedFromTryptophan === 0 ? null : input.niacinDerivedFromTryptophan.toString(),
        niacinDerivedEquivalents: input.niacinDerivedEquivalents === 0 ? null : input.niacinDerivedEquivalents.toString(),
        pantothenicAcid: input.pantothenicAcid === 0 ? null : input.pantothenicAcid.toString(),
        pyridoxine: input.pyridoxine === 0 ? null : input.pyridoxine.toString(),
        biotin: input.biotin === 0 ? null : input.biotin.toString(),
        cobalamin: input.cobalamin === 0 ? null : input.cobalamin.toString(),
        folateNatural: input.folateNatural === 0 ? null : input.folateNatural.toString(),
        folicAcid: input.folicAcid === 0 ? null : input.folicAcid.toString(),
        totalFolates: input.totalFolates === 0 ? null : input.totalFolates.toString(),
        dietaryFolateEquivalents: input.dietaryFolateEquivalents === 0 ? null : input.dietaryFolateEquivalents.toString(),
        vitaminC: input.vitaminC === 0 ? null : input.vitaminC.toString(),
        cholecalciferol: input.cholecalciferol === 0 ? null : input.cholecalciferol.toString(),
        ergocalciferol: input.ergocalciferol === 0 ? null : input.ergocalciferol.toString(),
        hydroxyCholecalciferol: input.hydroxyCholecalciferol === 0 ? null : input.hydroxyCholecalciferol.toString(),
        hydroxyErgocalciferol: input.hydroxyErgocalciferol === 0 ? null : input.hydroxyErgocalciferol.toString(),
        vitaminDEquivalents: input.vitaminDEquivalents === 0 ? null : input.vitaminDEquivalents.toString(),
        alphaTocopherol: input.alphaTocopherol === 0 ? null : input.alphaTocopherol.toString(),
        alphaTocotrienol: input.alphaTocotrienol === 0 ? null : input.alphaTocotrienol.toString(),
        betaTocopherol: input.betaTocopherol === 0 ? null : input.betaTocopherol.toString(),
        betaTocotrienol: input.betaTocotrienol === 0 ? null : input.betaTocotrienol.toString(),
        deltaTocopherol: input.deltaTocopherol === 0 ? null : input.deltaTocopherol.toString(),
        deltaTocotrienol: input.deltaTocotrienol === 0 ? null : input.deltaTocotrienol.toString(),
        gammaTocopherol: input.gammaTocopherol === 0 ? null : input.gammaTocopherol.toString(),
        gammaTocotrienol: input.gammaTocotrienol === 0 ? null : input.gammaTocotrienol.toString(),
        vitaminE: input.vitaminE === 0 ? null : input.vitaminE.toString()
      }).where(eq16(ingredientAdditionTwo.ingredientId, input.id)),
      ctx.db.update(ingredientAdditionThree).set({
        ingredientId: input.id,
        totalSaturatedFattyAcids: input.totalSaturatedFattyAcids === 0 ? null : input.totalSaturatedFattyAcids.toString(),
        totalMonounsaturatedFattyAcids: input.totalMonounsaturatedFattyAcids === 0 ? null : input.totalMonounsaturatedFattyAcids.toString(),
        totalPolyunsaturatedFattyAcids: input.totalPolyunsaturatedFattyAcids === 0 ? null : input.totalPolyunsaturatedFattyAcids.toString(),
        totalLongChainOmega3FattyAcids: input.totalLongChainOmega3FattyAcids === 0 ? null : input.totalLongChainOmega3FattyAcids.toString(),
        totalTransFattyAcids: input.totalTransFattyAcids === 0 ? null : input.totalTransFattyAcids.toString(),
        caffeine: input.caffeine === 0 ? null : input.caffeine.toString(),
        cholesterol: input.cholesterol === 0 ? null : input.cholesterol.toString(),
        alanine: input.alanine === 0 ? null : input.alanine.toString(),
        arginine: input.arginine === 0 ? null : input.arginine.toString(),
        asparticAcid: input.asparticAcid === 0 ? null : input.asparticAcid.toString(),
        cystinePlusCysteine: input.cystinePlusCysteine === 0 ? null : input.cystinePlusCysteine.toString(),
        glutamicAcid: input.glutamicAcid === 0 ? null : input.glutamicAcid.toString(),
        glycine: input.glycine === 0 ? null : input.glycine.toString(),
        histidine: input.histidine === 0 ? null : input.histidine.toString(),
        isoleucine: input.isoleucine === 0 ? null : input.isoleucine.toString(),
        leucine: input.leucine === 0 ? null : input.leucine.toString(),
        lysine: input.lysine === 0 ? null : input.lysine.toString(),
        methionine: input.methionine === 0 ? null : input.methionine.toString(),
        phenylalanine: input.phenylalanine === 0 ? null : input.phenylalanine.toString(),
        proline: input.proline === 0 ? null : input.proline.toString(),
        serine: input.serine === 0 ? null : input.serine.toString(),
        threonine: input.threonine === 0 ? null : input.threonine.toString(),
        tyrosine: input.tyrosine === 0 ? null : input.tyrosine.toString(),
        tryptophan: input.tryptophan === 0 ? null : input.tryptophan.toString(),
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
        totalSaturatedFattyAcidsEquated: input.totalSaturatedFattyAcidsEquated === 0 ? null : input.totalSaturatedFattyAcidsEquated.toString(),
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
        totalMonounsaturatedFattyAcidsEquated: input.totalMonounsaturatedFattyAcidsEquated === 0 ? null : input.totalMonounsaturatedFattyAcidsEquated.toString(),
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
        totalPolyunsaturatedFattyAcidsEquated: input.totalPolyunsaturatedFattyAcidsEquated === 0 ? null : input.totalPolyunsaturatedFattyAcidsEquated.toString()
      }).where(eq16(ingredientAdditionThree.ingredientId, input.id))
    ]);
    return res;
  }),
  create: protectedProcedure.input(formSchema).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const res = await ctx.db.insert(ingredient).values({
      serveUnit: input.serveUnit,
      serveSize: input.serveSize.toString(),
      name: input.name,
      isPrivate: input.isPrivate,
      viewableBy: input.viewableBy,
      userId,
      caloriesWFibre: input.caloriesWFibre === 0 ? null : input.caloriesWFibre.toString(),
      caloriesWOFibre: input.caloriesWOFibre === 0 ? null : input.caloriesWOFibre.toString(),
      protein: input.protein === 0 ? null : input.protein.toString(),
      fatTotal: input.fatTotal === 0 ? null : input.fatTotal.toString(),
      totalDietaryFibre: input.totalDietaryFibre === 0 ? null : input.totalDietaryFibre.toString(),
      totalSugars: input.totalSugars === 0 ? null : input.totalSugars.toString(),
      starch: input.starch === 0 ? null : input.starch.toString(),
      resistantStarch: input.resistantStarch === 0 ? null : input.resistantStarch.toString(),
      availableCarbohydrateWithoutSugarAlcohols: input.availableCarbohydrateWithoutSugarAlcohols === 0 ? null : input.availableCarbohydrateWithoutSugarAlcohols.toString(),
      availableCarbohydrateWithSugarAlcohols: input.availableCarbohydrateWithSugarAlcohols === 0 ? null : input.availableCarbohydrateWithSugarAlcohols.toString(),
      isSupplement: true,
      notes: ""
    }).returning({ id: ingredient.id });
    await ctx.db.batch([
      ctx.db.insert(ingredientAdditionOne).values({
        ingredientId: res[0]?.id,
        addedSugars: input.addedSugars === 0 ? null : input.addedSugars.toString(),
        freeSugars: input.freeSugars === 0 ? null : input.freeSugars.toString(),
        moisture: input.moisture === 0 ? null : input.moisture.toString(),
        nitrogen: input.nitrogen === 0 ? null : input.nitrogen.toString(),
        alcohol: input.alcohol === 0 ? null : input.alcohol.toString(),
        fructose: input.fructose === 0 ? null : input.fructose.toString(),
        glucose: input.glucose === 0 ? null : input.glucose.toString(),
        sucrose: input.sucrose === 0 ? null : input.sucrose.toString(),
        maltose: input.maltose === 0 ? null : input.maltose.toString(),
        lactose: input.lactose === 0 ? null : input.lactose.toString(),
        galactose: input.galactose === 0 ? null : input.galactose.toString(),
        maltotrios: input.maltotrios === 0 ? null : input.maltotrios.toString(),
        ash: input.ash === 0 ? null : input.ash.toString(),
        dextrin: input.dextrin === 0 ? null : input.dextrin.toString(),
        glycerol: input.glycerol === 0 ? null : input.glycerol.toString(),
        glycogen: input.glycogen === 0 ? null : input.glycogen.toString(),
        inulin: input.inulin === 0 ? null : input.inulin.toString(),
        erythritol: input.erythritol === 0 ? null : input.erythritol.toString(),
        maltitol: input.maltitol === 0 ? null : input.maltitol.toString(),
        mannitol: input.mannitol === 0 ? null : input.mannitol.toString(),
        xylitol: input.xylitol === 0 ? null : input.xylitol.toString(),
        maltodextrin: input.maltodextrin === 0 ? null : input.maltodextrin.toString(),
        oligosaccharides: input.oligosaccharides === 0 ? null : input.oligosaccharides.toString(),
        polydextrose: input.polydextrose === 0 ? null : input.polydextrose.toString(),
        raffinose: input.raffinose === 0 ? null : input.raffinose.toString(),
        stachyose: input.stachyose === 0 ? null : input.stachyose.toString(),
        sorbitol: input.sorbitol === 0 ? null : input.sorbitol.toString()
      }),
      ctx.db.insert(ingredientAdditionTwo).values({
        ingredientId: res[0]?.id,
        aceticAcid: input.aceticAcid === 0 ? null : input.aceticAcid.toString(),
        citricAcid: input.citricAcid === 0 ? null : input.citricAcid.toString(),
        fumaricAcid: input.fumaricAcid === 0 ? null : input.fumaricAcid.toString(),
        lacticAcid: input.lacticAcid === 0 ? null : input.lacticAcid.toString(),
        malicAcid: input.malicAcid === 0 ? null : input.malicAcid.toString(),
        oxalicAcid: input.oxalicAcid === 0 ? null : input.oxalicAcid.toString(),
        propionicAcid: input.propionicAcid === 0 ? null : input.propionicAcid.toString(),
        quinicAcid: input.quinicAcid === 0 ? null : input.quinicAcid.toString(),
        shikimicAcid: input.shikimicAcid === 0 ? null : input.shikimicAcid.toString(),
        succinicAcid: input.succinicAcid === 0 ? null : input.succinicAcid.toString(),
        tartaricAcid: input.tartaricAcid === 0 ? null : input.tartaricAcid.toString(),
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
        molybdenum: input.molybdenum === 0 ? null : input.molybdenum.toString(),
        nickel: input.nickel === 0 ? null : input.nickel.toString(),
        phosphorus: input.phosphorus === 0 ? null : input.phosphorus.toString(),
        potassium: input.potassium === 0 ? null : input.potassium.toString(),
        selenium: input.selenium === 0 ? null : input.selenium.toString(),
        sodium: input.sodium === 0 ? null : input.sodium.toString(),
        sulphur: input.sulphur === 0 ? null : input.sulphur.toString(),
        tin: input.tin === 0 ? null : input.tin.toString(),
        zinc: input.zinc === 0 ? null : input.zinc.toString(),
        retinol: input.retinol === 0 ? null : input.retinol.toString(),
        alphaCarotene: input.alphaCarotene === 0 ? null : input.alphaCarotene.toString(),
        betaCarotene: input.betaCarotene === 0 ? null : input.betaCarotene.toString(),
        cryptoxanthin: input.cryptoxanthin === 0 ? null : input.cryptoxanthin.toString(),
        betaCaroteneEquivalents: input.betaCaroteneEquivalents === 0 ? null : input.betaCaroteneEquivalents.toString(),
        vitaminARetinolEquivalents: input.vitaminARetinolEquivalents === 0 ? null : input.vitaminARetinolEquivalents.toString(),
        lutein: input.lutein === 0 ? null : input.lutein.toString(),
        lycopene: input.lycopene === 0 ? null : input.lycopene.toString(),
        xanthophyl: input.xanthophyl === 0 ? null : input.xanthophyl.toString(),
        thiamin: input.thiamin === 0 ? null : input.thiamin.toString(),
        riboflavin: input.riboflavin === 0 ? null : input.riboflavin.toString(),
        niacin: input.niacin === 0 ? null : input.niacin.toString(),
        niacinDerivedFromTryptophan: input.niacinDerivedFromTryptophan === 0 ? null : input.niacinDerivedFromTryptophan.toString(),
        niacinDerivedEquivalents: input.niacinDerivedEquivalents === 0 ? null : input.niacinDerivedEquivalents.toString(),
        pantothenicAcid: input.pantothenicAcid === 0 ? null : input.pantothenicAcid.toString(),
        pyridoxine: input.pyridoxine === 0 ? null : input.pyridoxine.toString(),
        biotin: input.biotin === 0 ? null : input.biotin.toString(),
        cobalamin: input.cobalamin === 0 ? null : input.cobalamin.toString(),
        folateNatural: input.folateNatural === 0 ? null : input.folateNatural.toString(),
        folicAcid: input.folicAcid === 0 ? null : input.folicAcid.toString(),
        totalFolates: input.totalFolates === 0 ? null : input.totalFolates.toString(),
        dietaryFolateEquivalents: input.dietaryFolateEquivalents === 0 ? null : input.dietaryFolateEquivalents.toString(),
        vitaminC: input.vitaminC === 0 ? null : input.vitaminC.toString(),
        cholecalciferol: input.cholecalciferol === 0 ? null : input.cholecalciferol.toString(),
        ergocalciferol: input.ergocalciferol === 0 ? null : input.ergocalciferol.toString(),
        hydroxyCholecalciferol: input.hydroxyCholecalciferol === 0 ? null : input.hydroxyCholecalciferol.toString(),
        hydroxyErgocalciferol: input.hydroxyErgocalciferol === 0 ? null : input.hydroxyErgocalciferol.toString(),
        vitaminDEquivalents: input.vitaminDEquivalents === 0 ? null : input.vitaminDEquivalents.toString(),
        alphaTocopherol: input.alphaTocopherol === 0 ? null : input.alphaTocopherol.toString(),
        alphaTocotrienol: input.alphaTocotrienol === 0 ? null : input.alphaTocotrienol.toString(),
        betaTocopherol: input.betaTocopherol === 0 ? null : input.betaTocopherol.toString(),
        betaTocotrienol: input.betaTocotrienol === 0 ? null : input.betaTocotrienol.toString(),
        deltaTocopherol: input.deltaTocopherol === 0 ? null : input.deltaTocopherol.toString(),
        deltaTocotrienol: input.deltaTocotrienol === 0 ? null : input.deltaTocotrienol.toString(),
        gammaTocopherol: input.gammaTocopherol === 0 ? null : input.gammaTocopherol.toString(),
        gammaTocotrienol: input.gammaTocotrienol === 0 ? null : input.gammaTocotrienol.toString(),
        vitaminE: input.vitaminE === 0 ? null : input.vitaminE.toString()
      }),
      ctx.db.insert(ingredientAdditionThree).values({
        ingredientId: res[0]?.id,
        totalSaturatedFattyAcids: input.totalSaturatedFattyAcids === 0 ? null : input.totalSaturatedFattyAcids.toString(),
        totalMonounsaturatedFattyAcids: input.totalMonounsaturatedFattyAcids === 0 ? null : input.totalMonounsaturatedFattyAcids.toString(),
        totalPolyunsaturatedFattyAcids: input.totalPolyunsaturatedFattyAcids === 0 ? null : input.totalPolyunsaturatedFattyAcids.toString(),
        totalLongChainOmega3FattyAcids: input.totalLongChainOmega3FattyAcids === 0 ? null : input.totalLongChainOmega3FattyAcids.toString(),
        totalTransFattyAcids: input.totalTransFattyAcids === 0 ? null : input.totalTransFattyAcids.toString(),
        caffeine: input.caffeine === 0 ? null : input.caffeine.toString(),
        cholesterol: input.cholesterol === 0 ? null : input.cholesterol.toString(),
        alanine: input.alanine === 0 ? null : input.alanine.toString(),
        arginine: input.arginine === 0 ? null : input.arginine.toString(),
        asparticAcid: input.asparticAcid === 0 ? null : input.asparticAcid.toString(),
        cystinePlusCysteine: input.cystinePlusCysteine === 0 ? null : input.cystinePlusCysteine.toString(),
        glutamicAcid: input.glutamicAcid === 0 ? null : input.glutamicAcid.toString(),
        glycine: input.glycine === 0 ? null : input.glycine.toString(),
        histidine: input.histidine === 0 ? null : input.histidine.toString(),
        isoleucine: input.isoleucine === 0 ? null : input.isoleucine.toString(),
        leucine: input.leucine === 0 ? null : input.leucine.toString(),
        lysine: input.lysine === 0 ? null : input.lysine.toString(),
        methionine: input.methionine === 0 ? null : input.methionine.toString(),
        phenylalanine: input.phenylalanine === 0 ? null : input.phenylalanine.toString(),
        proline: input.proline === 0 ? null : input.proline.toString(),
        serine: input.serine === 0 ? null : input.serine.toString(),
        threonine: input.threonine === 0 ? null : input.threonine.toString(),
        tyrosine: input.tyrosine === 0 ? null : input.tyrosine.toString(),
        tryptophan: input.tryptophan === 0 ? null : input.tryptophan.toString(),
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
        totalSaturatedFattyAcidsEquated: input.totalSaturatedFattyAcidsEquated === 0 ? null : input.totalSaturatedFattyAcidsEquated.toString(),
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
        totalMonounsaturatedFattyAcidsEquated: input.totalMonounsaturatedFattyAcidsEquated === 0 ? null : input.totalMonounsaturatedFattyAcidsEquated.toString(),
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
        totalPolyunsaturatedFattyAcidsEquated: input.totalPolyunsaturatedFattyAcidsEquated === 0 ? null : input.totalPolyunsaturatedFattyAcidsEquated.toString()
      })
    ]);
    return res;
  })
});

// src/server/api/routers/tag.ts
import { and as and11, eq as eq17 } from "drizzle-orm";
import { z as z25 } from "zod";
var tagRouter = createTRPCRouter({
  getAllTagsCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.tag.findMany({
      where: eq17(tag.userId, ctx.session.user.id),
      orderBy: (data, { desc: desc11 }) => desc11(data.createdAt)
    });
    return res;
  }),
  create: protectedProcedure.input(
    z25.object({
      name: z25.string(),
      color: z25.string(),
      icon: z25.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(tag).values({
      name: input.name,
      color: input.color,
      icon: input.icon,
      userId: ctx.session.user.id
    });
    return res;
  }),
  updateTagToDailyLog: protectedProcedure.input(
    z25.object({
      tagId: z25.number(),
      dailyLogId: z25.number()
    })
  ).mutation(async ({ input, ctx }) => {
    const isTagged = await ctx.db.query.tagToDailyLog.findFirst({
      where: and11(
        eq17(tagToDailyLog.tagId, input.tagId),
        eq17(tagToDailyLog.dailyLogId, input.dailyLogId)
      )
    });
    if (isTagged) {
      await ctx.db.delete(tagToDailyLog).where(
        and11(
          eq17(tagToDailyLog.tagId, input.tagId),
          eq17(tagToDailyLog.dailyLogId, input.dailyLogId)
        )
      );
      return true;
    } else {
      const res = await ctx.db.insert(tagToDailyLog).values({
        tagId: input.tagId,
        dailyLogId: input.dailyLogId
      });
      return res;
    }
  }),
  delete: protectedProcedure.input(z25.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(tag).where(eq17(tag.id, input));
    return res;
  })
});

// src/server/api/routers/testing.ts
import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";

// node_modules/.pnpm/drizzle-dbml-generator@0.10.0_drizzle-orm@0.44.6_@libsql+client@0.15.11_@opentelemetry+api@1.9.0_gel@2.1.1_/node_modules/drizzle-dbml-generator/dist/index.js
import {
  One,
  Relations,
  SQL,
  createMany,
  createOne,
  getTableColumns,
  is,
  Column
} from "drizzle-orm";
import {
  ForeignKey as PgForeignKey,
  Index as PgIndex,
  PrimaryKey as PgPrimaryKey,
  UniqueConstraint as PgUniqueConstraint,
  isPgEnum,
  PgTable,
  Check as PgCheck
} from "drizzle-orm/pg-core";
import {
  ForeignKey as MySqlForeignKey,
  Index as MySqlIndex,
  PrimaryKey as MySqlPrimaryKey,
  MySqlTable,
  UniqueConstraint as MySqlUniqueConstraint,
  Check as MySqlCheck
} from "drizzle-orm/mysql-core";
import {
  ForeignKey as SQLiteForeignKey,
  Index as SQLiteIndex,
  PrimaryKey as SQLitePrimaryKey,
  SQLiteTable,
  UniqueConstraint as SQLiteUniqueConstraint,
  Check as SQLiteCheck
} from "drizzle-orm/sqlite-core";
import { CasingCache } from "drizzle-orm/casing";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { CasingCache as CasingCache2 } from "drizzle-orm/casing";
import { is as is2 } from "drizzle-orm";
import { MySqlColumnWithAutoIncrement } from "drizzle-orm/mysql-core";
import { CasingCache as CasingCache3 } from "drizzle-orm/casing";
import { is as is3, SQL as SQL2 } from "drizzle-orm";
import { SQLiteBaseInteger } from "drizzle-orm/sqlite-core";
import { CasingCache as CasingCache4 } from "drizzle-orm/casing";
var DBML = class {
  built = "";
  insert(str) {
    this.built += str;
    return this;
  }
  concatAll(strs) {
    for (let i = 0; i < strs.length; i++) {
      this.insert(strs[i]);
      this.newLine(2);
    }
    return this;
  }
  /**
   * Escapes characters that aren't allowed in DBML surrounding the input with double quotes
   */
  escapeSpaces(str) {
    this.built += /\W/.test(str) || /^[0-9_]/.test(str) ? `"${str}"` : str;
    return this;
  }
  escapeType(str) {
    this.built += str.includes(" ") || str.includes(")[") ? `"${str}"` : str;
    return this;
  }
  newLine(newLines = 1) {
    this.built += "\n".repeat(newLines);
    return this;
  }
  tab(tabs = 1) {
    this.built += " ".repeat(tabs * 2);
    return this;
  }
  build() {
    return this.built.trimEnd();
  }
};
function formatList(items, escapeName, escapeSpaces = false) {
  return items.reduce(
    (str, item) => `${str}, ${escapeSpaces && item.includes(" ") ? escapeName(item) : item}`,
    ""
  ).slice(2);
}
function wrapColumns(columns, escapeName) {
  const formatted = formatList(
    columns.map((column) => column.name),
    escapeName,
    true
  );
  return columns.length === 1 ? columns[0].name : `(${formatted})`;
}
function wrapColumnNames(columns, escapeName) {
  return columns.length === 1 ? columns[0] : `(${formatList(columns, escapeName)})`;
}
var AnyInlineForeignKeys = Symbol.for("drizzle:AnyInlineForeignKeys");
var PgInlineForeignKeys = Symbol.for("drizzle:PgInlineForeignKeys");
var MySqlInlineForeignKeys = Symbol.for("drizzle:MySqlInlineForeignKeys");
var SQLiteInlineForeignKeys = Symbol.for("drizzle:SQLiteInlineForeignKeys");
var TableName = Symbol.for("drizzle:Name");
var Schema = Symbol.for("drizzle:Schema");
var ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
var ExtraConfigColumns = Symbol.for("drizzle:ExtraConfigColumns");
var BaseGenerator = class {
  schema;
  relational;
  generatedRefs = [];
  InlineForeignKeys = AnyInlineForeignKeys;
  buildQueryConfig = {
    escapeName: () => "",
    escapeParam: () => "",
    escapeString: () => "",
    casing: new CasingCache()
  };
  constructor(schema, relational) {
    this.schema = schema;
    this.relational = relational;
  }
  isIncremental(_column) {
    return false;
  }
  mapDefaultValue(value) {
    let str = "";
    if (typeof value === "string") {
      str = `'${value}'`;
    } else if (typeof value === "boolean" || typeof value === "number") {
      str = `${value}`;
    } else if (value === null) {
      str = "null";
    } else if (value instanceof Date) {
      str = `'${value.toISOString().replace("T", " ").replace("Z", "")}'`;
    } else if (is(value, SQL)) {
      str = `\`${value.toQuery(this.buildQueryConfig).sql}\``;
    } else {
      str = `\`${JSON.stringify(value)}\``;
    }
    return str;
  }
  generateColumn(column) {
    const dbml = new DBML().tab().escapeSpaces(column.name).insert(" ").escapeType(column.getSQLType());
    const constraints = [];
    if (column.primary) {
      constraints.push("pk");
    }
    if (column.notNull) {
      constraints.push("not null");
    }
    if (column.isUnique) {
      constraints.push("unique");
    }
    if (this.isIncremental(column)) {
      constraints.push("increment");
    }
    if (column.default !== void 0) {
      constraints.push(`default: ${this.mapDefaultValue(column.default)}`);
    }
    if (constraints.length > 0) {
      dbml.insert(` [${formatList(constraints, this.buildQueryConfig.escapeName)}]`);
    }
    return dbml.build();
  }
  generateTable(table) {
    if (!this.relational) {
      this.generateForeignKeys(table[this.InlineForeignKeys]);
    }
    const dbml = new DBML().insert("table ");
    if (table[Schema]) {
      dbml.escapeSpaces(table[Schema]).insert(".");
    }
    dbml.escapeSpaces(table[TableName]).insert(" {").newLine();
    const columns = getTableColumns(table);
    for (const columnName in columns) {
      const column = columns[columnName];
      const columnDBML = this.generateColumn(column);
      dbml.insert(columnDBML).newLine();
    }
    const extraConfigBuilder = table[ExtraConfigBuilder];
    const extraConfigColumns = table[ExtraConfigColumns];
    const extraConfig = extraConfigBuilder?.(extraConfigColumns ?? {});
    const builtIndexes = (Array.isArray(extraConfig) ? extraConfig : Object.values(extraConfig ?? {})).map((b) => b?.build(table)).filter((b) => b !== void 0).filter((index12) => !(is(index12, PgCheck) || is(index12, MySqlCheck) || is(index12, SQLiteCheck)));
    const fks = builtIndexes.filter(
      (index12) => is(index12, PgForeignKey) || is(index12, MySqlForeignKey) || is(index12, SQLiteForeignKey)
    );
    if (!this.relational) {
      this.generateForeignKeys(fks);
    }
    if (extraConfigBuilder && builtIndexes.length > fks.length) {
      const indexes = extraConfig ?? {};
      dbml.newLine().tab().insert("indexes {").newLine();
      for (const indexName in indexes) {
        const index12 = indexes[indexName].build(table);
        dbml.tab(2);
        if (is(index12, PgIndex) || is(index12, MySqlIndex) || is(index12, SQLiteIndex)) {
          const configColumns = index12.config.columns.flatMap(
            (entry) => is(entry, SQL) ? entry.queryChunks.filter((v) => is(v, Column)) : entry
          );
          const idxColumns = wrapColumns(
            configColumns,
            this.buildQueryConfig.escapeName
          );
          const idxProperties = index12.config.name ? ` [name: '${index12.config.name}'${index12.config.unique ? ", unique" : ""}]` : "";
          dbml.insert(`${idxColumns}${idxProperties}`);
        }
        if (is(index12, PgPrimaryKey) || is(index12, MySqlPrimaryKey) || is(index12, SQLitePrimaryKey)) {
          const pkColumns = wrapColumns(index12.columns, this.buildQueryConfig.escapeName);
          dbml.insert(`${pkColumns} [pk]`);
        }
        if (is(index12, PgUniqueConstraint) || is(index12, MySqlUniqueConstraint) || is(index12, SQLiteUniqueConstraint)) {
          const uqColumns = wrapColumns(index12.columns, this.buildQueryConfig.escapeName);
          const uqProperties = index12.name ? `[name: '${index12.name}', unique]` : "[unique]";
          dbml.insert(`${uqColumns} ${uqProperties}`);
        }
        dbml.newLine();
      }
      dbml.tab().insert("}").newLine();
    }
    dbml.insert("}");
    return dbml.build();
  }
  generateEnum(_enum_) {
    return "";
  }
  generateForeignKeys(fks) {
    for (let i = 0; i < fks.length; i++) {
      const sourceTable = fks[i].table;
      const foreignTable = fks[i].reference().foreignTable;
      const sourceSchema = sourceTable[Schema];
      const foreignSchema = foreignTable[Schema];
      const sourceColumns = fks[i].reference().columns;
      const foreignColumns = fks[i].reference().foreignColumns;
      const dbml = new DBML().insert(`ref ${fks[i].getName()}: `);
      if (sourceSchema) {
        dbml.escapeSpaces(sourceSchema).insert(".");
      }
      dbml.escapeSpaces(sourceTable[TableName]).insert(".").insert(wrapColumns(sourceColumns, this.buildQueryConfig.escapeName)).insert(" > ");
      if (foreignSchema) {
        dbml.escapeSpaces(foreignSchema).insert(".");
      }
      dbml.escapeSpaces(foreignTable[TableName]).insert(".").insert(wrapColumns(foreignColumns, this.buildQueryConfig.escapeName));
      const actions = [
        `delete: ${fks[i].onDelete || "no action"}`,
        `update: ${fks[i].onUpdate || "no action"}`
      ];
      const actionsStr = ` [${formatList(actions, this.buildQueryConfig.escapeName)}]`;
      dbml.insert(actionsStr);
      this.generatedRefs.push(dbml.build());
    }
  }
  generateRelations(relations_) {
    const left = {};
    const right = {};
    for (let i = 0; i < relations_.length; i++) {
      const relations12 = relations_[i].config({
        one: createOne(relations_[i].table),
        many: createMany(relations_[i].table)
      });
      for (const relationName in relations12) {
        const relation = relations12[relationName];
        const tableNames = [
          relations_[i].table[TableName],
          relation.referencedTableName
        ].sort();
        const key = `${tableNames[0]}-${tableNames[1]}${relation.relationName ? `-${relation.relationName}` : ""}`;
        if (is(relation, One) && relation.config?.references.length || 0 > 0) {
          left[key] = {
            type: "one",
            sourceSchema: relation.sourceTable[Schema],
            sourceTable: relation.sourceTable[TableName],
            sourceColumns: relation.config?.fields.map((col) => col.name) || [],
            foreignSchema: relation.referencedTable[Schema],
            foreignTable: relation.referencedTableName,
            foreignColumns: relation.config?.references.map((col) => col.name) || []
          };
        } else {
          right[key] = {
            type: is(relation, One) ? "one" : "many"
          };
        }
      }
    }
    for (const key in left) {
      const sourceSchema = left[key].sourceSchema || "";
      const sourceTable = left[key].sourceTable || "";
      const foreignSchema = left[key].foreignSchema || "";
      const foreignTable = left[key].foreignTable || "";
      const sourceColumns = left[key].sourceColumns || [];
      const foreignColumns = left[key].foreignColumns || [];
      const relationType = right[key]?.type || "one";
      if (sourceColumns.length === 0 || foreignColumns.length === 0) {
        throw Error(
          `Not enough information was provided to create relation between "${sourceTable}" and "${foreignTable}"`
        );
      }
      const dbml = new DBML().insert("ref: ");
      if (sourceSchema) {
        dbml.escapeSpaces(sourceSchema).insert(".");
      }
      dbml.escapeSpaces(sourceTable).insert(".").insert(wrapColumnNames(sourceColumns, this.buildQueryConfig.escapeName)).insert(` ${relationType === "one" ? "-" : ">"} `);
      if (foreignSchema) {
        dbml.escapeSpaces(foreignSchema).insert(".");
      }
      dbml.escapeSpaces(foreignTable).insert(".").insert(wrapColumnNames(foreignColumns, this.buildQueryConfig.escapeName));
      this.generatedRefs.push(dbml.build());
    }
  }
  generate() {
    const generatedEnums = [];
    const generatedTables = [];
    const relations12 = [];
    for (const key in this.schema) {
      const value = this.schema[key];
      if (isPgEnum(value)) {
        generatedEnums.push(this.generateEnum(value));
      } else if (is(value, PgTable) || is(value, MySqlTable) || is(value, SQLiteTable)) {
        generatedTables.push(this.generateTable(value));
      } else if (is(value, Relations)) {
        relations12.push(value);
      }
    }
    if (this.relational) {
      this.generateRelations(relations12);
    }
    const dbml = new DBML().concatAll(generatedEnums).concatAll(generatedTables).concatAll(this.generatedRefs).build();
    return dbml;
  }
};
function writeDBMLFile(dbml, outPath) {
  const path = resolve(process.cwd(), outPath);
  try {
    writeFileSync(path, dbml, { encoding: "utf-8" });
  } catch (err) {
    console.error("An error ocurred while writing the generated DBML");
    throw err;
  }
}
var PgGenerator = class extends BaseGenerator {
  InlineForeignKeys = PgInlineForeignKeys;
  buildQueryConfig = {
    escapeName: (name) => `"${name}"`,
    escapeParam: (num) => `$${num + 1}`,
    escapeString: (str) => `'${str.replace(/'/g, "''")}'`,
    casing: new CasingCache2()
  };
  isIncremental(column) {
    return column.getSQLType().includes("serial");
  }
  generateEnum(enum_) {
    const dbml = new DBML().insert("enum ").escapeSpaces(enum_.enumName).insert(" {").newLine();
    for (let i = 0; i < enum_.enumValues.length; i++) {
      dbml.tab().escapeSpaces(enum_.enumValues[i]).newLine();
    }
    dbml.insert("}");
    return dbml.build();
  }
};
function pgGenerate(options) {
  options.relational ||= false;
  const dbml = new PgGenerator(options.schema, options.relational).generate();
  options.out && writeDBMLFile(dbml, options.out);
  return dbml;
}

// src/server/api/routers/testing.ts
var testRouter = createTRPCRouter({
  createDBMap: protectedProcedure.mutation(async ({ ctx }) => {
    const out = "./schema.dbml";
    const relational = true;
    pgGenerate({ schema: schema_exports, out, relational });
    return true;
  }),
  generateGroceryStores: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.insert(groceryStore).values([
      {
        name: "Coles"
      },
      {
        name: "Woolworths"
      },
      {
        name: "IGA"
      }
    ]);
    return res;
  }),
  deleteAllIngredients: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(ingredient);
    return res;
  }),
  importAFCDLiquid: protectedProcedure.mutation(async ({ ctx }) => {
    const file = readFileSync("./src/server/data/ingredient-liquid.csv", "utf8");
    const csvData = parse(file, {
      columns: true,
      skip_empty_lines: true
    });
    const user2 = await db.query.user.findFirst({
      where: (user3, { eq: eq30 }) => eq30(user3.email, "renn@warner.systems"),
      columns: {
        id: true
      }
    });
    const r = await ctx.db.insert(ingredient).values(
      // @ts-ignore
      csvData.map((row) => ({
        userId: user2?.id ?? "",
        serveSize: "100",
        serveUnit: "mls",
        isAusFood: true,
        isAllStores: true,
        publicFoodKey: row["Public Food Key"],
        classification: row["Classification"],
        foodName: row["Food name"],
        name: row["Food name"],
        caloriesWFibre: (Number(row["Energy with dietary fibre, equated \n(kJ)"]) * 0.239).toFixed(2),
        caloriesWOFibre: (Number(row["Energy, without dietary fibre, equated \n(kJ)"]) * 0.239).toFixed(2),
        protein: row["Protein \n(g)"],
        fatTotal: row["Fat, total \n(g)"],
        totalDietaryFibre: row["Total dietary fibre \n(g)"],
        totalSugars: row["Total sugars (g)"],
        starch: row["Starch \n(g)"],
        resistantStarch: row["Resistant starch \n(g)"],
        availableCarbohydrateWithoutSugarAlcohols: row["Available carbohydrate, without sugar alcohols \n(g)"],
        availableCarbohydrateWithSugarAlcohols: row["Available carbohydrate, with sugar alcohols \n(g)"]
      }))
    ).returning({
      id: ingredient.id,
      publicFoodKey: ingredient.publicFoodKey
    });
    console.log(r);
    const insertOne = async (csv) => {
      await ctx.db.insert(ingredientAdditionOne).values(
        // @ts-ignore
        csv.map((row) => ({
          ingredientId: r.find((i) => i.publicFoodKey == row["Public Food Key"])?.id || null,
          energyWithDietaryFibre: row["Energy with dietary fibre, equated \n(kJ)"],
          energyWithoutDietaryFibre: row["Energy, without dietary fibre, equated \n(kJ)"],
          addedSugars: row["Added sugars (g)"],
          freeSugars: row["Free sugars \n(g)"],
          moisture: row["Moisture (water) \n(g)"],
          nitrogen: row["Nitrogen \n(g)"],
          alcohol: row["Alcohol \n(g)"],
          fructose: row["Fructose \n(g)"],
          glucose: row["Glucose \n(g)"],
          sucrose: row["Sucrose\n(g)"],
          maltose: row["Maltose \n(g)"],
          lactose: row["Lactose \n(g)"],
          galactose: row["Galactose \n(g)"],
          maltotrios: row["Maltotrios \n(g)"],
          ash: row["Ash \n(g)"],
          dextrin: row["Dextrin \n(g)"],
          glycerol: row["Glycerol \n(g)"],
          glycogen: row["Glycogen \n(g)"],
          inulin: row["Inulin \n(g)"],
          erythritol: row["Erythritol \n(g)"],
          maltitol: row["Maltitol \n(g)"],
          mannitol: row["Mannitol \n(g)"],
          xylitol: row["Xylitol \n(g)"],
          maltodextrin: row["Maltodextrin (g)"],
          oligosaccharides: row["Oligosaccharides  \n(g)"],
          polydextrose: row["Polydextrose \n(g)"],
          raffinose: row["Raffinose \n(g)"],
          stachyose: row["Stachyose \n(g)"],
          sorbitol: row["Sorbitol \n(g)"]
        }))
      );
    };
    await insertOne(csvData);
    const insertTwo = async (csv) => {
      await ctx.db.insert(ingredientAdditionTwo).values(
        // @ts-ignore
        csv.map((row) => ({
          ingredientId: r.find((i) => i.publicFoodKey == row["Public Food Key"])?.id || null,
          aceticAcid: row["Acetic acid \n(g)"],
          citricAcid: row["Citric acid \n(g)"],
          fumaricAcid: row["Fumaric acid \n(g)"],
          lacticAcid: row["Lactic acid \n(g)"],
          malicAcid: row["Malic acid\n (g)"],
          oxalicAcid: row["Oxalic acid \n(g)"],
          propionicAcid: row["Propionic acid \n(g)"],
          quinicAcid: row["Quinic acid \n(g)"],
          shikimicAcid: row["Shikimic acid \n(g)"],
          succinicAcid: row["Succinic acid \n(g)"],
          tartaricAcid: row["Tartaric acid \n(g)"],
          aluminium: row["Aluminium (Al) \n(ug)"],
          antimony: row["Antimony (Sb) \n(ug)"],
          arsenic: row["Arsenic (As) \n(ug)"],
          cadmium: row["Cadmium (Cd) \n(ug)"],
          calcium: row["Calcium (Ca) \n(mg)"],
          chromium: row["Chromium (Cr) \n(ug)"],
          chloride: row["Chloride (Cl) \n(mg)"],
          cobalt: row["Cobalt (Co) \n(ug)"],
          copper: row["Copper (Cu) \n(mg)"],
          fluoride: row["Fluoride (F) \n(ug)"],
          iodine: row["Iodine (I) \n(ug)"],
          iron: row["Iron (Fe) \n(mg)"],
          lead: row["Lead (Pb) \n(ug)"],
          magnesium: row["Magnesium (Mg) \n(mg)"],
          manganese: row["Manganese (Mn) \n(mg)"],
          mercury: row["Mercury (Hg) \n(ug)"],
          molybdenum: row["Molybdenum (Mo) \n(ug)"],
          nickel: row["Nickel (Ni) \n(ug)"],
          phosphorus: row["Phosphorus (P) \n(mg)"],
          potassium: row["Potassium (K) \n(mg)"],
          selenium: row["Selenium (Se) \n(ug)"],
          sodium: row["Sodium (Na) \n(mg)"],
          sulphur: row["Sulphur (S) \n(mg)"],
          tin: row["Tin (Sn) \n(ug)"],
          zinc: row["Zinc (Zn) \n(mg)"],
          retinol: row["Retinol (preformed vitamin A) \n(ug)"],
          alphaCarotene: row["Alpha-carotene \n(ug)"],
          betaCarotene: row["Beta-carotene \n(ug)"],
          cryptoxanthin: row["Cryptoxanthin \n(ug)"],
          betaCaroteneEquivalents: row["Beta-carotene equivalents (provitamin A) \n(ug)"],
          vitaminARetinolEquivalents: row["Vitamin A retinol equivalents \n(ug)"],
          lutein: row["Lutein \n(ug)"],
          lycopene: row["Lycopene \n(ug)"],
          xanthophyl: row["Xanthophyl \n(ug)"],
          thiamin: row["Thiamin (B1) \n(mg)"],
          riboflavin: row["Riboflavin (B2) \n(mg)"],
          niacin: row["Niacin (B3) \n(mg)"],
          niacinDerivedFromTryptophan: row["Niacin derived from tryptophan \n(mg)"],
          niacinDerivedEquivalents: row["Niacin derived equivalents \n(mg)"],
          pantothenicAcid: row["Pantothenic acid (B5) \n(mg)"],
          pyridoxine: row["Pyridoxine (B6) \n(mg)"],
          biotin: row["Biotin (B7) \n(ug)"],
          cobalamin: row["Cobalamin (B12) \n(ug)"],
          folateNatural: row["Folate, natural \n(ug)"],
          folicAcid: row["Folic acid \n(ug)"],
          totalFolates: row["Total folates \n(ug)"],
          dietaryFolateEquivalents: row["Dietary folate equivalents \n(ug)"],
          vitaminC: row["Vitamin C \n(mg)"],
          cholecalciferol: row["Cholecalciferol (D3) \n(ug)"],
          ergocalciferol: row["Ergocalciferol (D2) \n(ug)"],
          hydroxyCholecalciferol: row["25-hydroxy cholecalciferol (25-OH D3) \n(ug)"],
          hydroxyErgocalciferol: row["25-hydroxy ergocalciferol (25-OH D2) \n(ug)"],
          vitaminDEquivalents: row["Vitamin D3 equivalents \n(ug)"],
          alphaTocopherol: row["Alpha tocopherol \n(mg)"],
          alphaTocotrienol: row["Alpha tocotrienol \n(mg)"],
          betaTocopherol: row["Beta tocopherol \n(mg)"],
          betaTocotrienol: row["Beta tocotrienol \n(mg)"],
          deltaTocopherol: row["Delta tocopherol \n(mg)"],
          deltaTocotrienol: row["Delta tocotrienol \n(mg)"],
          gammaTocopherol: row["Gamma tocopherol \n(mg)"],
          gammaTocotrienol: row["Gamma tocotrienol \n(mg)"],
          vitaminE: row["Vitamin E \n(mg)"]
        }))
      );
    };
    await insertTwo(csvData);
    const insertThree = async (csv) => {
      await ctx.db.insert(ingredientAdditionThree).values(
        // @ts-ignore
        csv.map((row) => ({
          ingredientId: r.find((i) => i.publicFoodKey == row["Public Food Key"])?.id || null,
          totalSaturatedFattyAcids: row["Total saturated fatty acids, equated (%T)"],
          totalMonounsaturatedFattyAcids: row["Total monounsaturated fatty acids, equated (%T)"],
          totalPolyunsaturatedFattyAcids: row["Total polyunsaturated fatty acids, equated (%T)"],
          totalLongChainOmega3FattyAcids: row["Total long chain omega 3 fatty acids, equated \n(%T)"],
          totalTransFattyAcids: row["Total trans fatty acids, imputed \n(%T)"],
          caffeine: row["Caffeine \n(mg)"],
          cholesterol: row["Cholesterol \n(mg)"],
          alanine: row["Alanine \n(mg/gN)"],
          arginine: row["Arginine \n(mg/gN)"],
          asparticAcid: row["Aspartic acid \n(mg/gN)"],
          cystinePlusCysteine: row["Cystine plus cysteine \n(mg/gN)"],
          glutamicAcid: row["Glutamic acid \n(mg/gN)"],
          glycine: row["Glycine \n(mg/gN)"],
          histidine: row["Histidine \n(mg/gN)"],
          isoleucine: row["Isoleucine \n(mg/gN)"],
          leucine: row["Leucine \n(mg/gN)"],
          lysine: row["Lysine \n(mg/gN)"],
          methionine: row["Methionine \n(mg/gN)"],
          phenylalanine: row["Phenylalanine \n(mg/gN)"],
          proline: row["Proline \n(mg/gN)"],
          serine: row["Serine \n(mg/gN)"],
          threonine: row["Threonine \n(mg/gN)"],
          tyrosine: row["Tyrosine \n(mg/gN)"],
          tryptophan: row["Tryptophan \n(mg/gN)"],
          valine: row["Valine \n(mg/gN)"],
          c4: row["C4 (%T)"],
          c6: row["C6 (%T)"],
          c8: row["C8 (%T)"],
          c10: row["C10 (%T)"],
          c11: row["C11 (%T)"],
          c12: row["C12 (%T)"],
          c13: row["C13 (%T)"],
          c14: row["C14 (%T)"],
          c15: row["C15 (%T)"],
          c16: row["C16 (%T)"],
          c17: row["C17 (%T)"],
          c18: row["C18 (%T)"],
          c19: row["C19 (%T)"],
          c20: row["C20 (%T)"],
          c21: row["C21 (%T)"],
          c22: row["C22 (%T)"],
          c23: row["C23 (%T)"],
          c24: row["C24 (%T)"],
          totalSaturatedFattyAcidsEquated: row["Total saturated fatty acids, equated (%T)"],
          c10_1: row["C10:1 (%T)"],
          c12_1: row["C12:1 (%T)"],
          c14_1: row["C14:1 (%T)"],
          c15_1: row["C15:1 (%T)"],
          c16_1: row["C16:1 (%T)"],
          c17_1: row["C17:1 (%T)"],
          c18_1: row["C18:1 (%T)"],
          c18_1w5: row["C18:1w5 (%T)"],
          c18_1w6: row["C18:1w6 (%T)"],
          c18_1w7: row["C18:1w7 (%T)"],
          c18_1w9: row["C18:1w9 (%T)"],
          c20_1: row["C20:1 (%T)"],
          c20_1w9: row["C20:1w9 (%T)"],
          c20_1w13: row["C20:1w13 (%T)"],
          c20_1w11: row["C20:1w11 (%T)"],
          c22_1: row["C22:1 (%T)"],
          c22_1w9: row["C22:1w9 (%T)"],
          c22_1w11: row["C22:1w11 (%T)"],
          c24_1: row["C24:1 (%T)"],
          c24_1w9: row["C24:1w9 (%T)"],
          c24_1w11: row["C24:1w11 (%T)"],
          c24_1w13: row["C24:1w13 (%T)"],
          totalMonounsaturatedFattyAcidsEquated: row["Total monounsaturated fatty acids, equated (%T)"],
          c12_2: row["C12:2 (%T)"],
          c16_2w4: row["C16:2w4 (%T)"],
          c16_3: row["C16:3 (%T)"],
          c18_2w6: row["C18:2w6 (%T)"],
          c18_3w3: row["C18:3w3 (%T)"],
          c18_3w4: row["C18:3w4 (%T)"],
          c18_3w6: row["C18:3w6 (%T)"],
          c18_4w1: row["C18:4w1 (%T)"],
          c18_4w3: row["C18:4w3 (%T)"],
          c20_2: row["C20:2 (%T)"],
          c20_2w6: row["C20:2w6 (%T)"],
          c20_3: row["C20:3 (%T)"],
          c20_3w3: row["C20:3w3 (%T)"],
          c20_3w6: row["C20:3w6 (%T)"],
          c20_4: row["C20:4 (%T)"],
          c20_4w3: row["C20:4w3 (%T)"],
          c20_4w6: row["C20:4w6 (%T)"],
          c20_5w3: row["C20:5w3 (%T)"],
          c21_5w3: row["C21:5w3 (%T)"],
          c22_2: row["C22:2 (%T)"],
          c22_2w6: row["C22:2w6 (%T)"],
          c22_4w6: row["C22:4w6 (%T)"],
          c22_5w3: row["C22:5w3 (%T)"],
          c22_5w6: row["C22:5w6 (%T)"],
          c22_6w3: row["C22:6w3 (%T)"],
          totalPolyunsaturatedFattyAcidsEquated: row["Total polyunsaturated fatty acids, equated (%T)"]
        }))
      );
    };
    await insertThree(csvData);
    return r;
  }),
  importAFCDSolid: protectedProcedure.mutation(async ({ ctx }) => {
    const file = readFileSync("./src/server/data/ingredient-solid.csv", "utf8");
    const csvData = parse(file, {
      columns: true,
      skip_empty_lines: true
    });
    const csv1 = csvData.slice(0, 200);
    const csv2 = csvData.slice(200, 400);
    const csv3 = csvData.slice(400, 600);
    const csv4 = csvData.slice(600, 800);
    const csv5 = csvData.slice(800, 1e3);
    const csv6 = csvData.slice(1e3, 1200);
    const csv7 = csvData.slice(1200, 1400);
    const csv8 = csvData.slice(1400, csvData.length);
    const user2 = await db.query.user.findFirst({
      where: (user3, { eq: eq30 }) => eq30(user3.email, "renn@warner.systems"),
      columns: {
        id: true
      }
    });
    const r = await ctx.db.insert(ingredient).values(
      // @ts-ignore
      csvData.map((row) => ({
        userId: user2?.id ?? "",
        serveSize: "100",
        serveUnit: "grams",
        isAusFood: true,
        publicFoodKey: row["Public Food Key"],
        classification: row["Classification"],
        foodName: row["Food Name"],
        name: row["Food Name"],
        caloriesWFibre: (Number(row["Energy with dietary fibre, equated \n(kJ)"]) * 0.239).toFixed(2),
        caloriesWOFibre: (Number(row["Energy, without dietary fibre, equated \n(kJ)"]) * 0.239).toFixed(2),
        protein: row["Protein \n(g)"],
        fatTotal: row["Fat, total \n(g)"],
        totalDietaryFibre: row["Total dietary fibre \n(g)"],
        totalSugars: row["Total sugars (g)"],
        starch: row["Starch \n(g)"],
        resistantStarch: row["Resistant starch \n(g)"],
        availableCarbohydrateWithoutSugarAlcohols: row["Available carbohydrate, without sugar alcohols \n(g)"],
        availableCarbohydrateWithSugarAlcohols: row["Available carbohydrate, with sugar alcohols \n(g)"]
      }))
    ).returning({
      id: ingredient.id,
      publicFoodKey: ingredient.publicFoodKey
    });
    console.log(r);
    const insertOne = async (csv) => {
      await ctx.db.insert(ingredientAdditionOne).values(
        // @ts-ignore
        csv.map((row) => ({
          ingredientId: r.find((i) => i.publicFoodKey == row["Public Food Key"])?.id || null,
          energyWithDietaryFibre: row["Energy with dietary fibre, equated \n(kJ)"],
          energyWithoutDietaryFibre: row["Energy, without dietary fibre, equated \n(kJ)"],
          addedSugars: row["Added sugars (g)"],
          freeSugars: row["Free sugars \n(g)"],
          moisture: row["Moisture (water) \n(g)"],
          nitrogen: row["Nitrogen \n(g)"],
          alcohol: row["Alcohol \n(g)"],
          fructose: row["Fructose \n(g)"],
          glucose: row["Glucose \n(g)"],
          sucrose: row["Sucrose\n(g)"],
          maltose: row["Maltose \n(g)"],
          lactose: row["Lactose \n(g)"],
          galactose: row["Galactose \n(g)"],
          maltotrios: row["Maltotrios \n(g)"],
          ash: row["Ash \n(g)"],
          dextrin: row["Dextrin \n(g)"],
          glycerol: row["Glycerol \n(g)"],
          glycogen: row["Glycogen \n(g)"],
          inulin: row["Inulin \n(g)"],
          erythritol: row["Erythritol \n(g)"],
          maltitol: row["Maltitol \n(g)"],
          mannitol: row["Mannitol \n(g)"],
          xylitol: row["Xylitol \n(g)"],
          maltodextrin: row["Maltodextrin (g)"],
          oligosaccharides: row["Oligosaccharides  \n(g)"],
          polydextrose: row["Polydextrose \n(g)"],
          raffinose: row["Raffinose \n(g)"],
          stachyose: row["Stachyose \n(g)"],
          sorbitol: row["Sorbitol \n(g)"]
        }))
      );
    };
    await insertOne(csv1);
    await insertOne(csv2);
    await insertOne(csv3);
    await insertOne(csv4);
    await insertOne(csv5);
    await insertOne(csv6);
    await insertOne(csv7);
    await insertOne(csv8);
    const insertTwo = async (csv) => {
      await ctx.db.insert(ingredientAdditionTwo).values(
        // @ts-ignore
        csv.map((row) => ({
          ingredientId: r.find((i) => i.publicFoodKey == row["Public Food Key"])?.id || null,
          aceticAcid: row["Acetic acid \n(g)"],
          citricAcid: row["Citric acid \n(g)"],
          fumaricAcid: row["Fumaric acid \n(g)"],
          lacticAcid: row["Lactic acid \n(g)"],
          malicAcid: row["Malic acid\n (g)"],
          oxalicAcid: row["Oxalic acid \n(g)"],
          propionicAcid: row["Propionic acid \n(g)"],
          quinicAcid: row["Quinic acid \n(g)"],
          shikimicAcid: row["Shikimic acid \n(g)"],
          succinicAcid: row["Succinic acid \n(g)"],
          tartaricAcid: row["Tartaric acid \n(g)"],
          aluminium: row["Aluminium (Al) \n(ug)"],
          antimony: row["Antimony (Sb) \n(ug)"],
          arsenic: row["Arsenic (As) \n(ug)"],
          cadmium: row["Cadmium (Cd) \n(ug)"],
          calcium: row["Calcium (Ca) \n(mg)"],
          chromium: row["Chromium (Cr) \n(ug)"],
          chloride: row["Chloride (Cl) \n(mg)"],
          cobalt: row["Cobalt (Co) \n(ug)"],
          copper: row["Copper (Cu) \n(mg)"],
          fluoride: row["Fluoride (F) \n(ug)"],
          iodine: row["Iodine (I) \n(ug)"],
          iron: row["Iron (Fe) \n(mg)"],
          lead: row["Lead (Pb) \n(ug)"],
          magnesium: row["Magnesium (Mg) \n(mg)"],
          manganese: row["Manganese (Mn) \n(mg)"],
          mercury: row["Mercury (Hg) \n(ug)"],
          molybdenum: row["Molybdenum (Mo) \n(ug)"],
          nickel: row["Nickel (Ni) \n(ug)"],
          phosphorus: row["Phosphorus (P) \n(mg)"],
          potassium: row["Potassium (K) \n(mg)"],
          selenium: row["Selenium (Se) \n(ug)"],
          sodium: row["Sodium (Na) \n(mg)"],
          sulphur: row["Sulphur (S) \n(mg)"],
          tin: row["Tin (Sn) \n(ug)"],
          zinc: row["Zinc (Zn) \n(mg)"],
          retinol: row["Retinol (preformed vitamin A) \n(ug)"],
          alphaCarotene: row["Alpha-carotene \n(ug)"],
          betaCarotene: row["Beta-carotene \n(ug)"],
          cryptoxanthin: row["Cryptoxanthin \n(ug)"],
          betaCaroteneEquivalents: row["Beta-carotene equivalents (provitamin A) \n(ug)"],
          vitaminARetinolEquivalents: row["Vitamin A retinol equivalents \n(ug)"],
          lutein: row["Lutein \n(ug)"],
          lycopene: row["Lycopene \n(ug)"],
          xanthophyl: row["Xanthophyl \n(ug)"],
          thiamin: row["Thiamin (B1) \n(mg)"],
          riboflavin: row["Riboflavin (B2) \n(mg)"],
          niacin: row["Niacin (B3) \n(mg)"],
          niacinDerivedFromTryptophan: row["Niacin derived from tryptophan \n(mg)"],
          niacinDerivedEquivalents: row["Niacin derived equivalents \n(mg)"],
          pantothenicAcid: row["Pantothenic acid (B5) \n(mg)"],
          pyridoxine: row["Pyridoxine (B6) \n(mg)"],
          biotin: row["Biotin (B7) \n(ug)"],
          cobalamin: row["Cobalamin (B12) \n(ug)"],
          folateNatural: row["Folate, natural \n(ug)"],
          folicAcid: row["Folic acid \n(ug)"],
          totalFolates: row["Total folates \n(ug)"],
          dietaryFolateEquivalents: row["Dietary folate equivalents \n(ug)"],
          vitaminC: row["Vitamin C \n(mg)"],
          cholecalciferol: row["Cholecalciferol (D3) \n(ug)"],
          ergocalciferol: row["Ergocalciferol (D2) \n(ug)"],
          hydroxyCholecalciferol: row["25-hydroxy cholecalciferol (25-OH D3) \n(ug)"],
          hydroxyErgocalciferol: row["25-hydroxy ergocalciferol (25-OH D2) \n(ug)"],
          vitaminDEquivalents: row["Vitamin D3 equivalents \n(ug)"],
          alphaTocopherol: row["Alpha tocopherol \n(mg)"],
          alphaTocotrienol: row["Alpha tocotrienol \n(mg)"],
          betaTocopherol: row["Beta tocopherol \n(mg)"],
          betaTocotrienol: row["Beta tocotrienol \n(mg)"],
          deltaTocopherol: row["Delta tocopherol \n(mg)"],
          deltaTocotrienol: row["Delta tocotrienol \n(mg)"],
          gammaTocopherol: row["Gamma tocopherol \n(mg)"],
          gammaTocotrienol: row["Gamma tocotrienol \n(mg)"],
          vitaminE: row["Vitamin E \n(mg)"]
        }))
      );
    };
    await insertTwo(csv1);
    await insertTwo(csv2);
    await insertTwo(csv3);
    await insertTwo(csv4);
    await insertTwo(csv5);
    await insertTwo(csv6);
    await insertTwo(csv7);
    await insertTwo(csv8);
    const insertThree = async (csv) => {
      await ctx.db.insert(ingredientAdditionThree).values(
        // @ts-ignore
        csv.map((row) => ({
          ingredientId: r.find((i) => i.publicFoodKey == row["Public Food Key"])?.id || null,
          totalSaturatedFattyAcids: row["Total saturated fatty acids, equated (%T)"],
          totalMonounsaturatedFattyAcids: row["Total monounsaturated fatty acids, equated (%T)"],
          totalPolyunsaturatedFattyAcids: row["Total polyunsaturated fatty acids, equated (%T)"],
          totalLongChainOmega3FattyAcids: row["Total long chain omega 3 fatty acids, equated \n(%T)"],
          totalTransFattyAcids: row["Total trans fatty acids, imputed \n(%T)"],
          caffeine: row["Caffeine \n(mg)"],
          cholesterol: row["Cholesterol \n(mg)"],
          alanine: row["Alanine \n(mg/gN)"],
          arginine: row["Arginine \n(mg/gN)"],
          asparticAcid: row["Aspartic acid \n(mg/gN)"],
          cystinePlusCysteine: row["Cystine plus cysteine \n(mg/gN)"],
          glutamicAcid: row["Glutamic acid \n(mg/gN)"],
          glycine: row["Glycine \n(mg/gN)"],
          histidine: row["Histidine \n(mg/gN)"],
          isoleucine: row["Isoleucine \n(mg/gN)"],
          leucine: row["Leucine \n(mg/gN)"],
          lysine: row["Lysine \n(mg/gN)"],
          methionine: row["Methionine \n(mg/gN)"],
          phenylalanine: row["Phenylalanine \n(mg/gN)"],
          proline: row["Proline \n(mg/gN)"],
          serine: row["Serine \n(mg/gN)"],
          threonine: row["Threonine \n(mg/gN)"],
          tyrosine: row["Tyrosine \n(mg/gN)"],
          tryptophan: row["Tryptophan \n(mg/gN)"],
          valine: row["Valine \n(mg/gN)"],
          c4: row["C4 (%T)"],
          c6: row["C6 (%T)"],
          c8: row["C8 (%T)"],
          c10: row["C10 (%T)"],
          c11: row["C11 (%T)"],
          c12: row["C12 (%T)"],
          c13: row["C13 (%T)"],
          c14: row["C14 (%T)"],
          c15: row["C15 (%T)"],
          c16: row["C16 (%T)"],
          c17: row["C17 (%T)"],
          c18: row["C18 (%T)"],
          c19: row["C19 (%T)"],
          c20: row["C20 (%T)"],
          c21: row["C21 (%T)"],
          c22: row["C22 (%T)"],
          c23: row["C23 (%T)"],
          c24: row["C24 (%T)"],
          totalSaturatedFattyAcidsEquated: row["Total saturated fatty acids, equated (%T)"],
          c10_1: row["C10:1 (%T)"],
          c12_1: row["C12:1 (%T)"],
          c14_1: row["C14:1 (%T)"],
          c15_1: row["C15:1 (%T)"],
          c16_1: row["C16:1 (%T)"],
          c17_1: row["C17:1 (%T)"],
          c18_1: row["C18:1 (%T)"],
          c18_1w5: row["C18:1w5 (%T)"],
          c18_1w6: row["C18:1w6 (%T)"],
          c18_1w7: row["C18:1w7 (%T)"],
          c18_1w9: row["C18:1w9 (%T)"],
          c20_1: row["C20:1 (%T)"],
          c20_1w9: row["C20:1w9 (%T)"],
          c20_1w13: row["C20:1w13 (%T)"],
          c20_1w11: row["C20:1w11 (%T)"],
          c22_1: row["C22:1 (%T)"],
          c22_1w9: row["C22:1w9 (%T)"],
          c22_1w11: row["C22:1w11 (%T)"],
          c24_1: row["C24:1 (%T)"],
          c24_1w9: row["C24:1w9 (%T)"],
          c24_1w11: row["C24:1w11 (%T)"],
          c24_1w13: row["C24:1w13 (%T)"],
          totalMonounsaturatedFattyAcidsEquated: row["Total monounsaturated fatty acids, equated (%T)"],
          c12_2: row["C12:2 (%T)"],
          c16_2w4: row["C16:2w4 (%T)"],
          c16_3: row["C16:3 (%T)"],
          c18_2w6: row["C18:2w6 (%T)"],
          c18_3w3: row["C18:3w3 (%T)"],
          c18_3w4: row["C18:3w4 (%T)"],
          c18_3w6: row["C18:3w6 (%T)"],
          c18_4w1: row["C18:4w1 (%T)"],
          c18_4w3: row["C18:4w3 (%T)"],
          c20_2: row["C20:2 (%T)"],
          c20_2w6: row["C20:2w6 (%T)"],
          c20_3: row["C20:3 (%T)"],
          c20_3w3: row["C20:3w3 (%T)"],
          c20_3w6: row["C20:3w6 (%T)"],
          c20_4: row["C20:4 (%T)"],
          c20_4w3: row["C20:4w3 (%T)"],
          c20_4w6: row["C20:4w6 (%T)"],
          c20_5w3: row["C20:5w3 (%T)"],
          c21_5w3: row["C21:5w3 (%T)"],
          c22_2: row["C22:2 (%T)"],
          c22_2w6: row["C22:2w6 (%T)"],
          c22_4w6: row["C22:4w6 (%T)"],
          c22_5w3: row["C22:5w3 (%T)"],
          c22_5w6: row["C22:5w6 (%T)"],
          c22_6w3: row["C22:6w3 (%T)"],
          totalPolyunsaturatedFattyAcidsEquated: row["Total polyunsaturated fatty acids, equated (%T)"]
        }))
      );
    };
    await insertThree(csv1);
    await insertThree(csv2);
    await insertThree(csv3);
    await insertThree(csv4);
    await insertThree(csv5);
    await insertThree(csv6);
    await insertThree(csv7);
    await insertThree(csv8);
    return r;
  })
});

// src/server/api/routers/trainer.ts
import { and as and12, eq as eq18 } from "drizzle-orm";
import { z as z26 } from "zod";
var createLog5 = async ({
  user: user2,
  task,
  notes,
  userId,
  objectId
}) => {
  await db.insert(log).values({
    task,
    notes,
    user: user2,
    userId,
    objectId
  });
};
var trainerRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.user.findMany({
      where: (user2, { eq: eq30 }) => eq30(user2.isTrainer, true),
      columns: {
        id: true,
        name: true
      }
    });
    return res;
  }),
  add: protectedProcedure.input(z26.object({ userId: z26.string(), trainerId: z26.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(userToTrainer).values({
      userId: input.userId,
      trainerId: input.trainerId
    });
    createLog5({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Add trainer to client",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  delete: protectedProcedure.input(z26.object({ userId: z26.string(), trainerId: z26.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(userToTrainer).where(
      and12(
        eq18(userToTrainer.userId, input.userId),
        eq18(userToTrainer.trainerId, input.trainerId)
      )
    );
    createLog5({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Delete trainer from client",
      notes: JSON.stringify(input)
    });
    return res;
  })
});

// src/server/api/routers/trainer-notes.ts
import { eq as eq19 } from "drizzle-orm";
import { z as z27 } from "zod";
var trainerNotesRouter = createTRPCRouter({
  getAllUser: protectedProcedure.input(z27.object({ userId: z27.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.trainerNotes.findMany({
      where: (note, { eq: eq30 }) => eq30(note.userId, input.userId),
      with: {
        trainer: true
      }
    });
    return res;
  }),
  get: protectedProcedure.input(z27.object({ id: z27.number() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.trainerNotes.findFirst({
      where: (note, { eq: eq30 }) => eq30(note.id, input.id),
      with: {
        trainer: true
      }
    });
    return res;
  }),
  create: protectedProcedure.input(
    z27.object({
      userId: z27.string(),
      title: z27.string(),
      description: z27.string(),
      state: z27.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const trainerId = ctx.session?.user.id;
    const res = await ctx.db.insert(trainerNotes).values({
      userId: input.userId,
      title: input.title,
      description: input.description,
      state: "created",
      trainerId
    }).returning({ id: trainerNotes.id });
    return res;
  }),
  update: protectedProcedure.input(
    z27.object({
      id: z27.number(),
      title: z27.string(),
      description: z27.string(),
      state: z27.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(trainerNotes).set({
      title: input.title,
      description: input.description,
      state: input.state
    }).where(eq19(trainerNotes.id, input.id));
    return res;
  }),
  delete: protectedProcedure.input(z27.object({ id: z27.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(trainerNotes).where(eq19(trainerNotes.id, input.id));
    return res;
  })
});

// src/server/api/routers/user/admin-logs.ts
import { eq as eq20 } from "drizzle-orm";
import { z as z28 } from "zod";
var adminLogs = {
  getAdminLogs: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.log.findMany({
      limit: 4e3,
      orderBy: (log2, { desc: desc11 }) => [desc11(log2.createdAt)]
    });
    return res;
  }),
  deleteAdminLog: protectedProcedure.input(z28.number()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(log).where(eq20(log.id, input));
    return res;
  }),
  deleteAllAdminLogs: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(log);
    return res;
  })
};

// src/lib/names.ts
var capFirst = (string) => {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};
var getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
function generateName() {
  const name1 = [
    "abandoned",
    "able",
    "absolute",
    "adorable",
    "adventurous",
    "academic",
    "acceptable",
    "acclaimed",
    "accomplished",
    "accurate",
    "aching",
    "acidic",
    "acrobatic",
    "active",
    "actual",
    "adept",
    "admirable",
    "admired",
    "adolescent",
    "adorable",
    "adored",
    "advanced",
    "afraid",
    "affectionate",
    "aged",
    "aggravating",
    "aggressive",
    "agile",
    "agitated",
    "agonizing",
    "agreeable",
    "ajar",
    "alarmed",
    "alarming",
    "alert",
    "alienated",
    "alive",
    "all",
    "altruistic",
    "amazing",
    "ambitious",
    "ample",
    "amused",
    "amusing",
    "anchored",
    "ancient",
    "angelic",
    "angry",
    "anguished",
    "animated",
    "annual",
    "another",
    "antique",
    "anxious",
    "any",
    "apprehensive",
    "appropriate",
    "apt",
    "arctic",
    "arid",
    "aromatic",
    "artistic",
    "ashamed",
    "assured",
    "astonishing",
    "athletic",
    "attached",
    "attentive",
    "attractive",
    "austere",
    "authentic",
    "authorized",
    "automatic",
    "avaricious",
    "average",
    "aware",
    "awesome",
    "awful",
    "awkward",
    "babyish",
    "bad",
    "back",
    "baggy",
    "bare",
    "barren",
    "basic",
    "beautiful",
    "belated",
    "beloved",
    "beneficial",
    "better",
    "best",
    "bewitched",
    "big",
    "big-hearted",
    "biodegradable",
    "bite-sized",
    "bitter",
    "black",
    "black-and-white",
    "bland",
    "blank",
    "blaring",
    "bleak",
    "blind",
    "blissful",
    "blond",
    "blue",
    "blushing",
    "bogus",
    "boiling",
    "bold",
    "bony",
    "boring",
    "bossy",
    "both",
    "bouncy",
    "bountiful",
    "bowed",
    "brave",
    "breakable",
    "brief",
    "bright",
    "brilliant",
    "brisk",
    "broken",
    "bronze",
    "brown",
    "bruised",
    "bubbly",
    "bulky",
    "bumpy",
    "buoyant",
    "burdensome",
    "burly",
    "bustling",
    "busy",
    "buttery",
    "buzzing",
    "calculating",
    "calm",
    "candid",
    "canine",
    "capital",
    "carefree",
    "careful",
    "careless",
    "caring",
    "cautious",
    "cavernous",
    "celebrated",
    "charming",
    "cheap",
    "cheerful",
    "cheery",
    "chief",
    "chilly",
    "chubby",
    "circular",
    "classic",
    "clean",
    "clear",
    "clear-cut",
    "clever",
    "close",
    "closed",
    "cloudy",
    "clueless",
    "clumsy",
    "cluttered",
    "coarse",
    "cold",
    "colorful",
    "colorless",
    "colossal",
    "comfortable",
    "common",
    "compassionate",
    "competent",
    "complete",
    "complex",
    "complicated",
    "composed",
    "concerned",
    "concrete",
    "confused",
    "conscious",
    "considerate",
    "constant",
    "content",
    "conventional",
    "cooked",
    "cool",
    "cooperative",
    "coordinated",
    "corny",
    "corrupt",
    "costly",
    "courageous",
    "courteous",
    "crafty",
    "crazy",
    "creamy",
    "creative",
    "creepy",
    "criminal",
    "crisp",
    "critical",
    "crooked",
    "crowded",
    "cruel",
    "crushing",
    "cuddly",
    "cultivated",
    "cultured",
    "cumbersome",
    "curly",
    "curvy",
    "cute",
    "cylindrical",
    "damaged",
    "damp",
    "dangerous",
    "dapper",
    "daring",
    "darling",
    "dark",
    "dazzling",
    "dead",
    "deadly",
    "deafening",
    "dear",
    "dearest",
    "decent",
    "decimal",
    "decisive",
    "deep",
    "defenseless",
    "defensive",
    "defiant",
    "deficient",
    "definite",
    "definitive",
    "delayed",
    "delectable",
    "delicious",
    "delightful",
    "delirious",
    "demanding",
    "dense",
    "dental",
    "dependable",
    "dependent",
    "descriptive",
    "deserted",
    "detailed",
    "determined",
    "devoted",
    "different",
    "difficult",
    "digital",
    "diligent",
    "dim",
    "dimpled",
    "dimwitted",
    "direct",
    "disastrous",
    "discrete",
    "disfigured",
    "disgusting",
    "disloyal",
    "dismal",
    "distant",
    "downright",
    "dreary",
    "dirty",
    "disguised",
    "dishonest",
    "dismal",
    "distant",
    "distinct",
    "distorted",
    "dizzy",
    "dopey",
    "doting",
    "double",
    "downright",
    "drab",
    "drafty",
    "dramatic",
    "dreary",
    "droopy",
    "dry",
    "dual",
    "dull",
    "dutiful",
    "each",
    "eager",
    "earnest",
    "early",
    "easy",
    "easy-going",
    "ecstatic",
    "edible",
    "educated",
    "elaborate",
    "elastic",
    "elated",
    "elderly",
    "electric",
    "elegant",
    "elementary",
    "elliptical",
    "embarrassed",
    "embellished",
    "eminent",
    "emotional",
    "empty",
    "enchanted",
    "enchanting",
    "energetic",
    "enlightened",
    "enormous",
    "enraged",
    "entire",
    "envious",
    "equal",
    "equatorial",
    "essential",
    "esteemed",
    "ethical",
    "euphoric",
    "even",
    "evergreen",
    "everlasting",
    "every",
    "evil",
    "exalted",
    "excellent",
    "exemplary",
    "exhausted",
    "excitable",
    "excited",
    "exciting",
    "exotic",
    "expensive",
    "experienced",
    "expert",
    "extraneous",
    "extroverted",
    "extra-large",
    "extra-small",
    "fabulous",
    "failing",
    "faint",
    "fair",
    "faithful",
    "fake",
    "false",
    "familiar",
    "famous",
    "fancy",
    "fantastic",
    "far",
    "faraway",
    "far-flung",
    "far-off",
    "fast",
    "fat",
    "fatal",
    "fatherly",
    "favorable",
    "favorite",
    "fearful",
    "fearless",
    "feisty",
    "feline",
    "female",
    "feminine",
    "few",
    "fickle",
    "filthy",
    "fine",
    "finished",
    "firm",
    "first",
    "firsthand",
    "fitting",
    "fixed",
    "flaky",
    "flamboyant",
    "flashy",
    "flat",
    "flawed",
    "flawless",
    "flickering",
    "flimsy",
    "flippant",
    "flowery",
    "fluffy",
    "fluid",
    "flustered",
    "focused",
    "fond",
    "foolhardy",
    "foolish",
    "forceful",
    "forked",
    "formal",
    "forsaken",
    "forthright",
    "fortunate",
    "fragrant",
    "frail",
    "frank",
    "frayed",
    "free",
    "French",
    "fresh",
    "frequent",
    "friendly",
    "frightened",
    "frightening",
    "frigid",
    "frilly",
    "frizzy",
    "frivolous",
    "front",
    "frosty",
    "frozen",
    "frugal",
    "fruitful",
    "full",
    "fumbling",
    "functional",
    "funny",
    "fussy",
    "fuzzy",
    "gargantuan",
    "gaseous",
    "general",
    "generous",
    "gentle",
    "genuine",
    "giant",
    "giddy",
    "gigantic",
    "gifted",
    "giving",
    "glamorous",
    "glaring",
    "glass",
    "gleaming",
    "gleeful",
    "glistening",
    "glittering",
    "gloomy",
    "glorious",
    "glossy",
    "glum",
    "golden",
    "good",
    "good-natured",
    "gorgeous",
    "graceful",
    "gracious",
    "grand",
    "grandiose",
    "granular",
    "grateful",
    "grave",
    "gray",
    "great",
    "greedy",
    "green",
    "gregarious",
    "grim",
    "grimy",
    "gripping",
    "grizzled",
    "gross",
    "grotesque",
    "grouchy",
    "grounded",
    "growing",
    "growling",
    "grown",
    "grubby",
    "gruesome",
    "grumpy",
    "guilty",
    "gullible",
    "gummy",
    "hairy",
    "half",
    "handmade",
    "handsome",
    "handy",
    "happy",
    "happy-go-lucky",
    "hard",
    "hard-to-find",
    "harmful",
    "harmless",
    "harmonious",
    "harsh",
    "hasty",
    "hateful",
    "haunting",
    "healthy",
    "heartfelt",
    "hearty",
    "heavenly",
    "heavy",
    "hefty",
    "helpful",
    "helpless",
    "hidden",
    "hideous",
    "high",
    "high-level",
    "hilarious",
    "hoarse",
    "hollow",
    "homely",
    "honest",
    "honorable",
    "honored",
    "hopeful",
    "horrible",
    "hospitable",
    "hot",
    "huge",
    "humble",
    "humiliating",
    "humming",
    "humongous",
    "hungry",
    "hurtful",
    "husky",
    "icky",
    "icy",
    "ideal",
    "idealistic",
    "identical",
    "idle",
    "idiotic",
    "idolized",
    "ignorant",
    "ill",
    "illegal",
    "ill-fated",
    "ill-informed",
    "illiterate",
    "illustrious",
    "imaginary",
    "imaginative",
    "immaculate",
    "immaterial",
    "immediate",
    "immense",
    "impassioned",
    "impeccable",
    "impartial",
    "imperfect",
    "imperturbable",
    "impish",
    "impolite",
    "important",
    "impossible",
    "impractical",
    "impressionable",
    "impressive",
    "improbable",
    "impure",
    "inborn",
    "incomparable",
    "incompatible",
    "incomplete",
    "inconsequential",
    "incredible",
    "indelible",
    "inexperienced",
    "indolent",
    "infamous",
    "infantile",
    "infatuated",
    "inferior",
    "infinite",
    "informal",
    "innocent",
    "insecure",
    "insidious",
    "insignificant",
    "insistent",
    "instructive",
    "insubstantial",
    "intelligent",
    "intent",
    "intentional",
    "interesting",
    "internal",
    "international",
    "intrepid",
    "ironclad",
    "irresponsible",
    "irritating",
    "itchy",
    "jaded",
    "jagged",
    "jam-packed",
    "jaunty",
    "jealous",
    "jittery",
    "joint",
    "jolly",
    "jovial",
    "joyful",
    "joyous",
    "jubilant",
    "judicious",
    "juicy",
    "jumbo",
    "junior",
    "jumpy",
    "juvenile",
    "kaleidoscopic",
    "keen",
    "key",
    "kind",
    "kindhearted",
    "kindly",
    "klutzy",
    "knobby",
    "knotty",
    "knowledgeable",
    "knowing",
    "known",
    "kooky",
    "kosher",
    "lame",
    "lanky",
    "large",
    "last",
    "lasting",
    "late",
    "lavish",
    "lawful",
    "lazy",
    "leading",
    "lean",
    "leafy",
    "left",
    "legal",
    "legitimate",
    "light",
    "lighthearted",
    "likable",
    "likely",
    "limited",
    "limp",
    "limping",
    "linear",
    "lined",
    "liquid",
    "little",
    "live",
    "lively",
    "livid",
    "loathsome",
    "lone",
    "lonely",
    "long",
    "long-term",
    "loose",
    "lopsided",
    "lost",
    "loud",
    "lovable",
    "lovely",
    "loving",
    "low",
    "loyal",
    "lucky",
    "lumbering",
    "luminous",
    "lumpy",
    "lustrous",
    "luxurious",
    "mad",
    "made-up",
    "magnificent",
    "majestic",
    "major",
    "male",
    "mammoth",
    "married",
    "marvelous",
    "masculine",
    "massive",
    "mature",
    "meager",
    "mealy",
    "mean",
    "measly",
    "meaty",
    "medical",
    "mediocre",
    "medium",
    "meek",
    "mellow",
    "melodic",
    "memorable",
    "menacing",
    "merry",
    "messy",
    "metallic",
    "mild",
    "milky",
    "mindless",
    "miniature",
    "minor",
    "minty",
    "miserable",
    "miserly",
    "misguided",
    "misty",
    "mixed",
    "modern",
    "modest",
    "moist",
    "monstrous",
    "monthly",
    "monumental",
    "moral",
    "mortified",
    "motherly",
    "motionless",
    "mountainous",
    "muddy",
    "muffled",
    "multicolored",
    "mundane",
    "murky",
    "mushy",
    "musty",
    "muted",
    "mysterious",
    "naive",
    "narrow",
    "nasty",
    "natural",
    "naughty",
    "nautical",
    "near",
    "neat",
    "necessary",
    "needy",
    "negative",
    "neglected",
    "negligible",
    "neighboring",
    "nervous",
    "new",
    "next",
    "nice",
    "nifty",
    "nimble",
    "nippy",
    "nocturnal",
    "noisy",
    "nonstop",
    "normal",
    "notable",
    "noted",
    "noteworthy",
    "novel",
    "noxious",
    "numb",
    "nutritious",
    "nutty",
    "obedient",
    "obese",
    "oblong",
    "oily",
    "oblong",
    "obvious",
    "occasional",
    "odd",
    "oddball",
    "offbeat",
    "offensive",
    "official",
    "old",
    "old-fashioned",
    "only",
    "open",
    "optimal",
    "optimistic",
    "opulent",
    "orange",
    "orderly",
    "organic",
    "ornate",
    "ornery",
    "ordinary",
    "original",
    "other",
    "our",
    "outlying",
    "outgoing",
    "outlandish",
    "outrageous",
    "outstanding",
    "oval",
    "overcooked",
    "overdue",
    "overjoyed",
    "overlooked",
    "palatable",
    "pale",
    "paltry",
    "parallel",
    "parched",
    "partial",
    "passionate",
    "past",
    "pastel",
    "peaceful",
    "peppery",
    "perfect",
    "perfumed",
    "periodic",
    "perky",
    "personal",
    "pertinent",
    "pesky",
    "pessimistic",
    "petty",
    "phony",
    "physical",
    "piercing",
    "pink",
    "pitiful",
    "plain",
    "plaintive",
    "plastic",
    "playful",
    "pleasant",
    "pleased",
    "pleasing",
    "plump",
    "plush",
    "polished",
    "polite",
    "political",
    "pointed",
    "pointless",
    "poised",
    "poor",
    "popular",
    "portly",
    "posh",
    "positive",
    "possible",
    "potable",
    "powerful",
    "powerless",
    "practical",
    "precious",
    "present",
    "prestigious",
    "pretty",
    "precious",
    "previous",
    "pricey",
    "prickly",
    "primary",
    "prime",
    "pristine",
    "private",
    "prize",
    "probable",
    "productive",
    "profitable",
    "profuse",
    "proper",
    "proud",
    "prudent",
    "punctual",
    "pungent",
    "puny",
    "pure",
    "purple",
    "pushy",
    "putrid",
    "puzzled",
    "puzzling",
    "quaint",
    "qualified",
    "quarrelsome",
    "quarterly",
    "queasy",
    "querulous",
    "questionable",
    "quick",
    "quick-witted",
    "quiet",
    "quintessential",
    "quirky",
    "quixotic",
    "quizzical",
    "radiant",
    "ragged",
    "rapid",
    "rare",
    "rash",
    "raw",
    "recent",
    "reckless",
    "rectangular",
    "ready",
    "real",
    "realistic",
    "reasonable",
    "red",
    "reflecting",
    "regal",
    "regular",
    "reliable",
    "relieved",
    "remarkable",
    "remorseful",
    "remote",
    "repentant",
    "required",
    "respectful",
    "responsible",
    "repulsive",
    "revolving",
    "rewarding",
    "rich",
    "rigid",
    "right",
    "ringed",
    "ripe",
    "roasted",
    "robust",
    "rosy",
    "rotating",
    "rotten",
    "rough",
    "round",
    "rowdy",
    "royal",
    "rubbery",
    "rundown",
    "ruddy",
    "rude",
    "runny",
    "rural",
    "rusty",
    "sad",
    "safe",
    "salty",
    "same",
    "sandy",
    "sane",
    "sarcastic",
    "sardonic",
    "satisfied",
    "scaly",
    "scarce",
    "scared",
    "scary",
    "scented",
    "scholarly",
    "scientific",
    "scornful",
    "scratchy",
    "scrawny",
    "second",
    "secondary",
    "second-hand",
    "secret",
    "self-assured",
    "self-reliant",
    "selfish",
    "sentimental",
    "separate",
    "serene",
    "serious",
    "serpentine",
    "several",
    "severe",
    "shabby",
    "shadowy",
    "shady",
    "shallow",
    "shameful",
    "shameless",
    "sharp",
    "shimmering",
    "shiny",
    "shocked",
    "shocking",
    "shoddy",
    "short",
    "short-term",
    "showy",
    "shrill",
    "shy",
    "sick",
    "silent",
    "silky",
    "silly",
    "silver",
    "similar",
    "simple",
    "simplistic",
    "sinful",
    "single",
    "sizzling",
    "skeletal",
    "skinny",
    "sleepy",
    "slight",
    "slim",
    "slimy",
    "slippery",
    "slow",
    "slushy",
    "small",
    "smart",
    "smoggy",
    "smooth",
    "smug",
    "snappy",
    "snarling",
    "sneaky",
    "sniveling",
    "snoopy",
    "sociable",
    "soft",
    "soggy",
    "solid",
    "somber",
    "some",
    "spherical",
    "sophisticated",
    "sore",
    "sorrowful",
    "soulful",
    "soupy",
    "sour",
    "Spanish",
    "sparkling",
    "sparse",
    "specific",
    "spectacular",
    "speedy",
    "spicy",
    "spiffy",
    "spirited",
    "spiteful",
    "splendid",
    "spotless",
    "spotted",
    "spry",
    "square",
    "squeaky",
    "squiggly",
    "stable",
    "staid",
    "stained",
    "stale",
    "standard",
    "starchy",
    "stark",
    "starry",
    "steep",
    "sticky",
    "stiff",
    "stimulating",
    "stingy",
    "stormy",
    "straight",
    "strange",
    "steel",
    "strict",
    "strident",
    "striking",
    "striped",
    "strong",
    "studious",
    "stunning",
    "stupendous",
    "stupid",
    "sturdy",
    "stylish",
    "subdued",
    "submissive",
    "substantial",
    "subtle",
    "suburban",
    "sudden",
    "sugary",
    "sunny",
    "super",
    "superb",
    "superficial",
    "superior",
    "supportive",
    "sure-footed",
    "surprised",
    "suspicious",
    "svelte",
    "sweaty",
    "sweet",
    "sweltering",
    "swift",
    "sympathetic",
    "tall",
    "talkative",
    "tame",
    "tan",
    "tangible",
    "tart",
    "tasty",
    "tattered",
    "taut",
    "tedious",
    "teeming",
    "tempting",
    "tender",
    "tense",
    "tepid",
    "terrible",
    "terrific",
    "testy",
    "thankful",
    "that",
    "these",
    "thick",
    "thin",
    "third",
    "thirsty",
    "this",
    "thorough",
    "thorny",
    "those",
    "thoughtful",
    "threadbare",
    "thrifty",
    "thunderous",
    "tidy",
    "tight",
    "timely",
    "tinted",
    "tiny",
    "tired",
    "torn",
    "total",
    "tough",
    "traumatic",
    "treasured",
    "tremendous",
    "tragic",
    "trained",
    "tremendous",
    "triangular",
    "tricky",
    "trifling",
    "trim",
    "trivial",
    "troubled",
    "true",
    "trusting",
    "trustworthy",
    "trusty",
    "truthful",
    "tubby",
    "turbulent",
    "twin",
    "ugly",
    "ultimate",
    "unacceptable",
    "unaware",
    "uncomfortable",
    "uncommon",
    "unconscious",
    "understated",
    "unequaled",
    "uneven",
    "unfinished",
    "unfit",
    "unfolded",
    "unfortunate",
    "unhappy",
    "unhealthy",
    "uniform",
    "unimportant",
    "unique",
    "united",
    "unkempt",
    "unknown",
    "unlawful",
    "unlined",
    "unlucky",
    "unnatural",
    "unpleasant",
    "unrealistic",
    "unripe",
    "unruly",
    "unselfish",
    "unsightly",
    "unsteady",
    "unsung",
    "untidy",
    "untimely",
    "untried",
    "untrue",
    "unused",
    "unusual",
    "unwelcome",
    "unwieldy",
    "unwilling",
    "unwitting",
    "unwritten",
    "upbeat",
    "upright",
    "upset",
    "urban",
    "usable",
    "used",
    "useful",
    "useless",
    "utilized",
    "utter",
    "vacant",
    "vague",
    "vain",
    "valid",
    "valuable",
    "vapid",
    "variable",
    "vast",
    "velvety",
    "venerated",
    "vengeful",
    "verifiable",
    "vibrant",
    "vicious",
    "victorious",
    "vigilant",
    "vigorous",
    "villainous",
    "violet",
    "violent",
    "virtual",
    "virtuous",
    "visible",
    "vital",
    "vivacious",
    "vivid",
    "voluminous",
    "wan",
    "warlike",
    "warm",
    "warmhearted",
    "warped",
    "wary",
    "wasteful",
    "watchful",
    "waterlogged",
    "watery",
    "wavy",
    "wealthy",
    "weak",
    "weary",
    "webbed",
    "wee",
    "weekly",
    "weepy",
    "weighty",
    "weird",
    "welcome",
    "well-documented",
    "well-groomed",
    "well-informed",
    "well-lit",
    "well-made",
    "well-off",
    "well-to-do",
    "well-worn",
    "wet",
    "which",
    "whimsical",
    "whirlwind",
    "whispered",
    "white",
    "whole",
    "whopping",
    "wicked",
    "wide",
    "wide-eyed",
    "wiggly",
    "wild",
    "willing",
    "wilted",
    "winding",
    "windy",
    "winged",
    "wiry",
    "wise",
    "witty",
    "wobbly",
    "woeful",
    "wonderful",
    "wooden",
    "woozy",
    "wordy",
    "worldly",
    "worn",
    "worried",
    "worrisome",
    "worse",
    "worst",
    "worthless",
    "worthwhile",
    "worthy",
    "wrathful",
    "wretched",
    "writhing",
    "wrong",
    "wry",
    "yawning",
    "yearly",
    "yellow",
    "yellowish",
    "young",
    "youthful",
    "yummy",
    "zany",
    "zealous",
    "zesty",
    "zigzag",
    "rocky"
  ];
  const name = capFirst(name1[getRandomInt(0, name1.length + 1)]);
  if (!name) {
    return generateName();
  }
  return name;
}

// src/server/api/routers/user/generation.ts
import { hash } from "bcryptjs";
var generation = {
  createFakeUsers: rootProtectedProcedure.mutation(async ({ ctx }) => {
    const users = [
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true,
        isTrainer: true
      }
    ];
    const hashedPassword = await hash("hklasd", 10);
    const hashedJamie = await hash("jamiedash", 10);
    const res = await ctx.db.insert(user).values(
      users.map((user2) => ({
        firstName: user2.firstName,
        lastName: user2.lastName,
        name: `${user2.firstName} ${user2.lastName}`,
        email: `${user2.firstName.toLowerCase()}${user2.lastName.toLowerCase()}@warner.systems`,
        password: hashedPassword,
        isFake: user2.isFake,
        isTrainer: user2.isTrainer || false
      }))
    );
    const jamie = await ctx.db.insert(user).values({
      firstName: "Jamie",
      lastName: "Dash",
      name: "Jamie Dash",
      email: "jamie@comp-edge.com.au",
      password: hashedJamie,
      isTrainer: false
    }).returning({ id: user.id });
    await ctx.db.insert(userSettings).values({
      userId: jamie[0]?.id || "00",
      defaultWater: "600"
    });
    return res;
  })
};

// src/server/api/routers/user/get.ts
import { TRPCError as TRPCError8 } from "@trpc/server";
import { eq as eq21, sql as sql14 } from "drizzle-orm";
import { z as z29 } from "zod";
var get3 = {
  getName: protectedProcedure.input(z29.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError8({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.id, input),
      columns: {
        id: true,
        firstName: true,
        lastName: true,
        name: true
      }
    });
    return res;
  }),
  getBasic: protectedProcedure.input(z29.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError8({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.id, input),
      columns: {
        password: false
      },
      with: {
        category: {
          with: {
            category: true
          }
        },
        roles: true,
        trainers: {
          with: {
            trainer: true
          }
        }
      }
    });
    return res;
  }),
  getAllYour: protectedProcedure.input(z29.string().optional()).query(async ({ ctx, input }) => {
    const userId = input && input !== "" ? input : ctx.session?.user.id;
    const res = await ctx.db.query.user.findMany({
      columns: {
        id: true,
        name: true,
        isTrainer: true,
        email: true,
        isActive: true
      },
      with: {
        category: {
          with: {
            category: true
          }
        },
        roles: true,
        trainers: {
          with: {
            trainer: true
          }
        }
      }
    });
    const latestLogsSq = ctx.db.$with("latest_logs").as(
      ctx.db.select({
        userId: dailyLog.userId,
        updatedAt: dailyLog.updatedAt,
        // Assign 1 to the most recent log for each userId
        rowNumber: sql14`row_number() OVER (PARTITION BY ${dailyLog.userId} ORDER BY ${dailyLog.updatedAt} DESC)`.as(
          "rn"
        )
      }).from(dailyLog)
    );
    const latestLogs = await ctx.db.with(latestLogsSq).select().from(latestLogsSq).where(eq21(latestLogsSq.rowNumber, 1));
    const users = res.filter((user2) => {
      if (user2.id === userId) return true;
      if (ctx.session.user.isAdmin) return true;
      if (user2.trainers.find((trainer) => trainer.trainer.id === userId))
        return true;
      return false;
    });
    const logMap = new Map(
      latestLogs.map((log2) => [log2.userId, log2.updatedAt])
    );
    const usersWithLogs = users.map((user2) => ({
      ...user2,
      latestLog: logMap.get(user2.id) ?? null
      // Returns the updatedAt date or null if no log exists
    }));
    return usersWithLogs;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.user.findMany({
      columns: {
        password: false
      },
      with: {
        roles: true,
        category: {
          with: {
            category: true
          }
        },
        trainers: {
          with: {
            trainer: true
          }
        }
      }
    });
    const latestLogsSq = ctx.db.$with("latest_logs").as(
      ctx.db.select({
        userId: dailyLog.userId,
        updatedAt: dailyLog.updatedAt,
        // Assign 1 to the most recent log for each userId
        rowNumber: sql14`row_number() OVER (PARTITION BY ${dailyLog.userId} ORDER BY ${dailyLog.updatedAt} DESC)`.as(
          "rn"
        )
      }).from(dailyLog)
    );
    const latestLogs = await ctx.db.with(latestLogsSq).select().from(latestLogsSq).where(eq21(latestLogsSq.rowNumber, 1));
    const logMap = new Map(latestLogs.map((log2) => [log2.userId, log2.updatedAt]));
    const usersWithLogs = res.map((user2) => ({
      ...user2,
      latestLog: logMap.get(user2.id) ?? null
    }));
    return usersWithLogs;
  }),
  checkEmail: publicProcedure.input(z29.string()).mutation(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError8({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.email, input)
    });
    return res ? true : false;
  }),
  getGaurenteed: protectedProcedure.input(z29.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError8({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.id, input),
      columns: {
        password: false
      },
      with: {
        settings: true,
        partner: {
          columns: {
            id: true,
            name: true,
            email: true
          }
        },
        category: {
          with: {
            category: true
          }
        },
        images: true,
        roles: true,
        supplementStacks: {
          where: (ss, { eq: eq30 }) => eq30(ss.isTemplate, false),
          with: {
            supplements: {
              with: {
                supplement: true
              }
            }
          }
        },
        userPlans: {
          with: {
            userMeals: true,
            userRecipes: true,
            userIngredients: {
              with: {
                ingredient: true,
                alternateIngredient: true
              }
            }
          }
        }
      }
    });
    if (!res) throw new TRPCError8({ code: "NOT_FOUND" });
    return res;
  }),
  getCurrentUserRoles: protectedProcedure.input(z29.object({ id: z29.string() }).optional()).query(async ({ ctx, input }) => {
    let userId = ctx.session?.user.id;
    if (input?.id && input.id !== "") userId = input.id;
    if (!userId) return null;
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.id, userId),
      columns: {
        id: true,
        isCreator: true,
        isTrainer: true,
        firstName: true,
        lastName: true,
        name: true
      },
      with: {
        settings: true,
        roles: true,
        supplementStacks: {
          where: (ss, { eq: eq30 }) => eq30(ss.isTemplate, false),
          with: {
            supplements: {
              with: {
                supplement: {
                  columns: {
                    id: true,
                    name: true,
                    serveSize: true,
                    serveUnit: true
                  }
                }
              }
            }
          }
        }
      }
    });
    return res;
  }),
  getCurrentUserMeals: protectedProcedure.input(z29.object({ id: z29.string() }).optional()).query(async ({ ctx, input }) => {
    let userId = ctx.session?.user.id;
    if (input?.id && input.id !== "") userId = input.id;
    if (!userId) return null;
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.id, userId),
      columns: {
        id: true
      },
      with: {
        roles: true,
        userPlans: {
          where: (plans, { eq: eq30 }) => eq30(plans.isActive, true),
          with: {
            userMeals: true,
            userRecipes: true,
            userIngredients: {
              with: {
                ingredient: {
                  columns: {
                    caloriesWOFibre: true,
                    caloriesWFibre: true,
                    protein: true,
                    availableCarbohydrateWithSugarAlcohols: true,
                    fatTotal: true,
                    serveSize: true
                  }
                }
              }
            }
          }
        }
      }
    });
    return res;
  }),
  getCurrentUser: protectedProcedure.input(z29.object({ id: z29.string() }).optional()).query(async ({ ctx, input }) => {
    let userId = ctx.session?.user.id;
    if (input?.id && input.id !== "") userId = input.id;
    if (!userId) return null;
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.id, userId),
      columns: {
        password: false
      },
      with: {
        images: true,
        settings: true,
        partner: {
          columns: {
            id: true,
            name: true,
            email: true
          }
        },
        roles: true,
        trainers: true,
        category: {
          with: {
            category: true
          }
        },
        supplementStacks: {
          where: (ss, { eq: eq30 }) => eq30(ss.isTemplate, false),
          with: {
            supplements: {
              with: {
                supplement: true
              }
            }
          }
        },
        userPlans: {
          with: {
            userMeals: true,
            userRecipes: true,
            userIngredients: {
              with: {
                ingredient: true,
                alternateIngredient: true
              }
            }
          }
        }
      }
    });
    return res;
  }),
  getByEmail: protectedProcedure.input(z29.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError8({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.email, input),
      columns: {
        password: false
      }
    });
    return res;
  }),
  getInfoPage: protectedProcedure.input(z29.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError8({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.id, input),
      columns: {
        id: true
      },
      with: {
        settings: true,
        partner: {
          columns: {
            id: true,
            name: true,
            email: true
          }
        },
        roles: true,
        category: {
          with: {
            category: true
          }
        },
        images: true,
        trainers: true,
        supplementStacks: {
          where: (ss, { eq: eq30 }) => eq30(ss.isTemplate, false),
          with: {
            supplements: {
              with: {
                supplement: true
              }
            }
          }
        }
      }
    });
    return res;
  }),
  get: protectedProcedure.input(z29.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError8({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.id, input),
      columns: {
        password: false
      },
      with: {
        settings: true,
        partner: {
          columns: {
            id: true,
            name: true,
            email: true
          }
        },
        roles: true,
        category: {
          with: {
            category: true
          }
        },
        images: true,
        trainers: true,
        supplementStacks: {
          where: (ss, { eq: eq30 }) => eq30(ss.isTemplate, false),
          with: {
            supplements: {
              with: {
                supplement: true
              }
            }
          }
        },
        userPlans: {
          with: {
            userMeals: true,
            userRecipes: true,
            userIngredients: {
              with: {
                ingredient: true,
                alternateIngredient: true
              }
            }
          }
        }
      }
    });
    return res;
  }),
  isUser: publicProcedure.query(async () => {
    const session2 = await auth();
    if (!session2?.user) return null;
    if (!session2?.user?.id) return null;
    return session2.user;
  }),
  isCreator: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) return null;
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.id, userId),
      columns: {
        isCreator: true
      }
    });
    return res;
  }),
  isTrainer: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) return null;
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.id, userId),
      columns: {
        isTrainer: true
      }
    });
    return res;
  }),
  isRoot: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) return null;
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.id, userId),
      columns: {
        isRoot: true
      }
    });
    return res;
  }),
  isAdmin: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    if (!userId) return null;
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq30 }) => eq30(user2.id, userId),
      with: {
        roles: true
      }
    });
    if (!res) return false;
    const isAdmin = res?.roles?.find((role2) => role2.name === "admin") ? true : false;
    return isAdmin;
  })
};

// src/server/api/routers/user/notifications.ts
import { eq as eq22 } from "drizzle-orm";
import { z as z30 } from "zod";
var notifications = {
  getNotifications: protectedProcedure.input(z30.object({ userId: z30.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.notificationToggle.findMany({
      where: (toggle, { eq: eq30 }) => eq30(toggle.userId, input.userId)
    });
    return res;
  }),
  toggleNotification: protectedProcedure.input(
    z30.object({
      userId: z30.string(),
      type: z30.string(),
      interval: z30.string(),
      sleep: z30.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.query.notificationToggle.findFirst({
      where: (toggle, { eq: eq30, and: and15 }) => and15(eq30(toggle.userId, input.userId), eq30(toggle.type, input.type))
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "toggle notification",
      notes: JSON.stringify(input),
      objectId: res?.id
    });
    if (!res) {
      const toggle = await ctx.db.insert(notificationToggle).values({
        userId: input.userId,
        type: input.type,
        interval: input.interval,
        sleep: input.sleep
      });
      return toggle;
    } else {
      const toggle = await ctx.db.delete(notificationToggle).where(eq22(notificationToggle.id, res.id));
      return toggle;
    }
  }),
  updateNotification: protectedProcedure.input(
    z30.object({
      interval: z30.string(),
      sleep: z30.string().optional(),
      id: z30.number()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(notificationToggle).set({
      interval: input.interval,
      sleep: input.sleep
    }).where(eq22(notificationToggle.id, input.id));
    return res;
  })
};

// src/server/api/routers/user/post.ts
import { hash as hash2 } from "bcryptjs";
import { eq as eq23 } from "drizzle-orm";
import { z as z31 } from "zod";
var post3 = {
  createUser: publicProcedure.input(
    z31.object({
      email: z31.string().email(),
      password: z31.string(),
      firstName: z31.string(),
      lastName: z31.string(),
      birthDate: z31.date().optional().nullable(),
      isCreator: z31.boolean().optional(),
      isTrainer: z31.boolean().optional(),
      isRoot: z31.boolean().optional()
    })
  ).mutation(async ({ ctx, input }) => {
    const hashedPassword = await hash2(input.password, 10);
    const res = await ctx.db.insert(user).values({
      ...input,
      name: `${input.firstName} ${input.lastName}`,
      password: hashedPassword
    }).returning({ id: user.id });
    await ctx.db.insert(userSettings).values({
      userId: res[0]?.id || "00",
      defaultWater: "600"
    });
    return { user: input.email, password: input.password };
  }),
  deleteUser: adminProtectedProcedure.input(z31.string()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(user).where(eq23(user.id, input));
    return res;
  })
};

// src/server/api/routers/user/roles.ts
import { eq as eq24 } from "drizzle-orm";
import { z as z32 } from "zod";
var roles = {
  updateRoot: rootProtectedProcedure.input(z32.object({ isRoot: z32.boolean(), id: z32.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      isRoot: input.isRoot
    }).where(eq24(user.id, input.id));
    return res;
  }),
  updateRoleNotifyFrontImage: protectedProcedure.input(z32.object({ userId: z32.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq30, and: and15 }) => and15(
        eq30(role2.userId, input.userId),
        eq30(role2.name, "notify-trainer-front-image")
      )
    });
    if (res) {
      await ctx.db.delete(role).where(eq24(role.id, res.id));
    } else {
      await ctx.db.insert(role).values({
        name: "notify-trainer-front-image",
        userId: input.userId
      });
    }
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "accept trainer front image notifications",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  updateRoleNotifyTrainerAllImages: protectedProcedure.input(z32.object({ userId: z32.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq30, and: and15 }) => and15(
        eq30(role2.userId, input.userId),
        eq30(role2.name, "notify-trainer-all-images")
      )
    });
    if (res) {
      await ctx.db.delete(role).where(eq24(role.id, res.id));
    } else {
      await ctx.db.insert(role).values({
        name: "notify-trainer-all-images",
        userId: input.userId
      });
    }
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "accept trainer all images notifications",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  updateRoleBodyBuilderImages: protectedProcedure.input(z32.object({ userId: z32.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq30, and: and15 }) => and15(
        eq30(role2.userId, input.userId),
        eq30(role2.name, "body-builder-images")
      )
    });
    if (res) {
      await ctx.db.delete(role).where(eq24(role.id, res.id));
    } else {
      await ctx.db.insert(role).values({
        name: "body-builder-images",
        userId: input.userId
      });
    }
    return res;
  }),
  updateRoleSupplementDisclaimer: protectedProcedure.input(z32.object({ userId: z32.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq30, and: and15 }) => and15(
        eq30(role2.userId, input.userId),
        eq30(role2.name, "supplement_disclaimer_v1")
      )
    });
    if (res) {
      await ctx.db.delete(role).where(eq24(role.id, res.id));
    } else {
      await ctx.db.insert(role).values({
        name: "supplement_disclaimer_v1",
        userId: input.userId
      });
    }
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "accept supplement disclaimer",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  updateRoleSupplements: protectedProcedure.input(z32.object({ userId: z32.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq30, and: and15 }) => and15(eq30(role2.userId, input.userId), eq30(role2.name, "supplements"))
    });
    if (res) {
      await ctx.db.delete(role).where(eq24(role.id, res.id));
    } else {
      await ctx.db.insert(role).values({
        userId: input.userId,
        name: "supplements"
      });
    }
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "toggle user ability to log supplements",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  updateRoleCreateMeals: protectedProcedure.input(z32.object({ userId: z32.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq30, and: and15 }) => and15(eq30(role2.userId, input.userId), eq30(role2.name, "create-meals"))
    });
    if (res) {
      await ctx.db.delete(role).where(eq24(role.id, res.id));
    } else {
      await ctx.db.insert(role).values({
        userId: input.userId,
        name: "create-meals"
      });
    }
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "toggle user ability to create meals",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  updateRoleAdmin: protectedProcedure.input(z32.object({ userId: z32.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq30, and: and15 }) => and15(eq30(role2.userId, input.userId), eq30(role2.name, "admin"))
    });
    if (res) {
      await ctx.db.delete(role).where(eq24(role.id, res.id));
    } else {
      await ctx.db.insert(role).values({
        userId: input.userId,
        name: "admin"
      });
    }
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "toggle admin",
      notes: JSON.stringify(input)
    });
    return res;
  })
};

// src/server/api/routers/user/update.ts
import { TRPCError as TRPCError9 } from "@trpc/server";
import { hash as hash3 } from "bcryptjs";
import { eq as eq25, inArray } from "drizzle-orm";
import { z as z33 } from "zod";
var assertAuthenticated2 = (ctx) => {
  const sessionUser = ctx.session?.user;
  if (!sessionUser) {
    throw new TRPCError9({
      code: "UNAUTHORIZED",
      message: "You must be signed in to update users"
    });
  }
  return sessionUser;
};
var assertCanManageUser = async ({
  ctx,
  userId
}) => {
  const sessionUser = assertAuthenticated2(ctx);
  const targetUser = await ctx.db.query.user.findFirst({
    where: eq25(user.id, userId),
    columns: {
      id: true,
      name: true,
      partnerId: true
    },
    with: {
      trainers: {
        columns: {
          trainerId: true
        }
      }
    }
  });
  if (!targetUser) {
    throw new TRPCError9({
      code: "NOT_FOUND",
      message: "User not found"
    });
  }
  const canManage = sessionUser.isAdmin || targetUser.id === sessionUser.id || targetUser.trainers.some((trainer) => trainer.trainerId === sessionUser.id);
  if (!canManage) {
    throw new TRPCError9({
      code: "FORBIDDEN",
      message: "You do not have permission to update this user"
    });
  }
  return targetUser;
};
var update = {
  updateIsUserActive: protectedProcedure.input(z33.object({ id: z33.string(), isActive: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      isActive: input.isActive
    }).where(eq25(user.id, input.id));
    return res;
  }),
  updateChartRange: protectedProcedure.input(z33.object({ range: z33.number(), id: z33.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      defaultChartRange: input.range.toString()
    }).where(eq25(userSettings.id, input.id));
    return res;
  }),
  updateIsPeriodOvualtion: protectedProcedure.input(
    z33.object({
      id: z33.number(),
      isPeriodOvulaion: z33.boolean()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isPeriodOvulaion: input.isPeriodOvulaion
    }).where(eq25(userSettings.id, input.id));
    return res;
  }),
  updateOvulationStart: protectedProcedure.input(
    z33.object({
      start: z33.date().nullable(),
      id: z33.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      ovulaionStartAt: input.start
    }).where(eq25(userSettings.id, input.id));
    return res;
  }),
  updatePeriodStart: protectedProcedure.input(
    z33.object({
      start: z33.date().nullable(),
      id: z33.number(),
      userId: z33.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      periodStartAt: input.start
    }).where(eq25(userSettings.id, input.id));
    return res;
  }),
  updatePeriodLength: protectedProcedure.input(z33.object({ length: z33.number(), id: z33.number(), userId: z33.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      periodLength: input.length
    }).where(eq25(userSettings.id, input.id));
    return res;
  }),
  updatePeriodInterval: protectedProcedure.input(
    z33.object({ interval: z33.number(), id: z33.number(), userId: z33.string() })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      periodInterval: input.interval
    }).where(eq25(userSettings.id, input.id));
    return res;
  }),
  updateIsHighLow: protectedProcedure.input(z33.object({ id: z33.string(), isHighLow: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isHighLow: input.isHighLow
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsBulkCut: protectedProcedure.input(z33.object({ id: z33.string(), isBulkCut: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isBulkCut: input.isBulkCut
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateCutStart: protectedProcedure.input(
    z33.object({
      start: z33.date().nullable(),
      id: z33.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      cutStartAt: input.start
    }).where(eq25(userSettings.id, input.id));
    return res;
  }),
  updateCutFinish: protectedProcedure.input(
    z33.object({
      finish: z33.date().nullable(),
      id: z33.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      cutFinishAt: input.finish
    }).where(eq25(userSettings.id, input.id));
    return res;
  }),
  updateBulkStart: protectedProcedure.input(
    z33.object({
      start: z33.date().nullable(),
      id: z33.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      bulkStartAt: input.start
    }).where(eq25(userSettings.id, input.id));
    return res;
  }),
  updateBulkFinish: protectedProcedure.input(
    z33.object({
      finish: z33.date().nullable(),
      id: z33.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      bulkFinishAt: input.finish
    }).where(eq25(userSettings.id, input.id));
    return res;
  }),
  updateWater: protectedProcedure.input(z33.object({ water: z33.number(), id: z33.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      defaultWater: input.water.toString()
    }).where(eq25(userSettings.id, input.id));
    return res;
  }),
  updateIsPosing: protectedProcedure.input(z33.object({ id: z33.string(), isPosing: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isPosing: input.isPosing
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsBloodGlucose: protectedProcedure.input(z33.object({ id: z33.string(), isBloodGlucose: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isBloodGlucose: input.isBloodGlucose
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsSleep: protectedProcedure.input(z33.object({ id: z33.string(), isSleep: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isSleep: input.isSleep
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsSleepQuality: protectedProcedure.input(z33.object({ id: z33.string(), isSleepQuality: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isSleepQuality: input.isSleepQuality
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsNap: protectedProcedure.input(z33.object({ id: z33.string(), isNap: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isNap: input.isNap
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsWeightTraining: protectedProcedure.input(z33.object({ id: z33.string(), isWeightTraining: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isWeightTraining: input.isWeightTraining
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsHiit: protectedProcedure.input(z33.object({ id: z33.string(), isHiit: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isHiit: input.isHiit
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsMobility: protectedProcedure.input(z33.object({ id: z33.string(), isMobility: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isMobility: input.isMobility
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsLiss: protectedProcedure.input(z33.object({ id: z33.string(), isLiss: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isLiss: input.isLiss
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsNote: protectedProcedure.input(z33.object({ id: z33.string(), isNote: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isNotes: input.isNote
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsSauna: protectedProcedure.input(z33.object({ id: z33.string(), isSauna: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isSauna: input.isSauna
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsColdPlunge: protectedProcedure.input(z33.object({ id: z33.string(), isColdPlunge: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isColdPlunge: input.isColdPlunge
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateIsSteps: protectedProcedure.input(z33.object({ id: z33.string(), isSteps: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isSteps: input.isSteps
    }).where(eq25(userSettings.userId, input.id));
    return res;
  }),
  updateTrainer: protectedProcedure.input(z33.object({ id: z33.string(), isTrainer: z33.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      isTrainer: input.isTrainer
    }).where(eq25(user.id, input.id));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Update Trainer",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  updateFirstName: protectedProcedure.input(
    z33.object({
      firstName: z33.string(),
      id: z33.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      firstName: input.firstName
    }).where(eq25(user.id, input.id));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Update First Name",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  updateLastName: protectedProcedure.input(
    z33.object({
      lastName: z33.string(),
      id: z33.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      lastName: input.lastName
    }).where(eq25(user.id, input.id));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Update Last Name",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  updateEmail: protectedProcedure.input(
    z33.object({
      email: z33.string(),
      id: z33.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      email: input.email
    }).where(eq25(user.id, input.id));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Update Email",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  updatePassword: protectedProcedure.input(
    z33.object({
      password: z33.string(),
      id: z33.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const hashedPassword = await hash3(input.password, 10);
    const res = await ctx.db.update(user).set({
      password: hashedPassword
    }).where(eq25(user.id, input.id));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Update Password",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  setPartner: protectedProcedure.input(
    z33.object({
      userId: z33.string(),
      partnerId: z33.string().nullable()
    })
  ).mutation(async ({ ctx, input }) => {
    if (input.partnerId === input.userId) {
      throw new TRPCError9({
        code: "BAD_REQUEST",
        message: "A user cannot be their own partner"
      });
    }
    const targetUser = await assertCanManageUser({
      ctx,
      userId: input.userId
    });
    const partnerUser = input.partnerId ? await assertCanManageUser({
      ctx,
      userId: input.partnerId
    }) : null;
    await ctx.db.transaction(async (tx) => {
      const impactedUserIds = Array.from(
        new Set(
          [
            targetUser.id,
            targetUser.partnerId,
            partnerUser?.id ?? null,
            partnerUser?.partnerId ?? null
          ].filter((value) => Boolean(value))
        )
      );
      if (impactedUserIds.length > 0) {
        await tx.update(user).set({
          partnerId: null
        }).where(inArray(user.id, impactedUserIds));
        await tx.update(user).set({
          partnerId: null
        }).where(inArray(user.partnerId, impactedUserIds));
      }
      if (partnerUser) {
        await tx.update(user).set({
          partnerId: partnerUser.id
        }).where(eq25(user.id, targetUser.id));
        await tx.update(user).set({
          partnerId: targetUser.id
        }).where(eq25(user.id, partnerUser.id));
      }
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Set Partner",
      notes: JSON.stringify(input)
    });
    return { success: true };
  })
};

// src/server/api/routers/user.ts
var userRouter = createTRPCRouter({
  ...get3,
  ...update,
  ...roles,
  ...generation,
  ...post3,
  ...adminLogs,
  ...notifications
});

// src/server/api/routers/user-plan.ts
import { eq as eq26, and as and13, inArray as inArray2, isNotNull } from "drizzle-orm";
import { z as z34 } from "zod";
var userPlanIngredientInputSchema = z34.object({
  ingredientId: z34.number(),
  ingredientIndex: z34.number(),
  recipeIndex: z34.number(),
  mealIndex: z34.number(),
  alternateId: z34.number().nullable(),
  name: z34.string(),
  serve: z34.string(),
  serveUnit: z34.string(),
  note: z34.string()
});
var userPlanRecipeInputSchema = z34.object({
  recipeIndex: z34.number(),
  mealIndex: z34.number(),
  name: z34.string(),
  note: z34.string(),
  description: z34.string(),
  index: z34.number(),
  ingredients: z34.array(userPlanIngredientInputSchema)
});
var userPlanMealInputSchema = z34.object({
  mealIndex: z34.number(),
  mealTitle: z34.string(),
  calories: z34.string(),
  protein: z34.string().optional(),
  targetProtein: z34.string(),
  targetCalories: z34.string(),
  vegeCalories: z34.string(),
  veges: z34.string(),
  vegeNotes: z34.string(),
  note: z34.string(),
  recipes: z34.array(userPlanRecipeInputSchema)
});
var userPlanMutationInputSchema = z34.object({
  name: z34.string().min(1),
  createdAt: z34.date().optional(),
  description: z34.string(),
  image: z34.string(),
  notes: z34.string(),
  userId: z34.string(),
  meals: z34.array(userPlanMealInputSchema)
});
var getUserPlanRecipesAndIngredients = (meals) => {
  const recipes = meals.flatMap((meal2) => meal2.recipes);
  const ingredients = recipes.flatMap((recipe2) => recipe2.ingredients);
  return { recipes, ingredients };
};
var normalizeAlternateId = (alternateId) => {
  if (alternateId === 0 || alternateId === null) {
    return null;
  }
  return Number(alternateId);
};
var createUserPlanNotification = async ({
  ctx,
  userId
}) => {
  const notif = await ctx.db.query.notification.findMany({
    where: and13(
      eq26(notification.userId, userId),
      eq26(notification.code, "user-plan_update"),
      eq26(notification.isViewed, false)
    )
  });
  if (notif.length === 0) {
    await ctx.db.insert(notification).values({
      userId,
      code: "user-plan_update",
      title: "Your user meal plan has been updated",
      description: "You have a new user meal plan update",
      isViewed: false,
      isRead: false
    });
  }
};
var userPlanRouter = createTRPCRouter({
  delete: protectedProcedure.input(z34.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(userPlan).where(eq26(userPlan.id, input));
    return res;
  }),
  finishPlan: protectedProcedure.input(z34.number()).mutation(async ({ input, ctx }) => {
    try {
      const res = await ctx.db.update(userPlan).set({
        isActive: false,
        finishedAt: /* @__PURE__ */ new Date()
      }).where(eq26(userPlan.id, input));
      console.log({ finishPlan: res });
      return res;
    } catch (e) {
      console.log({ finishPlanError: e });
      return e;
    }
  }),
  activePlan: protectedProcedure.input(z34.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(userPlan).set({
      isActive: true,
      finishedAt: null
    }).where(eq26(userPlan.id, input));
    return res;
  }),
  getMeal: protectedProcedure.input(z34.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userMeal.findFirst({
      where: eq26(userMeal.id, input)
    });
    return res;
  }),
  getRecipe: protectedProcedure.input(z34.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userRecipe.findFirst({
      where: eq26(userRecipe.id, input)
    });
    return res;
  }),
  getIngredient: protectedProcedure.input(z34.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userIngredient.findFirst({
      where: eq26(userIngredient.id, input),
      with: {
        ingredient: true,
        alternateIngredient: true
      }
    });
    return res;
  }),
  getUserActivePlan: protectedProcedure.input(z34.string()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userPlan.findMany({
      where: and13(eq26(userPlan.userId, input), eq26(userPlan.isActive, true)),
      with: {
        userMeals: true,
        userRecipes: true,
        userIngredients: {
          with: {
            ingredient: true,
            alternateIngredient: true
          }
        }
      }
    });
    return res;
  }),
  get: protectedProcedure.input(z34.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userPlan.findFirst({
      where: eq26(userPlan.id, input),
      with: {
        userMeals: true,
        userRecipes: true,
        userIngredients: {
          with: {
            ingredient: true,
            alternateIngredient: true
          }
        }
      }
    });
    return res;
  }),
  create: protectedProcedure.input(userPlanMutationInputSchema).mutation(async ({ input, ctx }) => {
    const creatorId = ctx.session.user.id;
    const { meals, ...data } = input;
    const { recipes, ingredients } = getUserPlanRecipesAndIngredients(meals);
    const res = await ctx.db.insert(userPlan).values({
      ...data,
      isActive: true,
      numberOfMeals: meals.length,
      creatorId
    }).returning({ id: plan.id });
    const resId = res?.[0]?.id;
    if (!resId) return res;
    const batchRes = await ctx.db.batch([
      ctx.db.insert(userMeal).values(
        meals.map((meal2) => ({
          ...meal2,
          userPlanId: resId
        }))
      ).returning({ id: planToMeal.id }),
      ctx.db.insert(userRecipe).values(
        recipes.map((recipe2) => ({
          ...recipe2,
          userPlanId: resId
        }))
      ).returning({ id: userRecipe.id }),
      ctx.db.insert(userIngredient).values(
        ingredients.map((ingredient2) => ({
          ...ingredient2,
          alternateId: normalizeAlternateId(ingredient2.alternateId),
          userPlanId: resId
        }))
      ).returning({ id: userIngredient.id })
    ]);
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "User Create Plan",
      notes: JSON.stringify(input),
      objectId: resId
    });
    await createUserPlanNotification({ ctx, userId: input.userId });
    console.log({ res, batchRes });
    return { res, batchRes };
  }),
  update: protectedProcedure.input(
    userPlanMutationInputSchema.extend({
      id: z34.number()
    })
  ).mutation(async ({ input, ctx }) => {
    const { id, meals, ...data } = input;
    const { recipes, ingredients } = getUserPlanRecipesAndIngredients(meals);
    await ctx.db.transaction(async (tx) => {
      await tx.update(userPlan).set({
        ...data,
        numberOfMeals: meals.length
      }).where(eq26(userPlan.id, id));
      await tx.delete(userIngredient).where(eq26(userIngredient.userPlanId, id));
      await tx.delete(userRecipe).where(eq26(userRecipe.userPlanId, id));
      await tx.delete(userMeal).where(eq26(userMeal.userPlanId, id));
      if (meals.length > 0) {
        await tx.insert(userMeal).values(
          meals.map((meal2) => ({
            ...meal2,
            userPlanId: id
          }))
        );
      }
      if (recipes.length > 0) {
        await tx.insert(userRecipe).values(
          recipes.map((recipe2) => ({
            ...recipe2,
            userPlanId: id
          }))
        );
      }
      if (ingredients.length > 0) {
        await tx.insert(userIngredient).values(
          ingredients.map((ingredient2) => ({
            ...ingredient2,
            alternateId: normalizeAlternateId(ingredient2.alternateId),
            userPlanId: id
          }))
        );
      }
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "User Update Plan",
      notes: JSON.stringify(input),
      objectId: id
    });
    await createUserPlanNotification({ ctx, userId: input.userId });
    return { id };
  }),
  deleteShortFinishedPlans: rootProtectedProcedure.mutation(async ({ ctx }) => {
    const twelveHoursMs = 12 * 60 * 60 * 1e3;
    const finishedPlans = await ctx.db.select({
      id: userPlan.id,
      createdAt: userPlan.createdAt,
      finishedAt: userPlan.finishedAt
    }).from(userPlan).where(isNotNull(userPlan.finishedAt));
    const planIdsToDelete = finishedPlans.filter((plan2) => {
      if (!plan2.createdAt || !plan2.finishedAt) return false;
      const durationMs = plan2.finishedAt.getTime() - plan2.createdAt.getTime();
      return durationMs >= 0 && durationMs < twelveHoursMs;
    }).map((plan2) => plan2.id);
    if (planIdsToDelete.length === 0) {
      return {
        deletedCount: 0,
        deletedPlanIds: []
      };
    }
    await ctx.db.delete(userPlan).where(inArray2(userPlan.id, planIdsToDelete));
    createLog({
      user: ctx.session?.user.name ?? "",
      userId: ctx.session?.user.id ?? "",
      task: "Delete Short Finished User Plans",
      notes: JSON.stringify({
        deletedPlanIds: planIdsToDelete,
        hoursThreshold: 12
      }),
      objectId: null
    });
    return {
      deletedCount: planIdsToDelete.length,
      deletedPlanIds: planIdsToDelete
    };
  })
});

// src/server/api/routers/userCatagories.ts
import { and as and14, eq as eq27 } from "drizzle-orm";
import { z as z35 } from "zod";
var userCatagoriesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.userCategory.findMany();
    return res;
  }),
  create: protectedProcedure.input(z35.string()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(userCategory).values({
      name: input
    });
    return res;
  }),
  update: protectedProcedure.input(z35.object({ id: z35.number(), name: z35.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userCategory).set({
      name: input.name
    }).where(eq27(userCategory.id, input.id));
    return res;
  }),
  delete: protectedProcedure.input(z35.number()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(userCategory).where(eq27(userCategory.id, input));
    return res;
  }),
  addToUser: protectedProcedure.input(z35.object({ userId: z35.string(), categoryId: z35.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(userToUserCategory).values({
      userId: input.userId,
      categoryId: input.categoryId
    });
    return res;
  }),
  removeFromUser: protectedProcedure.input(z35.object({ userId: z35.string(), categoryId: z35.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(userToUserCategory).where(
      and14(
        eq27(userToUserCategory.userId, input.userId),
        eq27(userToUserCategory.categoryId, input.categoryId)
      )
    );
    return res;
  })
});

// src/server/api/routers/vege.ts
import { eq as eq28 } from "drizzle-orm";
import { z as z36 } from "zod";
var vegeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.vegeStack.findMany();
    return res;
  }),
  get: protectedProcedure.input(z36.object({ id: z36.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.vegeStack.findFirst({
      where: (store, { eq: eq30 }) => eq30(store.id, input.id)
    });
    return res;
  }),
  create: protectedProcedure.input(z36.object({ veges: z36.string(), notes: z36.string(), calories: z36.string(), name: z36.string() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(vegeStack).values({
      ...input
    });
    return res;
  }),
  delete: protectedProcedure.input(z36.object({ id: z36.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(vegeStack).where(eq28(vegeStack.id, input.id));
    return res;
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(vegeStack);
    return res;
  })
});

// src/server/api/routers/weigh-in.ts
import { TRPCError as TRPCError10 } from "@trpc/server";
import { eq as eq29 } from "drizzle-orm";
import { z as z37 } from "zod";
var weighInRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z37.object({
      date: z37.date().optional(),
      bodyWeight: z37.string(),
      bodyFat: z37.string(),
      leanMass: z37.string(),
      bloodPressure: z37.string(),
      userId: z37.string(),
      trainerId: z37.string(),
      notes: z37.string().optional(),
      image: z37.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(weighIn).values({
      ...input
    }).returning({ id: weighIn.id });
    return { res };
  }),
  getAllUser: protectedProcedure.input(z37.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError10({ code: "NOT_FOUND" });
    const res = await ctx.db.query.weighIn.findMany({
      where: eq29(weighIn.userId, input),
      orderBy: (data, { desc: desc11 }) => desc11(data.date)
    });
    return res;
  }),
  get: protectedProcedure.input(z37.number()).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.weighIn.findFirst({
      where: eq29(weighIn.id, input)
    });
    return res;
  }),
  delete: protectedProcedure.input(z37.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(weighIn).where(eq29(weighIn.id, input));
    return res;
  }),
  deleteAll: protectedProcedure.input(z37.string()).mutation(async ({ input, ctx }) => {
    if (input === "") throw new TRPCError10({ code: "NOT_FOUND" });
    const res = await ctx.db.delete(weighIn).where(eq29(weighIn.userId, input));
    return res;
  })
});

// src/server/api/routers/index.ts
var appRouter = createTRPCRouter({
  goal: goalsRouter,
  tag: tagRouter,
  dailyLog: dailyLogRouter,
  user: userRouter,
  ingredient: ingredientRouter,
  test: testRouter,
  groceryStore: groceryStoreRouter,
  settings: settingsRouter,
  recipe: recipeRouter,
  plan: planRouter,
  vege: vegeRouter,
  meal: mealRouter,
  userPlan: userPlanRouter,
  weighIn: weighInRouter,
  message: messageRouter,
  metrics: metricsRouter,
  trainer: trainerRouter,
  supplement: supplementsRouter,
  trainerNotes: trainerNotesRouter,
  userCatagories: userCatagoriesRouter,
  notifications: notificationRouter,
  adminLog: logRouter,
  pushSubscription: pushSubscriptionRouter,
  shoppingList: shoppingListRouter
});
var createCaller = createCallerFactory(appRouter);
export {
  appRouter,
  createCaller
};
