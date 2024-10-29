ALTER TABLE `ce-nu_meal` ADD `meal_category` text;--> statement-breakpoint
ALTER TABLE `ce-nu_meal` DROP COLUMN `number_of_meals`;--> statement-breakpoint
ALTER TABLE `ce-nu_meal` DROP COLUMN `recipe_category`;