import { useI18n } from "@/lib/i18n";
import { StockItem } from "@/lib/store";

interface Props {
  item: StockItem;
  image: string;
  onInquire: (item: StockItem) => void;
}

const conditionColors = {
  excellent: "bg-accent/15 text-accent",
  good: "bg-blue-100 text-blue-700",
  fair: "bg-amber-100 text-amber-700",
};

const StockCard = ({ item, image, onInquire }: Props) => {
  const { t } = useI18n();

  const conditionLabel =
    item.condition === "excellent" ? t.admin.excellent :
    item.condition === "good" ? t.admin.good : t.admin.fair;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fade-in group">
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${conditionColors[item.condition]}`}>
            {conditionLabel}
          </span>
          <span className="text-xs text-muted-foreground">
            {item.quantity >= 500 ? t.catalog.available : t.catalog.limited}
          </span>
        </div>
        <h3 className="font-display font-semibold text-foreground mb-1">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {item.quantity} {t.catalog.kg}
          </span>
          <button
            onClick={() => onInquire(item)}
            className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity"
          >
            {t.catalog.inquire}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
