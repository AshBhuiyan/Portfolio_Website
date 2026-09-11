# Ash Bhuiyan — Personal Brand Website

A personal brand site and portfolio for **Ash Bhuiyan** — Software Engineering
student focused on data & systems analysis. Built as a small, maintainable
product rather than a template. Supports light and dark themes.

## Stack

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS** for styling and the design system
- **Framer Motion** for subtle, reduced-motion-aware animation
- **lucide-react** for icons
- Typed **data files** drive the projects and music content

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For production builds, set the canonical site URL:

```bash
export NEXT_PUBLIC_SITE_URL=https://ashbhuiyan.com
npm run build
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Prettier |
| `npm run logo:gen` | Regenerate logo assets from source |

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home |
| `/projects` | Project gallery |
| `/projects/[slug]` | Case study |
| `/resume` | Resume download |
| `/about` | About |
| `/music` | Music |
| `/contact` | Contact |
| `/music/private` | Private room (request access) |

Legacy `/work` URLs permanently redirect to `/projects`.

## Content

Edit typed data under `src/data/`:

- `site.ts` — name, role, links, metadata
- `projects.ts` — project case studies
- `experience.ts` — experience entries
- `music.ts` — music releases

Place `public/resume.pdf` for the resume download. Optional audio under `public/audio/`.

## Environment

See `.env.example`. Production requires `NEXT_PUBLIC_SITE_URL`.
