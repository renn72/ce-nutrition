PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_message` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text,
	`subject` text,
	`is_important` integer,
	`is_read` integer DEFAULT false,
	`is_viewed` integer DEFAULT false,
	`is_deleted` integer DEFAULT false,
	`is_notified` integer DEFAULT false,
	`message` text,
	`image` text,
	`from_user_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`from_user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_message`("id", "created_at", "user_id", "subject", "is_important", "is_read", "is_viewed", "is_deleted", "is_notified", "message", "image", "from_user_id") SELECT "id", "created_at", "user_id", "subject", "is_important", "is_read", "is_viewed", "is_deleted", "is_notified", "message", "image", "from_user_id" FROM `message`;--> statement-breakpoint
DROP TABLE `message`;--> statement-breakpoint
ALTER TABLE `__new_message` RENAME TO `message`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_notification` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text,
	`code` text,
	`title` text,
	`description` text,
	`is_read` integer DEFAULT false,
	`is_viewed` integer DEFAULT false,
	`is_deleted` integer DEFAULT false,
	`is_notified` integer DEFAULT false,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_notification`("id", "created_at", "user_id", "code", "title", "description", "is_read", "is_viewed", "is_deleted", "is_notified", "notes") SELECT "id", "created_at", "user_id", "code", "title", "description", "is_read", "is_viewed", "is_deleted", "is_notified", "notes" FROM `notification`;--> statement-breakpoint
DROP TABLE `notification`;--> statement-breakpoint
ALTER TABLE `__new_notification` RENAME TO `notification`;