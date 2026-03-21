import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { StockItem } from "@/lib/store";
import { addInquiryToDB } from "@/lib/db";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ReCAPTCHA from "react-google-recaptcha";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props {
  item: StockItem;
  onClose: () => void;
}

const InquiryModal = ({ item, onClose }: Props) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [requireV2, setRequireV2] = useState(false);
  const [v2Token, setV2Token] = useState(null);
  const { t } = useI18n();
  const [form, setForm] = useState({ companyName: "", email: "", phone: "", message: "" });
  const marketingConsent = useCookieConsent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addInquiryToDB({
      stockItemId: item.id,
      stockItemName: item.name,
      ...form,
    });
    if (!marketingConsent || !executeRecaptcha) {
      toast.error(
        <>
          {t.inquiry.cookies}{" "}
          <a
            href="/cookies"
            className="underline font-medium"
          >
            {t.inquiry.whycookies}
          </a>
        </>
      );
      return;
    }
      

    const tokenV3 = await executeRecaptcha("contact_form");

    const res = await fetch("/api/verify-captcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenV3 }),
    });

    const data = await res.json();

    if (data.requireV2) {
      setRequireV2(true);
      return;
    }

    console.log("Captcha v3 OK");
    
    toast.success(t.inquiry.success);
    onClose();
  };

const handleV2Submit = async () => {
      const res = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenV2: v2Token }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        console.log("Captcha v2 OK");
      }
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg text-foreground">{t.inquiry.title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{item.name} — {item.quantity} {t.catalog.kg}</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            placeholder={t.inquiry.namePh}
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring"
          />
          <input
            required
            type="email"
            placeholder={t.inquiry.emailPh}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring"
          />
          <input
            placeholder={t.inquiry.phonePh}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring"
          />
          <textarea
            required
            rows={3}
            placeholder={t.inquiry.messagePh}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring resize-none"
          />
          {requireV2 && (
        <>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_V2_SITE_KEY}
            onChange={(token) => setV2Token(token)}
          />
          <button onClick={handleV2Submit}>Verificar</button>
        </>
      )}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            {t.inquiry.send}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;
