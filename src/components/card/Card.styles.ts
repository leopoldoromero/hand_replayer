'use client'
import styled from "styled-components";

export const StyledCard = styled.div<{$bgColor: string, $showSliced?: boolean}>`
    width: 35px;
    height: 50px;
    position: relative;
    background: ${(p) => p.theme.color[p.$bgColor]};
    position: relative;
    font-family: 'Arial', sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5%;
    ${(p) => p.$showSliced && 'clip-path: inset(0 0 45% 0);'}
`

export const StyledTopContainer = styled.div<{$isSuit?: boolean}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
    font-weight: 600;
    text-align: center;
    font-size: 0.8rem;
    height: 30%;
`;

export const StyledBottomContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: -10px;
    font-weight: 600;
    text-align: center;
    font-size: 2.5rem;
    height: 70%;
`;

export const StyledCardText = styled.span<{$isSuit?: boolean}>`
    display: block;
    font-size: inherit;
    text-transform: uppercase;
     ${(p) => p.$isSuit && `
        line-height: 0.2;
        font-size: 1rem;
    `}
`;
