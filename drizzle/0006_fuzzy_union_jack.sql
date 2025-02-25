ALTER TABLE `ce-nu_daily_log` ADD `hiit` text;--> statement-breakpoint
ALTER TABLE `ce-nu_daily_log` ADD `cardio` text;--> statement-breakpoint
ALTER TABLE `ce-nu_daily_log` ADD `weight` text;--> statement-breakpoint
ALTER TABLE `ce-nu_daily_log` ADD `liss` text;--> statement-breakpoint
ALTER TABLE `ce-nu_daily_log` ADD `cardio_type` text;--> statement-breakpoint
CREATE INDEX `date_idx` ON `ce-nu_daily_log` (`date`);