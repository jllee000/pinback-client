import { memo, Fragment } from 'react';
import {
  CHIPPY_LEVELS,
  LEVEL_INFO,
  LAYOUT,
  UI_TEXT,
} from '@pages/dashboard/constants';
import type { LevelInfoSectionProps } from '@shared/types';
import LevelInfoItem from '@pages/dashboard/components/features/LevelInfoItem';

const LevelInfoSection = memo(({ className = '' }: LevelInfoSectionProps) => {
  const levels = CHIPPY_LEVELS;

  return (
    <div
      className={`relative overflow-hidden rounded-[1rem] bg-white shadow-2xl ${className}`}
      style={{
        width: LEVEL_INFO.container.width,
        height: LEVEL_INFO.container.height,
      }}
    >
      <div className="relative">
        <div
          className="bg-main400 absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center rounded-[3.042rem] px-5 py-1.5"
          style={{
            top: LEVEL_INFO.title.top,
            width: LEVEL_INFO.title.width,
            height: LEVEL_INFO.title.height,
          }}
        >
          <div className="sub5-sb text-white">{UI_TEXT.level.title}</div>
        </div>

        <div
          className="absolute flex flex-col"
          style={{
            left: LEVEL_INFO.content.left,
            top: LEVEL_INFO.content.top,
          }}
        >
          <div
            className="flex flex-col"
            style={{
              width: LEVEL_INFO.content.width,
              gap: LAYOUT.spacing.levelGap,
            }}
          >
            {levels.map((levelData) => (
              <LevelInfoItem
                key={levelData.level}
                level={levelData.level}
                name={levelData.name}
                image={levelData.image}
                acorns={levelData.acorns}
              />
            ))}
          </div>

          <div
            className="bg-gray0 inline-flex items-center justify-center gap-2.5 rounded-[0.6rem] p-2.5"
            style={{
              marginTop: LEVEL_INFO.description.marginTop,
              marginBottom: LEVEL_INFO.description.marginBottom,
              marginLeft: LEVEL_INFO.description.marginLeft,
              width: LEVEL_INFO.description.width,
              height: LEVEL_INFO.description.height,
            }}
          >
            <div className="text-gray700 body3-r text-left">
              {UI_TEXT.level.description.split('\n').map((line, index) => (
                <Fragment key={index}>
                  {line}
                  {index === 0 && <br />}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

LevelInfoSection.displayName = 'LevelInfoSection';

export default LevelInfoSection;
