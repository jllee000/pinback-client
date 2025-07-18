import Lottie from 'lottie-react';
import Note from '../assets/lottie/note_lottie.json';

const FeatureBookmarkSection = () => {
  return (
    <section className="flex h-dvh items-center justify-center bg-white">
      <div className="flex items-center gap-[8rem]">
        {/* 텍스트 영역 */}
        <div className="flex flex-col items-start gap-[2.4rem] text-left">
          <p className="sub1-sb text-success400">Apply</p>
          <p className="head1">손쉽게 북마크하고 메모까지</p>
          <p className="sub1-r text-gray700">
            기억에 남기고 싶은 정보를 <br />
            빠르게 북마크하세요.
          </p>
        </div>

        {/* 이미지 영역 (로띠) */}
        <div className="flex items-center justify-center">
          <Lottie animationData={Note} loop={true} autoplay={true} />
        </div>
      </div>
    </section>
  );
};

export default FeatureBookmarkSection;
