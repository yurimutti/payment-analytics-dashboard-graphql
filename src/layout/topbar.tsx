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
    <header className="shrink-0 flex flex-col justify-center px-4 py-5 min-h-19">
      <h1 className="text-base font-bold tracking-tight text-foreground leading-tight">
        {config.title}
      </h1>
      <p className="text-xs text-muted-foreground leading-tight">{config.subtitle}</p>
    </header>
  );
}
