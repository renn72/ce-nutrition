ALTER TABLE `ce-nu_message` ADD `is_important` integer;--> statement-breakpoint
ALTER TABLE `ce-nu_message` ADD `from_user_id` text REFERENCES `ce-nu_user`(id);--> statement-breakpoint
CREATE INDEX `message_from_user_id_idx` ON `ce-nu_message` (`from_user_id`);--> statement-breakpoint
ALTER TABLE `ce-nu_message` DROP COLUMN `title`;
