import { useState, useEffect } from "react";
import { Inquiry } from "@/lib/store";
import { getAllInquiries, addInquiryToDB } from "@/lib/db";

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const items = await getAllInquiries();
    setInquiries(items);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const addInquiry = async (inquiry: Omit<Inquiry, "id" | "date">) => {
    await addInquiryToDB(inquiry);
    await refresh();
  };

  return { inquiries, loading, addInquiry };
}
