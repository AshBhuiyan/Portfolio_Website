# Ash Bhuiyan — Personal Brand Website

This is the source code for my personal website: a portfolio and brand site
that brings together my software engineering work, academic and teaching
background, and music into one place. It's meant to be the site I point
people to when they want a real sense of who I am and what I've built, not
just a resume in web form.

The site is built as a small, maintainable product rather than a
copy-pasted template. It supports full light and dark theme parity.

## What's in it

- **Home** — an introduction and entry point into the rest of the site
- **Projects** — case studies of my work: SE coursework projects, data/ML
  work, embedded systems, database design, and this website itself. Each
  project has its own dedicated case-study page under `/projects/[slug]`
- **About** — background on who I am beyond the resume
- **Resume** — a downloadable copy of my current resume, plus an option to
  request one directly by email
- **Music** — a public preview of guitar/music work I do outside of software,
  with a separate private room for sharing unlisted tracks with specific
  people
- **Contact** — ways to reach me, with a working contact form

The project data (case studies, experience, music tracks) all live in typed
files under `src/data/`, so the content is structured and easy to update
without touching page layout code.

## Stack

- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS** for styling and the design system
- **Framer Motion** for subtle, reduced-motion-aware animation
- **lucide-react** for icons
- Deployed on **Vercel**, connected to this repo for automatic redeploys on
  push to `main`

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

Production builds intentionally fail without `NEXT_PUBLIC_SITE_URL` set, so
the site can never ship with the wrong canonical URL baked into its
metadata, Open Graph tags, sitemap, or robots.txt.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Prettier (writes changes) |
| `npm run format:check` | Prettier (check only, no writes) |
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

- `site.ts` — name, role, contact info, links, metadata
- `projects.ts` — project case studies (wording is intentionally honest;
  these are coursework/concept projects, not fabricated company work)
- `experience.ts` — experience entries
- `music.ts` — music releases (preview-only; private/full tracks are served
  separately through `/music/private`)

Place the downloadable resume at `public/Ash_Bhuiyan_Resume.pdf` — this
filename is referenced directly in `src/app/resume/page.tsx`, so renaming it
again means updating that reference too. Optional audio assets go under
`public/audio/`.

## Environment

See `.env.example` for the full list with descriptions. Summary:

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Canonical URL for metadata, Open Graph, sitemap, robots.txt |
| `NEXT_PUBLIC_FORMSPREE_ID` | No | Enables Formspree contact form submissions. If unset, the contact form falls back to a direct "email me" mode |

When deploying on Vercel, set both under Project Settings → Environment
Variables for the Production and Preview environments.
