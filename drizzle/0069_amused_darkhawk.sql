ALTER TABLE `user` ADD `partner_id` text REFERENCES user(id) ON DELETE set null;--> statement-breakpoint
CREATE INDEX `user_partner_id_idx` ON `user` (`partner_id`);
