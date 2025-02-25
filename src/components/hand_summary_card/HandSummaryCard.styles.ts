'use client';
import Link from 'next/link';
import styled from 'styled-components';

export const StyledHandSummaryContainer = styled(Link)`
  border: 1px solid;
  border-radius: 5%;
  width: 145px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  text-decoration: none;
  color: ${(p) => p.theme.color.white};
`;
