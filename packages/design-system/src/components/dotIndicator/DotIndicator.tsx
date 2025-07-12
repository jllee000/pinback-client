interface CarouselIndicatorProps {
  current: number;
  total: number;
  onSelect?: (step: number) => void;
}

const DotIndicator = ({ current, total, onSelect }: CarouselIndicatorProps) => {
  return (
    <div className="mt-2 flex gap-[1.6rem]">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect?.(i)}
          className={`transition-all duration-300 ${
            i === current
              ? 'bg-main200 h-[1.6rem] w-[5rem] rounded-full'
              : 'bg-gray200 h-[1.6rem] w-[1.6rem] rounded-full'
          }`}
        />
      ))}
    </div>
  );
};

export default DotIndicator;
