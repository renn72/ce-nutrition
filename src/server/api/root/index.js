var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/server/api/schema/ingredient.ts
import { z } from "zod";
var createIngredientSchema = z.object({
  name: z.string().min(1),
  serveSize: z.string(),
  serveUnit: z.string().min(1),
  caloriesWFibre: z.string(),
  caloriesWOFibre: z.string(),
  protein: z.string(),
  fatTotal: z.string(),
  totalDietaryFibre: z.string(),
  totalSugars: z.string(),
  starch: z.string(),
  resistantStarch: z.string(),
  availableCarbohydrateWithoutSugarAlcohols: z.string(),
  availableCarbohydrateWithSugarAlcohols: z.string(),
  isAllStores: z.boolean(),
  stores: z.array(z.string())
});
var updateIngredientSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  serveSize: z.string(),
  serveUnit: z.string().min(1),
  caloriesWFibre: z.string(),
  caloriesWOFibre: z.string(),
  protein: z.string(),
  fatTotal: z.string(),
  totalDietaryFibre: z.string(),
  totalSugars: z.string(),
  starch: z.string(),
  resistantStarch: z.string(),
  availableCarbohydrateWithoutSugarAlcohols: z.string(),
  availableCarbohydrateWithSugarAlcohols: z.string(),
  isAllStores: z.boolean(),
  stores: z.array(z.string())
});

// src/server/db/schema/ingredient.ts
import { relations as relations8, sql as sql8 } from "drizzle-orm";
import { int as int8, sqliteTable as sqliteTable8, text as text8, index as index8 } from "drizzle-orm/sqlite-core";

// src/server/db/schema/user.ts
import { relations as relations6, sql as sql6 } from "drizzle-orm";
import {
  index as index6,
  int as int6,
  primaryKey,
  sqliteTable as sqliteTable6,
  text as text6
} from "drizzle-orm/sqlite-core";

// src/server/db/schema/daily-logs.ts
import { relations as relations2, sql as sql2 } from "drizzle-orm";
import { index as index2, int as int2, sqliteTable as sqliteTable2, text as text2 } from "drizzle-orm/sqlite-core";

