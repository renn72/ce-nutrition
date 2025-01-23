CREATE TABLE `ce-nu_poop_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`daily_log_id` integer NOT NULL,
	FOREIGN KEY (`daily_log_id`) REFERENCES `ce-nu_daily_log`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_user_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text NOT NULL,
	`default_water` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ce-nu_water_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`daily_log_id` integer NOT NULL,
	`water` text,
	FOREIGN KEY (`daily_log_id`) REFERENCES `ce-nu_daily_log`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `ce-nu_daily_log` DROP COLUMN `water`;--> statement-breakpoint
ALTER TABLE `ce-nu_daily_log` DROP COLUMN `bowel_movements`;