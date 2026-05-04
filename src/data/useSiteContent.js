import { useEffect, useRef, useState } from "react";
import { onValue, ref } from "firebase/database";
import { rtdb } from "../Database/firebase.config";

export const getSiteContentCacheKey = (docId) => `site_content_cache_${docId}`;

const readCachedSiteContent = (docId) => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const cached = window.localStorage.getItem(getSiteContentCacheKey(docId));
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

export const writeCachedSiteContent = (docId, content) => {
  if (typeof window === "undefined" || !content) {
    return;
  }

  try {
    window.localStorage.setItem(
      getSiteContentCacheKey(docId),
      JSON.stringify(content),
    );
  } catch {
    // Ignore storage failures; Firebase remains the source of truth.
  }
};

export const useSiteContent = (docId, fallbackPath, fallbackData, options = {}) => {
  const { deferFallback = false } = options;
  const [data, setData] = useState(() =>
    deferFallback ? null : readCachedSiteContent(docId) || fallbackData,
  );
  const fallbackRef = useRef(fallbackData);

  useEffect(() => {
    let ignore = false;

    if (deferFallback) {
      setData(null);
    } else {
      setData(readCachedSiteContent(docId) || fallbackRef.current);
    }

    const contentRef = ref(rtdb, `site_content/${docId}/content`);

    const unsubscribe = onValue(contentRef, async (contentSnap) => {
      try {
        if (contentSnap.exists()) {
          const nextData = contentSnap.val();

          if (!ignore && nextData) {
            writeCachedSiteContent(docId, nextData);
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
      } catch {
        if (!ignore) {
          setData(readCachedSiteContent(docId) || fallbackRef.current);
        }
      }
    });

    return () => {
      ignore = true;
      unsubscribe();
    };
  }, [docId, fallbackPath, deferFallback]);

  return data;
};
