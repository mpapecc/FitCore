# FitCore Client

Gym management app — monorepo with web dashboard and mobile app for gym owners, staff, and members.

## Structure

```
client/
├── apps/
│   ├── web/        # Vite + React + TypeScript (gym admin dashboard)
│   └── mobile/     # Expo + React Native + TypeScript (member & staff app)
└── packages/
    └── shared/     # Shared types, utils, hooks, services
```

## Commands

```bash
npm run web        # Start web dev server (runs from root)
npm run mobile     # Start Expo mobile dev server (runs from root)
npm install        # Install all workspace dependencies from root
```

## Tech Stack

- **Language:** TypeScript throughout (strict mode, no `any`)
- **Web:** Vite, React 19, react-router-dom
- **Mobile:** Expo SDK 51, React Native 0.74
- **Shared:** Vanilla TypeScript, no framework dependencies
- **Package manager:** npm workspaces

## Monorepo Rules

- Shared business logic, types, and API services belong in `packages/shared`
- App-specific UI code stays in its own app folder
- Always run `npm install` from root, never from inside an app folder
- Shared package name is `@fit-core/shared`

## TypeScript Rules

- Strict mode enabled everywhere
- `skipLibCheck: true` in all tsconfig files
- Always define return types on functions
- Shared interfaces live in `packages/shared/src/types/index.ts`
- No `any` — use `unknown` if type is truly unknown

## Naming Conventions

- Components: PascalCase (`MemberCard.tsx`)
- Hooks: camelCase with `use` prefix (`useMemberList.ts`)
- Utils: camelCase (`formatDate.ts`)
- Types/Interfaces: PascalCase (`Member`, `GymPlan`)
- Files: kebab-case for non-components (`api-client.ts`)

## Git

- Branch naming: `feature/`, `fix/`, `chore/` prefixes
- Never commit `.env` files
- Keep `node_modules` in `.gitignore`