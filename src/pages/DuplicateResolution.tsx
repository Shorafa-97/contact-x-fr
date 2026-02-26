import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, AlertTriangle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

const duplicates = [
  {
    id: 1,
    confidence: 92,
    contactA: { name: "Mohammed Al-Rashid", nameAr: "محمد الرشيد", email: "m.alrashid@gov.sa", phone: "+966 512345678", type: "Individual", org: "Ministry of Finance" },
    contactB: { name: "Mohammad Al Rashid", nameAr: "محمد الراشد", email: "mohammad.r@gov.sa", phone: "+966 512345678", type: "Individual", org: "Ministry of Finance" },
    differences: ["name", "email", "nameAr"],
  },
  {
    id: 2,
    confidence: 78,
    contactA: { name: "Sara Ahmed", nameAr: "سارة أحمد", email: "s.ahmed@health.gov", phone: "+966 555123456", type: "Individual", org: "Ministry of Health" },
    contactB: { name: "Sarah Ahmad", nameAr: "سارة أحمد", email: "sarah.a@health.gov", phone: "+966 555123456", type: "Individual", org: "Ministry of Health" },
    differences: ["name", "email"],
  },
];

export default function DuplicateResolution() {
  const { t } = useTranslation();
  const [mainProfiles, setMainProfiles] = useState<Record<number, "A" | "B">>({});

  const selectMain = (dupId: number, record: "A" | "B") => {
    setMainProfiles(prev => ({ ...prev, [dupId]: record }));
  };

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">{t("duplicates.title")}</h1>
        <p className="page-subtitle">{duplicates.length} {t("duplicates.found")}</p>
      </div>

      <div className="space-y-6">
        {duplicates.map((dup) => {
          const mainProfile = mainProfiles[dup.id];

          return (
            <div key={dup.id} className="card-enterprise">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={cn("h-4 w-4", dup.confidence >= 85 ? "text-destructive" : "text-warning")} />
                  <span className="text-sm font-medium text-foreground">{t("duplicates.confidence")}</span>
                  <span className={cn("badge-status", dup.confidence >= 85 ? "bg-destructive/10 text-destructive" : "badge-pending")}>
                    {dup.confidence}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={!mainProfile}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
                      !mainProfile && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Check className="h-4 w-4" />
                    {t("duplicates.merge")}
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                    <X className="h-4 w-4" />
                    {t("duplicates.dismiss")}
                  </button>
                </div>
              </div>

              {!mainProfile && (
                <p className="mb-3 text-xs text-muted-foreground">{t("duplicates.selectMain")}</p>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {(["A", "B"] as const).map((label) => {
                  const contact = label === "A" ? dup.contactA : dup.contactB;
                  const isMain = mainProfile === label;

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => selectMain(dup.id, label)}
                      className={cn(
                        "w-full rounded-xl border-2 p-4 space-y-3 text-left transition-all",
                        isMain
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase text-muted-foreground">
                          {label === "A" ? t("duplicates.recordA") : t("duplicates.recordB")}
                        </span>
                        <div className="flex items-center gap-2">
                          {isMain && (
                            <span className="badge-status bg-primary/10 text-primary text-[10px]">
                              {t("duplicates.mainProfile")}
                            </span>
                          )}
                          <Link
                            to={`/contacts/c-${dup.id}${label}`}
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-lg p-1.5 text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                            title={t("common.view")}
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                      {Object.entries(contact).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-xs uppercase text-muted-foreground">{key}</span>
                          <span className={cn(
                            "text-sm",
                            dup.differences.includes(key) ? "font-semibold text-warning" : "text-foreground"
                          )}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
