/**
 * 현재 시간을 KST 기준으로 포맷팅
 * @returns "YYYY-MM-DDTHH:mm:ss" 형식의 문자열
 */
export const getCurrentKSTDateTime = (): string => {
  const now = new Date();
  const kstTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  const year = kstTime.getUTCFullYear();
  const month = String(kstTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kstTime.getUTCDate()).padStart(2, '0');
  const hours = String(kstTime.getUTCHours()).padStart(2, '0');
  const minutes = String(kstTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(kstTime.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
