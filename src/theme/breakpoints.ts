import { css, CSSObject, DefaultTheme, Interpolation } from 'styled-components';

export enum Breakpoints {
  TABLET = 700,
  DESKTOP = 1024,
}

export type Media = {
  tablet: (strings: CSSObject, ...args: Interpolation<DefaultTheme>[]) => Interpolation<CSSObject>;
  desktop: (strings: CSSObject, ...args: Interpolation<DefaultTheme>[]) => Interpolation<CSSObject>;
};

export const media: Media = {
  tablet: (strings: CSSObject, ...args: Interpolation<DefaultTheme>[]) => css`
    @media (min-width: ${`${Breakpoints.TABLET}px`}) and (max-width: ${`${Breakpoints.DESKTOP}px`}) {
      ${css(strings, ...args)}
    }
  `,
  desktop: (strings: CSSObject, ...args: Interpolation<DefaultTheme>[]) => css`
    @media (min-width: ${`${Breakpoints.DESKTOP}px`}) {
      ${css(strings, ...args)}
    }
  `,
};