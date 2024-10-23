CREATE TABLE `ce-nu_user_to_trainer` (
	`user_id` text,
	`trainer_id` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`trainer_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `ce-nu_user` ADD `is_trainer` integer DEFAULT false;