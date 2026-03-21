import { useEffect, useState } from "react";

export function useCookieConsent() {
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  useEffect(() => {
    function updateConsent() {
        // window.Cookiebot, does exist
      if (window.Cookiebot) {
        setMarketingAccepted(
          window.Cookiebot.consent.marketing
        );
      }
    }

    updateConsent();

    window.addEventListener("CookiebotOnConsentReady", updateConsent);
    window.addEventListener("CookiebotOnAccept", updateConsent);
    window.addEventListener("CookiebotOnDecline", updateConsent);

    return () => {
      window.removeEventListener("CookiebotOnConsentReady", updateConsent);
      window.removeEventListener("CookiebotOnAccept", updateConsent);
      window.removeEventListener("CookiebotOnDecline", updateConsent);
    };
  }, [window.Cookiebot.consent.marketing]);

  return marketingAccepted;
}