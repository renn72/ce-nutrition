CREATE TABLE `daily_supplement` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`daily_log_id` integer NOT NULL,
	`supplement_id` integer NOT NULL,
	`amount` text,
	`unit` text,
	`time` text,
	`notes` text,
	FOREIGN KEY (`daily_log_id`) REFERENCES `daily_log`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`supplement_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE cascade
);
