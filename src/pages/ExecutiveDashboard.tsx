import { Users, CheckCircle, Target } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import { useTranslation } from "@/hooks/useTranslation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthlyGrowth = [
  { month: "Sep", contacts: 3200, entities: 350 },
  { month: "Oct", contacts: 3400, entities: 360 },
  { month: "Nov", contacts: 3550, entities: 370 },
  { month: "Dec", contacts: 3650, entities: 378 },
  { month: "Jan", contacts: 3780, entities: 385 },
  { month: "Feb", contacts: 3860, entities: 392 },
];

export default function ExecutiveDashboard() {
  const { t } = useTranslation();

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">{t("executive.title")}</h1>
        <p className="page-subtitle">{t("executive.subtitle")}</p>
      </div>

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
    </div>
  );
}
