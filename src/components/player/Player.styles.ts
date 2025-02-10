'use client'
import styled from "styled-components";

const positionBySeat = (seat: number) => {
    const stylesBySeat: Record<number, string> = {
        1: "top: 10%; right: 15%;",
        2: "top: 35%; right: 5%; transform: translate(50%, -50%);",
        3: "top: 40%; right: 5%; transform: translate(50%, 50%);",
        4: "bottom: 30%; right: -20%; transform: translate(-50%, 50%);",
        5: "bottom: 12%; left: 40%;",
        6: "bottom: 20%; left: 5%; transform: translate(-50%, -50%);",
        7: "top: 40%; right: 95%; transform: translate(50%, 50%);",
        8: "top: 35%; right: 95%; transform: translate(50%, -50%);",
        9: "top: 15%; left: 0;",
    };
    return stylesBySeat[seat] || ""; 
};

const betPositionBySeat = (seat: number) => {
    const betContinerStyles: Record<number, string> = {
        1: "top: 130%; right: 50%; transform: translate(50%, -50%);",
        2: "top: 70%; right: 100%; transform: translate(-50%, -50%);",
        3: "top: 70%; right: 100%; transform: translate(-50%, -50%);",
        4: "top: 70%; right: 115%; transform: translate(-50%, -50%);",
        5: "left: 50%; bottom: 110%; transform: translate(-50%, -50%);",
        6: "top: 70%; left: 100%; transform: translate(50%, -50%);",
        7: "top: 70%; left: 100%; transform: translate(50%, -50%);",
        8: "top: 70%; left: 100%; transform: translate(50%, -50%);",
        9: "top: 130%; left: 70%; transform: translate(50%, -50%);",
    }

    return betContinerStyles[seat] || ""; 
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
    width: fit-content;
    min-width: 80px;
    margin-top: ${(p) => (p.$isHero ? '-15%' : '-30%')};
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