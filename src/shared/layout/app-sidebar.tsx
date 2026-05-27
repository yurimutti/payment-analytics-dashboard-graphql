import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, CreditCard } from "lucide-react";
import type * as React from "react";
import { cn } from "@/shared/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/shared/ui/sidebar";

function AppLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="PayDash logo"
    >
      <defs>
        <radialGradient id="sb-glow" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="55%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4338ca" />
        </radialGradient>
        <radialGradient id="sb-shine" cx="35%" cy="28%" r="45%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="url(#sb-glow)" />
      <circle cx="32" cy="32" r="32" fill="url(#sb-shine)" />
      <g fill="white" opacity="0.92">
        <rect x="14" y="38" width="8" height="12" rx="1.5" />
        <rect x="28" y="28" width="8" height="22" rx="1.5" />
        <rect x="42" y="18" width="8" height="32" rx="1.5" />
      </g>
    </svg>
  );
}

const NAV_ITEMS = [
  { href: "/", label: "Analytics", icon: BarChart3, description: "KPIs & trends" },
  { href: "/payments", label: "Payments", icon: CreditCard, description: "All transactions" },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { location } = useRouterState();
  const currentPath = location.pathname;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border" {...props}>
      <SidebarHeader className="px-4 py-5">
        <Link to="/" className="flex items-center gap-3">
          <AppLogo size={36} />
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight text-sidebar-foreground">
              PayDash
            </span>
            <span className="text-xs text-muted-foreground leading-tight">Analytics Platform</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {NAV_ITEMS.map(({ href, label, icon: Icon, description }) => {
                const isActive = href === "/" ? currentPath === "/" : currentPath.startsWith(href);
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "h-auto py-2.5 px-3 rounded-lg",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-foreground"
                          : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/60",
                      )}
                    >
                      <Link to={href} className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-md",
                            isActive
                              ? "bg-primary/15 text-primary"
                              : "bg-sidebar-accent text-muted-foreground",
                          )}
                        >
                          <Icon size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium leading-tight">{label}</span>
                          <span className="text-xs text-muted-foreground leading-tight">
                            {description}
                          </span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
