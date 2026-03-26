# FitCore Mobile

Expo React Native app for gym members and staff — check-ins, schedules, plans and notifications.

## Commands

```bash
npx expo start --clear    # Start with cache cleared (use when things break)
npx expo start            # Start normally
# Then press: a = Android emulator, i = iOS simulator, s = Expo Go QR code
```

## Structure

```
src/
├── components/   # Reusable React Native UI components
├── screens/      # Full screen components (one per screen)
├── hooks/        # Mobile-specific custom hooks
└── store/        # Zustand state (can reuse from shared)
App.tsx           # Root component
index.ts          # Entry point — do not modify
metro.config.js   # Metro bundler config for monorepo — do not modify
```

## Key Files

- `metro.config.js` — required for monorepo support, sets watchFolders and resolver paths
- `app.json` — Expo config, platforms set to `["ios", "android"]` only (no web)
- `index.ts` — registers root component with Expo

## React Native vs Web Differences

| Web           | Mobile                                |
| ------------- | ------------------------------------- |
| `<div>`       | `<View>`                              |
| `<p>`, `<h1>` | `<Text>`                              |
| `<img>`       | `<Image>`                             |
| `<button>`    | `<TouchableOpacity>` or `<Pressable>` |
| `onClick`     | `onPress`                             |
| CSS           | `StyleSheet.create({})`               |

## Design System

- All UI must follow `DESIGN.md` at the project root — read it before generating any component
- Specifically follow **Section 10 (React Native)** and **Section 11 (Mobile Rules)**
- Import design tokens from `@fit-core/shared/src/theme/tokens.ts` — never hardcode colors
- Always use `StyleSheet.create({})` — never inline styles
- Styles defined at bottom of each file

## Screen Rules

- Screen components go in `src/screens/`, named with `Screen` suffix (e.g. `MemberHomeScreen.tsx`)
- Screens should be lean — delegate logic to hooks
- Navigation props typed with React Navigation types

## Shared Package

Import shared code and design tokens:

```ts
import { formatDate, type Member } from "@fit-core/shared";
import {
  colors,
  spacing,
  borderRadius,
  fontSize,
} from "@fit-core/shared/theme/tokens";
```

Resolved via `tsconfig.json` paths and Metro config.

## Important Notes

- `react-native-web`, `react-dom` are NOT installed — web is handled by the separate Vite app
- Always run `npx expo start --clear` after installing new packages
- Metro config watchFolders must include monorepo root — do not remove this
- Android emulator must be running before pressing `a` in Expo terminal
- If bundling fails: delete `.expo` folder and run `npx expo start --clear`
