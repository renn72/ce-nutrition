CREATE TABLE `ce-nu_plan_to_vege_stack` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`plan_id` integer,
	`vege_stack_id` integer,
	`index` integer,
	FOREIGN KEY (`plan_id`) REFERENCES `ce-nu_plan`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`vege_stack_id`) REFERENCES `ce-nu_vege_stack`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ce-nu_vege_stack` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`veges` text
);
