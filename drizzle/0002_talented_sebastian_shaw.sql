CREATE TABLE `ce-nu_weigh_in` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`trainer_id` text NOT NULL,
	`date` integer DEFAULT (unixepoch()) NOT NULL,
	`body_weight` text,
	`lean_mass` text,
	`body_fat` text,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`trainer_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
