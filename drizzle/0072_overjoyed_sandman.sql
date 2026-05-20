CREATE TABLE `user_settings_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_settings_id` integer NOT NULL,
	`name` text,
	`state` text,
	FOREIGN KEY (`user_settings_id`) REFERENCES `user_settings`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `user_settings_tags_user_settings_id_idx` ON `user_settings_tags` (`user_settings_id`);