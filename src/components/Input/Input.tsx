import React from 'react';
import { InputContainer, Wrapper } from './Input.styles';
import { Size } from '@/theme/sizes';

export interface InputBaseProps {
  name: string;
  value?: string | number;
  id?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readonly?: boolean;
}

export type InputVariant = 'outlined' | 'standard' | 'filled' | 'borderless';
export interface InputProps extends InputBaseProps {
  type?: string;
  autoComplete?: 'on' | 'off';
  placeholder?: string;
  variant?: InputVariant;
  inputSize?: Size;
  min?: string | number;
  max?: string | number;
  focusable?: boolean;
  width?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  variant,
  autoComplete = 'on',
  inputSize,
  focusable = true,
  width,
  ...rest
}, ref) => (
  <Wrapper
    inputSize={inputSize}
    focusable={focusable}
    $variant={variant}
    width={width}
  >
    <InputContainer
      {...rest}
      ref={ref}
      autoComplete={autoComplete}
      $variant={variant}
    />
  </Wrapper>
));

Input.displayName = 'Input';
export default React.memo(Input);
