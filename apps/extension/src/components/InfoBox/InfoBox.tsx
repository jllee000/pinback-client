import React from 'react';

type InfoBoxSize = 'medium' | 'large';

interface InfoBoxProps {
  size?: InfoBoxSize;
  title: string;
  location: string;
  icon?: string;
}

const InfoBox = ({ size = 'large', title, location, icon }: InfoBoxProps) => {
  const isLarge = size === 'large';
  return (
    <div
      className={`border-main400 ${isLarge ? 'h-[7.6rem] w-[32.7rem] gap-[1.5rem]' : 'h-[6.4rem] w-[26rem] gap-[1rem]'} flex items-center rounded-[1rem] border bg-white px-[1.2rem] py-[1.4rem]`}
    >
      <img
        className="aspect-[1/1] h-[4.2rem] w-[4.2rem] flex-shrink-0"
        src={icon}
      />
      <div className="flex flex-col">
        <div className={`${isLarge ? 'sub5-sb' : 'caption2-sb'} text-black`}>
          {location}
        </div>
        <div
          className={`${isLarge ? 'caption1-m' : 'caption2-m'} text-gray-400`}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
