# CommitForge

CommitForge is a premium Next.js 15 habit tracker built around a hero mechanic: the Commitment Bar. Each goal owns a mini tracker. Every completed micro-task raises the goal tracker and feeds the global bar, creating a single addictive measure of how much of your life is actively moving.

## Stack

- Next.js 15 App Router
- TypeScript strict mode
- Tailwind CSS + shadcn-style primitives
- Framer Motion
- Prisma + PostgreSQL
- NextAuth v5
- Vercel AI SDK + OpenAI
- Zustand for live commitment updates
- Recharts for commitment history

## Folder Structure

```text
app
  /api
  /auth
  /dashboard
  /goals
  /onboarding
  /settings
components
  /ui
  /commitment
  /goals
  /layout
lib
  /prisma
  /ai
/hooks
/types
```

## Commitment Math

Default implementation:

- Goal mini tracker = completed micro-tasks / total micro-tasks
- Main Commitment Bar = average of all active goal mini trackers
- With 5 goals, each goal contributes exactly 20%

Alternative mode included in settings:

- Weighted commitment = completed micro-tasks across all goals / total micro-tasks across all goals

The default equal-lane version is cleaner for onboarding and better supports the product story, so it is the shipped default.

## Environment Variables

Copy `.env.example` to `.env.local`.

```bash
DATABASE_URL=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
RESEND_API_KEY=
EMAIL_FROM=
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npm run db:generate
```

3. Create and migrate the database:

```bash
npm run db:migrate
```

4. Seed demo data:

```bash
npm run db:seed
```

5. Start development:

```bash
npm run dev
```

## shadcn/Tailwind Setup

The repo already includes:

- `components.json`
- `tailwind.config.ts`
- `app/globals.css`
- reusable primitives in `components/ui`

If you want to regenerate or add components with the CLI:

```bash
npx shadcn@latest add button card input textarea dialog switch
```

## Prisma Commands

```bash
npm run db:generate
npm run db:migrate
npm run db:push
```

## Vercel Deployment Notes

- Set all environment variables in Vercel.
- Use a hosted PostgreSQL instance or Supabase Postgres.
- Build command: `npm run build`
- Install command: `npm install`

## AI Prompt Template

The app uses this system prompt for goal breakdowns:

```text
You are CommitForge, a premium strategic habit architect. Break a meaningful life goal into a realistic execution ladder.

Rules:
- Return 8 to 20 micro-tasks.
- Tasks must be concrete, trackable, and phrased as actions.
- Prefer daily or weekly behaviors over vague milestones.
- Mix consistency tasks and advancement tasks.
- Respect the timeline and the ambition of the outcome.
- Avoid duplicate tasks and avoid platitudes.
- Do not include numbering in the description.
- The user needs momentum quickly, so the first three tasks should feel immediately doable.
- The plan should feel elite, humane, and sustainable.
```

## Notes

- The onboarding gate requires 5 goals before `/dashboard` opens.
- Confetti fires at 25, 50, 75, and 100 commitment.
- Settings support a personal OpenAI key override.
- The app is intentionally desktop-first, optimized for 1440px and wider.
