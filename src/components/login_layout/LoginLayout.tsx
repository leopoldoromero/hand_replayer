'use client';
import { useForm } from 'react-hook-form';
import Block from '../block/Block';
import Button from '../button/Button';
import FormCard from '../form_card/FormCard';
import Text from '../text/Text';
import Input from '../Input/Input';
import { useDispatch } from 'react-redux';
import { DispatchAction } from '@/lib/redux/store';
import { useRouter } from 'next/navigation';
import { getMeUserThunk } from '@/lib/redux/user/user.thunk';
import { loginAction } from '@/actions/auth.actions';
import { snackbarActions } from '@/lib/redux/snackbar/snackbar.slice';
import PasswordInput from '../password_input/PasswordInput';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ mode: 'onBlur' });
  const dispatch = useDispatch<DispatchAction>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
    await loginAction(data);

    const resultAction = await dispatch(getMeUserThunk());

    if (getMeUserThunk.fulfilled.match(resultAction)) {
      router.push('/');
    } else {
      const errorMessage = resultAction.payload as string || 'Fetching user info failed';
      dispatch(snackbarActions.error(errorMessage));
      console.error('GetMe Error:', errorMessage);
    }
  } catch (err: unknown) {
    const errorMessage = (err as Error)?.message || 'Login failed';
    dispatch(snackbarActions.error(errorMessage));
    console.error('Login Error:', errorMessage);
  }
  };

  return (
    <Block display="flex" justify="center" align="center" pt="l">
      <FormCard onSubmit={handleSubmit(onSubmit)}>
        <Text as="h2" fontSize="tiny" weight="bold" mb="s">
          LOGIN
        </Text>

        <Block display="flex" direction="column" width="100%" pt="s" pb="m">
          <Text fontSize="medium">Email</Text>
          <Input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            name="email"
            type="text"
            variant="outlined"
          />
          {errors.email && (
            <Block display="flex" width="100%" justify="center" mt='s'>
              <Text fontSize="small" color="red">
                {errors.email.message}
              </Text>
            </Block>
          )}
        </Block>

        <Block display="flex" direction="column" width="100%" pt="s" pb="m">
          <Text fontSize="medium">Password</Text>
          <PasswordInput
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Minimum 6 characters',
              },
            })}
            name="password"
            btn_id="log_in_password_btn"
          />
          {errors.password && (
            <Block display="flex" width="100%" justify="center" mt='s'>
              <Text fontSize="small" color="red">
                {errors.password.message}
              </Text>
            </Block>
          )}
        </Block>

        <Button
          type="submit"
          variant="default"
          text="SUBMIT"
          color="grey"
        />
      </FormCard>
    </Block>
  );
};

export default LoginLayout;
