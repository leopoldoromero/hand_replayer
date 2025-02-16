import { css } from 'styled-components';

export type TextTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'a' | 'span' | 'strong' | 'input';

const BASE_SIZE = 1;

const tagScales: Record<TextTags, Partial<Record<FontSizeNames, number>>> = {
  h1: { tiny: 1.9, small: 2.5, base: 3, medium: 3.5, large: 4 },
  h2: { tiny: 1.65, small: 2, base: 2.5, medium: 3, large: 3.4 },
  h3: { tiny: 1.5, small: 1.75, base: 2, medium: 2.5, large: 3 },
  h4: { tiny: 1.25, small: 1.5, base: 1.75, medium: 2, large: 2.5 },
  h5: { tiny: 1, small: 1.25, base: 1.5, medium: 1.75, large: 2 },
  h6: { tiny: 0.875, small: 1, base: 1.25, medium: 1.5, large: 1.75 },
  p: { tiny: 0.7, small: 0.875, base: 1, medium: 1.125, large: 1.25 },
  a: { tiny: 0.75, small: 0.875, base: 1, medium: 1.125, large: 1.25 },
  span: { tiny: 0.6, small: 0.7, base: 0.9, medium: 1, large: 1.1 },
  strong: { tiny: 0.7, small: 0.8, base: 0.9, medium: 1, large: 1.1 },
  input: { tiny: 0.875, small: 1, base: 1.125, medium: 1.25, large: 1.375 },
};

export type FontSizeNames = 'tiny' | 'small' | 'base' | 'medium' | 'large' | 'extraLarge';
export const fontSize: Record<FontSizeNames, string> = {
  tiny: `${BASE_SIZE * 0.8}rem`,
  small: `${BASE_SIZE * 0.875}rem`,
  base: `${BASE_SIZE}rem`,
  medium: `${BASE_SIZE * 1.25}rem`,
  large: `${BASE_SIZE * 1.5}rem`,
  extraLarge: `${BASE_SIZE * 2}rem`,
};

const lineHeightScales: Record<TextTags, Partial<Record<FontSizeNames, number>>> = {
  h1: { tiny: 1.2, small: 1.3, base: 1.4, medium: 1.5, large: 1.6 },
  h2: { tiny: 1.2, small: 1.3, base: 1.4, medium: 1.5, large: 1.6 },
  h3: { tiny: 1.2, small: 1.3, base: 1.4, medium: 1.5, large: 1.6 },
  h4: { tiny: 1.3, small: 1.4, base: 1.5, medium: 1.6, large: 1.7 },
  h5: { tiny: 1.3, small: 1.4, base: 1.5, medium: 1.6, large: 1.7 },
  h6: { tiny: 1.4, small: 1.5, base: 1.6, medium: 1.7, large: 1.8 },
  p: { tiny: 1.4, small: 1.5, base: 1.6, medium: 1.7, large: 1.8 },
  a: { tiny: 1.3, small: 1.4, base: 1.5, medium: 1.6, large: 1.7 },
  span: { tiny: 1.2, small: 1.3, base: 1.4, medium: 1.5, large: 1.6 },
  strong: { tiny: 1.2, small: 1.3, base: 1.4, medium: 1.5, large: 1.6 },
  input: { tiny: 1.4, small: 1.5, base: 1.6, medium: 1.7, large: 1.8 },
};

export const defaultFontStyles: Record<
  TextTags,
  {
    "font-size": Record<FontSizeNames, string>;
    "font-weight": number;
    "line-height": Record<FontSizeNames, string>;
  }
> = Object.keys(tagScales).reduce((styles, tag) => {
  const tagKey = tag as TextTags;
  const scales = tagScales[tagKey];
  const lineHeights = lineHeightScales[tagKey];

  return {
    ...styles,
    [tagKey]: {
      "font-size": Object.keys(scales).reduce((sizes, sizeKey) => {
        const scaleKey = sizeKey as FontSizeNames;
        return {
          ...sizes,
          [scaleKey]: `${BASE_SIZE * (scales[scaleKey] ?? 1)}rem`, // Generate font size based on scale
        };
      }, {} as Record<FontSizeNames, string>),
      "font-weight": tagKey.startsWith("h") ? 600 : 400, // Headings are bold by default
      "line-height": Object.keys(lineHeights).reduce((lines, sizeKey) => {
        const lineKey = sizeKey as FontSizeNames;
        return {
          ...lines,
          [lineKey]: `${lineHeights[lineKey]}`, // Use line heights defined in lineHeightScales
        };
      }, {} as Record<FontSizeNames, string>),
    },
  };
}, {} as Record<
  TextTags,
  {
    "font-size": Record<FontSizeNames, string>;
    "font-weight": number;
    "line-height": Record<FontSizeNames, string>;
  }
>);


export const fontSizeGenerator = (tag: TextTags, size: keyof typeof fontSize) => css`
  font-size: ${defaultFontStyles[tag]["font-size"][size]};
  font-weight: ${defaultFontStyles[tag]["font-weight"]};
  line-height: ${defaultFontStyles[tag]["line-height"][size]};
`;

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
} as const;

export type FontWeight = keyof typeof fontWeights;

export const weights: Record<FontWeight, string> = Object.entries(fontWeights).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: `${value}`, 
  }),
  {} as Record<FontWeight, string>
);

export const fontFamilies = {
  base: "'Playfair Display', serif",
  base2: "'EB Garamond', serif",
  title: "'Vidaloka', serif",
  link: "'Ubuntu Condensed', sans-serif",
  baseLabel: "'Forum', serif",
  homeSlogan: "'Parisienne', cursive",
} as const;

export type FontFamilyKey = keyof typeof fontFamilies;

export const fontFamilyMap: Record<FontFamilyKey, string> = Object.entries(fontFamilies).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: value,
  }),
  {} as Record<FontFamilyKey, string>
);