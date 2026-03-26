# FitCore Design System — Kinetic Forge

## 1. Overview

**Creative North Star: "The High-Performance Editorial"**

FitCore uses the Kinetic Forge design system — built for professional, data-driven gym management. The aesthetic balances athletic grit with modern SaaS precision. Clean, authoritative, and energetic.

> When generating UI, always follow this design system exactly.
>
> - **Web:** use semantic Tailwind classes from the CSS theme — NEVER hardcode hex values
> - **Mobile:** use React Native StyleSheet importing from `@fit-core/shared/theme/tokens`
> - Never use default Tailwind color scales, arbitrary values, or hardcoded hex strings
> - All theme changes must be made in ONE place: `index.css` for web, `tokens.ts` for mobile

---

## 2. Color Palette

| Role                | Name           | Hex       | Tailwind Custom    | Usage                                     |
| ------------------- | -------------- | --------- | ------------------ | ----------------------------------------- |
| **Primary/Sidebar** | Midnight Navy  | `#0f172a` | `bg-navy`          | Sidebar, dark backgrounds                 |
| **Accent/Action**   | Electric Green | `#22c55e` | `bg-green-500`     | Buttons, success, active indicators       |
| **Background**      | Neutral White  | `#ffffff` | `bg-white`         | Main content area                         |
| **Surface**         | Ghost Gray     | `#f7f9fb` | `bg-gray-50`       | Secondary backgrounds, section containers |
| **Border**          | Slate Stroke   | `#e2e8f0` | `border-slate-200` | Card borders, table dividers, inputs      |
| **Text Primary**    | Deep Slate     | `#1e293b` | `text-slate-800`   | Headings, body copy                       |
| **Text Secondary**  | Muted Slate    | `#64748b` | `text-slate-500`   | Subtext, labels, placeholders             |

### Status Colors

| State           | Hex       | Usage                                |
| --------------- | --------- | ------------------------------------ |
| Success/Paid    | `#22c55e` | Paid status, positive trends         |
| Warning/Pending | `#f59e0b` | Pending payments, warnings           |
| Error/Overdue   | `#ef4444` | Overdue, errors, destructive actions |

---

## 3. Typography

**Font Family:** Inter (Sans-serif) — import from Google Fonts.

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
  rel="stylesheet"
/>
```

| Element                 | Weight           | Class                         | Tracking         |
| ----------------------- | ---------------- | ----------------------------- | ---------------- |
| Display/Hero            | Black            | `font-black`                  | `tracking-tight` |
| Page Heading (H1)       | Bold             | `font-bold`                   | `tracking-tight` |
| Section Heading (H2/H3) | Semibold         | `font-semibold`               | `tracking-tight` |
| Body                    | Regular/Medium   | `font-normal` / `font-medium` | default          |
| Labels/Stats            | Bold + Uppercase | `font-bold uppercase`         | `tracking-wide`  |
| Subtext/Captions        | Regular          | `font-normal`                 | default          |

---

## 4. Layout

### App Shell

```
┌──────────────┬────────────────────────────────┐
│              │                                │
│   Sidebar    │        Main Content            │
│  (240px)     │        (flex-1)                │
│  #0f172a     │        #ffffff                 │
│              │                                │
└──────────────┴────────────────────────────────┘
```

- Sidebar width: `w-60` (240px), fixed, full height
- Content area: `flex-1`, scrollable, `bg-white`
- Content padding: `p-8`
- Max content width: `max-w-7xl mx-auto`

---

## 5. Components

### Sidebar Navigation

```
Background:     #0f172a (Midnight Navy)
Logo area:      p-6, border-bottom slate-700
Nav items:      px-4 py-3, rounded-lg
Active state:   border-l-4 border-green-500, bg-slate-800, text-white
Hover state:    bg-slate-800, text-white, transition 200ms
Icon color:     text-slate-400 → text-white on hover/active
Text:           text-slate-300 → text-white on hover/active
```

### Cards

```
Background:     bg-white
Border:         border border-slate-200
Border radius:  rounded-lg (8px)
Shadow:         shadow-sm
Padding:        p-6 (default) or p-8 (large)
Hover:          shadow-md transition-shadow duration-200
```

### Buttons

**Primary:**

```
bg-green-500 hover:bg-green-600
text-white font-semibold
px-4 py-2 rounded-lg
transition-all duration-200
active:scale-95
```

**Ghost/Secondary:**

```
bg-transparent
border border-green-500
text-green-500 hover:bg-green-50
px-4 py-2 rounded-lg
transition-all duration-200
```

**Destructive:**

```
bg-red-500 hover:bg-red-600
text-white font-semibold
px-4 py-2 rounded-lg
```

### Input Fields

```
border border-slate-200
rounded-lg
px-3 py-2
text-slate-800
placeholder:text-slate-400
focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
transition duration-200
```

### Status Chips/Badges

```
Paid/Success:   bg-green-100 text-green-700 border border-green-200
Pending:        bg-amber-100 text-amber-700 border border-amber-200
Overdue/Error:  bg-red-100 text-red-700 border border-red-200

