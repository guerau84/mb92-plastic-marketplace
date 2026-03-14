export interface StockItem {
  id: string;
  name: string;
  description: string;
  condition: "excellent" | "good" | "fair";
  quantity: number;
  imageUrl: string;
}

export interface Inquiry {
  id: string;
  stockItemId: string;
  stockItemName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read?: boolean;
}

const defaultStock: StockItem[] = [
  {
    id: "1",
    name: "PP Granulate — Clear",
    description: "Clean polypropylene granulate recovered from interior paneling removal. Washed and sorted.",
    condition: "excellent",
    quantity: 1200,
    imageUrl: "",
  },
  {
    id: "2",
    name: "PP Sheet Offcuts — White",
    description: "White PP sheet material from hull lining replacements. Mixed sizes, minimal contamination.",
    condition: "good",
    quantity: 800,
    imageUrl: "",
  },
  {
    id: "3",
    name: "PP Pipe Sections — Grey",
    description: "Grey polypropylene pipe sections from plumbing system refits. Various diameters.",
    condition: "fair",
    quantity: 450,
    imageUrl: "",
  },
  {
    id: "4",
    name: "PP Container Fragments",
    description: "Mixed PP container fragments from galley and storage area refurbishments.",
    condition: "good",
    quantity: 650,
    imageUrl: "",
  },
];

const STOCK_KEY = "mb92_stock";
const INQUIRIES_KEY = "mb92_inquiries";

export function getStock(): StockItem[] {
  const stored = localStorage.getItem(STOCK_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(STOCK_KEY, JSON.stringify(defaultStock));
  return defaultStock;
}

export function saveStock(items: StockItem[]) {
  localStorage.setItem(STOCK_KEY, JSON.stringify(items));
}

export function getInquiries(): Inquiry[] {
  const stored = localStorage.getItem(INQUIRIES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addInquiry(inquiry: Omit<Inquiry, "id" | "date">) {
  const inquiries = getInquiries();
  inquiries.unshift({
    ...inquiry,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  });
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
}
