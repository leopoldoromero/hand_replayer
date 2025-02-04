import React from 'react';
import { BlockContainer } from './Block.styles';
import { SpacingProps } from '@/theme/sizes';
import { FlexProps } from '@/theme/flexbox';
import { BoxSizing, CustomStylesProps, HTMLEvents, Overflow, PositionType } from '@/theme/models';

export interface Props extends SpacingProps, FlexProps, CustomStylesProps, HTMLEvents<HTMLDivElement> {
  children: React.ReactNode;
  width?: string;
  height?: string;
  bgColor?: string;
  boxSizing?: BoxSizing;
  overflow?: Overflow;
  position?: PositionType;
  gap?: string;
}

const Block: React.FC<Props> = ({
    direction,
    display,
    justify,
    align,
    flexWrap,
    children,
    width,
    height,
    bgColor,
    boxSizing,
    overflow,
    position,
    mt,
    mr,
    mb,
    ml,
    pt,
    pr,
    pb,
    pl,
    customStyles,
    onClick,
    gap,
}) => (
  <BlockContainer
    $justify={justify}
    $display={display}
    $direction={direction}
    $flexWrap={flexWrap}
    $align={align}
    $width={width}
    $height={height}
    $bgColor={bgColor}
    $boxSizing={boxSizing}
    $overflow={overflow}
    $position={position}
    $mt={mt}
    $mr={mr}
    $mb={mb}
    $ml={ml}
    $pt={pt}
    $pr={pr}
    $pb={pb}
    $pl={pl}
    $customStyles={customStyles}
    onClick={onClick}
    $gap={gap}
  >
    {children}
  </BlockContainer>
);

export default Block;