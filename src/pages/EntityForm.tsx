import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const existingEntities = [
  { id: "e-1", nameEn: "Ministry of Finance" },
  { id: "e-2", nameEn: "Ministry of Health" },
  { id: "e-3", nameEn: "National Bank" },
  { id: "e-4", nameEn: "Defense Agency" },
  { id: "e-5", nameEn: "Education Department" },
];

export default function EntityForm() {
  const { id } = useParams();
  const isEdit = id && id !== "new";
  const { t } = useTranslation();

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <Link to="/entities" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        {t("entities.backToEntities")}
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">{isEdit ? t("entity.edit") : t("entity.create")}</h1>
          <p className="page-subtitle">{isEdit ? t("entity.updateDesc") : t("entity.createDesc")}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Save className="h-4 w-4" />
          {t("entity.save")}
        </button>
      </div>

      <div className="space-y-6">
        {/* Names */}
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("entity.nameSection")}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.nameEn")}</label>
              <input type="text" placeholder="Enter entity name" className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.nameAr")}</label>
              <input type="text" placeholder="أدخل اسم الجهة" className="input-enterprise" dir="rtl" />
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("entity.classification")}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.code")}</label>
              <input type="text" placeholder="e.g. MOF-001" className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.type")}</label>
              <select className="input-enterprise">
                <option value="">{t("form.select")}</option>
                <option value="Ministry">{t("common.ministry")}</option>
                <option value="Agency">{t("common.agency")}</option>
                <option value="Department">{t("common.department")}</option>
                <option value="Division">{t("common.division")}</option>
                <option value="Unit">{t("common.unit")}</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.parentEntity")}</label>
              <select className="input-enterprise">
                <option value="">{t("form.select")}</option>
                {existingEntities.map(e => (
                  <option key={e.id} value={e.id}>{e.nameEn}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.status")}</label>
              <select className="input-enterprise">
                <option value="Active">{t("common.active")}</option>
                <option value="Inactive">{t("common.inactive")}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("form.contactInfo")}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.email")}</label>
              <input type="email" placeholder="entity@gov.sa" className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.phone")}</label>
              <input type="tel" placeholder="+966 1XXXXXXX" className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.website")}</label>
              <input type="url" placeholder="https://www.example.gov.sa" className="input-enterprise" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("entity.address")}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.addressLine")}</label>
              <input type="text" placeholder={t("form.addressLine")} className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.city")}</label>
              <input type="text" placeholder={t("form.city")} className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.country")}</label>
              <input type="text" placeholder={t("form.country")} className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.postalCode")}</label>
              <input type="text" placeholder={t("form.postalCode")} className="input-enterprise" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("entity.description")}</h3>
          <textarea rows={4} placeholder={t("entity.description")} className="input-enterprise h-auto resize-none" />
        </div>
      </div>
    </div>
  );
}
