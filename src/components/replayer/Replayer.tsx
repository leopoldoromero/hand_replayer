'use client';
import { useEffect, useRef, useCallback, useState } from 'react';
import Block from '@/components/block/Block';
import PlayerComponent from '@/components/player/Player';
import TableComponent from '@/components/table/Table';
import ReplayerControls from '../replayer_controls/ReplayerControls';
import { useRouter } from 'next/navigation';
import HandInfoComponent from '../hand_info/HandInfo';
import { StyledGameContainer } from './Replayer.styles';
import { PreflopStats } from '@/modules/hand/domain/player';
import StatsModal from '../stats_modal/StatsModal';
import RangeSelectorModal from '../range_selector_modal/RangeSelectorModal';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultState, DispatchAction } from '@/lib/redux/store';
import { GameStateHandler } from './game_state';
import { selectReplayerState } from '@/lib/redux/replayer/replayer.selector';
import { ReplayerState, setGameState, setHighlightedPlayer, toggleBigBlinds, togglePlaying } from '@/lib/redux/replayer/replayer.slice';
import { fetchHand } from '@/lib/redux/hand/hand.thunk';
import { selectHandsState } from '@/lib/redux/hand/hand.selector';
import { HandsState } from '@/lib/redux/hand/hand.slice';

interface Props {
  handId: string;
}

const Replayer: React.FC<Props> = ({ handId }) => {
  const [statsModalState, setStatsModalState] = useState<{ stats?: PreflopStats; playerName: string; isOpen: boolean }>({ playerName: '', isOpen: false });
  const [rangeSelectorModalData, setRangeSelectorModalData] = useState<{ isOpen: boolean, playerName: string }>({ isOpen: false, playerName: '' });
  const {
    currentHand,
    prevHandId,
    nextHandId,
    loading,
  } = useSelector<
    DefaultState,
    HandsState
  >(selectHandsState)
  const { 
    gameState, 
    isPlaying, 
    highlightedPlayer, 
    showInBigBlinds, 
    playersRanges,
    reproductionSpeed,
   } = useSelector<
    DefaultState,
    ReplayerState
  >(selectReplayerState);
  const router = useRouter();
  const dispatch = useDispatch<DispatchAction>();
  const gameStateHandlerRef = useRef<GameStateHandler | null>(null);

  const formatAmount = (amount: number, bb: number) => {
    const amountToShow = showInBigBlinds ? amount / bb : amount;
    return Number(amountToShow.toFixed(2));
  };

  const onPrevHandHandler = () => {
    if (prevHandId && gameStateHandlerRef.current) {
      dispatch(setGameState(gameStateHandlerRef.current?.reset()));
      router.push(`/hands/${prevHandId}`, { scroll: true });
    }
  };

  const onNextHandHandler = () => {
    if (nextHandId  && gameStateHandlerRef.current) {
      dispatch(setGameState(gameStateHandlerRef.current?.reset()));
      router.push(`/hands/${nextHandId}`, { scroll: true });
    }
  };

  const statsModalHandler = (playerName?: string, stats?: PreflopStats) => {
     setStatsModalState({
      playerName: playerName ?? '',
      stats,
      isOpen: !statsModalState.isOpen,
     })
  };

  const toggleRangeSelectorModal = (playerName?: string) => {
    console.log('Range player name:', playerName, rangeSelectorModalData?.isOpen)
    setRangeSelectorModalData({ isOpen: true, playerName: playerName ?? '' });
  }

  const onNextActionHandler = useCallback(() => {
    if (!currentHand || !gameStateHandlerRef.current) return;
  
    const action = currentHand.actions[gameStateHandlerRef.current.actionIndex];
    dispatch(setHighlightedPlayer(action.player));
  
    dispatch(setGameState(gameStateHandlerRef.current?.execute()));
  
    setTimeout(() => {
      dispatch(setHighlightedPlayer(null));
    }, reproductionSpeed / 2);
  }, [currentHand, dispatch, reproductionSpeed]);

  const onPrevActionHandler = () => {
    if (!gameStateHandlerRef.current) return;
    dispatch(setGameState(gameStateHandlerRef.current?.undo()));
  }
  useEffect(() => {
    dispatch(fetchHand(handId));
  }, [handId, dispatch]);

useEffect(() => {
  if (currentHand) {
    gameStateHandlerRef.current = new GameStateHandler(currentHand);
    dispatch(setGameState(gameStateHandlerRef.current.getState()));
  }
}, [currentHand, dispatch]);


  useEffect(() => {
    if (!isPlaying || !currentHand) return;
  
    if ((gameStateHandlerRef.current?.actionIndex || 0 )>= currentHand.actions.length) {
      dispatch(togglePlaying());
      return;
    }
  
    const timer = setTimeout(() => {
      onNextActionHandler();
    }, reproductionSpeed);
  
    return () => {
      clearTimeout(timer);
    };
  }, [isPlaying, gameStateHandlerRef.current?.actionIndex, currentHand, onNextActionHandler, dispatch, reproductionSpeed]);

  if (loading) return <p>Loading....</p>;

  if (!currentHand || !gameState || !gameStateHandlerRef.current) return null;

  const togglePlayback = () => {
    if (!isPlaying) {
      if (gameStateHandlerRef.current && gameStateHandlerRef.current!.actionIndex >= currentHand.actions.length) {
        dispatch(setGameState(gameStateHandlerRef.current.reset()));
      }
    }
    dispatch(togglePlaying());
  };

  const selectedRange: Array<string> = playersRanges[rangeSelectorModalData.playerName] ?? []
  return (
    <Block
      display='flex'
      justify='center'
      align='center'
      width='100%'
      height='100%'
      position='relative'
    >
      <HandInfoComponent hand={currentHand} />
      <StatsModal 
      statsModalData={statsModalState}
      statsModalHandler={statsModalHandler}
      toggleRangeSelectorModal={toggleRangeSelectorModal}
      />
      <RangeSelectorModal
        isOpen={rangeSelectorModalData.isOpen}
        playerName={rangeSelectorModalData.playerName}
        initialRange={selectedRange}
        onClose={() => toggleRangeSelectorModal()}
      />
      <StyledGameContainer>
        {gameState?.players.map((player) => {
          return (
            <PlayerComponent
            key={player.name}
            player={player}
            currentHand={currentHand}
            gameState={gameState}
            showInBigBlinds={showInBigBlinds}
            highlightedPlayer={highlightedPlayer}
            onClick={() => statsModalHandler(player?.name, player?.stats)}
            isLastAction={gameStateHandlerRef?.current!.isLastAction()}
            />
          );
        })}
        <TableComponent
          pot={formatAmount(gameState.pot, currentHand?.bb)}
          currency={showInBigBlinds ? 'BB' : currentHand?.currency}
          cards={gameState.board}
          room={currentHand.room}
        />
        <ReplayerControls
          onPrevActionHandler={() => onPrevActionHandler()}
          onNextActionHandler={() => onNextActionHandler()}
          actionIndex={gameStateHandlerRef.current!.actionIndex}
          lastActionIndex={currentHand?.actions?.length}
          showInBigBlinds={showInBigBlinds}
          currency={currentHand?.currency}
          isPlaying={isPlaying}
          onNextHandHandler={() => onNextHandHandler()}
          onPrevHandHandler={() => onPrevHandHandler()}
          onShowInBbHandler={() =>dispatch(toggleBigBlinds())}
          onReplayHandler={() => togglePlayback()}
        />
      </StyledGameContainer>
    </Block>
  );
};

export default Replayer;
