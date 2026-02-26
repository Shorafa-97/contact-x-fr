import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Building2, CheckCircle, GitCompare, FileWarning, AlertTriangle, Target, ChevronRight, TrendingUp, Clock } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import { useTranslation } from "@/hooks/useTranslation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Main Dashboard data
const contactsByType = [
  { name: "Individual", value: 2450 },
  { name: "Organization", value: 890 },
  { name: "Government", value: 340 },
  { name: "Non-Profit", value: 180 },
];

const entitiesByType = [
  { name: "Ministry", value: 45 },
  { name: "Agency", value: 78 },
  { name: "Department", value: 124 },
  { name: "Division", value: 89 },
  { name: "Unit", value: 56 },
];

const COLORS = ["hsl(217, 91%, 60%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)", "hsl(199, 89%, 48%)"];

const recentActivity = [
  { id: 1, action: "Contact Created", actionAr: "تم إنشاء جهة اتصال", name: "Mohammed Al-Rashid", nameAr: "محمد الرشيد", type: "Individual", time: "2 min ago", timeAr: "قبل دقيقتين" },
  { id: 2, action: "Entity Updated", actionAr: "تم تحديث جهة", name: "Ministry of Finance", nameAr: "وزارة المالية", type: "Ministry", time: "15 min ago", timeAr: "قبل 15 دقيقة" },
  { id: 3, action: "Duplicate Found", actionAr: "تم العثور على تكرار", name: "Sara Ahmed", nameAr: "سارة أحمد", type: "Individual", time: "1 hour ago", timeAr: "قبل ساعة" },
  { id: 4, action: "Contact Merged", actionAr: "تم دمج جهة اتصال", name: "National Bank", nameAr: "البنك الوطني", type: "Organization", time: "2 hours ago", timeAr: "قبل ساعتين" },
  { id: 5, action: "Contact Created", actionAr: "تم إنشاء جهة اتصال", name: "Ahmad Hassan", nameAr: "أحمد حسن", type: "Individual", time: "3 hours ago", timeAr: "قبل 3 ساعات" },
];

// Executive data
const monthlyGrowth = [
  { month: "Sep", contacts: 3200, entities: 350 },
  { month: "Oct", contacts: 3400, entities: 360 },
  { month: "Nov", contacts: 3550, entities: 370 },
  { month: "Dec", contacts: 3650, entities: 378 },
  { month: "Jan", contacts: 3780, entities: 385 },
  { month: "Feb", contacts: 3860, entities: 392 },
];

// Governance data
const weakProfiles = [
  { id: "c-1", name: "Unknown Contact #142", completeness: 15, missing: ["Email", "Phone", "Organization"] },
  { id: "c-2", name: "Test Record", completeness: 8, missing: ["Email", "Phone", "Name (Arabic)", "Address"] },
  { id: "c-3", name: "Partial Entry", completeness: 22, missing: ["Phone", "Organization", "Address"] },
];

const orphanRecords = [
  { id: "c-5", name: "Khalid Mahmoud", nameAr: "خالد محمود", type: "Individual", reason: "No entity linked", reasonAr: "غير مرتبط بجهة" },
  { id: "c-6", name: "Old Ministry Record", nameAr: "سجل وزارة قديم", type: "Organization", reason: "Parent entity deleted", reasonAr: "تم حذف الجهة الأم" },
];

