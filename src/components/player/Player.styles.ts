'use client';
import styled, { css } from 'styled-components';

const positionBySeat = (seat: number, isFullRing: boolean) => {
  const fullRingStylesBySeat: Record<number, ReturnType<typeof css>> = {
    1: css`
      top: 0;
    `,
    2: css`
      top: 10%;
      right: -5%;
      ${(p) => p.theme.media.tablet`
            top: 5%;
            right: 10%;
        `}
    `,
    3: css`
      top: 40%;
      transform: translateY(-50%);
      right: -5%;
    `,
    4: css`
      bottom: 20%;
      transform: translateY(-50%);
      right: -5%;
      ${(p) => p.theme.media.tablet`
            bottom: 10%;
            right: 0%;
        `}
    `,
    5: css`
      bottom: 0;
      transform: translateY(-50%);
      right: 5%;
      ${(p) => p.theme.media.tablet`
            bottom: -5%;
            right: 30%;
        `}
    `,
    6: css`
      bottom: 0;
      transform: translateY(-50%);
      left: 5%;
      ${(p) => p.theme.media.tablet`
            left: 25%;
            transform: none;
            bottom: 5%;
        `}
    `,
    7: css`
      bottom: 20%;
      transform: translateY(-50%);
      left: -5%;
      ${(p) => p.theme.media.tablet`
            bottom: 10%;
            left: 0;
        `}
    `,
    8: css`
      top: 40%;
      transform: translateY(-50%);
      left: -5%;
      ${(p) => p.theme.media.tablet`
            bottom: 50%;
            transform: translateY(-50%);
            left: -5%;
        `}
    `,
    9: css`
      top: 10%;
      left: -5%;
      ${(p) => p.theme.media.tablet`
            top: 5%;
            left: 10%;
        `}
    `,
  };
  const sixMaxStylesBySeat: Record<number, ReturnType<typeof css>> = {
    1: css`
      top: 0;
    `,
    2: css`
      top: 30%;
      right: 10%;
      transform: translate(50%, -50%);
      ${(p) => p.theme.media.tablet`
                top: 25%;
            `}
    `,
    3: css`
      top: 60%;
      right: 10%;
      transform: translate(50%, 50%);
      ${(p) => p.theme.media.tablet`
                top: 60%;
            `}
    `,
    4: css`
      bottom: 5%;
    `,
    5: css`
      top: 60%;
      left: 10%;
      transform: translate(-50%, 50%);
      ${(p) => p.theme.media.tablet`
                top: 60%;
            `}
    `,
    6: css`
      top: 30%;
      left: 10%;
      transform: translate(-50%, -50%);
      ${(p) => p.theme.media.tablet`
                top: 25%;
            `}
    `,
  };
  return isFullRing ? fullRingStylesBySeat[seat] : sixMaxStylesBySeat[seat];
};

const betPositionBySeat = (seat: number, isFullRing: boolean) => {
  const fullRingStyles: Record<number, ReturnType<typeof css>> = {
    1: css`
      top: 120%;
      transform: translateX(50%);
    `,
    2: css`
      transform: translateY(50%);
      top: 100%;
      right: 120%;
      ${(p) => p.theme.media.tablet`
            top: 100%;
            left: 10%;
            right: 0;
        `}
    `,
    3: css`
      transform: translateY(50%);
      top: 50%;
      right: 120%;
      ${(p) => p.theme.media.tablet`
            top: 50%;
            right: 130%;
        `}
    `,
    4: css`
      transform: translateY(50%);
      top: 50%;
      right: 120%;
      ${(p) => p.theme.media.tablet`
            bottom: 70%;
            right: 130%;
            top: 0;
        `}
    `,
    5: css`
      transform: translateY(50%);
      bottom: 100%;
      right: 120%;
      ${(p) => p.theme.media.tablet`
            bottom: 120%;
            right: 50%;
        `}
    `,
    6: css`
      bottom: 120%;
      transform: translateX(50%);
      right: 0;
      ${(p) => p.theme.media.tablet`
            bottom: 120%;
        `}
    `,
    7: css`
      transform: translateY(50%);
      top: 50%;
      left: 120%;
      ${(p) => p.theme.media.tablet`
            left: 130%;
            top: 0;
        `}
    `,
    8: css`
      transform: translateY(50%);
      top: 50%;
      left: 120%;
      ${(p) => p.theme.media.tablet`
            left: 130%;
            top: 0;
        `}
    `,
    9: css`
      transform: translateY(50%);
      top: 100%;
      left: 100%;
      ${(p) => p.theme.media.tablet`
            top: 120%;
            left: 50%;
        `}
    `,
  };
  const sixMaxStyles: Record<number, ReturnType<typeof css>> = {
    1: css`
      top: 95%;
      right: 50%;
      transform: translate(50%, 50%);
      ${(p) => p.theme.media.tablet`
            top: 100%;
        `}
    `,
    2: css`
      top: 70%;
      right: 100%;
      transform: translate(-50%, -50%);
      ${(p) => p.theme.media.tablet`
            right: 100%;
        `}
    `,
    3: css`
      top: 70%;
      right: 100%;
      transform: translate(-50%, -50%);
      ${(p) => p.theme.media.tablet`
            right: 115%;
        `}
    `,
    4: css`
      right: 50%;
      bottom: 100%;
      transform: translate(50%, -50%);
    `,
    5: css`
      top: 70%;
      left: 100%;
      transform: translate(50%, -50%);
      ${(p) => p.theme.media.tablet`
            top: 30%;
            left: 100%;
        `}
    `,
    6: css`
      top: 70%;
      left: 100%;
      transform: translate(50%, -50%);
      ${(p) => p.theme.media.tablet`
            top: 60%;
            left: 100%;
        `}
    `,
  };

  return isFullRing ? fullRingStyles[seat] : sixMaxStyles[seat];
};

export const StyledPlayerContainer = styled.div<{
  $seat: number;
  $isFullRing: boolean;
  $folded?: boolean;
}>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 90px;
  ${(p) => p.$folded && 'opacity: 0.5;'}
  ${({ $seat, $isFullRing }) => positionBySeat($seat, $isFullRing)}

  ${(p) => p.theme.media.tablet`
    max-width: 110px;
    `}
`;

export const StyledPlayerInfoContainer = styled.div<{ $isHero: boolean }>`
  position: relative;
  width: fit-content;
  min-width: 80px;
  margin-top: ${(p) => (p.$isHero ? '-15%' : '-30%')};
  padding: 5px;
  z-index: ${(p) => p.theme.zIndex.low};
  background: ${(p) => p.theme.color.black};
  border: 2px solid ${(p) => p.theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 5px;

  ${(p) => p.theme.media.tablet`
    min-width: 90px;
    `}
`;

export const StyledPlayerBetConatiner = styled.div<{
  $seat: number;
  $isFullRing: boolean;
}>`
  position: absolute;
  ${({ $seat, $isFullRing }) => betPositionBySeat($seat, $isFullRing)}
`;

export const StyledDealerButton = styled.div`
  position: absolute;
  top: 140%;
  left: 20%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
`;

export const StyledVpipContainer = styled.div`
  position: absolute;
  left: -15%;
  top: -40%;
  border: 1px solid ${(p) => p.theme.color.white};
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background-color: black;
  ${(p) => p.theme.fontSizeGenerator('span', 'small')}
  display: flex;
  justify-content: center;
  align-items: center;
`;
