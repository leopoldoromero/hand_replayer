import * as React from 'react';
import { Container } from './Icon.styles';
import content from './icon_types';
import { MarginProps } from '@/theme/sizes';
import { CustomStylesProps } from '@/theme/models';
import { ColorKeys } from '@/theme/colors';

export type IconSize = 'xs' | 's' | 'm' | 'l';
export type IconTypes =
  | 'closeX'
  | 'play'
  | 'pause'
  | 'forward'
  | 'backward'
  | 'next'
  | 'prev';

export interface Props extends MarginProps, CustomStylesProps {
  icon: IconTypes;
  size: IconSize;
  color: ColorKeys;
  hoverColor?: ColorKeys;
  isSortable?: boolean;
  hoverBgColor?: ColorKeys;
  activeColor?: ColorKeys;
}

export type IconContainerProps = Omit<Props, 'icon'>;

const Icon: React.FC<Props> = ({
  icon,
  size,
  color,
  hoverColor,
  hoverBgColor,
  activeColor,
  isSortable,
  mt,
  mr,
  mb,
  ml,
  customStyles,
}) => (
  <Container
    $size={size}
    $color={color}
    $hoverColor={hoverColor}
    $hoverBgColor={hoverBgColor}
    $activeColor={activeColor}
    $isSortable={isSortable}
    data-testid='icon_test_id'
    $mt={mt}
    $mr={mr}
    $mb={mb}
    $ml={ml}
    $customStyles={customStyles}
  >
    {content[icon]}
  </Container>
);

export default Icon;
