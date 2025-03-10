import {
  StyledBottomContainer,
  StyledCard,
  StyledCardText,
  StyledTopContainer,
} from './Card.styles';

interface CardProps {
  card: string;
  showSliced?: boolean;
  bigSize?: boolean;
  animated?: boolean;
}

type Suits = { [key in string]: string };

const CardComponent: React.FC<CardProps> = ({ card, showSliced, bigSize, animated }) => {
  if (card === '') {
    return (
      <StyledCard
        $bgColor="grey"
        $showSliced={showSliced}
        $bigSize={bigSize}
      ></StyledCard>
    );
  }

  if (card === 'X') {
    return (
      <StyledCard
        $bgColor="grey"
        $showSliced={showSliced}
        $bigSize={bigSize}
        $hidden
      ></StyledCard>
    );
  }

  const cardElements: Array<string> = card.split('');
  const suit: string = cardElements?.pop() ?? 'c';
  const value: string = cardElements.join('');
  const suitsSymbols: Suits = {
    c: '♣',
    d: '♦',
    s: '♠',
    h: '♥',
  };
  const bgColorBySuit: Suits = {
    c: 'green',
    d: 'blue',
    s: 'black',
    h: 'red',
  };

  return (
    <StyledCard
      $bgColor={bgColorBySuit[suit]}
      $showSliced={showSliced}
      $bigSize={bigSize}
      $animated={animated}
    >
      <StyledTopContainer $bigSize={bigSize}>
        <StyledCardText>{value}</StyledCardText>
        <StyledCardText $isSuit $bigSize={bigSize}>
          {suitsSymbols[suit]}
        </StyledCardText>
      </StyledTopContainer>
      <StyledBottomContainer $bigSize={bigSize}>
        <StyledCardText>{value}</StyledCardText>
      </StyledBottomContainer>
    </StyledCard>
  );
};

export default CardComponent;
