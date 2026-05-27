import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, CreditCard } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Analytics", icon: BarChart3 },
  { href: "/payments", label: "Payments", icon: CreditCard },
];

export function Sidebar() {
  const { location } = useRouterState();
  const currentPath = location.pathname;

  return (
    <aside className="flex h-screen w-55 shrink-0 flex-col border-r border-hairline bg-surface-1">
      <div className="flex h-12 shrink-0 items-center px-4">
        <span className="text-sm font-semibold text-ink">Payment Analytics</span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? currentPath === "/" : currentPath.startsWith(href);

          return (
            <Link
              key={href}
              to={href}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors outline-none",
                isActive
                  ? "bg-surface-2 text-ink"
                  : "text-ink-subtle hover:bg-surface-2/60 hover:text-ink",
              )}
            >
              <Icon size={15} strokeWidth={1.5} className="shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
