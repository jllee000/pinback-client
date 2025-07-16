import Modal from '@pages/dashboard/components/ui/feedback/Modal';
import LevelInfoSection from '@pages/dashboard/components/sections/LevelInfoSection';
import type { LevelInfoModalProps } from '@shared/types';
import { createPortal } from 'react-dom';

interface Props extends LevelInfoModalProps {
  className?: string;
}

const LevelInfoModal = ({ isOpen, onClose, className }: Props) => {
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <LevelInfoSection />
    </Modal>,
    document.body
  );
};

export default LevelInfoModal;
