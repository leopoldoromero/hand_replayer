'use client';
import styled from 'styled-components';

export const StyledGameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  min-width: 300px;
  width: 80%;
  max-width: 400px;
  max-height: 570px;

  ${(p) => p.theme.media.tablet`
        width: 80%;
        max-height: 385px;
        max-width: 700px;
    `}

  ${(p) => p.theme.media.desktop`
        width: 80%;
        max-height: 385px;
        max-width: 700px;
    `}
`;

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border: none;
  background: transparent;
  box-shadow: 0 0 0.5px rgba(255, 255, 255, 0.9),
    0 0 6px rgba(255, 255, 255, 0.2);
  color: ${(p) => p.theme.color.white};
`;
