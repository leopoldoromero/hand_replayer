import React from 'react';
import { TexContainer } from './Text.styles';
import { MarginProps, PaddingProps } from '@/theme/sizes';
import { CustomStylesProps } from '@/theme/models';
import { FontSizeNames, FontWeight } from '@/theme/fonts';
import { ColorKeys } from '@/theme/colors';

export interface Props extends MarginProps, PaddingProps, CustomStylesProps {
  children: React.ReactNode;
  fontSize?: FontSizeNames;
  isUppercase?: boolean;
  weight?: FontWeight;
  textAlign?: string;
  color?: ColorKeys;
  as?: string;
  textOverFlow?: string;
  overFlow?: string;
  whiteSpace?: string;
  fontFamily?: string;
  onClick?: () => void;
}

const Text: React.FC<Props> = ({
  children,
  fontSize = 'base',
  isUppercase = false,
  weight,
  textAlign = 'justify',
  color = 'default',
  as = 'span',
  textOverFlow,
  overFlow,
  whiteSpace,
  fontFamily,
  onClick,
  mt,
  mr,
  mb,
  ml,
  pt,
  pr,
  pb,
  pl,
  customStyles,
}) => (
  <TexContainer
    as={as}
    $fontSize={fontSize}
    $isUppercase={isUppercase}
    $weight={weight}
    $textAlign={textAlign}
    $color={color}
    $textOverFlow={textOverFlow}
    $overFlow={overFlow}
    $whiteSpace={whiteSpace}
    $fontFamily={fontFamily}
    $mt={mt}
    $mr={mr}
    $mb={mb}
    $ml={ml}
    $pt={pt}
    $pr={pr}
    $pb={pb}
    $pl={pl}
    onClick={onClick}
    $customStyles={customStyles}
  >
    {children}
  </TexContainer>
);

export default Text;