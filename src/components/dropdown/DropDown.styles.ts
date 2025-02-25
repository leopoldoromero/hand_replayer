'use client';
import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  width: fit-content;
`;

export const DropdownButton = styled.button`
  width: 100%;
  min-width: 90px;
  padding: 10px;
  border: 1px solid ${(p) => p.theme.color.white};
  background: linear-gradient(to bottom, black, #000040);
  border-radius: 5%;
  color: ${(p) => p.theme.color.white};
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  ${(p) => p.theme.fontSizeGenerator('span', 'small')};
`;

export const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  z-index: ${(p) => p.theme.zIndex.mid};
  border: 1px solid ${(p) => p.theme.color.white};
  background: linear-gradient(to bottom, black, #000040);
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  ${(p) => p.theme.fontSizeGenerator('span', 'small')};
`;

export const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  color: ${(p) => p.theme.color.white};
  display: flex;
  ${(p) => p.theme.fontSizeGenerator('span', 'small')};
  &:hover {
    background: #f0f0f0;
  }
`;
