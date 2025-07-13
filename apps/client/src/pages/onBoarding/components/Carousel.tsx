import { DotIndicator } from '@pinback/design-system/ui';

interface CarouselProps {
  currentStep: number;
  handleCurrentStep: (step: number) => void;
  images: string[];
  total: number;
}

export default function Carousel({
  currentStep,
  handleCurrentStep,
  images,
  total,
}: CarouselProps) {
  return (
    <div
      className={`mx-auto mt-[13.9rem] flex w-[79.2rem] flex-col items-center gap-[5.7rem]`}
    >
      <DotIndicator
        current={currentStep}
        total={total}
        onSelect={(step: number) => handleCurrentStep(step)}
      />

      <div className="relative overflow-hidden rounded-md">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentStep * 100}%)`,
          }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`온보딩 스토리 단계 ${i + 1}`}
              role="img"
              aria-label={`${i + 1}번째 스토리 이미지`}
              className="h-full w-full flex-shrink-0 object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
