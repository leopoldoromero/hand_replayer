'use client';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: ${(p) => p.theme.zIndex.max};
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 100vw;
  max-height: 100vh;
  overflow: auto;
`;

export const ModalContent = styled.div`
  border: 2px solid ${(p) => p.theme.color.white};
  background: ${(p) => p.theme.color.black};
  color: ${(p) => p.theme.color.white};
  z-index: ${(p) => p.theme.zIndex.max};
`;
