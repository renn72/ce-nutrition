import { relations } from "drizzle-orm/relations";
import { ceNuUser, ceNuIngredient, ceNuIngredientAdditionOne, ceNuIngredientAdditionThree, ceNuIngredientAdditionTwo, ceNuGroceryStore, ceNuIngredientToGroceryStore, ceNuMeal, ceNuPlan, ceNuRecipe, ceNuMealToRecipe, ceNuVegeStack, ceNuMealToVegeStack, ceNuNotification, ceNuPlanToMeal, ceNuRecipeToIngredient, ceNuDailyLog, ceNuUserIngredient, ceNuDailyMeal, ceNuUserPlan, ceNuUserMeal, ceNuUserRecipe, ceNuAccount, ceNuPoopLog, ceNuRole, ceNuSession, ceNuUserToTrainer, ceNuWaterLog, ceNuWeighIn, ceNuUserSettings, ceNuSkinfold, ceNuBodyFat, ceNuBodyWeight, ceNuLeanMass, ceNuMessage, ceNuTag, ceNuTagToDailyLog } from "./schema";

export const ceNuIngredientRelations = relations(ceNuIngredient, ({one, many}) => ({
	ceNuUser: one(ceNuUser, {
		fields: [ceNuIngredient.userId],
		references: [ceNuUser.id]
	}),
	ceNuIngredientAdditionOnes: many(ceNuIngredientAdditionOne),
	ceNuIngredientAdditionThrees: many(ceNuIngredientAdditionThree),
	ceNuIngredientAdditionTwos: many(ceNuIngredientAdditionTwo),
	ceNuIngredientToGroceryStores: many(ceNuIngredientToGroceryStore),
	ceNuRecipeToIngredients_alternateId: many(ceNuRecipeToIngredient, {
		relationName: "ceNuRecipeToIngredient_alternateId_ceNuIngredient_id"
	}),
	ceNuRecipeToIngredients_ingredientId: many(ceNuRecipeToIngredient, {
		relationName: "ceNuRecipeToIngredient_ingredientId_ceNuIngredient_id"
	}),
	ceNuUserIngredients_alternateId: many(ceNuUserIngredient, {
		relationName: "ceNuUserIngredient_alternateId_ceNuIngredient_id"
	}),
	ceNuUserIngredients_ingredientId: many(ceNuUserIngredient, {
		relationName: "ceNuUserIngredient_ingredientId_ceNuIngredient_id"
	}),
}));

export const ceNuUserRelations = relations(ceNuUser, ({many}) => ({
	ceNuIngredients: many(ceNuIngredient),
	ceNuMeals: many(ceNuMeal),
	ceNuNotifications: many(ceNuNotification),
	ceNuPlans: many(ceNuPlan),
	ceNuRecipes: many(ceNuRecipe),
	ceNuUserPlans_userId: many(ceNuUserPlan, {
		relationName: "ceNuUserPlan_userId_ceNuUser_id"
	}),
	ceNuUserPlans_creatorId: many(ceNuUserPlan, {
		relationName: "ceNuUserPlan_creatorId_ceNuUser_id"
	}),
	ceNuAccounts: many(ceNuAccount),
	ceNuRoles: many(ceNuRole),
	ceNuSessions: many(ceNuSession),
	ceNuUserToTrainers_trainerId: many(ceNuUserToTrainer, {
		relationName: "ceNuUserToTrainer_trainerId_ceNuUser_id"
	}),
	ceNuUserToTrainers_userId: many(ceNuUserToTrainer, {
		relationName: "ceNuUserToTrainer_userId_ceNuUser_id"
	}),
	ceNuWeighIns_trainerId: many(ceNuWeighIn, {
		relationName: "ceNuWeighIn_trainerId_ceNuUser_id"
	}),
	ceNuWeighIns_userId: many(ceNuWeighIn, {
		relationName: "ceNuWeighIn_userId_ceNuUser_id"
	}),
	ceNuDailyLogs: many(ceNuDailyLog),
	ceNuUserSettings: many(ceNuUserSettings),
	ceNuSkinfolds: many(ceNuSkinfold),
	ceNuBodyFats: many(ceNuBodyFat),
	ceNuBodyWeights: many(ceNuBodyWeight),
	ceNuLeanMasses: many(ceNuLeanMass),
	ceNuMessages_fromUserId: many(ceNuMessage, {
		relationName: "ceNuMessage_fromUserId_ceNuUser_id"
	}),
	ceNuMessages_userId: many(ceNuMessage, {
		relationName: "ceNuMessage_userId_ceNuUser_id"
	}),
	ceNuTags: many(ceNuTag),
}));

