import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { StockItem } from "@/lib/store";
import { useStock } from "@/hooks/useStock";
import Hero from "@/components/Hero";
import StockCard from "@/components/StockCard";
import InquiryModal from "@/components/InquiryModal";
import stockGranulate from "@/assets/stock-granulate.jpg";
import stockSheets from "@/assets/stock-sheets.jpg";
import stockPipes from "@/assets/stock-pipes.jpg";
import stockContainers from "@/assets/stock-containers.jpg";
import { Search } from "lucide-react";

const defaultImages: Record<string, string> = {
  "1": stockGranulate,
  "2": stockSheets,
  "3": stockPipes,
  "4": stockContainers,
};

const Index = () => {
  const { t } = useI18n();
  const { stock, loading } = useStock();
  const [inquiryItem, setInquiryItem] = useState<StockItem | null>(null);
  const [search, setSearch] = useState("");
  const [conditionFilter, setConditionFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return stock.filter((item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCondition =
        conditionFilter === "all" || item.condition === conditionFilter;
      return matchesSearch && matchesCondition;
    });
  }, [stock, search, conditionFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <section id="catalog" className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
          {t.catalog.title}
        </h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t.catalog.searchPh}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            {["all", "excellent", "good", "fair"].map((c) => {
              const label =
                c === "all"
                  ? t.catalog.all
                  : c === "excellent"
                  ? t.admin.excellent
                  : c === "good"
                  ? t.admin.good
                  : t.admin.fair;
              return (
                <button
                  key={c}
                  onClick={() => setConditionFilter(c)}
                  className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                    conditionFilter === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">{t.catalog.noStock}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <StockCard
                key={item.id}
                item={item}
                image={item.imageUrl || defaultImages[item.id] || stockGranulate}
                onInquire={setInquiryItem}
              />
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          {t.footer.rights}
        </div>
      </footer>

      {inquiryItem && (
        <InquiryModal item={inquiryItem} onClose={() => setInquiryItem(null)} />
      )}
    </div>
  );
};

export default Index;
