# Tahiry

Personal money manager (Ariary). Offline-first, French UI. Expo + React Native, Android first.

## Stack

- Expo SDK 57, expo-router, TypeScript strict
- NativeWind v4 (Tailwind 3), 4 themes via CSS variables
- lucide-react-native for icons
- react-hook-form + zod for forms
- `@expo/ui/community/bottom-sheet` for sheets (wrapped in `AppSheet`)
- expo-sqlite + drizzle-orm for data, zustand for UI state
- date-fns (fr) for dates
- Google Sans font in `assets/fonts/`

## Structure

```
app/                 routes only, thin: assemble features
src/components/      shared UI (button, card, chip, app-sheet...)
src/features/<name>/ hooks/ types/ schemas/ components/ index.ts
src/db/              schema, migrations, seed, settings
src/theme/           tokens, provider, store
src/lib/             money, dates, helpers
src/constants/
```

## Naming

- All file and folder names: English, kebab-case. Components too: `account-chip.tsx`, `add-transaction.tsx`.
- Routes (URLs) are English: `/history`, `/reminders`, `/add-transaction`.
- UI text is French. Code identifiers, comments, commits and docs are English.
- Components and types: PascalCase. Hooks: `useX` in `use-x.ts`. Zod schemas: `xSchema` in `x-schema.ts`.
- Tests next to the code in `__tests__/`, named `*.test.ts(x)`.

## Architecture rules

- A feature never imports another feature. Shared code goes to `src/components` or `src/lib`.
- Each feature exposes a public API through its `index.ts`. Import from the feature root only.
- Routes in `app/` stay thin: they compose features and shared components, no business logic.
- Import with the `@/` alias (maps to `src/`). No deep relative paths like `../../..`.
- Data access (drizzle queries, writes) lives in feature `hooks/`, never in components.
- Business rules and calculations are pure functions, covered by tests.
- Barrel files (`index.ts`) export only what other modules need.

## Money and data

- Amounts are integers in Ariary. Never use floats for money.
- Format with `src/lib/money.ts`. Mask with `useAmountMask` for hidden-amount mode.
- Dates are stored as epoch milliseconds. Format with `src/lib/dates.ts`.
- Account balances are computed from the initial balance and transactions, never stored.
- Schema changes go through a new entry in `src/db/migrations.ts`. Never edit a shipped migration.
- Multi-step writes use a transaction.

## UI and styling

- Style with NativeWind classes. Avoid inline `style` unless the value is dynamic.
- Colors come from theme tokens (`bg-bg`, `text-ink`, `bg-accent`), never hardcoded hex.
- Use `AppText` for text so the font family is applied.
- Icons: lucide only, `strokeWidth` 1.8 to 2.
- Touch targets are at least 44px. Icon-only buttons need an `accessibilityLabel`.
- Interactive elements use `Pressable` with `accessibilityRole`.
- Sheets use `AppSheet`. Lists that can grow use `FlashList`.
- Support small screens: no fixed widths for text containers, use `flex-1` and `numberOfLines`.

## Forms

- react-hook-form with `zodResolver`. One zod schema per form, in the feature's `schemas/`.
- Validation messages are French and short.
- Inputs that hold amounts store a formatted string and convert with `parseAmount` on submit.

## TypeScript

- Strict mode. No `any`, no non-null `!` without a reason.
- Infer types from zod schemas and drizzle tables instead of redeclaring them.
- Prefer `type` over `interface`. Function components with named exports. Default exports only for route files.

## React

- Keep components small and focused. Extract a hook when logic grows.
- Derive values during render. Use `useMemo` only for real cost.
- No side effects in render. Do not call impure functions (`Date.now`) in render, init them with `useState`.
- Zustand stores hold UI state only (theme, hide amounts, onboarding draft). Persistent data lives in SQLite.

## Security

- PIN and secrets: `expo-secure-store`, PIN stored hashed with a salt, never in SQLite or logs.
- Never log amounts, names or PINs.
- Validate all user input with zod before writing to the database.

## Code style

- Few comments. Short sentences, only when the why is not obvious.
- No dead code, no commented-out code, no leftover `console.log`.
- Prettier + ESLint must pass. Run `npm run format` before committing.

## Testing

- Jest with `jest-expo`. Test pure logic and schemas first (money, balances, validation).
- Fix or add a test with every bug fix.

## Commands

- `npm start` dev server (needs a development build, not Expo Go)
- `npm run android` build and run
- `npm run lint`, `npm run typecheck`, `npm test`, `npm run format`

## Git

- Conventional Commits in English, imperative mood: `feat(scope): add ...`, `fix(scope): ...`, `chore:`, `refactor:`, `docs:`, `test:`.
- Scope is the feature or area (`accounts`, `db`, `ui`, `theme`).
- One commit per feature or fix. Each commit passes typecheck, lint and tests.
- Split a feature into several commits, in this order: data layer (schema, queries, actions, pure logic with tests), UI components, screen and wiring. Never one big commit per feature.
- Name files correctly from the start. Do not rename in a follow-up commit.
- Develop on the assigned branch. No PR unless asked. Never force-push unless asked.
