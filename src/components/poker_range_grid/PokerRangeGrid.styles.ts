'use client';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  padding: 0.5rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(13, 30px);
`;

export const Cell = styled.div<{ $selected: boolean }>`
  width: 25px;
  height: 25px;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  font-size: 0.8rem;
  cursor: pointer;
  background-color: ${({ $selected }) => ($selected ? '#4CAF50' : '#f8f8f8')};
  color: ${({ $selected }) => ($selected ? 'white' : 'black')};
  font-weight: ${({ $selected }) => ($selected ? 'bold' : 'normal')};

  &:hover {
    background-color: ${({ $selected }) => ($selected ? '#45a049' : '#ddd')};
  }
`;

export const SelectedRange = styled.div`
  margin-top: 15px;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 375px;
  display: block;
`;
