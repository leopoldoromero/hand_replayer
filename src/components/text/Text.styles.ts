'use client';
import { FontSizeNames } from '@/theme/fonts';
import { CustomStylesStyledProps } from '@/theme/models';
import {
  margin,
  MarginStyledProps,
  padding,
  PaddingStyledProps,
} from '@/theme/sizes';
import styled from 'styled-components';

export const TexContainer = styled.span<
  {
    $fontSize?: FontSizeNames;
    $isUppercase?: boolean;
    $weight?: string;
    $textAlign?: string;
    $color?: string;
    $textOverFlow?: string;
    $overFlow?: string;
    $whiteSpace?: string;
    $fontFamily?: string;
  } & MarginStyledProps &
    PaddingStyledProps &
    CustomStylesStyledProps
>`
  text-transform: ${(p) => (p.$isUppercase ? 'uppercase' : 'none')};
  text-align: ${(p) => p.$textAlign};
  color: ${(p) => (p.$color ? p.theme.color[p.$color] : p.theme.color.white)};
  font-family: ${(p) =>
    p.$fontFamily ? p.theme.fontFamily[p.$fontFamily] : 'inherit'};
  text-overflow: ${(p) => p.$textOverFlow ?? 'clip'};
  overflow: ${(p) => p.$overFlow ?? 'visible'};
  white-space: ${(p) => p.$whiteSpace ?? 'normal'};
  margin: 0;
  ${margin};
  ${padding};
  ${(p) => p.theme.fontSizeGenerator(p.as, p.$fontSize)};
  font-weight: ${(p) => (p.$weight ? p.theme.weight[p.$weight] : 'normal')};
  ${(p) => p.$customStyles ?? ''};
`;
