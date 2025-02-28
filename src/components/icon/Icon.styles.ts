'use client';
import styled, { css } from 'styled-components';
import { IconSize } from './Icon';
import { ColorKeys } from '@/theme/colors';
import { margin, MarginStyledProps } from '@/theme/sizes';
import { CustomStylesStyledProps } from '@/theme/models';

const getSize = (size: IconSize) => {
  switch (size) {
    case 'xs':
      return css`
        width: 0.938rem;
        height: 0.938rem;
      `;
    case 'm':
      return css`
        width: 1.563rem;
        height: 1.563rem;
      `;
    case 'l':
      return css`
        width: 2.563rem;
        height: 2.563rem;
      `;
    default:
      return css`
        width: 1.4rem;
        height: 1.4rem;
      `;
  }
};

export const Container = styled.div<
  {
    $size: IconSize;
    $color: ColorKeys;
    $hoverColor?: ColorKeys;
    $hoverBgColor?: ColorKeys;
    $activeColor?: ColorKeys;
    $isSortable?: boolean;
  } & MarginStyledProps &
    CustomStylesStyledProps
>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${margin};

  > svg {
    ${(p) => getSize(p.$size)};
    fill: ${(p) => p.theme.color[p.$color]};
    ${(p) =>
      p.$hoverColor &&
      css`
        &:hover {
          color: ${p.theme.color[p.$hoverColor]}90;
          fill: ${p.theme.color[p.$hoverColor]}90;
        }
      `}
    ${(p) => p.$customStyles && p.$customStyles};
  }
`;
