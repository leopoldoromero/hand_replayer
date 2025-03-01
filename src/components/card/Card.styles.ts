'use client';
import styled from 'styled-components';

export const StyledCard = styled.div<{
  $bgColor: string;
  $showSliced?: boolean;
  $bigSize?: boolean;
  $hidden?: boolean;
}>`
  position: relative;
  background: ${(p) => p.theme.color[p.$bgColor]};
  position: relative;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5%;
  ${(p) => p.$hidden && 'visibility: hidden;'};
  ${(p) => p.$showSliced && 'clip-path: inset(0 0 45% 0);'}

  width: ${(p) => (p.$bigSize ? '63px' : '35px')};
  height: ${(p) => (p.$bigSize ? '90px' : '50px')};

  ${(p) => p.theme.media.tablet`
    width: ${p.$bigSize ? '70px' : '40px'};
    height: ${p.$bigSize ? '100px' : '55px'};
  `}

  ${(p) => p.theme.media.desktop`
    width: ${p.$bigSize ? '70px' : '40px'};
    height: ${p.$bigSize ? '100px' : '55px'};
  `}
`;

export const StyledTopContainer = styled.div<{
  $isSuit?: boolean;
  $bigSize?: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  font-weight: 600;
  text-align: center;
  font-size: ${(p) => (p.$bigSize ? '1.2rem' : '.8rem')};
  height: 30%;
`;

export const StyledBottomContainer = styled.div<{ $bigSize?: boolean }>`
  display: flex;
  justify-content: flex-end;
  margin-top: ${(p) => (p.$bigSize ? '-22px' : '-10px')};
  font-weight: 600;
  text-align: center;
  font-size: ${(p) => (p.$bigSize ? '5rem' : '2.5rem')};
  height: 70%;
`;

export const StyledCardText = styled.span<{
  $isSuit?: boolean;
  $bigSize?: boolean;
}>`
  display: block;
  font-size: inherit;
  text-transform: uppercase;
  ${(p) =>
    p.$isSuit &&
    `
        line-height: 0.2;
        font-size: 1rem;
        font-size: ${p.$bigSize ? '1.3rem' : '1rem'};
    `}
`;
