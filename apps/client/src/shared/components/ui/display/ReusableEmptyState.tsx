import EmptyState, {
  EmptyStateProps,
} from '@shared/components/ui/display/EmptyState';
import { EMPTY_STATE_PRESETS } from '@shared/components/ui/display/EmptyStatePresets';

interface ReusableEmptyStateProps extends Partial<EmptyStateProps> {
  preset: keyof typeof EMPTY_STATE_PRESETS;
}

const ReusableEmptyState = ({
  preset,
  ...override
}: ReusableEmptyStateProps) => {
  const presetProps = EMPTY_STATE_PRESETS[preset];
  return <EmptyState {...presetProps} {...override} />;
};

export default ReusableEmptyState;