All chips:      px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide
```

### Tables

```
Header row:     bg-gray-50 text-slate-500 text-xs font-semibold uppercase tracking-wide
Body rows:      bg-white border-b border-slate-100
Hover row:      bg-gray-50 transition-colors duration-150
Cell padding:   px-6 py-4
```

### Stat/Metric Cards

```
Layout:         flex column, gap-1
Value:          text-3xl font-black text-slate-800 tracking-tight
Label:          text-sm font-medium text-slate-500 uppercase tracking-wide
Trend up:       text-green-500 flex items-center gap-1 (↑ arrow icon)
Trend down:     text-red-500 flex items-center gap-1 (↓ arrow icon)
```

---

## 6. Motion & Transitions

All interactive elements use:

```css
transition-all duration-200 ease-in-out
```

| Interaction      | Effect                           |
| ---------------- | -------------------------------- |
| Button click     | `active:scale-95`                |
| Card hover       | `hover:shadow-md`                |
| Nav item hover   | background + text color change   |
| Input focus      | green ring appears               |
| Page transitions | `opacity-0 → opacity-100`, 200ms |

---

## 7. Data Visualization

- **Primary data** (bars, lines): `#22c55e` Electric Green
- **Secondary data**: tonal shifts of navy (`#1e293b`, `#334155`)
- **Grid lines**: `#e2e8f0` Slate Stroke
- **Axis labels**: `#64748b` Muted Slate, `text-xs`
- Always show trend direction with colored arrows next to metrics

---

## 8. Design Principles

1. **Density over Clutter** — information dense but organized through clear visual hierarchy
2. **Trend Awareness** — always emphasize progress with arrows and color coding
3. **Kinetic Motion** — subtle 200ms transitions make the interface feel alive
4. **Editorial Feel** — generous whitespace (`p-6`, `p-8`) inside cards and sections
5. **No Generic UI** — never use default gray buttons or unstyled components

---

## 9. Claude Code UI Generation Rules

When generating any UI component or page:

1. **Always use Inter font** — already applied globally via CSS variable, no need to import manually
2. **Never use hardcoded hex colors** — the theme system handles this centrally
3. **Never use arbitrary Tailwind values** like `bg-[#0f172a]` or `text-[#22c55e]` or `border-[#e2e8f0]`
4. **Always use semantic Tailwind class names** defined in the CSS theme (`index.css`):

   | Token               | Semantic Class                | Do NOT use                             |
   | ------------------- | ----------------------------- | -------------------------------------- |
   | Midnight Navy       | `bg-navy`                     | `bg-[#0f172a]`, `bg-slate-900`         |
   | Electric Green bg   | `bg-green`                    | `bg-[#22c55e]`, `bg-green-500`         |
   | Electric Green text | `text-green`                  | `text-[#22c55e]`, `text-green-500`     |
   | Ghost Gray          | `bg-ghost`                    | `bg-[#f7f9fb]`, `bg-gray-50`           |
   | Text Primary        | `text-primary`                | `text-[#1e293b]`, `text-slate-800`     |
   | Text Secondary      | `text-secondary`              | `text-[#64748b]`, `text-slate-500`     |
   | Border              | `border-stroke`               | `border-[#e2e8f0]`, `border-slate-200` |
   | Success             | `bg-success` / `text-success` | `bg-green-500`, `text-green-600`       |
   | Warning             | `bg-warning` / `text-warning` | `bg-amber-500`, `text-amber-600`       |
   | Error               | `bg-error` / `text-error`     | `bg-red-500`, `text-red-600`           |
   | Transition          | `duration-DEFAULT`            | `duration-200`                         |

