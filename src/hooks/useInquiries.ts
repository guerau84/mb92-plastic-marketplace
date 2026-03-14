import { useState, useEffect } from "react";
import { Inquiry } from "@/lib/store";
import { getAllInquiries, addInquiryToDB, deleteInquiryFromDB, updateInquiryInDB } from "@/lib/db";

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const items = await getAllInquiries();
    setInquiries(items);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const addInquiry = async (inquiry: Omit<Inquiry, "id" | "date" | "read">) => {
    await addInquiryToDB(inquiry);
    await refresh();
  };

  const deleteInquiry = async (id: string) => {
    await deleteInquiryFromDB(id);
    await refresh();
  };

  const toggleRead = async (inquiry: Inquiry) => {
    await updateInquiryInDB({ ...inquiry, read: !inquiry.read });
    await refresh();
  };

  return { inquiries, loading, addInquiry, deleteInquiry, toggleRead, refresh };
}
