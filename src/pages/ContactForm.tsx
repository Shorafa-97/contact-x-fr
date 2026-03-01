import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import DatePickerField from "@/components/ui/date-picker-field";

const existingEntities = [
  { id: "e-1", nameEn: "Ministry of Finance" },
  { id: "e-2", nameEn: "Ministry of Health" },
  { id: "e-3", nameEn: "National Bank" },
  { id: "e-4", nameEn: "Defense Agency" },
  { id: "e-5", nameEn: "Education Department" },
];

const countries = [
  "Saudi Arabia", "United Arab Emirates", "Bahrain", "Qatar", "Oman", "Kuwait",
  "Egypt", "Jordan", "Lebanon", "Iraq", "Morocco", "Tunisia", "Algeria", "Libya", "Sudan",
  "Syria", "Palestine", "Yemen", "Somalia", "Mauritania", "Djibouti", "Comoros",
  "United States", "United Kingdom", "Germany", "France", "Canada", "Australia",
  "India", "Pakistan", "Philippines", "Indonesia", "Bangladesh", "Sri Lanka",
  "Turkey", "Iran", "China", "Japan", "South Korea", "Malaysia", "Singapore",
  "Brazil", "Mexico", "South Africa", "Nigeria", "Kenya", "Ethiopia",
];

const addressTypes = ["Home", "Work", "Office", "Billing", "Shipping", "Other"];

const countryCodes = [
  { code: "+966", flag: "🇸🇦" }, { code: "+971", flag: "🇦🇪" }, { code: "+973", flag: "🇧🇭" },
  { code: "+974", flag: "🇶🇦" }, { code: "+968", flag: "🇴🇲" }, { code: "+965", flag: "🇰🇼" },
  { code: "+20", flag: "🇪🇬" }, { code: "+962", flag: "🇯🇴" }, { code: "+961", flag: "🇱🇧" },
  { code: "+1", flag: "🇺🇸" }, { code: "+44", flag: "🇬🇧" }, { code: "+91", flag: "🇮🇳" },
  { code: "+92", flag: "🇵🇰" }, { code: "+63", flag: "🇵🇭" },
];

