'use client';
import Block from '../block/Block';
import Modal from '../modal/Modal';
import Backdrop from '../backdrop/Backdrop';
import { PreflopStats } from '@/modules/hand/domain/player';
import { useSelector } from 'react-redux';
import { DefaultState } from '@/lib/redux/store';
import { ReplayerState } from '@/lib/redux/replayer/replayer.slice';
import { selectReplayerState } from '@/lib/redux/replayer/replayer.selector';
import StatsSection from './StatsSection';
import HeroSection from './HeroSection';
import { useState } from 'react';

interface Props {
  statsModalData: {playerName: string; isOpen: boolean; stats?: PreflopStats};
  statsModalHandler(playerName?: string, stats?: PreflopStats) : void;
  toggleRangeSelectorModal(playerName?: string): void;
}

const StatsModal: React.FC<Props> = ({statsModalData, statsModalHandler, toggleRangeSelectorModal}) => {  
  const { 
    gameState, 
    playersRanges
  } = useSelector<
  DefaultState,
  ReplayerState
  >(selectReplayerState);
  const selectedVillainNameOrNull = Object.keys(playersRanges).filter((key) => key !== gameState?.heroName)[0]
  const initialSelectedVillain = selectedVillainNameOrNull ?? '';
  const [selectedVillian, setSelectedVillain] = useState<string>(initialSelectedVillain ?? '');
  
  return (
  <>
    <Backdrop isVisible={statsModalData?.isOpen} hasButton onClose={() => statsModalHandler()} />
    <Modal isOpen={statsModalData?.isOpen} onClose={() => statsModalHandler()}>
      <Block
        display='flex'
        direction='column'
        customStyles={{ minWidth: '200px', padding: '0.5rem' }}
      >
        <Block display='flex' justify='center'>
          <StatsSection statsModalData={statsModalData}/>
        </Block>
        {
          statsModalData?.playerName === gameState?.heroName && (
            <HeroSection 
            selectedVillian={selectedVillian}
            setSelectedVillain={setSelectedVillain}
            toggleRangeSelectorModal={toggleRangeSelectorModal}/>
          )
        }
      </Block>
    </Modal>
  </>
);
}

export default StatsModal;
