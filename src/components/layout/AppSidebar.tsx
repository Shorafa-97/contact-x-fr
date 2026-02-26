import { useLocation, Link } from "react-router-dom";
import { useLayout } from "@/contexts/LayoutContext";
import { useTranslation } from "@/hooks/useTranslation";
import {
  LayoutDashboard,
  Users,
  Building2,
  GitCompare,
  BarChart3,
  Briefcase,
  Shield,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { labelKey: "nav.dashboard", icon: LayoutDashboard, path: "/" },
  { labelKey: "nav.contacts", icon: Users, path: "/contacts" },
  { labelKey: "nav.entities", icon: Building2, path: "/entities" },
  { labelKey: "nav.duplicates", icon: GitCompare, path: "/duplicates" },
  { labelKey: "nav.analytics", icon: BarChart3, path: "/analytics" },
  { labelKey: "nav.executive", icon: Briefcase, path: "/executive" },
  { labelKey: "nav.governance", icon: Shield, path: "/governance" },
];

export default function AppSidebar() {
  const { sidebarOpen, sidebarCollapsed, toggleSidebar, dir } = useLayout();
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 z-50 flex h-screen flex-col border-border bg-sidebar transition-all duration-300 lg:sticky lg:top-0 lg:z-auto",
          dir === "rtl" ? "right-0 border-l" : "left-0 border-r",
          sidebarCollapsed ? "w-20" : "w-[280px]",
          sidebarOpen ? "translate-x-0" : dir === "rtl" ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo area */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
          {!sidebarCollapsed && (
            <span className="text-lg font-bold text-foreground">Contacts X</span>
          )}
          {sidebarCollapsed && (
            <span className="mx-auto text-lg font-bold text-primary">CX</span>
          )}
          <button onClick={toggleSidebar} className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const active = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => sidebarOpen && toggleSidebar()}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-foreground",
                  sidebarCollapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!sidebarCollapsed && <span>{t(item.labelKey)}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