export default function ContactForm() {
  const { id } = useParams();
  const isEdit = id && id !== "new";
  const { t } = useTranslation();

  const [emails, setEmails] = useState([{ value: "", primary: true }]);
  const [phones, setPhones] = useState([{ value: "", countryCode: "+966", primary: true }]);
  const [addresses, setAddresses] = useState([{ type: "Home", address: "", primary: true }]);

  const addEmail = () => setEmails([...emails, { value: "", primary: false }]);
  const removeEmail = (i: number) => {
    const next = emails.filter((_, idx) => idx !== i);
    if (next.length > 0 && !next.some(e => e.primary)) next[0].primary = true;
    setEmails(next);
  };
  const setPrimaryEmail = (i: number) => setEmails(emails.map((e, idx) => ({ ...e, primary: idx === i })));

  const addPhone = () => setPhones([...phones, { value: "", countryCode: "+966", primary: false }]);
  const removePhone = (i: number) => {
    const next = phones.filter((_, idx) => idx !== i);
    if (next.length > 0 && !next.some(p => p.primary)) next[0].primary = true;
    setPhones(next);
  };
  const setPrimaryPhone = (i: number) => setPhones(phones.map((p, idx) => ({ ...p, primary: idx === i })));

  const addAddress = () => setAddresses([...addresses, { type: "Home", address: "", primary: false }]);
  const removeAddress = (i: number) => {
    const next = addresses.filter((_, idx) => idx !== i);
    if (next.length > 0 && !next.some(a => a.primary)) next[0].primary = true;
    setAddresses(next);
  };
  const setPrimaryAddress = (i: number) => setAddresses(addresses.map((a, idx) => ({ ...a, primary: idx === i })));

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <Link to="/contacts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        {t("contact.backToContacts")}
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">{isEdit ? t("form.editContact") : t("form.newContact")}</h1>
          <p className="page-subtitle">{isEdit ? t("form.updateContact") : t("form.addNewContact")}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Save className="h-4 w-4" />
          {t("form.save")}
        </button>
      </div>

      <div className="space-y-6">
        {/* Contact Type & Personal */}
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("form.personalInfo")}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.contactType")}</label>
              <select className="input-enterprise">
                <option value="">{t("form.select")}</option>
                <option value="Individual">{t("common.individual")}</option>
                <option value="Organization">{t("common.organization")}</option>
                <option value="Government">{t("common.government")}</option>
                <option value="Non-Profit">{t("common.nonProfit")}</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.nationalId")}</label>
              <input type="text" placeholder="1234567890" className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.dateOfBirth")}</label>
              <DatePickerField />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.nationality")}</label>
              <select className="input-enterprise">
                <option value="">{t("form.select")}</option>
                {countries.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.gender")}</label>
              <select className="input-enterprise">
                <option value="">{t("form.select")}</option>
                <option value="Male">{t("form.male")}</option>
                <option value="Female">{t("form.female")}</option>
              </select>
            </div>
          </div>
        </div>

        {/* English Name */}
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("form.englishName")}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.prefix")}</label>
              <input type="text" placeholder="Mr., Mrs., Ms., Dr., Prof." className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.firstName")}</label>
              <input type="text" placeholder="Enter first name" className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.middleName")}</label>
              <input type="text" placeholder="Enter middle name" className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.lastName")}</label>
              <input type="text" placeholder="Enter last name" className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.suffix")}</label>
              <input type="text" placeholder="Jr., Sr., III" className="input-enterprise" />
            </div>
          </div>
        </div>

        {/* Arabic Name */}
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("form.arabicName")}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.prefixAr")}</label>
              <input type="text" placeholder="السيد، السيدة، الدكتور، الأستاذ" className="input-enterprise" dir="rtl" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.firstNameAr")}</label>
              <input type="text" placeholder="أدخل الاسم الأول" className="input-enterprise" dir="rtl" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.middleNameAr")}</label>
              <input type="text" placeholder="أدخل الاسم الأوسط" className="input-enterprise" dir="rtl" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.lastNameAr")}</label>
              <input type="text" placeholder="أدخل اسم العائلة" className="input-enterprise" dir="rtl" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.suffixAr")}</label>
              <input type="text" placeholder="اللاحقة" className="input-enterprise" dir="rtl" />
            </div>
          </div>
        </div>

        {/* Professional Info - replaced Organization with Current Entity + Entity Name */}
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("form.professionalInfo")}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.currentEntity")}</label>
              <select className="input-enterprise">
                <option value="">{t("form.select")}</option>
                {existingEntities.map(e => (
                  <option key={e.id} value={e.id}>{e.nameEn}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.entityName")}</label>
              <input type="text" placeholder={t("form.entityName")} className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.position")}</label>
              <input type="text" placeholder={t("form.position")} className="input-enterprise" />
            </div>
          </div>
        </div>

        {/* Email Addresses */}
        <div className="card-enterprise">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">{t("form.emails")}</h3>
            <button onClick={addEmail} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Plus className="h-3.5 w-3.5" />
              {t("form.addEmail")}
            </button>
          </div>
          <div className="space-y-3">
            {emails.map((email, i) => (
              <div key={i} className="flex items-center gap-3">
                <input type="email" placeholder="email@example.com" className="input-enterprise flex-1" />
                <button
                  onClick={() => setPrimaryEmail(i)}
                  className={`rounded-lg p-2 transition-colors ${email.primary ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
                  title={t("form.setPrimary")}
                >
                  <Star className={`h-4 w-4 ${email.primary ? "fill-primary" : ""}`} />
                </button>
                {emails.length > 1 && (
                  <button onClick={() => removeEmail(i)} className="rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Phone Numbers */}
        <div className="card-enterprise">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">{t("form.phones")}</h3>
            <button onClick={addPhone} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Plus className="h-3.5 w-3.5" />
              {t("form.addPhone")}
            </button>
          </div>
          <div className="space-y-3">
            {phones.map((phone, i) => (
              <div key={i} className="flex items-center gap-2">
                <select
                  value={phone.countryCode}
                  onChange={(e) => {
                    const next = [...phones];
                    next[i] = { ...next[i], countryCode: e.target.value };
                    setPhones(next);
                  }}
                  className="input-enterprise w-28 shrink-0"
                >
                  {countryCodes.map(cc => (
                    <option key={cc.code} value={cc.code}>{cc.flag} {cc.code}</option>
                  ))}
                </select>
                <input type="tel" placeholder="5XXXXXXXX" className="input-enterprise flex-1" />
                <button
                  onClick={() => setPrimaryPhone(i)}
                  className={`rounded-lg p-2 transition-colors ${phone.primary ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
                  title={t("form.setPrimary")}
                >
                  <Star className={`h-4 w-4 ${phone.primary ? "fill-primary" : ""}`} />
                </button>
                {phones.length > 1 && (
                  <button onClick={() => removePhone(i)} className="rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Addresses - simplified to type select + address text */}
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
                <input type="text" placeholder={t("form.addressLine")} className="input-enterprise flex-1" />
                <button
                  onClick={() => setPrimaryAddress(i)}
                  className={`rounded-lg p-2 transition-colors ${addr.primary ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
                  title={t("form.setPrimary")}
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
