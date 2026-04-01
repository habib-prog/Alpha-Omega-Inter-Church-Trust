import { useEffect, useRef, useState } from "react";
import { get, ref } from "firebase/database";
import { rtdb } from "../Database/firebase.config";

export const useSiteContent = (docId, fallbackPath, fallbackData) => {
  const [data, setData] = useState(fallbackData);
  const fallbackRef = useRef(fallbackData);

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const contentRef = ref(rtdb, `site_content/${docId}/content`);
        const contentSnap = await get(contentRef);

        if (contentSnap.exists()) {
          const nextData = contentSnap.val();

          if (!ignore && nextData) {
            setData(nextData);
            return;
          }
        }

        const response = await fetch(`${fallbackPath}?t=${Date.now()}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to load fallback for ${docId}`);
        }

        const nextFallback = await response.json();

        if (!ignore) {
          setData(nextFallback);
        }
      } catch (error) {
        if (!ignore) {
          setData(fallbackRef.current);
        }
      }
    };

    loadData();

    const intervalId = window.setInterval(loadData, 3000);
    const handleFocus = () => loadData();

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      ignore = true;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, [docId, fallbackPath]);

  return data;
};
