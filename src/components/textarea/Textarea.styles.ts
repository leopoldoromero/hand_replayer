'use client';
import styled from 'styled-components';

export const StyledTextarea = styled.textarea`
  padding: 12px;
  ${(p) => p.theme.fontSizeGenerator('input', 'small')};
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  // resize: vertical;
  // transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 8px rgba(0, 112, 243, 0.3);
  }
`;
