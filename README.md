# fe-project-scheduling-system

A mission-control style scheduling workspace now powered by Next.js for better routing, performance, and deployment ergonomics.

## Why Next.js?
1. **Server-Side Rendering (SSR)** – improves perceived performance and produces HTML search engines can crawl before hydration.
2. **Built-in Routing** – the `app` directory maps file paths such as `/app/page.tsx` ➜ `/` and `/app/users/page.tsx` ➜ `/users` without React Router overhead.
3. **Performance Optimizations** – automatic code splitting, image optimization, and caching tuned for production out of the box.

## Development
1. Install dependencies: `npm install`.
2. Provide your API base URL via `.env.local` (e.g. `NEXT_PUBLIC_API_URL=http://localhost:4000/api`).
3. Start the dev server: `npm run dev`.
4. Run linting anytime with `npm run lint`.

The UI logic, contexts, and feature components from the original React app now live under `src/` and are composed inside the Next.js `app` router so no functionality is lost while gaining the new platform capabilities above.
