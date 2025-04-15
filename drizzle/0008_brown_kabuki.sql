CREATE TABLE `girth_measurement` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`waist` text,
	`glute_peaks` text,
	`bicep` text,
	`chest_peak` text,
	`thigh_peak` text,
	`calf_peak` text,
	`front_relaxed_image` text,
	`front_posed_image` text,
	`side_relaxed_image` text,
	`side_posed_image` text,
	`back_relaxed_image` text,
	`back_posed_image` text,
	`glute_relaxed_image` text,
	`glute_posed_image` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `daily_log` ADD `sauna` text;--> statement-breakpoint
ALTER TABLE `daily_log` ADD `cold_plunge` text;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_steps` integer DEFAULT true;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_sauna` integer DEFAULT true;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_cold_plunge` integer DEFAULT true;