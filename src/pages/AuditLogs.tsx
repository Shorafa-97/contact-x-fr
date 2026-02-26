import { useState } from "react";
import { Eye } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

const auditLogs = [
  { id: 1, timestamp: "2026-02-24 13:52:16", user: "admin", action: "create", entityType: "entity", entityId: "d9a01e74-1cfb-4a4e-8ca7-1071587f8ca5", hasChanges: false },
  { id: 2, timestamp: "2026-02-24 12:43:57", user: "admin", action: "delete", entityType: "entity", entityId: "53698674-b945-4896-b377-31443fcc530c", hasChanges: false },
  { id: 3, timestamp: "2026-02-24 12:43:42", user: "admin", action: "create", entityType: "entity", entityId: "53698674-b945-4896-b377-31443fcc530c", hasChanges: false },
  { id: 4, timestamp: "2026-02-24 10:57:12", user: "admin", action: "create", entityType: "entity", entityId: "9007ec57-7209-42bf-8aeb-122729649f34", hasChanges: false },
  { id: 5, timestamp: "2026-02-24 10:55:43", user: "admin", action: "create", entityType: "contact", entityId: "29bca2fc-9e1e-4ea9-b898-beb3afe0ce40", hasChanges: false },
  { id: 6, timestamp: "2026-02-24 10:46:48", user: "admin", action: "update", entityType: "entity", entityId: "bd3132c5-e008-4c4c-9f5b-d0a94ac46845", hasChanges: true },
  { id: 7, timestamp: "2026-02-24 10:45:11", user: "admin", action: "update", entityType: "contact", entityId: "e863004c-f4f6-4a4f-9cc1-caa599415631", hasChanges: true },
  { id: 8, timestamp: "2026-02-24 09:16:05", user: "admin", action: "delete", entityType: "contact", entityId: "4b973f0a-901a-499c-8a66-1c874c0a0c9b", hasChanges: false },
  { id: 9, timestamp: "2026-02-22 14:22:06", user: "admin", action: "import", entityType: "import", entityId: "bulk", hasChanges: true },
  { id: 10, timestamp: "2026-02-22 14:21:51", user: "admin", action: "import", entityType: "import", entityId: "bulk", hasChanges: true },
  { id: 11, timestamp: "2026-02-22 14:21:25", user: "admin", action: "import", entityType: "import", entityId: "bulk", hasChanges: true },
  { id: 12, timestamp: "2026-02-22 14:21:10", user: "admin", action: "import", entityType: "import", entityId: "bulk", hasChanges: true },
];

type TypeFilter = "all" | "contact" | "entity" | "import";
type ActionFilter = "all" | "create" | "update" | "delete" | "import";

const actionColors: Record<string, string> = {
  create: "bg-primary/10 text-primary",
  update: "bg-muted text-muted-foreground",
  delete: "bg-destructive/10 text-destructive",
  import: "bg-primary/10 text-primary",
};

export default function AuditLogs() {
  const { t } = useTranslation();
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [actionFilter, setActionFilter] = useState<ActionFilter>("all");

  const filtered = auditLogs.filter(log => {
    if (typeFilter !== "all" && log.entityType !== typeFilter) return false;
    if (actionFilter !== "all" && log.action !== actionFilter) return false;
    return true;
  });

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">{t("audit.title")}</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as TypeFilter)} className="input-enterprise w-auto">
          <option value="all">{t("search.all")}</option>
          <option value="contact">{t("page.contacts")}</option>
          <option value="entity">{t("page.entities")}</option>
          <option value="import">Import</option>
        </select>
        <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value as ActionFilter)} className="input-enterprise w-auto">
          <option value="all">{t("search.all")}</option>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
          <option value="import">Import</option>
        </select>
      </div>

      {/* Table */}
      <div className="card-enterprise overflow-x-auto">
        <table className="table-enterprise">
          <thead>
            <tr>
              <th>{t("audit.timestamp")}</th>
              <th>{t("audit.user")}</th>
              <th>{t("audit.action")}</th>
              <th>{t("audit.entityType")}</th>
              <th>{t("audit.entityId")}</th>
              <th>{t("audit.changes")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id}>
                <td className="text-muted-foreground whitespace-nowrap">{log.timestamp}</td>
                <td className="text-foreground">{log.user}</td>
                <td>
                  <span className={cn("inline-block rounded-md px-2.5 py-1 text-xs font-semibold", actionColors[log.action] || "bg-muted text-muted-foreground")}>
                    {log.action}
                  </span>
                </td>
                <td className="text-foreground">{log.entityType}</td>
                <td className="text-muted-foreground font-mono text-xs max-w-[220px] truncate">{log.entityId}</td>
                <td>
                  {log.hasChanges ? (
                    <button className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors">
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
