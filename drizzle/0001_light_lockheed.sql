DROP INDEX `email_idx`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `daily_log` ADD `posing` text;