export const ceNuIngredientAdditionOneRelations = relations(ceNuIngredientAdditionOne, ({one}) => ({
	ceNuIngredient: one(ceNuIngredient, {
		fields: [ceNuIngredientAdditionOne.ingredientId],
		references: [ceNuIngredient.id]
	}),
}));

export const ceNuIngredientAdditionThreeRelations = relations(ceNuIngredientAdditionThree, ({one}) => ({
	ceNuIngredient: one(ceNuIngredient, {
		fields: [ceNuIngredientAdditionThree.ingredientId],
		references: [ceNuIngredient.id]
	}),
}));

export const ceNuIngredientAdditionTwoRelations = relations(ceNuIngredientAdditionTwo, ({one}) => ({
	ceNuIngredient: one(ceNuIngredient, {
		fields: [ceNuIngredientAdditionTwo.ingredientId],
		references: [ceNuIngredient.id]
	}),
}));

export const ceNuIngredientToGroceryStoreRelations = relations(ceNuIngredientToGroceryStore, ({one}) => ({
	ceNuGroceryStore: one(ceNuGroceryStore, {
		fields: [ceNuIngredientToGroceryStore.groceryStoreId],
		references: [ceNuGroceryStore.id]
	}),
	ceNuIngredient: one(ceNuIngredient, {
		fields: [ceNuIngredientToGroceryStore.ingredientId],
		references: [ceNuIngredient.id]
	}),
}));

export const ceNuGroceryStoreRelations = relations(ceNuGroceryStore, ({many}) => ({
	ceNuIngredientToGroceryStores: many(ceNuIngredientToGroceryStore),
}));

export const ceNuMealRelations = relations(ceNuMeal, ({one, many}) => ({
	ceNuUser: one(ceNuUser, {
		fields: [ceNuMeal.creatorId],
		references: [ceNuUser.id]
	}),
	ceNuPlan: one(ceNuPlan, {
		fields: [ceNuMeal.planId],
		references: [ceNuPlan.id]
	}),
	ceNuMealToRecipes: many(ceNuMealToRecipe),
	ceNuMealToVegeStacks: many(ceNuMealToVegeStack),
	ceNuPlanToMeals: many(ceNuPlanToMeal),
}));

export const ceNuPlanRelations = relations(ceNuPlan, ({one, many}) => ({
	ceNuMeals: many(ceNuMeal),
	ceNuUser: one(ceNuUser, {
		fields: [ceNuPlan.creatorId],
		references: [ceNuUser.id]
	}),
	ceNuPlanToMeals: many(ceNuPlanToMeal),
}));

export const ceNuMealToRecipeRelations = relations(ceNuMealToRecipe, ({one}) => ({
	ceNuRecipe: one(ceNuRecipe, {
		fields: [ceNuMealToRecipe.recipeId],
		references: [ceNuRecipe.id]
	}),
	ceNuMeal: one(ceNuMeal, {
		fields: [ceNuMealToRecipe.mealId],
		references: [ceNuMeal.id]
	}),
}));

export const ceNuRecipeRelations = relations(ceNuRecipe, ({one, many}) => ({
	ceNuMealToRecipes: many(ceNuMealToRecipe),
	ceNuUser: one(ceNuUser, {
		fields: [ceNuRecipe.creatorId],
		references: [ceNuUser.id]
	}),
	ceNuRecipeToIngredients: many(ceNuRecipeToIngredient),
}));

