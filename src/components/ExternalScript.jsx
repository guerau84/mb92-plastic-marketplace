import { useEffect } from "react";

export default function ExternalScript({ src, id }) {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = src;
    script.id = id;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src, id]);

  return null;
}