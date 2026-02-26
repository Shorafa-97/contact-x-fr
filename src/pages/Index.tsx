import { Users, Building2, CheckCircle, GitCompare, TrendingUp, TrendingDown } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

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
  { id: 1, action: "Contact Created", name: "Mohammed Al-Rashid", nameAr: "محمد الرشيد", type: "Individual", time: "2 min ago" },
  { id: 2, action: "Entity Updated", name: "Ministry of Finance", nameAr: "وزارة المالية", type: "Ministry", time: "15 min ago" },
  { id: 3, action: "Duplicate Found", name: "Sara Ahmed", nameAr: "سارة أحمد", type: "Individual", time: "1 hour ago" },
  { id: 4, action: "Contact Merged", name: "National Bank", nameAr: "البنك الوطني", type: "Organization", time: "2 hours ago" },
  { id: 5, action: "Contact Created", name: "Ahmad Hassan", nameAr: "أحمد حسن", type: "Individual", time: "3 hours ago" },
];

export default function Dashboard() {
  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of your master data management platform</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard
          title="Total Contacts"
          value="3,860"
          change="+12.5% from last month"
          changeType="positive"
          icon={Users}
        />
        <KPICard
          title="Total Entities"
          value="392"
          change="+3.2% from last month"
          changeType="positive"
          icon={Building2}
        />
        <KPICard
          title="Avg. Completeness"
          value="78.4%"
          change="-2.1% from last month"
          changeType="negative"
          icon={CheckCircle}
        />
        <KPICard
          title="Pending Duplicates"
          value="47"
          change="12 resolved this week"
          changeType="neutral"
          icon={GitCompare}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">Contacts by Type</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={contactsByType} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                {contactsByType.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 32%, 91%)", boxShadow: "var(--shadow-md)" }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">Entities by Type</h3>
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

      {/* Recent Activity */}
      <div className="card-enterprise">
        <h3 className="mb-4 text-base font-semibold text-foreground">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="table-enterprise">
            <thead>
              <tr>
                <th>Action</th>
                <th>Name</th>
                <th>Type</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item) => (
                <tr key={item.id}>
                  <td className="font-medium text-foreground">{item.action}</td>
                  <td>
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.nameAr}</p>
                    </div>
                  </td>
                  <td><span className="badge-status badge-type">{item.type}</span></td>
                  <td className="text-muted-foreground">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
