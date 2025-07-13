import Carousel from '@pages/onBoarding/components/Carousel';
import { STORY_CONTENT } from '@pages/onBoarding/constants/storyStep';
import { useState } from 'react';

// TODO: 절대 경로 config 추가 시 절대 경로로 수정
import storyStep1 from '../../../assets/onBoarding/storyStep1.svg';
import storyStep2 from '../../../assets/onBoarding/storyStep2.svg';
import storyStep3 from '../../../assets/onBoarding/storyStep3.svg';
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
    <div className="flex w-full flex-col items-center gap-[7.4rem]">
      <Carousel
        currentStep={currentStep}
        handleCurrentStep={handleCurrentStep}
        images={images}
        total={total}
      />

      <div className="flex justify-between gap-[21.9rem]">
        <button onClick={movePrevStep} className="head1">
          ← 이전
        </button>
        <p className="sub3-sb whitespace-pre-line text-center">
          {STORY_CONTENT[currentStep].content}
        </p>
        <button onClick={moveNextStep} className="head1">
          다음 →
        </button>
      </div>
    </div>
  );
};

export default StoryStep;
