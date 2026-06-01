# Project Overview

A personal portfolio site for Faith Catherine Otieno, showcasing software engineering work. Built with **Next.js 15 App Router**, TypeScript, Tailwind CSS 4, and Framer Motion for animations.

## Architecture

- **Single-page layout**: All sections render server-side in `src/app/page.tsx` — `<Navbar />`, `<Hero />`, `<Projects />`, `<Skills />`, `<Experience />` — stacked vertically
- **No routing**: Pure single-page design; no dynamic routes or nested pages
- **Component structure**: Flat hierarchy in `src/components/` — each component is self-contained with inline data
- **Styling approach**: Tailwind utility classes with gradient backgrounds (`from-purple-50 via-white to-pink-50`), shadow utilities (`shadow-md`, `hover:shadow-lg`), and custom dark theme color scheme in `globals.css` (background `#0a0a0a`, foreground `#ededed`)

## Key Patterns

### Animation Pattern (Framer Motion)

All major sections use `framer-motion` with consistent `initial/animate/transition` setup:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
```

- `viewport={{ once: true }}` prevents re-animation on scroll
- Stagger delays with `delay: index * 0.1` for child elements (see `Skills.tsx`)

### Client-Side Interactivity

Components requiring interactivity use `'use client'` directive:

- `Navbar.tsx`: Mobile menu toggle state
- `Projects.tsx`: Accordion toggle state (`openFeature`)
- `Hero.tsx`, `Skills.tsx`: Framer Motion animations

### Project Showcase Component (`Projects.tsx`)

The `<PursuitCard />` is a **multi-column spanning card** (`col-span-1 md:col-span-2`) with:

- Dark header (`bg-[#1C1033]`) with status badges
- Accordion feature breakdown (toggled by local state)
- Inline data arrays: `features` with title/content/tags, `stack` array
- Links to GitHub repo and case study PDF (`Pursuit_Portfolio_final.pdf` in `/public`)

## Development Workflow

### Start dev server

```bash
npm run dev
```

Uses **Turbopack** (`next dev --turbopack`) — fast refresh enabled, runs on `localhost:3000`

### Build for production

```bash
npm run build
```

Also uses Turbopack (`next build --turbopack`)

### Linting

```bash
npm run lint
```

Uses Next.js ESLint config with TypeScript rules (see `eslint.config.mjs`)

## Styling Conventions

- **Gradient backgrounds**: Purple/pink theme (`from-purple-50 via-white to-pink-50` or `from-pink-50 to-purple-50`)
- **Card shadows**: Use `shadow-md` base with `hover:shadow-lg` transition
- **Rounded corners**: Consistent `rounded-lg` for cards, `rounded-full` for badges/pills
- **Brand colors**: Purple `#7B5EA7`, dark purple `#1C1033`, light purple background `#F3EEFF`
- **Responsive spacing**: Use Tailwind breakpoints (`sm:`, `md:`, `lg:`) with max-width container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

## Font Setup

Two custom fonts via `next/font/google`:

- `Geist` (sans-serif) → `--font-geist-sans`
- `Geist Mono` (monospace) → `--font-geist-mono`

Applied in `layout.tsx` via CSS variables, referenced in `globals.css` theme config.
