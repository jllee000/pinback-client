import EmptyState, { EmptyStateProps } from './EmptyState';
import { EMPTY_STATE_PRESETS } from './EmptyStatePresets';

interface ReusableEmptyStateProps extends Partial<EmptyStateProps> {
  preset: keyof typeof EMPTY_STATE_PRESETS;
}

const ReusableEmptyState = ({ preset, ...override }: ReusableEmptyStateProps) => {
  const presetProps = EMPTY_STATE_PRESETS[preset];
  return <EmptyState {...presetProps} {...override} />;
};

export default ReusableEmptyState; 