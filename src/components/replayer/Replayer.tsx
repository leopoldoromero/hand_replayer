'use client';
import { useReducer, useEffect, useState } from 'react';
import Block from '@/components/block/Block';
import PlayerComponent from '@/components/player/Player';
import TableComponent from '@/components/table/Table';
import ReplayerControls from '../replayer_controls/ReplayerControls';
import { gameReducer, initialState } from './game_reducer';
import { Hand } from '@/modules/hand/domain/hand';
import { getHandAction } from '@/actions/get_hand.action';
import { useRouter } from 'next/navigation';
import HandInfoComponent from '../hand_info/HandInfo';
import { StyledGameContainer } from './Replayer.styles';
import { PreflopStats } from '@/modules/hand/domain/player';
import StatsModal from '../stats_modal/StatsModal';
import RangeSelectorModal from '../range_selector_modal/RangeSelectorModal';
import { useDispatch } from 'react-redux';
import { DispatchAction } from '@/lib/redux/store';
import { snackbarActions } from '@/lib/redux/snackbar/snackbar.slice';

interface Props {
  handId: string;
}

const Replayer: React.FC<Props> = ({ handId }) => {
  const REPRODUCTION_SPEED = 1000;
  const [currentHand, setCurrentHand] = useState<Hand | null>(null);
  const [prevtHandId, setPrevHandId] = useState<string>('');
  const [nextHandId, setNextHandId] = useState<string>('');
  const [statsModalData, setStatsModalData] = useState<{
    isOpen: boolean;
    stats?: PreflopStats;
    playerName: string;
  }>({
    isOpen: false,
    stats: {
      vpip: 0,
      pfr: 0,
      threeBetPercent: 0,
      hands: 0,
    },
    playerName: '',
  });
  const [isOpenRangeSelectorModal, setIsOpenRangeSelectorModal] =
    useState<boolean>(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [state, gameReducerDispatch] = useReducer(gameReducer, initialState);
  const dispatch = useDispatch<DispatchAction>();

  const formatAmount = (amount: number, bb: number) => {
    const amountToShow = state?.showInBigBlinds ? amount / bb : amount;
    return Number(amountToShow.toFixed(2));
  };

  const handlePrevHand = () => {
    if (prevtHandId) {
      gameReducerDispatch({ type: 'PREV_HAND' });
      router.push(`/hands/${prevtHandId}`, { scroll: true });
    }
  };

  const handleNextHand = () => {
    if (nextHandId) {
      gameReducerDispatch({ type: 'NEXT_HAND' });
      router.push(`/hands/${nextHandId}`, { scroll: true });
    }
  };

  const statsModalHandler = (playerName: string, stats?: PreflopStats) => {
    setStatsModalData({
      stats,
      playerName,
      isOpen: !statsModalData?.isOpen,
    });
  };

  useEffect(() => {
    setLoading(true);
    getHandAction(handId)
      .then((response) => {
        const hand = response?.hand as Hand;
        setCurrentHand(hand);
        setPrevHandId(response?.prevHandId ?? '');
        setNextHandId(response?.nextHandId ?? '');
        gameReducerDispatch({ type: 'LOAD_STATE', hand });
      })
      .catch((err) => {
        console.log('ERROR', err)
        dispatch(snackbarActions.error(err?.message));

        setTimeout(() => {
          router.push(`/`, { scroll: true });
        }, 2000);
      })
      .finally(() => {
        setLoading(false);
        // setTimeout(() => {
        //   router.push(`/`, { scroll: true });
        // }, 2000);
      });
  }, [handId]);

  useEffect(() => {
    if (state.isPlaying && state.actionIndex >= currentHand!.actions.length) {
      gameReducerDispatch({ type: 'PAUSE' });
      return;
    }

    const nextActionTimer = setTimeout(() => {
      setTimeout(() => {
        gameReducerDispatch({ type: 'HIDE_ACTION' });
      }, REPRODUCTION_SPEED / 2);

      if (!state.isPlaying || !currentHand) return;

      gameReducerDispatch({
        type: 'NEXT_ACTION',
        action: currentHand.actions[state.actionIndex],
        lastActionIdx: currentHand.actions.length,
      });
    }, REPRODUCTION_SPEED);

    return () => clearTimeout(nextActionTimer);
  }, [state.isPlaying, state.actionIndex, currentHand]);

  if (loading) return <p>Loading....</p>;

  if (!currentHand) return null;

  function setPlayerCards(playerName: string): Array<string> {
    if (playerName === state.heroName) return state.heroCards;
    if (
      state?.showKnownCards &&
      currentHand?.winner &&
      playerName === currentHand?.winner.name
    ) {
      return currentHand?.winner?.cards?.length
        ? currentHand?.winner?.cards
        : ['', ''];
    }
    if (
      state?.showKnownCards &&
      currentHand?.looser &&
      playerName === currentHand?.looser.name
    ) {
      return currentHand?.looser?.cards?.length
        ? currentHand?.looser?.cards
        : ['', ''];
    }
    return ['', ''];
  }

  const onSelectRangeHandler = () => {
    setStatsModalData({
      ...statsModalData,
      isOpen: false,
    });
    setIsOpenRangeSelectorModal(!isOpenRangeSelectorModal);
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
      <StatsModal
        isOpen={statsModalData?.isOpen}
        stats={statsModalData?.stats}
        onClose={() =>
          setStatsModalData({
            ...statsModalData,
            isOpen: false,
          })
        }
        name={statsModalData?.playerName}
        onSelectRange={onSelectRangeHandler}
      />
      <RangeSelectorModal
        isOpen={isOpenRangeSelectorModal}
        onClose={() => onSelectRangeHandler()}
      />
      <StyledGameContainer>
        {state.playersActions.map((player, i) => {
          const isWinner = currentHand.winner?.name === player.name;
          return (
            <PlayerComponent
              key={i}
              nick={
                player.showAction && player.action ? player.action : player.name
              }
              stack={formatAmount(player.stack, currentHand.bb)}
              currency={state?.showInBigBlinds ? 'BB' : currentHand?.currency}
              cards={
                state.actionIndex < currentHand.actions.length
                  ? player.action === 'fold' &&
                    player.name !== currentHand.hero.nick
                    ? ['X', 'X']
                    : setPlayerCards(player.name)
                  : isWinner
                  ? currentHand!.winner!.cards?.length
                    ? currentHand!.winner!.cards
                    : ['', '']
                  : ['', '']
              }
              seat={
                currentHand.players.find((p) => p.name === player.name)?.seat ||
                1
              }
              amount={
                state.actionIndex < currentHand.actions.length
                  ? player.amount
                    ? formatAmount(player.amount, currentHand.bb)
                    : null
                  : isWinner
                  ? formatAmount(currentHand!.winner!.amount, currentHand.bb)
                  : null
              }
              isHero={player.name === state.heroName}
              totalSeats={state.playersActions?.length}
              isButton={
                (currentHand.players.find((p) => p.name === player.name)
                  ?.seat || 1) === currentHand.buttonSeat
              }
              folded={player.action === 'fold'}
              stats={player.stats}
              onClick={() => statsModalHandler(player?.name, player?.stats)}
            />
          );
        })}
        <TableComponent
          pot={
            state.actionIndex < currentHand.actions.length
              ? formatAmount(state.pot, currentHand?.bb)
              : 0
          }
          currency={state?.showInBigBlinds ? 'BB' : currentHand?.currency}
          cards={state.board}
          room={currentHand.room}
        />
        <ReplayerControls
          onPrevActionHandler={() =>
            gameReducerDispatch({
              type: 'PREV_ACTION',
              currentHand,
            })
          }
          onNextActionHandler={() =>
            gameReducerDispatch({
              type: 'NEXT_ACTION',
              action: currentHand.actions[state.actionIndex],
              lastActionIdx: currentHand.actions.length,
            })
          }
          actionIndex={state.actionIndex}
          lastActionIndex={currentHand?.actions?.length}
          showInBigBlinds={state.showInBigBlinds}
          currency={currentHand?.currency}
          isPlaying={state.isPlaying}
          onNextHandHandler={() => handleNextHand()}
          onPrevHandHandler={() => handlePrevHand()}
          onShowInBbHandler={() =>
            gameReducerDispatch({ type: 'TOGGLE_BIG_BLINDS' })
          }
          onReplayHandler={() => {
            if (state.actionIndex === currentHand.actions.length) {
              gameReducerDispatch({ type: 'LOAD_STATE', hand: currentHand });
            }
            gameReducerDispatch({ type: state.isPlaying ? 'PAUSE' : 'PLAY' });
          }}
        />
      </StyledGameContainer>
    </Block>
  );
};

export default Replayer;
