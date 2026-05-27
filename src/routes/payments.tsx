import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout shell — list lives in payments.index.tsx, detail in payments.$id.tsx
export const Route = createFileRoute("/payments")({ component: () => <Outlet /> });
