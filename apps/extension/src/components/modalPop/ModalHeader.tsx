import { Icon } from '@pinback/design-system/icons';
interface ModalHeaderProps {
  onClick: () => void;
}
const ModalHeader = ({ onClick }: ModalHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <Icon width={56} height={14} name="popup_logo" />
      <Icon width={18} height={18} name="close-button" onClick={onClick} />
    </div>
  );
};
export default ModalHeader;