export default function Dashboard() {
  const { t, lang } = useTranslation();
  const isAr = lang === "ar";

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">{t("page.dashboard")}</h1>
        <p className="page-subtitle">{t("dashboard.overview")}</p>
      </div>

      <Tabs defaultValue="main" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="main">{t("dashboard.tabMain")}</TabsTrigger>
          <TabsTrigger value="executive">{t("dashboard.tabExecutive")}</TabsTrigger>
          <TabsTrigger value="governance">{t("dashboard.tabGovernance")}</TabsTrigger>
          <TabsTrigger value="operational">{t("dashboard.tabOperational")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("dashboard.tabAnalytics")}</TabsTrigger>
        </TabsList>

        {/* Main Dashboard */}
        <TabsContent value="main" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KPICard title={t("dashboard.totalContacts")} value="3,860" change={`+12.5% ${t("common.fromLastMonth")}`} changeType="positive" icon={Users} />
            <KPICard title={t("dashboard.totalEntities")} value="392" change={`+3.2% ${t("common.fromLastMonth")}`} changeType="positive" icon={Building2} />
            <KPICard title={t("dashboard.avgCompleteness")} value="78.4%" change={`-2.1% ${t("common.fromLastMonth")}`} changeType="negative" icon={CheckCircle} />
            <KPICard title={t("dashboard.pendingDuplicates")} value="47" change={`12 ${t("common.resolvedThisWeek")}`} changeType="neutral" icon={GitCompare} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="card-enterprise">
              <h3 className="mb-4 text-base font-semibold text-foreground">{t("dashboard.contactsByType")}</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={contactsByType} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                    {contactsByType.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 32%, 91%)", boxShadow: "var(--shadow-md)" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="card-enterprise">
              <h3 className="mb-4 text-base font-semibold text-foreground">{t("dashboard.entitiesByType")}</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={entitiesByType}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 32%, 91%)", boxShadow: "var(--shadow-md)" }} />
                  <Bar dataKey="value" fill="hsl(217, 91%, 60%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-enterprise">
            <h3 className="mb-4 text-base font-semibold text-foreground">{t("dashboard.recentActivity")}</h3>
            <div className="overflow-x-auto">
              <table className="table-enterprise">
                <thead>
                  <tr>
                    <th>{t("dashboard.action")}</th>
                    <th>{t("dashboard.name")}</th>
                    <th>{t("dashboard.type")}</th>
                    <th>{t("dashboard.time")}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((item) => (
                    <tr key={item.id}>
                      <td className="font-medium text-foreground">{isAr ? item.actionAr : item.action}</td>
                      <td>
                        <div>
                          <p className="font-medium text-foreground">{isAr ? item.nameAr : item.name}</p>
                          <p className="text-xs text-muted-foreground">{isAr ? item.name : item.nameAr}</p>
                        </div>
                      </td>
                      <td><span className="badge-status badge-type">{item.type}</span></td>
                      <td className="text-muted-foreground">{isAr ? item.timeAr : item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Executive Dashboard */}
        <TabsContent value="executive" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <KPICard title={t("executive.totalRecords")} value="4,252" change="+8.3% QoQ" changeType="positive" icon={Users} />
            <KPICard title={t("executive.dataQuality")} value="78.4%" change="+6.2% QoQ" changeType="positive" icon={CheckCircle} />
            <KPICard title={t("executive.resolutionRate")} value="94.7%" change="47 pending" changeType="neutral" icon={Target} />
          </div>

          <div className="card-enterprise">
            <h3 className="mb-4 text-base font-semibold text-foreground">{t("executive.growthTrend")}</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
                <Bar dataKey="contacts" name={t("page.contacts")} fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="entities" name={t("page.entities")} fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        {/* Governance Dashboard */}
        <TabsContent value="governance" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KPICard title={t("governance.weakProfiles")} value="156" change="< 30%" changeType="negative" icon={FileWarning} />
            <KPICard title={t("governance.orphanRecords")} value="23" changeType="negative" icon={Users} change={isAr ? "غير مرتبط بجهة" : "No entity linked"} />
            <KPICard title={t("governance.pendingDuplicates")} value="47" changeType="neutral" icon={GitCompare} change={isAr ? "يتطلب مراجعة" : "Requires review"} />
            <KPICard title={t("governance.qualityAlerts")} value="12" changeType="negative" icon={AlertTriangle} change={isAr ? "مشاكل حرجة" : "Critical issues"} />
          </div>

          <div className="card-enterprise">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">{t("governance.weakProfiles")}</h3>
              <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">{t("governance.viewAll")}</button>
            </div>
            <div className="space-y-2">
              {weakProfiles.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{t("governance.missing")}: {p.missing.join(", ")}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-12 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full completeness-low" style={{ width: `${p.completeness}%` }} />
                      </div>
                      <span className="text-xs font-medium text-destructive">{p.completeness}%</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-enterprise">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">{t("governance.orphanRecords")}</h3>
              <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">{t("governance.viewAll")}</button>
            </div>
            <div className="space-y-2">
              {orphanRecords.map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">{isAr ? r.nameAr : r.name}</p>
                    <p className="text-xs text-muted-foreground">{isAr ? r.name : r.nameAr}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge-status badge-pending">{isAr ? r.reasonAr : r.reason}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Operational Tab */}
        <TabsContent value="operational" className="space-y-6">
          <OperationalTab />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Analytics tab content (moved from separate page)
function AnalyticsTab() {
  const { t } = useTranslation();
  const completenessDistribution = [
    { range: "0-20%", count: 45 },
    { range: "21-40%", count: 120 },
    { range: "41-60%", count: 340 },
    { range: "61-80%", count: 890 },
    { range: "81-100%", count: 1465 },
  ];
  const analyticsContactsByType = [
    { name: "Individual", value: 2450 },
    { name: "Organization", value: 890 },
    { name: "Government", value: 340 },
    { name: "Non-Profit", value: 180 },
  ];
  const analyticsEntitiesByType = [
    { name: "Ministry", value: 45 },
    { name: "Agency", value: 78 },
    { name: "Department", value: 124 },
    { name: "Division", value: 89 },
  ];
  const ANALYTICS_COLORS = ["hsl(217, 91%, 60%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)"];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="card-enterprise">
        <h3 className="mb-4 text-base font-semibold text-foreground">{t("analytics.completenessDistribution")}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={completenessDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="range" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
            <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 32%, 91%)" }} />
            <Bar dataKey="count" fill="hsl(217, 91%, 60%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="card-enterprise">
        <h3 className="mb-4 text-base font-semibold text-foreground">{t("analytics.contactsByType")}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={analyticsContactsByType} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
              {analyticsContactsByType.map((_, i) => <Cell key={i} fill={ANALYTICS_COLORS[i]} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="card-enterprise">
        <h3 className="mb-4 text-base font-semibold text-foreground">{t("analytics.entitiesByType")}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={analyticsEntitiesByType} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
              {analyticsEntitiesByType.map((_, i) => <Cell key={i} fill={ANALYTICS_COLORS[i]} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="card-enterprise">
        <h3 className="mb-4 text-base font-semibold text-foreground">{t("analytics.dataQualityTrends")}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { month: "Sep", completeness: 72, duplicates: 89 },
            { month: "Oct", completeness: 74, duplicates: 76 },
            { month: "Nov", completeness: 76, duplicates: 65 },
            { month: "Dec", completeness: 77, duplicates: 58 },
            { month: "Jan", completeness: 78, duplicates: 52 },
            { month: "Feb", completeness: 79, duplicates: 47 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
            <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
            <Legend />
            <Bar dataKey="completeness" name="Avg Completeness %" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="duplicates" name="Pending Duplicates" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Operational tab
function OperationalTab() {
  const { t, lang } = useTranslation();
  const isAr = lang === "ar";

  const recentContacts = [
    { name: "AddressTypeTest Contact", date: "24/02/2026", type: "citizen" },
    { name: "CleanResetTest ValidUser", date: "22/02/2026", type: "citizen" },
    { name: "ValidName ValidLast", date: "22/02/2026", type: "citizen" },
    { name: "John Smith", date: "22/02/2026", type: "citizen" },
    { name: "ValidB_O5ji Test", date: "22/02/2026", type: "vip" },
  ];

  const recentEntities = [
    { name: "AddressTypeTestEntity", date: "24/02/2026", type: "public" },
    { name: "AddressTypeTestEntity", date: "24/02/2026", type: "private" },
    { name: "Test import", date: "22/02/2026", type: "public" },
    { name: "UI Import Test DDD", date: "22/02/2026", type: "private" },
    { name: "Test Phone CP ZZZ123", date: "22/02/2026", type: "public" },
  ];

  const mostActive = [
    { name: "Abdullah Afri...", entities: 4, contacts: 0 },
    { name: "Abdullah Afri...", entities: 3, contacts: 0 },
    { name: "tesdf tesdf", entities: 2, contacts: 1 },
    { name: "Omar Afri...", entities: 2, contacts: 1 },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card-enterprise">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">{t("operational.activeContacts")}</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><p className="text-2xl font-bold text-foreground">18</p><p className="text-xs text-muted-foreground">Last 30 days</p></div>
            <div><p className="text-2xl font-bold text-foreground">18</p><p className="text-xs text-muted-foreground">Last 90 days</p></div>
            <div><p className="text-2xl font-bold text-foreground">18</p><p className="text-xs text-muted-foreground">Last 365 days</p></div>
          </div>
        </div>
        <div className="card-enterprise">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">{t("operational.activeEntities")}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div><p className="text-2xl font-bold text-foreground">10</p><p className="text-xs text-muted-foreground">Last 30 days</p></div>
            <div><p className="text-2xl font-bold text-foreground">10</p><p className="text-xs text-muted-foreground">Last 90 days</p></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card-enterprise">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t("operational.multiEntity")}</p>
              <p className="text-2xl font-bold text-foreground mt-1">1</p>
            </div>
            <GitCompare className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <div className="card-enterprise">
          <p className="text-sm text-muted-foreground">{t("operational.avgEntities")}</p>
          <p className="text-2xl font-bold text-foreground mt-1">1.2</p>
        </div>
        <div className="card-enterprise">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t("operational.inactive90")}</p>
              <p className="text-2xl font-bold text-foreground mt-1">0</p>
            </div>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("operational.mostActive")}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mostActive} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={90} stroke="hsl(215, 16%, 47%)" />
              <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
              <Bar dataKey="entities" stackId="a" fill="hsl(217, 91%, 60%)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="contacts" stackId="a" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-enterprise">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-base font-semibold text-foreground">{t("operational.recentlyInactive")}</h3>
          </div>
          <p className="text-sm text-muted-foreground">No data available</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("operational.recentContacts")}</h3>
          <div className="space-y-2">
            {recentContacts.map((c, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.date}</p>
                </div>
                <span className="badge-status badge-type text-xs">{c.type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">{t("operational.recentEntities")}</h3>
          <div className="space-y-2">
            {recentEntities.map((e, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.date}</p>
                </div>
                <span className="badge-status badge-type text-xs">{e.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
