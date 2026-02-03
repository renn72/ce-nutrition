CREATE INDEX `meal_plan_id_idx` ON `meal` (`plan_id`);--> statement-breakpoint
CREATE INDEX `meal_to_recipe_meal_id_idx` ON `meal_to_recipe` (`meal_id`);--> statement-breakpoint
CREATE INDEX `meal_to_recipe_recipe_id_idx` ON `meal_to_recipe` (`recipe_id`);--> statement-breakpoint
CREATE INDEX `plan_user_id_idx` ON `plan` (`creator_id`);--> statement-breakpoint
CREATE INDEX `plan_createAt_id_idx` ON `plan` (`created_at`);--> statement-breakpoint
CREATE INDEX `plan_to_meal_plan_id_idx` ON `plan_to_meal` (`plan_id`);--> statement-breakpoint
CREATE INDEX `plan_to_meal_meal_id_idx` ON `plan_to_meal` (`meal_id`);--> statement-breakpoint
CREATE INDEX `recipe_to_ingredient_ingredient_id_index` ON `recipe_to_ingredient` (`ingredient_id`);