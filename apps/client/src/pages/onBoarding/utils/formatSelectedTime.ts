/**
 * 사용자 시간 포맷 문자열을 HH:mm(24시간) 형식으로 변환
 */
export const convertCustomTimeTo24Hour = (timeStr: string): string => {
  const match = timeStr.match(/(오전|오후)\s?(\d{1,2})시\s?(\d{1,2})?분?/);
  if (!match) {
    return '';
  }

  const [, meridiem, hourStr, minuteStr] = match;
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr ? parseInt(minuteStr, 10) : 0;

  if (meridiem === '오후' && hour < 12) {
    hour += 12;
  } else if (meridiem === '오전' && hour === 12) {
    hour = 0;
  }

  return `${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}`;
};

/**
 * 프리셋 키 값을 HH:mm(24시간) 형식으로 변환
 */
export const getPresetTime = (key: string): string => {
  switch (key) {
    case 'morning':
      return '09:00';
    case 'evening':
      return '20:00';
    default:
      return '';
  }
};

/**
 * selectedTime과 selectedCustomTime 기반 최종 서버 전송 시간 계산
 */
export const getFormattedSelectedTime = (
  selectedTime: string | null,
  selectedCustomTime: string | null
): string | null => {
  if (!selectedTime) {
    return null;
  }

  if (selectedTime === 'custom') {
    return selectedCustomTime
      ? convertCustomTimeTo24Hour(selectedCustomTime)
      : null;
  }

  return getPresetTime(selectedTime);
};
