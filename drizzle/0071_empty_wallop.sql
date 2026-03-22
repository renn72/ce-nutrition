CREATE TABLE `ai_insight` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`range_days` integer NOT NULL,
	`range_label` text NOT NULL,
	`range_start` text NOT NULL,
	`range_end` text NOT NULL,
	`source_log_count` integer NOT NULL,
	`model` text NOT NULL,
	`content` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `ai_insight_user_id_idx` ON `ai_insight` (`user_id`);--> statement-breakpoint
CREATE INDEX `ai_insight_created_at_idx` ON `ai_insight` (`created_at`);