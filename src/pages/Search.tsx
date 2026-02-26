import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, Building2, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

const allContacts = [
  { id: "c-1", name: "Mohammed Al-Rashid", nameAr: "محمد الرشيد", type: "Individual", email: "m.alrashid@example.gov" },
  { id: "c-2", name: "Sara Ahmed", nameAr: "سارة أحمد", type: "Individual", email: "sara.ahmed@example.com" },
  { id: "c-3", name: "Ahmad Hassan", nameAr: "أحمد حسن", type: "Organization", email: "ahmad.h@example.com" },
  { id: "c-4", name: "National Bank", nameAr: "البنك الوطني", type: "Organization", email: "info@nationalbank.sa" },
  { id: "c-5", name: "Khalid Mahmoud", nameAr: "خالد محمود", type: "Government", email: "khalid.m@example.com" },
];

const allEntities = [
  { id: "e-1", name: "Ministry of Finance", nameAr: "وزارة المالية", type: "public" },
  { id: "e-2", name: "Saudi Telecom", nameAr: "الاتصالات السعودية", type: "private" },
  { id: "e-3", name: "Budget Department", nameAr: "إدارة الميزانية", type: "semi-government" },
  { id: "e-4", name: "Revenue Division", nameAr: "قسم الإيرادات", type: "ngo" },
];

const contactTypes = ["Individual", "Organization", "Government", "Non-Profit"];
const entityTypes = ["public", "semi-government", "private", "international", "ngo"];

export default function SearchPage() {
  const { t, lang } = useTranslation();
  const isAr = lang === "ar";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "contacts" | "entities">("all");
  const [contactTypeFilter, setContactTypeFilter] = useState("");
  const [entityTypeFilter, setEntityTypeFilter] = useState("");

  const q = query.toLowerCase();

  const filteredContacts = useMemo(() => {
    if (filter === "entities") return [];
    let results = allContacts.filter(c => c.name.toLowerCase().includes(q) || c.nameAr.includes(query) || c.email.toLowerCase().includes(q));
    if (contactTypeFilter) results = results.filter(c => c.type === contactTypeFilter);
    return results;
  }, [q, query, filter, contactTypeFilter]);

  const filteredEntities = useMemo(() => {
    if (filter === "contacts") return [];
    let results = allEntities.filter(e => e.name.toLowerCase().includes(q) || e.nameAr.includes(query));
    if (entityTypeFilter) results = results.filter(e => e.type === entityTypeFilter);
    return results;
  }, [q, query, filter, entityTypeFilter]);

  const totalCount = filteredContacts.length + filteredEntities.length;
  const hasResults = totalCount > 0;

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">{t("search.title")}</h1>
        <p className="page-subtitle">{t("search.subtitle")}</p>
      </div>

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

      {/* Filter tabs with counts */}
      <div className="flex flex-wrap gap-2">
        {(["all", "contacts", "entities"] as const).map((f) => {
          const count = f === "all" ? totalCount : f === "contacts" ? filteredContacts.length : filteredEntities.length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {t(`search.${f}`)} {query && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Type filters */}
      {query && (
        <div className="flex flex-wrap gap-3">
          {(filter === "all" || filter === "contacts") && filteredContacts.length > 0 && (
            <select
              value={contactTypeFilter}
              onChange={(e) => setContactTypeFilter(e.target.value)}
              className="input-enterprise w-auto"
            >
              <option value="">{t("search.allContactTypes")}</option>
              {contactTypes.map(ct => (
                <option key={ct} value={ct}>{ct}</option>
              ))}
            </select>
          )}
          {(filter === "all" || filter === "entities") && filteredEntities.length > 0 && (
            <select
              value={entityTypeFilter}
              onChange={(e) => setEntityTypeFilter(e.target.value)}
              className="input-enterprise w-auto"
            >
              <option value="">{t("search.allEntityTypes")}</option>
              {entityTypes.map(et => (
                <option key={et} value={et}>{et.charAt(0).toUpperCase() + et.slice(1)}</option>
              ))}
            </select>
          )}
        </div>
      )}

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