export const ceNuMealToVegeStackRelations = relations(ceNuMealToVegeStack, ({one}) => ({
	ceNuVegeStack: one(ceNuVegeStack, {
		fields: [ceNuMealToVegeStack.vegeStackId],
		references: [ceNuVegeStack.id]
	}),
	ceNuMeal: one(ceNuMeal, {
		fields: [ceNuMealToVegeStack.mealId],
		references: [ceNuMeal.id]
	}),
}));

export const ceNuVegeStackRelations = relations(ceNuVegeStack, ({many}) => ({
	ceNuMealToVegeStacks: many(ceNuMealToVegeStack),
}));

export const ceNuNotificationRelations = relations(ceNuNotification, ({one}) => ({
	ceNuUser: one(ceNuUser, {
		fields: [ceNuNotification.userId],
		references: [ceNuUser.id]
	}),
}));

export const ceNuPlanToMealRelations = relations(ceNuPlanToMeal, ({one}) => ({
	ceNuMeal: one(ceNuMeal, {
		fields: [ceNuPlanToMeal.mealId],
		references: [ceNuMeal.id]
	}),
	ceNuPlan: one(ceNuPlan, {
		fields: [ceNuPlanToMeal.planId],
		references: [ceNuPlan.id]
	}),
}));

export const ceNuRecipeToIngredientRelations = relations(ceNuRecipeToIngredient, ({one}) => ({
	ceNuIngredient_alternateId: one(ceNuIngredient, {
		fields: [ceNuRecipeToIngredient.alternateId],
		references: [ceNuIngredient.id],
		relationName: "ceNuRecipeToIngredient_alternateId_ceNuIngredient_id"
	}),
	ceNuIngredient_ingredientId: one(ceNuIngredient, {
		fields: [ceNuRecipeToIngredient.ingredientId],
		references: [ceNuIngredient.id],
		relationName: "ceNuRecipeToIngredient_ingredientId_ceNuIngredient_id"
	}),
	ceNuRecipe: one(ceNuRecipe, {
		fields: [ceNuRecipeToIngredient.recipeId],
		references: [ceNuRecipe.id]
	}),
}));

export const ceNuUserIngredientRelations = relations(ceNuUserIngredient, ({one}) => ({
	ceNuDailyLog: one(ceNuDailyLog, {
		fields: [ceNuUserIngredient.dailyLogId],
		references: [ceNuDailyLog.id]
	}),
	ceNuIngredient_alternateId: one(ceNuIngredient, {
		fields: [ceNuUserIngredient.alternateId],
		references: [ceNuIngredient.id],
		relationName: "ceNuUserIngredient_alternateId_ceNuIngredient_id"
	}),
	ceNuDailyMeal: one(ceNuDailyMeal, {
		fields: [ceNuUserIngredient.dailyMealId],
		references: [ceNuDailyMeal.id]
	}),
	ceNuUserPlan: one(ceNuUserPlan, {
		fields: [ceNuUserIngredient.userPlanId],
		references: [ceNuUserPlan.id]
	}),
	ceNuIngredient_ingredientId: one(ceNuIngredient, {
		fields: [ceNuUserIngredient.ingredientId],
		references: [ceNuIngredient.id],
		relationName: "ceNuUserIngredient_ingredientId_ceNuIngredient_id"
	}),
}));

export const ceNuDailyLogRelations = relations(ceNuDailyLog, ({one, many}) => ({
	ceNuUserIngredients: many(ceNuUserIngredient),
	ceNuUserRecipes: many(ceNuUserRecipe),
	ceNuDailyMeals: many(ceNuDailyMeal),
	ceNuPoopLogs: many(ceNuPoopLog),
	ceNuWaterLogs: many(ceNuWaterLog),
	ceNuUser: one(ceNuUser, {
		fields: [ceNuDailyLog.userId],
		references: [ceNuUser.id]
	}),
	ceNuTagToDailyLogs: many(ceNuTagToDailyLog),
}));

