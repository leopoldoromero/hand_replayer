'use client';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50%, 100%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

export const SnackbarWrapper = styled.div<{ $open: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 300px;
  color: ${(props) => props.theme.color.white};
  border-radius: 8px;
  opacity: ${(props) => (props.$open ? 1 : 0)};
  display: ${(props) => (!props.$open && 'none')};
  transition: opacity 0.3s ease-in-out;
  animation: ${fadeIn} 0.3s ease;
  z-index: ${(props) => props.theme.zIndex.high};
`;

export const Alert = styled.div<{ $success: boolean }>`
  background-color: ${(props) => (props.$success ? props.theme.color.green : props.theme.color.red)};
  color: ${(props) => props.theme.color.white};
  padding: 1rem;
  border-radius: 4px;
  font-size: ${(props) => props.theme.fontSize.small};
`;
