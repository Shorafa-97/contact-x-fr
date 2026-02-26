import { useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, Users, Building2, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

const allContacts = [
  { id: "c-1", name: "Mohammed Al-Rashid", nameAr: "محمد الرشيد", type: "Individual", email: "m.alrashid@example.gov" },
  { id: "c-2", name: "Sara Ahmed", nameAr: "سارة أحمد", type: "Individual", email: "sara.ahmed@example.com" },
  { id: "c-3", name: "Ahmad Hassan", nameAr: "أحمد حسن", type: "Individual", email: "ahmad.h@example.com" },
  { id: "c-4", name: "National Bank", nameAr: "البنك الوطني", type: "Organization", email: "info@nationalbank.sa" },
  { id: "c-5", name: "Khalid Mahmoud", nameAr: "خالد محمود", type: "Individual", email: "khalid.m@example.com" },
];

const allEntities = [
  { id: "e-1", name: "Ministry of Finance", nameAr: "وزارة المالية", type: "Ministry" },
  { id: "e-2", name: "Saudi Telecom", nameAr: "الاتصالات السعودية", type: "Agency" },
  { id: "e-3", name: "Budget Department", nameAr: "إدارة الميزانية", type: "Department" },
  { id: "e-4", name: "Revenue Division", nameAr: "قسم الإيرادات", type: "Division" },
];

export default function SearchPage() {
  const { t, lang } = useTranslation();
  const isAr = lang === "ar";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "contacts" | "entities">("all");

  const q = query.toLowerCase();
  const filteredContacts = (filter === "all" || filter === "contacts")
    ? allContacts.filter(c => c.name.toLowerCase().includes(q) || c.nameAr.includes(query) || c.email.toLowerCase().includes(q))
    : [];
  const filteredEntities = (filter === "all" || filter === "entities")
    ? allEntities.filter(e => e.name.toLowerCase().includes(q) || e.nameAr.includes(query))
    : [];

  const hasResults = filteredContacts.length > 0 || filteredEntities.length > 0;

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">{t("search.title")}</h1>
        <p className="page-subtitle">{t("search.subtitle")}</p>
      </div>

      {/* Search input */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground rtl:left-auto rtl:right-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search.placeholder")}
          className="input-enterprise pl-10 rtl:pl-4 rtl:pr-10"
          autoFocus
        />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "contacts", "entities"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {t(`search.${f}`)}
          </button>
        ))}
      </div>

      {/* Results */}
      {!query && (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <SearchIcon className="mb-3 h-12 w-12 opacity-30" />
          <p className="text-sm">{t("search.startTyping")}</p>
        </div>
      )}

      {query && !hasResults && (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <p className="text-sm">{t("search.noResults")}</p>
        </div>
      )}

      {query && filteredContacts.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t("page.contacts")} ({filteredContacts.length})</h3>
          {filteredContacts.map((c) => (
            <Link key={c.id} to={`/contacts/${c.id}`} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{isAr ? c.nameAr : c.name}</p>
                  <p className="text-xs text-muted-foreground">{isAr ? c.name : c.nameAr} · {c.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge-status badge-type">{c.type}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {query && filteredEntities.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t("page.entities")} ({filteredEntities.length})</h3>
          {filteredEntities.map((e) => (
            <Link key={e.id} to={`/entities/${e.id}`} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{isAr ? e.nameAr : e.name}</p>
                  <p className="text-xs text-muted-foreground">{isAr ? e.name : e.nameAr}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge-status badge-type">{e.type}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
