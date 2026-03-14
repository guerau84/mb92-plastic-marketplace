import { useState, useEffect } from "react";
import { StockItem } from "@/lib/store";
import { getAllStock, saveAllStock, migrateFromLocalStorage } from "@/lib/db";
import { getStock } from "@/lib/store";

export function useStock() {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await migrateFromLocalStorage();
      let items = await getAllStock();
      if (items.length === 0) {
        // Seed from default stock
        items = getStock();
        await saveAllStock(items);
      }
      setStock(items);
      setLoading(false);
    })();
  }, []);

  const updateStock = async (items: StockItem[]) => {
    await saveAllStock(items);
    setStock(items);
  };

  return { stock, loading, updateStock };
}
