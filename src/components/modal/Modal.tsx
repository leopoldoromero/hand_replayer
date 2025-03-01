import { ModalContent, ModalWrapper } from './Modal.styles';

export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Props extends ModalBaseProps {
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ isOpen, children }) => (
  <>
    {isOpen && (
      <ModalWrapper>
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    )}
  </>
);

export default Modal;
