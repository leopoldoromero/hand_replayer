'use client'
import styled from "styled-components";
import Link from "next/link";

export const StyledHeader = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(to bottom, #484e55 0%, #313539 100%);
`

export const StyledTextLink = styled(Link)`
    text-decoration: none;
    color: ${(p) => p.theme.color.white};
`;