5. **For JS/TS libraries** that require actual hex strings (recharts, chart.js, animated APIs):

   ```ts
   import { theme } from "../../theme";
   // use theme.hex.green, theme.hex.navy, theme.hex.border etc.
   // never hardcode hex strings in component files
   ```

6. **Card pattern** — always use exactly:

   ```
   bg-white border border-stroke rounded-lg shadow-sm
   ```

7. **Button patterns:**
   - Primary: `bg-green hover:bg-green-hover text-white font-semibold px-4 py-2 rounded-lg duration-DEFAULT active:scale-95`
   - Ghost: `bg-transparent border border-green text-green hover:bg-ghost px-4 py-2 rounded-lg duration-DEFAULT`
   - Destructive: `bg-error hover:opacity-90 text-white font-semibold px-4 py-2 rounded-lg duration-DEFAULT`

8. **Status badge pattern** — always use exactly:

   ```
   Paid/Success:  bg-success/10 text-success border border-success
   Pending:       bg-warning/10 text-warning border border-warning
   Overdue/Error: bg-error/10 text-error border border-error
   All:           px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide
   ```

9. **All transitions** — always `duration-DEFAULT ease-in-out`

10. **Use placeholder/dummy data** unless real data is explicitly provided

11. **File locations:**
    - Reusable components → `client/apps/web/src/components/`
    - Page components → `client/apps/web/src/pages/`
    - Theme utilities → `client/apps/web/src/theme/index.ts`

12. **Never inline styles** — always use Tailwind semantic classes
13. **Never use default Tailwind gray/blue/green scales directly** — always go through the semantic layer

---

## 10. React Native (Mobile) Implementation

> This section is for `apps/mobile`. All design tokens are identical to web — only the implementation differs.

### Design Tokens (shared constants)

Create this file at `client/packages/shared/src/theme/tokens.ts` and import in both web and mobile:

```ts
export const colors = {
  // Core
  navy: "#0f172a",
  green: "#22c55e",
  greenHover: "#16a34a",
  white: "#ffffff",
  ghostGray: "#f7f9fb",

  // Borders
  border: "#e2e8f0",

  // Text
  textPrimary: "#1e293b",
  textSecondary: "#64748b",

  // Status
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",

  // Status backgrounds
  successBg: "#dcfce7",
  warningBg: "#fef3c7",
  errorBg: "#fee2e2",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  full: 9999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  display: 32,
} as const;

export const fontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  black: "900" as const,
} as const;
```

---

### Typography (React Native)

Install Expo Google Fonts:

```bash
npx expo install @expo-google-fonts/inter expo-font
```

Load in `App.tsx`:

```tsx
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  if (!fontsLoaded) return null;
  // ...
}
```

Font usage in StyleSheet:

```ts
// Display/Hero
{ fontFamily: 'Inter_900Black', fontSize: 32, letterSpacing: -0.5 }

// Page Heading
{ fontFamily: 'Inter_700Bold', fontSize: 24, letterSpacing: -0.3 }

// Section Heading
{ fontFamily: 'Inter_600SemiBold', fontSize: 18 }

// Body
{ fontFamily: 'Inter_400Regular', fontSize: 16 }

// Labels/Stats (uppercase)
{ fontFamily: 'Inter_700Bold', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.8 }

// Subtext
{ fontFamily: 'Inter_400Regular', fontSize: 14 }
```

---

### Mobile Layout

Mobile uses **bottom tab navigation** instead of a sidebar:

```
┌─────────────────────────┐
│     Header / Top bar    │  backgroundColor: '#0f172a'
├─────────────────────────┤
│                         │
│      Screen Content     │  backgroundColor: '#ffffff'
│      (ScrollView)       │
│                         │
├─────────────────────────┤
│  Dashboard │ Members    │  backgroundColor: '#0f172a'
│  Plans     │ Profile    │  activeColor: '#22c55e'
└─────────────────────────┘
```

```ts
// Tab bar style
tabBarStyle: {
  backgroundColor: '#0f172a',
  borderTopColor: '#1e293b',
  height: 60,
  paddingBottom: 8,
}

// Tab bar label
tabBarActiveTintColor: '#22c55e',
tabBarInactiveTintColor: '#64748b',
```

