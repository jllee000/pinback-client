import { firebaseConfig } from '@/firebase-config';
import { Header } from '@/shared';
import { registerServiceWorker } from '@/shared/utils/registerServiceWorker';
import MacUserNoticeStep from '@pages/onBoarding/components/MacUserNoticeStep';
import StoryStep from '@pages/onBoarding/components/StoryStep';
import TimeSelectStep from '@pages/onBoarding/components/TimeSelectStep';
import WelcomeStep from '@pages/onBoarding/components/WelcomeStep';
import { useOSDetector } from '@pages/onBoarding/hooks/useOSDetector';
import { STEP } from '@pages/onBoarding/types';
import useFunnel from '@shared/hooks/useFunnel';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

export type StepName = (typeof STEP)[keyof typeof STEP];

const OnBoarding = () => {
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  async function handleAllowNotification() {
    registerServiceWorker();
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
        console.log('🔥 토큰 받았다 진멘:', token);
        // TODO: 서버로 이메일이랑 전송
      } else {
        alert('토큰 생성 실패...');
      }
    } catch (e) {
      console.error('FCM 토큰 받는 도중 오류:', e);
    }
  }

  const { Funnel, Step, setStep } = useFunnel(STEP.STORY);
  const os = useOSDetector();

  return (
    <div>
      <Header />
      <Funnel>
        <Step name={STEP.STORY}>
          <StoryStep setStep={setStep} />
        </Step>
        <Step name={STEP.TIME_SELECT}>
          <TimeSelectStep setStep={setStep} />
        </Step>
        {os === 'macos' && (
          <Step name={STEP.MAC_USER_NOTICE}>
            <MacUserNoticeStep setStep={setStep} />
          </Step>
        )}
        <Step name={STEP.WELCOME}>
          <WelcomeStep handleClick={handleAllowNotification} />
        </Step>
      </Funnel>
    </div>
  );
};

export default OnBoarding;
