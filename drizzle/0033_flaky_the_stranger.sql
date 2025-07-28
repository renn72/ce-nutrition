ALTER TABLE `ingredient` ADD `is_private` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `ingredient` ADD `viewable_by` text;