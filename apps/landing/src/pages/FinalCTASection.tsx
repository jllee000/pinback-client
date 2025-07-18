import Lottie from 'lottie-react';
import Dotorifalling from '../assets/lottie/dotorifalling.json';
import Button from '../shared/components/Button.tsx';

const FinalCTASection = () => {
  return (
    <section className="bg-main400 relative h-dvh w-full overflow-hidden">
      {/* Lottie 배경 */}
      <Lottie
        animationData={Dotorifalling}
        loop
        autoplay
        className="absolute bottom-0 h-full w-auto scale-[1.5]"
      />

      {/* 텍스트 오버레이 */}
      <div className="absolute left-1/2 top-[28%] z-10 flex w-full max-w-[312px] -translate-x-1/2 flex-col items-center text-center">
        <p className="sub1-sb mb-[3.1rem] text-white">
          다람쥐 치삐와 함께
          <br />
          도토리를 모아볼까요?
        </p>
        <Button
          text="지금 시작하기"
          color="white"
          fontSize="lg"
          width={312}
          height={92}
        />
      </div>
    </section>
  );
};

export default FinalCTASection;
