import * as React from "react";
import { BarChart3, CreditCard, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useRouterState } from "@tanstack/react-router";
import { cn } from "@/shared/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/shared/ui/sidebar";

const NAV_ITEMS = [
  { href: "/",         label: "Analytics", icon: BarChart3,  description: "KPIs & trends"   },
  { href: "/payments", label: "Payments",  icon: CreditCard, description: "All transactions" },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { location } = useRouterState();
  const currentPath = location.pathname;

  return (
    <Sidebar collapsible="none" className="border-r border-sidebar-border" {...props}>

      {/* ── Brand ─────────────────────────────────────────────── */}
      <SidebarHeader className="px-4 py-5">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Zap size={20} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight text-sidebar-foreground">
              PayDash
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              Analytics Platform
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      {/* ── Nav ───────────────────────────────────────────────── */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {NAV_ITEMS.map(({ href, label, icon: Icon, description }) => {
                const isActive =
                  href === "/" ? currentPath === "/" : currentPath.startsWith(href);
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
                        <div className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-md",
                          isActive
                            ? "bg-primary/15 text-primary"
                            : "bg-sidebar-accent text-muted-foreground",
                        )}>
                          <Icon size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium leading-tight">{label}</span>
                          <span className="text-xs text-muted-foreground leading-tight">{description}</span>
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

      {/* ── Footer ────────────────────────────────────────────── */}
      <SidebarFooter className="px-4 py-4">
        <SidebarSeparator className="mb-4" />
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
            YM
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">Yuri Mutti</span>
            <span className="text-xs text-muted-foreground">muttiyuri@gmail.com</span>
          </div>
        </div>
      </SidebarFooter>

    </Sidebar>
  );
}
