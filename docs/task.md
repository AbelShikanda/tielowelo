# Task Tracker

## Done
- [x] Create Laravel project (tielowelo)
- [x] Install Breeze (Inertia + React)
- [x] Convert to TypeScript, update vite/app.blade refs
- [x] Build passing
- [x] Create docs/decision.md, goal.md, task.md
- [x] Update git user config (name: abel, email: abelshikanda3@gmail.com)
- [x] Create docs/WORKFLOW.md (branch-first development rules)

## Done — Foundation (Phase A)
- [x] A1: Design System — Tailwind config, cn() util, shadcn/ui primitives, theme
- [x] A2: Layout & Shell — Sidebar, header, footer, breadcrumbs, public/authenticated layouts
- [x] Wire routes & layouts — Connect TourLayout/TourAuthenticatedLayout to Breeze pages + add routes/web.php so frontend is visible
- [x] A3: Authentication — Login, register, password reset, profile (Breeze + Sanctum)
- [x] A4: Home / Landing — Hero, featured destinations, trending tours, search CTA

## Next — Public Domain (Phase B)
- [ ] B1: Destinations — Listing, detail page, cards, image gallery
- [ ] B2: Tours — Listing w/ search/filter, detail page, itinerary, map, inclusions
- [ ] B3: Availability — Date picker/calendar, departure selection, seat availability
- [ ] B4: Booking Flow — Multi-step wizard (dates → passengers → extras → summary)
- [ ] B5: Payments — Stripe Checkout via Cashier, success/cancel pages, receipt
- [ ] B6: User Account — My bookings, booking detail, profile settings
- [ ] B7: Reviews — Tour ratings, review listing, add review form

## Next — Backend (Phase C)
- [ ] C1: Routing & Inertia — Public routes, page controllers, shared props
- [ ] C2: Domain Models & Migrations — destinations, tours, departures, bookings, payments, reviews
- [ ] C3: Factories & Seeders — Test data for all domain models
- [ ] C4: Validation — FormRequest classes
- [ ] C5: Service Layer — Pricing, availability, booking creation (transactions + Redis locks)
- [ ] C6: Auth & Authorization — Sanctum, Breeze, policies/gates
- [ ] C7: Media & File Uploads — Spatie Media Library + S3
- [ ] C8: Search — Scout + Meilisearch
- [ ] C9: Payments — Cashier + Stripe webhooks, payment status sync
- [ ] C10: Notifications — Booking emails, admin alerts, in-app notifications
- [ ] C11: Jobs & Queues — Email dispatch, payment retry, reports
- [ ] C12: Events & Listeners — BookingCreated, PaymentCompleted, etc.
- [ ] C13: Caching — Redis for availability, search results, session data

## Next — Admin Panel (Phase D)
- [ ] D1: Admin Dashboard — Stats, recent bookings, revenue overview
- [ ] D2: Destination CRUD — Create/edit/delete destinations, media
- [ ] D3: Tour CRUD — Full tour management, itinerary, pricing, tags
- [ ] D4: Departure Management — Departure dates, capacity, per-date pricing
- [ ] D5: Booking Management — View all bookings, update status, cancel, export
- [ ] D6: Payment Management — View payments, refunds, Stripe sync
- [ ] D7: Reports — Revenue by destination/month, occupancy rate
- [ ] D8: User & Role Management — Spatie permissions, admin roles

## Next — Polish & Delivery (Phase E)
- [ ] E1: Environment — .env.example with PG/Redis/Meilisearch/S3/Stripe vars
- [ ] E2: Testing — Pest feature + unit tests
- [ ] E3: i18n — Multi-language support
- [ ] E4: SEO — Meta tags, Open Graph, sitemap, structured data
- [ ] E5: Image Optimization — Vite/Tailwind image handling, lazy loading
- [ ] E6: CI/CD & Deployment — GitHub Actions, migrations on deploy
