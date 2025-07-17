const PROXY_SERVICE = import.meta.env.VITE_THUMBNAIL_PROXY_URL;
const FAVICON_SERVICE = import.meta.env.VITE_FAVICON_SERVICE_URL;

const thumbnailCache = new Map<string, { url: string; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const META_PATTERNS = {
  ogImage: /<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i,
  twitterImage: /<meta[^>]*name="twitter:image"[^>]*content="([^"]*)"[^>]*>/i,
} as const;

const extractDomain = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
};

const normalizeImageUrl = (imageUrl: string, baseUrl: string): string => {
  return imageUrl.startsWith('http')
    ? imageUrl
    : new URL(imageUrl, baseUrl).href;
};

const extractMetaImages = (html: string, baseUrl: string): string | null => {
  const ogMatch = html.match(META_PATTERNS.ogImage);
  if (ogMatch?.[1]) {
    return normalizeImageUrl(ogMatch[1], baseUrl);
  }

  const twitterMatch = html.match(META_PATTERNS.twitterImage);
  if (twitterMatch?.[1]) {
    return normalizeImageUrl(twitterMatch[1], baseUrl);
  }

  return null;
};

const getFaviconUrl = (domain: string, size = 128): string | null => {
  if (!FAVICON_SERVICE) {
    return null;
  }
  return `${FAVICON_SERVICE}?domain=${domain}&sz=${size}`;
};

const getCachedThumbnail = (url: string): string | null => {
  const cached = thumbnailCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.url;
  }
  return null;
};

const setCachedThumbnail = (url: string, thumbnailUrl: string): void => {
  thumbnailCache.set(url, {
    url: thumbnailUrl,
    timestamp: Date.now(),
  });
};

const safeFetch = async (url: string, timeout = 5000): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const generateThumbnail = async (
  url: string
): Promise<string | null> => {
  try {
    const domain = extractDomain(url);
    if (!domain) {
      return null;
    }

    const cachedThumbnail = getCachedThumbnail(url);
    if (cachedThumbnail) {
      return cachedThumbnail;
    }

    const faviconSizes = [256, 128, 64];
    let faviconUrl: string | null = null;

    for (const size of faviconSizes) {
      const testUrl = getFaviconUrl(domain, size);
      if (testUrl) {
        try {
          const response = await fetch(testUrl, { method: 'HEAD' });
          if (response.ok) {
            faviconUrl = testUrl;
            break;
          }
        } catch {
          continue;
        }
      }
    }

    if (PROXY_SERVICE) {
      try {
        const proxyUrl = `${PROXY_SERVICE}?url=${encodeURIComponent(url)}`;

        const response = await safeFetch(proxyUrl, 8000);

        if (response.ok) {
          const html = await response.text();
          const metaImage = extractMetaImages(html, url);

          if (metaImage) {
            setCachedThumbnail(url, metaImage);
            return metaImage;
          }
        }
      } catch (proxyError) {
        // 프록시 서비스 실패
      }
    }

    if (faviconUrl) {
      setCachedThumbnail(url, faviconUrl);
      return faviconUrl;
    }

    return null;
  } catch (error) {
    try {
      const domain = extractDomain(url);
      if (domain) {
        const fallbackFavicon = getFaviconUrl(domain, 128);
        return fallbackFavicon;
      }
    } catch (fallbackError) {
      // 폴백 실패 처리
    }

    return null;
  }
};

export const clearThumbnailCache = (): void => {
  thumbnailCache.clear();
};

export const getThumbnailCacheStats = (): {
  size: number;
  entries: string[];
} => {
  return {
    size: thumbnailCache.size,
    entries: Array.from(thumbnailCache.keys()),
  };
};
