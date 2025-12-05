ALTER TABLE `daily_log` ADD `is_period` integer;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `period_start_at` integer;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `period_length` integer;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `period_interval` integer;