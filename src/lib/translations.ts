export type Lang = "en" | "ar";

const translations: Record<string, Record<Lang, string>> = {
  // Sidebar
  "nav.dashboard": { en: "Dashboard", ar: "لوحة التحكم" },
  "nav.contacts": { en: "Contacts", ar: "جهات الاتصال" },
  "nav.entities": { en: "Entities", ar: "الجهات" },
  "nav.duplicates": { en: "Duplicates", ar: "التكرارات" },
  "nav.analytics": { en: "Analytics", ar: "التحليلات" },
  "nav.executive": { en: "Executive", ar: "التنفيذي" },
  "nav.governance": { en: "Governance", ar: "الحوكمة" },
  "nav.more": { en: "More", ar: "المزيد" },

  // Header
  "header.home": { en: "Home", ar: "الرئيسية" },
  "header.toggleTheme": { en: "Toggle theme", ar: "تبديل السمة" },
  "header.toggleDir": { en: "Toggle language direction", ar: "تبديل اتجاه اللغة" },
  "header.collapse": { en: "Collapse", ar: "طي" },

  // Page titles
  "page.dashboard": { en: "Dashboard", ar: "لوحة التحكم" },
  "page.contacts": { en: "Contacts", ar: "جهات الاتصال" },
  "page.entities": { en: "Entities", ar: "الجهات" },
  "page.duplicates": { en: "Duplicate Resolution", ar: "حل التكرارات" },
  "page.analytics": { en: "Analytics", ar: "التحليلات" },
  "page.executive": { en: "Executive Dashboard", ar: "لوحة التحكم التنفيذية" },
  "page.governance": { en: "Governance Dashboard", ar: "لوحة حوكمة البيانات" },

  // Dashboard
  "dashboard.overview": { en: "Overview of your master data management platform", ar: "نظرة عامة على منصة إدارة البيانات الرئيسية" },
  "dashboard.totalContacts": { en: "Total Contacts", ar: "إجمالي جهات الاتصال" },
  "dashboard.totalEntities": { en: "Total Entities", ar: "إجمالي الجهات" },
  "dashboard.avgCompleteness": { en: "Avg. Completeness", ar: "متوسط الاكتمال" },
  "dashboard.pendingDuplicates": { en: "Pending Duplicates", ar: "التكرارات المعلقة" },
  "dashboard.contactsByType": { en: "Contacts by Type", ar: "جهات الاتصال حسب النوع" },
  "dashboard.entitiesByType": { en: "Entities by Type", ar: "الجهات حسب النوع" },
  "dashboard.recentActivity": { en: "Recent Activity", ar: "النشاط الأخير" },
  "dashboard.action": { en: "Action", ar: "الإجراء" },
  "dashboard.name": { en: "Name", ar: "الاسم" },
  "dashboard.type": { en: "Type", ar: "النوع" },
  "dashboard.time": { en: "Time", ar: "الوقت" },

  // Contacts list
  "contacts.totalContacts": { en: "total contacts", ar: "إجمالي جهات الاتصال" },
  "contacts.addContact": { en: "Add Contact", ar: "إضافة جهة اتصال" },
  "contacts.search": { en: "Search contacts by name, email...", ar: "بحث عن جهات الاتصال بالاسم أو البريد..." },
  "contacts.filters": { en: "Filters", ar: "تصفية" },
  "contacts.name": { en: "Name", ar: "الاسم" },
  "contacts.type": { en: "Type", ar: "النوع" },
  "contacts.emailPhone": { en: "Email / Phone", ar: "البريد / الهاتف" },
  "contacts.completeness": { en: "Completeness", ar: "الاكتمال" },
  "contacts.status": { en: "Status", ar: "الحالة" },
  "contacts.showing": { en: "Showing", ar: "عرض" },
  "contacts.of": { en: "of", ar: "من" },

  // Contact detail
  "contact.backToContacts": { en: "Back to Contacts", ar: "العودة إلى جهات الاتصال" },
  "contact.edit": { en: "Edit", ar: "تعديل" },
  "contact.profileCompleteness": { en: "Profile Completeness", ar: "اكتمال الملف الشخصي" },
  "contact.overview": { en: "Overview", ar: "نظرة عامة" },
  "contact.relationships": { en: "Relationships", ar: "العلاقات" },
  "contact.auditLog": { en: "Audit Log", ar: "سجل التدقيق" },
  "contact.contactInfo": { en: "Contact Information", ar: "معلومات الاتصال" },
  "contact.professionalInfo": { en: "Professional Information", ar: "المعلومات المهنية" },
  "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.phone": { en: "Phone", ar: "الهاتف" },
  "contact.address": { en: "Address", ar: "العنوان" },
  "contact.organization": { en: "Organization", ar: "المنظمة" },
  "contact.position": { en: "Position", ar: "المنصب" },
  "contact.created": { en: "Created", ar: "تاريخ الإنشاء" },
  "contact.updated": { en: "Updated", ar: "تاريخ التحديث" },
  "contact.relatedEntities": { en: "Related Entities", ar: "الجهات ذات الصلة" },
  "contact.activityHistory": { en: "Activity History", ar: "سجل النشاط" },

  // Contact form
  "form.newContact": { en: "New Contact", ar: "جهة اتصال جديدة" },
  "form.editContact": { en: "Edit Contact", ar: "تعديل جهة الاتصال" },
  "form.addNewContact": { en: "Add a new contact to the system", ar: "إضافة جهة اتصال جديدة إلى النظام" },
  "form.updateContact": { en: "Update contact information", ar: "تحديث معلومات جهة الاتصال" },
  "form.save": { en: "Save", ar: "حفظ" },
  "form.englishName": { en: "English Name", ar: "الاسم بالإنجليزية" },
  "form.arabicName": { en: "Arabic Name", ar: "الاسم بالعربية" },
  "form.personalInfo": { en: "Personal Info", ar: "المعلومات الشخصية" },
  "form.contactInfo": { en: "Contact Info", ar: "معلومات الاتصال" },
  "form.professionalInfo": { en: "Professional Info", ar: "المعلومات المهنية" },
  "form.addresses": { en: "Addresses", ar: "العناوين" },
  "form.prefix": { en: "Prefix", ar: "اللقب" },
  "form.firstName": { en: "First Name", ar: "الاسم الأول" },
  "form.middleName": { en: "Middle Name", ar: "الاسم الأوسط" },
  "form.lastName": { en: "Last Name", ar: "اسم العائلة" },
  "form.suffix": { en: "Suffix", ar: "اللاحقة" },
  "form.prefixAr": { en: "Prefix (Arabic)", ar: "اللقب (عربي)" },
  "form.firstNameAr": { en: "First Name (Arabic)", ar: "الاسم الأول (عربي)" },
  "form.middleNameAr": { en: "Middle Name (Arabic)", ar: "الاسم الأوسط (عربي)" },
  "form.lastNameAr": { en: "Last Name (Arabic)", ar: "اسم العائلة (عربي)" },
  "form.suffixAr": { en: "Suffix (Arabic)", ar: "اللاحقة (عربي)" },
  "form.contactType": { en: "Contact Type", ar: "نوع جهة الاتصال" },
  "form.nationalId": { en: "National ID", ar: "رقم الهوية الوطنية" },
  "form.dateOfBirth": { en: "Date of Birth", ar: "تاريخ الميلاد" },
  "form.nationality": { en: "Nationality", ar: "الجنسية" },
  "form.gender": { en: "Gender", ar: "الجنس" },
  "form.male": { en: "Male", ar: "ذكر" },
  "form.female": { en: "Female", ar: "أنثى" },
  "form.organization": { en: "Organization", ar: "المنظمة" },
  "form.position": { en: "Position", ar: "المنصب" },
  "form.emails": { en: "Email Addresses", ar: "عناوين البريد الإلكتروني" },
  "form.phones": { en: "Phone Numbers", ar: "أرقام الهاتف" },
  "form.addEmail": { en: "Add Email", ar: "إضافة بريد إلكتروني" },
  "form.addPhone": { en: "Add Phone", ar: "إضافة رقم هاتف" },
  "form.addAddress": { en: "Add Address", ar: "إضافة عنوان" },
  "form.city": { en: "City", ar: "المدينة" },
  "form.country": { en: "Country", ar: "الدولة" },
  "form.postalCode": { en: "Postal Code", ar: "الرمز البريدي" },
  "form.addressLine": { en: "Address Line", ar: "سطر العنوان" },
  "form.select": { en: "Select...", ar: "اختر..." },
  "form.remove": { en: "Remove", ar: "إزالة" },

  // Entities
  "entities.totalEntities": { en: "total entities", ar: "إجمالي الجهات" },
  "entities.addEntity": { en: "Add Entity", ar: "إضافة جهة" },
  "entities.search": { en: "Search entities...", ar: "بحث عن الجهات..." },
  "entities.entityName": { en: "Entity Name", ar: "اسم الجهة" },
  "entities.type": { en: "Type", ar: "النوع" },
  "entities.parent": { en: "Parent", ar: "الجهة الأم" },
  "entities.contacts": { en: "Contacts", ar: "جهات الاتصال" },
  "entities.status": { en: "Status", ar: "الحالة" },
  "entities.backToEntities": { en: "Back to Entities", ar: "العودة إلى الجهات" },
  "entities.orgHierarchy": { en: "Organization Hierarchy", ar: "الهيكل التنظيمي" },
  "entities.relatedContacts": { en: "Related Contacts", ar: "جهات الاتصال ذات الصلة" },
  "entities.completeness": { en: "Profile Completeness", ar: "اكتمال الملف" },
  "entities.details": { en: "Entity Details", ar: "تفاصيل الجهة" },
  "entities.registrationId": { en: "Registration ID", ar: "رقم التسجيل" },
  "entities.country": { en: "Country", ar: "الدولة" },
  "entities.parentEntity": { en: "Parent Entity", ar: "الجهة الأم" },

  // Entity form
  "entity.create": { en: "Create Entity", ar: "إنشاء جهة" },
  "entity.nameEn": { en: "Entity Name (English)", ar: "اسم الجهة (إنجليزي)" },
  "entity.nameAr": { en: "Entity Name (Arabic)", ar: "اسم الجهة (عربي)" },
  "entity.type": { en: "Entity Type", ar: "نوع الجهة" },
  "entity.parentEntity": { en: "Parent Entity", ar: "الجهة الأم" },
  "entity.status": { en: "Status", ar: "الحالة" },
  "entity.description": { en: "Description", ar: "الوصف" },
  "entity.code": { en: "Entity Code", ar: "رمز الجهة" },
  "entity.email": { en: "Official Email", ar: "البريد الرسمي" },
  "entity.phone": { en: "Official Phone", ar: "الهاتف الرسمي" },
  "entity.website": { en: "Website", ar: "الموقع الإلكتروني" },
  "entity.address": { en: "Address", ar: "العنوان" },
  "entity.cancel": { en: "Cancel", ar: "إلغاء" },
  "entity.save": { en: "Save", ar: "حفظ" },

  // Duplicates
  "duplicates.title": { en: "Duplicate Resolution", ar: "حل التكرارات" },
  "duplicates.found": { en: "potential duplicates found", ar: "تكرارات محتملة" },
  "duplicates.confidence": { en: "Match Confidence", ar: "نسبة التطابق" },
  "duplicates.merge": { en: "Merge", ar: "دمج" },
  "duplicates.dismiss": { en: "Dismiss", ar: "تجاهل" },
  "duplicates.recordA": { en: "Record A", ar: "السجل أ" },
  "duplicates.recordB": { en: "Record B", ar: "السجل ب" },

  // Analytics
  "analytics.title": { en: "Analytics", ar: "التحليلات" },
  "analytics.subtitle": { en: "Data quality and distribution metrics", ar: "مقاييس جودة البيانات والتوزيع" },
  "analytics.completenessDistribution": { en: "Completeness Distribution", ar: "توزيع الاكتمال" },
  "analytics.contactsByType": { en: "Contacts by Type", ar: "جهات الاتصال حسب النوع" },
  "analytics.entitiesByType": { en: "Entities by Type", ar: "الجهات حسب النوع" },
  "analytics.dataQualityTrends": { en: "Data Quality Trends", ar: "اتجاهات جودة البيانات" },

  // Executive
  "executive.title": { en: "Executive Dashboard", ar: "لوحة التحكم التنفيذية" },
  "executive.subtitle": { en: "Strategic overview for leadership", ar: "نظرة استراتيجية للقيادة" },
  "executive.totalRecords": { en: "Total Records", ar: "إجمالي السجلات" },
  "executive.dataQuality": { en: "Data Quality Score", ar: "درجة جودة البيانات" },
  "executive.resolutionRate": { en: "Resolution Rate", ar: "معدل الحل" },
  "executive.growthTrend": { en: "Growth Trend", ar: "اتجاه النمو" },

  // Governance
  "governance.title": { en: "Governance Dashboard", ar: "لوحة حوكمة البيانات" },
  "governance.subtitle": { en: "Data quality governance and compliance metrics", ar: "مقاييس حوكمة جودة البيانات والامتثال" },
  "governance.weakProfiles": { en: "Weak Profiles", ar: "ملفات ضعيفة" },
  "governance.orphanRecords": { en: "Orphan Records", ar: "سجلات يتيمة" },
  "governance.pendingDuplicates": { en: "Pending Duplicates", ar: "تكرارات معلقة" },
  "governance.qualityAlerts": { en: "Quality Alerts", ar: "تنبيهات الجودة" },
  "governance.viewAll": { en: "View All →", ar: "عرض الكل ←" },
  "governance.missing": { en: "Missing", ar: "ناقص" },

  // Common
  "common.active": { en: "Active", ar: "نشط" },
  "common.inactive": { en: "Inactive", ar: "غير نشط" },
  "common.pending": { en: "Pending", ar: "معلق" },
  "common.view": { en: "View", ar: "عرض" },
  "common.update": { en: "Update", ar: "تعديل" },
  "common.delete": { en: "Delete", ar: "حذف" },
  "common.individual": { en: "Individual", ar: "فرد" },
  "common.organization": { en: "Organization", ar: "منظمة" },
  "common.government": { en: "Government", ar: "حكومي" },
  "common.nonProfit": { en: "Non-Profit", ar: "غير ربحي" },
  "common.ministry": { en: "Ministry", ar: "وزارة" },
  "common.agency": { en: "Agency", ar: "وكالة" },
  "common.department": { en: "Department", ar: "إدارة" },
  "common.division": { en: "Division", ar: "قسم" },
  "common.unit": { en: "Unit", ar: "وحدة" },
  "common.contacts": { en: "contacts", ar: "جهات اتصال" },
  "common.fromLastMonth": { en: "from last month", ar: "من الشهر الماضي" },
  "common.resolvedThisWeek": { en: "resolved this week", ar: "تم حلها هذا الأسبوع" },

  // Dashboard tabs
  "dashboard.tabMain": { en: "Overview", ar: "نظرة عامة" },
  "dashboard.tabExecutive": { en: "Executive", ar: "التنفيذي" },
  "dashboard.tabGovernance": { en: "Governance", ar: "الحوكمة" },

  // Entity form page
  "entity.edit": { en: "Edit Entity", ar: "تعديل الجهة" },
  "entity.createDesc": { en: "Add a new entity to the system", ar: "إضافة جهة جديدة إلى النظام" },
  "entity.updateDesc": { en: "Update entity information", ar: "تحديث معلومات الجهة" },
  "entity.nameSection": { en: "Entity Name", ar: "اسم الجهة" },
  "entity.classification": { en: "Classification", ar: "التصنيف" },

  // Duplicate merge
  "duplicates.selectMain": { en: "Select the main profile to keep after merge", ar: "اختر الملف الرئيسي للاحتفاظ به بعد الدمج" },
  "duplicates.mainProfile": { en: "Main", ar: "رئيسي" },

  // Contact form primary
  "form.setPrimary": { en: "Set as primary", ar: "تعيين كأساسي" },
  "form.address": { en: "Address", ar: "العنوان" },

  // Dashboard analytics tab
  "dashboard.tabAnalytics": { en: "Analytics", ar: "التحليلات" },

  // Search
  "nav.search": { en: "Search", ar: "بحث" },
  "search.title": { en: "Search", ar: "بحث" },
  "search.subtitle": { en: "Search across contacts and entities", ar: "البحث في جهات الاتصال والجهات" },
  "search.placeholder": { en: "Search by name, email, or organization...", ar: "البحث بالاسم أو البريد أو المنظمة..." },
  "search.all": { en: "All", ar: "الكل" },
  "search.contacts": { en: "Contacts", ar: "جهات الاتصال" },
  "search.entities": { en: "Entities", ar: "الجهات" },
  "search.startTyping": { en: "Start typing to search...", ar: "ابدأ الكتابة للبحث..." },
  "search.noResults": { en: "No results found", ar: "لا توجد نتائج" },
  "search.allContactTypes": { en: "All Contact Types", ar: "جميع أنواع جهات الاتصال" },
  "search.allEntityTypes": { en: "All Entity Types", ar: "جميع أنواع الجهات" },

  // Contact form additions
  "form.currentEntity": { en: "Current Entity", ar: "الجهة الحالية" },
  "form.entityName": { en: "Entity Name", ar: "اسم الجهة" },

  // Entity form additions
  "entity.registrationId": { en: "Registration ID", ar: "رقم التسجيل" },
  "entity.contactPoints": { en: "Contact Points", ar: "نقاط الاتصال" },
  "entity.addContactPoint": { en: "Add Contact Point", ar: "إضافة نقطة اتصال" },
  "entity.cpName": { en: "Name", ar: "الاسم" },

  // Duplicates additions
  "duplicates.merged": { en: "Merged", ar: "مدموج" },
  "duplicates.dismissed": { en: "Dismissed", ar: "مرفوض" },

  // Audit Logs
  "audit.title": { en: "Audit Logs", ar: "سجلات التدقيق" },
  "audit.timestamp": { en: "Timestamp", ar: "الوقت" },
  "audit.user": { en: "User", ar: "المستخدم" },
  "audit.action": { en: "Action", ar: "الإجراء" },
  "audit.entityType": { en: "Entity Type", ar: "نوع الكيان" },
  "audit.entityId": { en: "Entity ID", ar: "معرف الكيان" },
  "audit.changes": { en: "Changes", ar: "التغييرات" },

  // Operational dashboard
  "dashboard.tabOperational": { en: "Operational", ar: "التشغيلي" },
  "operational.activeContacts": { en: "Active Contacts", ar: "جهات الاتصال النشطة" },
  "operational.activeEntities": { en: "Active Entities", ar: "الجهات النشطة" },
  "operational.multiEntity": { en: "Contacts with Multiple Entities", ar: "جهات اتصال متعددة الجهات" },
  "operational.avgEntities": { en: "Avg Entities per Contact", ar: "متوسط الجهات لكل جهة اتصال" },
  "operational.inactive90": { en: "Inactive 90+ Days", ar: "غير نشط 90+ يوم" },
  "operational.mostActive": { en: "Most Active Contacts", ar: "أكثر جهات الاتصال نشاطاً" },
  "operational.recentlyInactive": { en: "Recently Inactive Contacts", ar: "جهات اتصال غير نشطة مؤخراً" },
  "operational.recentContacts": { en: "Recent Contacts", ar: "جهات الاتصال الأخيرة" },
  "operational.recentEntities": { en: "Recent Entities", ar: "الجهات الأخيرة" },

  // Import
  "import.title.contact": { en: "Import Contacts", ar: "استيراد جهات الاتصال" },
  "import.title.entity": { en: "Import Entities", ar: "استيراد الجهات" },
  "import.dragDrop": { en: "Drag & drop a file here, or", ar: "اسحب وأفلت ملفاً هنا، أو" },
  "import.browse": { en: "Browse", ar: "تصفح" },
  "import.supported": { en: "Supported: CSV, XLSX, JSON — max 5MB", ar: "مدعوم: CSV, XLSX, JSON — حد أقصى 5 ميجابايت" },
  "import.downloadTemplate": { en: "Download Template", ar: "تحميل القالب" },
  "import.preview": { en: "Preview", ar: "معاينة" },
  "import.valid": { en: "valid", ar: "صالح" },
  "import.invalid": { en: "invalid", ar: "غير صالح" },
  "import.parsing": { en: "Parsing file...", ar: "جاري تحليل الملف..." },
  "import.fixErrors": { en: "Please fix the errors in the highlighted rows before importing. All rows must be valid.", ar: "يرجى إصلاح الأخطاء في الصفوف المميزة قبل الاستيراد. يجب أن تكون جميع الصفوف صالحة." },
  "import.cancel": { en: "Cancel", ar: "إلغاء" },
  "import.import": { en: "Import", ar: "استيراد" },
  "import.importContacts": { en: "Import", ar: "استيراد" },
  "import.importEntities": { en: "Import", ar: "استيراد" },
};

export function t(key: string, lang: Lang): string {
  return translations[key]?.[lang] ?? key;
}