// src/server/db/schema/user-plan.ts
import { relations, sql } from "drizzle-orm";
import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";
var createTable = sqliteTable;
var userPlan = createTable(
  "user_plan",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    finishedAt: int("finished_at", { mode: "timestamp" }),
    startAt: int("start_at", { mode: "timestamp" }),
    isActive: int("is_active", { mode: "boolean" }),
    name: text("name").notNull(),
    description: text("description").notNull(),
    image: text("image").notNull(),
    notes: text("notes").notNull(),
    numberOfMeals: int("number_of_meals", { mode: "number" }),
    creatorId: text("creator_id").references(() => user.id, {
      onDelete: "cascade"
    }).notNull(),
    userId: text("user_id").references(() => user.id, {
      onDelete: "cascade"
    }).notNull(),
    favouriteAt: int("favourite_at", { mode: "timestamp" }),
    deletedAt: int("deleted_at", { mode: "timestamp" }),
    hiddenAt: int("hidden_at", { mode: "timestamp" })
  },
  (table) => [index("user_plan_user_id_idx").on(table.userId)]
);
var userMeal = createTable(
  "user_meal",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userPlanId: int("user_plan_id").references(() => userPlan.id, {
      onDelete: "cascade"
    }).notNull(),
    mealIndex: int("index", { mode: "number" }),
    mealTitle: text("meal_title"),
    calories: text("calories"),
    protein: text("protein"),
    targetProtein: text("target_protein"),
    targetCalories: text("target_calories"),
    vegeCalories: text("vege_calories"),
    veges: text("veges"),
    vegeNotes: text("vege_notes"),
    note: text("note")
  },
  (table) => [index("user_meal_user_plan_id_idx").on(table.userPlanId)]
);
var userRecipe = createTable(
  "user_recipe",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    mealIndex: int("meal_index", { mode: "number" }),
    recipeIndex: int("recipe_index", { mode: "number" }),
    userPlanId: int("user_plan_id").references(() => userPlan.id, {
      onDelete: "cascade"
    }),
    dailyMealId: int("daily_meal_id").references(() => dailyMeal.id, {
      onDelete: "cascade"
    }),
    parentId: int("parent_id"),
    name: text("name"),
    index: int("index", { mode: "number" }),
    serve: text("serve"),
    serveUnit: text("serve_unit"),
    note: text("note"),
    isLog: int("is_log", { mode: "boolean" }),
    dailyLogId: int("daily_log_id").references(() => dailyLog.id),
    isUserCreated: int("is_user_created", { mode: "boolean" }).default(false)
  },
  (table) => [
    index("user_recipe_daily_meal_id_index").on(table.dailyMealId),
    index("user_recipe_user_plan_id_idx").on(table.userPlanId),
    index("user_recipe_daily_log_id_idx").on(table.dailyLogId)
  ]
);
var userIngredient = createTable(
  "user_ingredient",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    ingredientId: int("ingredient_id").references(() => ingredient.id, {
      onDelete: "cascade"
    }).notNull(),
    userPlanId: int("user_plan_id").references(() => userPlan.id, {
      onDelete: "cascade"
    }),
    dailyMealId: int("daily_meal_id").references(() => dailyMeal.id, {
      onDelete: "cascade"
    }),
    name: text("name"),
    mealIndex: int("meal_index", { mode: "number" }),
    recipeIndex: int("recipe_index", { mode: "number" }),
    alternateId: int("alternate_id").references(() => ingredient.id),
    serve: text("serve"),
    serveUnit: text("serve_unit"),
    note: text("note"),
    dailyLogId: int("daily_log_id").references(() => dailyLog.id),
    isUserCreated: int("is_user_created", { mode: "boolean" }).default(false)
  },
  (table) => [
    index("user_ingredient_daily_meal_id_index").on(table.dailyMealId),
    index("user_ingredient_user_plan_id_idx").on(table.userPlanId),
    index("user_ingredient_daily_log_id_idx").on(table.dailyLogId)
  ]
);
var userPlanRelations = relations(userPlan, ({ one, many }) => ({
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
var userMealRelations = relations(userMeal, ({ one }) => ({
  userPlan: one(userPlan, {
    fields: [userMeal.userPlanId],
    references: [userPlan.id]
  })
}));
var userRecipeRelations = relations(userRecipe, ({ one }) => ({
  userPlan: one(userPlan, {
    fields: [userRecipe.userPlanId],
    references: [userPlan.id]
  }),
  dailyMeal: one(dailyMeal, {
    fields: [userRecipe.dailyMealId],
    references: [dailyMeal.id]
  })
}));
var userIngredientRelations = relations(userIngredient, ({ one }) => ({
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

// src/server/db/schema/daily-logs.ts
var createTable2 = sqliteTable2;
var dailyLog = createTable2(
  "daily_log",
  {
    id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int2("created_at", { mode: "timestamp" }).default(sql2`(unixepoch())`).notNull(),
    updatedAt: int2("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text2("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    date: text2("date").notNull(),
    morningWeight: text2("morning_weight"),
    notes: text2("notes"),
    fastedBloodGlucose: text2("fasted_blood_glucose"),
    sleep: text2("sleep"),
    sleepQuality: text2("sleep_quality"),
    isHiit: int2("is_hiit", { mode: "boolean" }),
    isCardio: int2("is_cardio", { mode: "boolean" }),
    isLift: int2("is_lift", { mode: "boolean" }),
    isLiss: int2("is_liss", { mode: "boolean" }),
    isPeriod: int2("is_period", { mode: "boolean" }),
    isOvulation: int2("is_ovulation", { mode: "boolean" }),
    isStarred: int2("is_starred", { mode: "boolean" }).default(false),
    hiit: text2("hiit"),
    cardio: text2("cardio"),
    weight: text2("weight"),
    liss: text2("liss"),
    posing: text2("posing"),
    steps: text2("steps"),
    sauna: text2("sauna"),
    mobility: text2("mobility"),
    coldPlunge: text2("cold_plunge"),
    cardioType: text2("cardio_type"),
    image: text2("image"),
    frontImage: text2("front_image"),
    sideImage: text2("side_image"),
    backImage: text2("back_image"),
    frontImageSvg: text2("front_image_svg"),
    sideImageSvg: text2("side_image_svg"),
    backImageSvg: text2("back_image_svg"),
    frontPoseImage: text2("front_pose_image"),
    sidePoseImage: text2("side_pose_image"),
    backPoseImage: text2("back_pose_image"),
    spareImageOne: text2("spare_image"),
    spareImageTwo: text2("spare_image"),
    waistMeasurement: text2("waist_measurement"),
    nap: text2("nap")
  },
  (table) => [index2("daily_log_user_id_index").on(table.userId)]
);
var dailyLogRelations = relations2(dailyLog, ({ one, many }) => ({
  user: one(user, { fields: [dailyLog.userId], references: [user.id] }),
  dailyMeals: many(dailyMeal),
  waterLogs: many(waterLog),
  poopLogs: many(poopLog),
  tags: many(tagToDailyLog),
  supplements: many(dailySupplement)
}));
var dailySupplement = createTable2(
  "daily_supplement",
  {
    id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int2("created_at", { mode: "timestamp" }).default(sql2`(unixepoch())`).notNull(),
    dailyLogId: int2("daily_log_id").notNull().references(() => dailyLog.id, {
      onDelete: "cascade"
    }),
    supplementId: int2("supplement_id").notNull().references(() => ingredient.id, {
      onDelete: "cascade"
    }),
    amount: text2("amount"),
    unit: text2("unit"),
    time: text2("time"),
    notes: text2("notes")
  },
  (table) => [
    index2("daily_supplement_daily_log_id_index").on(table.dailyLogId)
  ]
);
var dailySupplementRelations = relations2(
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
var tag = createTable2("tag", {
  id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int2("created_at", { mode: "timestamp" }).default(sql2`(unixepoch())`).notNull(),
  name: text2("name").notNull(),
  icon: text2("icon").notNull(),
  color: text2("color").notNull(),
  userId: text2("user_id").notNull().references(() => user.id, {
    onDelete: "cascade"
  })
});
var tagRelations = relations2(tag, ({ one, many }) => ({
  user: one(user, {
    fields: [tag.userId],
    references: [user.id]
  }),
  dailyLogs: many(tagToDailyLog)
}));
var tagToDailyLog = createTable2(
  "tag_to_daily_log",
  {
    id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    tagId: int2("tag_id").notNull().references(() => tag.id, {
      onDelete: "cascade"
    }),
    dailyLogId: int2("daily_log_id").notNull().references(() => dailyLog.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index2("tag_to_daily_log_tag_id_index").on(table.tagId)]
);
var tagToDailyLogRelations = relations2(tagToDailyLog, ({ one }) => ({
  tag: one(tag, {
    fields: [tagToDailyLog.tagId],
    references: [tag.id]
  }),
  dailyLog: one(dailyLog, {
    fields: [tagToDailyLog.dailyLogId],
    references: [dailyLog.id]
  })
}));
var poopLog = createTable2(
  "poop_log",
  {
    id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int2("created_at", { mode: "timestamp" }).default(sql2`(unixepoch())`).notNull(),
    dailyLogId: int2("daily_log_id").notNull().references(() => dailyLog.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index2("poop_log_daily_log_id_index").on(table.dailyLogId)]
);
var poopLogRelations = relations2(poopLog, ({ one, many }) => ({
  dailyLog: one(dailyLog, {
    fields: [poopLog.dailyLogId],
    references: [dailyLog.id]
  })
}));
var waterLog = createTable2(
  "water_log",
  {
    id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int2("created_at", { mode: "timestamp" }).default(sql2`(unixepoch())`).notNull(),
    dailyLogId: int2("daily_log_id").notNull().references(() => dailyLog.id, {
      onDelete: "cascade"
    }),
    amount: text2("water")
  },
  (table) => [index2("water_log_daily_log_id_index").on(table.dailyLogId)]
);
var waterLogRelations = relations2(waterLog, ({ one, many }) => ({
  dailyLog: one(dailyLog, {
    fields: [waterLog.dailyLogId],
    references: [dailyLog.id]
  })
}));
var dailyMeal = createTable2(
  "daily_meal",
  {
    id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int2("created_at", { mode: "timestamp" }).default(sql2`(unixepoch())`).notNull(),
    dailyLogId: int2("daily_log_id").notNull().references(() => dailyLog.id, {
      onDelete: "cascade"
    }),
    mealIndex: int2("meal_index", { mode: "number" }),
    date: int2("date", { mode: "timestamp" }),
    recipeId: int2("recipe_id"),
    vegeCalories: text2("vege_calories"),
    veges: text2("veges")
  },
  (table) => [index2("daily_meal_daily_log_id_index").on(table.dailyLogId)]
);
var dailyMealRelations = relations2(dailyMeal, ({ one, many }) => ({
  dailyLog: one(dailyLog, {
    fields: [dailyMeal.dailyLogId],
    references: [dailyLog.id]
  }),
  recipe: many(userRecipe),
  ingredients: many(userIngredient)
}));

// src/server/db/schema/message.ts
import { relations as relations3, sql as sql3 } from "drizzle-orm";
import { int as int3, sqliteTable as sqliteTable3, text as text3, index as index3 } from "drizzle-orm/sqlite-core";
var createTable3 = sqliteTable3;
var message = createTable3(
  "message",
  {
    id: int3("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int3("created_at", { mode: "timestamp" }).default(sql3`(unixepoch())`).notNull(),
    userId: text3("user_id").references(() => user.id, {
      onDelete: "cascade"
    }),
    subject: text3("subject"),
    isImportant: int3("is_important", { mode: "boolean" }),
    isRead: int3("is_read", { mode: "boolean" }).default(false),
    isViewed: int3("is_viewed", { mode: "boolean" }).default(false),
    isDeleted: int3("is_deleted", { mode: "boolean" }).default(false),
    isNotified: int3("is_notified", { mode: "boolean" }).default(false),
    message: text3("message"),
    image: text3("image"),
    fromUserId: text3("from_user_id").references(() => user.id, {
      onDelete: "cascade"
    })
  },
  (table) => [
    index3("message_user_id_idx").on(table.userId),
    index3("message_from_user_id_idx").on(table.fromUserId),
    index3("message_is_read_idx").on(table.isRead)
  ]
);
var messageRelations = relations3(message, ({ one }) => ({
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
import { relations as relations4, sql as sql4 } from "drizzle-orm";
import { index as index4, int as int4, sqliteTable as sqliteTable4, text as text4 } from "drizzle-orm/sqlite-core";
var createTable4 = sqliteTable4;
var skinfold = createTable4(
  "skinfold",
  {
    id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
    userId: text4("user_id").notNull().references(() => user.id),
    creatorId: text4("creator_id").references(() => user.id),
    date: text4("date").notNull(),
    chin: text4("chin"),
    cheek: text4("cheek"),
    lowerAbdominal: text4("lower_abdominal"),
    pectoral: text4("pectoral"),
    biceps: text4("biceps"),
    triceps: text4("triceps"),
    subscapular: text4("subscapular"),
    midAxillary: text4("mid_axillary"),
    suprailiac: text4("suprailiac"),
    umbilical: text4("umbilical"),
    lowerBack: text4("lower_back"),
    quadriceps: text4("quadriceps"),
    hamstrings: text4("hamstrings"),
    medialCalf: text4("medial_calf"),
    knee: text4("knee"),
    shoulder: text4("shoulder"),
    notes: text4("notes"),
    formula: text4("formula"),
    test: text4("test")
  },
  (table) => [index4("skinfold_user_id_idx").on(table.userId)]
);
var girthMeasurement = createTable4("girth_measurement", {
  id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
  userId: text4("user_id").notNull().references(() => user.id, {
    onDelete: "cascade"
  }),
  date: text4("date").notNull(),
  waist: text4("waist"),
  glutePeak: text4("glute_peaks"),
  bicep: text4("bicep"),
  cheastPeak: text4("chest_peak"),
  thighPeak: text4("thigh_peak"),
  calfPeak: text4("calf_peak"),
  frontRelaxedImage: text4("front_relaxed_image"),
  frontPosedImage: text4("front_posed_image"),
  sideRelaxedImage: text4("side_relaxed_image"),
  sidePosedImage: text4("side_posed_image"),
  backRelaxedImage: text4("back_relaxed_image"),
  backPosedImage: text4("back_posed_image"),
  gluteRelaxedImage: text4("glute_relaxed_image"),
  glutePosedImage: text4("glute_posed_image"),
  isDailyLog: int4("is_daily_log", { mode: "boolean" }).default(false)
});
var images = createTable4(
  "images",
  {
    id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
    userId: text4("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    name: text4("name").notNull(),
    date: text4("date").notNull(),
    image: text4("image").notNull(),
    svg: text4("svg")
  },
  (table) => [index4("images_user_id_idx").on(table.userId)]
);
var imagesRelations = relations4(images, ({ one }) => ({
  user: one(user, {
    fields: [images.userId],
    references: [user.id]
  })
}));
var girthMeasurementRelations = relations4(
  girthMeasurement,
  ({ one }) => ({
    user: one(user, {
      fields: [girthMeasurement.userId],
      references: [user.id]
    })
  })
);
var skinfoldRelations = relations4(skinfold, ({ one, many }) => ({
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
var bodyFat = createTable4(
  "body_fat",
  {
    id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
    userId: text4("user_id").notNull().references(() => user.id),
    date: text4("date").notNull(),
    bodyFat: text4("body_fat"),
    notes: text4("notes"),
    formula: text4("formula"),
    skinfoldId: int4("skinfold_id").references(() => skinfold.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index4("body_fat_user_id_idx").on(table.userId)]
);
var bodyFatRelations = relations4(bodyFat, ({ one }) => ({
  user: one(user, {
    fields: [bodyFat.userId],
    references: [user.id]
  }),
  skinfold: one(skinfold, {
    fields: [bodyFat.skinfoldId],
    references: [skinfold.id]
  })
}));
var leanMass = createTable4(
  "lean_mass",
  {
    id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
    userId: text4("user_id").notNull().references(() => user.id),
    date: text4("date").notNull(),
    leanMass: text4("lean_mass"),
    notes: text4("notes"),
    formula: text4("formula"),
    skinfoldId: int4("skinfold_id").references(() => skinfold.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index4("lean_mass_user_id_idx").on(table.userId)]
);
var leanMassRelations = relations4(leanMass, ({ one }) => ({
  user: one(user, {
    fields: [leanMass.userId],
    references: [user.id]
  }),
  skinfold: one(skinfold, {
    fields: [leanMass.skinfoldId],
    references: [skinfold.id]
  })
}));
var bodyWeight = createTable4(
  "body_weight",
  {
    id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
    userId: text4("user_id").notNull().references(() => user.id),
    date: text4("date").notNull(),
    bodyWeight: text4("body_weight"),
    source: text4("source"),
    notes: text4("notes"),
    skinfoldId: int4("skinfold_id").references(() => skinfold.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index4("body_weight_user_id_idx").on(table.userId)]
);
var bodyWeightRelations = relations4(bodyWeight, ({ one }) => ({
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
import { relations as relations5, sql as sql5 } from "drizzle-orm";
import { index as index5, int as int5, sqliteTable as sqliteTable5, text as text5 } from "drizzle-orm/sqlite-core";
var createTable5 = sqliteTable5;
var notification = createTable5(
  "notification",
  {
    id: int5("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int5("created_at", { mode: "timestamp" }).default(sql5`(unixepoch())`).notNull(),
    userId: text5("user_id").references(() => user.id, {
      onDelete: "cascade"
    }),
    code: text5("code"),
    title: text5("title"),
    description: text5("description"),
    isRead: int5("is_read", { mode: "boolean" }).default(false),
    isViewed: int5("is_viewed", { mode: "boolean" }).default(false),
    isDeleted: int5("is_deleted", { mode: "boolean" }).default(false),
    isNotified: int5("is_notified", { mode: "boolean" }).default(false),
    notes: text5("notes")
  },
  (table) => [
    index5("notification_user_id_idx").on(table.userId),
    index5("notification_is_read_idx").on(table.isRead)
  ]
);
var notificationRelations = relations5(notification, ({ one }) => ({
  user: one(user, {
    fields: [notification.userId],
    references: [user.id]
  })
}));

// src/server/db/schema/user.ts
var createTable6 = sqliteTable6;
var user = createTable6(
  "user",
  {
    id: text6("id", { length: 255 }).notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text6("name"),
    firstName: text6("first_name"),
    lastName: text6("last_name"),
    clerkId: text6("clerk_id"),
    birthDate: int6("birth_date", { mode: "timestamp" }),
    gender: text6("gender"),
    address: text6("address"),
    notes: text6("notes"),
    instagram: text6("instagram"),
    openLifter: text6("open_lifter"),
    phone: text6("phone"),
    email: text6("email").unique(),
    emailVerified: int6("email_verified", {
      mode: "timestamp"
    }),
    password: text6("password"),
    currentPlanId: int6("current_plan_id"),
    image: text6("image"),
    isActive: int6("is_active", { mode: "boolean" }).default(true),
    isFake: int6("is_fake", { mode: "boolean" }).default(false),
    isTrainer: int6("is_trainer", { mode: "boolean" }).default(false),
    isRoot: int6("is_root", { mode: "boolean" }).default(false),
    isCreator: int6("is_creator", { mode: "boolean" }).default(false),
    isAllTrainers: int6("is_all_trainers", { mode: "boolean" }).default(false),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    updatedAt: int6("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    )
  },
  (table) => [
    index6("user_email_idx").on(table.email),
    index6("user_is_creator_idx").on(table.isCreator)
  ]
);
var userRelations = relations6(user, ({ one, many }) => ({
  roles: many(role),
  notifications: many(notification),
  notificationsToggles: many(notificationToggle),
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
var notificationToggle = createTable6(
  "notification_toggle",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    userId: text6("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    type: text6("type"),
    interval: text6("interval"),
    sleep: text6("sleep")
  },
  (table) => [index6("notification_toggle_user_id_idx").on(table.userId)]
);
var notificationToggleRelations = relations6(
  notificationToggle,
  ({ one }) => ({
    user: one(user, {
      fields: [notificationToggle.userId],
      references: [user.id],
      relationName: "user"
    })
  })
);
var userToUserCategory = createTable6(
  "user_to_user_category",
  {
    userId: text6("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    categoryId: int6("category_id").notNull().references(() => userCategory.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index6("user_to_user_category_user_id_idx").on(table.userId)]
);
var usertoUserCategoryRelations = relations6(
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
var userCategory = createTable6("user_category", {
  id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text6("name")
});
var userCategoryRelations = relations6(userCategory, ({ many }) => ({
  users: many(userToUserCategory)
}));
var supplementStack = createTable6(
  "supplement_stack",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    updatedAt: int6("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text6("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    name: text6("name"),
    time: text6("time"),
    isTemplate: int6("is_template", { mode: "boolean" }).default(false),
    order: int6("order").default(0)
  },
  (table) => [index6("supplement_stack_user_id_idx").on(table.userId)]
);
var supplementStackRelations = relations6(
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
var supplementToSupplementStack = createTable6(
  "supplement_to_supplement_stack",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    supplementId: int6("supplement_id").references(() => ingredient.id, {
      onDelete: "cascade"
    }).notNull(),
    supplementStackId: int6("supplement_stack_id").references(() => supplementStack.id, {
      onDelete: "cascade"
    }).notNull(),
    size: text6("size"),
    unit: text6("unit"),
    order: int6("order").default(0)
  }
);
var supplementToSupplementStackRelations = relations6(
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
var trainerNotes = createTable6(
  "trainer_notes",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    updatedAt: int6("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text6("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    title: text6("title"),
    description: text6("description"),
    state: text6("state"),
    trainerId: text6("trainer_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index6("trainer_notes_user_id_idx").on(table.userId)]
);
var trainerNotesRelations = relations6(trainerNotes, ({ one }) => ({
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
var goals = createTable6(
  "goals",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    updatedAt: int6("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text6("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    title: text6("title"),
    description: text6("description"),
    state: text6("state"),
    completedAt: int6("completed_at", { mode: "timestamp" }),
    trainerId: text6("trainer_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index6("goals_user_id_idx").on(table.userId)]
);
var goalsRelations = relations6(goals, ({ one }) => ({
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
var userSettings = createTable6(
  "user_settings",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    updatedAt: int6("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text6("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    defaultWater: text6("default_water"),
    defaultChartRange: text6("default_chart_range"),
    isPosing: int6("is_posing", { mode: "boolean" }).default(false),
    isBloodGlucose: int6("is_blood_glucose", { mode: "boolean" }).default(false),
    isSleep: int6("is_sleep", { mode: "boolean" }).default(true),
    isSleepQuality: int6("is_sleep_quality", { mode: "boolean" }).default(true),
    isNap: int6("is_nap", { mode: "boolean" }).default(true),
    isWeightTraining: int6("is_weight", { mode: "boolean" }).default(true),
    isHiit: int6("is_hiit", { mode: "boolean" }).default(true),
    isLiss: int6("is_liss", { mode: "boolean" }).default(true),
    isNotes: int6("is_notes", { mode: "boolean" }).default(true),
    isSteps: int6("is_steps", { mode: "boolean" }).default(true),
    isSauna: int6("is_sauna", { mode: "boolean" }).default(true),
    isColdPlunge: int6("is_cold_plunge", { mode: "boolean" }).default(true),
    isMobility: int6("is_mobility", { mode: "boolean" }).default(false),
    isPeriodOvulaion: int6("is_period_ovulaion", { mode: "boolean" }).default(
      false
    ),
    ovulaionStartAt: int6("ovulaion_start_at", { mode: "timestamp" }),
    periodStartAt: int6("period_start_at", { mode: "timestamp" }),
    periodLength: int6("period_length").default(5).notNull(),
    periodInterval: int6("period_interval").default(28).notNull()
  },
  (table) => [index6("user_settings_user_id_idx").on(table.userId)]
);
var userSettingsRelations = relations6(userSettings, ({ one }) => ({
  user: one(user, {
    fields: [userSettings.userId],
    references: [user.id]
  })
}));
var weighIn = createTable6(
  "weigh_in",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    userId: text6("user_id").notNull().references(() => user.id),
    trainerId: text6("trainer_id").notNull().references(() => user.id),
    date: int6("date", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    bodyWeight: text6("body_weight"),
    leanMass: text6("lean_mass"),
    bodyFat: text6("body_fat"),
    bloodPressure: text6("blood_pressure"),
    image: text6("image"),
    notes: text6("notes")
  },
  (table) => [index6("weigh_in_user_id_idx").on(table.userId)]
);
var weighInRelations = relations6(weighIn, ({ one }) => ({
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
var userToTrainer = createTable6(
  "user_to_trainer",
  {
    userId: text6("user_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    }),
    trainerId: text6("trainer_id").notNull().references(() => user.id, {
      onDelete: "cascade"
    })
  },
  (table) => [
    index6("user_to_trainer_user_id_idx").on(table.userId),
    index6("user_to_trainer_trainer_id_idx").on(table.trainerId)
  ]
);
var role = createTable6(
  "role",
  {
    id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
    updatedAt: int6("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text6("user_id").references(() => user.id, {
      onDelete: "cascade"
    }),
    name: text6("name")
  },
  (table) => [index6("role_user_id_idx").on(table.userId)]
);
var account = createTable6(
  "account",
  {
    userId: text6("user_id", { length: 255 }).notNull().references(() => user.id),
    type: text6("type", { length: 255 }).$type().notNull(),
    provider: text6("provider", { length: 255 }).notNull(),
    providerAccountId: text6("provider_account_id", { length: 255 }).notNull(),
    refresh_token: text6("refresh_token"),
    access_token: text6("access_token"),
    expires_at: int6("expires_at"),
    token_type: text6("token_type", { length: 255 }),
    scope: text6("scope", { length: 255 }),
    id_token: text6("id_token"),
    session_state: text6("session_state", { length: 255 })
  },
  (account2) => ({
    compoundKey: primaryKey({
      columns: [account2.provider, account2.providerAccountId]
    })
  })
);
var verificationToken = createTable6(
  "verification_token",
  {
    identifier: text6("identifier", { length: 255 }).notNull(),
    token: text6("token", { length: 255 }).notNull(),
    expires: int6("expires", { mode: "timestamp" }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
);
var session = createTable6("session", {
  sessionToken: text6("session_token", { length: 255 }).notNull().primaryKey(),
  userId: text6("userId", { length: 255 }).notNull().references(() => user.id),
  expires: int6("expires", { mode: "timestamp" }).notNull()
});
var sessionsRelations = relations6(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] })
}));
var accountsRelations = relations6(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] })
}));
var roleRelations = relations6(role, ({ one }) => ({
  user: one(user, {
    fields: [role.userId],
    references: [user.id]
  })
}));
var userToTrainerRelations = relations6(userToTrainer, ({ one }) => ({
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

// src/server/db/schema/recipe.ts
import { relations as relations7, sql as sql7 } from "drizzle-orm";
import { index as index7, int as int7, sqliteTable as sqliteTable7, text as text7 } from "drizzle-orm/sqlite-core";
var createTable7 = sqliteTable7;
var recipe = createTable7(
  "recipe",
  {
    id: int7("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int7("created_at", { mode: "timestamp" }).default(sql7`(unixepoch())`).notNull(),
    updatedAt: int7("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    name: text7("name").notNull(),
    description: text7("description").notNull(),
    image: text7("image").notNull(),
    notes: text7("notes").notNull(),
    calories: int7("calories", { mode: "number" }).notNull(),
    creatorId: text7("creator_id").references(() => user.id).notNull(),
    isUserRecipe: int7("is_user_recipe", { mode: "boolean" }).default(false),
    isGlobal: int7("is_global", { mode: "boolean" }).default(false),
    recipeCategory: text7("recipe_category").notNull(),
    favouriteAt: int7("favourite_at", { mode: "timestamp" }),
    deletedAt: int7("deleted_at", { mode: "timestamp" }),
    hiddenAt: int7("hidden_at", { mode: "timestamp" })
  },
  (table) => [
    index7("recipe_user_id_idx").on(table.creatorId),
    index7("recipe_is_user_recipe_idx").on(table.isUserRecipe)
  ]
);
var recipeToIngredient = createTable7(
  "recipe_to_ingredient",
  {
    id: int7("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int7("created_at", { mode: "timestamp" }).default(sql7`(unixepoch())`).notNull(),
    recipeId: int7("recipe_id").references(() => recipe.id, {
      onDelete: "cascade"
    }).notNull(),
    ingredientId: int7("ingredient_id").references(() => ingredient.id, {
      onDelete: "cascade"
    }).notNull(),
    index: int7("index", { mode: "number" }).notNull(),
    alternateId: int7("alternate_id").references(() => ingredient.id),
    serveSize: text7("serve").notNull(),
    serveUnit: text7("serve_unit").notNull(),
    note: text7("note"),
    isUserCreated: int7("is_user_created", { mode: "boolean" }).default(false)
  },
  (table) => [index7("recipe_to_ingredient_recipe_id_index").on(table.recipeId)]
);
var recipeToIngredientRelations = relations7(
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
var recipeRelations = relations7(recipe, ({ one, many }) => ({
  creator: one(user, { fields: [recipe.creatorId], references: [user.id] }),
  recipeToIngredient: many(recipeToIngredient)
}));

// src/server/db/schema/ingredient.ts
var createTable8 = sqliteTable8;
var ingredient = createTable8(
  "ingredient",
  {
    id: int8("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int8("created_at", { mode: "timestamp" }).default(sql8`(unixepoch())`).notNull(),
    updatedAt: int8("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    userId: text8("user_id").references(() => user.id),
    favouriteAt: int8("favourite_at", { mode: "timestamp" }),
    deletedAt: int8("deleted_at", { mode: "timestamp" }),
    hiddenAt: int8("hidden_at", { mode: "timestamp" }),
    isAusFood: int8("is_aus_food", { mode: "boolean" }),
    isAllStores: int8("is_all_stores", { mode: "boolean" }).default(true),
    serveSize: text8("serve_size"),
    serveUnit: text8("serve_unit"),
    publicFoodKey: text8("public_food_key"),
    classification: text8("classification"),
    foodName: text8("food_name"),
    name: text8("name"),
    caloriesWFibre: text8("calories_w_fibre"),
    caloriesWOFibre: text8("calories_wo_fibre"),
    protein: text8("protein"),
    fatTotal: text8("fat_total"),
    totalDietaryFibre: text8("total_dietary_fibre"),
    totalSugars: text8("total_sugars"),
    starch: text8("starch"),
    resistantStarch: text8("resistant_starch"),
    availableCarbohydrateWithoutSugarAlcohols: text8(
      "available_carbohydrate_without_sugar_alcohols"
    ),
    availableCarbohydrateWithSugarAlcohols: text8(
      "available_carbohydrate_with_sugar_alcohols"
    ),
    isUserCreated: int8("is_user_created", { mode: "boolean" }).default(false),
    isSupplement: int8("is_supplement", { mode: "boolean" }).default(false),
    isPrivate: int8("is_private", { mode: "boolean" }).default(false),
    viewableBy: text8("viewable_by"),
    intervale: text8("intervale"),
    notes: text8("notes")
  }
);
var ingredientAdditionOne = createTable8("ingredient_addition_one", {
  id: int8("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int8("created_at", { mode: "timestamp" }).default(sql8`(unixepoch())`).notNull(),
  updatedAt: int8("updated_at", { mode: "timestamp" }).$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
  ingredientId: int8("ingredient_id").references(() => ingredient.id, {
    onDelete: "cascade"
  }),
  energyWithDietaryFibre: text8("energy_with_dietary_fibre"),
  energyWithoutDietaryFibre: text8("energy_without_dietary_fibre"),
  addedSugars: text8("added_sugars"),
  freeSugars: text8("free_sugars"),
  moisture: text8("moisture"),
  nitrogen: text8("nitrogen"),
  alcohol: text8("alcohol"),
  fructose: text8("fructose"),
  glucose: text8("glucose"),
  sucrose: text8("sucrose"),
  maltose: text8("maltose"),
  lactose: text8("lactose"),
  galactose: text8("galactose"),
  maltotrios: text8("maltotrios"),
  ash: text8("ash"),
  dextrin: text8("dextrin"),
  glycerol: text8("glycerol"),
  glycogen: text8("glycogen"),
  inulin: text8("inulin"),
  erythritol: text8("erythritol"),
  maltitol: text8("maltitol"),
  mannitol: text8("mannitol"),
  xylitol: text8("xylitol"),
  maltodextrin: text8("maltodextrin"),
  oligosaccharides: text8("oligosaccharides"),
  polydextrose: text8("polydextrose"),
  raffinose: text8("raffinose"),
  stachyose: text8("stachyose"),
  sorbitol: text8("sorbitol")
});
var ingredientAdditionTwo = createTable8("ingredient_addition_two", {
  id: int8("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int8("created_at", { mode: "timestamp" }).default(sql8`(unixepoch())`).notNull(),
  updatedAt: int8("updated_at", { mode: "timestamp" }).$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
  ingredientId: int8("ingredient_id").references(() => ingredient.id, {
    onDelete: "cascade"
  }),
  aceticAcid: text8("acetic_acid"),
  citricAcid: text8("citric_acid"),
  fumaricAcid: text8("fumaric_acid"),
  lacticAcid: text8("lactic_acid"),
  malicAcid: text8("malic_acid"),
  oxalicAcid: text8("oxalic_acid"),
  propionicAcid: text8("propionic_acid"),
  quinicAcid: text8("quinic_acid"),
  shikimicAcid: text8("shikimic_acid"),
  succinicAcid: text8("succinic_acid"),
  tartaricAcid: text8("tartaric_acid"),
  aluminium: text8("aluminium"),
  antimony: text8("antimony"),
  arsenic: text8("arsenic"),
  cadmium: text8("cadmium"),
  calcium: text8("calcium"),
  chromium: text8("chromium"),
  chloride: text8("chloride"),
  cobalt: text8("cobalt"),
  copper: text8("copper"),
  fluoride: text8("fluoride"),
  iodine: text8("iodine"),
  iron: text8("iron"),
  lead: text8("lead"),
  magnesium: text8("magnesium"),
  manganese: text8("manganese"),
  mercury: text8("mercury"),
  molybdenum: text8("molybdenum"),
  nickel: text8("nickel"),
  phosphorus: text8("phosphorus"),
  potassium: text8("potassium"),
  selenium: text8("selenium"),
  sodium: text8("sodium"),
  sulphur: text8("sulphur"),
  tin: text8("tin"),
  zinc: text8("zinc"),
  retinol: text8("retinol"),
  alphaCarotene: text8("alpha_carotene"),
  betaCarotene: text8("beta_carotene"),
  cryptoxanthin: text8("cryptoxanthin"),
  betaCaroteneEquivalents: text8("beta_carotene_equivalents"),
  vitaminARetinolEquivalents: text8("vitamin_a_retinol_equivalents"),
  lutein: text8("lutein"),
  lycopene: text8("lycopene"),
  xanthophyl: text8("xanthophyl"),
  thiamin: text8("thiamin"),
  riboflavin: text8("riboflavin"),
  niacin: text8("niacin"),
  niacinDerivedFromTryptophan: text8("niacin_derived_from_tryptophan"),
  niacinDerivedEquivalents: text8("niacin_derived_equivalents"),
  pantothenicAcid: text8("pantothenic_acid"),
  pyridoxine: text8("pyridoxine"),
  biotin: text8("biotin"),
  cobalamin: text8("cobalamin"),
  folateNatural: text8("folate_natural"),
  folicAcid: text8("folic_acid"),
  totalFolates: text8("total_folates"),
  dietaryFolateEquivalents: text8("dietary_folate_equivalents"),
  vitaminC: text8("vitamin_c"),
  cholecalciferol: text8("cholecalciferol"),
  ergocalciferol: text8("ergocalciferol"),
  hydroxyCholecalciferol: text8("hydroxy_cholecalciferol"),
  hydroxyErgocalciferol: text8("hydroxy_ergocalciferol"),
  vitaminDEquivalents: text8("vitamin_d_equivalents"),
  alphaTocopherol: text8("alpha_tocopherol"),
  alphaTocotrienol: text8("alpha_tocotrienol"),
  betaTocopherol: text8("beta_tocopherol"),
  betaTocotrienol: text8("beta_tocotrienol"),
  deltaTocopherol: text8("delta_tocopherol"),
  deltaTocotrienol: text8("delta_tocotrienol"),
  gammaTocopherol: text8("gamma_tocopherol"),
  gammaTocotrienol: text8("gamma_tocotrienol"),
  vitaminE: text8("vitamin_e")
});
var ingredientAdditionThree = createTable8(
  "ingredient_addition_three",
  {
    id: int8("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int8("created_at", { mode: "timestamp" }).default(sql8`(unixepoch())`).notNull(),
    updatedAt: int8("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    ingredientId: int8("ingredient_id").references(() => ingredient.id, {
      onDelete: "cascade"
    }),
    totalSaturatedFattyAcids: text8("total_saturated_fatty_acids"),
    totalMonounsaturatedFattyAcids: text8("total_monounsaturated_fatty_acids"),
    totalPolyunsaturatedFattyAcids: text8("total_polyunsaturated_fatty_acids"),
    totalLongChainOmega3FattyAcids: text8(
      "total_long_chain_omega_3_fatty_acids"
    ),
    totalTransFattyAcids: text8("total_trans_fatty_acids"),
    caffeine: text8("caffeine"),
    cholesterol: text8("cholesterol"),
    alanine: text8("alanine"),
    arginine: text8("arginine"),
    asparticAcid: text8("aspartic_acid"),
    cystinePlusCysteine: text8("cystine_plus_cysteine"),
    glutamicAcid: text8("glutamic_acid"),
    glycine: text8("glycine"),
    histidine: text8("histidine"),
    isoleucine: text8("isoleucine"),
    leucine: text8("leucine"),
    lysine: text8("lysine"),
    methionine: text8("methionine"),
    phenylalanine: text8("phenylalanine"),
    proline: text8("proline"),
    serine: text8("serine"),
    threonine: text8("threonine"),
    tyrosine: text8("tyrosine"),
    tryptophan: text8("tryptophan"),
    valine: text8("valine"),
    c4: text8("c4"),
    c6: text8("c6"),
    c8: text8("c8"),
    c10: text8("c10"),
    c11: text8("c11"),
    c12: text8("c12"),
    c13: text8("c13"),
    c14: text8("c14"),
    c15: text8("c15"),
    c16: text8("c16"),
    c17: text8("c17"),
    c18: text8("c18"),
    c19: text8("c19"),
    c20: text8("c20"),
    c21: text8("c21"),
    c22: text8("c22"),
    c23: text8("c23"),
    c24: text8("c24"),
    totalSaturatedFattyAcidsEquated: text8(
      "total_saturated_fatty_acids_equated"
    ),
    c10_1: text8("c10_1"),
    c12_1: text8("c12_1"),
    c14_1: text8("c14_1"),
    c15_1: text8("c15_1"),
    c16_1: text8("c16_1"),
    c17_1: text8("c17_1"),
    c18_1: text8("c18_1"),
    c18_1w5: text8("c18_1w5"),
    c18_1w6: text8("c18_1w6"),
    c18_1w7: text8("c18_1w7"),
    c18_1w9: text8("c18_1w9"),
    c20_1: text8("c20_1"),
    c20_1w9: text8("c20_1w9"),
    c20_1w13: text8("c20_1w13"),
    c20_1w11: text8("c20_1w11"),
    c22_1: text8("c22_1"),
    c22_1w9: text8("c22_1w9"),
    c22_1w11: text8("c22_1w11"),
    c24_1: text8("c24_1"),
    c24_1w9: text8("c24_1w9"),
    c24_1w11: text8("c24_1w11"),
    c24_1w13: text8("c24_1w13"),
    totalMonounsaturatedFattyAcidsEquated: text8(
      "total_monounsaturated_fatty_acids_equated"
    ),
    c12_2: text8("c12_2"),
    c16_2w4: text8("c16_2w4"),
    c16_3: text8("c16_3"),
    c18_2w6: text8("c18_2w6"),
    c18_3w3: text8("c18_3w3"),
    c18_3w4: text8("c18_3w4"),
    c18_3w6: text8("c18_3w6"),
    c18_4w1: text8("c18_4w1"),
    c18_4w3: text8("c18_4w3"),
    c20_2: text8("c20_2"),
    c20_2w6: text8("c20_2w6"),
    c20_3: text8("c20_3"),
    c20_3w3: text8("c20_3w3"),
    c20_3w6: text8("c20_3w6"),
    c20_4: text8("c20_4"),
    c20_4w3: text8("c20_4w3"),
    c20_4w6: text8("c20_4w6"),
    c20_5w3: text8("c20_5w3"),
    c21_5w3: text8("c21_5w3"),
    c22_2: text8("c22_2"),
    c22_2w6: text8("c22_2w6"),
    c22_4w6: text8("c22_4w6"),
    c22_5w3: text8("c22_5w3"),
    c22_5w6: text8("c22_5w6"),
    c22_6w3: text8("c22_6w3"),
    totalPolyunsaturatedFattyAcidsEquated: text8(
      "total_polyunsaturated_fatty_acids_equated"
    )
  }
);
var groceryStore = createTable8("grocery_store", {
  id: int8("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int8("created_at", { mode: "timestamp" }).default(sql8`(unixepoch())`).notNull(),
  name: text8("name"),
  location: text8("locations")
});
var ingredientToGroceryStore = createTable8(
  "ingredient_to_grocery_store",
  {
    id: int8("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int8("created_at", { mode: "timestamp" }).default(sql8`(unixepoch())`).notNull(),
    ingredientId: int8("ingredient_id").references(() => ingredient.id, {
      onDelete: "cascade"
    }),
    groceryStoreId: int8("grocery_store_id").references(() => groceryStore.id, {
      onDelete: "cascade"
    })
  },
  (table) => [index8("ingredient_to_grocery_store_ingredient_id_index").on(table.ingredientId)]
);
var groceryStoreRelations = relations8(groceryStore, ({ many }) => ({
  ingredientToGroceryStore: many(ingredientToGroceryStore)
}));
var ingredientToGroceryStoreRelations = relations8(
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
var ingredientRelations = relations8(ingredient, ({ one, many }) => ({
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
var ingredientAdditionOneRelations = relations8(
  ingredientAdditionOne,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [ingredientAdditionOne.ingredientId],
      references: [ingredient.id]
    })
  })
);
var ingredientAdditionTwoRelations = relations8(
  ingredientAdditionTwo,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [ingredientAdditionTwo.ingredientId],
      references: [ingredient.id]
    })
  })
);
var ingredientAdditionThreeRelations = relations8(
  ingredientAdditionThree,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [ingredientAdditionThree.ingredientId],
      references: [ingredient.id]
    })
  })
);

// src/env.js
import { createEnv } from "@t3-oss/env-nextjs";
import { z as z2 } from "zod";
var env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z2.string().url(),
    DATABASE_SYNC_URL: z2.string(),
    DATABASE_AUTH_TOKEN: z2.string(),
    NEXTAUTH_SECRET: z2.string(),
    NEXTAUTH_URL: z2.string(),
    EMAIL_SERVER_USER: z2.string(),
    EMAIL_SERVER_PASSWORD: z2.string(),
    EMAIL_SERVER_PORT: z2.string(),
    EMAIL_SERVER_HOST: z2.string(),
    EMAIL_FROM: z2.string(),
    VAPID_PRIVATE_KEY: z2.string(),
    UPLOADTHING_TOKEN: z2.string(),
    NODE_ENV: z2.enum(["development", "test", "production"]).default("development")
  },
  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: z2.string()
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

// src/server/auth/index.ts
import { cache } from "react";
import NextAuth from "next-auth";

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

// src/server/db/schema/settings.ts
import { int as int9, sqliteTable as sqliteTable9 } from "drizzle-orm/sqlite-core";
var createTable9 = sqliteTable9;
var settings = createTable9("settings", {
  id: int9("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  isCaloriesWithFibre: int9("is_calories_with_fibre", { mode: "boolean" })
});

// src/server/db/schema/plan.ts
import { relations as relations10, sql as sql10 } from "drizzle-orm";
import { int as int11, sqliteTable as sqliteTable11, text as text10 } from "drizzle-orm/sqlite-core";

// src/server/db/schema/meal.ts
import { relations as relations9, sql as sql9 } from "drizzle-orm";
import { int as int10, sqliteTable as sqliteTable10, text as text9 } from "drizzle-orm/sqlite-core";
var createTable10 = sqliteTable10;
var meal = createTable10("meal", {
  id: int10("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int10("created_at", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
  updatedAt: int10("updated_at", { mode: "timestamp" }).$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
  planId: int10("plan_id").references(() => plan.id, {
    onDelete: "cascade"
  }),
  name: text9("name"),
  description: text9("description"),
  image: text9("image"),
  notes: text9("notes"),
  creatorId: text9("creator_id").references(() => user.id),
  mealCategory: text9("meal_category"),
  favouriteAt: int10("favourite_at", { mode: "timestamp" }),
  deletedAt: int10("deleted_at", { mode: "timestamp" }),
  hiddenAt: int10("hidden_at", { mode: "timestamp" }),
  vegeNotes: text9("vege_notes"),
  vege: text9("vege"),
  vegeCalories: text9("vege_calories"),
  mealIndex: int10("index", { mode: "number" }),
  calories: text9("calories")
});
var mealToRecipe = createTable10("meal_to_recipe", {
  id: int10("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int10("created_at", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
  mealId: int10("meal_id").references(() => meal.id, {
    onDelete: "cascade"
  }),
  recipeId: int10("recipe_id").references(() => recipe.id, {
    onDelete: "cascade"
  }),
  index: int10("index", { mode: "number" }).notNull(),
  note: text9("note")
});
var vegeStack = createTable10("vege_stack", {
  id: int10("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int10("created_at", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
  updatedAt: int10("updated_at", { mode: "timestamp" }).$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
  name: text9("name"),
  veges: text9("veges"),
  notes: text9("notes"),
  calories: text9("calories")
});
var mealToVegeStack = createTable10("meal_to_vege_stack", {
  id: int10("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int10("created_at", { mode: "timestamp" }).default(sql9`(unixepoch())`).notNull(),
  mealId: int10("meal_id").references(() => meal.id, {
    onDelete: "cascade"
  }),
  vegeStackId: int10("vege_stack_id").references(() => vegeStack.id, {
    onDelete: "cascade"
  }),
  calories: text9("calories"),
  note: text9("note")
});
var mealRelations = relations9(meal, ({ one, many }) => ({
  creator: one(user, { fields: [meal.creatorId], references: [user.id] }),
  mealToRecipe: many(mealToRecipe),
  mealToVegeStack: many(mealToVegeStack),
  planToMeal: many(planToMeal),
  plan: one(plan, {
    fields: [meal.planId],
    references: [plan.id]
  })
}));
var vegeStackRelations = relations9(vegeStack, ({ one, many }) => ({
  mealToVegeStack: many(mealToVegeStack)
}));
var mealToVegeStackRelations = relations9(
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
var mealToRecipeRelations = relations9(mealToRecipe, ({ one }) => ({
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
var createTable11 = sqliteTable11;
var plan = createTable11("plan", {
  id: int11("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int11("created_at", { mode: "timestamp" }).default(sql10`(unixepoch())`).notNull(),
  updatedAt: int11("updated_at", { mode: "timestamp" }).$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
  name: text10("name"),
  description: text10("description"),
  image: text10("image"),
  notes: text10("notes"),
  numberOfMeals: int11("number_of_meals", { mode: "number" }),
  creatorId: text10("creator_id").references(() => user.id),
  isGlobal: int11("is_global", { mode: "boolean" }).default(false),
  planCategory: text10("recipe_category"),
  favouriteAt: int11("favourite_at", { mode: "timestamp" }),
  deletedAt: int11("deleted_at", { mode: "timestamp" }),
  hiddenAt: int11("hidden_at", { mode: "timestamp" }),
  planFolderId: int11("plan_folder_id").references(() => planFolder.id)
});
var planToMeal = createTable11("plan_to_meal", {
  id: int11("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int11("created_at", { mode: "timestamp" }).default(sql10`(unixepoch())`).notNull(),
  planId: int11("plan_id").references(() => plan.id, {
    onDelete: "cascade"
  }),
  mealId: int11("meal_id").references(() => meal.id, {
    onDelete: "cascade"
  }),
  mealIndex: int11("index", { mode: "number" }),
  mealTitle: text10("meal_title"),
  calories: text10("calories"),
  vegeCalories: text10("vege_calories"),
  note: text10("note")
});
var planRelations = relations10(plan, ({ one, many }) => ({
  creator: one(user, { fields: [plan.creatorId], references: [user.id] }),
  planToMeal: many(planToMeal),
  meals: many(meal),
  planFolder: one(planFolder, {
    fields: [plan.planFolderId],
    references: [planFolder.id]
  })
}));
var planToMealRelations = relations10(planToMeal, ({ one }) => ({
  meal: one(meal, {
    fields: [planToMeal.mealId],
    references: [meal.id]
  }),
  plan: one(plan, {
    fields: [planToMeal.planId],
    references: [plan.id]
  })
}));
var planFolder = createTable11("plan_folder", {
  id: int11("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int11("created_at", { mode: "timestamp" }).default(sql10`(unixepoch())`).notNull(),
  name: text10("name"),
  parentId: int11("parent_id")
});
var planFolderRelations = relations10(planFolder, ({ one, many }) => ({
  plans: many(plan),
  parent: one(planFolder, {
    fields: [planFolder.parentId],
    references: [planFolder.id]
  })
}));

// src/server/db/schema/log.ts
import { sql as sql11 } from "drizzle-orm";
import { int as int12, sqliteTable as sqliteTable12, text as text11 } from "drizzle-orm/sqlite-core";
var createTable12 = sqliteTable12;
var log = createTable12("log", {
  id: int12("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int12("created_at", { mode: "timestamp" }).default(sql11`(unixepoch())`).notNull(),
  objectId: int12("object_id"),
  task: text11("task"),
  notes: text11("notes"),
  user: text11("user"),
  userId: text11("user_id")
});
var logNew = createTable12("log_new", {
  id: int12("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int12("created_at", { mode: "timestamp" }).default(sql11`(unixepoch())`).notNull(),
  input: text11("input"),
  type: text11("type"),
  path: text11("path"),
  duration: int12("duration"),
  source: text11("source"),
  info: text11("info"),
  error: text11("error"),
  user: text11("user"),
  userId: text11("user_id")
});

// src/server/db/schema/push-subscription.ts
import { sql as sql12 } from "drizzle-orm";
import { int as int13, sqliteTable as sqliteTable13, text as text12 } from "drizzle-orm/sqlite-core";
var createTable13 = sqliteTable13;
var pushSubscription = createTable13(
  "push_subscription",
  {
    id: int13("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: int13("created_at", { mode: "timestamp" }).default(sql12`(unixepoch())`).notNull(),
    updatedAt: int13("updated_at", { mode: "timestamp" }).$onUpdate(
      () => /* @__PURE__ */ new Date()
    ),
    subscription: text12("subscription").notNull(),
    userId: text12("user_id").notNull()
  }
);

// src/server/db/index.ts
var createTable14 = sqliteTableCreator((name) => `${name}`);
var globalForDb = globalThis;
var client = globalForDb.client ?? createClient({
  url: env.DATABASE_URL
});
if (env.NODE_ENV !== "production") globalForDb.client = client;
var db = drizzle(client, { schema: schema_exports });
instrumentDrizzle(client, { dbSystem: "sqlite", maxQueryTextLength: 3e3 });

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
          where: (user2, { eq: eq29 }) => eq29(user2.id, token.uid),
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
          where: (user2, { eq: eq29 }) => eq29(user2.email, credentials.username)
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
    where: (user3, { eq: eq29 }) => eq29(user3.id, sessionUser.id),
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
    where: (user3, { eq: eq29 }) => eq29(user3.id, sessionUser.id)
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

// src/server/api/routers/ingredient.ts
import { asc, eq } from "drizzle-orm";
import { z as z3 } from "zod";
var ingredientRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.ingredient.findMany({
      where: (ingredient2, { isNull, and: and13, eq: eq29 }) => and13(
        isNull(ingredient2.hiddenAt),
        isNull(ingredient2.deletedAt),
        eq29(ingredient2.isSupplement, false),
        eq29(ingredient2.isPrivate, false),
        eq29(ingredient2.isUserCreated, false)
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
      where: (ingredient2, { isNull, and: and13, eq: eq29 }) => and13(
        isNull(ingredient2.hiddenAt),
        isNull(ingredient2.deletedAt),
        eq29(ingredient2.isSupplement, false),
        eq29(ingredient2.isPrivate, false),
        eq29(ingredient2.isUserCreated, false)
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
  get: protectedProcedure.input(z3.object({ id: z3.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.ingredient.findFirst({
      where: (ingredient2, { eq: eq29 }) => eq29(ingredient2.id, input.id),
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
  updateHiddenAt: protectedProcedure.input(z3.object({ id: z3.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(ingredient).set({
      hiddenAt: /* @__PURE__ */ new Date()
    }).where(eq(ingredient.id, input.id));
    console.log(res);
    return res;
  }),
  deleteHiddenAt: protectedProcedure.input(z3.object({ id: z3.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(ingredient).set({
      hiddenAt: null
    }).where(eq(ingredient.id, input.id));
    return res;
  }),
  updateFavourite: protectedProcedure.input(z3.object({ id: z3.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(ingredient).set({
      favouriteAt: /* @__PURE__ */ new Date()
    }).where(eq(ingredient.id, input.id));
    return res;
  }),
  deleteFavourite: protectedProcedure.input(z3.object({ id: z3.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(ingredient).set({
      favouriteAt: null
    }).where(eq(ingredient.id, input.id));
    return res;
  }),
  update: protectedProcedure.input(updateIngredientSchema).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { id, stores, ...rest } = input;
    console.log({ stores, ...rest });
    const res = await ctx.db.update(ingredient).set({
      ...rest,
      userId
    }).where(eq(ingredient.id, id)).returning({ id: ingredient.id });
    const ingredientId = res[0]?.id;
    if (stores.length > 0 && ingredientId) {
      await ctx.db.delete(ingredientToGroceryStore).where(eq(ingredientToGroceryStore.ingredientId, ingredientId));
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
  delete: protectedProcedure.input(z3.object({ id: z3.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(ingredient).where(eq(ingredient.id, input.id));
    return res;
  })
});

// src/server/api/schema/store.ts
import { z as z4 } from "zod";
var createStoreSchema = z4.object({
  name: z4.string().min(1),
  location: z4.string()
});

// src/server/api/routers/store.ts
import { eq as eq2 } from "drizzle-orm";
import { z as z5 } from "zod";
var groceryStoreRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.groceryStore.findMany();
    return res;
  }),
  get: protectedProcedure.input(z5.object({ id: z5.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.groceryStore.findFirst({
      where: (store, { eq: eq29 }) => eq29(store.id, input.id)
    });
    return res;
  }),
  create: protectedProcedure.input(createStoreSchema).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(groceryStore).values({
      ...input
    });
    return res;
  }),
  delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(groceryStore).where(eq2(groceryStore.id, input.id));
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
    const builtIndexes = (Array.isArray(extraConfig) ? extraConfig : Object.values(extraConfig ?? {})).map((b) => b?.build(table)).filter((b) => b !== void 0).filter((index10) => !(is(index10, PgCheck) || is(index10, MySqlCheck) || is(index10, SQLiteCheck)));
    const fks = builtIndexes.filter(
      (index10) => is(index10, PgForeignKey) || is(index10, MySqlForeignKey) || is(index10, SQLiteForeignKey)
    );
    if (!this.relational) {
      this.generateForeignKeys(fks);
    }
    if (extraConfigBuilder && builtIndexes.length > fks.length) {
      const indexes = extraConfig ?? {};
      dbml.newLine().tab().insert("indexes {").newLine();
      for (const indexName in indexes) {
        const index10 = indexes[indexName].build(table);
        dbml.tab(2);
        if (is(index10, PgIndex) || is(index10, MySqlIndex) || is(index10, SQLiteIndex)) {
          const configColumns = index10.config.columns.flatMap(
            (entry) => is(entry, SQL) ? entry.queryChunks.filter((v) => is(v, Column)) : entry
          );
          const idxColumns = wrapColumns(
            configColumns,
            this.buildQueryConfig.escapeName
          );
          const idxProperties = index10.config.name ? ` [name: '${index10.config.name}'${index10.config.unique ? ", unique" : ""}]` : "";
          dbml.insert(`${idxColumns}${idxProperties}`);
        }
        if (is(index10, PgPrimaryKey) || is(index10, MySqlPrimaryKey) || is(index10, SQLitePrimaryKey)) {
          const pkColumns = wrapColumns(index10.columns, this.buildQueryConfig.escapeName);
          dbml.insert(`${pkColumns} [pk]`);
        }
        if (is(index10, PgUniqueConstraint) || is(index10, MySqlUniqueConstraint) || is(index10, SQLiteUniqueConstraint)) {
          const uqColumns = wrapColumns(index10.columns, this.buildQueryConfig.escapeName);
          const uqProperties = index10.name ? `[name: '${index10.name}', unique]` : "[unique]";
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
      const relations11 = relations_[i].config({
        one: createOne(relations_[i].table),
        many: createMany(relations_[i].table)
      });
      for (const relationName in relations11) {
        const relation = relations11[relationName];
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
    const relations11 = [];
    for (const key in this.schema) {
      const value = this.schema[key];
      if (isPgEnum(value)) {
        generatedEnums.push(this.generateEnum(value));
      } else if (is(value, PgTable) || is(value, MySqlTable) || is(value, SQLiteTable)) {
        generatedTables.push(this.generateTable(value));
      } else if (is(value, Relations)) {
        relations11.push(value);
      }
    }
    if (this.relational) {
      this.generateRelations(relations11);
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
      where: (user3, { eq: eq29 }) => eq29(user3.email, "renn@warner.systems"),
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
      where: (user3, { eq: eq29 }) => eq29(user3.email, "renn@warner.systems"),
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

// src/server/api/routers/user/admin-logs.ts
import { eq as eq3 } from "drizzle-orm";
import { z as z6 } from "zod";
var adminLogs = {
  getAdminLogs: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.log.findMany({
      limit: 4e3,
      orderBy: (log2, { desc: desc10 }) => [desc10(log2.createdAt)]
    });
    return res;
  }),
  deleteAdminLog: protectedProcedure.input(z6.number()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(log).where(eq3(log.id, input));
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
import { TRPCError as TRPCError2 } from "@trpc/server";
import { eq as eq4, sql as sql13 } from "drizzle-orm";
import { z as z7 } from "zod";
var get = {
  getName: protectedProcedure.input(z7.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError2({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq29 }) => eq29(user2.id, input),
      columns: {
        id: true,
        firstName: true,
        lastName: true,
        name: true
      }
    });
    return res;
  }),
  getBasic: protectedProcedure.input(z7.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError2({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq29 }) => eq29(user2.id, input),
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
  getAllYour: protectedProcedure.input(z7.string().optional()).query(async ({ ctx, input }) => {
    const userId = input && input !== "" ? input : ctx.session?.user.id;
    const res = await ctx.db.query.user.findMany({
      columns: {
        id: true,
        name: true,
        isTrainer: true,
        email: true
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
        rowNumber: sql13`row_number() OVER (PARTITION BY ${dailyLog.userId} ORDER BY ${dailyLog.updatedAt} DESC)`.as(
          "rn"
        )
      }).from(dailyLog)
    );
    const latestLogs = await ctx.db.with(latestLogsSq).select().from(latestLogsSq).where(eq4(latestLogsSq.rowNumber, 1));
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
    return res;
  }),
  checkEmail: publicProcedure.input(z7.string()).mutation(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError2({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq29 }) => eq29(user2.email, input)
    });
    return res ? true : false;
  }),
  getGaurenteed: protectedProcedure.input(z7.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError2({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq29 }) => eq29(user2.id, input),
      columns: {
        password: false
      },
      with: {
        settings: true,
        images: true,
        roles: true,
        supplementStacks: {
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
    if (!res) throw new TRPCError2({ code: "NOT_FOUND" });
    return res;
  }),
  getCurrentUserRoles: protectedProcedure.input(z7.object({ id: z7.string() }).optional()).query(async ({ ctx, input }) => {
    let userId = ctx.session?.user.id;
    if (input?.id && input.id !== "") userId = input.id;
    if (!userId) return null;
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq29 }) => eq29(user2.id, userId),
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
        roles: true
      }
    });
    return res;
  }),
  getCurrentUser: protectedProcedure.input(z7.object({ id: z7.string() }).optional()).query(async ({ ctx, input }) => {
    let userId = ctx.session?.user.id;
    if (input?.id && input.id !== "") userId = input.id;
    if (!userId) return null;
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq29 }) => eq29(user2.id, userId),
      columns: {
        password: false
      },
      with: {
        images: true,
        settings: true,
        roles: true,
        trainers: true,
        supplementStacks: {
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
  getByEmail: protectedProcedure.input(z7.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError2({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq29 }) => eq29(user2.email, input),
      columns: {
        password: false
      }
    });
    return res;
  }),
  getInfoPage: protectedProcedure.input(z7.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError2({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq29 }) => eq29(user2.id, input),
      columns: {
        id: true
      },
      with: {
        settings: true,
        roles: true,
        images: true,
        trainers: true,
        supplementStacks: {
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
  get: protectedProcedure.input(z7.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError2({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user2, { eq: eq29 }) => eq29(user2.id, input),
      columns: {
        password: false
      },
      with: {
        settings: true,
        roles: true,
        images: true,
        trainers: true,
        supplementStacks: {
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
      where: (user2, { eq: eq29 }) => eq29(user2.id, userId),
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
      where: (user2, { eq: eq29 }) => eq29(user2.id, userId),
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
      where: (user2, { eq: eq29 }) => eq29(user2.id, userId),
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
      where: (user2, { eq: eq29 }) => eq29(user2.id, userId),
      with: {
        roles: true
      }
    });
    if (!res) return false;
    const isAdmin = res?.roles?.find((role2) => role2.name === "admin") ? true : false;
    return isAdmin;
  })
};

// src/server/api/routers/user/post.ts
import { hash as hash2 } from "bcryptjs";
import { eq as eq5 } from "drizzle-orm";
import { z as z8 } from "zod";
var post = {
  createUser: publicProcedure.input(
    z8.object({
      email: z8.string().email(),
      password: z8.string(),
      firstName: z8.string(),
      lastName: z8.string(),
      birthDate: z8.date().optional().nullable(),
      isCreator: z8.boolean().optional(),
      isTrainer: z8.boolean().optional(),
      isRoot: z8.boolean().optional()
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
  deleteUser: adminProtectedProcedure.input(z8.string()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(user).where(eq5(user.id, input));
    return res;
  })
};

// src/server/api/routers/admin-log.ts
import { z as z9 } from "zod";
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
    z9.object({
      task: z9.string(),
      notes: z9.string()
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

// src/server/api/routers/user/roles.ts
import { eq as eq6 } from "drizzle-orm";
import { z as z10 } from "zod";
var roles = {
  updateRoot: rootProtectedProcedure.input(z10.object({ isRoot: z10.boolean(), id: z10.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      isRoot: input.isRoot
    }).where(eq6(user.id, input.id));
    return res;
  }),
  updateRoleNotifyFrontImage: protectedProcedure.input(z10.object({ userId: z10.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq29, and: and13 }) => and13(
        eq29(role2.userId, input.userId),
        eq29(role2.name, "notify-trainer-front-image")
      )
    });
    if (res) {
      await ctx.db.delete(role).where(eq6(role.id, res.id));
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
  updateRoleNotifyTrainerAllImages: protectedProcedure.input(z10.object({ userId: z10.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq29, and: and13 }) => and13(
        eq29(role2.userId, input.userId),
        eq29(role2.name, "notify-trainer-all-images")
      )
    });
    if (res) {
      await ctx.db.delete(role).where(eq6(role.id, res.id));
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
  updateRoleBodyBuilderImages: protectedProcedure.input(z10.object({ userId: z10.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq29, and: and13 }) => and13(
        eq29(role2.userId, input.userId),
        eq29(role2.name, "body-builder-images")
      )
    });
    if (res) {
      await ctx.db.delete(role).where(eq6(role.id, res.id));
    } else {
      await ctx.db.insert(role).values({
        name: "body-builder-images",
        userId: input.userId
      });
    }
    return res;
  }),
  updateRoleSupplementDisclaimer: protectedProcedure.input(z10.object({ userId: z10.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq29, and: and13 }) => and13(
        eq29(role2.userId, input.userId),
        eq29(role2.name, "supplement_disclaimer_v1")
      )
    });
    if (res) {
      await ctx.db.delete(role).where(eq6(role.id, res.id));
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
  updateRoleSupplements: protectedProcedure.input(z10.object({ userId: z10.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq29, and: and13 }) => and13(eq29(role2.userId, input.userId), eq29(role2.name, "supplements"))
    });
    if (res) {
      await ctx.db.delete(role).where(eq6(role.id, res.id));
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
  updateRoleCreateMeals: protectedProcedure.input(z10.object({ userId: z10.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq29, and: and13 }) => and13(eq29(role2.userId, input.userId), eq29(role2.name, "create-meals"))
    });
    if (res) {
      await ctx.db.delete(role).where(eq6(role.id, res.id));
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
  updateRoleAdmin: protectedProcedure.input(z10.object({ userId: z10.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role2, { eq: eq29, and: and13 }) => and13(eq29(role2.userId, input.userId), eq29(role2.name, "admin"))
    });
    if (res) {
      await ctx.db.delete(role).where(eq6(role.id, res.id));
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
import { hash as hash3 } from "bcryptjs";
import { eq as eq7 } from "drizzle-orm";
import { z as z11 } from "zod";
var update = {
  updateChartRange: protectedProcedure.input(z11.object({ range: z11.number(), id: z11.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      defaultChartRange: input.range.toString()
    }).where(eq7(userSettings.id, input.id));
    return res;
  }),
  updateIsPeriodOvualtion: protectedProcedure.input(
    z11.object({
      id: z11.number(),
      isPeriodOvulaion: z11.boolean()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isPeriodOvulaion: input.isPeriodOvulaion
    }).where(eq7(userSettings.id, input.id));
    return res;
  }),
  updateOvulationStart: protectedProcedure.input(
    z11.object({
      start: z11.date().nullable(),
      id: z11.number()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      ovulaionStartAt: input.start
    }).where(eq7(userSettings.id, input.id));
    return res;
  }),
  updatePeriodStart: protectedProcedure.input(
    z11.object({
      start: z11.date().nullable(),
      id: z11.number(),
      userId: z11.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      periodStartAt: input.start
    }).where(eq7(userSettings.id, input.id));
    return res;
  }),
  updatePeriodLength: protectedProcedure.input(z11.object({ length: z11.number(), id: z11.number(), userId: z11.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      periodLength: input.length
    }).where(eq7(userSettings.id, input.id));
    return res;
  }),
  updatePeriodInterval: protectedProcedure.input(
    z11.object({ interval: z11.number(), id: z11.number(), userId: z11.string() })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      periodInterval: input.interval
    }).where(eq7(userSettings.id, input.id));
    return res;
  }),
  updateWater: protectedProcedure.input(z11.object({ water: z11.number(), id: z11.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      defaultWater: input.water.toString()
    }).where(eq7(userSettings.id, input.id));
    return res;
  }),
  updateIsPosing: protectedProcedure.input(z11.object({ id: z11.string(), isPosing: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isPosing: input.isPosing
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateIsBloodGlucose: protectedProcedure.input(z11.object({ id: z11.string(), isBloodGlucose: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isBloodGlucose: input.isBloodGlucose
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateIsSleep: protectedProcedure.input(z11.object({ id: z11.string(), isSleep: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isSleep: input.isSleep
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateIsSleepQuality: protectedProcedure.input(z11.object({ id: z11.string(), isSleepQuality: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isSleepQuality: input.isSleepQuality
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateIsNap: protectedProcedure.input(z11.object({ id: z11.string(), isNap: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isNap: input.isNap
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateIsWeightTraining: protectedProcedure.input(z11.object({ id: z11.string(), isWeightTraining: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isWeightTraining: input.isWeightTraining
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateIsHiit: protectedProcedure.input(z11.object({ id: z11.string(), isHiit: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isHiit: input.isHiit
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateIsMobility: protectedProcedure.input(z11.object({ id: z11.string(), isMobility: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isMobility: input.isMobility
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateIsLiss: protectedProcedure.input(z11.object({ id: z11.string(), isLiss: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isLiss: input.isLiss
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateIsNote: protectedProcedure.input(z11.object({ id: z11.string(), isNote: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isNotes: input.isNote
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateIsSauna: protectedProcedure.input(z11.object({ id: z11.string(), isSauna: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isSauna: input.isSauna
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateIsColdPlunge: protectedProcedure.input(z11.object({ id: z11.string(), isColdPlunge: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isColdPlunge: input.isColdPlunge
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateIsSteps: protectedProcedure.input(z11.object({ id: z11.string(), isSteps: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isSteps: input.isSteps
    }).where(eq7(userSettings.userId, input.id));
    return res;
  }),
  updateTrainer: protectedProcedure.input(z11.object({ id: z11.string(), isTrainer: z11.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      isTrainer: input.isTrainer
    }).where(eq7(user.id, input.id));
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
    z11.object({
      firstName: z11.string(),
      id: z11.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      firstName: input.firstName
    }).where(eq7(user.id, input.id));
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
    z11.object({
      lastName: z11.string(),
      id: z11.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      lastName: input.lastName
    }).where(eq7(user.id, input.id));
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
    z11.object({
      email: z11.string(),
      id: z11.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      email: input.email
    }).where(eq7(user.id, input.id));
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
    z11.object({
      password: z11.string(),
      id: z11.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const hashedPassword = await hash3(input.password, 10);
    const res = await ctx.db.update(user).set({
      password: hashedPassword
    }).where(eq7(user.id, input.id));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Update Password",
      notes: JSON.stringify(input)
    });
    return res;
  })
};

// src/server/api/routers/user/notifications.ts
import { eq as eq8 } from "drizzle-orm";
import { z as z12 } from "zod";
var notifications = {
  getNotifications: protectedProcedure.input(z12.object({ userId: z12.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.notificationToggle.findMany({
      where: (toggle, { eq: eq29 }) => eq29(toggle.userId, input.userId)
    });
    return res;
  }),
  toggleNotification: protectedProcedure.input(
    z12.object({
      userId: z12.string(),
      type: z12.string(),
      interval: z12.string(),
      sleep: z12.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.query.notificationToggle.findFirst({
      where: (toggle, { eq: eq29, and: and13 }) => and13(eq29(toggle.userId, input.userId), eq29(toggle.type, input.type))
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
      const toggle = await ctx.db.delete(notificationToggle).where(eq8(notificationToggle.id, res.id));
      return toggle;
    }
  }),
  updateNotification: protectedProcedure.input(
    z12.object({
      interval: z12.string(),
      sleep: z12.string().optional(),
      id: z12.number()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(notificationToggle).set({
      interval: input.interval,
      sleep: input.sleep
    }).where(eq8(notificationToggle.id, input.id));
    return res;
  })
};

// src/server/api/routers/user.ts
var userRouter = createTRPCRouter({
  ...get,
  ...update,
  ...roles,
  ...generation,
  ...post,
  ...adminLogs,
  ...notifications
});

// src/server/api/routers/settings.ts
import { z as z13 } from "zod";
var settingsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ input, ctx }) => {
    const res = await ctx.db.query.settings.findFirst();
    return res;
  }),
  updateCalories: protectedProcedure.input(z13.boolean()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(settings).set({
      isCaloriesWithFibre: input
    });
    return res;
  })
});

// src/server/api/routers/recipe.ts
import { desc as desc3, eq as eq9 } from "drizzle-orm";
import { z as z14 } from "zod";
var recipeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.recipe.findMany({
      where: (recipe2, { eq: eq29 }) => eq29(recipe2.isUserRecipe, false),
      orderBy: [desc3(recipe.createdAt)],
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
  getAllUserCreated: protectedProcedure.input(z14.object({ userId: z14.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.recipe.findMany({
      where: (recipe2, { eq: eq29, and: and13 }) => and13(
        eq29(recipe2.creatorId, input.userId),
        eq29(recipe2.isUserRecipe, true)
      ),
      orderBy: [desc3(recipe.createdAt)],
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
  get: protectedProcedure.input(z14.object({ id: z14.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.recipe.findFirst({
      where: (recipe2, { eq: eq29 }) => eq29(recipe2.id, input.id),
      with: {
        creator: true,
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
    });
    return res;
  }),
  update: protectedProcedure.input(
    z14.object({
      id: z14.number(),
      name: z14.string(),
      description: z14.string(),
      image: z14.string(),
      notes: z14.string(),
      recipeCategory: z14.string(),
      calories: z14.number(),
      isUserRecipe: z14.boolean().optional(),
      ingredients: z14.array(
        z14.object({
          ingredientId: z14.number(),
          alternateId: z14.string(),
          note: z14.string(),
          serveSize: z14.string(),
          serveUnit: z14.string(),
          index: z14.number(),
          isAlternate: z14.boolean().optional()
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { ingredients, ...data } = input;
    const res = await ctx.db.update(recipe).set(data).where(eq9(recipe.id, input.id)).returning({ id: recipe.id });
    const resId = res?.[0]?.id;
    if (!resId) return res;
    await ctx.db.delete(recipeToIngredient).where(eq9(recipeToIngredient.recipeId, resId));
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
  duplicate: protectedProcedure.input(z14.object({ id: z14.number() })).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const recipeRes = await ctx.db.query.recipe.findFirst({
      where: eq9(recipe.id, input.id),
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
    z14.object({
      name: z14.string(),
      description: z14.string(),
      image: z14.string(),
      notes: z14.string(),
      recipeCategory: z14.string(),
      calories: z14.number(),
      isUserRecipe: z14.boolean().optional(),
      ingredients: z14.array(
        z14.object({
          ingredientId: z14.number(),
          alternateId: z14.string(),
          note: z14.string(),
          serveSize: z14.string(),
          serveUnit: z14.string(),
          index: z14.number()
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
  delete: protectedProcedure.input(z14.object({ id: z14.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(recipe).where(eq9(recipe.id, input.id));
    return res;
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(recipe);
    return res;
  })
});

// src/server/api/routers/plan.ts
import { desc as desc4, eq as eq10 } from "drizzle-orm";
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
    const res = await ctx.db.delete(planFolder).where(eq10(planFolder.id, input.id));
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
      where: (plan2, { eq: eq29 }) => eq29(plan2.creatorId, input.userId),
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
  get: protectedProcedure.input(z15.object({ id: z15.number() })).query(async ({ input, ctx }) => {
    if (input.id === 0) return null;
    console.log("input get", input);
    const res = await ctx.db.query.plan.findFirst({
      where: (plan2, { eq: eq29 }) => eq29(plan2.id, input.id),
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
    await ctx.db.delete(plan).where(eq10(plan.id, input.id));
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
    }).where(eq10(plan.id, input.id));
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
    const res = await ctx.db.delete(plan).where(eq10(plan.id, input.id));
    return res;
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(plan);
    return res;
  })
});

// src/server/api/routers/meal.ts
import { desc as desc5, eq as eq11 } from "drizzle-orm";
import { z as z16 } from "zod";
var mealRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.meal.findMany({
      orderBy: [desc5(meal.createdAt)],
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
  get: protectedProcedure.input(z16.object({ id: z16.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.meal.findFirst({
      where: (meal2, { eq: eq29 }) => eq29(meal2.id, input.id),
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
    z16.object({
      name: z16.string(),
      description: z16.string(),
      image: z16.string(),
      notes: z16.string(),
      mealCategory: z16.string(),
      veges: z16.object({
        vegeStackId: z16.number(),
        note: z16.string(),
        calories: z16.string()
      }).optional(),
      recipes: z16.array(
        z16.object({
          recipeId: z16.number(),
          note: z16.string(),
          index: z16.number()
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
    z16.object({
      id: z16.number(),
      name: z16.string(),
      description: z16.string(),
      image: z16.string(),
      notes: z16.string(),
      mealCategory: z16.string(),
      veges: z16.object({
        vegeStackId: z16.number(),
        note: z16.string(),
        calories: z16.string()
      }).optional(),
      recipes: z16.array(
        z16.object({
          recipeId: z16.number(),
          note: z16.string(),
          index: z16.number()
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    const { veges, recipes, id, ...data } = input;
    const res = await ctx.db.update(meal).set({
      ...data
    }).where(eq11(meal.id, input.id));
    await ctx.db.delete(mealToRecipe).where(eq11(mealToRecipe.mealId, input.id));
    const recipeRes = await ctx.db.insert(mealToRecipe).values(
      recipes.map((recipe2) => ({
        ...recipe2,
        mealId: input.id
      }))
    ).returning({ id: mealToRecipe.id });
    await ctx.db.delete(mealToVegeStack).where(eq11(mealToVegeStack.mealId, input.id));
    if (veges && veges.vegeStackId != 0) {
      await ctx.db.insert(mealToVegeStack).values({
        ...veges,
        mealId: input.id
      });
    }
    return { res, recipeRes };
  }),
  updateFavourite: protectedProcedure.input(z16.object({ id: z16.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(meal).set({
      favouriteAt: /* @__PURE__ */ new Date()
    }).where(eq11(meal.id, input.id));
    return res;
  }),
  deleteFavourite: protectedProcedure.input(z16.object({ id: z16.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(meal).set({
      favouriteAt: null
    }).where(eq11(meal.id, input.id));
    return res;
  }),
  delete: protectedProcedure.input(z16.object({ id: z16.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(meal).where(eq11(meal.id, input.id));
    return res;
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(meal);
    return res;
  })
});

// src/server/api/routers/vege.ts
import { eq as eq12 } from "drizzle-orm";
import { z as z17 } from "zod";
var vegeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.vegeStack.findMany();
    return res;
  }),
  get: protectedProcedure.input(z17.object({ id: z17.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.vegeStack.findFirst({
      where: (store, { eq: eq29 }) => eq29(store.id, input.id)
    });
    return res;
  }),
  create: protectedProcedure.input(z17.object({ veges: z17.string(), notes: z17.string(), calories: z17.string(), name: z17.string() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(vegeStack).values({
      ...input
    });
    return res;
  }),
  delete: protectedProcedure.input(z17.object({ id: z17.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(vegeStack).where(eq12(vegeStack.id, input.id));
    return res;
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(vegeStack);
    return res;
  })
});

// src/server/api/routers/user-plan.ts
import { eq as eq13, and as and2 } from "drizzle-orm";
import { z as z18 } from "zod";
var userPlanRouter = createTRPCRouter({
  delete: protectedProcedure.input(z18.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(userPlan).where(eq13(userPlan.id, input));
    return res;
  }),
  finishPlan: protectedProcedure.input(z18.number()).mutation(async ({ input, ctx }) => {
    try {
      const res = await ctx.db.update(userPlan).set({
        isActive: false,
        finishedAt: /* @__PURE__ */ new Date()
      }).where(eq13(userPlan.id, input));
      console.log({ finishPlan: res });
      return res;
    } catch (e) {
      console.log({ finishPlanError: e });
      return e;
    }
  }),
  activePlan: protectedProcedure.input(z18.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(userPlan).set({
      isActive: true,
      finishedAt: null
    }).where(eq13(userPlan.id, input));
    return res;
  }),
  getMeal: protectedProcedure.input(z18.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userMeal.findFirst({
      where: eq13(userMeal.id, input)
    });
    return res;
  }),
  getRecipe: protectedProcedure.input(z18.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userRecipe.findFirst({
      where: eq13(userRecipe.id, input)
    });
    return res;
  }),
  getIngredient: protectedProcedure.input(z18.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userIngredient.findFirst({
      where: eq13(userIngredient.id, input),
      with: {
        ingredient: true,
        alternateIngredient: true
      }
    });
    return res;
  }),
  getUserActivePlan: protectedProcedure.input(z18.string()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userPlan.findMany({
      where: and2(eq13(userPlan.userId, input), eq13(userPlan.isActive, true)),
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
  get: protectedProcedure.input(z18.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userPlan.findFirst({
      where: eq13(userPlan.id, input),
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
  create: protectedProcedure.input(
    z18.object({
      name: z18.string().min(1),
      description: z18.string(),
      image: z18.string(),
      notes: z18.string(),
      userId: z18.string(),
      meals: z18.array(
        z18.object({
          mealIndex: z18.number(),
          mealTitle: z18.string(),
          calories: z18.string(),
          protein: z18.string().optional(),
          targetProtein: z18.string(),
          targetCalories: z18.string(),
          vegeCalories: z18.string(),
          veges: z18.string(),
          vegeNotes: z18.string(),
          note: z18.string(),
          recipes: z18.array(
            z18.object({
              recipeIndex: z18.number(),
              mealIndex: z18.number(),
              name: z18.string(),
              note: z18.string(),
              description: z18.string(),
              index: z18.number(),
              ingredients: z18.array(
                z18.object({
                  ingredientId: z18.number(),
                  ingredientIndex: z18.number(),
                  recipeIndex: z18.number(),
                  mealIndex: z18.number(),
                  alternateId: z18.number().nullable(),
                  name: z18.string(),
                  serve: z18.string(),
                  serveUnit: z18.string(),
                  note: z18.string()
                })
              )
            })
          )
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    const creatorId = ctx.session.user.id;
    const { meals, ...data } = input;
    const recipes = meals.flatMap((meal2) => meal2.recipes);
    const ingredients = recipes.flatMap((recipe2) => recipe2.ingredients);
    const res = await ctx.db.insert(userPlan).values({
      ...data,
      isActive: true,
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
          alternateId: ingredient2.alternateId === 0 || ingredient2.alternateId === null ? null : Number(ingredient2.alternateId),
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
    const notif = await ctx.db.query.notification.findMany({
      where: and2(
        eq13(notification.userId, input.userId),
        eq13(notification.code, "user-plan_update"),
        eq13(notification.isViewed, false)
      )
    });
    if (notif.length === 0) {
      await ctx.db.insert(notification).values({
        userId: input.userId,
        code: "user-plan_update",
        title: "Your user meal plan has been updated",
        description: "You have a new user meal plan update",
        isViewed: false,
        isRead: false
      });
    }
    console.log({ res, batchRes });
    return { res, batchRes };
  })
});

// src/server/api/routers/daily-logs/post.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
import { and as and3, eq as eq14 } from "drizzle-orm";
import { z as z19 } from "zod";

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
var post2 = {
  create: protectedProcedure.input(
    z19.object({
      date: z19.string(),
      morningWeight: z19.string().optional(),
      fastedBloodGlucose: z19.string().optional(),
      notes: z19.string().optional(),
      sleep: z19.string().optional(),
      sleepQuality: z19.string().optional(),
      nap: z19.string().optional(),
      waistMeasurement: z19.string().optional(),
      isHiit: z19.boolean().optional(),
      isCardio: z19.boolean().optional(),
      isLift: z19.boolean().optional(),
      isLiss: z19.boolean().optional(),
      image: z19.string().optional(),
      userId: z19.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq14(dailyLog.date, input.date),
        eq14(dailyLog.userId, input.userId)
      )
    });
    if (log2) throw new TRPCError3({ code: "CONFLICT" });
    const userSetting = await ctx.db.query.userSettings.findFirst({
      where: eq14(userSettings.userId, input.userId)
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
    const res = await ctx.db.insert(dailyLog).values({
      ...input,
      isPeriod,
      isOvulation,
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
    z19.object({
      mealIndex: z19.number(),
      logId: z19.number()
    })
  ).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(userIngredient).where(
      and3(
        eq14(userIngredient.dailyLogId, input.logId),
        eq14(userIngredient.mealIndex, input.mealIndex)
      )
    );
    await ctx.db.delete(userRecipe).where(
      and3(
        eq14(userRecipe.dailyLogId, input.logId),
        eq14(userRecipe.mealIndex, input.mealIndex)
      )
    );
    await ctx.db.delete(dailyMeal).where(
      and3(
        eq14(dailyMeal.dailyLogId, input.logId),
        eq14(dailyMeal.mealIndex, input.mealIndex)
      )
    );
    return true;
  }),
  copyWeek: protectedProcedure.input(
    z19.object({
      userId: z19.string(),
      logId: z19.number()
    })
  ).mutation(async ({ input, ctx }) => {
    const referenceLog = await ctx.db.select().from(dailyLog).where(eq14(dailyLog.id, input.logId)).then((res) => res[0]);
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
            where: eq14(dailyMeal.dailyLogId, input.logId)
          });
          meals.forEach(async (meal2) => {
            if (meal2) {
              const recipes = await db.select().from(userRecipe).where(eq14(userRecipe.dailyMealId, meal2.id));
              const ingredients = await db.select().from(userIngredient).where(eq14(userIngredient.dailyMealId, meal2.id));
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
    z19.object({
      logId: z19.number()
    })
  ).mutation(async ({ input, ctx }) => {
    const dailyMeals = await ctx.db.delete(dailyMeal).where(eq14(dailyMeal.dailyLogId, input.logId));
    return dailyMeals;
  }),
  addUserCreatedRecipe: protectedProcedure.input(
    z19.object({
      mealIndex: z19.number(),
      logId: z19.number(),
      recipe: z19.object({
        name: z19.string(),
        description: z19.string(),
        image: z19.string(),
        notes: z19.string(),
        recipeCategory: z19.string(),
        calories: z19.number(),
        ingredients: z19.array(
          z19.object({
            ingredientId: z19.number(),
            alternateId: z19.string(),
            note: z19.string(),
            serveSize: z19.string(),
            serveUnit: z19.string(),
            index: z19.number(),
            isAlternate: z19.boolean().optional()
          })
        )
      })
    })
  ).mutation(async ({ input, ctx }) => {
    console.log("input", input);
    await ctx.db.batch([
      ctx.db.delete(userIngredient).where(
        and3(
          eq14(userIngredient.dailyLogId, input.logId ?? -1),
          eq14(userIngredient.mealIndex, input.mealIndex ?? -1)
        )
      ),
      ctx.db.delete(userRecipe).where(
        and3(
          eq14(userRecipe.dailyLogId, input.logId ?? -1),
          eq14(userRecipe.mealIndex, input.mealIndex ?? -1)
        )
      ),
      ctx.db.delete(dailyMeal).where(
        and3(
          eq14(dailyMeal.dailyLogId, input.logId ?? -1),
          eq14(dailyMeal.mealIndex, input.mealIndex ?? -1)
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
    z19.object({
      userId: z19.string(),
      planId: z19.number(),
      mealIndex: z19.number().nullable(),
      recipeIndex: z19.number().nullable().optional(),
      recipeId: z19.number().nullable().optional(),
      date: z19.date(),
      logId: z19.number().nullable()
    })
  ).mutation(async ({ input, ctx }) => {
    console.log("input", input);
    const plan2 = await ctx.db.query.userPlan.findFirst({
      where: eq14(userPlan.id, input.planId),
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
        and3(
          eq14(userIngredient.dailyLogId, input.logId ?? -1),
          eq14(userIngredient.mealIndex, input.mealIndex ?? -1)
        )
      ),
      ctx.db.delete(userRecipe).where(
        and3(
          eq14(userRecipe.dailyLogId, input.logId ?? -1),
          eq14(userRecipe.mealIndex, input.mealIndex ?? -1)
        )
      ),
      ctx.db.delete(dailyMeal).where(
        and3(
          eq14(dailyMeal.dailyLogId, input.logId ?? -1),
          eq14(dailyMeal.mealIndex, input.mealIndex ?? -1)
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
  delete: protectedProcedure.input(z19.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(dailyLog).where(eq14(dailyLog.id, input));
    return res;
  }),
  deleteAll: protectedProcedure.input(z19.string()).mutation(async ({ input, ctx }) => {
    if (input === "") throw new TRPCError3({ code: "NOT_FOUND" });
    const res = await ctx.db.delete(dailyLog).where(eq14(dailyLog.userId, input));
    return res;
  })
};

// src/server/api/routers/daily-logs/update-dl.ts
import { TRPCError as TRPCError4 } from "@trpc/server";
import { and as and4, eq as eq15 } from "drizzle-orm";
import { z as z20 } from "zod";
var updateDl = {
  update: protectedProcedure.input(
    z20.object({
      id: z20.number(),
      date: z20.string(),
      morningWeight: z20.string().optional(),
      notes: z20.string().optional(),
      sleep: z20.string().optional(),
      sleepQuality: z20.string().optional(),
      fastedBloodGlucose: z20.string().optional(),
      nap: z20.string().optional(),
      waistMeasurement: z20.string().optional(),
      isHiit: z20.boolean().optional(),
      isCardio: z20.boolean().optional(),
      isLift: z20.boolean().optional(),
      isLiss: z20.boolean().optional(),
      image: z20.string().optional(),
      userId: z20.string()
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
    }).where(eq15(dailyLog.id, id));
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
    z20.object({
      date: z20.string(),
      isStarred: z20.boolean()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateIsPeriod: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      isPeriod: z20.boolean()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateIsOvulation: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      isOvulation: z20.boolean()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSupplement: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      suppId: z20.number(),
      amount: z20.number(),
      unit: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      throw new TRPCError4({ code: "NOT_FOUND" });
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
    z20.object({
      date: z20.string(),
      notes: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    console.log("-------------------------------------enter");
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updatePosing: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      posing: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSleep: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      sleep: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSleepQuality: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      sleepQuality: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSteps: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      steps: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSauna: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      sauna: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateColdPlunge: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      coldPlunge: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateNap: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      nap: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Nap",
      notes: JSON.stringify(input),
      objectId: null
    });
    if (!log2) {
      const res2 = await ctx.db.insert(dailyLog).values({
        date: input.date,
        nap: input.nap,
        userId: ctx.session.user.id
      });
      return res2;
    }
    const res = await ctx.db.update(dailyLog).set({ nap: input.nap }).where(
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateHiit: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      hiit: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateCardio: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      cardio: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateWeightTraining: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      weight: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateLiss: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      liss: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateMobility: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      mobility: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateWaistMeasurement: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      waistMeasurement: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateWeight: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      morningWeight: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateBloodGlucose: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      fastedBloodGlucose: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateImage: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      image: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
      and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    );
    return true;
  }),
  addWaterLog: protectedProcedure.input(
    z20.object({
      date: z20.string(),
      amount: z20.number()
    })
  ).mutation(async ({ input, ctx }) => {
    let isCreateLog = false;
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
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
  deleteWaterLog: protectedProcedure.input(z20.object({ id: z20.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(waterLog).where(eq15(waterLog.id, input.id));
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
    z20.object({
      date: z20.string()
    })
  ).mutation(async ({ input, ctx }) => {
    let isCreateLog = false;
    console.log("input", input);
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and4(
        eq15(dailyLog.date, input.date),
        eq15(dailyLog.userId, ctx.session.user.id)
      )
    });
    let logId = log2?.id;
    console.log("logId", logId);
    console.log("logId", !logId);
    if (!logId) {
      console.log("create");
      const res = await ctx.db.insert(dailyLog).values({
        date: input.date,
        userId: ctx.session.user.id
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
  deletePoopLog: protectedProcedure.input(z20.object({ id: z20.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(poopLog).where(eq15(poopLog.id, input.id));
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
import { TRPCError as TRPCError5 } from "@trpc/server";
import { eq as eq16 } from "drizzle-orm";
import { z as z21 } from "zod";
var get2 = {
  getUserLimit: protectedProcedure.input(z21.object({ id: z21.string(), limit: z21.number() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.dailyLog.findMany({
      where: eq16(dailyLog.userId, input.id),
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
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt),
      limit: input.limit
    });
    return res;
  }),
  getAllUser: protectedProcedure.input(z21.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError5({ code: "NOT_FOUND" });
    const res = await ctx.db.query.dailyLog.findMany({
      where: eq16(dailyLog.userId, input),
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
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt)
    });
    return res;
  }),
  getAllCurrentUser: protectedProcedure.input(z21.object({ id: z21.string() }).optional()).query(async ({ ctx, input }) => {
    let userId = ctx.session?.user.id;
    if (input?.id && input.id !== "") userId = input.id;
    if (!userId) return null;
    const res = await ctx.db.query.dailyLog.findMany({
      where: eq16(dailyLog.userId, userId),
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
  getSimple: protectedProcedure.input(z21.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.dailyLog.findFirst({
      where: eq16(dailyLog.id, input)
    });
    return res;
  }),
  get: protectedProcedure.input(z21.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.dailyLog.findFirst({
      where: eq16(dailyLog.id, input),
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
import { and as and5, eq as eq17 } from "drizzle-orm";
import { z as z22 } from "zod";
var sendTrainerNotification = async ({
  title,
  userId
}) => {
  const userRes = await db.query.user.findFirst({
    where: eq17(user.id, userId),
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
      where: eq17(pushSubscription.userId, trainer.trainer.id)
    });
    if (sub) {
      await sendPushNotification(JSON.parse(sub.subscription), `${userRes.name} has uploaded ${title}`, "");
    }
  }
};
var image = {
  getImageOverlay: protectedProcedure.input(
    z22.object({
      dataId: z22.number(),
      imageType: z22.string()
    })
  ).query(async ({ input, ctx }) => {
    if (input.imageType === "front") {
      const res2 = await ctx.db.query.dailyLog.findFirst({
        where: eq17(dailyLog.id, input.dataId),
        columns: {
          frontImageSvg: true
        }
      });
      return { overlay: res2?.frontImageSvg };
    }
    if (input.imageType === "side") {
      const res2 = await ctx.db.query.dailyLog.findFirst({
        where: eq17(dailyLog.id, input.dataId),
        columns: {
          sideImageSvg: true
        }
      });
      return { overlay: res2?.sideImageSvg };
    }
    if (input.imageType === "back") {
      const res2 = await ctx.db.query.dailyLog.findFirst({
        where: eq17(dailyLog.id, input.dataId),
        columns: {
          backImageSvg: true
        }
      });
      return { overlay: res2?.backImageSvg };
    }
    const res = await ctx.db.query.images.findFirst({
      where: eq17(images.id, input.dataId),
      columns: {
        svg: true
      }
    });
    return { overlay: res?.svg };
  }),
  updateFrontImage: protectedProcedure.input(
    z22.object({
      logId: z22.number(),
      image: z22.string(),
      isNotifyTrainer: z22.boolean(),
      userId: z22.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Front Image",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ frontImage: input.image }).where(eq17(dailyLog.id, input.logId));
    if (input.isNotifyTrainer) {
      sendTrainerNotification({
        title: "Front Pose",
        userId: input.userId
      });
    }
    return res;
  }),
  updateFrontImageOverlay: protectedProcedure.input(
    z22.object({
      logId: z22.number(),
      overlay: z22.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Front Image Overlay",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ frontImageSvg: input.overlay }).where(eq17(dailyLog.id, input.logId));
    return res;
  }),
  updateSideImage: protectedProcedure.input(
    z22.object({
      logId: z22.number(),
      image: z22.string(),
      isNotifyTrainer: z22.boolean(),
      userId: z22.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update side Image",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ sideImage: input.image }).where(eq17(dailyLog.id, input.logId));
    if (input.isNotifyTrainer) {
      sendTrainerNotification({
        title: "Side Pose",
        userId: input.userId
      });
    }
    return res;
  }),
  updateSideImageOverlay: protectedProcedure.input(
    z22.object({
      logId: z22.number(),
      overlay: z22.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Side Image Overlay",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ sideImageSvg: input.overlay }).where(eq17(dailyLog.id, input.logId));
    return res;
  }),
  updateBackImage: protectedProcedure.input(
    z22.object({
      logId: z22.number(),
      image: z22.string(),
      isNotifyTrainer: z22.boolean(),
      userId: z22.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update  Back Image",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ backImage: input.image }).where(eq17(dailyLog.id, input.logId));
    if (input.isNotifyTrainer) {
      sendTrainerNotification({
        title: "Back Pose",
        userId: input.userId
      });
    }
    return res;
  }),
  updateBackImageOverlay: protectedProcedure.input(
    z22.object({
      logId: z22.number(),
      overlay: z22.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Back Image Overlay",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ backImageSvg: input.overlay }).where(eq17(dailyLog.id, input.logId));
    return res;
  }),
  updateBodyBuilderImage: protectedProcedure.input(
    z22.object({
      date: z22.string(),
      image: z22.string(),
      name: z22.string(),
      userId: z22.string(),
      isNotifyTrainer: z22.boolean()
    })
  ).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(images).where(
      and5(
        eq17(images.date, input.date),
        eq17(images.name, input.name),
        eq17(images.userId, input.userId)
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
    z22.object({
      imageId: z22.number(),
      overlay: z22.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Body Builder Image Overlay",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(images).set({ svg: input.overlay }).where(eq17(images.id, input.imageId));
    return res;
  })
};

// src/server/api/routers/daily-log.ts
var dailyLogRouter = createTRPCRouter({
  ...post2,
  ...updateDl,
  ...get2,
  ...image
});

// src/server/api/routers/weigh-in.ts
import { TRPCError as TRPCError6 } from "@trpc/server";
import { eq as eq18 } from "drizzle-orm";
import { z as z23 } from "zod";
var weighInRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z23.object({
      date: z23.date().optional(),
      bodyWeight: z23.string(),
      bodyFat: z23.string(),
      leanMass: z23.string(),
      bloodPressure: z23.string(),
      userId: z23.string(),
      trainerId: z23.string(),
      notes: z23.string().optional(),
      image: z23.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(weighIn).values({
      ...input
    }).returning({ id: weighIn.id });
    return { res };
  }),
  getAllUser: protectedProcedure.input(z23.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError6({ code: "NOT_FOUND" });
    const res = await ctx.db.query.weighIn.findMany({
      where: eq18(weighIn.userId, input),
      orderBy: (data, { desc: desc10 }) => desc10(data.date)
    });
    return res;
  }),
  get: protectedProcedure.input(z23.number()).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.weighIn.findFirst({
      where: eq18(weighIn.id, input)
    });
    return res;
  }),
  delete: protectedProcedure.input(z23.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(weighIn).where(eq18(weighIn.id, input));
    return res;
  }),
  deleteAll: protectedProcedure.input(z23.string()).mutation(async ({ input, ctx }) => {
    if (input === "") throw new TRPCError6({ code: "NOT_FOUND" });
    const res = await ctx.db.delete(weighIn).where(eq18(weighIn.userId, input));
    return res;
  })
});

// src/server/api/routers/message.ts
import { and as and6, eq as eq19 } from "drizzle-orm";
import { z as z24 } from "zod";
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
    z24.object({
      userId: z24.string(),
      fromUserId: z24.string(),
      subject: z24.string(),
      message: z24.string(),
      isImportant: z24.boolean(),
      image: z24.string().optional()
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
  getAllUser: protectedProcedure.input(z24.string()).query(async ({ ctx, input }) => {
    let userId = input;
    if (input === "") {
      userId = ctx.session?.user.id;
    }
    const res = await ctx.db.query.message.findMany({
      where: eq19(message.userId, userId),
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt),
      with: {
        fromUser: true,
        user: true
      }
    });
    return res;
  }),
  getAllUserUnread: protectedProcedure.input(z24.string()).query(async ({ ctx, input }) => {
    let userId = input;
    if (input === "") {
      userId = ctx.session?.user.id;
    }
    const res = await ctx.db.query.message.findMany({
      where: and6(eq19(message.userId, userId), eq19(message.isRead, false)),
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt),
      with: {
        fromUser: true,
        user: true
      }
    });
    return res;
  }),
  getAllFromUser: protectedProcedure.input(z24.string()).query(async ({ ctx, input }) => {
    let userId = input;
    if (input === "") {
      userId = ctx.session?.user.id;
    }
    const res = await ctx.db.query.message.findMany({
      where: eq19(message.fromUserId, userId),
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt),
      with: {
        fromUser: true,
        user: true
      }
    });
    return res;
  }),
  get: protectedProcedure.input(z24.number()).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.message.findFirst({
      where: eq19(message.id, input)
    });
    return res;
  }),
  markAsViewed: protectedProcedure.input(z24.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({ isViewed: true }).where(eq19(message.id, input));
    return res;
  }),
  markAsRead: protectedProcedure.input(z24.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({ isRead: true }).where(eq19(message.id, input));
    createLog2({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark Message as Read",
      notes: "",
      objectId: input
    });
    return res;
  }),
  markAllAsViewed: protectedProcedure.input(z24.string()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({
      isViewed: true,
      isRead: true
    }).where(eq19(message.userId, input));
    createLog2({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark All Messages as Viewed/Read",
      notes: "",
      objectId: null
    });
    return res;
  }),
  markAsNotified: protectedProcedure.input(z24.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({ isNotified: true }).where(eq19(message.id, input));
    createLog2({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark Message as Notified",
      notes: "",
      objectId: input
    });
    return res;
  }),
  markFromUserAsViewedAndRead: protectedProcedure.input(z24.string()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({
      isViewed: true,
      isRead: true
    }).where(eq19(message.fromUserId, input));
    createLog2({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark Message as Read",
      notes: "",
      objectId: null
    });
    return res;
  }),
  delete: protectedProcedure.input(z24.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({ isDeleted: true }).where(eq19(message.id, input));
    return res;
  }),
  deletePermanently: protectedProcedure.input(z24.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(message).where(eq19(message.id, input));
    return res;
  })
});

// src/server/api/routers/metric.ts
import { eq as eq20 } from "drizzle-orm";
import { z as z25 } from "zod";
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
    z25.object({
      image: z25.string(),
      userId: z25.string()
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
  getUserSkinfolds: protectedProcedure.input(z25.string()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.skinfold.findMany({
      where: eq20(skinfold.userId, input),
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
  getSkinfold: protectedProcedure.input(z25.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.skinfold.findFirst({
      where: eq20(skinfold.id, input),
      with: {
        bodyFat: true,
        leanMass: true,
        bodyWeight: true
      }
    });
    return res;
  }),
  deleteSkinfold: protectedProcedure.input(z25.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(skinfold).where(eq20(skinfold.id, input));
    return res;
  }),
  createSkinfold: protectedProcedure.input(
    z25.object({
      date: z25.string(),
      chin: z25.string(),
      cheek: z25.string(),
      lowerAbdominal: z25.string(),
      pectoral: z25.string(),
      biceps: z25.string(),
      triceps: z25.string(),
      subscapular: z25.string(),
      midAxillary: z25.string(),
      suprailiac: z25.string(),
      umbilical: z25.string(),
      lowerBack: z25.string(),
      quadriceps: z25.string(),
      hamstrings: z25.string(),
      medialCalf: z25.string(),
      knee: z25.string(),
      shoulder: z25.string(),
      notes: z25.string(),
      userId: z25.string(),
      bodyWeight: z25.string(),
      leanMass: z25.string(),
      bodyFat: z25.string()
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

// src/server/api/routers/tag.ts
import { and as and8, eq as eq21 } from "drizzle-orm";
import { z as z26 } from "zod";
var tagRouter = createTRPCRouter({
  getAllTagsCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.tag.findMany({
      where: eq21(tag.userId, ctx.session.user.id),
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt)
    });
    return res;
  }),
  create: protectedProcedure.input(
    z26.object({
      name: z26.string(),
      color: z26.string(),
      icon: z26.string()
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
    z26.object({
      tagId: z26.number(),
      dailyLogId: z26.number()
    })
  ).mutation(async ({ input, ctx }) => {
    const isTagged = await ctx.db.query.tagToDailyLog.findFirst({
      where: and8(
        eq21(tagToDailyLog.tagId, input.tagId),
        eq21(tagToDailyLog.dailyLogId, input.dailyLogId)
      )
    });
    if (isTagged) {
      await ctx.db.delete(tagToDailyLog).where(
        and8(
          eq21(tagToDailyLog.tagId, input.tagId),
          eq21(tagToDailyLog.dailyLogId, input.dailyLogId)
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
  delete: protectedProcedure.input(z26.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(tag).where(eq21(tag.id, input));
    return res;
  })
});

// src/server/api/routers/goals/get.ts
import { z as z27 } from "zod";
var get3 = {
  getUser: protectedProcedure.input(z27.object({ userId: z27.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.goals.findMany({
      where: (goal, { eq: eq29 }) => eq29(goal.userId, input.userId)
    });
    return res;
  }),
  get: protectedProcedure.input(z27.object({ id: z27.number() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.goals.findFirst({
      where: (goal, { eq: eq29 }) => eq29(goal.id, input.id)
    });
    return res;
  })
};

// src/server/api/routers/goals/post.ts
import { eq as eq22 } from "drizzle-orm";
import { z as z28 } from "zod";
var post3 = {
  create: protectedProcedure.input(
    z28.object({
      userId: z28.string(),
      title: z28.string(),
      description: z28.string(),
      state: z28.string()
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
    z28.object({
      id: z28.number(),
      title: z28.string(),
      description: z28.string(),
      state: z28.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(goals).set({
      title: input.title,
      description: input.description,
      state: input.state
    }).where(eq22(goals.id, input.id));
    return res;
  }),
  delete: protectedProcedure.input(z28.object({ id: z28.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(goals).where(eq22(goals.id, input.id));
    return res;
  })
};

// src/server/api/routers/goals.ts
var goalsRouter = createTRPCRouter({
  ...get3,
  ...post3
});

// src/server/api/routers/trainer.ts
import { and as and9, eq as eq23 } from "drizzle-orm";
import { z as z29 } from "zod";
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
var trainerRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.user.findMany({
      where: (user2, { eq: eq29 }) => eq29(user2.isTrainer, true),
      columns: {
        id: true,
        name: true
      }
    });
    return res;
  }),
  add: protectedProcedure.input(z29.object({ userId: z29.string(), trainerId: z29.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(userToTrainer).values({
      userId: input.userId,
      trainerId: input.trainerId
    });
    createLog4({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Add trainer to client",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  delete: protectedProcedure.input(z29.object({ userId: z29.string(), trainerId: z29.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(userToTrainer).where(
      and9(
        eq23(userToTrainer.userId, input.userId),
        eq23(userToTrainer.trainerId, input.trainerId)
      )
    );
    createLog4({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Delete trainer from client",
      notes: JSON.stringify(input)
    });
    return res;
  })
});

// src/server/api/routers/supplements.ts
import { TRPCError as TRPCError7 } from "@trpc/server";
import { and as and10, asc as asc2, eq as eq24 } from "drizzle-orm";
import { z as z31 } from "zod";

// src/components/supplements/store.ts
import { z as z30 } from "zod";
var updateSchema = z30.object({
  id: z30.number(),
  isPrivate: z30.boolean(),
  viewableBy: z30.string(),
  name: z30.string().min(1),
  serveSize: z30.number(),
  serveUnit: z30.string().min(1),
  caloriesWFibre: z30.number(),
  caloriesWOFibre: z30.number(),
  protein: z30.number(),
  fatTotal: z30.number(),
  totalDietaryFibre: z30.number(),
  totalSugars: z30.number(),
  starch: z30.number(),
  resistantStarch: z30.number(),
  availableCarbohydrateWithoutSugarAlcohols: z30.number(),
  availableCarbohydrateWithSugarAlcohols: z30.number(),
  addedSugars: z30.number(),
  freeSugars: z30.number(),
  moisture: z30.number(),
  nitrogen: z30.number(),
  alcohol: z30.number(),
  fructose: z30.number(),
  glucose: z30.number(),
  sucrose: z30.number(),
  maltose: z30.number(),
  lactose: z30.number(),
  galactose: z30.number(),
  maltotrios: z30.number(),
  ash: z30.number(),
  dextrin: z30.number(),
  glycerol: z30.number(),
  glycogen: z30.number(),
  inulin: z30.number(),
  erythritol: z30.number(),
  maltitol: z30.number(),
  mannitol: z30.number(),
  xylitol: z30.number(),
  maltodextrin: z30.number(),
  oligosaccharides: z30.number(),
  polydextrose: z30.number(),
  raffinose: z30.number(),
  stachyose: z30.number(),
  sorbitol: z30.number(),
  aceticAcid: z30.number(),
  citricAcid: z30.number(),
  fumaricAcid: z30.number(),
  lacticAcid: z30.number(),
  malicAcid: z30.number(),
  oxalicAcid: z30.number(),
  propionicAcid: z30.number(),
  quinicAcid: z30.number(),
  shikimicAcid: z30.number(),
  succinicAcid: z30.number(),
  tartaricAcid: z30.number(),
  aluminium: z30.number(),
  antimony: z30.number(),
  arsenic: z30.number(),
  cadmium: z30.number(),
  calcium: z30.number(),
  chromium: z30.number(),
  chloride: z30.number(),
  cobalt: z30.number(),
  copper: z30.number(),
  fluoride: z30.number(),
  iodine: z30.number(),
  iron: z30.number(),
  lead: z30.number(),
  magnesium: z30.number(),
  manganese: z30.number(),
  mercury: z30.number(),
  molybdenum: z30.number(),
  nickel: z30.number(),
  phosphorus: z30.number(),
  potassium: z30.number(),
  selenium: z30.number(),
  sodium: z30.number(),
  sulphur: z30.number(),
  tin: z30.number(),
  zinc: z30.number(),
  retinol: z30.number(),
  alphaCarotene: z30.number(),
  betaCarotene: z30.number(),
  cryptoxanthin: z30.number(),
  betaCaroteneEquivalents: z30.number(),
  vitaminARetinolEquivalents: z30.number(),
  lutein: z30.number(),
  lycopene: z30.number(),
  xanthophyl: z30.number(),
  thiamin: z30.number(),
  riboflavin: z30.number(),
  niacin: z30.number(),
  niacinDerivedFromTryptophan: z30.number(),
  niacinDerivedEquivalents: z30.number(),
  pantothenicAcid: z30.number(),
  pyridoxine: z30.number(),
  biotin: z30.number(),
  cobalamin: z30.number(),
  folateNatural: z30.number(),
  folicAcid: z30.number(),
  totalFolates: z30.number(),
  dietaryFolateEquivalents: z30.number(),
  vitaminC: z30.number(),
  cholecalciferol: z30.number(),
  ergocalciferol: z30.number(),
  hydroxyCholecalciferol: z30.number(),
  hydroxyErgocalciferol: z30.number(),
  vitaminDEquivalents: z30.number(),
  alphaTocopherol: z30.number(),
  alphaTocotrienol: z30.number(),
  betaTocopherol: z30.number(),
  betaTocotrienol: z30.number(),
  deltaTocopherol: z30.number(),
  deltaTocotrienol: z30.number(),
  gammaTocopherol: z30.number(),
  gammaTocotrienol: z30.number(),
  vitaminE: z30.number(),
  totalSaturatedFattyAcids: z30.number(),
  totalMonounsaturatedFattyAcids: z30.number(),
  totalPolyunsaturatedFattyAcids: z30.number(),
  totalLongChainOmega3FattyAcids: z30.number(),
  totalTransFattyAcids: z30.number(),
  caffeine: z30.number(),
  cholesterol: z30.number(),
  alanine: z30.number(),
  arginine: z30.number(),
  asparticAcid: z30.number(),
  cystinePlusCysteine: z30.number(),
  glutamicAcid: z30.number(),
  glycine: z30.number(),
  histidine: z30.number(),
  isoleucine: z30.number(),
  leucine: z30.number(),
  lysine: z30.number(),
  methionine: z30.number(),
  phenylalanine: z30.number(),
  proline: z30.number(),
  serine: z30.number(),
  threonine: z30.number(),
  tyrosine: z30.number(),
  tryptophan: z30.number(),
  valine: z30.number(),
  c4: z30.number(),
  c6: z30.number(),
  c8: z30.number(),
  c10: z30.number(),
  c11: z30.number(),
  c12: z30.number(),
  c13: z30.number(),
  c14: z30.number(),
  c15: z30.number(),
  c16: z30.number(),
  c17: z30.number(),
  c18: z30.number(),
  c19: z30.number(),
  c20: z30.number(),
  c21: z30.number(),
  c22: z30.number(),
  c23: z30.number(),
  c24: z30.number(),
  totalSaturatedFattyAcidsEquated: z30.number(),
  c10_1: z30.number(),
  c12_1: z30.number(),
  c14_1: z30.number(),
  c15_1: z30.number(),
  c16_1: z30.number(),
  c17_1: z30.number(),
  c18_1: z30.number(),
  c18_1w5: z30.number(),
  c18_1w6: z30.number(),
  c18_1w7: z30.number(),
  c18_1w9: z30.number(),
  c20_1: z30.number(),
  c20_1w9: z30.number(),
  c20_1w13: z30.number(),
  c20_1w11: z30.number(),
  c22_1: z30.number(),
  c22_1w9: z30.number(),
  c22_1w11: z30.number(),
  c24_1: z30.number(),
  c24_1w9: z30.number(),
  c24_1w11: z30.number(),
  c24_1w13: z30.number(),
  totalMonounsaturatedFattyAcidsEquated: z30.number(),
  c12_2: z30.number(),
  c16_2w4: z30.number(),
  c16_3: z30.number(),
  c18_2w6: z30.number(),
  c18_3w3: z30.number(),
  c18_3w4: z30.number(),
  c18_3w6: z30.number(),
  c18_4w1: z30.number(),
  c18_4w3: z30.number(),
  c20_2: z30.number(),
  c20_2w6: z30.number(),
  c20_3: z30.number(),
  c20_3w3: z30.number(),
  c20_3w6: z30.number(),
  c20_4: z30.number(),
  c20_4w3: z30.number(),
  c20_4w6: z30.number(),
  c20_5w3: z30.number(),
  c21_5w3: z30.number(),
  c22_2: z30.number(),
  c22_2w6: z30.number(),
  c22_4w6: z30.number(),
  c22_5w3: z30.number(),
  c22_5w6: z30.number(),
  c22_6w3: z30.number(),
  totalPolyunsaturatedFattyAcidsEquated: z30.number()
});
var formSchema = z30.object({
  name: z30.string().min(1),
  isPrivate: z30.boolean(),
  viewableBy: z30.string(),
  serveSize: z30.number(),
  serveUnit: z30.string().min(1),
  caloriesWFibre: z30.number(),
  caloriesWOFibre: z30.number(),
  protein: z30.number(),
  fatTotal: z30.number(),
  totalDietaryFibre: z30.number(),
  totalSugars: z30.number(),
  starch: z30.number(),
  resistantStarch: z30.number(),
  availableCarbohydrateWithoutSugarAlcohols: z30.number(),
  availableCarbohydrateWithSugarAlcohols: z30.number(),
  addedSugars: z30.number(),
  freeSugars: z30.number(),
  moisture: z30.number(),
  nitrogen: z30.number(),
  alcohol: z30.number(),
  fructose: z30.number(),
  glucose: z30.number(),
  sucrose: z30.number(),
  maltose: z30.number(),
  lactose: z30.number(),
  galactose: z30.number(),
  maltotrios: z30.number(),
  ash: z30.number(),
  dextrin: z30.number(),
  glycerol: z30.number(),
  glycogen: z30.number(),
  inulin: z30.number(),
  erythritol: z30.number(),
  maltitol: z30.number(),
  mannitol: z30.number(),
  xylitol: z30.number(),
  maltodextrin: z30.number(),
  oligosaccharides: z30.number(),
  polydextrose: z30.number(),
  raffinose: z30.number(),
  stachyose: z30.number(),
  sorbitol: z30.number(),
  aceticAcid: z30.number(),
  citricAcid: z30.number(),
  fumaricAcid: z30.number(),
  lacticAcid: z30.number(),
  malicAcid: z30.number(),
  oxalicAcid: z30.number(),
  propionicAcid: z30.number(),
  quinicAcid: z30.number(),
  shikimicAcid: z30.number(),
  succinicAcid: z30.number(),
  tartaricAcid: z30.number(),
  aluminium: z30.number(),
  antimony: z30.number(),
  arsenic: z30.number(),
  cadmium: z30.number(),
  calcium: z30.number(),
  chromium: z30.number(),
  chloride: z30.number(),
  cobalt: z30.number(),
  copper: z30.number(),
  fluoride: z30.number(),
  iodine: z30.number(),
  iron: z30.number(),
  lead: z30.number(),
  magnesium: z30.number(),
  manganese: z30.number(),
  mercury: z30.number(),
  molybdenum: z30.number(),
  nickel: z30.number(),
  phosphorus: z30.number(),
  potassium: z30.number(),
  selenium: z30.number(),
  sodium: z30.number(),
  sulphur: z30.number(),
  tin: z30.number(),
  zinc: z30.number(),
  retinol: z30.number(),
  alphaCarotene: z30.number(),
  betaCarotene: z30.number(),
  cryptoxanthin: z30.number(),
  betaCaroteneEquivalents: z30.number(),
  vitaminARetinolEquivalents: z30.number(),
  lutein: z30.number(),
  lycopene: z30.number(),
  xanthophyl: z30.number(),
  thiamin: z30.number(),
  riboflavin: z30.number(),
  niacin: z30.number(),
  niacinDerivedFromTryptophan: z30.number(),
  niacinDerivedEquivalents: z30.number(),
  pantothenicAcid: z30.number(),
  pyridoxine: z30.number(),
  biotin: z30.number(),
  cobalamin: z30.number(),
  folateNatural: z30.number(),
  folicAcid: z30.number(),
  totalFolates: z30.number(),
  dietaryFolateEquivalents: z30.number(),
  vitaminC: z30.number(),
  cholecalciferol: z30.number(),
  ergocalciferol: z30.number(),
  hydroxyCholecalciferol: z30.number(),
  hydroxyErgocalciferol: z30.number(),
  vitaminDEquivalents: z30.number(),
  alphaTocopherol: z30.number(),
  alphaTocotrienol: z30.number(),
  betaTocopherol: z30.number(),
  betaTocotrienol: z30.number(),
  deltaTocopherol: z30.number(),
  deltaTocotrienol: z30.number(),
  gammaTocopherol: z30.number(),
  gammaTocotrienol: z30.number(),
  vitaminE: z30.number(),
  totalSaturatedFattyAcids: z30.number(),
  totalMonounsaturatedFattyAcids: z30.number(),
  totalPolyunsaturatedFattyAcids: z30.number(),
  totalLongChainOmega3FattyAcids: z30.number(),
  totalTransFattyAcids: z30.number(),
  caffeine: z30.number(),
  cholesterol: z30.number(),
  alanine: z30.number(),
  arginine: z30.number(),
  asparticAcid: z30.number(),
  cystinePlusCysteine: z30.number(),
  glutamicAcid: z30.number(),
  glycine: z30.number(),
  histidine: z30.number(),
  isoleucine: z30.number(),
  leucine: z30.number(),
  lysine: z30.number(),
  methionine: z30.number(),
  phenylalanine: z30.number(),
  proline: z30.number(),
  serine: z30.number(),
  threonine: z30.number(),
  tyrosine: z30.number(),
  tryptophan: z30.number(),
  valine: z30.number(),
  c4: z30.number(),
  c6: z30.number(),
  c8: z30.number(),
  c10: z30.number(),
  c11: z30.number(),
  c12: z30.number(),
  c13: z30.number(),
  c14: z30.number(),
  c15: z30.number(),
  c16: z30.number(),
  c17: z30.number(),
  c18: z30.number(),
  c19: z30.number(),
  c20: z30.number(),
  c21: z30.number(),
  c22: z30.number(),
  c23: z30.number(),
  c24: z30.number(),
  totalSaturatedFattyAcidsEquated: z30.number(),
  c10_1: z30.number(),
  c12_1: z30.number(),
  c14_1: z30.number(),
  c15_1: z30.number(),
  c16_1: z30.number(),
  c17_1: z30.number(),
  c18_1: z30.number(),
  c18_1w5: z30.number(),
  c18_1w6: z30.number(),
  c18_1w7: z30.number(),
  c18_1w9: z30.number(),
  c20_1: z30.number(),
  c20_1w9: z30.number(),
  c20_1w13: z30.number(),
  c20_1w11: z30.number(),
  c22_1: z30.number(),
  c22_1w9: z30.number(),
  c22_1w11: z30.number(),
  c24_1: z30.number(),
  c24_1w9: z30.number(),
  c24_1w11: z30.number(),
  c24_1w13: z30.number(),
  totalMonounsaturatedFattyAcidsEquated: z30.number(),
  c12_2: z30.number(),
  c16_2w4: z30.number(),
  c16_3: z30.number(),
  c18_2w6: z30.number(),
  c18_3w3: z30.number(),
  c18_3w4: z30.number(),
  c18_3w6: z30.number(),
  c18_4w1: z30.number(),
  c18_4w3: z30.number(),
  c20_2: z30.number(),
  c20_2w6: z30.number(),
  c20_3: z30.number(),
  c20_3w3: z30.number(),
  c20_3w6: z30.number(),
  c20_4: z30.number(),
  c20_4w3: z30.number(),
  c20_4w6: z30.number(),
  c20_5w3: z30.number(),
  c21_5w3: z30.number(),
  c22_2: z30.number(),
  c22_2w6: z30.number(),
  c22_4w6: z30.number(),
  c22_5w3: z30.number(),
  c22_5w6: z30.number(),
  c22_6w3: z30.number(),
  totalPolyunsaturatedFattyAcidsEquated: z30.number()
});

// src/server/api/routers/supplements.ts
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
var supplementsRouter = createTRPCRouter({
  delete: protectedProcedure.input(z31.object({ id: z31.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(ingredient).set({
      deletedAt: /* @__PURE__ */ new Date()
    }).where(eq24(ingredient.id, input.id));
    return res;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    const res = await ctx.db.query.ingredient.findMany({
      where: (ingredient2, { isNull, and: and13, eq: eq29 }) => and13(
        isNull(ingredient2.hiddenAt),
        isNull(ingredient2.deletedAt),
        eq29(ingredient2.isSupplement, true),
        eq29(ingredient2.isUserCreated, false)
      ),
      with: {
        user: {
          columns: {
            id: true,
            name: true
          }
        }
      },
      orderBy: [asc2(ingredient.name)]
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
  getSupplementFromDailyLog: protectedProcedure.input(z31.object({ id: z31.number() })).query(async ({ input, ctx }) => {
    if (input.id === -1) return false;
    const res = await ctx.db.query.dailySupplement.findFirst({
      where: (supplement, { eq: eq29 }) => eq29(supplement.id, input.id),
      with: {
        supplement: true
      }
    });
    return res ? true : false;
  }),
  getFullSupplement: protectedProcedure.input(z31.object({ id: z31.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.ingredient.findFirst({
      where: (ingredient2, { eq: eq29 }) => eq29(ingredient2.id, input.id),
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
  getSupplement: protectedProcedure.input(z31.object({ id: z31.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.ingredient.findFirst({
      where: (ingredient2, { eq: eq29 }) => eq29(ingredient2.id, input.id),
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
    z31.object({
      time: z31.string(),
      userId: z31.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(supplementStack).values({
      userId: input.userId,
      time: input.time
    }).returning({ id: supplementStack.id });
    return res;
  }),
  getSuppFromPlan: protectedProcedure.input(z31.object({ id: z31.number() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.supplementToSupplementStack.findFirst({
      where: (supplement, { eq: eq29 }) => eq29(supplement.id, input.id),
      with: {
        supplement: true
      }
    });
    return res;
  }),
  addToUser: protectedProcedure.input(
    z31.object({
      suppId: z31.number(),
      userId: z31.string(),
      time: z31.string(),
      size: z31.string(),
      unit: z31.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const userTimes = await ctx.db.query.supplementStack.findMany({
      where: (stack, { eq: eq29 }) => eq29(stack.userId, input.userId)
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
        eq24(notification.userId, input.userId),
        eq24(notification.code, "supplement_update"),
        eq24(notification.isViewed, false)
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
    z31.object({
      suppId: z31.number(),
      suppName: z31.string(),
      date: z31.string(),
      time: z31.string(),
      amount: z31.string(),
      unit: z31.string(),
      stackId: z31.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and10(
        eq24(dailyLog.date, input.date),
        eq24(dailyLog.userId, ctx.session.user.id)
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
    createLog5({
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
  unLogSupplement: protectedProcedure.input(z31.object({ id: z31.number() })).mutation(async ({ input, ctx }) => {
    createLog5({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "unLog Supplement",
      notes: JSON.stringify(input),
      objectId: null
    });
    await ctx.db.delete(dailySupplement).where(eq24(dailySupplement.id, input.id));
    return true;
  }),
  deleteFromUser: protectedProcedure.input(z31.object({ suppId: z31.number(), suppStackId: z31.number() })).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(supplementToSupplementStack).where(
      and10(
        eq24(supplementToSupplementStack.supplementId, input.suppId),
        eq24(
          supplementToSupplementStack.supplementStackId,
          input.suppStackId
        )
      )
    );
    return true;
  }),
  deleteTime: protectedProcedure.input(z31.object({ id: z31.number() })).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(supplementStack).where(eq24(supplementStack.id, input.id));
    return true;
  }),
  userCreate: protectedProcedure.input(
    z31.object({
      name: z31.string(),
      serveSize: z31.number(),
      serveUnit: z31.string(),
      isPrivate: z31.boolean(),
      stackId: z31.number(),
      viewableBy: z31.string().optional(),
      userId: z31.string()
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
    createLog5({
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
    }).where(eq24(ingredient.id, input.id));
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
      }).where(eq24(ingredientAdditionOne.ingredientId, input.id)),
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
      }).where(eq24(ingredientAdditionTwo.ingredientId, input.id)),
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
      }).where(eq24(ingredientAdditionThree.ingredientId, input.id))
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

// src/server/api/routers/trainer-notes.ts
import { eq as eq25 } from "drizzle-orm";
import { z as z32 } from "zod";
var trainerNotesRouter = createTRPCRouter({
  getAllUser: protectedProcedure.input(z32.object({ userId: z32.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.trainerNotes.findMany({
      where: (note, { eq: eq29 }) => eq29(note.userId, input.userId),
      with: {
        trainer: true
      }
    });
    return res;
  }),
  get: protectedProcedure.input(z32.object({ id: z32.number() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.trainerNotes.findFirst({
      where: (note, { eq: eq29 }) => eq29(note.id, input.id),
      with: {
        trainer: true
      }
    });
    return res;
  }),
  create: protectedProcedure.input(
    z32.object({
      userId: z32.string(),
      title: z32.string(),
      description: z32.string(),
      state: z32.string()
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
    z32.object({
      id: z32.number(),
      title: z32.string(),
      description: z32.string(),
      state: z32.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(trainerNotes).set({
      title: input.title,
      description: input.description,
      state: input.state
    }).where(eq25(trainerNotes.id, input.id));
    return res;
  }),
  delete: protectedProcedure.input(z32.object({ id: z32.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(trainerNotes).where(eq25(trainerNotes.id, input.id));
    return res;
  })
});

// src/server/api/routers/userCatagories.ts
import { and as and11, eq as eq26 } from "drizzle-orm";
import { z as z33 } from "zod";
var userCatagoriesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.userCategory.findMany();
    return res;
  }),
  create: protectedProcedure.input(z33.string()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(userCategory).values({
      name: input
    });
    return res;
  }),
  update: protectedProcedure.input(z33.object({ id: z33.number(), name: z33.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userCategory).set({
      name: input.name
    }).where(eq26(userCategory.id, input.id));
    return res;
  }),
  delete: protectedProcedure.input(z33.number()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(userCategory).where(eq26(userCategory.id, input));
    return res;
  }),
  addToUser: protectedProcedure.input(z33.object({ userId: z33.string(), categoryId: z33.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(userToUserCategory).values({
      userId: input.userId,
      categoryId: input.categoryId
    });
    return res;
  }),
  removeFromUser: protectedProcedure.input(z33.object({ userId: z33.string(), categoryId: z33.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(userToUserCategory).where(
      and11(
        eq26(userToUserCategory.userId, input.userId),
        eq26(userToUserCategory.categoryId, input.categoryId)
      )
    );
    return res;
  })
});

// src/server/api/routers/notification.ts
import { eq as eq27, and as and12 } from "drizzle-orm";
import { z as z34 } from "zod";
var notificationRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z34.object({
      userId: z34.string(),
      code: z34.string(),
      title: z34.string(),
      description: z34.string().optional(),
      notes: z34.string().optional()
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
      where: eq27(pushSubscription.userId, input.userId)
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
  get: protectedProcedure.input(z34.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.notification.findFirst({
      where: eq27(notification.id, input)
    });
    return res;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.notification.findMany({
      where: eq27(notification.isRead, false),
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt)
    });
    return res;
  }),
  getAllUser: protectedProcedure.input(z34.string()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.notification.findMany({
      where: eq27(notification.userId, input),
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt)
    });
    return res;
  }),
  getAllUserUnread: protectedProcedure.input(z34.string()).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.notification.findMany({
      where: and12(eq27(notification.userId, input), eq27(notification.isRead, false)),
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt)
    });
    return res;
  }),
  delete: protectedProcedure.input(z34.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(notification).where(eq27(notification.id, input));
    return res;
  }),
  markAsRead: protectedProcedure.input(z34.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(notification).set({
      isRead: true
    }).where(eq27(notification.id, input));
    return res;
  }),
  markAsNotified: protectedProcedure.input(z34.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(notification).set({
      isNotified: true
    }).where(eq27(notification.id, input));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark Notification as Notified",
      notes: JSON.stringify(input),
      objectId: null
    });
    return res;
  }),
  markAllAsViewed: protectedProcedure.input(z34.string()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(notification).set({
      isRead: true,
      isViewed: true
    }).where(eq27(notification.userId, input));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark All Notifications as Viewed",
      notes: JSON.stringify(input),
      objectId: null
    });
    return res;
  }),
  markAsViewed: protectedProcedure.input(z34.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(notification).set({
      isViewed: true,
      isRead: true
    }).where(eq27(notification.id, input));
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

// src/server/api/routers/push-subscription.ts
import { eq as eq28 } from "drizzle-orm";
import { z as z35 } from "zod";
var pushSubscriptionRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z35.object({
      userId: z35.string(),
      subscription: z35.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const sub = await ctx.db.query.pushSubscription.findFirst({
      where: eq28(pushSubscription.userId, input.userId)
    });
    if (sub) {
      const res2 = await ctx.db.update(pushSubscription).set({
        subscription: input.subscription
      }).where(eq28(pushSubscription.id, sub.id));
      return res2;
    }
    const res = await ctx.db.insert(pushSubscription).values({
      ...input
    }).returning({ id: pushSubscription.id });
    return res;
  }),
  get: protectedProcedure.input(z35.string()).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.pushSubscription.findFirst({
      where: eq28(pushSubscription.userId, input)
    });
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
  pushSubscription: pushSubscriptionRouter
});
var createCaller = createCallerFactory(appRouter);
export {
  appRouter,
  createCaller
};
