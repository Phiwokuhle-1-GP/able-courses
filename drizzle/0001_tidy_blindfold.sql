CREATE TABLE `page_views` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` text NOT NULL,
	`path` text NOT NULL,
	`source` text NOT NULL,
	`campaign` text
);
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `status` text DEFAULT 'New' NOT NULL;