'use client';
import Block from '../block/Block';
import Modal from '../modal/Modal';
import Backdrop from '../backdrop/Backdrop';
import PokerRangeGrid from '../poker_range_grid/PokerRangeGrid';
import { useDispatch } from 'react-redux';
import { DispatchAction } from '@/lib/redux/store';
import { setRange } from '@/lib/redux/replayer/replayer.slice';
import Button from '../button/Button';
import { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  playerName: string;
  initialRange?: Array<string>;
  onClose: () => void;
}

const RangeSelectorModal: React.FC<Props> = ({ 
  isOpen,
  playerName,
  initialRange = [], 
  onClose 
}) => {
  const [selectedRangeHands, setSelectedRangeHands] = useState<Array<string>>(initialRange);
  const dispatch = useDispatch<DispatchAction>();

  useEffect(() => {
    setSelectedRangeHands(initialRange);
  }, [initialRange, playerName]);

  if (!playerName) return null;

  return (
  <>
    <Backdrop isVisible={isOpen} hasButton onClose={onClose} />
    <Modal isOpen={isOpen} onClose={onClose}>
      <Block
        display='flex'
        direction='column'
        customStyles={{ minWidth: '140px' }}
      >
        <PokerRangeGrid 
        selectedHands={selectedRangeHands}
        onSelectedHandsChange={(hands) => setSelectedRangeHands(hands)}
        />
        <Block display='flex' width='100%' justify='space-evenly' pb='s'>
          <Button
            type='button'
            variant='default'
            size='s'
            text='Save range'
            color='green'
            onClick={() => {
              dispatch(setRange({name: playerName, hands: selectedRangeHands}));
              onClose();
            }}
          />
          <Button
            type='button'
            variant='default'
            size='s'
            text='Delete range'
            color='green'
            onClick={() => {
              setSelectedRangeHands([])
              dispatch(setRange({name: playerName, hands: []}))
            }}
          />
        </Block>
      </Block>
    </Modal>
  </>
);
}

export default RangeSelectorModal;
