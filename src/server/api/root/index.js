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
import { int as int8, sqliteTable as sqliteTable8, text as text8 } from "drizzle-orm/sqlite-core";

// src/server/db/schema/user.ts
import { relations as relations6, sql as sql6 } from "drizzle-orm";
import { int as int6, primaryKey, sqliteTable as sqliteTable6, text as text6 } from "drizzle-orm/sqlite-core";

// src/server/db/schema/daily-logs.ts
import { relations as relations2, sql as sql2 } from "drizzle-orm";
import {
  int as int2,
  sqliteTable as sqliteTable2,
  text as text2
} from "drizzle-orm/sqlite-core";

// src/server/db/schema/user-plan.ts
import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
var createTable = sqliteTable;
var userPlan = createTable("user_plan", {
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
});
var userMeal = createTable("user_meal", {
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
});
var userRecipe = createTable("user_recipe", {
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
});
var userIngredient = createTable("user_ingredient", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
  ingredientId: int("ingredient_id").references(() => ingredient.id, {
    onDelete: "cascade"
  }),
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
});
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
    isStarred: int2("is_starred", { mode: "boolean" }).default(false),
    hiit: text2("hiit"),
    cardio: text2("cardio"),
    weight: text2("weight"),
    liss: text2("liss"),
    posing: text2("posing"),
    steps: text2("steps"),
    sauna: text2("sauna"),
    coldPlunge: text2("cold_plunge"),
    cardioType: text2("cardio_type"),
    image: text2("image"),
    frontImage: text2("front_image"),
    sideImage: text2("side_image"),
    backImage: text2("back_image"),
    frontPoseImage: text2("front_pose_image"),
    sidePoseImage: text2("side_pose_image"),
    backPoseImage: text2("back_pose_image"),
    spareImageOne: text2("spare_image"),
    spareImageTwo: text2("spare_image"),
    waistMeasurement: text2("waist_measurement"),
    nap: text2("nap")
  }
);
var dailyLogRelations = relations2(dailyLog, ({ one, many }) => ({
  user: one(user, { fields: [dailyLog.userId], references: [user.id] }),
  dailyMeals: many(dailyMeal),
  waterLogs: many(waterLog),
  poopLogs: many(poopLog),
  tags: many(tagToDailyLog),
  supplements: many(dailySupplement)
}));
var dailySupplement = createTable2("daily_supplement", {
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
});
var dailySupplementRelations = relations2(dailySupplement, ({ one }) => ({
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
}));
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
var tagToDailyLog = createTable2("tag_to_daily_log", {
  id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  tagId: int2("tag_id").notNull().references(() => tag.id, {
    onDelete: "cascade"
  }),
  dailyLogId: int2("daily_log_id").notNull().references(() => dailyLog.id, {
    onDelete: "cascade"
  })
});
var tagToDailyLogRelations = relations2(
  tagToDailyLog,
  ({ one }) => ({
    tag: one(tag, {
      fields: [tagToDailyLog.tagId],
      references: [tag.id]
    }),
    dailyLog: one(dailyLog, {
      fields: [tagToDailyLog.dailyLogId],
      references: [dailyLog.id]
    })
  })
);
var poopLog = createTable2("poop_log", {
  id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int2("created_at", { mode: "timestamp" }).default(sql2`(unixepoch())`).notNull(),
  dailyLogId: int2("daily_log_id").notNull().references(() => dailyLog.id, {
    onDelete: "cascade"
  })
});
var poopLogRelations = relations2(poopLog, ({ one, many }) => ({
  dailyLog: one(dailyLog, {
    fields: [poopLog.dailyLogId],
    references: [dailyLog.id]
  })
}));
var waterLog = createTable2("water_log", {
  id: int2("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int2("created_at", { mode: "timestamp" }).default(sql2`(unixepoch())`).notNull(),
  dailyLogId: int2("daily_log_id").notNull().references(() => dailyLog.id, {
    onDelete: "cascade"
  }),
  amount: text2("water")
});
var waterLogRelations = relations2(waterLog, ({ one, many }) => ({
  dailyLog: one(dailyLog, {
    fields: [waterLog.dailyLogId],
    references: [dailyLog.id]
  })
}));
var dailyMeal = createTable2("daily_meal", {
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
});
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
import { int as int3, sqliteTable as sqliteTable3, text as text3 } from "drizzle-orm/sqlite-core";
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
    isRead: int3("is_read", { mode: "boolean" }),
    isViewed: int3("is_viewed", { mode: "boolean" }),
    isDeleted: int3("is_deleted", { mode: "boolean" }),
    message: text3("message"),
    image: text3("image"),
    fromUserId: text3("from_user_id").references(() => user.id, {
      onDelete: "cascade"
    })
  }
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
import { int as int4, sqliteTable as sqliteTable4, text as text4 } from "drizzle-orm/sqlite-core";
var createTable4 = sqliteTable4;
var skinfold = createTable4("skinfold", {
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
});
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
var images = createTable4("images", {
  id: int4("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int4("created_at", { mode: "timestamp" }).default(sql4`(unixepoch())`).notNull(),
  userId: text4("user_id").notNull().references(() => user.id, {
    onDelete: "cascade"
  }),
  name: text4("name").notNull(),
  date: text4("date").notNull(),
  image: text4("image").notNull()
});
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
var bodyFat = createTable4("body_fat", {
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
});
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
var leanMass = createTable4("lean_mass", {
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
});
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
var bodyWeight = createTable4("body_weight", {
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
});
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
import { int as int5, sqliteTable as sqliteTable5, text as text5 } from "drizzle-orm/sqlite-core";
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
    isRead: int5("is_read", { mode: "boolean" }),
    isViewed: int5("is_viewed", { mode: "boolean" }),
    isDeleted: int5("is_deleted", { mode: "boolean" }),
    notes: text5("notes")
  }
);
var notificationRelations = relations5(
  notification,
  ({ one }) => ({
    user: one(user, {
      fields: [notification.userId],
      references: [user.id]
    })
  })
);

