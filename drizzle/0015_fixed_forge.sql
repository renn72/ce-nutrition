ALTER TABLE `ingredient` ADD `is_user_created` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `recipe_to_ingredient` ADD `is_user_created` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `user_ingredient` ADD `is_user_created` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `user_recipe` ADD `is_user_created` integer DEFAULT false;