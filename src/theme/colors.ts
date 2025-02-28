export enum Colors {
  black = '#000000',
  white = '#ffffff',
  red = '#ff0000',
  blue = '#013ce5',
  green = '#1ecb24',
  grey = '#b2b2b2',
}

export const colors = Object.keys(Colors).reduce((acc, key) => {
  const colorKey = key as keyof typeof Colors;
  return {
    ...acc,
    [colorKey]: Colors[colorKey],
  };
}, {} as { [key in keyof typeof Colors]: string });

export type ColorKeys = keyof typeof Colors;
