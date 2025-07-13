import {
  DATE_INPUT_YEAR_LENGTH,
  DATE_INPUT_MONTH_LENGTH,
  DATE_INPUT_LENGTH,
  TIME_INPUT_LENGTH,
} from '../constants/index';
export const verificateDate = (value: string): boolean => {
  const raw = value.replace(/\D/g, '');

  if (raw.length !== DATE_INPUT_LENGTH) {
    alert('날짜는 YYYYMMdd 형식의 8자리 숫자여야 합니다.');
    return false;
  }

  const year = parseInt(raw.slice(0, DATE_INPUT_YEAR_LENGTH), 10);
  const month = parseInt(
    raw.slice(
      DATE_INPUT_YEAR_LENGTH,
      DATE_INPUT_YEAR_LENGTH + DATE_INPUT_MONTH_LENGTH
    ),
    10
  );
  const day = parseInt(
    raw.slice(
      DATE_INPUT_YEAR_LENGTH + DATE_INPUT_MONTH_LENGTH,
      DATE_INPUT_LENGTH
    ),
    10
  );

  const inputDate = new Date(year, month - 1, day);
  if (
    inputDate.getFullYear() !== year ||
    inputDate.getMonth() !== month - 1 ||
    inputDate.getDate() !== day
  ) {
    alert('존재하지 않는 날짜입니다.');
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inputDate <= today) {
    alert('날짜는 오늘보다 이후여야 합니다.');
    return false;
  }

  return true;
};

export const formatDate = (input: string) => {
  const raw = input.replace(/\D/g, '').slice(0, DATE_INPUT_LENGTH);
  if (raw.length < DATE_INPUT_YEAR_LENGTH) {
    return raw;
  }
  if (raw.length < DATE_INPUT_YEAR_LENGTH + DATE_INPUT_MONTH_LENGTH) {
    return `${raw.slice(0, DATE_INPUT_YEAR_LENGTH)}.${raw.slice(4)}`;
  }
  return `${raw.slice(0, DATE_INPUT_YEAR_LENGTH)}.${raw.slice(DATE_INPUT_YEAR_LENGTH, DATE_INPUT_YEAR_LENGTH + DATE_INPUT_MONTH_LENGTH)}.${raw.slice(DATE_INPUT_YEAR_LENGTH + DATE_INPUT_MONTH_LENGTH)}`;
};

export const formatTime = (input: string) => {
  const raw = input.replace(/\D/g, '').slice(0, TIME_INPUT_LENGTH);
  if (raw.length < 3) {
    return raw;
  }
  const hour = parseInt(raw.slice(0, 2), 10);
  const min = raw.slice(2);

  const isInvalidHour = (hour: number) => hour < 0 || hour > 23;
  const isInvalidMinuteFormat = (min: string) => min.length > 2;
  const isInvalidMinuteValue = (min: string) => parseInt(min, 10) > 59;

  const isValidTime = (hour: number, min: string): boolean => {
    return !(
      isInvalidHour(hour) ||
      isInvalidMinuteFormat(min) ||
      isInvalidMinuteValue(min)
    );
  };

  if (!isValidTime(hour, min)) {
    alert('시간은 HH:mm 형식의 올바른 시간이어야 합니다.');
    return '';
  }

  const displayHour = hour % 12 || 12;
  const meridiem = hour < 12 ? '오전' : '오후';
  return `${meridiem} ${displayHour.toString().padStart(2, '0')}:${min.padEnd(2, '0')}`;
};
