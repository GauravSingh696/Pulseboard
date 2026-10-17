"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { cn } from "@/lib/utils/cn";
import { useAppSelector } from "@/store/hooks";

export function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onNavigate,
}: {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);
  const displayName = useAppSelector((state) => state.preferences.displayName);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[var(--line)] bg-[var(--surface-elevated)] transition-all duration-200",
        collapsed ? "w-[76px]" : "w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight" onClick={onNavigate}>
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-tr from-[var(--accent)] to-teal-400 text-sm font-black text-white shadow-sm shadow-[var(--accent)]/30">
            P
          </span>
          {!collapsed ? <span className="text-base tracking-tight">Pulseboard</span> : null}
        </Link>
        <button
          type="button"
          className="hidden rounded-lg p-1.5 text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors lg:inline-flex"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-3" aria-label="Main">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                active
                  ? "bg-[var(--accent-muted)] text-[var(--accent)] font-semibold shadow-xs border-l-2 border-[var(--accent)]"
                  : "text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]",
                collapsed && "justify-center px-2",
              )}
            >
              <Icon size={18} className="transition-transform duration-200 group-hover:scale-110" />
              {!collapsed ? <span>{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[var(--line)] p-3">
        <div className={cn("flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[var(--surface-muted)]/60", collapsed && "justify-center")}>
          <div className="relative">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent-muted)] text-sm font-bold text-[var(--accent)] ring-1 ring-[var(--accent)]/30">
              {(user?.name ?? displayName).slice(0, 1)}
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--surface-elevated)]" />
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user?.name ?? displayName}</p>
              <p className="truncate text-xs text-[var(--muted)]">
                {user?.email ?? "Guest session"}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
