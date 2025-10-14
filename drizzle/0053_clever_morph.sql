ALTER TABLE `daily_log` ADD `mobility` text;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_mobility` integer DEFAULT false;