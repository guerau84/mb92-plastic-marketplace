import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { getStock, StockItem } from "@/lib/store";
import Hero from "@/components/Hero";
import StockCard from "@/components/StockCard";
import InquiryModal from "@/components/InquiryModal";
import stockGranulate from "@/assets/stock-granulate.jpg";
import stockSheets from "@/assets/stock-sheets.jpg";
import stockPipes from "@/assets/stock-pipes.jpg";
import stockContainers from "@/assets/stock-containers.jpg";

const defaultImages: Record<string, string> = {
  "1": stockGranulate,
  "2": stockSheets,
  "3": stockPipes,
  "4": stockContainers,
};

const Index = () => {
  const { t } = useI18n();
  const stock = getStock();
  const [inquiryItem, setInquiryItem] = useState<StockItem | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <section id="catalog" className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
          {t.catalog.title}
        </h2>
        {stock.length === 0 ? (
          <p className="text-muted-foreground">{t.catalog.noStock}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stock.map((item, i) => (
              <StockCard
                key={item.id}
                item={item}
                image={defaultImages[item.id] || stockGranulate}
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
