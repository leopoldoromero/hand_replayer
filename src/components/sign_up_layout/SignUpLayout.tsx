'use client';

import { registerUserAction } from "@/actions/user.actions";
import Block from "../block/Block";
import Text from "../text/Text";
import Button from "../button/Button";
import FormCard from "../form_card/FormCard";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import PasswordInput from "../password_input/PasswordInput";

type SignInFormData = {
    username?: string;
    email: string;
    password: string;
    repeatPassword: string;
};

/*
type PrefixedWithDollar<T> = {
  [K in keyof T as `$${string & K}`]?: T[K];
};
*/

const SignUpLayout = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignInFormData>({ mode: 'onBlur' });
    const [isPending, startTransition] = useTransition();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: SignInFormData) => {
    setIsSubmitting(true);
    startTransition(async () => {
        try {
        await registerUserAction(data);
        } finally {
        setIsSubmitting(false);
        }
    });
    };

  if (isPending || isSubmitting) return <h1>Loading....</h1>
    return (
    <Block display="flex" justify="center" align="center" pt="l">
      <FormCard onSubmit={handleSubmit(onSubmit)}>
        <Text as="h2" fontSize="tiny" weight="bold" mb="s">
          SIGN UP
        </Text>

        <Block display="flex" direction="column" width="100%" pt="s" pb="m">
          <Text fontSize="medium">Username</Text>
          <Input
            {...register('username')}
            name="username"
            type="username"
            variant="outlined"
          />
          {errors.username && (
            <Block display="flex" width="100%" justify="center" mt='s'>
              <Text fontSize="small" color="red">
                {errors.username.message}
              </Text>
            </Block>
          )}
        </Block>

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
            btn_id="sign_up_password_btn"
          />
          {errors.password && (
            <Block display="flex" width="100%" justify="center" mt='s'>
              <Text fontSize="small" color="red">
                {errors.password.message}
              </Text>
            </Block>
          )}
        </Block>

        <Block display="flex" direction="column" width="100%" pt="s" pb="m">
            <Text fontSize="medium">Repeat Password</Text>
            <PasswordInput
                {...register('repeatPassword', {
                required: 'Please repeat your password',
                validate: (value) => value === getValues('password') || 'Passwords do not match',
                })}
                name="repeatPassword"
                btn_id="sign_up_repeated_password_btn"
            />
            {errors.repeatPassword && (
                <Block display="flex" width="100%" justify="center" mt='s'>
                    <Text fontSize="small" color="red">
                        {errors.repeatPassword.message}
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
}

export default SignUpLayout;
/*
        <Block display="flex" direction="column" width="100%" pt="s" pb="m">
          <Text fontSize="medium">Repeat Password</Text>
          <PasswordInput
            {...register('password', {
              required: 'Password is required',
              validate: (val) => val === getValues().password
            })}
            name="password"
          />
          {errors.password && (
            <Block display="flex" width="100%" justify="center" mt='s'>
              <Text fontSize="small" color="red">
                {errors.password.message}
              </Text>
            </Block>
          )}
        </Block>
*/