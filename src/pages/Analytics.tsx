import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const completenessDistribution = [
  { range: "0-20%", count: 45 },
  { range: "21-40%", count: 120 },
  { range: "41-60%", count: 340 },
  { range: "61-80%", count: 890 },
  { range: "81-100%", count: 1465 },
];

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
];

const COLORS = ["hsl(217, 91%, 60%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)"];

export default function Analytics() {
  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div>
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">Data quality and distribution metrics</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">Completeness Distribution</h3>
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
          <h3 className="mb-4 text-base font-semibold text-foreground">Contacts by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={contactsByType} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                {contactsByType.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">Entities by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={entitiesByType} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                {entitiesByType.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card-enterprise">
          <h3 className="mb-4 text-base font-semibold text-foreground">Data Quality Trends</h3>
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
    </div>
  );
}
