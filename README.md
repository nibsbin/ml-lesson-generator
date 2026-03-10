# ML Lesson Generator

A lightweight SvelteKit web application that dynamically assembles and serves randomized Machine Learning lesson modules. Each generated lesson contains a balanced mix of theory, Python code examples, and concept-check quizzes drawn from a SQLite content database.

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Framework  | SvelteKit + TypeScript                  |
| Styling    | Tailwind CSS v4                         |
| Database   | SQLite via Prisma ORM (better-sqlite3)  |
| Deployment | Vercel / Cloudflare Pages               |

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Configure environment

```sh
cp .env.example .env
```

Edit `.env` and set `DATABASE_URL` (defaults to a local SQLite file).

### 3. Create the database and apply migrations

```sh
npm run db:migrate
```

### 4. Seed with ML content blocks

```sh
npm run db:seed
```

### 5. Start the development server

```sh
npm run dev
# or open in browser automatically:
npm run dev -- --open
```

## Available Scripts

| Script            | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Start the Vite dev server                |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview the production build             |
| `npm run check`   | Run Svelte type-checking                 |
| `npm run db:migrate` | Apply Prisma migrations               |
| `npm run db:seed`    | Seed the database with ML content     |
| `npm run db:studio`  | Open Prisma Studio (database GUI)     |

## Project Structure

```
src/
├── routes/
│   ├── +page.svelte                  # Home page — "Generate Lesson" trigger
│   ├── lesson/[id]/
│   │   ├── +page.svelte              # Lesson display (renders content blocks)
│   │   └── +page.server.ts           # Server loader — fetches lesson from DB
│   └── api/generate/
│       └── +server.ts                # POST endpoint — assembles & saves lesson
├── lib/
│   ├── components/
│   │   ├── MarkdownBlock.svelte      # Renders theory/text content
│   │   ├── CodeSnippet.svelte        # Renders Python code examples
│   │   └── ConceptCheck.svelte       # Interactive quiz widget
│   └── server/
│       ├── db.ts                     # Prisma client singleton
│       └── randomizer.ts             # Content selection algorithm
prisma/
├── schema.prisma                     # Database schema (ContentBlock, Lesson)
├── migrations/                       # Applied migration history
└── seed.ts                           # Seed data (12 ML content blocks)
```

## How It Works

1. User visits `/` and clicks **Generate Lesson**.
2. A `POST /api/generate` request is sent to the server.
3. The server fetches all `ContentBlock` rows from the database.
4. `randomizer.ts` selects one block per category: *Theory*, *Python Code*, *Math*.
5. A new `Lesson` record is saved to the database.
6. The client is redirected to `/lesson/[id]`.
7. SvelteKit renders the lesson using the appropriate component for each block type.

## Building for Production

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy, install an [adapter](https://svelte.dev/docs/kit/adapters) for your target platform (e.g. `@sveltejs/adapter-vercel` for Vercel).

