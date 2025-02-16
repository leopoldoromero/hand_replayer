'use client'
import styled from "styled-components";

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

export const StyledButton = styled.button`
    text-align: center;
    font-weight: ${(p) => p.theme.weight.medium};
    font-family: ${(p) => p.theme.fontFamily.base};
    padding: 0.375rem 1rem;
    margin-top: 1rem;
    line-height: 1.75;
    letter-spacing: 0.08857em;
    width: fit-content;
    min-width: 64px;
    width: 40%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(p) => p.theme.color.green};
    border: 0;
    color: ${(p) => p.theme.color.white};
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 10%),
            0px 1px 10px 0px rgb(0 0 0 / 10%);
    &:disabled {
        opacity: 0.5;
    }
    opacity:  1;
`;