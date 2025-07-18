import Lottie from 'lottie-react';
import lightbulb_chippi_final from '../assets/lottie/lightbulb_chippi_final.json';

const FeatureReminderSection = () => {
  return (
    <section className="flex h-dvh items-center justify-center bg-white">
      <div className="flex items-center gap-[8rem]">
        {/* 이미지 영역 (로띠) */}
        <div className="flex items-center justify-center">
          <Lottie animationData={lightbulb_chippi_final} loop autoplay />
        </div>
        {/* 텍스트 영역 */}
        <div className="flex flex-col items-end gap-[2.4rem] text-right">
          <p className="sub1-sb text-success400">Everyday</p>
          <p className="head1">잊지 않도록 리마인드</p>
          <p className="sub1-r text-gray700">
            첫 실행 시 리마인드 추가를 설정해 놓치지 않고 <br />
            읽을 수 있어요
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureReminderSection;
