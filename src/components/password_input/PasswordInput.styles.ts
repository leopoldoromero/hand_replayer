import styled from 'styled-components';
import { inputPaddingsBySize } from '../Input/Input.styles';
import { Size } from '@/theme/sizes';

export const Wrapper = styled.div<{ size?: Size }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.23);
  background-color: ${(p) => p.theme.color.white};
  border-style: solid;
  border-width: 1px;
  padding: ${(p) => (p.size ? inputPaddingsBySize[p.size] : inputPaddingsBySize['s'])};
`;

export const ModalContent = styled.div`
  border: 0.5px solid rgb(204, 204, 204);
  background-color: rgb(255, 254, 254);
  border-radius: 5px;
`;
