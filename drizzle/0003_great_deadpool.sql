CREATE TABLE `ce-nu_recipe` (
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
