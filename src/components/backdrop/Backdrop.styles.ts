'use client';
import styled from 'styled-components';

export const Wrapper = styled.div<{ $isVisible: boolean }>`
  inset: 0;
  // position: fixed;
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: end;
  background: rgba(0, 0, 0, 0.6);
  // z-index: ${(p) => p.theme.zIndex.high};
  opacity: ${(p) => (p.$isVisible ? '1' : '0')};
  visibility: ${(p) => (p.$isVisible ? 'visible' : 'hidden')};
  transition: z-index 0.1s linear, opacity 0.3s ease;
`;
