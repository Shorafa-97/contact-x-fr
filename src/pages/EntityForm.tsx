import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const existingEntities = [
  { id: "e-1", nameEn: "Ministry of Finance" },
  { id: "e-2", nameEn: "Ministry of Health" },
  { id: "e-3", nameEn: "National Bank" },
  { id: "e-4", nameEn: "Defense Agency" },
  { id: "e-5", nameEn: "Education Department" },
];

const entityTypes = ["public", "semi-government", "private", "international", "ngo"];

const countries = [
  "Saudi Arabia", "United Arab Emirates", "Bahrain", "Qatar", "Oman", "Kuwait",
  "Egypt", "Jordan", "Lebanon", "Iraq", "Morocco", "Tunisia",
  "United States", "United Kingdom", "Germany", "France", "India", "Pakistan",
];

const addressTypes = ["Home", "Work", "Office", "Billing", "Shipping", "Other"];

const countryCodes = [
  { code: "+966", flag: "🇸🇦" }, { code: "+971", flag: "🇦🇪" }, { code: "+973", flag: "🇧🇭" },
  { code: "+974", flag: "🇶🇦" }, { code: "+968", flag: "🇴🇲" }, { code: "+965", flag: "🇰🇼" },
  { code: "+20", flag: "🇪🇬" }, { code: "+962", flag: "🇯🇴" }, { code: "+961", flag: "🇱🇧" },
  { code: "+1", flag: "🇺🇸" }, { code: "+44", flag: "🇬🇧" }, { code: "+91", flag: "🇮🇳" },
  { code: "+92", flag: "🇵🇰" }, { code: "+63", flag: "🇵🇭" },
];

export default function EntityForm() {
  const { id } = useParams();
  const isEdit = id && id !== "new";
  const { t } = useTranslation();

  const [contactPoints, setContactPoints] = useState([{ name: "", email: "", phone: "", countryCode: "+966", country: "" }]);
  const [addresses, setAddresses] = useState([{ type: "Work", address: "", primary: true }]);

  const addContactPoint = () => setContactPoints([...contactPoints, { name: "", email: "", phone: "", countryCode: "+966", country: "" }]);
  const removeContactPoint = (i: number) => setContactPoints(contactPoints.filter((_, idx) => idx !== i));

  const addAddress = () => setAddresses([...addresses, { type: "Work", address: "", primary: false }]);
  const removeAddress = (i: number) => {
    const next = addresses.filter((_, idx) => idx !== i);
    if (next.length > 0 && !next.some(a => a.primary)) next[0].primary = true;
    setAddresses(next);
  };
  const setPrimaryAddress = (i: number) => setAddresses(addresses.map((a, idx) => ({ ...a, primary: idx === i })));

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
        {/* Basic Info */}
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("entity.nameSection")}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.nameEn")}</label>
              <input type="text" placeholder="Enter entity name" className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.nameAr")}</label>
              <input type="text" placeholder="أدخل اسم الجهة" className="input-enterprise" dir="rtl" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.type")}</label>
              <select className="input-enterprise">
                <option value="">{t("form.select")}</option>
                {entityTypes.map(et => (
                  <option key={et} value={et}>{et.charAt(0).toUpperCase() + et.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.registrationId")}</label>
              <input type="text" placeholder="e.g. REG-001" className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.country")}</label>
              <select className="input-enterprise">
                <option value="">{t("form.select")}</option>
                {countries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
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
          </div>
        </div>

        {/* Contact Points */}
        <div className="card-enterprise">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">{t("entity.contactPoints")}</h3>
            <button onClick={addContactPoint} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Plus className="h-3.5 w-3.5" />
              {t("entity.addContactPoint")}
            </button>
          </div>
          <div className="space-y-4">
            {contactPoints.map((cp, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">#{i + 1}</span>
                  {contactPoints.length > 1 && (
                    <button onClick={() => removeContactPoint(i)} className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.cpName")}</label>
                    <input type="text" placeholder="Contact name" className="input-enterprise" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.email")}</label>
                    <input type="email" placeholder="email@example.com" className="input-enterprise" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("entity.phone")}</label>
                    <div className="flex gap-1">
                      <select
                        value={cp.countryCode}
                        onChange={(e) => {
                          const next = [...contactPoints];
                          next[i] = { ...next[i], countryCode: e.target.value };
                          setContactPoints(next);
                        }}
                        className="input-enterprise w-24 shrink-0"
                      >
                        {countryCodes.map(cc => (
                          <option key={cc.code} value={cc.code}>{cc.flag} {cc.code}</option>
                        ))}
                      </select>
                      <input type="tel" placeholder="5XXXXXXXX" className="input-enterprise flex-1" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.country")}</label>
                    <select className="input-enterprise">
                      <option value="">{t("form.select")}</option>
                      {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Addresses */}
        <div className="card-enterprise">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">{t("form.addresses")}</h3>
            <button onClick={addAddress} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Plus className="h-3.5 w-3.5" />
              {t("form.addAddress")}
            </button>
          </div>
          <div className="space-y-3">
            {addresses.map((addr, i) => (
              <div key={i} className="flex items-center gap-2">
                <select
                  value={addr.type}
                  onChange={(e) => {
                    const next = [...addresses];
                    next[i] = { ...next[i], type: e.target.value };
                    setAddresses(next);
                  }}
                  className="input-enterprise w-32 shrink-0"
                >
                  {addressTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <input type="text" placeholder="Enter address" className="input-enterprise flex-1" />
                <button
                  onClick={() => setPrimaryAddress(i)}
                  className={`rounded-lg p-2 transition-colors ${addr.primary ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
                  title="Primary"
                >
                  <Star className={`h-3.5 w-3.5 ${addr.primary ? "fill-primary" : ""}`} />
                </button>
                {addresses.length > 1 && (
                  <button onClick={() => removeAddress(i)} className="rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
