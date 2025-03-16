import {
  StyledBottomContainer,
  StyledCard,
  StyledCardImg,
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

// function cardNameToPngFileName(card: string): string {
//   const suits: {[key in string]: string} = {
//     c: 'club',
//     d: 'diamond',
//     h: 'heart',
//     s: 'spade'
//   }
//   const ranks: {[key in string]: string} = {
//     A: '1',
//     T: '10',
//     J: 'jack',
//     Q: 'queen',
//     K: 'king'
//   }
//   const suit = card[1]
//   const rank = card[0]
//   return `${suits[suit]}_${ranks[rank] ?? rank}.png`
// }
// TODO: regex to replace T by 10 -> .replace(/^T/, '10')
const CardComponent: React.FC<CardProps> = ({ card, showSliced, bigSize, animated }) => {
  if (card === '' || card === 'X') {
    return (
      <StyledCardImg 
        src={`/cards/back-black.png`} 
        alt='card-image'
        width={90} 
        height={90}
        $showSliced={showSliced}
        $bigSize={bigSize}
        $hidden={card === 'X'}
      />
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
    // <StyledCardImg 
    //     src={`/cards/${cardNameToPngFileName(card)}`} 
    //     alt='card-image'
    //     width={90} 
    //     height={90}
    //     $showSliced={showSliced}
    //     $bigSize={bigSize}
    //     $animated={animated}
    //   />
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
