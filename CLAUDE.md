# FitCore

Gym management app — full stack monorepo with React frontend and ASP.NET Core backend.

## Structure

```
FitCore/
├── client/                        # Frontend (React web + React Native mobile)
│   ├── apps/web/                  # Vite + React + TypeScript (admin dashboard)
│   ├── apps/mobile/               # Expo + React Native (member & staff app)
│   └── packages/shared/           # Shared types, utils, hooks, services
└── services/
    └── FitCore/                   # Backend (.NET solution)
        ├── FitCore.slnx
        └── FitCore.Api/           # ASP.NET Core Web API project
```

## Commands

```bash
# Frontend (run from client/)
npm run web                        # Start web dev server
npm run mobile                     # Start Expo mobile dev server

# Backend (run from services/FitCore/)
dotnet run --project FitCore.Api   # Start API server
dotnet build                       # Build solution
dotnet test                        # Run tests
```

## Tech Stack

| Layer | Technology |
|---|---|
| Web frontend | Vite + React 19 + TypeScript |
| Mobile | Expo SDK 51 + React Native |
| Shared frontend | TypeScript package (`@fit-core/shared`) |
| Backend | ASP.NET Core Web API (.NET 8) |
| Database | PostgreSQL + Entity Framework Core |
| Auth | JWT Bearer tokens |

## Cross-Folder Workflow

When asked to implement a feature end-to-end:
1. Check endpoint in `services/FitCore/FitCore.Api/Controllers/`
2. Check models/DTOs in `services/FitCore/FitCore.Api/`
3. Create matching TypeScript types in `client/packages/shared/src/types/`
4. Create matching API service in `client/packages/shared/src/services/`
5. Use service in `client/apps/web/` or `client/apps/mobile/`

## API

- Base URL (dev): `http://localhost:5000`
- All responses follow: `{ data, message, success, errors }`
- Auth: JWT Bearer token in `Authorization` header

## Naming Conventions

| Context | Convention | Example |
|---|---|---|
| C# classes | PascalCase | `MemberController` |
| C# methods | PascalCase | `GetAllMembers()` |
| TypeScript types | PascalCase | `Member` |
| TypeScript functions | camelCase | `getMembers()` |
| TypeScript files | kebab-case | `member-service.ts` |
| API routes | kebab-case | `/api/gym-members` |

## Key Reference Files

Always read these files before building any feature or UI:

| File | When to read |
|---|---|
| `PRODUCT.md` | Before building ANY screen, component, or feature — defines roles, access rules, and business logic |
| `DESIGN.md` | Before building ANY UI — defines colors, typography, and component styles |
| `PROGRESS.md` | At the START of every session — shows what is built, decisions made, and where to continue |

## Design System

- All frontend UI follows `DESIGN.md` in the project root
- Design system name: Kinetic Forge
- Style: High-Performance Editorial — dark sidebar, white content, Electric Green accent
- Always read `DESIGN.md` before generating any UI component

## Important Notes

- Never commit `.env` files or `appsettings.Development.json` with real secrets
- TypeScript types in `client/packages/shared` should mirror C# DTOs in the API
- Always keep shared types in sync when API contracts change