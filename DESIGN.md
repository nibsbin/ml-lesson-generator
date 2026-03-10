Gemini said
ML Lesson Generator: Minimal Design Document
1. System Overview
A lightweight web application designed to dynamically assemble and serve randomized Machine Learning lesson modules. It utilizes SvelteKit for both server-side generation logic and client-side rendering.

2. Architecture Stack

Framework: SvelteKit (managing both UI and API endpoints).

Styling: Tailwind CSS (for rapid, standardized UI component design).

Database: PostgreSQL or SQLite (via Prisma ORM) to store the modular content pools.

Deployment: Vercel or Cloudflare Pages.

3. Core Directory Structure

src/routes/ (Frontend & Routing)

+page.svelte: Primary interface with the "Generate Lesson" trigger.

lesson/[id]/+page.svelte: Dynamic rendering of the generated lesson.

lesson/[id]/+page.server.ts: Server-side loader that fetches the specific compiled lesson.

src/routes/api/generate/ (Backend Logic)

+server.ts: Endpoint that pulls random content blocks from the database, compiles them into a cohesive lesson object, and returns a redirect to the new lesson ID.

src/lib/components/ (UI Modules)

MarkdownBlock.svelte, CodeSnippet.svelte, ConceptCheck.svelte.

src/lib/server/ (Internal Services)

db.ts: Database connection pool.

randomizer.ts: The selection algorithm that ensures diverse content generation (e.g., balancing theory, code, and math).

4. Data Flow

User clicks "Generate" on the client.

POST request is sent to /api/generate.

Server queries the database for available ML content blocks.

randomizer.ts samples blocks across predefined categories (e.g., 1 Theory block, 1 Code block, 1 Quiz block).

Server saves the compiled LessonObject and redirects the client to /lesson/[id].

SvelteKit renders the components.

5. Core Data Model

ContentBlock Table:

id (UUID)

domain (String: e.g., "Computer Vision", "Transformers", "Optimization")

type (String: e.g., "Theory", "Python Code", "Math")

payload (Text/Markdown)

difficulty_level (Integer)

Would you like me to draft the SvelteKit API route (+server.ts) for the core randomization logic?