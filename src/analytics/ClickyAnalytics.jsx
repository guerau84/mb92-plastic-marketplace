import { useEffect } from "react";

export default function ClickyAnalytics() {
  useEffect(() => {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.src = "https://static.getclicky.com/js";
    script.setAttribute("data-id", import.meta.env.CLICKY_SITE_KEY);

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}