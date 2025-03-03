CREATE TABLE `ce-nu_body_fat` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`body_fat` text,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `body_fat_date_idx` ON `ce-nu_body_fat` (`date`);--> statement-breakpoint
CREATE TABLE `ce-nu_body_weight` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`body_weight` text,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `body_weight_date_idx` ON `ce-nu_body_weight` (`date`);--> statement-breakpoint
CREATE TABLE `ce-nu_lean_mass` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`lean_mass` text,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `lean_mass_date_idx` ON `ce-nu_lean_mass` (`date`);--> statement-breakpoint
CREATE TABLE `ce-nu_skinfold` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`chin` text,
	`cheek` text,
	`lower_abdominal` text,
	`pectoral` text,
	`biceps` text,
	`triceps` text,
	`subscapular` text,
	`mid_axillary` text,
	`suprailiac` text,
	`umbilical` text,
	`lower_back` text,
	`quadriceps` text,
	`hamstrings` text,
	`medial_calf` text,
	`knee` text,
	`shoulder` text,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `ce-nu_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `skinfold_date_idx` ON `ce-nu_skinfold` (`date`);