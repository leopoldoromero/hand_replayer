import { ToggleInput, ToggleSlider, ToggleWrapper } from './Toggle.styles';

interface Props {
  isChecked: boolean;
  onToggle: () => void;
}

const Toggle: React.FC<Props> = ({ isChecked, onToggle }) => {
  return (
    <ToggleWrapper>
      <ToggleInput type='checkbox' checked={isChecked} onChange={onToggle} />
      <ToggleSlider $isChecked={isChecked} />
    </ToggleWrapper>
  );
};

export default Toggle;
