import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, Filter, Plus, Building2, Eye, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const entities = Array.from({ length: 15 }, (_, i) => ({
  id: `e-${i + 1}`,
  nameEn: ["Ministry of Finance", "Ministry of Health", "National Bank", "Defense Agency", "Education Department", "Transport Authority", "Energy Ministry", "Digital Government", "Civil Aviation", "Tax Authority"][i % 10],
  nameAr: ["وزارة المالية", "وزارة الصحة", "البنك الوطني", "وكالة الدفاع", "إدارة التعليم", "هيئة النقل", "وزارة الطاقة", "الحكومة الرقمية", "الطيران المدني", "هيئة الضرائب"][i % 10],
  type: ["Ministry", "Agency", "Department", "Division"][i % 4],
  contactsCount: Math.floor(10 + Math.random() * 200),
  parent: i % 3 === 0 ? null : ["Ministry of Finance", "Ministry of Health"][i % 2],
  status: ["Active", "Active", "Inactive"][i % 3],
}));



export default function EntitiesList() {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const filtered = entities.filter(
    (e) => e.nameEn.toLowerCase().includes(search.toLowerCase()) || e.nameAr.includes(search)
  );

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">{t("page.entities")}</h1>
          <p className="page-subtitle">{entities.length} {t("entities.totalEntities")}</p>
        </div>
        <Link
          to="/entities/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          {t("entities.addEntity")}
        </Link>
      </div>

      <div className="card-enterprise">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground rtl:left-auto rtl:right-3" />
            <input type="text" placeholder={t("entities.search")} value={search} onChange={(e) => setSearch(e.target.value)} className="input-enterprise pl-9 rtl:pl-3 rtl:pr-9" />
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            <Filter className="h-4 w-4" />
            {t("contacts.filters")}
          </button>
        </div>
      </div>

      <div className="card-enterprise hidden md:block">
        <div className="overflow-x-auto">
          <table className="table-enterprise">
            <thead>
              <tr>
                <th>{t("entities.entityName")}</th>
                <th>{t("entities.type")}</th>
                <th>{t("entities.parent")}</th>
                <th>{t("entities.contacts")}</th>
                <th>{t("entities.status")}</th>
                <th className="w-28">{/* Actions */}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id}>
                  <td>
                    <Link to={`/entities/${e.id}`} className="hover:text-primary">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{e.nameEn}</p>
                          <p className="text-xs text-muted-foreground">{e.nameAr}</p>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td><span className="badge-status badge-type">{e.type}</span></td>
                  <td className="text-sm text-muted-foreground">{e.parent || "—"}</td>
                  <td className="text-sm font-medium text-foreground">{e.contactsCount}</td>
                  <td><span className={`badge-status ${e.status === "Active" ? "badge-active" : "badge-inactive"}`}>{e.status}</span></td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Link to={`/entities/${e.id}`} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title={t("common.view")}>
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title={t("common.update")}>
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10 transition-colors" title={t("common.delete")}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {filtered.map((e) => (
          <Link key={e.id} to={`/entities/${e.id}`} className="card-enterprise block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{e.nameEn}</p>
                <p className="text-xs text-muted-foreground">{e.nameAr}</p>
              </div>
              <span className="badge-status badge-type">{e.type}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>{e.contactsCount} {t("common.contacts")}</span>
              <span className={`badge-status ${e.status === "Active" ? "badge-active" : "badge-inactive"}`}>{e.status}</span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
