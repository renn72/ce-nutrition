CREATE TABLE `trainer_notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text NOT NULL,
	`title` text,
	`description` text,
	`state` text,
	`trainer_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`trainer_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
