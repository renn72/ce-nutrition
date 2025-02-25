PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ce-nu_daily_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`morning_weight` text,
	`notes` text,
	`fasted_blood_glucose` text,
	`sleep` text,
	`sleep_quality` text,
	`is_hiit` integer,
	`is_cardio` integer,
	`is_lift` integer,
	`is_liss` integer,
	`image` text,
	`waist_measurement` text,
	`nap` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_ce-nu_daily_log`("id", "created_at", "updated_at", "user_id", "date", "morning_weight", "notes", "fasted_blood_glucose", "sleep", "sleep_quality", "is_hiit", "is_cardio", "is_lift", "is_liss", "image", "waist_measurement", "nap") SELECT "id", "created_at", "updated_at", "user_id", "date", "morning_weight", "notes", "fasted_blood_glucose", "sleep", "sleep_quality", "is_hiit", "is_cardio", "is_lift", "is_liss", "image", "waist_measurement", "nap" FROM `ce-nu_daily_log`;--> statement-breakpoint
DROP TABLE `ce-nu_daily_log`;--> statement-breakpoint
ALTER TABLE `__new_ce-nu_daily_log` RENAME TO `ce-nu_daily_log`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_ce-nu_user_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text NOT NULL,
	`default_water` text,
	`default_chart_range` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_ce-nu_user_settings`("id", "created_at", "updated_at", "user_id", "default_water", "default_chart_range") SELECT "id", "created_at", "updated_at", "user_id", "default_water", "default_chart_range" FROM `ce-nu_user_settings`;--> statement-breakpoint
DROP TABLE `ce-nu_user_settings`;--> statement-breakpoint
ALTER TABLE `__new_ce-nu_user_settings` RENAME TO `ce-nu_user_settings`;