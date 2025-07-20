CREATE TABLE `supplement_stack` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` text NOT NULL,
	`name` text,
	`time` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `supplement_to_supplement_stack` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`supplement_id` integer,
	`supplement_stack_id` integer,
	`size` text,
	`unit` text,
	FOREIGN KEY (`supplement_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`supplement_stack_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE cascade
);
