import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Calendar, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export default function ContactDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const tabs = [t("contact.overview"), t("contact.relationships"), t("contact.auditLog")];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Update activeTab when language changes
  const tabKeys = ["contact.overview", "contact.relationships", "contact.auditLog"];
  const activeTabIndex = tabs.indexOf(activeTab);
  const resolvedTab = activeTabIndex >= 0 ? activeTabIndex : 0;

  const contact = {
    id,
    nameEn: "Mohammed Al-Rashid",
    nameAr: "محمد الرشيد",
    type: "Individual",
    status: "Active",
    email: "m.alrashid@example.gov",
    phone: "+966 512345678",
    completeness: 82,
    organization: "Ministry of Finance",
    position: "Director of IT",
    address: "Riyadh, Saudi Arabia",
    createdAt: "2024-01-15",
    updatedAt: "2025-02-20",
  };

  const completenessColor = contact.completeness >= 80 ? "completeness-high" : contact.completeness >= 50 ? "completeness-medium" : "completeness-low";

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <Link to="/contacts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        {t("contact.backToContacts")}
      </Link>

      <div className="card-enterprise">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-primary">
              {contact.nameEn.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{contact.nameEn}</h1>
              <p className="text-sm text-muted-foreground">{contact.nameAr}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="badge-status badge-type">{contact.type}</span>
                <span className="badge-status badge-active">{contact.status}</span>
              </div>
            </div>
          </div>
          <Link to={`/contacts/${id}/edit`} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            <Edit className="h-4 w-4" />
            {t("contact.edit")}
          </Link>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">{t("contact.profileCompleteness")}</span>
            <span className="font-semibold text-foreground">{contact.completeness}%</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div className={`h-full rounded-full transition-all ${completenessColor}`} style={{ width: `${contact.completeness}%` }} />
          </div>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {resolvedTab === 0 && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card-enterprise space-y-4">
            <h3 className="text-base font-semibold text-foreground">{t("contact.contactInfo")}</h3>
            <div className="space-y-3">
              <InfoRow icon={Mail} label={t("contact.email")} value={contact.email} />
              <InfoRow icon={Phone} label={t("contact.phone")} value={contact.phone} />
              <InfoRow icon={MapPin} label={t("contact.address")} value={contact.address} />
            </div>
          </div>
          <div className="card-enterprise space-y-4">
            <h3 className="text-base font-semibold text-foreground">{t("contact.professionalInfo")}</h3>
            <div className="space-y-3">
              <InfoRow icon={Briefcase} label={t("contact.organization")} value={contact.organization} />
              <InfoRow icon={Briefcase} label={t("contact.position")} value={contact.position} />
              <InfoRow icon={Calendar} label={t("contact.created")} value={contact.createdAt} />
              <InfoRow icon={Calendar} label={t("contact.updated")} value={contact.updatedAt} />
            </div>
          </div>
        </div>
      )}

      {resolvedTab === 1 && (
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("contact.relatedEntities")}</h3>
          <div className="space-y-3">
            {[
              { name: "Ministry of Finance", nameAr: "وزارة المالية", role: "Employee", type: "Ministry" },
              { name: "IT Advisory Board", nameAr: "مجلس استشاري تكنولوجيا المعلومات", role: "Member", type: "Department" },
            ].map((rel, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium text-foreground">{rel.name}</p>
                  <p className="text-xs text-muted-foreground">{rel.nameAr}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge-status badge-type">{rel.type}</span>
                  <span className="text-sm text-muted-foreground">{rel.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {resolvedTab === 2 && (
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("contact.activityHistory")}</h3>
          <div className="space-y-4">
            {[
              { action: "Profile updated", user: "admin", time: "2025-02-20 14:30", details: "Email address changed" },
              { action: "Relationship added", user: "admin", time: "2025-02-18 09:15", details: "Linked to IT Advisory Board" },
              { action: "Contact created", user: "system", time: "2024-01-15 10:00", details: "Initial record created via import" },
            ].map((log, i) => (
              <div key={i} className="relative border-l-2 border-border pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
                <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full border-2 border-primary bg-card rtl:left-auto rtl:-right-1.5" />
                <p className="font-medium text-foreground">{log.action}</p>
                <p className="text-sm text-muted-foreground">{log.details}</p>
                <p className="mt-1 text-xs text-muted-foreground">{log.time} · {log.user}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}
