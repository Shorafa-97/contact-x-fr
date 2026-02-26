import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

const sections = [
  {
    title: "English Name",
    fields: [
      { name: "firstNameEn", label: "First Name", placeholder: "Enter first name" },
      { name: "lastNameEn", label: "Last Name", placeholder: "Enter last name" },
    ],
  },
  {
    title: "Arabic Name",
    rtl: true,
    fields: [
      { name: "firstNameAr", label: "الاسم الأول", placeholder: "أدخل الاسم الأول" },
      { name: "lastNameAr", label: "اسم العائلة", placeholder: "أدخل اسم العائلة" },
    ],
  },
  {
    title: "Personal Info",
    fields: [
      { name: "dateOfBirth", label: "Date of Birth", type: "date" },
      { name: "nationality", label: "Nationality", placeholder: "Enter nationality" },
      { name: "gender", label: "Gender", type: "select", options: ["Male", "Female"] },
    ],
  },
  {
    title: "Contact Info",
    fields: [
      { name: "email", label: "Email", type: "email", placeholder: "email@example.com" },
      { name: "phone", label: "Phone", placeholder: "+966 5XXXXXXXX" },
    ],
  },
  {
    title: "Professional Info",
    fields: [
      { name: "organization", label: "Organization", placeholder: "Enter organization" },
      { name: "position", label: "Position", placeholder: "Enter position" },
    ],
  },
  {
    title: "Address",
    fields: [
      { name: "city", label: "City", placeholder: "Enter city" },
      { name: "country", label: "Country", placeholder: "Enter country" },
      { name: "postalCode", label: "Postal Code", placeholder: "Enter postal code" },
    ],
  },
  {
    title: "Classifications",
    fields: [
      { name: "type", label: "Contact Type", type: "select", options: ["Individual", "Organization", "Government", "Non-Profit"] },
      { name: "status", label: "Status", type: "select", options: ["Active", "Inactive", "Pending"] },
    ],
  },
];

export default function ContactForm() {
  const { id } = useParams();
  const isEdit = id && id !== "new";

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <Link to="/contacts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Contacts
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">{isEdit ? "Edit Contact" : "New Contact"}</h1>
          <p className="page-subtitle">{isEdit ? "Update contact information" : "Add a new contact to the system"}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Save className="h-4 w-4" />
          Save
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="card-enterprise">
            <h3 className="mb-4 text-base font-semibold text-foreground">{section.title}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {section.fields.map((field) => (
                <div key={field.name}>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">{field.label}</label>
                  {field.type === "select" ? (
                    <select className="input-enterprise">
                      <option value="">Select...</option>
                      {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      className="input-enterprise"
                      dir={section.rtl ? "rtl" : undefined}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
