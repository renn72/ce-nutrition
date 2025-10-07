CREATE INDEX `tag_to_daily_log_tag_id_index` ON `tag_to_daily_log` (`tag_id`);--> statement-breakpoint
CREATE INDEX `user_ingredient_daily_meal_id_index` ON `user_ingredient` (`daily_meal_id`);--> statement-breakpoint
CREATE INDEX `user_recipe_daily_meal_id_index` ON `user_recipe` (`daily_meal_id`);