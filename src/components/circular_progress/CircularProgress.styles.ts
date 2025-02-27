'use client'
import styled from 'styled-components';

export const SVGContainer = styled.svg`
`;

export const Circle = styled.circle`
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease-in-out;
`;

export const ProgressCircle = styled(Circle)`
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease-in-out;
`;

export const StyledText = styled.text`
  font-size: 0.7rem;
  font-weight: bold;
    fill: #ffffff;
  text-anchor: middle;
`;

