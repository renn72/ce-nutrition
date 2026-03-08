CREATE TABLE `shopping_list` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text NOT NULL,
	`creator_id` text NOT NULL,
	`name` text NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`archived_at` integer,
	`emailed_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `shopping_list_user_id_idx` ON `shopping_list` (`user_id`);--> statement-breakpoint
CREATE INDEX `shopping_list_creator_id_idx` ON `shopping_list` (`creator_id`);--> statement-breakpoint
CREATE INDEX `shopping_list_user_active_idx` ON `shopping_list` (`user_id`,`is_active`);--> statement-breakpoint
CREATE TABLE `shopping_list_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`shopping_list_id` integer NOT NULL,
	`ingredient_id` integer,
	`name` text NOT NULL,
	`amount` text NOT NULL,
	`unit` text NOT NULL,
	`is_checked` integer DEFAULT false NOT NULL,
	`source` text,
	`note` text,
	FOREIGN KEY (`shopping_list_id`) REFERENCES `shopping_list`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `shopping_list_item_list_id_idx` ON `shopping_list_item` (`shopping_list_id`);--> statement-breakpoint
CREATE INDEX `shopping_list_item_ingredient_id_idx` ON `shopping_list_item` (`ingredient_id`);