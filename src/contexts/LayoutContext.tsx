import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface LayoutContextType {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  dir: "ltr" | "rtl";
  theme: "light" | "dark";
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  toggleDir: () => void;
  toggleTheme: () => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within LayoutProvider");
  return ctx;
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);
  const toggleCollapse = useCallback(() => setSidebarCollapsed((c) => !c), []);
  const toggleDir = useCallback(() => {
    setDir((d) => {
      const next = d === "ltr" ? "rtl" : "ltr";
      document.documentElement.dir = next;
      return next;
    });
  }, []);
  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  return (
    <LayoutContext.Provider
      value={{ sidebarOpen, sidebarCollapsed, dir, theme, toggleSidebar, toggleCollapse, toggleDir, toggleTheme }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
