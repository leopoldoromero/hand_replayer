'use client';

import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './GlobalStyles';
import { media } from './breakpoints';
import { flex } from './flexbox';
import { fontFamilies, fontSize, fontSizeGenerator, weights } from './fonts';
import { colors } from './colors';

export enum Z_INDEX {
  low = 1,
  mid = 2,
  high = 3,
  max = 4,
}

const zIndex = {
  low: Z_INDEX.low,
  mid: Z_INDEX.mid,
  high: Z_INDEX.high,
  max: Z_INDEX.max,
};

const theme = {
  flex,
  media,
  zIndex,
  fontFamily: fontFamilies,
  fontSize,
  fontSizeGenerator,
  color: colors,
  weight: weights,
};

type Props = {
  children: React.ReactNode;
};

const StylesProvider: React.FC<Props> = ({ children }) => (
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);

export default StylesProvider;
