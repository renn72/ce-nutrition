CREATE TABLE `ce-nu_message` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text,
	`title` text,
	`subject` text,
	`is_read` integer,
	`is_viewed` integer,
	`is_deleted` integer,
	`message` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `message_user_id_idx` ON `ce-nu_message` (`user_id`);