import { css, CSSObject } from 'styled-components';

export type Size = 'xs' | 's' | 'm' | 'l';

export type ExtendedSize = Size | 'xl' | 'xxl';

export type CustomSize = {
  width: string;
  height: string;
};
export type MarginProps = {
  mt?: ExtendedSize;
  mr?: ExtendedSize;
  mb?: ExtendedSize;
  ml?: ExtendedSize;
};
export type PaddingProps = {
  pt?: ExtendedSize;
  pr?: ExtendedSize;
  pb?: ExtendedSize;
  pl?: ExtendedSize;
};

export type MarginStyledProps = {
  $mt?: ExtendedSize;
  $mr?: ExtendedSize;
  $mb?: ExtendedSize;
  $ml?: ExtendedSize;
};
export type PaddingStyledProps = {
  $pt?: ExtendedSize;
  $pr?: ExtendedSize;
  $pb?: ExtendedSize;
  $pl?: ExtendedSize;
};
export type SpacingProps = PaddingProps & MarginProps;
const values = {
  xs: '0.5rem',
  s: '0.5rem',
  m: '0.8rem',
  l: '1.2rem',
  xl: '1.5rem',
  xxl: '2rem',
};
export const margin = css<MarginStyledProps>`
  margin-top: ${(p: MarginStyledProps) => (p.$mt ? values[p.$mt] : null)};
  margin-right: ${(p: MarginStyledProps) => (p.$mr ? values[p.$mr] : null)};
  margin-bottom: ${(p: MarginStyledProps) => (p.$mb ? values[p.$mb] : null)};
  margin-left: ${(p: MarginStyledProps) => (p.$ml ? values[p.$ml] : null)};
`;

export const padding = css<PaddingStyledProps>`
  padding-top: ${(p: PaddingStyledProps) => (p.$pt ? values[p.$pt] : null)};
  padding-right: ${(p: PaddingStyledProps) => (p.$pr ? values[p.$pr] : null)};
  padding-bottom: ${(p: PaddingStyledProps) => (p.$pb ? values[p.$pb] : null)};
  padding-left: ${(p: PaddingStyledProps) => (p.$pl ? values[p.$pl] : null)};
`;
export const customStyles = css<{
  customStyles?: CSSObject;
}>`
  ${(p) => p.customStyles && { ...p.customStyles }};
`;

export const checkboxOrRadioSizes = {
  xs: 15,
  s: 18,
  m: 22,
  l: 30,
};

export const getInputSizeStyles = (size: Size) => css`
  width: ${checkboxOrRadioSizes[size]}px;
  height: ${checkboxOrRadioSizes[size]}px;
`;
