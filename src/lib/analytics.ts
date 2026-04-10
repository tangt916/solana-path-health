// Google Analytics 4 helper
// Replace GA4_MEASUREMENT_ID with your actual GA4 tracking ID
const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function initGA4() {
  if (typeof window === "undefined") return;
  if (document.getElementById("ga4-script")) return;

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA4_MEASUREMENT_ID);
}

export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

export function trackPageView(path: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA4_MEASUREMENT_ID, { page_path: path });
  }
}
