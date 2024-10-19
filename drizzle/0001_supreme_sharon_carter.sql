ALTER TABLE `ce-nu_ingredient` ADD `favourite_at` integer;--> statement-breakpoint
CREATE INDEX `ingredient_food_key_idx` ON `ce-nu_ingredient` (`public_food_key`);