CREATE TABLE `ce-nu_plan` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`name` text,
	`description` text,
	`image` text,
	`notes` text,
	`creator_id` text,
	`recipe_category` text,
	`favourite_at` integer,
	`deleted_at` integer,
	`hidden_at` integer,
	FOREIGN KEY (`creator_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ce-nu_plan_to_recipe` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`plan_id` integer,
	`recipe_id` integer,
	`index` integer,
	`meal_number` integer,
	`calories` integer,
	`note` text,
	FOREIGN KEY (`plan_id`) REFERENCES `ce-nu_plan`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`recipe_id`) REFERENCES `ce-nu_recipe`(`id`) ON UPDATE no action ON DELETE cascade
);
