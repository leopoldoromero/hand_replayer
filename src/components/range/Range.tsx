import { SliderInput, SliderWrapper, ValueDisplay } from './Range.styles';

interface RangeProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export function Range({ min, max, value, onChange }: RangeProps) {
  return (
    <SliderWrapper>
      <SliderInput
        type='range'
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <ValueDisplay>{value}</ValueDisplay>
    </SliderWrapper>
  );
}