export const ceNuDailyMealRelations = relations(ceNuDailyMeal, ({one, many}) => ({
	ceNuUserIngredients: many(ceNuUserIngredient),
	ceNuUserRecipes: many(ceNuUserRecipe),
	ceNuDailyLog: one(ceNuDailyLog, {
		fields: [ceNuDailyMeal.dailyLogId],
		references: [ceNuDailyLog.id]
	}),
}));

export const ceNuUserPlanRelations = relations(ceNuUserPlan, ({one, many}) => ({
	ceNuUserIngredients: many(ceNuUserIngredient),
	ceNuUserMeals: many(ceNuUserMeal),
	ceNuUser_userId: one(ceNuUser, {
		fields: [ceNuUserPlan.userId],
		references: [ceNuUser.id],
		relationName: "ceNuUserPlan_userId_ceNuUser_id"
	}),
	ceNuUser_creatorId: one(ceNuUser, {
		fields: [ceNuUserPlan.creatorId],
		references: [ceNuUser.id],
		relationName: "ceNuUserPlan_creatorId_ceNuUser_id"
	}),
	ceNuUserRecipes: many(ceNuUserRecipe),
}));

export const ceNuUserMealRelations = relations(ceNuUserMeal, ({one}) => ({
	ceNuUserPlan: one(ceNuUserPlan, {
		fields: [ceNuUserMeal.userPlanId],
		references: [ceNuUserPlan.id]
	}),
}));

export const ceNuUserRecipeRelations = relations(ceNuUserRecipe, ({one}) => ({
	ceNuDailyLog: one(ceNuDailyLog, {
		fields: [ceNuUserRecipe.dailyLogId],
		references: [ceNuDailyLog.id]
	}),
	ceNuDailyMeal: one(ceNuDailyMeal, {
		fields: [ceNuUserRecipe.dailyMealId],
		references: [ceNuDailyMeal.id]
	}),
	ceNuUserPlan: one(ceNuUserPlan, {
		fields: [ceNuUserRecipe.userPlanId],
		references: [ceNuUserPlan.id]
	}),
}));

export const ceNuAccountRelations = relations(ceNuAccount, ({one}) => ({
	ceNuUser: one(ceNuUser, {
		fields: [ceNuAccount.userId],
		references: [ceNuUser.id]
	}),
}));

export const ceNuPoopLogRelations = relations(ceNuPoopLog, ({one}) => ({
	ceNuDailyLog: one(ceNuDailyLog, {
		fields: [ceNuPoopLog.dailyLogId],
		references: [ceNuDailyLog.id]
	}),
}));

export const ceNuRoleRelations = relations(ceNuRole, ({one}) => ({
	ceNuUser: one(ceNuUser, {
		fields: [ceNuRole.userId],
		references: [ceNuUser.id]
	}),
}));

export const ceNuSessionRelations = relations(ceNuSession, ({one}) => ({
	ceNuUser: one(ceNuUser, {
		fields: [ceNuSession.userId],
		references: [ceNuUser.id]
	}),
}));

export const ceNuUserToTrainerRelations = relations(ceNuUserToTrainer, ({one}) => ({
	ceNuUser_trainerId: one(ceNuUser, {
		fields: [ceNuUserToTrainer.trainerId],
		references: [ceNuUser.id],
		relationName: "ceNuUserToTrainer_trainerId_ceNuUser_id"
	}),
	ceNuUser_userId: one(ceNuUser, {
		fields: [ceNuUserToTrainer.userId],
		references: [ceNuUser.id],
		relationName: "ceNuUserToTrainer_userId_ceNuUser_id"
	}),
}));

