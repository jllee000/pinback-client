type InfoBoxSize = 'medium' | 'large';

interface InfoBoxProps {
  size?: InfoBoxSize;
  title: string;
  description: string;
  icon?: string;
  image: string;
}

const InfoBox = ({
  size = 'large',
  title,
  description,
  image,
}: InfoBoxProps) => {
  const isLarge = size === 'large';
  return (
    <div
      className={`border-main400 ${isLarge ? 'h-[7.6rem] w-[32.7rem] gap-[1.5rem]' : 'h-[6.8rem] w-[26rem] gap-[1rem]'} flex items-center rounded-[1rem] border bg-white px-[1.2rem] py-[1.4rem]`}
    >
      <img
        className="aspect-[1/1] h-[4.2rem] w-[4.2rem] flex-shrink-0 rounded-[0.8rem]"
        src={image}
      />
      <div className="flex min-w-0 flex-col">
        <div
          className={`${isLarge ? 'sub5-sb' : 'caption2-sb'} w-full truncate text-black`}
        >
          {title}
        </div>
        <div
          className={`${isLarge ? 'caption1-m' : 'caption2-m'} w-full truncate text-gray-400`}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
