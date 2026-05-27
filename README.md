<div align="center">

<img src="./public/logo.svg" width="84" alt="PayDash logo" />

# PayDash

**Payment analytics dashboard built on a GraphQL backend**
React 19 · Vite 6 · Apollo · TanStack Router · Tailwind v4

<p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Apollo%20Client-3.13-311C87?logo=apollographql&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vitest-passing-6E9F18?logo=vitest&logoColor=white" />
  <img src="https://img.shields.io/badge/Playwright-passing-45BA4B?logo=playwright&logoColor=white" />
  <img src="https://img.shields.io/badge/Biome-clean-60A5FA?logo=biome&logoColor=white" />
</p>

</div>

---

## End-to-end flow

<p align="center">
  <img src="./docs/architecture.svg" alt="React → Hook → Apollo → Vite proxy → GraphQL flow" width="100%" />
</p>

A page calls its per-slice **hook** (`use-*-query.ts`) — the hook wraps Apollo's `useQuery` and parses errors into a friendly message. **Apollo Client** holds the normalized cache and follows `cache-and-network` + `errorPolicy: "all"` (so partial data still renders). On dev, requests go to `/api/graphql`, which the **Vite proxy** rewrites onto the upstream **GraphQL API** with an `Authorization: API_KEY` header that never reaches the browser bundle.

**GraphQL Codegen** feeds typed `data` + `variables` into every hook at build time. **T3-env + Zod** validates `VITE_GRAPHQL_ENDPOINT` at startup. **Vitest + RTL** swap Apollo with `MockedProvider` for unit/behavior tests; **Playwright** hits the real path through the Vite proxy.

---

## Quick start

```bash
cp .env.example .env       # fill API_KEY + VITE_GRAPHQL_ENDPOINT
npm install
npm run codegen            # generate GraphQL types
npm run dev                # http://localhost:5173
```

### Environment

| Var | Scope |
|---|---|
| `API_KEY` | **Server-only** — injected by the Vite dev proxy, never bundled into client JS |
| `VITE_GRAPHQL_ENDPOINT` | Client; validated at startup via Zod (`@t3-oss/env-core`) |

---

## Stack

- **React 19** + **TypeScript 5.8** + **Vite 6**
- **Apollo Client 3.13** + **GraphQL Code Generator** (`client-preset` + `near-operation-file`)
- **`@0no-co/graphqlsp`** — TS LSP plugin for inline `graphql(\`…\`)` autocomplete + schema validation
- **TanStack Router** (file-based) + **`routeTree.gen.ts`**
- **Tailwind CSS v4** + **shadcn/ui** + **Recharts**
- **Biome 2.4** for lint + format (replaces ESLint + Prettier)
- **Vitest** + **React Testing Library** + Apollo `MockedProvider`
- **Playwright** (chromium) for E2E
- **`@t3-oss/env-core`** + **Zod** for typed env

---

## Scripts

| Command | What |
|---|---|
| `dev` / `build` / `preview` | Vite |
| `typecheck` | `tsc --noEmit` |
| `codegen` / `codegen:watch` | GraphQL types |
| `lint` / `format` / `check` / `check:fix` | Biome |
| `test` / `test:watch` / `test:ui` | Vitest — 27 tests |
| `test:e2e` / `test:e2e:ui` / `test:e2e:report` | Playwright — 2 specs |

Run both test layers:

```bash
npm run test && npm run test:e2e
```
