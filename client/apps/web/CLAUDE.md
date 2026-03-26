# FitCore Web

Gym admin dashboard — manage members, plans, staff, schedules and payments.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run preview  # Preview production build locally
```

## Structure

```
src/
├── components/   # Reusable UI components
├── pages/        # Route-level components (one file per route)
├── hooks/        # Web-specific custom hooks
├── services/     # Web-specific API calls
├── store/        # Zustand state management
└── utils/        # Web-specific helper functions
```

## Key Files

- `vite.config.ts` — Vite config with `@fit-core/shared` alias
- `src/main.tsx` — app entry point
- `src/App.tsx` — router setup

## Routing

Uses `react-router-dom`. All routes defined in `src/App.tsx`.
Page components go in `src/pages/`, named after the route (e.g. `MembersPage.tsx`).

- Uses react-router-dom v6 with a layout route pattern
- AppShell is the single layout component — defined once in App.tsx, never
  imported in pages
- To add a new page: (1) add a <Route> in App.tsx, (2) add the title in
  ROUTE_TITLES in AppShell.tsx

App.tsx
└── BrowserRouter
└── Routes
└── <Route element={<AppShell />}> ← layout, renders once
├── <Route path="/" element={<DashboardPage />} />
└── <Route path="/members" element={<MembersListPage />} />

## Design System

- All UI must follow `DESIGN.md` at the project root — read it before generating any component
- Tailwind CSS for all styling — no custom CSS files
- Never use default Tailwind colors — always use exact colors defined in DESIGN.md
- Font is Inter — always imported in index.html

## Component Rules

- Functional components only, no class components
- One component per file
- Always export as default from pages, named export from components
- Props interfaces defined in the same file as the component

## Shared Package

Import shared code like this:

```ts
import { formatDate, type Member } from "@fit-core/shared";
```

The alias is configured in `vite.config.ts` — do not change it.

## Important Notes

- Never put business logic directly in page components — use hooks
- API calls go in `src/services/` or `packages/shared/src/services/`
- Environment variables must be prefixed with `VITE_` to be accessible in browser