export const ceNuWaterLogRelations = relations(ceNuWaterLog, ({one}) => ({
	ceNuDailyLog: one(ceNuDailyLog, {
		fields: [ceNuWaterLog.dailyLogId],
		references: [ceNuDailyLog.id]
	}),
}));

export const ceNuWeighInRelations = relations(ceNuWeighIn, ({one}) => ({
	ceNuUser_trainerId: one(ceNuUser, {
		fields: [ceNuWeighIn.trainerId],
		references: [ceNuUser.id],
		relationName: "ceNuWeighIn_trainerId_ceNuUser_id"
	}),
	ceNuUser_userId: one(ceNuUser, {
		fields: [ceNuWeighIn.userId],
		references: [ceNuUser.id],
		relationName: "ceNuWeighIn_userId_ceNuUser_id"
	}),
}));

export const ceNuUserSettingsRelations = relations(ceNuUserSettings, ({one}) => ({
	ceNuUser: one(ceNuUser, {
		fields: [ceNuUserSettings.userId],
		references: [ceNuUser.id]
	}),
}));

export const ceNuSkinfoldRelations = relations(ceNuSkinfold, ({one, many}) => ({
	ceNuUser: one(ceNuUser, {
		fields: [ceNuSkinfold.userId],
		references: [ceNuUser.id]
	}),
	ceNuBodyFats: many(ceNuBodyFat),
	ceNuBodyWeights: many(ceNuBodyWeight),
	ceNuLeanMasses: many(ceNuLeanMass),
}));

export const ceNuBodyFatRelations = relations(ceNuBodyFat, ({one}) => ({
	ceNuSkinfold: one(ceNuSkinfold, {
		fields: [ceNuBodyFat.skinfoldId],
		references: [ceNuSkinfold.id]
	}),
	ceNuUser: one(ceNuUser, {
		fields: [ceNuBodyFat.userId],
		references: [ceNuUser.id]
	}),
}));

export const ceNuBodyWeightRelations = relations(ceNuBodyWeight, ({one}) => ({
	ceNuSkinfold: one(ceNuSkinfold, {
		fields: [ceNuBodyWeight.skinfoldId],
		references: [ceNuSkinfold.id]
	}),
	ceNuUser: one(ceNuUser, {
		fields: [ceNuBodyWeight.userId],
		references: [ceNuUser.id]
	}),
}));

export const ceNuLeanMassRelations = relations(ceNuLeanMass, ({one}) => ({
	ceNuSkinfold: one(ceNuSkinfold, {
		fields: [ceNuLeanMass.skinfoldId],
		references: [ceNuSkinfold.id]
	}),
	ceNuUser: one(ceNuUser, {
		fields: [ceNuLeanMass.userId],
		references: [ceNuUser.id]
	}),
}));

export const ceNuMessageRelations = relations(ceNuMessage, ({one}) => ({
	ceNuUser_fromUserId: one(ceNuUser, {
		fields: [ceNuMessage.fromUserId],
		references: [ceNuUser.id],
		relationName: "ceNuMessage_fromUserId_ceNuUser_id"
	}),
	ceNuUser_userId: one(ceNuUser, {
		fields: [ceNuMessage.userId],
		references: [ceNuUser.id],
		relationName: "ceNuMessage_userId_ceNuUser_id"
	}),
}));

export const ceNuTagRelations = relations(ceNuTag, ({one, many}) => ({
	ceNuUser: one(ceNuUser, {
		fields: [ceNuTag.userId],
		references: [ceNuUser.id]
	}),
	ceNuTagToDailyLogs: many(ceNuTagToDailyLog),
}));

export const ceNuTagToDailyLogRelations = relations(ceNuTagToDailyLog, ({one}) => ({
	ceNuDailyLog: one(ceNuDailyLog, {
		fields: [ceNuTagToDailyLog.dailyLogId],
		references: [ceNuDailyLog.id]
	}),
	ceNuTag: one(ceNuTag, {
		fields: [ceNuTagToDailyLog.tagId],
		references: [ceNuTag.id]
	}),
}));