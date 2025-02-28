import { css } from 'styled-components';

export type FlexProps = {
  direction?: FlexDirection;
  display?: Flex;
  justify?: JustifyContent;
  align?: AlignItems;
  flexWrap?: FlexWrap;
};

export type FlexStyledProps = {
  $direction?: FlexDirection;
  $display?: Flex;
  $justify?: JustifyContent;
  $align?: AlignItems;
  $flexWrap?: FlexWrap;
};
export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
export type Flex = 'flex';
export type FlexDirection = 'row' | 'column' | 'row-reverse';
export type AlignItems = 'center' | 'flex-start' | 'flex-end' | 'baseline';
export type JustifyContent =
  | AlignItems
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export const flex = css<FlexStyledProps>`
  display: ${(p: FlexStyledProps) => p.$display ?? null};
  flex-direction: ${(p: FlexStyledProps) => p.$direction};
  justify-content: ${(p: FlexStyledProps) => p.$justify ?? null};
  align-items: ${(p: FlexStyledProps) => p.$align ?? null};
  flex-wrap: ${(p: FlexStyledProps) => p.$flexWrap && p.$flexWrap};
`;
