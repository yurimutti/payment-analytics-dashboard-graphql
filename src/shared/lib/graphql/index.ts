/**
 * GraphQL client wrapper — Apollo Client re-exports
 *
 * Import everything GraphQL-related from here.
 * Feature code must NOT import from "@apollo/client" directly.
 *
 * Usage:
 *   import { useQuery, gql } from "@/shared/lib/graphql";
 */

// ─── Hooks ────────────────────────────────────────────────────────────────────
export { useQuery, useLazyQuery, useMutation } from "@apollo/client";

// ─── Query definition tag ─────────────────────────────────────────────────────
export { gql } from "@apollo/client";

// ─── Conditional query skip  (Apollo v3.8+) ───────────────────────────────────
export { skipToken } from "@apollo/client";

// ─── Types ────────────────────────────────────────────────────────────────────
export type { ApolloError } from "@apollo/client";
export type { QueryResult, OperationVariables } from "@apollo/client";
