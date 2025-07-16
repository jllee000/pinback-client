import { useState } from 'react';
import infoIcon from '@assets/icons/ui/gray500.svg';
import Modal from '@pages/dashboard/components/ui/feedback/Modal';
import LevelInfoSection from '@pages/dashboard/components/sections/LevelInfoSection';

interface BannerLevelInfoProps {
  levelText: string;
}

const BannerLevelInfo = ({ levelText }: BannerLevelInfoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsModalOpen(true);
  };

  const handleMouseLeave = () => {
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      {/* 레벨별 텍스트 */}
      <div
        className="absolute left-[23.4rem] top-[29.5rem] z-20 flex h-[3.7rem] items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="sub2-sb text-gray700">{levelText}</span>
        <div className="relative">
          <img
            src={infoIcon}
            alt="info"
            className="ml-[0.4rem] h-[2.4rem] w-[2.4rem] object-contain"
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          />

          {isModalOpen && (
            <div className="absolute left-[1rem] top-full z-[9999] mt-[1rem]">
              <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                className=""
              >
                <LevelInfoSection />
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerLevelInfo;
