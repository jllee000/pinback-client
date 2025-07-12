import Modal from '@shared/components/ui/feedback/Modal';
import { LevelInfoSection } from '@shared/components/features';
import type { LevelInfoModalProps } from '@shared/types';

const LevelInfoModal = ({ isOpen, onClose }: LevelInfoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="">
      <LevelInfoSection />
    </Modal>
  );
};

export default LevelInfoModal;
