import { Check, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Duplicate Resolution</h1>
        <p className="page-subtitle">{duplicates.length} potential duplicates found</p>
      </div>

      <div className="space-y-6">
        {duplicates.map((dup) => (
          <div key={dup.id} className="card-enterprise">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className={cn("h-4 w-4", dup.confidence >= 85 ? "text-destructive" : "text-warning")} />
                <span className="text-sm font-medium text-foreground">Match Confidence</span>
                <span className={cn(
                  "badge-status",
                  dup.confidence >= 85 ? "bg-destructive/10 text-destructive" : "badge-pending"
                )}>
                  {dup.confidence}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  <Check className="h-4 w-4" />
                  Merge
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                  <X className="h-4 w-4" />
                  Dismiss
                </button>
              </div>
            </div>

            {/* Comparison */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[dup.contactA, dup.contactB].map((contact, idx) => (
                <div key={idx} className="rounded-xl border border-border p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase text-muted-foreground">Record {idx === 0 ? "A" : "B"}</span>
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
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
