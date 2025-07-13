import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from 'react';

interface StepProps {
  name: string;
  children: React.ReactNode;
}

interface FunnelProps {
  children: ReactNode;
}

const useFunnel = (initialStep: string) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const setStep = (step: string) => {
    setCurrentStep(step);
  };

  const Step = useCallback(({ children }: StepProps) => <>{children}</>, []);

  const Funnel = useCallback(
    ({ children }: FunnelProps) => {
      const validChildren = Children.toArray(children).filter(
        isValidElement
      ) as ReactElement<StepProps>[];

      const targetStep = validChildren.find(
        (childStep) => childStep.props.name === currentStep
      );

      return <>{targetStep || null}</>;
    },
    [currentStep]
  );

  return { Funnel, Step, setStep, currentStep };
};

export default useFunnel;
