import { useEffect } from 'react';
import { Icon } from '@pinback/design-system/icons';
import Button from '../shared/components/Button.tsx';

const floatAnimationStyle = `
@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.float-animate {
  animation: floatY 2s ease-in-out infinite;
}
`;

const HeroSection = () => {
  useEffect(() => {
    // 애니메이션 style을 문서에 삽입 (한 번만)
    const style = document.createElement('style');
    style.innerHTML = floatAnimationStyle;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-white text-center">
      {/* 텍스트 오버레이 */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <Icon name="dotori" width={80} height={80} />

        <div className="mt-[3rem] leading-snug">
          <p className="head1 text-gray900">
            <span className="head1 text-gray900">차곡차곡 모아둔 </span>
            <span className="text-main400">북마크</span>
          </p>
          <p className="head1 text-gray900">저장만 하지 말고 </p>
          <p className="head1">
            <span className="text-main400"> 재미있게 활용</span>
            <span className="text-gray900">해 볼까요? </span>
          </p>
        </div>

        <p className="sub1-r text-gray300 mb-[4.1rem] mt-[6.6rem]">
          PinBack에서 북마크를 매일매일 깨워보세요!
        </p>

        <div className="float-animate">
          <Button
            text="스크롤하기"
            color="main400"
            fontSize="m"
            width={193}
            height={66}
            onClick={() => {
              document
                .querySelector('#bookmark-section')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            icon={<Icon name="ic_arrow_down_white" width={20} height={20} />}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
