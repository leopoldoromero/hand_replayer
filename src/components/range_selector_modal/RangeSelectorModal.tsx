import Block from "../block/Block";
import Modal from "../modal/Modal";
import Backdrop from "../backdrop/Backdrop";
import PokerRangeGrid from "../poker_range_grid/PokerRangeGrid";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const RangeSelectorModal: React.FC<Props> = ({ isOpen, onClose }) => (
    <>
        <Backdrop isVisible={isOpen} hasButton onClose={onClose}/>
        <Modal isOpen={isOpen} onClose={onClose}>
            <Block display="flex" direction="column" customStyles={{ minWidth: '140px'}}>
                <PokerRangeGrid />
            </Block>
        </Modal>
    </>
)

export default RangeSelectorModal;