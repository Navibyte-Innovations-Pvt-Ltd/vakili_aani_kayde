import type { LucideIcon } from "lucide-react";
import {
  BarChart,
  BookOpen,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

export type DashboardSidebarItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const DASHBOARD_SIDEBAR_ITEMS: DashboardSidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Ebooks",
    href: "/dashboard/ebooks",
    icon: BookOpen,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Inputs",
    href: "/dashboard/inputs",
    icon: FileText,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "WhatsApp",
    href: "/dashboard/whatsapp",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
