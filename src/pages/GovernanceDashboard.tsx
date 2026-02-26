import { AlertTriangle, Users, GitCompare, FileWarning, ChevronRight } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import { useTranslation } from "@/hooks/useTranslation";

const weakProfiles = [
  { id: "c-1", name: "Unknown Contact #142", completeness: 15, missing: ["Email", "Phone", "Organization"] },
  { id: "c-2", name: "Test Record", completeness: 8, missing: ["Email", "Phone", "Name (Arabic)", "Address"] },
  { id: "c-3", name: "Partial Entry", completeness: 22, missing: ["Phone", "Organization", "Address"] },
];

const orphanRecords = [
  { id: "c-5", name: "Khalid Mahmoud", nameAr: "خالد محمود", type: "Individual", reason: "No entity linked", reasonAr: "غير مرتبط بجهة" },
  { id: "c-6", name: "Old Ministry Record", nameAr: "سجل وزارة قديم", type: "Organization", reason: "Parent entity deleted", reasonAr: "تم حذف الجهة الأم" },
];

export default function GovernanceDashboard() {
  const { t, lang } = useTranslation();
  const isAr = lang === "ar";

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">{t("governance.title")}</h1>
        <p className="page-subtitle">{t("governance.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard title={t("governance.weakProfiles")} value="156" change="< 30%" changeType="negative" icon={FileWarning} />
        <KPICard title={t("governance.orphanRecords")} value="23" changeType="negative" icon={Users} change={isAr ? "غير مرتبط بجهة" : "No entity linked"} />
        <KPICard title={t("governance.pendingDuplicates")} value="47" changeType="neutral" icon={GitCompare} change={isAr ? "يتطلب مراجعة" : "Requires review"} />
        <KPICard title={t("governance.qualityAlerts")} value="12" changeType="negative" icon={AlertTriangle} change={isAr ? "مشاكل حرجة" : "Critical issues"} />
      </div>

      <div className="card-enterprise">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">{t("governance.weakProfiles")}</h3>
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">{t("governance.viewAll")}</button>
        </div>
        <div className="space-y-2">
          {weakProfiles.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">{t("governance.missing")}: {p.missing.join(", ")}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-12 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full completeness-low" style={{ width: `${p.completeness}%` }} />
                  </div>
                  <span className="text-xs font-medium text-destructive">{p.completeness}%</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-enterprise">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">{t("governance.orphanRecords")}</h3>
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">{t("governance.viewAll")}</button>
        </div>
        <div className="space-y-2">
          {orphanRecords.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{isAr ? r.nameAr : r.name}</p>
                <p className="text-xs text-muted-foreground">{isAr ? r.name : r.nameAr}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge-status badge-pending">{isAr ? r.reasonAr : r.reason}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
