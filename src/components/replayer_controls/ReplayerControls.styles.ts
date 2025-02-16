'use client'
import styled from "styled-components";

export const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border: none;
    background: transparent;
    box-shadow: 0 0 0.5px rgba(255, 255, 255, 0.9), 0 0 6px rgba(255, 255, 255, 0.2);
    color: ${(p) => p.theme.color.white};
`;
