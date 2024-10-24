CREATE TABLE `ce-nu_recipe_to_ingredient` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`recipe_id` integer,
	`ingredient_id` integer,
	`is_protein` integer,
	`is_carbohydrate` integer,
	`is_fat` integer,
	FOREIGN KEY (`recipe_id`) REFERENCES `ce-nu_recipe`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`ingredient_id`) REFERENCES `ce-nu_ingredient`(`id`) ON UPDATE no action ON DELETE cascade
);
