'use client'
import styled from "styled-components";

export const ToggleWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ToggleInput = styled.input`
  display: none;
`;

export const ToggleSlider = styled.div<{ $isChecked: boolean }>`
  width: 40px;
  height: 20px;
  background: ${({ $isChecked }) => ($isChecked ? "#4CAF50" : "#ccc")};
  border-radius: 20px;
  position: relative;
  transition: background 0.3s ease;
  
  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${({ $isChecked }) => ($isChecked ? "22px" : "2px")};
    transition: left 0.3s ease;
  }
`;