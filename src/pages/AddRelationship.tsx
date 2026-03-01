import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Search, Building2, User, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const mockContacts = [
  { id: "c-1", name: "Mohammed Al-Rashid", nameAr: "محمد الرشيد", type: "contact" as const },
  { id: "c-2", name: "Sara Ahmed", nameAr: "سارة أحمد", type: "contact" as const },
  { id: "c-3", name: "Ahmad Hassan", nameAr: "أحمد حسن", type: "contact" as const },
];

const mockEntities = [
  { id: "e-1", name: "Ministry of Finance", nameAr: "وزارة المالية", type: "entity" as const },
  { id: "e-2", name: "IT Advisory Board", nameAr: "مجلس استشاري تكنولوجيا المعلومات", type: "entity" as const },
  { id: "e-3", name: "Budget Department", nameAr: "إدارة الميزانية", type: "entity" as const },
];

const roleOptions = ["Employee", "Manager", "Director", "Member", "Advisor", "Consultant", "Board Member"];

export default function AddRelationship() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sourceType = searchParams.get("sourceType") || "contact";
  const sourceId = searchParams.get("sourceId") || "";

  const [search, setSearch] = useState("");
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [role, setRole] = useState("");
  const [targetType, setTargetType] = useState<"contact" | "entity">(sourceType === "contact" ? "entity" : "contact");

  const backPath = sourceType === "contact" ? `/contacts/${sourceId}` : `/entities/${sourceId}`;

  const allTargets = targetType === "contact" ? mockContacts : mockEntities;
  const filtered = search
    ? allTargets.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.nameAr.includes(search)
      )
    : allTargets;

  const handleSave = () => {
    if (!selectedTarget || !role) return;
    toast({
      title: t("relation.saved"),
      description: t("relation.savedDesc"),
    });
    navigate(backPath);
  };

  return (
    <div className="page-container space-y-6 animate-fade-in max-w-2xl mx-auto">
      <Link
        to={backPath}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("relation.back")}
      </Link>

      <div>
        <h1 className="text-xl font-semibold text-foreground">{t("relation.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("relation.subtitle")}</p>
      </div>

      {/* Target type selector */}
      <div className="card-enterprise space-y-4">
        <h3 className="text-sm font-semibold text-foreground">{t("relation.targetType")}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => { setTargetType("contact"); setSelectedTarget(null); }}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
              targetType === "contact"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            <User className="h-4 w-4" />
            {t("search.contacts")}
          </button>
          <button
            onClick={() => { setTargetType("entity"); setSelectedTarget(null); }}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
              targetType === "entity"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            <Building2 className="h-4 w-4" />
            {t("search.entities")}
          </button>
        </div>
      </div>

      {/* Search and select target */}
      <div className="card-enterprise space-y-4">
        <h3 className="text-sm font-semibold text-foreground">{t("relation.selectTarget")}</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("relation.searchPlaceholder")}
            className="pl-9 rtl:pl-3 rtl:pr-9"
          />
        </div>
        <div className="space-y-1.5 max-h-56 overflow-y-auto">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTarget(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors rtl:text-right",
                selectedTarget === item.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              )}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {item.type === "contact" ? (
                  item.name.split(" ").map((n) => n[0]).join("")
                ) : (
                  <Building2 className="h-4 w-4" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground truncate">{item.nameAr}</p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">{t("search.noResults")}</p>
          )}
        </div>
      </div>

      {/* Role */}
      <div className="card-enterprise space-y-4">
        <h3 className="text-sm font-semibold text-foreground">{t("relation.role")}</h3>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder={t("form.select")} />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 justify-end">
        <Button variant="outline" onClick={() => navigate(backPath)}>
          {t("entity.cancel")}
        </Button>
        <Button onClick={handleSave} disabled={!selectedTarget || !role}>
          <Plus className="h-4 w-4 mr-1.5 rtl:mr-0 rtl:ml-1.5" />
          {t("relation.save")}
        </Button>
      </div>
    </div>
  );
}
