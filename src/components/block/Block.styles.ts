'use client';
import { flex, FlexStyledProps } from '@/theme/flexbox';
import { CustomStylesStyledProps } from '@/theme/models';
import { margin, MarginStyledProps, padding, PaddingStyledProps } from '@/theme/sizes';
import styled from 'styled-components';

export const BlockContainer = styled.div<{
  $width?: string;
  $height?: string;
  $boxSizing?: string;
  $bgColor?: string;
  $position?: string;
  $overflow?: string;
  $gap?: string;
} & FlexStyledProps & MarginStyledProps & PaddingStyledProps & CustomStylesStyledProps>`
  width: ${(p) => p.$width ?? null};
  height: ${(p) => p.$height ?? null};
  box-sizing: ${(p) => p.$boxSizing ?? 'border-box'};
  background-color: ${(p) => p.$bgColor && p.theme.color[p.$bgColor]};
  position: ${(p) => p.$position ?? null};
  ${flex};
  ${margin};
  ${padding};
  ${(p) => p.$overflow ?? null};
  ${(p) => p.$customStyles ?? null};
  gap: ${(p) => p.$gap ?? null }
`;