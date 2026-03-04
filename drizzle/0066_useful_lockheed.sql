ALTER TABLE `user_settings` ADD `is_high_low` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_bulk_cut` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `cut_start_at` integer;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `cut_finish_at` integer;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `bulk_start_at` integer;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `bulk_finish_at` integer;