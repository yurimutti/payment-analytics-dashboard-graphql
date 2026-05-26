import { useRouterState } from "@tanstack/react-router";

interface RouteConfig {
  title: string;
  subtitle: string;
}

const ROUTE_CONFIG: Record<string, RouteConfig> = {
  "/":         { title: "Analytics", subtitle: "KPIs, charts and recent activity"   },
  "/payments": { title: "Payments",  subtitle: "Browse and filter all transactions" },
};

export function Topbar() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  // Match /payments/$id → show "Payments" section header
  const key = pathname === "/" ? "/" : "/" + pathname.split("/").filter(Boolean)[0];
  const config = ROUTE_CONFIG[key];

  if (!config) return null;

  return (
    <header className="shrink-0 px-4 py-5">
      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        {config.title}
      </h1>
      <p className="mt-0.5 text-sm text-muted-foreground">{config.subtitle}</p>
    </header>
  );
}
