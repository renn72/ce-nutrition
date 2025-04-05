import { relations } from "drizzle-orm/relations";
import { user, ingredient, ingredientAdditionOne, ingredientAdditionThree, ingredientAdditionTwo, groceryStore, ingredientToGroceryStore, meal, plan, recipe, mealToRecipe, vegeStack, mealToVegeStack, notification, planToMeal, recipeToIngredient, userPlan, userMeal, account, role, session, userToTrainer, weighIn, userSettings, skinfold, bodyFat, bodyWeight, leanMass, message, tag, dailyLog, userIngredient, dailyMeal, userRecipe, poopLog, waterLog, tagToDailyLog } from "./schema";

export const ingredientRelations = relations(ingredient, ({one, many}) => ({
	user: one(user, {
		fields: [ingredient.userId],
		references: [user.id]
	}),
	ingredientAdditionOnes: many(ingredientAdditionOne),
	ingredientAdditionThrees: many(ingredientAdditionThree),
	ingredientAdditionTwos: many(ingredientAdditionTwo),
	ingredientToGroceryStores: many(ingredientToGroceryStore),
	recipeToIngredients_alternateId: many(recipeToIngredient, {
		relationName: "recipeToIngredient_alternateId_ingredient_id"
	}),
	recipeToIngredients_ingredientId: many(recipeToIngredient, {
		relationName: "recipeToIngredient_ingredientId_ingredient_id"
	}),
	userIngredients_alternateId: many(userIngredient, {
		relationName: "userIngredient_alternateId_ingredient_id"
	}),
	userIngredients_ingredientId: many(userIngredient, {
		relationName: "userIngredient_ingredientId_ingredient_id"
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	ingredients: many(ingredient),
	meals: many(meal),
	notifications: many(notification),
	plans: many(plan),
	recipes: many(recipe),
	userPlans_userId: many(userPlan, {
		relationName: "userPlan_userId_user_id"
	}),
	userPlans_creatorId: many(userPlan, {
		relationName: "userPlan_creatorId_user_id"
	}),
	accounts: many(account),
	roles: many(role),
	sessions: many(session),
	userToTrainers_trainerId: many(userToTrainer, {
		relationName: "userToTrainer_trainerId_user_id"
	}),
	userToTrainers_userId: many(userToTrainer, {
		relationName: "userToTrainer_userId_user_id"
	}),
	weighIns_trainerId: many(weighIn, {
		relationName: "weighIn_trainerId_user_id"
	}),
	weighIns_userId: many(weighIn, {
		relationName: "weighIn_userId_user_id"
	}),
	userSettings: many(userSettings),
	skinfolds: many(skinfold),
	bodyFats: many(bodyFat),
	bodyWeights: many(bodyWeight),
	leanMasses: many(leanMass),
	messages_fromUserId: many(message, {
		relationName: "message_fromUserId_user_id"
	}),
	messages_userId: many(message, {
		relationName: "message_userId_user_id"
	}),
	tags: many(tag),
	dailyLogs: many(dailyLog),
}));

export const ingredientAdditionOneRelations = relations(ingredientAdditionOne, ({one}) => ({
	ingredient: one(ingredient, {
		fields: [ingredientAdditionOne.ingredientId],
		references: [ingredient.id]
	}),
}));

export const ingredientAdditionThreeRelations = relations(ingredientAdditionThree, ({one}) => ({
	ingredient: one(ingredient, {
		fields: [ingredientAdditionThree.ingredientId],
		references: [ingredient.id]
	}),
}));

export const ingredientAdditionTwoRelations = relations(ingredientAdditionTwo, ({one}) => ({
	ingredient: one(ingredient, {
		fields: [ingredientAdditionTwo.ingredientId],
		references: [ingredient.id]
	}),
}));

export const ingredientToGroceryStoreRelations = relations(ingredientToGroceryStore, ({one}) => ({
	groceryStore: one(groceryStore, {
		fields: [ingredientToGroceryStore.groceryStoreId],
		references: [groceryStore.id]
	}),
	ingredient: one(ingredient, {
		fields: [ingredientToGroceryStore.ingredientId],
		references: [ingredient.id]
	}),
}));

export const groceryStoreRelations = relations(groceryStore, ({many}) => ({
	ingredientToGroceryStores: many(ingredientToGroceryStore),
}));

export const mealRelations = relations(meal, ({one, many}) => ({
	user: one(user, {
		fields: [meal.creatorId],
		references: [user.id]
	}),
	plan: one(plan, {
		fields: [meal.planId],
		references: [plan.id]
	}),
	mealToRecipes: many(mealToRecipe),
	mealToVegeStacks: many(mealToVegeStack),
	planToMeals: many(planToMeal),
}));

export const planRelations = relations(plan, ({one, many}) => ({
	meals: many(meal),
	user: one(user, {
		fields: [plan.creatorId],
		references: [user.id]
	}),
	planToMeals: many(planToMeal),
}));

export const mealToRecipeRelations = relations(mealToRecipe, ({one}) => ({
	recipe: one(recipe, {
		fields: [mealToRecipe.recipeId],
		references: [recipe.id]
	}),
	meal: one(meal, {
		fields: [mealToRecipe.mealId],
		references: [meal.id]
	}),
}));

export const recipeRelations = relations(recipe, ({one, many}) => ({
	mealToRecipes: many(mealToRecipe),
	user: one(user, {
		fields: [recipe.creatorId],
		references: [user.id]
	}),
	recipeToIngredients: many(recipeToIngredient),
}));

export const mealToVegeStackRelations = relations(mealToVegeStack, ({one}) => ({
	vegeStack: one(vegeStack, {
		fields: [mealToVegeStack.vegeStackId],
		references: [vegeStack.id]
	}),
	meal: one(meal, {
		fields: [mealToVegeStack.mealId],
		references: [meal.id]
	}),
}));

export const vegeStackRelations = relations(vegeStack, ({many}) => ({
	mealToVegeStacks: many(mealToVegeStack),
}));

export const notificationRelations = relations(notification, ({one}) => ({
	user: one(user, {
		fields: [notification.userId],
		references: [user.id]
	}),
}));

export const planToMealRelations = relations(planToMeal, ({one}) => ({
	meal: one(meal, {
		fields: [planToMeal.mealId],
		references: [meal.id]
	}),
	plan: one(plan, {
		fields: [planToMeal.planId],
		references: [plan.id]
	}),
}));

export const recipeToIngredientRelations = relations(recipeToIngredient, ({one}) => ({
	ingredient_alternateId: one(ingredient, {
		fields: [recipeToIngredient.alternateId],
		references: [ingredient.id],
		relationName: "recipeToIngredient_alternateId_ingredient_id"
	}),
	ingredient_ingredientId: one(ingredient, {
		fields: [recipeToIngredient.ingredientId],
		references: [ingredient.id],
		relationName: "recipeToIngredient_ingredientId_ingredient_id"
	}),
	recipe: one(recipe, {
		fields: [recipeToIngredient.recipeId],
		references: [recipe.id]
	}),
}));

export const userMealRelations = relations(userMeal, ({one}) => ({
	userPlan: one(userPlan, {
		fields: [userMeal.userPlanId],
		references: [userPlan.id]
	}),
}));

export const userPlanRelations = relations(userPlan, ({one, many}) => ({
	userMeals: many(userMeal),
	user_userId: one(user, {
		fields: [userPlan.userId],
		references: [user.id],
		relationName: "userPlan_userId_user_id"
	}),
	user_creatorId: one(user, {
		fields: [userPlan.creatorId],
		references: [user.id],
		relationName: "userPlan_creatorId_user_id"
	}),
	userIngredients: many(userIngredient),
	userRecipes: many(userRecipe),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const roleRelations = relations(role, ({one}) => ({
	user: one(user, {
		fields: [role.userId],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userToTrainerRelations = relations(userToTrainer, ({one}) => ({
	user_trainerId: one(user, {
		fields: [userToTrainer.trainerId],
		references: [user.id],
		relationName: "userToTrainer_trainerId_user_id"
	}),
	user_userId: one(user, {
		fields: [userToTrainer.userId],
		references: [user.id],
		relationName: "userToTrainer_userId_user_id"
	}),
}));

export const weighInRelations = relations(weighIn, ({one}) => ({
	user_trainerId: one(user, {
		fields: [weighIn.trainerId],
		references: [user.id],
		relationName: "weighIn_trainerId_user_id"
	}),
	user_userId: one(user, {
		fields: [weighIn.userId],
		references: [user.id],
		relationName: "weighIn_userId_user_id"
	}),
}));

export const userSettingsRelations = relations(userSettings, ({one}) => ({
	user: one(user, {
		fields: [userSettings.userId],
		references: [user.id]
	}),
}));

export const skinfoldRelations = relations(skinfold, ({one, many}) => ({
	user: one(user, {
		fields: [skinfold.userId],
		references: [user.id]
	}),
	bodyFats: many(bodyFat),
	bodyWeights: many(bodyWeight),
	leanMasses: many(leanMass),
}));

export const bodyFatRelations = relations(bodyFat, ({one}) => ({
	skinfold: one(skinfold, {
		fields: [bodyFat.skinfoldId],
		references: [skinfold.id]
	}),
	user: one(user, {
		fields: [bodyFat.userId],
		references: [user.id]
	}),
}));

export const bodyWeightRelations = relations(bodyWeight, ({one}) => ({
	skinfold: one(skinfold, {
		fields: [bodyWeight.skinfoldId],
		references: [skinfold.id]
	}),
	user: one(user, {
		fields: [bodyWeight.userId],
		references: [user.id]
	}),
}));

export const leanMassRelations = relations(leanMass, ({one}) => ({
	skinfold: one(skinfold, {
		fields: [leanMass.skinfoldId],
		references: [skinfold.id]
	}),
	user: one(user, {
		fields: [leanMass.userId],
		references: [user.id]
	}),
}));

export const messageRelations = relations(message, ({one}) => ({
	user_fromUserId: one(user, {
		fields: [message.fromUserId],
		references: [user.id],
		relationName: "message_fromUserId_user_id"
	}),
	user_userId: one(user, {
		fields: [message.userId],
		references: [user.id],
		relationName: "message_userId_user_id"
	}),
}));

export const tagRelations = relations(tag, ({one, many}) => ({
	user: one(user, {
		fields: [tag.userId],
		references: [user.id]
	}),
	tagToDailyLogs: many(tagToDailyLog),
}));

export const dailyLogRelations = relations(dailyLog, ({one, many}) => ({
	user: one(user, {
		fields: [dailyLog.userId],
		references: [user.id]
	}),
	userIngredients: many(userIngredient),
	userRecipes: many(userRecipe),
	dailyMeals: many(dailyMeal),
	poopLogs: many(poopLog),
	waterLogs: many(waterLog),
	tagToDailyLogs: many(tagToDailyLog),
}));

export const userIngredientRelations = relations(userIngredient, ({one}) => ({
	dailyLog: one(dailyLog, {
		fields: [userIngredient.dailyLogId],
		references: [dailyLog.id]
	}),
	ingredient_alternateId: one(ingredient, {
		fields: [userIngredient.alternateId],
		references: [ingredient.id],
		relationName: "userIngredient_alternateId_ingredient_id"
	}),
	dailyMeal: one(dailyMeal, {
		fields: [userIngredient.dailyMealId],
		references: [dailyMeal.id]
	}),
	userPlan: one(userPlan, {
		fields: [userIngredient.userPlanId],
		references: [userPlan.id]
	}),
	ingredient_ingredientId: one(ingredient, {
		fields: [userIngredient.ingredientId],
		references: [ingredient.id],
		relationName: "userIngredient_ingredientId_ingredient_id"
	}),
}));

export const dailyMealRelations = relations(dailyMeal, ({one, many}) => ({
	userIngredients: many(userIngredient),
	userRecipes: many(userRecipe),
	dailyLog: one(dailyLog, {
		fields: [dailyMeal.dailyLogId],
		references: [dailyLog.id]
	}),
}));

export const userRecipeRelations = relations(userRecipe, ({one}) => ({
	dailyLog: one(dailyLog, {
		fields: [userRecipe.dailyLogId],
		references: [dailyLog.id]
	}),
	dailyMeal: one(dailyMeal, {
		fields: [userRecipe.dailyMealId],
		references: [dailyMeal.id]
	}),
	userPlan: one(userPlan, {
		fields: [userRecipe.userPlanId],
		references: [userPlan.id]
	}),
}));

export const poopLogRelations = relations(poopLog, ({one}) => ({
	dailyLog: one(dailyLog, {
		fields: [poopLog.dailyLogId],
		references: [dailyLog.id]
	}),
}));

export const waterLogRelations = relations(waterLog, ({one}) => ({
	dailyLog: one(dailyLog, {
		fields: [waterLog.dailyLogId],
		references: [dailyLog.id]
	}),
}));

export const tagToDailyLogRelations = relations(tagToDailyLog, ({one}) => ({
	dailyLog: one(dailyLog, {
		fields: [tagToDailyLog.dailyLogId],
		references: [dailyLog.id]
	}),
	tag: one(tag, {
		fields: [tagToDailyLog.tagId],
		references: [tag.id]
	}),
}));