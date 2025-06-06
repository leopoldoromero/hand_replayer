import Backdrop from '../backdrop/Backdrop';
import { ModalContent, ModalWrapper } from './Modal.styles';

export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Props extends ModalBaseProps {
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => (
  <>
    {isOpen && (
      <ModalWrapper>
        <Backdrop isVisible={isOpen} hasButton onClose={onClose} />
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    )}
  </>
);

export default Modal;
