PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text NOT NULL,
	`default_water` text,
	`default_chart_range` text,
	`is_posing` integer DEFAULT false,
	`is_blood_glucose` integer DEFAULT false,
	`is_sleep` integer DEFAULT true,
	`is_sleep_quality` integer DEFAULT true,
	`is_nap` integer DEFAULT true,
	`is_weight` integer DEFAULT true,
	`is_hiit` integer DEFAULT true,
	`is_liss` integer DEFAULT true,
	`is_notes` integer DEFAULT true,
	`is_steps` integer DEFAULT true,
	`is_sauna` integer DEFAULT true,
	`is_cold_plunge` integer DEFAULT true,
	`is_mobility` integer DEFAULT false,
	`period_start_at` integer,
	`period_length` integer DEFAULT 5,
	`period_interval` integer DEFAULT 28,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_settings`("id", "created_at", "updated_at", "user_id", "default_water", "default_chart_range", "is_posing", "is_blood_glucose", "is_sleep", "is_sleep_quality", "is_nap", "is_weight", "is_hiit", "is_liss", "is_notes", "is_steps", "is_sauna", "is_cold_plunge", "is_mobility", "period_start_at", "period_length", "period_interval") SELECT "id", "created_at", "updated_at", "user_id", "default_water", "default_chart_range", "is_posing", "is_blood_glucose", "is_sleep", "is_sleep_quality", "is_nap", "is_weight", "is_hiit", "is_liss", "is_notes", "is_steps", "is_sauna", "is_cold_plunge", "is_mobility", "period_start_at", "period_length", "period_interval" FROM `user_settings`;--> statement-breakpoint
DROP TABLE `user_settings`;--> statement-breakpoint
ALTER TABLE `__new_user_settings` RENAME TO `user_settings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `user_settings_user_id_idx` ON `user_settings` (`user_id`);