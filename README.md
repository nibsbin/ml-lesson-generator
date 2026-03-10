# ML Lesson Generator

A lightweight SvelteKit web application that dynamically assembles and serves randomized Machine Learning lesson modules. Each generated lesson contains a balanced mix of theory, Python code examples, and concept-check quizzes from a built-in in-memory content pool — no database setup required.

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Framework  | SvelteKit + TypeScript  |
| Styling    | Tailwind CSS v4         |
| Data store | In-memory (no database) |
| Deployment | Vercel / Cloudflare Pages |

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Start the development server

```sh
npm run dev
# or open in browser automatically:
npm run dev -- --open
```

That's it — no database configuration or migrations needed.

## Available Scripts

| Script            | Description                  |
|-------------------|------------------------------|
| `npm run dev`     | Start the Vite dev server    |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview the production build |
| `npm run check`   | Run Svelte type-checking     |

## Project Structure

```
src/
├── routes/
│   ├── +page.svelte                  # Home page — "Generate Lesson" trigger
│   ├── lesson/[id]/
│   │   ├── +page.svelte              # Lesson display (renders content blocks)
│   │   └── +page.server.ts           # Server loader — fetches lesson from store
│   └── api/generate/
│       └── +server.ts                # POST endpoint — assembles & saves lesson
├── lib/
│   ├── components/
│   │   ├── MarkdownBlock.svelte      # Renders theory/text content
│   │   ├── CodeSnippet.svelte        # Renders Python code examples
│   │   └── ConceptCheck.svelte       # Interactive quiz widget
│   └── server/
│       ├── db.ts                     # In-memory content pool & lesson store
│       ├── types.ts                  # Shared TypeScript interfaces
│       └── randomizer.ts             # Content selection algorithm
```

## How It Works

1. User visits `/` and clicks **Generate Lesson**.
2. A `POST /api/generate` request is sent to the server.
3. The server reads the hardcoded `ContentBlock` pool from `db.ts`.
4. `randomizer.ts` selects one block per category: *Theory*, *Python Code*, *Math*.
5. A new `Lesson` record is saved to the in-memory store and the client is redirected to `/lesson/[id]`.
6. SvelteKit renders the lesson using the appropriate component for each block type.

> **Note:** The in-memory lesson store is per-process and does not persist across server restarts.

## Building for Production

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy, install an [adapter](https://svelte.dev/docs/kit/adapters) for your target platform (e.g. `@sveltejs/adapter-vercel` for Vercel).

