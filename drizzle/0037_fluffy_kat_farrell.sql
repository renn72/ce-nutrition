PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_to_user_category` (
	`user_id` text NOT NULL,
	`category_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `user_category`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_to_user_category`("user_id", "category_id") SELECT "user_id", "category_id" FROM `user_to_user_category`;--> statement-breakpoint
DROP TABLE `user_to_user_category`;--> statement-breakpoint
ALTER TABLE `__new_user_to_user_category` RENAME TO `user_to_user_category`;--> statement-breakpoint
PRAGMA foreign_keys=ON;