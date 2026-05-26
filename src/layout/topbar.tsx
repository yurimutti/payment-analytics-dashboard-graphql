import { useRouterState } from "@tanstack/react-router";

const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": { title: "Analytics", description: "KPIs and payment trends over time" },
  "/payments": { title: "Payments", description: "Browse and filter all transactions" },
};

export function Topbar() {
  const { location } = useRouterState();
  const segment = "/" + location.pathname.split("/").filter(Boolean)[0];
  const meta = ROUTE_META[segment === "/" ? "/" : segment] ??
               ROUTE_META[location.pathname] ??
               { title: "", description: "" };

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-hairline bg-canvas px-6 py-3">
      <div>
        <h1 className="text-sm font-semibold text-ink">{meta.title}</h1>
        {meta.description && (
          <p className="mt-0.5 text-xs text-ink-tertiary">{meta.description}</p>
        )}
      </div>
    </header>
  );
}
