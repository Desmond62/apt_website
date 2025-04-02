import { useEffect, useState } from "react";

function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the document has already loaded
    if (document.readyState === "complete") {
      setTimeout(() => setIsLoading(false), 100);
    } else {
      // Wait for the window to load fully
      const handleLoad = () => {
        setTimeout(() => setIsLoading(false), 100);
      };

      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-[var(--bg-overlay)] z-[99999] ${
        isLoading ? "flex" : "hidden"
      }`}
    >
      <div className="w-20 h-20 grid animate-spin">
        <div className="w-full h-full border-[14px] border-green-600 border-t-transparent border-r-transparent rounded-full"></div>
        <div className="w-full h-full border-[14px] border-gray-300 border-b-transparent border-l-transparent rounded-full absolute animate-reverse-spin"></div>
      </div>
      <p className="mt-4 text-white text-lg font-bold">Loading...</p>
    </div>
  );
}

export default LoadingScreen;
