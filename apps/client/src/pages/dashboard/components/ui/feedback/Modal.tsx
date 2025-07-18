import { useEffect } from 'react';
import type { ModalProps } from '@pages/dashboard/types/components';

const Modal = ({ isOpen, onClose, children, className = '' }: ModalProps) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // if (isOpen) {
    //   document.addEventListener('keydown', handleEscapeKey);
    //   document.body.style.overflow = 'hidden';
    // }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className={className}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
