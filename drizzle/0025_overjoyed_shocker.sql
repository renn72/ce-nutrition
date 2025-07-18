PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_plan` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`finished_at` integer,
	`start_at` integer,
	`is_active` integer,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`image` text NOT NULL,
	`notes` text NOT NULL,
	`number_of_meals` integer,
	`creator_id` text NOT NULL,
	`user_id` text NOT NULL,
	`favourite_at` integer,
	`deleted_at` integer,
	`hidden_at` integer,
	FOREIGN KEY (`creator_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_plan`("id", "created_at", "updated_at", "finished_at", "start_at", "is_active", "name", "description", "image", "notes", "number_of_meals", "creator_id", "user_id", "favourite_at", "deleted_at", "hidden_at") SELECT "id", "created_at", "updated_at", "finished_at", "start_at", "is_active", "name", "description", "image", "notes", "number_of_meals", "creator_id", "user_id", "favourite_at", "deleted_at", "hidden_at" FROM `user_plan`;--> statement-breakpoint
DROP TABLE `user_plan`;--> statement-breakpoint
ALTER TABLE `__new_user_plan` RENAME TO `user_plan`;--> statement-breakpoint
PRAGMA foreign_keys=ON;