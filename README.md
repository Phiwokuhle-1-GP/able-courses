# ABLE — Code • Edit • Data

A responsive course marketing site for three beginner programmes: ABLE CODE, ABLE EDIT and ABLE DATA.

## Pages

- `/able-code` — introductory Python coding
- `/able-edit` — introductory video editing
- `/able-data` — introductory data analytics
- `/locations` — Johannesburg, Randburg, Sandton, Rosebank, Cape Town and online learning across South Africa
- `/owner` — owner-only enquiry inbox and basic analytics

Previous `/ican-code`, `/ican-edit` and `/ican-data` links redirect to the new course pages. Existing enquiry and page-view records remain in the owner dashboard under their ABLE course names.

Course pages include unique metadata, Course structured data, outcomes and enquiry forms. Enquiries are stored in Cloudflare D1. The owner can search recent enquiries, change follow-up status and reply by email. Browser page views, sources and UTM campaigns provide basic traffic reporting; they are not unique visitor counts. Email notifications are not configured.

The Sites deployment is private and configured with `noindex` and a disallowing `robots.txt`. Search indexing will only become possible after a separately approved public launch and removal of those restrictions. City copy offers online learning and asks visitors to confirm any in-person format; it does not claim fixed local venues or dates.

## Local development

Requires Node.js 22 or newer. Install dependencies with `pnpm install`, then run `pnpm dev`. The D1 schema is in `db/schema.ts` and generated migrations in `drizzle/`. Set `OWNER_EMAIL` to the authenticated ChatGPT account email for the dashboard, using `.env.example` as a placeholder reference. The production value belongs in Sites runtime environment variables, not GitHub.
