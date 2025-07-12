import { memo } from 'react';
import acornLevel from '@assets/characters/acorn/level.svg';
import { LEVEL_INFO } from '@shared/constants';
import type { LevelInfoItemProps } from '@shared/types';

const LevelInfoItem = memo(
  ({ level, name, image, acorns }: LevelInfoItemProps) => {
    return (
      <div
        className="flex items-end"
        style={{
          width: LEVEL_INFO.item.width,
          height: LEVEL_INFO.item.height,
          gap: LEVEL_INFO.item.gap,
        }}
      >
        <div
          className="object-contain"
          style={{
            width: LEVEL_INFO.item.image.width,
            height: LEVEL_INFO.item.image.height,
          }}
        >
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-[0.2rem]">
          <div
            className="outline-main400 flex items-center justify-center rounded-[5rem] px-2.5 py-0.5 outline-1 outline-offset-[-1px]"
            style={{
              width: LEVEL_INFO.item.badge.width,
              height: LEVEL_INFO.item.badge.height,
            }}
          >
            <div className="text-main400 caption2-sb leading-none">
              LV.{level}
            </div>
          </div>

          <div
            className="text-gray800 caption1-m leading-tight"
            style={{
              width: LEVEL_INFO.item.name.width,
              height: LEVEL_INFO.item.name.height,
            }}
          >
            {name}
          </div>

          <div className="mt-[0.1rem] flex items-center gap-[0.3rem]">
            <div
              style={{
                width: LEVEL_INFO.item.acorn.size,
                height: LEVEL_INFO.item.acorn.size,
              }}
            >
              <img
                src={acornLevel}
                alt="도토리"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="text-gray500 caption2-m">{acorns}</div>
          </div>
        </div>
      </div>
    );
  }
);

LevelInfoItem.displayName = 'LevelInfoItem';

export default LevelInfoItem;
