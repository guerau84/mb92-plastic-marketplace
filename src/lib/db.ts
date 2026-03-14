const DB_NAME = "mb92_db";
const DB_VERSION = 1;
const STOCK_STORE = "stock";
const INQUIRIES_STORE = "inquiries";

import { StockItem, Inquiry } from "./store";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STOCK_STORE)) {
        db.createObjectStore(STOCK_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(INQUIRIES_STORE)) {
        db.createObjectStore(INQUIRIES_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllStock(): Promise<StockItem[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STOCK_STORE, "readonly");
    const store = tx.objectStore(STOCK_STORE);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveAllStock(items: StockItem[]): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STOCK_STORE, "readwrite");
  const store = tx.objectStore(STOCK_STORE);
  store.clear();
  items.forEach((item) => store.put(item));
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAllInquiries(): Promise<Inquiry[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(INQUIRIES_STORE, "readonly");
    const store = tx.objectStore(INQUIRIES_STORE);
    const req = store.getAll();
    req.onsuccess = () => {
      const results = req.result as Inquiry[];
      results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      resolve(results);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function addInquiryToDB(inquiry: Omit<Inquiry, "id" | "date">): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(INQUIRIES_STORE, "readwrite");
  const store = tx.objectStore(INQUIRIES_STORE);
  store.put({
    ...inquiry,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  });
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// Migrate localStorage data to IndexedDB on first load
export async function migrateFromLocalStorage(): Promise<void> {
  const db = await openDB();

  // Migrate stock
  const stockTx = db.transaction(STOCK_STORE, "readonly");
  const stockCount = await new Promise<number>((resolve) => {
    const req = stockTx.objectStore(STOCK_STORE).count();
    req.onsuccess = () => resolve(req.result);
  });

  if (stockCount === 0) {
    const stored = localStorage.getItem("mb92_stock");
    if (stored) {
      const items: StockItem[] = JSON.parse(stored);
      await saveAllStock(items);
    }
  }

  // Migrate inquiries
  const inqTx = db.transaction(INQUIRIES_STORE, "readonly");
  const inqCount = await new Promise<number>((resolve) => {
    const req = inqTx.objectStore(INQUIRIES_STORE).count();
    req.onsuccess = () => resolve(req.result);
  });

  if (inqCount === 0) {
    const stored = localStorage.getItem("mb92_inquiries");
    if (stored) {
      const inquiries: Inquiry[] = JSON.parse(stored);
      const writeTx = db.transaction(INQUIRIES_STORE, "readwrite");
      const writeStore = writeTx.objectStore(INQUIRIES_STORE);
      inquiries.forEach((inq) => writeStore.put(inq));
    }
  }
}
