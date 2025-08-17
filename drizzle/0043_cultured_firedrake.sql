ALTER TABLE `message` ADD `is_notified` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `notification` ADD `is_notified` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `supplement_stack` ADD `order` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `supplement_to_supplement_stack` ADD `order` integer DEFAULT 0;