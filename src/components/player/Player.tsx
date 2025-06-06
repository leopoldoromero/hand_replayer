import Block from '../block/Block';
import CardComponent from '../card/Card';
import Text from '../text/Text';
import {
  StyledDealerButton,
  StyledPlayerBetConatiner,
  StyledPlayerContainer,
  StyledPlayerInfoContainer,
  StyledVpipContainer,
} from './Player.styles';
import { GameState, PlayerState } from '../replayer/game_state';
import { Hand } from '@/modules/hand/domain/hand';

interface PlayerProps {
  player: PlayerState;
  highlightedPlayer: string | null;
  currentHand: Hand;
  gameState: GameState;
  showInBigBlinds: boolean;
  isLastAction: boolean;
  onClick: () => void;
}

const SIX_MAX_TOTAL_SEATS = 6;
// TODO: adjust bet styles in desktop;
const PlayerComponent: React.FC<PlayerProps> = ({
  player,
  currentHand,
  gameState,
  showInBigBlinds,
  highlightedPlayer,
  onClick,
  isLastAction,
}) => {
  const playerName = player?.name;
  const playerStack = player.stack;

  const displayPlayerCards = (): Array<string> => {
    if (playerName === gameState?.heroName) return gameState.heroCards;
    if (
      gameState?.showKnownCards &&
      currentHand?.winner &&
      playerName === currentHand?.winner.name
    ) {
      return currentHand?.winner?.cards?.length
        ? currentHand?.winner?.cards
        : ['', ''];
    }
    if (
      gameState?.showKnownCards &&
      currentHand?.looser &&
      playerName === currentHand?.looser.name
    ) {
      return currentHand?.looser?.cards?.length
        ? currentHand?.looser?.cards
        : ['', ''];
    }
    return ['', ''];
  }

  const formatAmount = (amount: number, bb: number): number => {
    const amountToShow = showInBigBlinds ? amount / bb : amount;
    return Number(amountToShow.toFixed(2));
  };

  const displayPlayerAmount = (): number | null => {
    const isWinner = currentHand.winner?.name === playerName;

    if (isLastAction) {
      return isWinner ? formatAmount(currentHand!.winner!.amount, currentHand.bb) : null;
    }
    return player.amount ? formatAmount(player.amount, currentHand.bb) : null
  }
  const isHero = playerName === gameState.heroName;
  const seat = currentHand.players.find((p) => p.name === playerName)?.seat || 1;
  const isButton = seat === currentHand.buttonSeat;
  const stack = formatAmount(playerStack, currentHand.bb)
  const currency = showInBigBlinds ? 'BB' : currentHand.currency;
  const nick = playerName === highlightedPlayer && player.action ? player.action : playerName
  const stats = player.stats;
  const cards = displayPlayerCards();
  const amount = displayPlayerAmount();
  const totalSeats = gameState.players?.length;
  const folded = player.action === 'fold';
  const isFullRing = totalSeats > SIX_MAX_TOTAL_SEATS;

  return (
    <StyledPlayerContainer
      $seat={seat}
      $isFullRing={isFullRing}
      $folded={folded}
      onClick={onClick}
    >
      <Block display='flex' direction='column' justify='center' align='center'>
        <Block display='flex'>
          {cards?.map((card, i) => (
            <CardComponent card={card} key={i} showSliced={!isHero} />
          ))}
        </Block>
        <StyledPlayerInfoContainer $isHero={isHero}>
          {stats ? (
            <StyledVpipContainer>{Math.round(stats.vpip)}</StyledVpipContainer>
          ) : null}
          <Text fontSize='tiny'>{nick}</Text>
          <Text fontSize='tiny' weight='bold'>{`${stack.toFixed(
            2
          )} ${currency}`}</Text>
        </StyledPlayerInfoContainer>
      </Block>
      {isButton ? <StyledDealerButton>D</StyledDealerButton> : null}
      <StyledPlayerBetConatiner
        $seat={seat}
        $isFullRing={isFullRing}
      >
        {amount && (
          <Text fontSize='small'>
            {amount}
            {currency}
          </Text>
        )}
      </StyledPlayerBetConatiner>
    </StyledPlayerContainer>
  );
};

export default PlayerComponent;
