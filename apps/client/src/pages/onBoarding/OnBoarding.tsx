import { Header } from '@/shared';
import MacUserNoticeStep from '@pages/onBoarding/components/MacUserNoticeStep';
import StoryStep from '@pages/onBoarding/components/StoryStep';
import TimeSelectStep from '@pages/onBoarding/components/TimeSelectStep';
import WelcomeStep from '@pages/onBoarding/components/WelcomeStep';
import { useOSDetector } from '@pages/onBoarding/hooks/useOSDetector';
import { STEP } from '@pages/onBoarding/types';
import useFunnel from '@shared/hooks/useFunnel';

export type StepName = (typeof STEP)[keyof typeof STEP];

const OnBoarding = () => {
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
          <WelcomeStep />
        </Step>
      </Funnel>
    </div>
  );
};

export default OnBoarding;
