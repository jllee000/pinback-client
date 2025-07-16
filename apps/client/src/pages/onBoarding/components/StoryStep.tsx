import Carousel from '@pages/onBoarding/components/Carousel';
import { STORY_CONTENT } from '@pages/onBoarding/constants/storyStep';
import { useState } from 'react';

// TODO: 절대 경로 config 추가 시 절대 경로로 수정
import storyStep1 from '../../../assets/onBoarding/storyStep1.svg';
import storyStep2 from '../../../assets/onBoarding/storyStep2.svg';
import storyStep3 from '../../../assets/onBoarding/storyStep3.svg';
import OnboardingNavButton from '@pages/onBoarding/components/OnboardingNavButton';
import { STEP } from '../types';

interface StoryStepProps {
  setStep: (step: string) => void;
}

const StoryStep = ({ setStep }: StoryStepProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const images = [storyStep1, storyStep2, storyStep3];
  const total = images.length;

  const handleCurrentStep = (step: number) => {
    return setCurrentStep(step);
  };

  const movePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const moveNextStep = () => {
    if (currentStep === total - 1) {
      setStep(STEP.TIME_SELECT);
      return;
    }

    if (currentStep < total - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="flex h-dvh w-full flex-col justify-center px-[12rem]">
      <div className="flex flex-col items-center">
        <Carousel
          currentStep={currentStep}
          handleCurrentStep={handleCurrentStep}
          images={images}
          total={total}
        />
        <p className="sub3-sb whitespace-pre-line pt-[7.3rem] text-center">
          {STORY_CONTENT[currentStep].content}
        </p>
      </div>

      <div
        className={`absolute bottom-[7.9rem] right-[12rem] flex w-[calc(100%-24rem)] ${
          currentStep === 0 ? 'justify-end' : 'justify-between'
        }`}
      >
        {currentStep > 0 && (
          <OnboardingNavButton direction="prev" onClick={movePrevStep} />
        )}
        <OnboardingNavButton direction="next" onClick={moveNextStep} />
      </div>
    </div>
  );
};

export default StoryStep;
