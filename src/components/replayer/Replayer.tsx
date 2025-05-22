'use client';
import { useEffect, useRef, useCallback } from 'react';
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
import { ReplayerState, setGameState, setHighlightedPlayer, toggleBigBlinds, togglePlaying, toggleRangeSelectorModal, toggleStatsModal } from '@/lib/redux/replayer/replayer.slice';
import { fetchHand } from '@/lib/redux/replayer/replayer.thunk';

interface Props {
  handId: string;
}

const Replayer: React.FC<Props> = ({ handId }) => {
  const REPRODUCTION_SPEED = 1000;
  const { 
    currentHand,
    prevHandId,
    nextHandId,
    isLoading,
    gameState, 
    isPlaying, 
    highlightedPlayer, 
    showInBigBlinds, 
    isRangeSelectorOpen
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
    console.log('Executing NEXT', nextHandId)
    if (nextHandId  && gameStateHandlerRef.current) {
      dispatch(setGameState(gameStateHandlerRef.current?.reset()));
      router.push(`/hands/${nextHandId}`, { scroll: true });
    }
  };

  const statsModalHandler = (playerName: string, stats?: PreflopStats) => {
      const isHero = playerName === gameState?.heroName;
      return isHero ? dispatch(toggleStatsModal({
        stats,
        playerName,
      })) : null;
  };

  const onNextActionHandler = useCallback(() => {
    if (!currentHand || !gameStateHandlerRef.current) return;
  
    const action = currentHand.actions[gameStateHandlerRef.current.actionIndex];
    dispatch(setHighlightedPlayer(action.player));
  
    dispatch(setGameState(gameStateHandlerRef.current?.execute()));
  
    setTimeout(() => {
      dispatch(setHighlightedPlayer(null));
    }, REPRODUCTION_SPEED / 2);
  }, [currentHand, dispatch]);

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

  // const fetchHand = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getHandAction(handId);
  //     const hand = response?.hand as Hand;
  //     gameStateHandlerRef.current = new GameStateHandler(hand);
  //     setCurrentHand(hand);
  //     setPrevHandId(response?.prevHandId ?? '');
  //     setNextHandId(response?.nextHandId ?? '');
  //     dispatch(setGameState(gameStateHandlerRef.current?.getState()));
  //   } catch (err: unknown) {
  //     console.error('ERROR', err);
  //     dispatch(snackbarActions.error((err as Error)?.message));
  //     setTimeout(() => {
  //       router.push(`/`, { scroll: true });
  //     }, 2000);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [handId, dispatch, router]);
  

  // useEffect(() => {
  //   fetchHand();
  // }, [fetchHand]);

  useEffect(() => {
    if (!isPlaying || !currentHand) return;
  
    if ((gameStateHandlerRef.current?.actionIndex || 0 )>= currentHand.actions.length) {
      dispatch(togglePlaying());
      return;
    }
  
    const timer = setTimeout(() => {
      onNextActionHandler();
    }, REPRODUCTION_SPEED);
  
    return () => {
      clearTimeout(timer);
    };
  }, [isPlaying, gameStateHandlerRef.current?.actionIndex, currentHand, onNextActionHandler, dispatch]);

  if (isLoading) return <p>Loading....</p>;

  if (!currentHand || !gameState || !gameStateHandlerRef.current) return null;

  const togglePlayback = () => {
    if (!isPlaying) {
      if (gameStateHandlerRef.current && gameStateHandlerRef.current!.actionIndex >= currentHand.actions.length) {
        dispatch(setGameState(gameStateHandlerRef.current.reset()));
      }
    }
    dispatch(togglePlaying());
  };


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
      <StatsModal/>
      <RangeSelectorModal
        isOpen={isRangeSelectorOpen}
        onClose={() => dispatch(toggleRangeSelectorModal())}
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
