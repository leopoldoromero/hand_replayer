'use client'
import styled from "styled-components";

export const StyledCard = styled.div<{$bgColor: string}>`
    width: 45px;
    height: 65px;
    position: relative;
    background: ${(p) => p.theme.color[p.$bgColor]};
    box-sizing: border-box;
    position: relative;
    font-family: 'Arial', sans-serif;
`

export const StyledTopContainer = styled.div`
    position: absolute;
    font-weight: 600;
    text-align: center;
    top: -2px;
    left: 0;
    font-size: 15px;
`;

export const StyledBottomContainer = styled.div`
    position: absolute;
    font-weight: 600;
    text-align: center;
    bottom: -15px;
    right: 2px;
    font-size: 50px;
`;

export const StyledCardText = styled.span<{$isSuit?: boolean}>`
    display: block;
    font-size: inherit;
    text-transform: uppercase;
    ${(p) => p.$isSuit && `line-height: 0.5;`}
`;
/*
    width: 50px;
    height: 80px;
    background:  ${(p) => p.theme.color[p.$bgColor]};
    border: 2px solid black;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Arial', sans-serif;

*/