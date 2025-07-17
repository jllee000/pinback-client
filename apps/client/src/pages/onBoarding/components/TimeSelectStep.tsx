import { firebaseConfig } from '@/firebase-config';
import { usePostSignUp } from '@/pages/onBoarding/apis/queries';
import { STEP } from '@/pages/onBoarding/types';
import { onSigninSuccess } from '@/shared/utils/sendToken';
import OnboardingNavButton from '@pages/onBoarding/components/OnboardingNavButton';
import OnBoardingTimePicker from '@pages/onBoarding/components/OnboardingTimePicker';
import { getFormattedSelectedTime } from '@pages/onBoarding/utils/formatSelectedTime';
import { Icon } from '@pinback/design-system/icons';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { useEffect, useRef, useState } from 'react';

interface TimeSelectStepProps {
  setStep: (step: string) => void;
  os: string;
  email: string | null;
}

const TIME_PRESETS = [
  { key: 'morning', label: '아침형 치삐', time: '오전 9시' },
  { key: 'evening', label: '저녁형 치삐', time: '오후 8시' },
];

const TimeSelectStep = ({ setStep, os, email }: TimeSelectStepProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>('morning');
  const [selectedCustomTime, setSelectedCustomTime] = useState<string | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const { mutate: signUp } = usePostSignUp();

  // Firebase 초기화
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  // FCM 토큰 발급
  async function handleAllowNotification(finalTime: string | null) {
    // registerServiceWorker();
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('알림 권한이 필요합니다!');
        return;
      }

      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });

      if (token) {
        signUp(
          { email, finalTime, token },
          {
            onSuccess: (response) => {
              onSigninSuccess(response.data.token);
              setStep(os === 'macos' ? STEP.MAC_USER_NOTICE : STEP.WELCOME);
            },
            onError: () => {
              alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            },
          }
        );
      } else {
        alert('토큰 생성 실패. 다시 시도해주세요.');
      }
    } catch (e) {
      console.error('FCM 토큰 받는 도중 오류:', e);
    }
  }

  const handleNextClick = () => {
    const finalTime = getFormattedSelectedTime(
      selectedTime,
      selectedCustomTime
    );

    if (
      selectedTime &&
      (selectedTime !== 'custom' ||
        (selectedTime === 'custom' && selectedCustomTime))
    ) {
      handleAllowNotification(finalTime);
    }
  };

  const handleSave = (time: {
    hour: string;
    minute: string;
    meridiem: string;
  }) => {
    const formattedTime = `${time.meridiem} ${time.hour}시${time.minute !== '0' ? ` ${time.minute}분` : ''}`;
    setSelectedCustomTime(formattedTime);
    setSelectedTime('custom');
    setIsPopupOpen(false);
  };

  const handleTimeBoxClick = (key: string) => {
    if (key === 'custom') {
      setSelectedTime('custom');
      setIsPopupOpen((prev) => !prev);
    } else {
      setSelectedTime((prev) => (prev === key ? null : key));
      setIsPopupOpen(false);
    }
  };

  // 외부 클릭 시 팝업 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <div className="mt-[14.9rem] flex flex-col items-center gap-[16.1rem]">
      <div className="flex flex-col items-center gap-[1.2rem]">
        <p className="head1">도토리를 찾으러 갈 시간을 정해볼까요?</p>
        <p className="sub4-sb text-gray800">
          선택하신 시간에 매일 저장한 북마크 리마인드를 보내드려요
        </p>
      </div>

      <div className="flex gap-[2.4rem]">
        {/* 프리셋 시간 선택 */}
        {TIME_PRESETS.map(({ key, label, time }) => {
          const isSelected = selectedTime === key;
          return (
            <button
              key={key}
              onClick={() => handleTimeBoxClick(key)}
              className={`flex h-[10rem] w-[38.4rem] cursor-pointer flex-col items-center justify-center gap-[0.6rem] rounded-[20px] border-[2px] p-[2rem] ${
                isSelected ? 'border-main400 bg-main0' : 'border-gray-300'
              }`}
            >
              <p
                className={`head3 ${isSelected ? 'text-main400' : 'text-gray700'}`}
              >
                {label}
              </p>
              <p
                className={`sub3-sb ${isSelected ? 'text-main400' : 'text-gray500'}`}
              >
                {time}
              </p>
            </button>
          );
        })}

        {/* 사용자 설정 */}
        <div
          onClick={() => handleTimeBoxClick('custom')}
          ref={popupRef}
          className={`relative flex h-[10rem] w-[38.4rem] cursor-pointer items-center justify-center gap-[0.6rem] rounded-[20px] border-[2px] p-[2rem] ${
            isPopupOpen || (selectedTime === 'custom' && selectedCustomTime)
              ? 'border-main400 bg-main0'
              : 'border-gray-300'
          }`}
        >
          <p
            className={`head3 ${isPopupOpen || (selectedTime === 'custom' && selectedCustomTime) ? 'text-main400' : 'text-gray700'}`}
          >
            {selectedCustomTime || '사용자 설정'}
          </p>
          <Icon
            name="ic_arrow_down"
            width={24}
            height={24}
            color={
              isPopupOpen || (selectedTime === 'custom' && selectedCustomTime)
                ? 'main400'
                : 'gray700'
            }
          />
          {isPopupOpen && (
            <OnBoardingTimePicker
              onSave={handleSave}
              onCancel={() => setIsPopupOpen(false)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="absolute bottom-[7.9rem] right-[12rem]">
        <OnboardingNavButton
          direction="next"
          disabled={
            !selectedTime || (selectedTime === 'custom' && !selectedCustomTime)
          }
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default TimeSelectStep;
