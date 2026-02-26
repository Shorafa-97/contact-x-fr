import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ContactForm() {
  const { id } = useParams();
  const isEdit = id && id !== "new";
  const { t } = useTranslation();

  const [emails, setEmails] = useState([""]);
  const [phones, setPhones] = useState([""]);
  const [addresses, setAddresses] = useState([{ line: "", city: "", country: "", postalCode: "" }]);

  const addEmail = () => setEmails([...emails, ""]);
  const removeEmail = (i: number) => setEmails(emails.filter((_, idx) => idx !== i));
  const addPhone = () => setPhones([...phones, ""]);
  const removePhone = (i: number) => setPhones(phones.filter((_, idx) => idx !== i));
  const addAddress = () => setAddresses([...addresses, { line: "", city: "", country: "", postalCode: "" }]);
  const removeAddress = (i: number) => setAddresses(addresses.filter((_, idx) => idx !== i));

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
        {/* Contact Type & National ID */}
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
              <input type="date" className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.nationality")}</label>
              <input type="text" placeholder={t("form.nationality")} className="input-enterprise" />
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
              <select className="input-enterprise">
                <option value="">{t("form.select")}</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
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
              <select className="input-enterprise" dir="rtl">
                <option value="">اختر...</option>
                <option value="السيد">السيد</option>
                <option value="السيدة">السيدة</option>
                <option value="الدكتور">الدكتور</option>
                <option value="الأستاذ">الأستاذ</option>
              </select>
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

        {/* Professional Info */}
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("form.professionalInfo")}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.organization")}</label>
              <input type="text" placeholder={t("form.organization")} className="input-enterprise" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("form.position")}</label>
              <input type="text" placeholder={t("form.position")} className="input-enterprise" />
            </div>
          </div>
        </div>

        {/* Email Addresses - Multiple */}
        <div className="card-enterprise">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">{t("form.emails")}</h3>
            <button onClick={addEmail} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Plus className="h-3.5 w-3.5" />
              {t("form.addEmail")}
            </button>
          </div>
          <div className="space-y-3">
            {emails.map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <input type="email" placeholder="email@example.com" className="input-enterprise flex-1" />
                {emails.length > 1 && (
                  <button onClick={() => removeEmail(i)} className="rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Phone Numbers - Multiple */}
        <div className="card-enterprise">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">{t("form.phones")}</h3>
            <button onClick={addPhone} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Plus className="h-3.5 w-3.5" />
              {t("form.addPhone")}
            </button>
          </div>
          <div className="space-y-3">
            {phones.map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <input type="tel" placeholder="+966 5XXXXXXXX" className="input-enterprise flex-1" />
                {phones.length > 1 && (
                  <button onClick={() => removePhone(i)} className="rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Addresses - Multiple */}
        <div className="card-enterprise">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">{t("form.addresses")}</h3>
            <button onClick={addAddress} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Plus className="h-3.5 w-3.5" />
              {t("form.addAddress")}
            </button>
          </div>
          <div className="space-y-4">
            {addresses.map((_, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{t("form.address")} #{i + 1}</span>
                  {addresses.length > 1 && (
                    <button onClick={() => removeAddress(i)} className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
