'use client'
import styled from "styled-components";

const positionBySeat = (seat: number) => {
    const stylesBySeat: Record<number, string> = {
        1: "top: 5%; left: 40%;",
        2: "top: 30%; right: 18%; transform: translate(50%, -50%);",
        3: "bottom: 50%; right: 18%; transform: translate(50%, 50%);",
        4: "bottom: 18%; left: 50%; transform: translate(-50%, 50%);",
        5: "bottom: 50%; left: 18%; transform: translate(-50%, 50%);",
        6: "top: 30%; left: 18%; transform: translate(-50%, -50%);",
    };
    return stylesBySeat[seat] || ""; 
};

const betPositionBySeat = (seat: number) => {
    const betCoonatinerStyles: Record<number, string> = {
        1: "top: 100%;",
        2: "top: 40%; right: 115%;",
        3: "right: 115%;",
        4: "bottom: 110%;",
        5: "left: 115%;",
        6: "top: 40%; left: 115%",
    }

    return betCoonatinerStyles[seat] || ""; 
};

export const StyledPlayerContainer = styled.div<{$seat: number}>`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 90px;
    ${({ $seat }) => positionBySeat($seat)}
`;

export const StyledPlayerInfoContainer = styled.div<{$isHero: boolean}>`
    position: relative;
    width: 100%;
    margin-top: ${(p) => (p.$isHero ? '-15%' : '-40%')};
    padding: 5px;
    z-index: ${(p) => (p.theme.zIndex.low)};
    background: ${(p) => (p.theme.color.black)};
    border: 2px solid ${(p) => (p.theme.color.white)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const StyledPlayerBetConatiner = styled.div<{$seat: number}>`
    position: absolute;
    ${({ $seat }) => betPositionBySeat($seat)}
`;