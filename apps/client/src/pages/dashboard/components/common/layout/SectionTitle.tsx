import type { SectionTitleProps } from '@pages/dashboard/types/components';

const SectionTitle = ({
  text,
  variant = 'dailyReminder',
}: SectionTitleProps) => {
  const getVariantColor = () => {
    switch (variant) {
      case 'bookmark':
        return 'text-main400';
      case 'notification':
        return 'text-error400';
      case 'dailyReminder':
        return 'text-gray900';
      default:
        return 'text-gray900';
    }
  };

  return (
    <div className={`head2 justify-start self-stretch ${getVariantColor()}`}>
      {text}
    </div>
  );
};

export default SectionTitle;
