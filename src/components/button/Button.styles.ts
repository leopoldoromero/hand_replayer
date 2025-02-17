'use client';
import styled, { css } from 'styled-components';
import { ButtonVariant } from './Button';
import { margin, MarginStyledProps, padding, PaddingStyledProps, Size } from '@/theme/sizes';

const setSize = (size: Size, variant: ButtonVariant) => {
  switch (size) {
    case 's':
      return css`
        font-size: 0.8rem;
        padding: ${variant === 'contained' ? `0.25rem 0.625rem` : `0.188rem 0.563rem`};
      `;
    case 'm':
      return css`
        font-size: 0.875rem;
        padding: ${variant === 'contained' ? `0.375rem 1rem` : `0.313rem 0.938rem`};
      `;
    case 'l':
      return css`
        font-size: 0.9375rem;
        padding: ${variant === 'contained' ? `0.5rem 1.375rem` : `0.438rem 1.313rem`};
      `;
    default:
      return ``;
  }
};

const setStyles = (variant: ButtonVariant, color?: string, disabled?: boolean) => {
  switch (variant) {
    case 'text':
      return css`
        background-color: transparent;
        border: 0;
        color: ${disabled ? (p) => p.theme.color.mediumSilver : (p) => p.theme.color[color ?? 'black']};
        &:hover {
          background-color: ${(p) => p.theme.color[color ?? 'black']}10;
        }
        &:disabled {
          background-color: ${(p) => p.theme.color[color ?? 'black']}10;
        }
      `;
    case 'contained':
      return css`
        background-color: ${disabled ? (p) => p.theme.color.mediumSilver : (p) => p.theme.color[color ?? 'black']};
        border: 0;
        color: ${disabled ? (p) => p.theme.color.darkSilver : (p) => p.theme.color.white};
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%),
          0px 1px 5px 0px rgb(0 0 0 / 12%);
        &:hover {
          box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%),
            0px 1px 10px 0px rgb(0 0 0 / 12%);
        }
        &:disabled {
          box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%),
            0px 1px 10px 0px rgb(0 0 0 / 12%);
        }
      `;
    case 'outlined':
      return css`
        border: 1px solid ${(p) => p.theme.color[color ?? 'black']};
        color: ${disabled ? (p) => p.theme.color.mediumSilver : (p) => p.theme.color[color ?? 'black']};
        background-color: transparent;
        &:hover {
          background-color: ${(p) => p.theme.color[color ?? 'black']}10;
        }
        &:disabled {
          background-color: ${(p) => p.theme.color[color ?? 'black']}10;
        }
      `;
    case 'icon':
      return css`
        min-width: 0;
        background-color: transparent;
        border: none;
      `;
    default:
      return css`
        background-color: ${(p) => p.theme.color[color ?? 'black']};
        border: 0;
        color: ${(p) => p.theme.color.black};
        &:disabled {
          opacity: 0.5;
        }
        opacity:  ${disabled ? '0.5' : '1'};
        &:hover {
          opacity: 1;
          background-color: ${(p) => p.theme.color.white}10;
          color: ${(p) => p.theme.color.white};
          box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 10%),
            0px 1px 10px 0px rgb(0 0 0 / 10%);
        }
      `;
  }
};

export const ButtonWrapper = styled.button<{
  $size?: Size;
  $variant: ButtonVariant;
  $color?: string;
  $isUppercase?: boolean;
  $customHover?: string;
  $disabled?: boolean;
  $fullWidth?: boolean;
  $fullHeight?: boolean;
} & MarginStyledProps & PaddingStyledProps>`
  position: relative;
  text-align: center;
  font-weight: ${(p) => p.theme.weight.medium};
  font-family: ${(p) => p.theme.fontFamily.base};
  line-height: 1.75;
  letter-spacing: 0.08857em;
  width: fit-content;
  min-width: 64px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(p) => (p.$size && p.$variant !== 'icon' ? setSize(p.$size, p.$variant) : `padding: 0`)};
  ${(p) => setStyles(p.$variant, p.$color, p.$disabled)};
  &:hover {
    background-color: ${(p) => p.$customHover && p.theme.color[p.$customHover]};
  }
  height: ${(p) => p.$fullHeight && '100%'};
  width: ${(p) => p.$fullWidth && '100%'};
  ${margin};
  ${padding};
  ${(p) => p.theme.customStyles}
`;