---

### Mobile Components (StyleSheet)

#### Cards

```ts
card: {
  backgroundColor: '#ffffff',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#e2e8f0',
  padding: 16,
  // Android shadow
  elevation: 2,
  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
}
```

#### Primary Button

```ts
buttonPrimary: {
  backgroundColor: '#22c55e',
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 16,
  alignItems: 'center',
},
buttonPrimaryText: {
  color: '#ffffff',
  fontFamily: 'Inter_600SemiBold',
  fontSize: 16,
},
```

#### Ghost Button

```ts
buttonGhost: {
  backgroundColor: 'transparent',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#22c55e',
  paddingVertical: 12,
  paddingHorizontal: 16,
  alignItems: 'center',
},
buttonGhostText: {
  color: '#22c55e',
  fontFamily: 'Inter_600SemiBold',
  fontSize: 16,
},
```

#### Input Fields

```ts
input: {
  borderWidth: 1,
  borderColor: '#e2e8f0',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 12,
  fontSize: 16,
  fontFamily: 'Inter_400Regular',
  color: '#1e293b',
  backgroundColor: '#ffffff',
},
// Apply on focus via state:
inputFocused: {
  borderColor: '#22c55e',
  borderWidth: 2,
},
```

#### Status Badges

```ts
badgeSuccess: {
  backgroundColor: '#dcfce7',
  borderRadius: 9999,
  paddingVertical: 2,
  paddingHorizontal: 10,
  borderWidth: 1,
  borderColor: '#22c55e',
},
badgeSuccessText: {
  color: '#16a34a',
  fontFamily: 'Inter_700Bold',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
},
// Same pattern for warning (#fef3c7 bg, #f59e0b border, #b45309 text)
// and error (#fee2e2 bg, #ef4444 border, #b91c1c text)
```

#### Stat/Metric Cards

```ts
statValue: {
  fontFamily: 'Inter_900Black',
  fontSize: 32,
  color: '#1e293b',
  letterSpacing: -0.5,
},
statLabel: {
  fontFamily: 'Inter_600SemiBold',
  fontSize: 12,
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: 0.8,
  marginTop: 4,
},
trendUp: {
  color: '#22c55e',
  fontFamily: 'Inter_600SemiBold',
  fontSize: 13,
},
trendDown: {
  color: '#ef4444',
  fontFamily: 'Inter_600SemiBold',
  fontSize: 13,
},
```

---

### Motion & Animations (React Native)

Use `Animated` API or `react-native-reanimated`:

```ts
// Button press feedback — use TouchableOpacity
<TouchableOpacity activeOpacity={0.8} onPress={handlePress}>

// Page transitions — use Animated.Value
const opacity = useRef(new Animated.Value(0)).current;
Animated.timing(opacity, {
  toValue: 1,
  duration: 200,
  useNativeDriver: true,
}).start();

// For more complex animations install:
npx expo install react-native-reanimated
```

---

## 11. Claude Code Mobile UI Generation Rules

When generating any mobile UI component or screen:

1. **Always import and use tokens** from `@fit-core/shared/theme/tokens`
2. **Always use Inter font** — loaded via `@expo-google-fonts/inter`
3. **Never use StyleSheet colors directly** — always reference `colors.navy`, `colors.green` etc.
4. **Cards always have** `elevation: 2` (Android) + `shadowOpacity: 0.05` (iOS)
5. **All animations use** `duration: 200, useNativeDriver: true`
6. **Bottom tabs background** is always `colors.navy`
7. **Active tab color** is always `colors.green`
8. **Use placeholder/dummy data** unless real data is provided
9. **Screen components go in** `client/apps/mobile/src/screens/`
10. **Reusable components go in** `client/apps/mobile/src/components/`
11. **Never use inline styles** — always use `StyleSheet.create({})`
12. **Always handle both Android and iOS** shadow implementations

- Tailwind v4 CSS-first config in client/apps/web/src/index.css via @theme
  {} block
- Never use raw Tailwind color scales (slate-800, green-500, etc.) — use
  semantic tokens only
- Opacity modifier syntax works: bg-success/10, text-secondary/30
