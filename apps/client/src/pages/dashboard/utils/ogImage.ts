import axios from 'axios';

export interface OGData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
}

/** HTML 문자열에서 OG 메타데이터를 파싱합니다 진멘~ */
export function parseOgMeta(html: string): OGData {
  const ogData: OGData = {};
  const metaRegex = /<meta\s+(?:property|name)="([^"]+)"\s+content="([^"]+)"/gi;
  let match;

  while ((match = metaRegex.exec(html)) !== null) {
    const [, property, content] = match;

    switch (property) {
      case 'og:title':
        ogData.title = content;
        break;
      case 'og:description':
        ogData.description = content;
        break;
      case 'og:image':
        ogData.image = content;
        break;
      case 'og:url':
        ogData.url = content;
        break;
      case 'og:site_name':
        ogData.siteName = content;
        break;
      case 'twitter:title':
        if (!ogData.title) {
          ogData.title = content;
        }
        break;
      case 'twitter:description':
        if (!ogData.description) {
          ogData.description = content;
        }
        break;
      case 'twitter:image':
        if (!ogData.image) {
          ogData.image = content;
        }
        break;
      case 'description':
        if (!ogData.description) {
          ogData.description = content;
        }
        break;
    }
  }

  if (!ogData.title) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) {
      ogData.title = titleMatch[1];
    }
  }

  return ogData;
}

/** 상대 경로를 절대 URL로 변환하는 도우미 함수랍니다 진멘~ */
function resolveUrl(baseUrl: string, relativeUrl: string): string {
  if (relativeUrl.startsWith('http')) {
    return relativeUrl;
  }

  try {
    const base = new URL(baseUrl);
    return new URL(relativeUrl, base.origin).href;
  } catch {
    return relativeUrl;
  }
}

/** OG 데이터를 여러 프록시로 시도해서 불러오는 함수옵니다~ */
export async function fetchOgMeta(targetUrl: string): Promise<OGData> {
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }

  const proxyServices = [
    `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
    `https://cors-anywhere.herokuapp.com/${targetUrl}`,
    `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`,
    `https://thingproxy.freeboard.io/fetch/${targetUrl}`,
  ];

  let response;
  let lastError;

  for (const proxyUrl of proxyServices) {
    try {
      if (proxyUrl.includes('allorigins.win/get')) {
        const res = await axios.get(proxyUrl, { timeout: 15000 });
        response = res.data.contents;
      } else {
        const res = await axios.get(proxyUrl, { timeout: 15000 });
        response = res.data;
      }
      break; // 성공 시 중단
    } catch (err) {
      lastError = err;
    }
  }

  if (!response) {
    throw lastError || new Error('모든 프록시 요청이 실패했답쇼 진멘~');
  }

  const parsed = parseOgMeta(response);

  if (parsed.image && !parsed.image.startsWith('http')) {
    parsed.image = resolveUrl(targetUrl, parsed.image);
  }

  return parsed;
}
