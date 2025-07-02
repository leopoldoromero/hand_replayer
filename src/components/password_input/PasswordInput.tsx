import React, { useState } from 'react';
import Input, { InputProps } from '../Input/Input';
import { Wrapper } from './PasswordInput.styles';
import Button from '../button/Button';

type Props = Pick<InputProps, 'onChange' | 'name' | 'value' | 'id'> & {
  btn_id?: string;
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  ({ btn_id, ...rest }, ref)  =>{
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Wrapper>
      <Input
       {...rest}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        autoComplete='off'
      />
      <Button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setShowPassword(prev => !prev)}
        type="button"
        variant="icon"
        iconColor="black"
        iconSize="s"
        icon={showPassword ? 'eyeOff' : 'eye'}
        id={btn_id}
      />
    </Wrapper>
  );
});

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;
