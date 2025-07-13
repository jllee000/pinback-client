interface TimeSelectStepProps {
  setStep: (step: string) => void;
}

const TimeSelectStep = ({ setStep }: TimeSelectStepProps) => {
  // TODO: build error 제거용 console
  console.log('setStep:', setStep);

  return <div>TimeSelectStep</div>;
};

export default TimeSelectStep;
