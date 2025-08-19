PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_push_subscription` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`subscription` text NOT NULL,
	`user_id` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_push_subscription`("id", "created_at", "updated_at", "subscription", "user_id") SELECT "id", "created_at", "updated_at", "subscription", "user_id" FROM `push_subscription`;--> statement-breakpoint
DROP TABLE `push_subscription`;--> statement-breakpoint
ALTER TABLE `__new_push_subscription` RENAME TO `push_subscription`;--> statement-breakpoint
PRAGMA foreign_keys=ON;