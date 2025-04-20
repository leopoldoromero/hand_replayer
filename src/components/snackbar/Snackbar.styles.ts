'use client';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SnackbarWrapper = styled.div<{ $open: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 300px;
  padding: 12px 16px;
  background-color: #333;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.$open ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  animation: ${fadeIn} 0.3s ease;
  z-index: 9999;
`;

export const Alert = styled.div<{ $success: boolean }>`
  background-color: ${(props) => (props.$success ? '#4caf50' : '#f44336')};
  color: white;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 16px;
`;
