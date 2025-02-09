'use client'
import styled from "styled-components";

export const StyledCard = styled.div<{$bgColor: string, $showSliced?: boolean}>`
    width: 40px;
    height: 60px;
    position: relative;
    background: ${(p) => p.theme.color[p.$bgColor]};
    position: relative;
    font-family: 'Arial', sans-serif;
    border: 3px solid ${(p) => p.theme.color[p.$bgColor]};;
    border-radius: 5%;
    ${(p) => p.$showSliced && 'clip-path: inset(0 0 45% 0);'}
`

export const StyledTopContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
    font-weight: 600;
    text-align: center;
    font-size: 15px;
    height: 30%;
`;

export const StyledBottomContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: -15px;
    font-weight: 600;
    text-align: center;
    font-size: 3.4rem;
    height: 70%;
`;

export const StyledCardText = styled.span<{$isSuit?: boolean}>`
    display: block;
    font-size: inherit;
    text-transform: uppercase;
    ${(p) => p.$isSuit && `line-height: 0.2;`}
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

export const StyledPlayingCardContainer = styled.div``;

export const StyledPlayingCardContent = styled.div<{$bgColor: string}>`
    width: calc(100px * 0.8);
    height: calc(144px * 0.8);
    background: ${(p) => p.theme.color[p.$bgColor]};
    box-sizing: border-box;
    position: relative;
    font-family: 'Arial', sans-serif;
    background-image: url('/deck-sprite.png');
    background-position: 0px -144px;
`;

/*
miniatura rank:
width: 44px;
        height: 44px;
        top: 2px;
        left: -2px;

miniatura suit:
        width: 44px;
        height: 44px;
        top: 2px;
        left: -2px;

        NEW top:         top: 39px;
    }

    grande:
            NO background-position: var(--card-suit-background-position);
        transform: scale(1.3);
        will-change: transform;
        transform-origin: top left;
        left: auto;
        top: auto;
                right: 10px;
        bottom: 18px;


        NEW top asumo tras animacion
                right: 7px;
        bottom: 28px;
    }
*/

export const StyledPlayingCardText = styled.div<{$isSuit?: boolean}>``;

export const StyledPlayingCardSuit = styled.div`
 background-image: url('/deck-sprite.png');
 background-position: -300px -194px;
 width: 44px;
height: 44px;
`;