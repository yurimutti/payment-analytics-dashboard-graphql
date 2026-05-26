import { useRouterState } from "@tanstack/react-router";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { Separator } from "@/shared/ui/separator";

const ROUTE_META: Record<string, string> = {
  "/":         "Analytics",
  "/payments": "Payments",
};

export function Topbar() {
  const { location } = useRouterState();
  const segment = "/" + location.pathname.split("/").filter(Boolean)[0];
  const title =
    ROUTE_META[segment === "/" ? "/" : segment] ??
    ROUTE_META[location.pathname] ??
    "";

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <span className="text-sm font-medium">{title}</span>
      </div>
    </header>
  );
}
