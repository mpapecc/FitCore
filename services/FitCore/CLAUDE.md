# FitCore API

ASP.NET Core Web API backend for FitCore gym management app.

## Location

```
services/FitCore/
├── FitCore.slnx
└── FitCore.Api/               ← Web API project
    ├── Controllers/
    ├── Application            # Services and infrastructure interfaces  
    ├── Features/              # CQRS feature folders
    ├── Repositories/
    ├── Models/
    │   ├── Entities/          # EF Core entities (DB tables)
    │   └── DTOs/              # Request/Response objects
    ├── Infrastructure/        # EF Core DbContext, migrations
    ├── Program.cs
    └── appsettings.json
```

## Commands

```bash
# Run from services/FitCore/
dotnet run --project FitCore.Api        # Start dev server (http://localhost:5000)
dotnet build                            # Build solution
dotnet test                             # Run all tests

# Entity Framework (run from FitCore.Api/)
dotnet ef migrations add <MigrationName>
dotnet ef database update
dotnet ef migrations list
```

## Tech Stack

- **Framework:** ASP.NET Core Web API (.NET 10)
- **Database:** PostgreSQL via Entity Framework Core
- **ORM:** EF Core with code-first migrations
- **Pattern:** CQRS with MediatR + Repository pattern
- **Validation:** FluentValidation
- **Auth:** JWT Bearer tokens

## Architecture Patterns

### CQRS with MediatR
Every feature is organized into Commands and Queries:

```
Features/
└── Members/
    ├── Commands/
    │   ├── CreateMember/
    │   │   ├── CreateMemberCommand.cs      # IRequest<T>
    │   │   ├── CreateMemberHandler.cs      # IRequestHandler<T>
    │   │   └── CreateMemberValidator.cs    # FluentValidation
    │   └── UpdateMember/
    │       └── ...
    └── Queries/
        └── GetMembers/
            ├── GetMembersQuery.cs
            └── GetMembersHandler.cs
```

### Repository Pattern
- Define interface in `Repositories/Interfaces/` (e.g. `IMemberRepository.cs`)
- Implement in `Repositories/` (e.g. `MemberRepository.cs`)
- Register both in `Program.cs`
- Inject interface, never concrete class

### DTOs
- Request DTOs: suffix with `Request` (e.g. `CreateMemberRequest`)
- Response DTOs: suffix with `Response` (e.g. `MemberResponse`)
- Never expose EF Core entities directly from controllers

## API Conventions

- Base URL: `http://localhost:5000`
- All routes prefixed with `/api/`
- Route naming: kebab-case (`/api/gym-plans`, `/api/gym-members`)
- Standard response wrapper:

```csharp
public class ApiResponse<T>
{
    public T? Data { get; set; }
    public string Message { get; set; } = string.Empty;
    public bool Success { get; set; }
    public List<string> Errors { get; set; } = [];
}
```

## C# Conventions

- Nullable reference types enabled — handle nulls explicitly
- Use `record` types for DTOs and Commands/Queries
- Use `async/await` throughout, suffix async methods with `Async`
- Primary constructors for dependency injection where appropriate
- No business logic in Controllers — delegate to MediatR handlers

## Database

- PostgreSQL connection string in `appsettings.Development.json` (never commit)
- All DB access through EF Core DbContext
- Entities in `Models/Entities/`, one file per entity
- Always create a migration after changing entities

## Connecting to Frontend

When adding a new endpoint, also update:
1. `client/packages/shared/src/types/index.ts` — add matching TypeScript interface
2. `client/packages/shared/src/services/` — add API call function
3. Export new types/services from `client/packages/shared/src/index.ts`

TypeScript interface should mirror the C# response DTO exactly:
```csharp
// C# DTO
public record MemberResponse(Guid Id, string Name, string Email);
```
```ts
// Matching TypeScript type in shared package
export interface Member {
  id: string;
  name: string;
  email: string;
}
```

## Important Notes

- Never put connection strings or secrets in `appsettings.json` — use `appsettings.Development.json` locally
- Always validate requests with FluentValidation, never manually in handlers
- Run `dotnet ef database update` after pulling new migrations
- Swagger UI available at `http://localhost:5000/swagger` in development