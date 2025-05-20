ALTER TABLE `daily_log` ADD `front_image` text;--> statement-breakpoint
ALTER TABLE `daily_log` ADD `side_image` text;--> statement-breakpoint
ALTER TABLE `daily_log` ADD `back_image` text;--> statement-breakpoint
ALTER TABLE `daily_log` ADD `front_pose_image` text;--> statement-breakpoint
ALTER TABLE `daily_log` ADD `side_pose_image` text;--> statement-breakpoint
ALTER TABLE `daily_log` ADD `back_pose_image` text;--> statement-breakpoint
ALTER TABLE `daily_log` ADD `spare_image` text;--> statement-breakpoint
ALTER TABLE `user` ADD `is_all_trainers` integer DEFAULT false;