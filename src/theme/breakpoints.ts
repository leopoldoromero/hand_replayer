import { css, CSSObject, DefaultTheme, Interpolation } from 'styled-components';

export enum Breakpoints {
  S = 500,
  M = 800,
  L = 1024,
  XL = 1300,
}

export type Media = {
  mobileXl: (strings: CSSObject, ...args: Interpolation<DefaultTheme>[]) => Interpolation<CSSObject>;
  tablet: (strings: CSSObject, ...args: Interpolation<DefaultTheme>[]) => Interpolation<CSSObject>;
  desktop: (strings: CSSObject, ...args: Interpolation<DefaultTheme>[]) => Interpolation<CSSObject>;
  desktopXl: (strings: CSSObject, ...args: Interpolation<DefaultTheme>[]) => Interpolation<CSSObject>;
};

export const media: Media = {
  mobileXl: (strings: CSSObject, ...args: Interpolation<DefaultTheme>[]) => css`
    @media (min-width: ${`${Breakpoints.S}px`}) and (max-width: ${`${Breakpoints.M}px`}) {
      ${css(strings, ...args)}
    }
  `,
  tablet: (strings: CSSObject, ...args: Interpolation<DefaultTheme>[]) => css`
    @media (min-width: ${`${Breakpoints.M}px`}) and (max-width: ${`${Breakpoints.L}px`}) {
      ${css(strings, ...args)}
    }
  `,
  desktop: (strings: CSSObject, ...args: Interpolation<DefaultTheme>[]) => css`
    @media (min-width: ${`${Breakpoints.L}px`}) {
      ${css(strings, ...args)}
    }
  `,
  desktopXl: (strings: CSSObject, ...args: Interpolation<DefaultTheme>[]) => css`
    @media (min-width: ${`${Breakpoints.XL}px`}) {
      ${css(strings, ...args)}
    }
  `,
};