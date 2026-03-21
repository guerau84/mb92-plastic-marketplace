import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ClickyRouteTracker() {
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
export default ClickyRouteTracker;