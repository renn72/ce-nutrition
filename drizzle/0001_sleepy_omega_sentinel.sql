CREATE TABLE `ce-nu_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`task` text,
	`notes` text,
	`user` text
);
