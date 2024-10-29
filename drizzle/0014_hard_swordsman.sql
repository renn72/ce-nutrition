CREATE TABLE `ce-nu_meal` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`name` text,
	`description` text,
	`image` text,
	`notes` text,
	`number_of_meals` integer,
	`creator_id` text,
	`recipe_category` text,
	`favourite_at` integer,
	`deleted_at` integer,
	`hidden_at` integer,
	FOREIGN KEY (`creator_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ce-nu_meal_to_recipe` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`meal_id` integer,
	`recipe_id` integer,
	`index` integer,
	`note` text,
	FOREIGN KEY (`meal_id`) REFERENCES `ce-nu_meal`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`recipe_id`) REFERENCES `ce-nu_recipe`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_meal_to_vege_stack` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`meal_id` integer,
	`vege_stack_id` integer,
	`calories` text,
	`note` text,
	FOREIGN KEY (`meal_id`) REFERENCES `ce-nu_meal`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`vege_stack_id`) REFERENCES `ce-nu_vege_stack`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `ce-nu_ingredient` ADD `name` text;