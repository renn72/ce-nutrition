PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_to_trainer` (
	`user_id` text NOT NULL,
	`trainer_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`trainer_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_to_trainer`("user_id", "trainer_id") SELECT "user_id", "trainer_id" FROM `user_to_trainer`;--> statement-breakpoint
DROP TABLE `user_to_trainer`;--> statement-breakpoint
ALTER TABLE `__new_user_to_trainer` RENAME TO `user_to_trainer`;--> statement-breakpoint
PRAGMA foreign_keys=ON;