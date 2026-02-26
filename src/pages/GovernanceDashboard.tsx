import { AlertTriangle, Users, GitCompare, FileWarning, ChevronRight } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";

const weakProfiles = [
  { id: "c-1", name: "Unknown Contact #142", completeness: 15, missing: ["Email", "Phone", "Organization"] },
  { id: "c-2", name: "Test Record", completeness: 8, missing: ["Email", "Phone", "Name (Arabic)", "Address"] },
  { id: "c-3", name: "Partial Entry", completeness: 22, missing: ["Phone", "Organization", "Address"] },
];

const orphanRecords = [
  { id: "c-5", name: "Khalid Mahmoud", nameAr: "خالد محمود", type: "Individual", reason: "No entity linked" },
  { id: "c-6", name: "Old Ministry Record", nameAr: "سجل وزارة قديم", type: "Organization", reason: "Parent entity deleted" },
];

export default function GovernanceDashboard() {
  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Governance Dashboard</h1>
        <p className="page-subtitle">Data quality governance and compliance metrics</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard title="Weak Profiles" value="156" change="< 30% completeness" changeType="negative" icon={FileWarning} />
        <KPICard title="Orphan Records" value="23" change="No entity linked" changeType="negative" icon={Users} />
        <KPICard title="Pending Duplicates" value="47" change="Requires review" changeType="neutral" icon={GitCompare} />
        <KPICard title="Quality Alerts" value="12" change="Critical issues" changeType="negative" icon={AlertTriangle} />
      </div>

      {/* Weak Profiles */}
      <div className="card-enterprise">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Weak Profiles</h3>
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">View All →</button>
        </div>
        <div className="space-y-2">
          {weakProfiles.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">Missing: {p.missing.join(", ")}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-12 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full completeness-low" style={{ width: `${p.completeness}%` }} />
                  </div>
                  <span className="text-xs font-medium text-destructive">{p.completeness}%</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orphan Records */}
      <div className="card-enterprise">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Orphan Records</h3>
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">View All →</button>
        </div>
        <div className="space-y-2">
          {orphanRecords.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.nameAr}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge-status badge-pending">{r.reason}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
