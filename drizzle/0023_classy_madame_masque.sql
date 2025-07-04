CREATE TABLE `log_new` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`code` text,
	`input` text,
	`type` text,
	`path` text,
	`duration` integer,
	`source` text,
	`info` text,
	`error` text,
	`user` text,
	`user_id` text
);