// src/server/db/schema/user.ts
var createTable6 = sqliteTable6;
var user = createTable6("user", {
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
  isFake: int6("is_fake", { mode: "boolean" }).default(false),
  isTrainer: int6("is_trainer", { mode: "boolean" }).default(false),
  isRoot: int6("is_root", { mode: "boolean" }).default(false),
  isCreator: int6("is_creator", { mode: "boolean" }).default(false),
  isAllTrainers: int6("is_all_trainers", { mode: "boolean" }).default(false),
  createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
  updatedAt: int6("updated_at", { mode: "timestamp" }).$onUpdate(
    () => /* @__PURE__ */ new Date()
  )
});
var userRelations = relations6(user, ({ one, many }) => ({
  roles: many(role),
  notifications: many(notification),
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
var userToUserCategory = createTable6("user_to_user_category", {
  userId: text6("user_id").notNull().references(() => user.id, {
    onDelete: "cascade"
  }),
  categoryId: int6("category_id").notNull().references(() => userCategory.id, {
    onDelete: "cascade"
  })
});
var usertoUserCategoryRelations = relations6(userToUserCategory, ({ one }) => ({
  user: one(user, {
    fields: [userToUserCategory.userId],
    references: [user.id]
  }),
  category: one(userCategory, {
    fields: [userToUserCategory.categoryId],
    references: [userCategory.id]
  })
}));
var userCategory = createTable6("user_category", {
  id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text6("name")
});
var userCategoryRelations = relations6(userCategory, ({ many }) => ({
  users: many(userToUserCategory)
}));
var supplementStack = createTable6("supplement_stack", {
  id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
  updatedAt: int6("updated_at", { mode: "timestamp" }).$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
  userId: text6("user_id").notNull().references(() => user.id, {
    onDelete: "cascade"
  }),
  name: text6("name"),
  time: text6("time")
});
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
    unit: text6("unit")
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
var trainerNotes = createTable6("trainer_notes", {
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
});
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
var goals = createTable6("goals", {
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
});
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
var userSettings = createTable6("user_settings", {
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
  isColdPlunge: int6("is_cold_plunge", { mode: "boolean" }).default(true)
});
var userSettingsRelations = relations6(userSettings, ({ one }) => ({
  user: one(user, {
    fields: [userSettings.userId],
    references: [user.id]
  })
}));
var weighIn = createTable6("weigh_in", {
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
});
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
var userToTrainer = createTable6("user_to_trainer", {
  userId: text6("user_id").notNull().references(() => user.id, {
    onDelete: "cascade"
  }),
  trainerId: text6("trainer_id").notNull().references(() => user.id, {
    onDelete: "cascade"
  })
});
var role = createTable6("role", {
  id: int6("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  createdAt: int6("created_at", { mode: "timestamp" }).default(sql6`(unixepoch())`).notNull(),
  updatedAt: int6("updated_at", { mode: "timestamp" }).$onUpdate(
    () => /* @__PURE__ */ new Date()
  ),
  userId: text6("user_id").references(() => user.id, {
    onDelete: "cascade"
  }),
  name: text6("name")
});
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
import { int as int7, sqliteTable as sqliteTable7, text as text7 } from "drizzle-orm/sqlite-core";
var createTable7 = sqliteTable7;
var recipe = createTable7("recipe", {
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
});
var recipeToIngredient = createTable7("recipe_to_ingredient", {
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
});
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
  }
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
  plan: () => plan,
  planRelations: () => planRelations,
  planToMeal: () => planToMeal,
  planToMealRelations: () => planToMealRelations,
  poopLog: () => poopLog,
  poopLogRelations: () => poopLogRelations,
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
  hiddenAt: int11("hidden_at", { mode: "timestamp" })
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
  meals: many(meal)
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

// src/server/db/index.ts
var createTable13 = sqliteTableCreator((name) => `${name}`);
var globalForDb = globalThis;
var client = globalForDb.client ?? createClient({
  url: env.DATABASE_URL
});
if (env.NODE_ENV !== "production") globalForDb.client = client;
var db = drizzle(client, { schema: schema_exports });

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
    async signIn({ user: user3 }) {
      if (!user3) {
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
          where: (user3, { eq: eq20 }) => eq20(user3.id, token.uid),
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
            isAdmin: dbUser.roles?.find((role3) => role3.name === "admin") ? true : false
          };
        }
      }
      return {
        ...session2
      };
    },
    jwt: async ({ user: user3, token }) => {
      if (user3) {
        token.uid = user3.id;
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
          where: (user3, { eq: eq20 }) => eq20(user3.email, credentials.username)
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
    console.log({
      input: JSON.stringify(input),
      type: opts.type,
      path: opts.path,
      duration: end - start,
      source: opts.ctx.headers.get("referer"),
      user: opts.ctx.session?.user.name,
      userId: opts.ctx.session?.user.id
    });
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
var rootProtectedProcedure = t.procedure.use(timingMiddleware).use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are a poohead"
    });
  }
  const sessionUser = ctx.session.user;
  if (!sessionUser) return next({ ctx });
  const user3 = await ctx.db.query.user.findFirst({
    where: (user4, { eq: eq20 }) => eq20(user4.id, sessionUser.id)
  });
  console.log("user in protected", user3);
  if (!user3?.isRoot) {
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
      where: (ingredient2, { isNull, and: and9, eq: eq20 }) => and9(
        isNull(ingredient2.hiddenAt),
        isNull(ingredient2.deletedAt),
        eq20(ingredient2.isSupplement, false),
        eq20(ingredient2.isPrivate, false),
        eq20(ingredient2.isUserCreated, false)
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
      where: (ingredient2, { isNull, and: and9, eq: eq20 }) => and9(
        isNull(ingredient2.hiddenAt),
        isNull(ingredient2.deletedAt),
        eq20(ingredient2.isSupplement, false),
        eq20(ingredient2.isPrivate, false),
        eq20(ingredient2.isUserCreated, false)
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
      where: (ingredient2, { eq: eq20 }) => eq20(ingredient2.id, input.id),
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
      where: (store, { eq: eq20 }) => eq20(store.id, input.id)
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

// node_modules/.pnpm/drizzle-dbml-generator@0.10.0_drizzle-orm@0.41.0_@libsql+client@0.15.10_gel@2.1.1_/node_modules/drizzle-dbml-generator/dist/index.js
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
    const builtIndexes = (Array.isArray(extraConfig) ? extraConfig : Object.values(extraConfig ?? {})).map((b) => b?.build(table)).filter((b) => b !== void 0).filter((index3) => !(is(index3, PgCheck) || is(index3, MySqlCheck) || is(index3, SQLiteCheck)));
    const fks = builtIndexes.filter(
      (index3) => is(index3, PgForeignKey) || is(index3, MySqlForeignKey) || is(index3, SQLiteForeignKey)
    );
    if (!this.relational) {
      this.generateForeignKeys(fks);
    }
    if (extraConfigBuilder && builtIndexes.length > fks.length) {
      const indexes = extraConfig ?? {};
      dbml.newLine().tab().insert("indexes {").newLine();
      for (const indexName in indexes) {
        const index3 = indexes[indexName].build(table);
        dbml.tab(2);
        if (is(index3, PgIndex) || is(index3, MySqlIndex) || is(index3, SQLiteIndex)) {
          const configColumns = index3.config.columns.flatMap(
            (entry) => is(entry, SQL) ? entry.queryChunks.filter((v) => is(v, Column)) : entry
          );
          const idxColumns = wrapColumns(
            configColumns,
            this.buildQueryConfig.escapeName
          );
          const idxProperties = index3.config.name ? ` [name: '${index3.config.name}'${index3.config.unique ? ", unique" : ""}]` : "";
          dbml.insert(`${idxColumns}${idxProperties}`);
        }
        if (is(index3, PgPrimaryKey) || is(index3, MySqlPrimaryKey) || is(index3, SQLitePrimaryKey)) {
          const pkColumns = wrapColumns(index3.columns, this.buildQueryConfig.escapeName);
          dbml.insert(`${pkColumns} [pk]`);
        }
        if (is(index3, PgUniqueConstraint) || is(index3, MySqlUniqueConstraint) || is(index3, SQLiteUniqueConstraint)) {
          const uqColumns = wrapColumns(index3.columns, this.buildQueryConfig.escapeName);
          const uqProperties = index3.name ? `[name: '${index3.name}', unique]` : "[unique]";
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
    const user3 = await db.query.user.findFirst({
      where: (user4, { eq: eq20 }) => eq20(user4.email, "renn@warner.systems"),
      columns: {
        id: true
      }
    });
    const r = await ctx.db.insert(ingredient).values(
      // @ts-ignore
      csvData.map((row) => ({
        userId: user3?.id ?? "",
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
    const user3 = await db.query.user.findFirst({
      where: (user4, { eq: eq20 }) => eq20(user4.email, "renn@warner.systems"),
      columns: {
        id: true
      }
    });
    const r = await ctx.db.insert(ingredient).values(
      // @ts-ignore
      csvData.map((row) => ({
        userId: user3?.id ?? "",
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

// src/server/api/routers/user.ts
import { TRPCError as TRPCError2 } from "@trpc/server";

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

// src/server/api/routers/user.ts
import { hash } from "bcryptjs";
import { eq as eq3 } from "drizzle-orm";
import { z as z6 } from "zod";
var createSchema = z6.object({
  name: z6.string(),
  birthDate: z6.date().optional(),
  address: z6.string().optional(),
  phone: z6.string().optional(),
  instagram: z6.string().optional(),
  openLifter: z6.string().optional(),
  notes: z6.string().optional(),
  email: z6.string().optional()
});
var createLog = async ({
  user: user3,
  task,
  notes,
  userId,
  objectId
}) => {
  await db.insert(log).values({
    task,
    notes,
    user: user3,
    userId,
    objectId
  });
};
var userRouter = createTRPCRouter({
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
  sync: protectedProcedure.mutation(async () => {
    await client.sync();
    return true;
  }),
  unprotectedSync: publicProcedure.mutation(async () => {
    await client.sync();
    return true;
  }),
  getByEmail: protectedProcedure.input(z6.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError2({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user3, { eq: eq20 }) => eq20(user3.email, input),
      columns: {
        password: false
      }
    });
    return res;
  }),
  updateIsPosing: protectedProcedure.input(z6.object({ id: z6.string(), isPosing: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isPosing: input.isPosing
    }).where(eq3(userSettings.userId, input.id));
    return res;
  }),
  updateIsBloodGlucose: protectedProcedure.input(z6.object({ id: z6.string(), isBloodGlucose: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isBloodGlucose: input.isBloodGlucose
    }).where(eq3(userSettings.userId, input.id));
    return res;
  }),
  updateIsSleep: protectedProcedure.input(z6.object({ id: z6.string(), isSleep: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isSleep: input.isSleep
    }).where(eq3(userSettings.userId, input.id));
    return res;
  }),
  updateIsSleepQuality: protectedProcedure.input(z6.object({ id: z6.string(), isSleepQuality: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isSleepQuality: input.isSleepQuality
    }).where(eq3(userSettings.userId, input.id));
    return res;
  }),
  updateIsNap: protectedProcedure.input(z6.object({ id: z6.string(), isNap: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isNap: input.isNap
    }).where(eq3(userSettings.userId, input.id));
    return res;
  }),
  updateIsWeightTraining: protectedProcedure.input(z6.object({ id: z6.string(), isWeightTraining: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isWeightTraining: input.isWeightTraining
    }).where(eq3(userSettings.userId, input.id));
    return res;
  }),
  updateIsHiit: protectedProcedure.input(z6.object({ id: z6.string(), isHiit: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isHiit: input.isHiit
    }).where(eq3(userSettings.userId, input.id));
    return res;
  }),
  updateIsLiss: protectedProcedure.input(z6.object({ id: z6.string(), isLiss: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isLiss: input.isLiss
    }).where(eq3(userSettings.userId, input.id));
    return res;
  }),
  updateIsNote: protectedProcedure.input(z6.object({ id: z6.string(), isNote: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isNotes: input.isNote
    }).where(eq3(userSettings.userId, input.id));
    return res;
  }),
  updateIsSauna: protectedProcedure.input(z6.object({ id: z6.string(), isSauna: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isSauna: input.isSauna
    }).where(eq3(userSettings.userId, input.id));
    return res;
  }),
  updateIsColdPlunge: protectedProcedure.input(z6.object({ id: z6.string(), isColdPlunge: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isColdPlunge: input.isColdPlunge
    }).where(eq3(userSettings.userId, input.id));
    return res;
  }),
  updateIsSteps: protectedProcedure.input(z6.object({ id: z6.string(), isSteps: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      isSteps: input.isSteps
    }).where(eq3(userSettings.userId, input.id));
    return res;
  }),
  updateTrainer: protectedProcedure.input(z6.object({ id: z6.string(), isTrainer: z6.boolean() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      isTrainer: input.isTrainer
    }).where(eq3(user.id, input.id));
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
    z6.object({
      firstName: z6.string(),
      id: z6.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      firstName: input.firstName
    }).where(eq3(user.id, input.id));
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
    z6.object({
      lastName: z6.string(),
      id: z6.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      lastName: input.lastName
    }).where(eq3(user.id, input.id));
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
    z6.object({
      email: z6.string(),
      id: z6.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      email: input.email
    }).where(eq3(user.id, input.id));
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
    z6.object({
      password: z6.string(),
      id: z6.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const hashedPassword = await hash(input.password, 10);
    const res = await ctx.db.update(user).set({
      password: hashedPassword
    }).where(eq3(user.id, input.id));
    createLog({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Update Password",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  get: protectedProcedure.input(z6.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError2({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user3, { eq: eq20 }) => eq20(user3.id, input),
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
  getCurrentUser: protectedProcedure.input(z6.object({ id: z6.string() }).optional()).query(async ({ ctx, input }) => {
    let userId = ctx.session?.user.id;
    if (input?.id && input.id !== "") userId = input.id;
    if (!userId) return null;
    const res = await ctx.db.query.user.findFirst({
      where: (user3, { eq: eq20 }) => eq20(user3.id, userId),
      columns: {
        password: false
      },
      with: {
        images: true,
        settings: true,
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
      where: (user3, { eq: eq20 }) => eq20(user3.id, userId),
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
      where: (user3, { eq: eq20 }) => eq20(user3.id, userId),
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
      where: (user3, { eq: eq20 }) => eq20(user3.id, userId),
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
      where: (user3, { eq: eq20 }) => eq20(user3.id, userId),
      with: {
        roles: true
      }
    });
    if (!res) return false;
    const isAdmin = res?.roles?.find((role3) => role3.name === "admin") ? true : false;
    return isAdmin;
  }),
  updateRoot: rootProtectedProcedure.input(z6.object({ isRoot: z6.boolean(), id: z6.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(user).set({
      isRoot: input.isRoot
    }).where(eq3(user.id, input.id));
    return res;
  }),
  createUser: publicProcedure.input(
    z6.object({
      email: z6.string().email(),
      password: z6.string(),
      firstName: z6.string(),
      lastName: z6.string(),
      birthDate: z6.date().optional().nullable(),
      isCreator: z6.boolean().optional(),
      isTrainer: z6.boolean().optional(),
      isRoot: z6.boolean().optional()
    })
  ).mutation(async ({ ctx, input }) => {
    const hashedPassword = await hash(input.password, 10);
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
      users.map((user3) => ({
        firstName: user3.firstName,
        lastName: user3.lastName,
        name: `${user3.firstName} ${user3.lastName}`,
        email: `${user3.firstName.toLowerCase()}${user3.lastName.toLowerCase()}@warner.systems`,
        password: hashedPassword,
        isFake: user3.isFake,
        isTrainer: user3.isTrainer || false
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
  }),
  updateWater: protectedProcedure.input(z6.object({ water: z6.number(), id: z6.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      defaultWater: input.water.toString()
    }).where(eq3(userSettings.id, input.id));
    return res;
  }),
  updateRoleBodyBuilderImages: protectedProcedure.input(z6.object({ userId: z6.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role3, { eq: eq20, and: and9 }) => and9(
        eq20(role3.userId, input.userId),
        eq20(role3.name, "body-builder-images")
      )
    });
    if (res) {
      await ctx.db.delete(role).where(eq3(role.id, res.id));
    } else {
      await ctx.db.insert(role).values({
        name: "body-builder-images",
        userId: input.userId
      });
    }
    return res;
  }),
  updateRoleSupplements: protectedProcedure.input(z6.object({ userId: z6.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role3, { eq: eq20, and: and9 }) => and9(eq20(role3.userId, input.userId), eq20(role3.name, "supplements"))
    });
    if (res) {
      await ctx.db.delete(role).where(eq3(role.id, res.id));
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
  updateRoleCreateMeals: protectedProcedure.input(z6.object({ userId: z6.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role3, { eq: eq20, and: and9 }) => and9(eq20(role3.userId, input.userId), eq20(role3.name, "create-meals"))
    });
    if (res) {
      await ctx.db.delete(role).where(eq3(role.id, res.id));
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
  updateRoleAdmin: protectedProcedure.input(z6.object({ userId: z6.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.query.role.findFirst({
      where: (role3, { eq: eq20, and: and9 }) => and9(eq20(role3.userId, input.userId), eq20(role3.name, "admin"))
    });
    if (res) {
      await ctx.db.delete(role).where(eq3(role.id, res.id));
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
  }),
  updateChartRange: protectedProcedure.input(z6.object({ range: z6.number(), id: z6.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userSettings).set({
      defaultChartRange: input.range.toString()
    }).where(eq3(userSettings.id, input.id));
    return res;
  }),
  deleteFakeUsers: rootProtectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(user).where(eq3(user.isFake, true));
    return res;
  }),
  deleteUser: rootProtectedProcedure.input(z6.string()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(user).where(eq3(user.id, input));
    return res;
  }),
  getFakeUsers: rootProtectedProcedure.query(async () => {
    const res = await db.query.user.findMany({
      where: (users, { eq: eq20 }) => eq20(users.isFake, true)
    });
    return res;
  }),
  getBasic: protectedProcedure.input(z6.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError2({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user3, { eq: eq20 }) => eq20(user3.id, input),
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
  getAllYour: protectedProcedure.input(z6.string().optional()).query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;
    const res = await ctx.db.query.user.findMany({
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
    const users = res.filter((user3) => {
      if (user3.id === userId) return true;
      if (ctx.session.user.isAdmin) return true;
      if (user3.trainers.find((trainer) => trainer.trainer.id === userId))
        return true;
      return false;
    });
    return users;
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
  checkEmail: publicProcedure.input(z6.string()).mutation(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError2({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user3, { eq: eq20 }) => eq20(user3.email, input)
    });
    return res ? true : false;
  }),
  getGaurenteed: protectedProcedure.input(z6.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError2({ code: "BAD_REQUEST" });
    const res = await ctx.db.query.user.findFirst({
      where: (user3, { eq: eq20 }) => eq20(user3.id, input),
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
  })
});

// src/server/api/routers/settings.ts
import { z as z7 } from "zod";
var settingsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ input, ctx }) => {
    const res = await ctx.db.query.settings.findFirst();
    return res;
  }),
  updateCalories: protectedProcedure.input(z7.boolean()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(settings).set({
      isCaloriesWithFibre: input
    });
    return res;
  })
});

// src/server/api/routers/recipe.ts
import { desc as desc3, eq as eq4 } from "drizzle-orm";
import { z as z8 } from "zod";
var recipeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.recipe.findMany({
      where: (recipe2, { eq: eq20 }) => eq20(recipe2.isUserRecipe, false),
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
  getAllUserCreated: protectedProcedure.input(z8.object({ userId: z8.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.recipe.findMany({
      where: (recipe2, { eq: eq20, and: and9 }) => and9(
        eq20(recipe2.creatorId, input.userId),
        eq20(recipe2.isUserRecipe, true)
      ),
      orderBy: [desc3(recipe.createdAt)],
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
  get: protectedProcedure.input(z8.object({ id: z8.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.recipe.findFirst({
      where: (recipe2, { eq: eq20 }) => eq20(recipe2.id, input.id),
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
    z8.object({
      id: z8.number(),
      name: z8.string(),
      description: z8.string(),
      image: z8.string(),
      notes: z8.string(),
      recipeCategory: z8.string(),
      calories: z8.number(),
      isUserRecipe: z8.boolean().optional(),
      ingredients: z8.array(
        z8.object({
          ingredientId: z8.number(),
          alternateId: z8.string(),
          note: z8.string(),
          serveSize: z8.string(),
          serveUnit: z8.string(),
          index: z8.number(),
          isAlternate: z8.boolean().optional()
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const { ingredients, ...data } = input;
    const res = await ctx.db.update(recipe).set(data).where(eq4(recipe.id, input.id)).returning({ id: recipe.id });
    const resId = res?.[0]?.id;
    if (!resId) return res;
    await ctx.db.delete(recipeToIngredient).where(eq4(recipeToIngredient.recipeId, resId));
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
  duplicate: protectedProcedure.input(z8.object({ id: z8.number() })).mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const recipeRes = await ctx.db.query.recipe.findFirst({
      where: eq4(recipe.id, input.id),
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
    z8.object({
      name: z8.string(),
      description: z8.string(),
      image: z8.string(),
      notes: z8.string(),
      recipeCategory: z8.string(),
      calories: z8.number(),
      isUserRecipe: z8.boolean().optional(),
      ingredients: z8.array(
        z8.object({
          ingredientId: z8.number(),
          alternateId: z8.string(),
          note: z8.string(),
          serveSize: z8.string(),
          serveUnit: z8.string(),
          index: z8.number()
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
  delete: protectedProcedure.input(z8.object({ id: z8.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(recipe).where(eq4(recipe.id, input.id));
    return res;
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(recipe);
    return res;
  })
});

// src/server/api/routers/plan.ts
import { desc as desc4, eq as eq5 } from "drizzle-orm";
import { z as z9 } from "zod";
var planRouter = createTRPCRouter({
  getAllSimple: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.plan.findMany({
      orderBy: [desc4(plan.createdAt)],
      with: {
        creator: true
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
  get: protectedProcedure.input(z9.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.plan.findFirst({
      where: (plan2, { eq: eq20 }) => eq20(plan2.id, input),
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
    z9.object({
      id: z9.number(),
      name: z9.string(),
      description: z9.string(),
      image: z9.string(),
      notes: z9.string(),
      planCategory: z9.string(),
      numberOfMeals: z9.number(),
      meals: z9.array(
        z9.object({
          mealIndex: z9.number(),
          mealTitle: z9.string(),
          calories: z9.string(),
          vegeCalories: z9.string(),
          vegeNotes: z9.string(),
          vege: z9.string(),
          note: z9.string(),
          recipes: z9.array(
            z9.object({
              recipeId: z9.number(),
              note: z9.string()
            })
          )
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(plan).where(eq5(plan.id, input.id));
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
    z9.object({
      name: z9.string(),
      description: z9.string(),
      image: z9.string(),
      notes: z9.string(),
      planCategory: z9.string(),
      numberOfMeals: z9.number(),
      meals: z9.array(
        z9.object({
          mealIndex: z9.number(),
          mealTitle: z9.string(),
          calories: z9.string(),
          vegeCalories: z9.string(),
          vegeNotes: z9.string(),
          vege: z9.string(),
          note: z9.string(),
          recipes: z9.array(
            z9.object({
              id: z9.number(),
              note: z9.string(),
              name: z9.string(),
              calories: z9.string(),
              ingredients: z9.array(
                z9.object({
                  ingredientId: z9.number(),
                  alternateId: z9.number().nullable(),
                  name: z9.string(),
                  serve: z9.string(),
                  serveUnit: z9.string(),
                  note: z9.string()
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
  create: protectedProcedure.input(
    z9.object({
      name: z9.string(),
      description: z9.string(),
      image: z9.string(),
      notes: z9.string(),
      planCategory: z9.string(),
      numberOfMeals: z9.number(),
      meals: z9.array(
        z9.object({
          mealIndex: z9.number(),
          mealTitle: z9.string(),
          calories: z9.string(),
          vegeCalories: z9.string(),
          vegeNotes: z9.string(),
          vege: z9.string(),
          note: z9.string(),
          recipes: z9.array(
            z9.object({
              recipeId: z9.number(),
              note: z9.string()
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
  delete: protectedProcedure.input(z9.object({ id: z9.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(plan).where(eq5(plan.id, input.id));
    return res;
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(plan);
    return res;
  })
});

// src/server/api/routers/meal.ts
import { desc as desc5, eq as eq6 } from "drizzle-orm";
import { z as z10 } from "zod";
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
  get: protectedProcedure.input(z10.object({ id: z10.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.meal.findFirst({
      where: (meal2, { eq: eq20 }) => eq20(meal2.id, input.id),
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
    z10.object({
      name: z10.string(),
      description: z10.string(),
      image: z10.string(),
      notes: z10.string(),
      mealCategory: z10.string(),
      veges: z10.object({
        vegeStackId: z10.number(),
        note: z10.string(),
        calories: z10.string()
      }).optional(),
      recipes: z10.array(
        z10.object({
          recipeId: z10.number(),
          note: z10.string(),
          index: z10.number()
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
    z10.object({
      id: z10.number(),
      name: z10.string(),
      description: z10.string(),
      image: z10.string(),
      notes: z10.string(),
      mealCategory: z10.string(),
      veges: z10.object({
        vegeStackId: z10.number(),
        note: z10.string(),
        calories: z10.string()
      }).optional(),
      recipes: z10.array(
        z10.object({
          recipeId: z10.number(),
          note: z10.string(),
          index: z10.number()
        })
      )
    })
  ).mutation(async ({ input, ctx }) => {
    const { veges, recipes, id, ...data } = input;
    const res = await ctx.db.update(meal).set({
      ...data
    }).where(eq6(meal.id, input.id));
    await ctx.db.delete(mealToRecipe).where(eq6(mealToRecipe.mealId, input.id));
    const recipeRes = await ctx.db.insert(mealToRecipe).values(
      recipes.map((recipe2) => ({
        ...recipe2,
        mealId: input.id
      }))
    ).returning({ id: mealToRecipe.id });
    await ctx.db.delete(mealToVegeStack).where(eq6(mealToVegeStack.mealId, input.id));
    if (veges && veges.vegeStackId != 0) {
      await ctx.db.insert(mealToVegeStack).values({
        ...veges,
        mealId: input.id
      });
    }
    return { res, recipeRes };
  }),
  updateFavourite: protectedProcedure.input(z10.object({ id: z10.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(meal).set({
      favouriteAt: /* @__PURE__ */ new Date()
    }).where(eq6(meal.id, input.id));
    return res;
  }),
  deleteFavourite: protectedProcedure.input(z10.object({ id: z10.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(meal).set({
      favouriteAt: null
    }).where(eq6(meal.id, input.id));
    return res;
  }),
  delete: protectedProcedure.input(z10.object({ id: z10.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(meal).where(eq6(meal.id, input.id));
    return res;
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(meal);
    return res;
  })
});

// src/server/api/routers/vege.ts
import { eq as eq7 } from "drizzle-orm";
import { z as z11 } from "zod";
var vegeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.vegeStack.findMany();
    return res;
  }),
  get: protectedProcedure.input(z11.object({ id: z11.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.vegeStack.findFirst({
      where: (store, { eq: eq20 }) => eq20(store.id, input.id)
    });
    return res;
  }),
  create: protectedProcedure.input(z11.object({ veges: z11.string(), notes: z11.string(), calories: z11.string(), name: z11.string() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(vegeStack).values({
      ...input
    });
    return res;
  }),
  delete: protectedProcedure.input(z11.object({ id: z11.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(vegeStack).where(eq7(vegeStack.id, input.id));
    return res;
  }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(vegeStack);
    return res;
  })
});

// src/server/api/routers/user-plan.ts
import { eq as eq8, and as and2 } from "drizzle-orm";
import { z as z12 } from "zod";

// src/server/api/routers/admin-log.ts
var createLog2 = async ({
  user: user3,
  task,
  notes,
  userId,
  objectId
}) => {
  await db.insert(log).values({
    task,
    notes,
    user: user3,
    userId,
    objectId
  });
};

// src/server/api/routers/user-plan.ts
var userPlanRouter = createTRPCRouter({
  delete: protectedProcedure.input(z12.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(userPlan).where(eq8(userPlan.id, input));
    return res;
  }),
  finishPlan: protectedProcedure.input(z12.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(userPlan).set({
      isActive: false,
      finishedAt: /* @__PURE__ */ new Date()
    }).where(eq8(userPlan.id, input));
    return res;
  }),
  activePlan: protectedProcedure.input(z12.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(userPlan).set({
      isActive: true,
      finishedAt: null
    }).where(eq8(userPlan.id, input));
    return res;
  }),
  getMeal: protectedProcedure.input(z12.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userMeal.findFirst({
      where: eq8(userMeal.id, input)
    });
    return res;
  }),
  getRecipe: protectedProcedure.input(z12.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userRecipe.findFirst({
      where: eq8(userRecipe.id, input)
    });
    return res;
  }),
  getIngredient: protectedProcedure.input(z12.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userIngredient.findFirst({
      where: eq8(userIngredient.id, input),
      with: {
        ingredient: true,
        alternateIngredient: true
      }
    });
    return res;
  }),
  get: protectedProcedure.input(z12.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userPlan.findFirst({
      where: eq8(userPlan.id, input),
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
    z12.object({
      name: z12.string().min(1),
      description: z12.string(),
      image: z12.string(),
      notes: z12.string(),
      userId: z12.string(),
      meals: z12.array(
        z12.object({
          mealIndex: z12.number(),
          mealTitle: z12.string(),
          calories: z12.string(),
          protein: z12.string().optional(),
          targetProtein: z12.string(),
          targetCalories: z12.string(),
          vegeCalories: z12.string(),
          veges: z12.string(),
          vegeNotes: z12.string(),
          note: z12.string(),
          recipes: z12.array(
            z12.object({
              recipeIndex: z12.number(),
              mealIndex: z12.number(),
              name: z12.string(),
              note: z12.string(),
              description: z12.string(),
              index: z12.number(),
              ingredients: z12.array(
                z12.object({
                  ingredientId: z12.number(),
                  ingredientIndex: z12.number(),
                  recipeIndex: z12.number(),
                  mealIndex: z12.number(),
                  alternateId: z12.number().nullable(),
                  name: z12.string(),
                  serve: z12.string(),
                  serveUnit: z12.string(),
                  note: z12.string()
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
    const recipes = meals.map((meal2) => meal2.recipes).flat();
    const ingredients = recipes.map((recipe2) => recipe2.ingredients).flat();
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
          alternateId: ingredient2.alternateId === 0 ? null : Number(ingredient2.alternateId),
          userPlanId: resId
        }))
      ).returning({ id: userIngredient.id })
    ]);
    createLog2({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "User Create Plan",
      notes: JSON.stringify(input),
      objectId: resId
    });
    const notif = await ctx.db.query.notification.findMany({
      where: and2(
        eq8(notification.userId, input.userId),
        eq8(notification.code, "user-plan_update"),
        eq8(notification.isViewed, false)
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
    return { res, batchRes };
  })
});

// src/server/api/routers/daily-log.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
import { and as and3, eq as eq9 } from "drizzle-orm";
import { z as z13 } from "zod";
var createBlankLogs = async (userId, startDate) => {
  const logs = [];
  for (let i = 1; i < 7; i++) {
    const date = new Date(startDate.toDateString());
    date.setDate(startDate.getDate() + i);
    const existingLog = await db.select().from(dailyLog).where(
      and3(
        eq9(dailyLog.userId, userId),
        eq9(dailyLog.date, date.toDateString())
      )
    ).then((res) => res[0]);
    if (!existingLog) {
      const log2 = await db.insert(dailyLog).values({
        date: date.toDateString(),
        morningWeight: "",
        notes: date.toDateString(),
        sleep: "",
        sleepQuality: "",
        isHiit: false,
        isCardio: false,
        isLift: false,
        isLiss: false,
        image: "",
        waistMeasurement: "",
        userId
      }).returning().then((res) => res[0]);
      logs.push(log2);
    } else {
      await db.delete(dailyMeal).where(eq9(dailyMeal.dailyLogId, existingLog.id));
      logs.push(existingLog);
    }
  }
  return logs;
};
var createLog3 = async ({
  user: user3,
  task,
  notes,
  userId,
  objectId
}) => {
  await db.insert(log).values({
    task,
    notes,
    user: user3,
    userId,
    objectId
  });
};
var dailyLogRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      morningWeight: z13.string().optional(),
      fastedBloodGlucose: z13.string().optional(),
      notes: z13.string().optional(),
      sleep: z13.string().optional(),
      sleepQuality: z13.string().optional(),
      nap: z13.string().optional(),
      waistMeasurement: z13.string().optional(),
      isHiit: z13.boolean().optional(),
      isCardio: z13.boolean().optional(),
      isLift: z13.boolean().optional(),
      isLiss: z13.boolean().optional(),
      image: z13.string().optional(),
      userId: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, input.userId)
      )
    });
    if (log2) throw new TRPCError3({ code: "CONFLICT" });
    const res = await ctx.db.insert(dailyLog).values({
      ...input,
      date: input.date
    }).returning({ id: dailyLog.id });
    createLog3({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Create Daily Log",
      notes: JSON.stringify(input),
      objectId: res[0]?.id
    });
    return { res };
  }),
  deleteMeal: protectedProcedure.input(
    z13.object({
      mealIndex: z13.number(),
      logId: z13.number()
    })
  ).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(userIngredient).where(
      and3(
        eq9(userIngredient.dailyLogId, input.logId),
        eq9(userIngredient.mealIndex, input.mealIndex)
      )
    );
    await ctx.db.delete(userRecipe).where(
      and3(
        eq9(userRecipe.dailyLogId, input.logId),
        eq9(userRecipe.mealIndex, input.mealIndex)
      )
    );
    await ctx.db.delete(dailyMeal).where(
      and3(
        eq9(dailyMeal.dailyLogId, input.logId),
        eq9(dailyMeal.mealIndex, input.mealIndex)
      )
    );
    return true;
  }),
  copyWeek: protectedProcedure.input(
    z13.object({
      userId: z13.string(),
      logId: z13.number()
    })
  ).mutation(async ({ input, ctx }) => {
    const referenceLog = await ctx.db.select().from(dailyLog).where(eq9(dailyLog.id, input.logId)).then((res) => res[0]);
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
            where: eq9(dailyMeal.dailyLogId, input.logId)
          });
          meals.forEach(async (meal2) => {
            if (meal2) {
              const recipes = await db.select().from(userRecipe).where(eq9(userRecipe.dailyMealId, meal2.id));
              const ingredients = await db.select().from(userIngredient).where(eq9(userIngredient.dailyMealId, meal2.id));
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
    z13.object({
      logId: z13.number()
    })
  ).mutation(async ({ input, ctx }) => {
    const dailyMeals = await ctx.db.delete(dailyMeal).where(eq9(dailyMeal.dailyLogId, input.logId));
    return dailyMeals;
  }),
  updateIsStarred: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      isStarred: z13.boolean()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSupplement: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      suppId: z13.number(),
      amount: z13.number(),
      unit: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
    z13.object({
      date: z13.string(),
      notes: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    console.log("-------------------------------------enter");
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    console.log("-------------------------------------log");
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updatePosing: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      posing: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSleep: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      sleep: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSleepQuality: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      sleepQuality: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSteps: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      steps: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    if (!log2) return;
    createLog3({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Steps",
      notes: JSON.stringify(input),
      objectId: log2?.id
    });
    const res = await ctx.db.update(dailyLog).set({ steps: input.steps }).where(
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateSauna: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      sauna: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    if (!log2) return;
    createLog3({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Sauna",
      notes: JSON.stringify(input),
      objectId: log2?.id
    });
    const res = await ctx.db.update(dailyLog).set({ sauna: input.sauna }).where(
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateColdPlunge: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      coldPlunge: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    if (!log2) return;
    createLog3({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Cold Plunge",
      notes: JSON.stringify(input),
      objectId: log2?.id
    });
    const res = await ctx.db.update(dailyLog).set({ coldPlunge: input.coldPlunge }).where(
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateNap: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      nap: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateHiit: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      hiit: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateCardio: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      cardio: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateWeightTraining: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      weight: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateLiss: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      liss: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateWaistMeasurement: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      waistMeasurement: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateWeight: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      morningWeight: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateBloodGlucose: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      fastedBloodGlucose: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return res;
  }),
  updateFrontImage: protectedProcedure.input(
    z13.object({
      logId: z13.number(),
      image: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog3({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update Front Image",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ frontImage: input.image }).where(eq9(dailyLog.id, input.logId));
    return true;
  }),
  updateSideImage: protectedProcedure.input(
    z13.object({
      logId: z13.number(),
      image: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog3({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update side Image",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ sideImage: input.image }).where(eq9(dailyLog.id, input.logId));
    return true;
  }),
  updateBackImage: protectedProcedure.input(
    z13.object({
      logId: z13.number(),
      image: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    createLog3({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Update  Back Image",
      notes: JSON.stringify(input),
      objectId: null
    });
    const res = await ctx.db.update(dailyLog).set({ backImage: input.image }).where(eq9(dailyLog.id, input.logId));
    return true;
  }),
  updateBodyBuilderImage: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      image: z13.string(),
      name: z13.string(),
      userId: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(images).where(
      and3(
        eq9(images.date, input.date),
        eq9(images.name, input.name),
        eq9(images.userId, input.userId)
      )
    );
    createLog3({
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
    return res;
  }),
  updateImage: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      image: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    });
    createLog3({
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
      and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
      )
    );
    return true;
  }),
  addWaterLog: protectedProcedure.input(
    z13.object({
      date: z13.string(),
      amount: z13.number()
    })
  ).mutation(async ({ input, ctx }) => {
    let isCreateLog = false;
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
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
    createLog3({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: water[0]?.id,
      task: "Add Water " + input.amount.toString() + "ml",
      notes: isCreateLog ? "Created new log" : ""
    });
    return water;
  }),
  deleteWaterLog: protectedProcedure.input(z13.object({ id: z13.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(waterLog).where(eq9(waterLog.id, input.id));
    createLog3({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: input.id,
      task: "Deleted water",
      notes: ""
    });
    return res;
  }),
  addPoopLog: protectedProcedure.input(
    z13.object({
      date: z13.string()
    })
  ).mutation(async ({ input, ctx }) => {
    let isCreateLog = false;
    console.log("input", input);
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and3(
        eq9(dailyLog.date, input.date),
        eq9(dailyLog.userId, ctx.session.user.id)
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
    createLog3({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: poop[0]?.id,
      task: "Add poo ",
      notes: isCreateLog ? "Created new log" : ""
    });
    return poop;
  }),
  deletePoopLog: protectedProcedure.input(z13.object({ id: z13.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(poopLog).where(eq9(poopLog.id, input.id));
    createLog3({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: input.id,
      task: "Deleted Poo",
      notes: ""
    });
    return res;
  }),
  addUserCreatedRecipe: protectedProcedure.input(
    z13.object({
      mealIndex: z13.number(),
      logId: z13.number(),
      recipe: z13.object({
        name: z13.string(),
        description: z13.string(),
        image: z13.string(),
        notes: z13.string(),
        recipeCategory: z13.string(),
        calories: z13.number(),
        ingredients: z13.array(
          z13.object({
            ingredientId: z13.number(),
            alternateId: z13.string(),
            note: z13.string(),
            serveSize: z13.string(),
            serveUnit: z13.string(),
            index: z13.number(),
            isAlternate: z13.boolean().optional()
          })
        )
      })
    })
  ).mutation(async ({ input, ctx }) => {
    console.log("input", input);
    await ctx.db.batch([
      ctx.db.delete(userIngredient).where(
        and3(
          eq9(userIngredient.dailyLogId, input.logId ?? -1),
          eq9(userIngredient.mealIndex, input.mealIndex ?? -1)
        )
      ),
      ctx.db.delete(userRecipe).where(
        and3(
          eq9(userRecipe.dailyLogId, input.logId ?? -1),
          eq9(userRecipe.mealIndex, input.mealIndex ?? -1)
        )
      ),
      ctx.db.delete(dailyMeal).where(
        and3(
          eq9(dailyMeal.dailyLogId, input.logId ?? -1),
          eq9(dailyMeal.mealIndex, input.mealIndex ?? -1)
        )
      )
    ]);
    createLog3({
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
    z13.object({
      userId: z13.string(),
      planId: z13.number(),
      mealIndex: z13.number().nullable(),
      recipeIndex: z13.number().nullable().optional(),
      recipeId: z13.number().nullable().optional(),
      date: z13.date(),
      logId: z13.number().nullable()
    })
  ).mutation(async ({ input, ctx }) => {
    console.log("input", input);
    const plan2 = await ctx.db.query.userPlan.findFirst({
      where: eq9(userPlan.id, input.planId),
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
          eq9(userIngredient.dailyLogId, input.logId ?? -1),
          eq9(userIngredient.mealIndex, input.mealIndex ?? -1)
        )
      ),
      ctx.db.delete(userRecipe).where(
        and3(
          eq9(userRecipe.dailyLogId, input.logId ?? -1),
          eq9(userRecipe.mealIndex, input.mealIndex ?? -1)
        )
      ),
      ctx.db.delete(dailyMeal).where(
        and3(
          eq9(dailyMeal.dailyLogId, input.logId ?? -1),
          eq9(dailyMeal.mealIndex, input.mealIndex ?? -1)
        )
      )
    ]);
    createLog3({
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
  update: protectedProcedure.input(
    z13.object({
      id: z13.number(),
      date: z13.string(),
      morningWeight: z13.string().optional(),
      notes: z13.string().optional(),
      sleep: z13.string().optional(),
      sleepQuality: z13.string().optional(),
      fastedBloodGlucose: z13.string().optional(),
      nap: z13.string().optional(),
      waistMeasurement: z13.string().optional(),
      isHiit: z13.boolean().optional(),
      isCardio: z13.boolean().optional(),
      isLift: z13.boolean().optional(),
      isLiss: z13.boolean().optional(),
      image: z13.string().optional(),
      userId: z13.string()
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
      image,
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
      image,
      userId
    }).where(eq9(dailyLog.id, id));
    createLog3({
      user: ctx.session.user.name,
      task: "Update Daily Log",
      notes: JSON.stringify(input),
      userId: ctx.session.user.id,
      objectId: id
    });
    return { res };
  }),
  getAllUser: protectedProcedure.input(z13.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError3({ code: "NOT_FOUND" });
    const res = await ctx.db.query.dailyLog.findMany({
      where: eq9(dailyLog.userId, input),
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
  getAllCurrentUser: protectedProcedure.input(z13.object({ id: z13.string() }).optional()).query(async ({ ctx, input }) => {
    let userId = ctx.session?.user.id;
    if (input?.id && input.id !== "") userId = input.id;
    if (!userId) return null;
    const res = await ctx.db.query.dailyLog.findMany({
      where: eq9(dailyLog.userId, userId),
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
  delete: protectedProcedure.input(z13.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(dailyLog).where(eq9(dailyLog.id, input));
    return res;
  }),
  deleteAll: protectedProcedure.input(z13.string()).mutation(async ({ input, ctx }) => {
    if (input === "") throw new TRPCError3({ code: "NOT_FOUND" });
    const res = await ctx.db.delete(dailyLog).where(eq9(dailyLog.userId, input));
    return res;
  }),
  getSimple: protectedProcedure.input(z13.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.dailyLog.findFirst({
      where: eq9(dailyLog.id, input)
    });
    return res;
  }),
  get: protectedProcedure.input(z13.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.dailyLog.findFirst({
      where: eq9(dailyLog.id, input),
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
});

// src/server/api/routers/weigh-in.ts
import { TRPCError as TRPCError4 } from "@trpc/server";
import { eq as eq10 } from "drizzle-orm";
import { z as z14 } from "zod";
var weighInRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z14.object({
      date: z14.date().optional(),
      bodyWeight: z14.string(),
      bodyFat: z14.string(),
      leanMass: z14.string(),
      bloodPressure: z14.string(),
      userId: z14.string(),
      trainerId: z14.string(),
      notes: z14.string().optional(),
      image: z14.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(weighIn).values({
      ...input
    }).returning({ id: weighIn.id });
    return { res };
  }),
  getAllUser: protectedProcedure.input(z14.string()).query(async ({ ctx, input }) => {
    if (input === "") throw new TRPCError4({ code: "NOT_FOUND" });
    const res = await ctx.db.query.weighIn.findMany({
      where: eq10(weighIn.userId, input),
      orderBy: (data, { desc: desc10 }) => desc10(data.date)
    });
    return res;
  }),
  get: protectedProcedure.input(z14.number()).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.weighIn.findFirst({
      where: eq10(weighIn.id, input)
    });
    return res;
  }),
  delete: protectedProcedure.input(z14.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(weighIn).where(eq10(weighIn.id, input));
    return res;
  }),
  deleteAll: protectedProcedure.input(z14.string()).mutation(async ({ input, ctx }) => {
    if (input === "") throw new TRPCError4({ code: "NOT_FOUND" });
    const res = await ctx.db.delete(weighIn).where(eq10(weighIn.userId, input));
    return res;
  })
});

// src/server/api/routers/message.ts
import { eq as eq11 } from "drizzle-orm";
import { z as z15 } from "zod";
var createLog4 = async ({
  user: user3,
  task,
  notes,
  userId,
  objectId
}) => {
  await db.insert(log).values({
    task,
    notes,
    user: user3,
    userId,
    objectId
  });
};
var messageRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z15.object({
      userId: z15.string(),
      fromUserId: z15.string(),
      subject: z15.string(),
      message: z15.string(),
      isImportant: z15.boolean(),
      image: z15.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(message).values({
      ...input
    }).returning({ id: message.id });
    createLog4({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Create Message",
      notes: JSON.stringify(input),
      objectId: res[0]?.id
    });
    return { res };
  }),
  getAllUser: protectedProcedure.input(z15.string()).query(async ({ ctx, input }) => {
    let userId = input;
    if (input === "") {
      userId = ctx.session?.user.id;
    }
    const res = await ctx.db.query.message.findMany({
      where: eq11(message.userId, userId),
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt),
      with: {
        fromUser: true,
        user: true
      }
    });
    return res;
  }),
  getAllFromUser: protectedProcedure.input(z15.string()).query(async ({ ctx, input }) => {
    let userId = input;
    if (input === "") {
      userId = ctx.session?.user.id;
    }
    const res = await ctx.db.query.message.findMany({
      where: eq11(message.fromUserId, userId),
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt),
      with: {
        fromUser: true,
        user: true
      }
    });
    return res;
  }),
  get: protectedProcedure.input(z15.number()).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.message.findFirst({
      where: eq11(message.id, input)
    });
    return res;
  }),
  markAsViewed: protectedProcedure.input(z15.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({ isViewed: true }).where(eq11(message.id, input));
    createLog4({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark Message as Viewed",
      notes: "",
      objectId: input
    });
    return res;
  }),
  markAsRead: protectedProcedure.input(z15.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({ isRead: true }).where(eq11(message.id, input));
    createLog4({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark Message as Read",
      notes: "",
      objectId: input
    });
    return res;
  }),
  markFromUserAsViewedAndRead: protectedProcedure.input(z15.string()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({
      isViewed: true,
      isRead: true
    }).where(eq11(message.fromUserId, input));
    createLog4({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Mark Message as Read",
      notes: "",
      objectId: null
    });
    return res;
  }),
  delete: protectedProcedure.input(z15.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(message).set({ isDeleted: true }).where(eq11(message.id, input));
    return res;
  }),
  deletePermanently: protectedProcedure.input(z15.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(message).where(eq11(message.id, input));
    return res;
  })
});

// src/server/api/routers/metric.ts
import { eq as eq12 } from "drizzle-orm";
import { z as z16 } from "zod";
var createLog5 = async ({
  user: user3,
  task,
  notes,
  userId,
  objectId
}) => {
  await db.insert(log).values({
    task,
    notes,
    user: user3,
    userId,
    objectId
  });
};
var metricsRouter = createTRPCRouter({
  updateGallery: protectedProcedure.input(
    z16.object({
      image: z16.string(),
      userId: z16.string()
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
  getUserSkinfolds: protectedProcedure.input(z16.string()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.skinfold.findMany({
      where: eq12(skinfold.userId, input),
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
  getSkinfold: protectedProcedure.input(z16.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.skinfold.findFirst({
      where: eq12(skinfold.id, input),
      with: {
        bodyFat: true,
        leanMass: true,
        bodyWeight: true
      }
    });
    return res;
  }),
  deleteSkinfold: protectedProcedure.input(z16.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(skinfold).where(eq12(skinfold.id, input));
    return res;
  }),
  createSkinfold: protectedProcedure.input(
    z16.object({
      date: z16.string(),
      chin: z16.string(),
      cheek: z16.string(),
      lowerAbdominal: z16.string(),
      pectoral: z16.string(),
      biceps: z16.string(),
      triceps: z16.string(),
      subscapular: z16.string(),
      midAxillary: z16.string(),
      suprailiac: z16.string(),
      umbilical: z16.string(),
      lowerBack: z16.string(),
      quadriceps: z16.string(),
      hamstrings: z16.string(),
      medialCalf: z16.string(),
      knee: z16.string(),
      shoulder: z16.string(),
      notes: z16.string(),
      userId: z16.string(),
      bodyWeight: z16.string(),
      leanMass: z16.string(),
      bodyFat: z16.string()
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
    createLog5({
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
import { and as and5, eq as eq13 } from "drizzle-orm";
import { z as z17 } from "zod";
var tagRouter = createTRPCRouter({
  getAllTagsCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.tag.findMany({
      where: eq13(tag.userId, ctx.session.user.id),
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt)
    });
    return res;
  }),
  create: protectedProcedure.input(
    z17.object({
      name: z17.string(),
      color: z17.string(),
      icon: z17.string()
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
    z17.object({
      tagId: z17.number(),
      dailyLogId: z17.number()
    })
  ).mutation(async ({ input, ctx }) => {
    const isTagged = await ctx.db.query.tagToDailyLog.findFirst({
      where: and5(
        eq13(tagToDailyLog.tagId, input.tagId),
        eq13(tagToDailyLog.dailyLogId, input.dailyLogId)
      )
    });
    if (isTagged) {
      await ctx.db.delete(tagToDailyLog).where(
        and5(
          eq13(tagToDailyLog.tagId, input.tagId),
          eq13(tagToDailyLog.dailyLogId, input.dailyLogId)
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
  delete: protectedProcedure.input(z17.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(tag).where(eq13(tag.id, input));
    return res;
  })
});

// src/server/api/routers/goals.ts
import { eq as eq14 } from "drizzle-orm";
import { z as z18 } from "zod";
var goalsRouter = createTRPCRouter({
  getUser: protectedProcedure.input(z18.object({ userId: z18.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.goals.findMany({
      where: (goal, { eq: eq20 }) => eq20(goal.userId, input.userId)
    });
    return res;
  }),
  get: protectedProcedure.input(z18.object({ id: z18.number() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.goals.findFirst({
      where: (goal, { eq: eq20 }) => eq20(goal.id, input.id)
    });
    return res;
  }),
  create: protectedProcedure.input(
    z18.object({
      userId: z18.string(),
      title: z18.string(),
      description: z18.string(),
      state: z18.string()
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
    z18.object({
      id: z18.number(),
      title: z18.string(),
      description: z18.string(),
      state: z18.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(goals).set({
      title: input.title,
      description: input.description,
      state: input.state
    }).where(eq14(goals.id, input.id));
    return res;
  }),
  delete: protectedProcedure.input(z18.object({ id: z18.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(goals).where(eq14(goals.id, input.id));
    return res;
  })
});

// src/server/api/routers/trainer.ts
import { and as and6, eq as eq15 } from "drizzle-orm";
import { z as z19 } from "zod";
var createLog6 = async ({
  user: user3,
  task,
  notes,
  userId,
  objectId
}) => {
  await db.insert(log).values({
    task,
    notes,
    user: user3,
    userId,
    objectId
  });
};
var trainerRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.user.findMany({
      where: (user3, { eq: eq20 }) => eq20(user3.isTrainer, true),
      columns: {
        id: true,
        name: true
      }
    });
    return res;
  }),
  add: protectedProcedure.input(z19.object({ userId: z19.string(), trainerId: z19.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(userToTrainer).values({
      userId: input.userId,
      trainerId: input.trainerId
    });
    createLog6({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      objectId: null,
      task: "Add trainer to client",
      notes: JSON.stringify(input)
    });
    return res;
  }),
  delete: protectedProcedure.input(z19.object({ userId: z19.string(), trainerId: z19.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(userToTrainer).where(
      and6(
        eq15(userToTrainer.userId, input.userId),
        eq15(userToTrainer.trainerId, input.trainerId)
      )
    );
    createLog6({
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
import { TRPCError as TRPCError5 } from "@trpc/server";
import { and as and7, asc as asc2, eq as eq16 } from "drizzle-orm";
import { z as z21 } from "zod";

// src/components/supplements/store.ts
import { z as z20 } from "zod";
var updateSchema = z20.object({
  id: z20.number(),
  isPrivate: z20.boolean(),
  viewableBy: z20.string(),
  name: z20.string().min(1),
  serveSize: z20.number(),
  serveUnit: z20.string().min(1),
  caloriesWFibre: z20.number(),
  caloriesWOFibre: z20.number(),
  protein: z20.number(),
  fatTotal: z20.number(),
  totalDietaryFibre: z20.number(),
  totalSugars: z20.number(),
  starch: z20.number(),
  resistantStarch: z20.number(),
  availableCarbohydrateWithoutSugarAlcohols: z20.number(),
  availableCarbohydrateWithSugarAlcohols: z20.number(),
  addedSugars: z20.number(),
  freeSugars: z20.number(),
  moisture: z20.number(),
  nitrogen: z20.number(),
  alcohol: z20.number(),
  fructose: z20.number(),
  glucose: z20.number(),
  sucrose: z20.number(),
  maltose: z20.number(),
  lactose: z20.number(),
  galactose: z20.number(),
  maltotrios: z20.number(),
  ash: z20.number(),
  dextrin: z20.number(),
  glycerol: z20.number(),
  glycogen: z20.number(),
  inulin: z20.number(),
  erythritol: z20.number(),
  maltitol: z20.number(),
  mannitol: z20.number(),
  xylitol: z20.number(),
  maltodextrin: z20.number(),
  oligosaccharides: z20.number(),
  polydextrose: z20.number(),
  raffinose: z20.number(),
  stachyose: z20.number(),
  sorbitol: z20.number(),
  aceticAcid: z20.number(),
  citricAcid: z20.number(),
  fumaricAcid: z20.number(),
  lacticAcid: z20.number(),
  malicAcid: z20.number(),
  oxalicAcid: z20.number(),
  propionicAcid: z20.number(),
  quinicAcid: z20.number(),
  shikimicAcid: z20.number(),
  succinicAcid: z20.number(),
  tartaricAcid: z20.number(),
  aluminium: z20.number(),
  antimony: z20.number(),
  arsenic: z20.number(),
  cadmium: z20.number(),
  calcium: z20.number(),
  chromium: z20.number(),
  chloride: z20.number(),
  cobalt: z20.number(),
  copper: z20.number(),
  fluoride: z20.number(),
  iodine: z20.number(),
  iron: z20.number(),
  lead: z20.number(),
  magnesium: z20.number(),
  manganese: z20.number(),
  mercury: z20.number(),
  molybdenum: z20.number(),
  nickel: z20.number(),
  phosphorus: z20.number(),
  potassium: z20.number(),
  selenium: z20.number(),
  sodium: z20.number(),
  sulphur: z20.number(),
  tin: z20.number(),
  zinc: z20.number(),
  retinol: z20.number(),
  alphaCarotene: z20.number(),
  betaCarotene: z20.number(),
  cryptoxanthin: z20.number(),
  betaCaroteneEquivalents: z20.number(),
  vitaminARetinolEquivalents: z20.number(),
  lutein: z20.number(),
  lycopene: z20.number(),
  xanthophyl: z20.number(),
  thiamin: z20.number(),
  riboflavin: z20.number(),
  niacin: z20.number(),
  niacinDerivedFromTryptophan: z20.number(),
  niacinDerivedEquivalents: z20.number(),
  pantothenicAcid: z20.number(),
  pyridoxine: z20.number(),
  biotin: z20.number(),
  cobalamin: z20.number(),
  folateNatural: z20.number(),
  folicAcid: z20.number(),
  totalFolates: z20.number(),
  dietaryFolateEquivalents: z20.number(),
  vitaminC: z20.number(),
  cholecalciferol: z20.number(),
  ergocalciferol: z20.number(),
  hydroxyCholecalciferol: z20.number(),
  hydroxyErgocalciferol: z20.number(),
  vitaminDEquivalents: z20.number(),
  alphaTocopherol: z20.number(),
  alphaTocotrienol: z20.number(),
  betaTocopherol: z20.number(),
  betaTocotrienol: z20.number(),
  deltaTocopherol: z20.number(),
  deltaTocotrienol: z20.number(),
  gammaTocopherol: z20.number(),
  gammaTocotrienol: z20.number(),
  vitaminE: z20.number(),
  totalSaturatedFattyAcids: z20.number(),
  totalMonounsaturatedFattyAcids: z20.number(),
  totalPolyunsaturatedFattyAcids: z20.number(),
  totalLongChainOmega3FattyAcids: z20.number(),
  totalTransFattyAcids: z20.number(),
  caffeine: z20.number(),
  cholesterol: z20.number(),
  alanine: z20.number(),
  arginine: z20.number(),
  asparticAcid: z20.number(),
  cystinePlusCysteine: z20.number(),
  glutamicAcid: z20.number(),
  glycine: z20.number(),
  histidine: z20.number(),
  isoleucine: z20.number(),
  leucine: z20.number(),
  lysine: z20.number(),
  methionine: z20.number(),
  phenylalanine: z20.number(),
  proline: z20.number(),
  serine: z20.number(),
  threonine: z20.number(),
  tyrosine: z20.number(),
  tryptophan: z20.number(),
  valine: z20.number(),
  c4: z20.number(),
  c6: z20.number(),
  c8: z20.number(),
  c10: z20.number(),
  c11: z20.number(),
  c12: z20.number(),
  c13: z20.number(),
  c14: z20.number(),
  c15: z20.number(),
  c16: z20.number(),
  c17: z20.number(),
  c18: z20.number(),
  c19: z20.number(),
  c20: z20.number(),
  c21: z20.number(),
  c22: z20.number(),
  c23: z20.number(),
  c24: z20.number(),
  totalSaturatedFattyAcidsEquated: z20.number(),
  c10_1: z20.number(),
  c12_1: z20.number(),
  c14_1: z20.number(),
  c15_1: z20.number(),
  c16_1: z20.number(),
  c17_1: z20.number(),
  c18_1: z20.number(),
  c18_1w5: z20.number(),
  c18_1w6: z20.number(),
  c18_1w7: z20.number(),
  c18_1w9: z20.number(),
  c20_1: z20.number(),
  c20_1w9: z20.number(),
  c20_1w13: z20.number(),
  c20_1w11: z20.number(),
  c22_1: z20.number(),
  c22_1w9: z20.number(),
  c22_1w11: z20.number(),
  c24_1: z20.number(),
  c24_1w9: z20.number(),
  c24_1w11: z20.number(),
  c24_1w13: z20.number(),
  totalMonounsaturatedFattyAcidsEquated: z20.number(),
  c12_2: z20.number(),
  c16_2w4: z20.number(),
  c16_3: z20.number(),
  c18_2w6: z20.number(),
  c18_3w3: z20.number(),
  c18_3w4: z20.number(),
  c18_3w6: z20.number(),
  c18_4w1: z20.number(),
  c18_4w3: z20.number(),
  c20_2: z20.number(),
  c20_2w6: z20.number(),
  c20_3: z20.number(),
  c20_3w3: z20.number(),
  c20_3w6: z20.number(),
  c20_4: z20.number(),
  c20_4w3: z20.number(),
  c20_4w6: z20.number(),
  c20_5w3: z20.number(),
  c21_5w3: z20.number(),
  c22_2: z20.number(),
  c22_2w6: z20.number(),
  c22_4w6: z20.number(),
  c22_5w3: z20.number(),
  c22_5w6: z20.number(),
  c22_6w3: z20.number(),
  totalPolyunsaturatedFattyAcidsEquated: z20.number()
});
var formSchema = z20.object({
  name: z20.string().min(1),
  isPrivate: z20.boolean(),
  viewableBy: z20.string(),
  serveSize: z20.number(),
  serveUnit: z20.string().min(1),
  caloriesWFibre: z20.number(),
  caloriesWOFibre: z20.number(),
  protein: z20.number(),
  fatTotal: z20.number(),
  totalDietaryFibre: z20.number(),
  totalSugars: z20.number(),
  starch: z20.number(),
  resistantStarch: z20.number(),
  availableCarbohydrateWithoutSugarAlcohols: z20.number(),
  availableCarbohydrateWithSugarAlcohols: z20.number(),
  addedSugars: z20.number(),
  freeSugars: z20.number(),
  moisture: z20.number(),
  nitrogen: z20.number(),
  alcohol: z20.number(),
  fructose: z20.number(),
  glucose: z20.number(),
  sucrose: z20.number(),
  maltose: z20.number(),
  lactose: z20.number(),
  galactose: z20.number(),
  maltotrios: z20.number(),
  ash: z20.number(),
  dextrin: z20.number(),
  glycerol: z20.number(),
  glycogen: z20.number(),
  inulin: z20.number(),
  erythritol: z20.number(),
  maltitol: z20.number(),
  mannitol: z20.number(),
  xylitol: z20.number(),
  maltodextrin: z20.number(),
  oligosaccharides: z20.number(),
  polydextrose: z20.number(),
  raffinose: z20.number(),
  stachyose: z20.number(),
  sorbitol: z20.number(),
  aceticAcid: z20.number(),
  citricAcid: z20.number(),
  fumaricAcid: z20.number(),
  lacticAcid: z20.number(),
  malicAcid: z20.number(),
  oxalicAcid: z20.number(),
  propionicAcid: z20.number(),
  quinicAcid: z20.number(),
  shikimicAcid: z20.number(),
  succinicAcid: z20.number(),
  tartaricAcid: z20.number(),
  aluminium: z20.number(),
  antimony: z20.number(),
  arsenic: z20.number(),
  cadmium: z20.number(),
  calcium: z20.number(),
  chromium: z20.number(),
  chloride: z20.number(),
  cobalt: z20.number(),
  copper: z20.number(),
  fluoride: z20.number(),
  iodine: z20.number(),
  iron: z20.number(),
  lead: z20.number(),
  magnesium: z20.number(),
  manganese: z20.number(),
  mercury: z20.number(),
  molybdenum: z20.number(),
  nickel: z20.number(),
  phosphorus: z20.number(),
  potassium: z20.number(),
  selenium: z20.number(),
  sodium: z20.number(),
  sulphur: z20.number(),
  tin: z20.number(),
  zinc: z20.number(),
  retinol: z20.number(),
  alphaCarotene: z20.number(),
  betaCarotene: z20.number(),
  cryptoxanthin: z20.number(),
  betaCaroteneEquivalents: z20.number(),
  vitaminARetinolEquivalents: z20.number(),
  lutein: z20.number(),
  lycopene: z20.number(),
  xanthophyl: z20.number(),
  thiamin: z20.number(),
  riboflavin: z20.number(),
  niacin: z20.number(),
  niacinDerivedFromTryptophan: z20.number(),
  niacinDerivedEquivalents: z20.number(),
  pantothenicAcid: z20.number(),
  pyridoxine: z20.number(),
  biotin: z20.number(),
  cobalamin: z20.number(),
  folateNatural: z20.number(),
  folicAcid: z20.number(),
  totalFolates: z20.number(),
  dietaryFolateEquivalents: z20.number(),
  vitaminC: z20.number(),
  cholecalciferol: z20.number(),
  ergocalciferol: z20.number(),
  hydroxyCholecalciferol: z20.number(),
  hydroxyErgocalciferol: z20.number(),
  vitaminDEquivalents: z20.number(),
  alphaTocopherol: z20.number(),
  alphaTocotrienol: z20.number(),
  betaTocopherol: z20.number(),
  betaTocotrienol: z20.number(),
  deltaTocopherol: z20.number(),
  deltaTocotrienol: z20.number(),
  gammaTocopherol: z20.number(),
  gammaTocotrienol: z20.number(),
  vitaminE: z20.number(),
  totalSaturatedFattyAcids: z20.number(),
  totalMonounsaturatedFattyAcids: z20.number(),
  totalPolyunsaturatedFattyAcids: z20.number(),
  totalLongChainOmega3FattyAcids: z20.number(),
  totalTransFattyAcids: z20.number(),
  caffeine: z20.number(),
  cholesterol: z20.number(),
  alanine: z20.number(),
  arginine: z20.number(),
  asparticAcid: z20.number(),
  cystinePlusCysteine: z20.number(),
  glutamicAcid: z20.number(),
  glycine: z20.number(),
  histidine: z20.number(),
  isoleucine: z20.number(),
  leucine: z20.number(),
  lysine: z20.number(),
  methionine: z20.number(),
  phenylalanine: z20.number(),
  proline: z20.number(),
  serine: z20.number(),
  threonine: z20.number(),
  tyrosine: z20.number(),
  tryptophan: z20.number(),
  valine: z20.number(),
  c4: z20.number(),
  c6: z20.number(),
  c8: z20.number(),
  c10: z20.number(),
  c11: z20.number(),
  c12: z20.number(),
  c13: z20.number(),
  c14: z20.number(),
  c15: z20.number(),
  c16: z20.number(),
  c17: z20.number(),
  c18: z20.number(),
  c19: z20.number(),
  c20: z20.number(),
  c21: z20.number(),
  c22: z20.number(),
  c23: z20.number(),
  c24: z20.number(),
  totalSaturatedFattyAcidsEquated: z20.number(),
  c10_1: z20.number(),
  c12_1: z20.number(),
  c14_1: z20.number(),
  c15_1: z20.number(),
  c16_1: z20.number(),
  c17_1: z20.number(),
  c18_1: z20.number(),
  c18_1w5: z20.number(),
  c18_1w6: z20.number(),
  c18_1w7: z20.number(),
  c18_1w9: z20.number(),
  c20_1: z20.number(),
  c20_1w9: z20.number(),
  c20_1w13: z20.number(),
  c20_1w11: z20.number(),
  c22_1: z20.number(),
  c22_1w9: z20.number(),
  c22_1w11: z20.number(),
  c24_1: z20.number(),
  c24_1w9: z20.number(),
  c24_1w11: z20.number(),
  c24_1w13: z20.number(),
  totalMonounsaturatedFattyAcidsEquated: z20.number(),
  c12_2: z20.number(),
  c16_2w4: z20.number(),
  c16_3: z20.number(),
  c18_2w6: z20.number(),
  c18_3w3: z20.number(),
  c18_3w4: z20.number(),
  c18_3w6: z20.number(),
  c18_4w1: z20.number(),
  c18_4w3: z20.number(),
  c20_2: z20.number(),
  c20_2w6: z20.number(),
  c20_3: z20.number(),
  c20_3w3: z20.number(),
  c20_3w6: z20.number(),
  c20_4: z20.number(),
  c20_4w3: z20.number(),
  c20_4w6: z20.number(),
  c20_5w3: z20.number(),
  c21_5w3: z20.number(),
  c22_2: z20.number(),
  c22_2w6: z20.number(),
  c22_4w6: z20.number(),
  c22_5w3: z20.number(),
  c22_5w6: z20.number(),
  c22_6w3: z20.number(),
  totalPolyunsaturatedFattyAcidsEquated: z20.number()
});

// src/server/api/routers/supplements.ts
var createLog7 = async ({
  user: user3,
  task,
  notes,
  userId,
  objectId
}) => {
  await db.insert(log).values({
    task,
    notes,
    user: user3,
    userId,
    objectId
  });
};
var supplementsRouter = createTRPCRouter({
  delete: protectedProcedure.input(z21.object({ id: z21.number() })).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(ingredient).set({
      deletedAt: /* @__PURE__ */ new Date()
    }).where(eq16(ingredient.id, input.id));
    return res;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    const res = await ctx.db.query.ingredient.findMany({
      where: (ingredient2, { isNull, and: and9, eq: eq20 }) => and9(
        isNull(ingredient2.hiddenAt),
        isNull(ingredient2.deletedAt),
        eq20(ingredient2.isSupplement, true),
        eq20(ingredient2.isUserCreated, false)
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
  getSupplementFromDailyLog: protectedProcedure.input(z21.object({ id: z21.number() })).query(async ({ input, ctx }) => {
    if (input.id === -1) return false;
    const res = await ctx.db.query.dailySupplement.findFirst({
      where: (supplement, { eq: eq20 }) => eq20(supplement.id, input.id),
      with: {
        supplement: true
      }
    });
    return res ? true : false;
  }),
  getFullSupplement: protectedProcedure.input(z21.object({ id: z21.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.ingredient.findFirst({
      where: (ingredient2, { eq: eq20 }) => eq20(ingredient2.id, input.id),
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
  getSupplement: protectedProcedure.input(z21.object({ id: z21.number() })).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.ingredient.findFirst({
      where: (ingredient2, { eq: eq20 }) => eq20(ingredient2.id, input.id),
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
    z21.object({
      time: z21.string(),
      userId: z21.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(supplementStack).values({
      userId: input.userId,
      time: input.time
    }).returning({ id: supplementStack.id });
    return res;
  }),
  getSuppFromPlan: protectedProcedure.input(z21.object({ id: z21.number() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.supplementToSupplementStack.findFirst({
      where: (supplement, { eq: eq20 }) => eq20(supplement.id, input.id),
      with: {
        supplement: true
      }
    });
    return res;
  }),
  addToUser: protectedProcedure.input(
    z21.object({
      suppId: z21.number(),
      userId: z21.string(),
      time: z21.string(),
      size: z21.string(),
      unit: z21.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const userTimes = await ctx.db.query.supplementStack.findMany({
      where: (stack, { eq: eq20 }) => eq20(stack.userId, input.userId)
    });
    let timeId = userTimes.find((stack) => stack.time === input.time)?.id || null;
    if (!timeId) {
      const res = await ctx.db.insert(supplementStack).values({
        userId: input.userId,
        time: input.time
      }).returning({ id: supplementStack.id });
      if (!res || res[0]?.id === void 0)
        throw new TRPCError5({ code: "BAD_REQUEST" });
      timeId = res[0]?.id;
    }
    await ctx.db.insert(supplementToSupplementStack).values({
      supplementId: input.suppId,
      supplementStackId: timeId,
      size: input.size,
      unit: input.unit
    });
    const notif = await ctx.db.query.notification.findMany({
      where: and7(
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
    z21.object({
      suppId: z21.number(),
      date: z21.string(),
      time: z21.string(),
      amount: z21.string(),
      unit: z21.string(),
      stackId: z21.string()
    })
  ).mutation(async ({ input, ctx }) => {
    const log2 = await ctx.db.query.dailyLog.findFirst({
      where: and7(
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
    createLog7({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "Log Supplement",
      notes: JSON.stringify(input),
      objectId: logId
    });
    if (!logId) throw new TRPCError5({ code: "NOT_FOUND" });
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
  unLogSupplement: protectedProcedure.input(z21.object({ id: z21.number() })).mutation(async ({ input, ctx }) => {
    createLog7({
      user: ctx.session.user.name,
      userId: ctx.session.user.id,
      task: "unLog Supplement",
      notes: JSON.stringify(input),
      objectId: null
    });
    await ctx.db.delete(dailySupplement).where(eq16(dailySupplement.id, input.id));
    return true;
  }),
  deleteFromUser: protectedProcedure.input(z21.object({ suppId: z21.number(), suppStackId: z21.number() })).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(supplementToSupplementStack).where(
      and7(
        eq16(supplementToSupplementStack.supplementId, input.suppId),
        eq16(
          supplementToSupplementStack.supplementStackId,
          input.suppStackId
        )
      )
    );
    return true;
  }),
  deleteTime: protectedProcedure.input(z21.object({ id: z21.number() })).mutation(async ({ input, ctx }) => {
    await ctx.db.delete(supplementStack).where(eq16(supplementStack.id, input.id));
    return true;
  }),
  userCreate: protectedProcedure.input(
    z21.object({
      name: z21.string(),
      serveSize: z21.number(),
      serveUnit: z21.string(),
      isPrivate: z21.boolean(),
      stackId: z21.number(),
      viewableBy: z21.string().optional(),
      userId: z21.string()
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
    if (!suppId) throw new TRPCError5({ code: "NOT_FOUND" });
    createLog7({
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

// src/server/api/routers/trainer-notes.ts
import { eq as eq17 } from "drizzle-orm";
import { z as z22 } from "zod";
var trainerNotesRouter = createTRPCRouter({
  getAllUser: protectedProcedure.input(z22.object({ userId: z22.string() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.trainerNotes.findMany({
      where: (note, { eq: eq20 }) => eq20(note.userId, input.userId),
      with: {
        trainer: true
      }
    });
    return res;
  }),
  get: protectedProcedure.input(z22.object({ id: z22.number() })).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.trainerNotes.findFirst({
      where: (note, { eq: eq20 }) => eq20(note.id, input.id),
      with: {
        trainer: true
      }
    });
    return res;
  }),
  create: protectedProcedure.input(
    z22.object({
      userId: z22.string(),
      title: z22.string(),
      description: z22.string(),
      state: z22.string()
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
    z22.object({
      id: z22.number(),
      title: z22.string(),
      description: z22.string(),
      state: z22.string()
    })
  ).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(trainerNotes).set({
      title: input.title,
      description: input.description,
      state: input.state
    }).where(eq17(trainerNotes.id, input.id));
    return res;
  }),
  delete: protectedProcedure.input(z22.object({ id: z22.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(trainerNotes).where(eq17(trainerNotes.id, input.id));
    return res;
  })
});

// src/server/api/routers/userCatagories.tsx
import { and as and8, eq as eq18 } from "drizzle-orm";
import { z as z23 } from "zod";
var userCatagoriesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.userCategory.findMany();
    return res;
  }),
  create: protectedProcedure.input(z23.string()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(userCategory).values({
      name: input
    });
    return res;
  }),
  update: protectedProcedure.input(z23.object({ id: z23.number(), name: z23.string() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.update(userCategory).set({
      name: input.name
    }).where(eq18(userCategory.id, input.id));
    return res;
  }),
  delete: protectedProcedure.input(z23.number()).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(userCategory).where(eq18(userCategory.id, input));
    return res;
  }),
  addToUser: protectedProcedure.input(z23.object({ userId: z23.string(), categoryId: z23.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.insert(userToUserCategory).values({
      userId: input.userId,
      categoryId: input.categoryId
    });
    return res;
  }),
  removeFromUser: protectedProcedure.input(z23.object({ userId: z23.string(), categoryId: z23.number() })).mutation(async ({ ctx, input }) => {
    const res = await ctx.db.delete(userToUserCategory).where(
      and8(
        eq18(userToUserCategory.userId, input.userId),
        eq18(userToUserCategory.categoryId, input.categoryId)
      )
    );
    return res;
  })
});

// src/server/api/routers/notification.ts
import { eq as eq19 } from "drizzle-orm";
import { z as z24 } from "zod";
var notificationRouter = createTRPCRouter({
  create: protectedProcedure.input(
    z24.object({
      userId: z24.string(),
      code: z24.string(),
      title: z24.string(),
      description: z24.string().optional(),
      notes: z24.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.insert(notification).values({
      userId: input.userId,
      code: input.code,
      title: input.title,
      description: input.description,
      notes: input.notes
    });
    return res;
  }),
  get: protectedProcedure.input(z24.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.notification.findFirst({
      where: eq19(notification.id, input)
    });
    return res;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.notification.findMany({
      where: eq19(notification.isRead, false),
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt)
    });
    return res;
  }),
  getAllUser: protectedProcedure.input(z24.string()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.notification.findMany({
      where: eq19(notification.userId, input),
      orderBy: (data, { desc: desc10 }) => desc10(data.createdAt)
    });
    return res;
  }),
  delete: protectedProcedure.input(z24.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.delete(notification).where(eq19(notification.id, input));
    return res;
  }),
  markAsRead: protectedProcedure.input(z24.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(notification).set({
      isRead: true
    }).where(eq19(notification.id, input));
    return res;
  }),
  markAsViewed: protectedProcedure.input(z24.number()).mutation(async ({ input, ctx }) => {
    const res = await ctx.db.update(notification).set({
      isViewed: true,
      isRead: true
    }).where(eq19(notification.id, input));
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
  notifications: notificationRouter
});
var createCaller = createCallerFactory(appRouter);
export {
  appRouter,
  createCaller
};
