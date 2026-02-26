import { useLayout } from "@/contexts/LayoutContext";
import { Menu, Sun, Moon, Globe, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/contacts": "Contacts",
  "/entities": "Entities",
  "/duplicates": "Duplicate Resolution",
  "/analytics": "Analytics",
  "/executive": "Executive Dashboard",
  "/governance": "Governance Dashboard",
};

export default function AppHeader() {
  const { toggleSidebar, toggleDir, toggleTheme, theme, dir } = useLayout();
  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const pageTitle = pageTitles[location.pathname] || pathSegments[pathSegments.length - 1] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="hidden sm:inline">Home</span>
          <ChevronRight className="hidden h-3.5 w-3.5 sm:inline" />
          <span className="font-medium text-foreground">{pageTitle}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
        <button
          onClick={toggleDir}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Toggle language direction"
        >
          <Globe className="h-4 w-4" />
          <span>{dir === "ltr" ? "EN" : "AR"}</span>
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          AD
        </div>
      </div>
    </header>
  );
}
