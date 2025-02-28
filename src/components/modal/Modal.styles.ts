'use client'
import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${(p) => p.theme.zIndex.max};
    min-width: 90px;
`;

export const ModalContent = styled.div`
    border: 2px solid ${(p) => p.theme.color.white};
    // box-shadow: 0px 2px 12px 1px #c7c7c7;
    background: ${(p) => p.theme.color.black};
    color: ${(p) => p.theme.color.white};
`;