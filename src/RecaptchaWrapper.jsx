import { useCookieConsent } from "@/hooks/useCookieConsent";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
export default function RecaptchaWrapper({ children }) {
    const marketingConsent = useCookieConsent();
    if (!marketingConsent) return children;
  
    return (
      <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY}
      >
        {children}
      </GoogleReCaptchaProvider>
    );
  };