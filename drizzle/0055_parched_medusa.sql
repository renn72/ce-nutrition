CREATE TABLE `plan_folder` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text,
	`parent_id` integer
);
--> statement-breakpoint
ALTER TABLE `plan` ADD `plan_folder_id` integer REFERENCES plan_folder(id);