CREATE TABLE `ce-nu_user-ingredient` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`ingredient_id` integer,
	`user_plan_id` integer,
	`meal_index` integer,
	`recipe_index` integer,
	`is_alternate` integer,
	`serve` text,
	`serve_unit` text,
	`note` text,
	FOREIGN KEY (`ingredient_id`) REFERENCES `ce-nu_ingredient`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_plan_id`) REFERENCES `ce-nu_user-plan`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ce-nu_user-meal` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_plan_id` integer,
	`index` integer,
	`meal_title` text,
	`calories` text,
	`protein` text,
	`vege_calories` text,
	`note` text,
	FOREIGN KEY (`user_plan_id`) REFERENCES `ce-nu_user-plan`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ce-nu_user-plan` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`name` text,
	`description` text,
	`image` text,
	`notes` text,
	`number_of_meals` integer,
	`creator_id` text,
	`user_id` text,
	`recipe_category` text,
	`favourite_at` integer,
	`deleted_at` integer,
	`hidden_at` integer,
	FOREIGN KEY (`creator_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ce-nu_user-recipe` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`meal_index` integer,
	`recipe_index` integer,
	`user_plan_id` integer,
	`index` integer,
	`serve` text,
	`serve_unit` text,
	`note` text,
	FOREIGN KEY (`user_plan_id`) REFERENCES `ce-nu_user-plan`(`id`) ON UPDATE no action ON DELETE no action
);
