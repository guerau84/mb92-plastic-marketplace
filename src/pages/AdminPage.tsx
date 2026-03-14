import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { StockItem } from "@/lib/store";
import { useStock } from "@/hooks/useStock";
import { useInquiries } from "@/hooks/useInquiries";
import { Trash2, Pencil, Plus, Package, MessageSquare, Mail, MailOpen } from "lucide-react";
import { toast } from "sonner";

const AdminPage = () => {
  const { t } = useI18n();
  const [tab, setTab] = useState<"stock" | "inquiries">("stock");
  const { stock, updateStock } = useStock();
  const { inquiries, deleteInquiry, toggleRead } = useInquiries();
  const [editing, setEditing] = useState<StockItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card border border-border rounded-lg p-8 w-full max-w-sm shadow-sm">
          <h2 className="font-display font-bold text-xl text-foreground mb-4">{t.admin.login}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email === "admin@mb92.com" && pw === "mb92admin") {
                setAuthed(true);
              } else {
                toast.error(t.admin.wrongCredentials);
              }
            }}
            className="space-y-3"
          >
            <input
              type="email"
              placeholder={t.admin.emailPh}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="password"
              placeholder={t.admin.password}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-md hover:opacity-90 transition-opacity">
              {t.admin.enter}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleSave = async (item: StockItem) => {
    let updated: StockItem[];
    if (isNew) {
      updated = [...stock, { ...item, id: crypto.randomUUID() }];
    } else {
      updated = stock.map((s) => (s.id === item.id ? item : s));
    }
    await updateStock(updated);
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.admin.deleteConfirm)) return;
    const updated = stock.filter((s) => s.id !== id);
    await updateStock(updated);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-56 min-h-[calc(100vh-4rem)] bg-card border-r border-border p-4 hidden md:block">
          <h2 className="font-display font-bold text-foreground mb-6">{t.admin.title}</h2>
          <nav className="space-y-1">
            <button
              onClick={() => setTab("stock")}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${tab === "stock" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}
            >
              <Package className="h-4 w-4" /> {t.admin.stock}
            </button>
            <button
              onClick={() => setTab("inquiries")}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${tab === "inquiries" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}
            >
              <MessageSquare className="h-4 w-4" /> {t.admin.inquiries}
              {inquiries.length > 0 && (
                <span className="ml-auto bg-primary/20 text-primary text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {inquiries.length}
                </span>
              )}
            </button>
          </nav>
        </aside>

        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex z-40">
          <button onClick={() => setTab("stock")} className={`flex-1 py-3 text-sm font-medium text-center ${tab === "stock" ? "text-primary" : "text-muted-foreground"}`}>
            <Package className="h-4 w-4 mx-auto mb-1" /> {t.admin.stock}
          </button>
          <button onClick={() => setTab("inquiries")} className={`flex-1 py-3 text-sm font-medium text-center ${tab === "inquiries" ? "text-primary" : "text-muted-foreground"}`}>
            <MessageSquare className="h-4 w-4 mx-auto mb-1" /> {t.admin.inquiries}
          </button>
        </div>

        <main className="flex-1 p-6 pb-20 md:pb-6">
          {tab === "stock" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-foreground">{t.admin.stock}</h2>
                <button
                  onClick={() => { setEditing({ id: "", name: "", description: "", condition: "good", quantity: 0, imageUrl: "" }); setIsNew(true); }}
                  className="flex items-center gap-1 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                >
                  <Plus className="h-4 w-4" /> {t.admin.addStock}
                </button>
              </div>

              {editing && (
                <StockForm item={editing} onSave={handleSave} onCancel={() => { setEditing(null); setIsNew(false); }} />
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="pb-2 pr-4 font-medium">{t.admin.name}</th>
                      <th className="pb-2 pr-4 font-medium">{t.admin.condition}</th>
                      <th className="pb-2 pr-4 font-medium">{t.admin.quantity}</th>
                      <th className="pb-2 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {stock.map((item) => (
                      <tr key={item.id} className="border-b border-border">
                        <td className="py-3 pr-4 text-foreground">{item.name}</td>
                        <td className="py-3 pr-4 capitalize text-muted-foreground">{item.condition}</td>
                        <td className="py-3 pr-4 text-foreground">{item.quantity} kg</td>
                        <td className="py-3 text-right space-x-2">
                          <button onClick={() => { setEditing(item); setIsNew(false); }} className="text-muted-foreground hover:text-foreground">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === "inquiries" && (
            <>
              <h2 className="text-xl font-display font-bold text-foreground mb-6">{t.admin.inquiries}</h2>
              {inquiries.length === 0 ? (
                <p className="text-muted-foreground">{t.admin.noInquiries}</p>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex flex-wrap gap-4 text-sm mb-2">
                        <span className="text-muted-foreground">{new Date(inq.date).toLocaleDateString()}</span>
                        <span className="font-medium text-foreground">{inq.companyName}</span>
                        <span className="text-muted-foreground">{inq.email}</span>
                        {inq.phone && <span className="text-muted-foreground">{inq.phone}</span>}
                      </div>
                      <p className="text-xs text-primary font-medium mb-1">{inq.stockItemName}</p>
                      <p className="text-sm text-foreground">{inq.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

const StockForm = ({ item, onSave, onCancel }: { item: StockItem; onSave: (i: StockItem) => void; onCancel: () => void }) => {
  const { t } = useI18n();
  const [form, setForm] = useState(item);
  const [preview, setPreview] = useState(item.imageUrl || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      setForm((f) => ({ ...f, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-secondary/50 rounded-lg p-4 mb-6 border border-border">
      <form
        onSubmit={(e) => { e.preventDefault(); onSave(form); }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <input
          required
          placeholder={t.admin.name}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          value={form.condition}
          onChange={(e) => setForm({ ...form, condition: e.target.value as StockItem["condition"] })}
          className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="excellent">{t.admin.excellent}</option>
          <option value="good">{t.admin.good}</option>
          <option value="fair">{t.admin.fair}</option>
        </select>
        <input
          required
          type="number"
          min={0}
          placeholder={t.admin.quantity}
          value={form.quantity || ""}
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
          className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex items-center gap-3">
          <label className="flex-1 border border-input rounded-md px-3 py-2 text-sm bg-background text-muted-foreground cursor-pointer hover:border-primary transition-colors text-center">
            {preview ? t.admin.changeImage : t.admin.uploadImage}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          {preview && (
            <img src={preview} alt="Preview" className="h-10 w-10 rounded object-cover border border-border" />
          )}
        </div>
        <textarea
          placeholder={t.admin.description}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="md:col-span-2 border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          rows={2}
        />
        <div className="md:col-span-2 flex gap-2 justify-end">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.admin.cancel}
          </button>
          <button type="submit" className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            {t.admin.save}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPage;
