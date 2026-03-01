import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Progress } from "@/components/ui/progress";

const childEntities = [
  { id: "e-sub-1", name: "Budget Department", nameAr: "إدارة الميزانية", type: "Department", contacts: 34 },
  { id: "e-sub-2", name: "Revenue Division", nameAr: "قسم الإيرادات", type: "Division", contacts: 22 },
  { id: "e-sub-3", name: "Audit Unit", nameAr: "وحدة التدقيق", type: "Unit", contacts: 12 },
];

const relatedContacts = [
  { id: "c-1", name: "Mohammed Al-Rashid", nameAr: "محمد الرشيد", role: "Director", status: "Active" },
  { id: "c-2", name: "Sara Ahmed", nameAr: "سارة أحمد", role: "Manager", status: "Active" },
  { id: "c-3", name: "Ahmad Hassan", nameAr: "أحمد حسن", role: "Analyst", status: "Pending" },
];

export default function EntityDetail() {
  const { id } = useParams();
  const { t } = useTranslation();

  // In a real app, fetch by id. Using mock data here.
  const entity = {
    id,
    nameEn: "Ministry of Finance",
    nameAr: "وزارة المالية",
    type: "Ministry",
    status: "Active",
    registrationId: "GOV-2024-001",
    country: "Saudi Arabia",
    parentEntity: "Council of Ministers",
    email: "info@mof.gov.sa",
    phone: "+966 11 405 0000",
  };

  // Completeness calculation based on filled fields
  const fields = [entity.nameEn, entity.nameAr, entity.type, entity.status, entity.registrationId, entity.country, entity.parentEntity, entity.email, entity.phone];
  const filledFields = fields.filter(Boolean).length;
  const completeness = Math.round((filledFields / fields.length) * 100);

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <Link to="/entities" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        {t("entities.backToEntities")}
      </Link>

      <div className="card-enterprise">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Building2 className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">{entity.nameEn}</h1>
            <p className="text-sm text-muted-foreground">{entity.nameAr}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="badge-status badge-type">{entity.type}</span>
              <span className="badge-status badge-active">{t("common.active")}</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">{t("entities.completeness")}</span>
            <span className="text-xs font-semibold text-foreground">{completeness}%</span>
          </div>
          <Progress value={completeness} className="h-2" />
        </div>
      </div>

      <div className="card-enterprise">
        <h3 className="mb-4 text-base font-semibold text-foreground">{t("entities.details")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">{t("entities.registrationId")}</p>
            <p className="text-sm font-medium text-foreground">{entity.registrationId}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t("entities.country")}</p>
            <p className="text-sm font-medium text-foreground">{entity.country}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t("entities.parentEntity")}</p>
            <p className="text-sm font-medium text-foreground">{entity.parentEntity}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t("contacts.email")}</p>
            <p className="text-sm font-medium text-foreground">{entity.email}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t("contacts.phone")}</p>
            <p className="text-sm font-medium text-foreground">{entity.phone}</p>
          </div>
        </div>
        <div className="space-y-2">
          {childEntities.map((child) => (
            <div key={child.id} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{child.name}</p>
                  <p className="text-xs text-muted-foreground">{child.nameAr}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="badge-status badge-type">{child.type}</span>
                <span className="text-xs text-muted-foreground">{child.contacts} {t("common.contacts")}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-enterprise">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">{t("entities.relatedContacts")}</h3>
          <span className="text-sm text-muted-foreground">{relatedContacts.length} {t("common.contacts")}</span>
        </div>
        <div className="space-y-2">
          {relatedContacts.map((contact) => (
            <Link key={contact.id} to={`/contacts/${contact.id}`} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {contact.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.nameAr}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{contact.role}</span>
                <span className={`badge-status ${contact.status === "Active" ? "badge-active" : "badge-pending"}`}>{contact.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
