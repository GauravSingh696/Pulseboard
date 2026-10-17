import { Compass, Heart, LayoutDashboard, Rss, Settings } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/feed", label: "Personalized Feed", icon: Rss },
  { href: "/trending", label: "Trending", icon: Compass },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;
