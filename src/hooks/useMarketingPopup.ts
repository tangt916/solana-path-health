import { useEffect, useState, useCallback } from "react";

const SHOWN_KEY = "popupShown";
const INTAKE_KEY = "intakeStarted";
const DELAY_MS = 8000;

export const useMarketingPopup = () => {
  const [shouldShow, setShouldShow] = useState(false);

  const isBlocked = useCallback(() => {
    if (typeof window === "undefined") return true;
    return (
      sessionStorage.getItem(SHOWN_KEY) === "true" ||
      sessionStorage.getItem(INTAKE_KEY) === "true"
    );
  }, []);

  const markShown = useCallback(() => {
    sessionStorage.setItem(SHOWN_KEY, "true");
    setShouldShow(false);
  }, []);

  const markConverted = useCallback(() => {
    sessionStorage.setItem(SHOWN_KEY, "true");
    sessionStorage.setItem(INTAKE_KEY, "true");
    setShouldShow(false);
  }, []);

  useEffect(() => {
    if (isBlocked()) return;

    const timer = window.setTimeout(() => {
      if (!isBlocked()) setShouldShow(true);
    }, DELAY_MS);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isBlocked()) {
        setShouldShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isBlocked]);

  return { shouldShow, markShown, markConverted };
};
