'use client'
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderWrapper = styled.div<{size?: string}>`
  display: inline-block;
  width: ${({ size }) => size || '48px'};
  height: ${({ size }) => size || '48px'};
`;

export const Spinner = styled.div<{ color1?: string; color2?: string}>`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: ${({ color1 }) => color1 || '#3498db'};
  border-right-color: ${({ color2 }) => color2 || '#f39c12'};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

