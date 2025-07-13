import Modal from '@pages/dashboard/components/ui/feedback/Modal';
import LevelInfoSection from '@pages/dashboard/components/sections/LevelInfoSection';
import type { LevelInfoModalProps } from '@shared/types';

const LevelInfoModal = ({ isOpen, onClose }: LevelInfoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="">
      <LevelInfoSection />
    </Modal>
  );
};

export default LevelInfoModal;
