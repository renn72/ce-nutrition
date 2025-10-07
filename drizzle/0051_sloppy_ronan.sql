CREATE INDEX `ingredient_to_grocery_store_ingredient_id_index` ON `ingredient_to_grocery_store` (`ingredient_id`);--> statement-breakpoint
CREATE INDEX `message_user_id_idx` ON `message` (`user_id`);--> statement-breakpoint
CREATE INDEX `message_from_user_id_idx` ON `message` (`from_user_id`);--> statement-breakpoint
CREATE INDEX `message_is_read_idx` ON `message` (`is_read`);--> statement-breakpoint
CREATE INDEX `notification_user_id_idx` ON `notification` (`user_id`);--> statement-breakpoint
CREATE INDEX `notification_is_read_idx` ON `notification` (`is_read`);--> statement-breakpoint
CREATE INDEX `recipe_user_id_idx` ON `recipe` (`creator_id`);--> statement-breakpoint
CREATE INDEX `recipe_is_user_recipe_idx` ON `recipe` (`is_user_recipe`);--> statement-breakpoint
CREATE INDEX `recipe_to_ingredient_recipe_id_index` ON `recipe_to_ingredient` (`recipe_id`);--> statement-breakpoint
CREATE INDEX `user_email_idx` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `user_is_creator_idx` ON `user` (`is_creator`);