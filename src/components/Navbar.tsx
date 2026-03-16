import { useI18n, Language } from "@/lib/i18n";
import logo from "@/assets/mb92-logo.png";
import mpgLogo from "@/assets/MPG_logo_classic_v5.png";
import { Link, useLocation } from "react-router-dom";
import { Globe } from "lucide-react";
import { useState } from "react";

const langLabels: Record<Language, string> = { en: "EN", es: "ES", ca: "CA" };

const Navbar = () => {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="MB92 Barcelona" className="h-10 w-auto" />
          <span className="font-display font-bold text-lg text-primary hidden sm:inline">
            PP Marketplace <img src={mpgLogo} alt="MPG" width={60}></img>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {isAdmin ? (
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.admin.back}
            </Link>
          ) : (
            <Link
              to="/admin"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.admin}
            </Link>
          )}

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-secondary"
            >
              <Globe className="h-4 w-4" />
              {langLabels[lang]}
            </button>
            {open && (
              <div className="absolute right-0 mt-1 bg-card border border-border rounded-md shadow-lg overflow-hidden">
                {(["en", "es", "ca"] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${lang === l ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {langLabels[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
