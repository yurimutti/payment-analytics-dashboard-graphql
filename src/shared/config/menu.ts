import { BarChart3, CreditCard, type LucideIcon } from "lucide-react";
import { ROUTES } from "./routes";

export type NavItem = {
  readonly href: string;
  readonly label: string;
  readonly description: string;
  readonly icon: LucideIcon;
};

export const NAV_ITEMS = [
  {
    href: ROUTES.HOME,
    label: "Analytics",
    description: "KPIs & trends",
    icon: BarChart3,
  },
  {
    href: ROUTES.PAYMENTS.LIST,
    label: "Payments",
    description: "All transactions",
    icon: CreditCard,
  },
] as const satisfies readonly NavItem[];
