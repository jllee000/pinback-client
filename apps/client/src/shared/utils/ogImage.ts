import axios from 'axios';

export interface OGData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
}

/**
 * HTML 문자열에서 OG 메타 태그를 파싱하여 OGData 객체 반환
 */
export function parseOGData(html: string): OGData {
  const ogData: OGData = {};

  // <meta ...> 에서 property/name, content 파싱
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
  // <title> 태그에서 제목 추출 (OG title 없을 때)
  if (!ogData.title) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) {
      ogData.title = titleMatch[1];
    }
  }
  return ogData;
}

/**
 * 상대/절대 경로 보정
 */
export function resolveUrl(baseUrl: string, relativeUrl: string): string {
  if (!relativeUrl) {
    return '';
  }
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

/**
 * 주어진 URL에서 OG 데이터를 크로스 도메인 프록시로 가져오는 함수
 * 실패 시 에러 throw
 */
export async function fetchOGData(
  inputUrl: string,
  timeout = 15000
): Promise<OGData> {
  let targetUrl = inputUrl.trim();
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
        response = await axios.get(proxyUrl, { timeout });
        response.data = response.data.contents;
      } else {
        response = await axios.get(proxyUrl, { timeout });
      }
      if (typeof response.data !== 'string') {
        // allorigins returns {contents, status, ...}
        response.data = response.data.contents ?? '';
      }
      break; // 첫 성공시 루프 종료
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  if (!response) {
    throw lastError || new Error('모든 프록시 서비스에서 실패했습니다.');
  }

  const ogData = parseOGData(response.data);
  // 이미지: 상대경로일 경우 보정
  if (ogData.image && !ogData.image.startsWith('http')) {
    ogData.image = resolveUrl(targetUrl, ogData.image);
  }
  return ogData;
}
