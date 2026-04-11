# Introvert Chat

A multi-persona journaling app for introverts to organize thoughts across different life domains. Built with Expo SDK 55, React Native 0.83, and React 19.

## Tech Stack

- **Framework:** Expo (SDK 55) with Expo Router for file-based routing
- **Language:** TypeScript (strict mode)
- **State:** Zustand with AsyncStorage persistence
- **Icons:** lucide-react-native
- **Styling:** React Native StyleSheet with a context-based theme provider (dark/light mode via `useColorScheme()`)
- **Animations:** react-native-reanimated, react-native-gesture-handler
- **Keyboard:** react-native-keyboard-controller

## Project Structure

```
app/                  # Expo Router screens and layouts
  (tabs)/             # Tab navigator (Personas list + Settings)
  persona/            # Chat and edit screens
components/           # Reusable UI components
store/                # Zustand stores (personaStore, userStore)
theme/                # Design tokens (colors, spacing)
context/              # React context providers (ThemeContext)
types/                # TypeScript type definitions
utils/                # Helper functions
assets/               # Images and static assets
```

## Key Patterns

- **Path alias:** `@/*` maps to project root (e.g., `@/components/Avatar`)
- **Store hooks:** `usePersonaStore`, `useUserStore` — both persist via `createJSONStorage(() => AsyncStorage)`
- **Theming:** Components use `useColorScheme()` and the `ThemeContext` to access colors. Design tokens live in `theme/colors.ts` and `theme/spacing.ts`.
- **Navigation:** Tab-based primary nav; modals for edit/tasks screens; slide animation for chat
- **Typed routes:** Enabled in app.json (`experiments.typedRoutes`)
- **React Compiler:** Enabled in app.json (`experiments.reactCompiler`)

## Data Model

- **Persona** — has `id`, `name`, `color`, `emoji`, optional `avatar`, `favorite` flag, and `messages[]`
- **Message** — has `id`, `content`, `type`, `timestamp`, optional `checked`. Types: `question`, `answer`, `paragraph`, `header1`, `header2`, `listItem`, `checkbox`

## Running

```bash
bun start              # Start dev server
bun start:demo         # Start with pre-populated demo data (EXPO_PUBLIC_IS_DEMO=1)
bun run build:web      # Export for web
bun run lint           # Run ESLint
```

## Building

Uses EAS Build. Profiles are configured in `eas.json`:
- `development` — dev client, internal distribution
- `preview` — internal distribution for testing
- `production` — production builds with auto-increment

This project uses Continuous Native Generation (no `ios/` or `android/` directories checked in).

## Conventions

- Components use PascalCase filenames
- Formatting: 2 spaces, single quotes, bracket spacing (see `.prettierrc`)
- No barrel exports — import directly from component files
- Long-press for context menus; FAB for primary actions
- Confirmation alerts before destructive actions
