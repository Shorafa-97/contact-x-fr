import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

const contacts = Array.from({ length: 20 }, (_, i) => ({
  id: `c-${i + 1}`,
  nameEn: ["Mohammed Al-Rashid", "Sara Ahmed", "Ahmad Hassan", "Fatima Ali", "Omar Khalil", "Layla Nasser", "Yusuf Ibrahim", "Nora Saeed", "Khalid Al-Mansoor", "Amira Bakr"][i % 10],
  nameAr: ["محمد الرشيد", "سارة أحمد", "أحمد حسن", "فاطمة علي", "عمر خليل", "ليلى ناصر", "يوسف إبراهيم", "نورة سعيد", "خالد المنصور", "أميرة بكر"][i % 10],
  type: ["Individual", "Organization", "Government", "Individual"][i % 4],
  email: `contact${i + 1}@example.gov`,
  phone: `+966 5${Math.floor(Math.random() * 10000000).toString().padStart(8, "0")}`,
  completeness: Math.floor(40 + Math.random() * 60),
  status: ["Active", "Inactive", "Pending"][i % 3],
}));

export default function ContactsList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = contacts.filter(
    (c) =>
      c.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      c.nameAr.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const completenessColor = (v: number) => v >= 80 ? "completeness-high" : v >= 50 ? "completeness-medium" : "completeness-low";
  const statusBadge = (s: string) => s === "Active" ? "badge-active" : s === "Pending" ? "badge-pending" : "badge-inactive";

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Contacts</h1>
          <p className="page-subtitle">{contacts.length} total contacts</p>
        </div>
        <Link
          to="/contacts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Contact
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="card-enterprise">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search contacts by name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-enterprise pl-9"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="card-enterprise hidden md:block">
        <div className="overflow-x-auto">
          <table className="table-enterprise">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Email / Phone</th>
                <th>Completeness</th>
                <th>Status</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <Link to={`/contacts/${c.id}`} className="hover:text-primary">
                      <p className="font-medium text-foreground">{c.nameEn}</p>
                      <p className="text-xs text-muted-foreground">{c.nameAr}</p>
                    </Link>
                  </td>
                  <td><span className="badge-status badge-type">{c.type}</span></td>
                  <td>
                    <p className="text-sm text-foreground">{c.email}</p>
                    <p className="text-xs text-muted-foreground">{c.phone}</p>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                        <div className={`h-full rounded-full ${completenessColor(c.completeness)}`} style={{ width: `${c.completeness}%` }} />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{c.completeness}%</span>
                    </div>
                  </td>
                  <td><span className={`badge-status ${statusBadge(c.status)}`}>{c.status}</span></td>
                  <td>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">Showing 1-20 of {filtered.length}</p>
          <div className="flex items-center gap-1">
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted" disabled><ChevronLeft className="h-4 w-4" /></button>
            <button className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">1</button>
            <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted">2</button>
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-3 md:hidden">
        {filtered.map((c) => (
          <Link key={c.id} to={`/contacts/${c.id}`} className="card-enterprise block">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-foreground">{c.nameEn}</p>
                <p className="text-xs text-muted-foreground">{c.nameAr}</p>
              </div>
              <span className={`badge-status ${statusBadge(c.status)}`}>{c.status}</span>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="badge-status badge-type">{c.type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completeness</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-12 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${completenessColor(c.completeness)}`} style={{ width: `${c.completeness}%` }} />
                  </div>
                  <span className="text-xs font-medium">{c.completeness}%</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
