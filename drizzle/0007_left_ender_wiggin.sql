ALTER TABLE `user_settings` RENAME COLUMN "is_posing_admin" TO "is_posing";--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_blood_glucose` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_sleep` integer DEFAULT true;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_sleep_quality` integer DEFAULT true;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_nap` integer DEFAULT true;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_weight` integer DEFAULT true;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_hiit` integer DEFAULT true;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_liss` integer DEFAULT true;--> statement-breakpoint
ALTER TABLE `user_settings` ADD `is_notes` integer DEFAULT true;