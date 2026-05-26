import { useRouterState } from "@tanstack/react-router";
import { Separator } from "@/shared/ui/separator";

const ROUTE_TITLES: Record<string, string> = {
  "/":         "Analytics",
  "/payments": "Payments",
};

export function Topbar() {
  const { location } = useRouterState();
  const segment = "/" + location.pathname.split("/").filter(Boolean)[0];
  const title =
    ROUTE_TITLES[segment === "/" ? "/" : segment] ??
    ROUTE_TITLES[location.pathname] ??
    "";

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-4 lg:px-6">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4" />
        <span className="text-xs text-muted-foreground">Payment Analytics</span>
      </div>
    </header>
  );
}
