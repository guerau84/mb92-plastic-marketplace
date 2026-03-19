import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ClickyRouteTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.clicky) {
      window.clicky.log(
        location.pathname + location.search
      );
    }
  }, [location]);

  return null;
}