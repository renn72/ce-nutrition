PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_supplement_to_supplement_stack` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`supplement_id` integer,
	`supplement_stack_id` integer,
	`size` text,
	`unit` text,
	FOREIGN KEY (`supplement_id`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`supplement_stack_id`) REFERENCES `supplement_stack`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_supplement_to_supplement_stack`("id", "supplement_id", "supplement_stack_id", "size", "unit") SELECT "id", "supplement_id", "supplement_stack_id", "size", "unit" FROM `supplement_to_supplement_stack`;--> statement-breakpoint
DROP TABLE `supplement_to_supplement_stack`;--> statement-breakpoint
ALTER TABLE `__new_supplement_to_supplement_stack` RENAME TO `supplement_to_supplement_stack`;--> statement-breakpoint
PRAGMA foreign_keys=ON;