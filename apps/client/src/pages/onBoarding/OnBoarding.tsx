import { Header } from '@/shared';
import MacUserNoticeStep from '@pages/onBoarding/components/MacUserNoticeStep';
import StoryStep from '@pages/onBoarding/components/StoryStep';
import TimeSelectStep from '@pages/onBoarding/components/TimeSelectStep';
import WelcomeStep from '@pages/onBoarding/components/WelcomeStep';
import { useOSDetector } from '@pages/onBoarding/hooks/useOSDetector';
import { STEP } from '@pages/onBoarding/types';
import useFunnel from '@shared/hooks/useFunnel';
import { useLocation } from 'react-router-dom';

export type StepName = (typeof STEP)[keyof typeof STEP];

const OnBoarding = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

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
          <TimeSelectStep setStep={setStep} os={os} email={email} />
        </Step>
        {os === 'macos' && (
          <Step name={STEP.MAC_USER_NOTICE}>
            <MacUserNoticeStep setStep={setStep} />
          </Step>
        )}
        <Step name={STEP.WELCOME}>
          <WelcomeStep />
        </Step>
      </Funnel>
    </div>
  );
};

export default OnBoarding;
