# Decision Log

## Stack (chosen)
- Backend: Laravel 11 (PHP 8.2+), PostgreSQL, Redis, Meilisearch
- Frontend: Inertia.js 2 + React 18 + TypeScript (Vite)
- Styling: Tailwind CSS 3 + Headless UI (shadcn migration later)
- Admin: Filament v3 (separate panel)
- Payments: Laravel Cashier (Stripe)
- Media: Spatie Media Library + S3
- Auth: Laravel Breeze (Inertia React) + Sanctum for API

## Why Inertia + React over alternatives
- SPA UX without separate API/auth layer; SEO-friendly server-rendered pages
- React ecosystem (maps, calendars, carousels) strongest for tour domain
- Single codebase, one deploy

## Rejected
- Pure SPA: SEO pain for package pages, duplicate auth
- Livewire-only: weaker map/carousel ecosystem
- Vue: equally valid; React chosen for ecosystem breadth

## Conventions
- Pricing/availability computed server-side only
- All dates stored UTC
- Use DB transactions + Redis locks for booking concurrency
