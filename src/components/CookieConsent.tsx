import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-sm text-gray-300 max-w-2xl">
        Kasutame küpsiseid veebilehe kasutusstatistika kogumiseks (Google Analytics).
        Loe lähemalt {" "}
        <a href="/privaatsus/index.html" target="_blank" className="text-orange-400 hover:underline">
          privaatsus
        </a>
        .
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={decline}
          className="px-4 py-2 text-sm text-gray-400 border border-gray-600 rounded-lg hover:border-gray-400 hover:text-white transition-colors"
        >
          Keeldun
        </button>
        <button
          onClick={accept}
          className="px-4 py-2 text-sm font-medium bg-orange-500 hover:bg-orange-400 text-white rounded-lg transition-colors"
        >
          Nõustun
        </button>
      </div>
    </div>
  );
}