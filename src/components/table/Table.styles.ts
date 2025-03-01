'use client';
import styled from 'styled-components';

export const StyledTable = styled.div`
  width: 290px;
  height: 470px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, #008000, #004d00);
  border: 20px solid #141414;
  border-radius: 27%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
  border-radius: 50% / 20%;

  ${(p) => p.theme.media.tablet`
        width: 580px;
        height: 285px;
        border-radius: 20% / 43%;
    `}

  ${(p) => p.theme.media.desktop`
        width: 580px;
        height: 285px;
        border-radius: 20% / 43%;
    `}
`;
