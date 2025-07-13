import StoryStep from '@pages/onBoarding/components/StoryStep';
import TimeSelectStep from '@pages/onBoarding/components/TimeSelectStep';
import { STEP } from '@pages/onBoarding/types';
import useFunnel from '@shared/hooks/useFunnel';

export type StepName = (typeof STEP)[keyof typeof STEP];

const OnBoarding = () => {
  const { Funnel, Step, setStep } = useFunnel(STEP.STORY);

  return (
    <div>
      {/* TODO: header 추가 예정 */}
      <Funnel>
        <Step name={STEP.STORY}>
          <StoryStep setStep={setStep} />
        </Step>
        <Step name={STEP.TIME_SELECT}>
          <TimeSelectStep setStep={setStep} />
        </Step>
        {/* <Step name={STEP.WELCOME}>
          <WelcomeStep />
        </Step> */}
      </Funnel>
    </div>
  );
};

export default OnBoarding;
