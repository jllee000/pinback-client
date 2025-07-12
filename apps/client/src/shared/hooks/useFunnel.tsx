import { ReactElement, useCallback, useState } from 'react';

interface StepProps {
  name: string;
  children: React.ReactNode;
}

export interface FunnelProps {
  children: ReactElement<StepProps>[];
}

const useFunnel = () => {
  const [currentStep, setCurrentStep] = useState('story');

  const setStep = (step: string) => {
    setCurrentStep(step);
  };

  const Step = useCallback(({ children }: StepProps) => <>{children}</>, []);

  const Funnel = useCallback(
    ({ children }: FunnelProps) => {
      const targetStep = children.find(
        (childStep) => childStep.props.name === currentStep
      );
      return <>{targetStep || null}</>;
    },
    [currentStep]
  );

  return { Funnel, Step, setStep, currentStep };
};

export default useFunnel;
