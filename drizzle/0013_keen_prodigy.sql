ALTER TABLE `ce-nu_body_fat` ADD `skinfold_id` integer REFERENCES `ce-nu_skinfold`(id);--> statement-breakpoint
ALTER TABLE `ce-nu_body_weight` ADD `skinfold_id` integer REFERENCES `ce-nu_skinfol`(id);--> statement-breakpoint
ALTER TABLE `ce-nu_lean_mass` ADD `skinfold_id` integer REFERENCES `ce-nu_skinfold`(id);
