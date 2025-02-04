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

export const StyledPlayerContainer = styled.div<{$seat: number}>`
    position: absolute;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${({ $seat }) => positionBySeat($seat)}
`;

export const StyledPlayerInfoContainer = styled.div`
    position: relative;
    width: 100%;
    margin-top: -30%;
    padding: 5px;
    z-index: 3;
    background: ${(p) => (p.theme.color.black)};
    border: 2px solid white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;
`;

/*
.seat1 { top: 18%; left: 50%; transform: translate(-50%, -50%); }
    .seat2 { top: 30%; right: 5%; transform: translate(50%, -50%); }
    .seat3 { bottom: 30%; right: 5%; transform: translate(50%, 50%); }
    .seat4 { bottom: 20%; left: 50%; transform: translate(-50%, 50%); }
    .seat5 { bottom: 30%; left: 5%; transform: translate(-50%, 50%); }
    .seat6 { top: 30%; left: 5%; transform: translate(-50%, -50%); }
*/