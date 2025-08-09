CREATE TABLE `user_category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `user_to_user_category` (
	`user_id` text NOT NULL,
	`category_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `user_category`(`id`) ON UPDATE no action ON DELETE cascade
);
