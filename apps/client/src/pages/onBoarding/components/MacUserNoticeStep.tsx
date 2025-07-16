import macNoticeImage from '@assets/onBoarding/mac_notice.svg';
import { STEP } from '@pages/onBoarding/types';
import OnboardingNavButton from '@pages/onBoarding/components/OnboardingNavButton';

interface MacUserNoticeStepProps {
  setStep: (step: string) => void;
}

const MacUserNoticeStep = ({ setStep }: MacUserNoticeStepProps) => {
  return (
    <>
      <div className="relative mt-[11.7rem] flex flex-col items-center gap-[1.9rem]">
        <div className="flex flex-col items-center gap-[1.2rem]">
          <p className="head1">치삐를 만나려면 알림 설정이 필요해요</p>
          <p className="sub4-sb text-gray-800">
            Mac 사용자는 추가 알림 설정을 진행해 주세요.
          </p>
        </div>
        <img
          src={macNoticeImage}
          alt="Mac 알림 설정 필요 이미지"
          className="fixed bottom-0"
        />
      </div>
      {/* TODO: button 태그 token 적용 이슈로 임시 div 사용 -> button 교체 */}

      <div className="absolute bottom-[7.9rem] right-[12rem]">
        <OnboardingNavButton
          direction="next"
          onClick={() => {
            setStep(STEP.WELCOME);
          }}
        />
      </div>
    </>
  );
};

export default MacUserNoticeStep;
