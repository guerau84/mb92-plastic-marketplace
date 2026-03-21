import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import Cookies from "./pages/Cookies.tsx";
import { Analytics } from "@vercel/analytics/react"
import ClickyAnalytics from "@/analytics/ClickyAnalytics";
import ClickyRouteTracker from "@/analytics/ClickyRouteTracker";
import RecaptchaWrapper from "@/RecaptchaWrapper"
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY} scriptProps={{
        async: true,
        defer: true,
      }}>
    <TooltipProvider>
      <Sonner />
      <I18nProvider>
        <BrowserRouter>
          <Navbar />
          <Analytics/>
          <ClickyAnalytics />
          <ClickyRouteTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/cookies" element={<Cookies/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
    </GoogleReCaptchaProvider>
  </QueryClientProvider>
);

export default App;
