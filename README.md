# NeeterCode

A Next.js learning and interview-practice frontend inspired by NeetCode. The app currently uses local mock data while backend/auth/submission services are still pending.

## Stack

- Next.js App Router with route groups for the marketing app and problem workspace
- React 19, TypeScript, Tailwind CSS 4, shadcn/Base UI primitives
- Monaco editor for the workspace code editor
- Local typed data in `lib/` for courses, practice lists, roadmap links, and showcase problem content

## Scripts

```bash
bun install
bun run dev
bun run lint
bun run typecheck
bun run build
```

## Project Shape

- `app/(main)` contains the public pages: home, courses, roadmap, and practice.
- `app/(workspace)` contains the focused problem-solving workspace.
- `components/workspace` contains the resizable editor/question/console layout.
- `components/practice-dashboard` contains extracted practice dashboard pieces shared by `components/practice-dashboard.tsx`.
- `lib/problem-workspace.ts` owns the typed showcase problem prompt, starter code, examples, and test cases.

## Current Product Assumptions

- Mock data is intentional until the backend is ready.
- Unknown problem routes intentionally fall back to the showcase problem.
- Practice table problem links intentionally point at the showcase route for now.
- CLI/dev-only packages are kept in `package.json` for local tooling workflows.
