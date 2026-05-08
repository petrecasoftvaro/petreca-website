# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture

Next.js 15 (App Router) full-stack blog with Auth0 authentication and Redis-backed comments.

### Key Sections

- `/app` — Pages and API routes. Sections: `posts/`, `jogos/`, `pedal/`, `compra-consciente/`
- `/app/api/comment` — Comment CRUD endpoints (create, delete, fetch from Redis)
- `/components` — Feature components organized by section (AppBar, Posts, Pedal, Jogos, Comment, etc.) plus shadcn/ui in `ui/`
- `/lib` — Server utilities: Redis client, Auth0 config, comment operations, hooks
- `/markdown-content` — Static `.md` files for blog posts (parsed with gray-matter + react-markdown)
- `/types` — Shared TypeScript types

### Auth & Middleware

Auth0 (`nextjs-auth0` v4) handles authentication. `middleware.ts` protects routes — unauthenticated users are redirected to `/auth/login`. Public routes: `/`, `/auth`, `/posts`, `/jogos`, `/pedal`, `/compra-consciente`.

### Data Flow

- Blog posts: Markdown files in `/markdown-content`, parsed server-side with gray-matter
- Comments: Stored in Redis, fetched client-side via SWR (`/components/providers/` wraps the app)
- Auth state: Managed by Auth0 session, accessible via `lib/auth0.ts`

### Code Style

ESLint enforces Airbnb rules with single quotes and Unix line endings. Path alias `@/*` maps to the project root.

### Environment Variables

Requires `.env.local` with: Auth0 credentials (`AUTH0_*`), Redis connection URL, and `APP_BASE_URL`.

### External Image Domains

`next.config.ts` whitelists Gravatar and Google auth avatar hosts for `next/image`.
