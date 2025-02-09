import { StyledCard, StyledPlayingCardContainer, StyledPlayingCardContent, StyledPlayingCardSuit, StyledPlayingCardText } from "./Card.styles";

interface CardProps {
    card: string;
}

type Suits = {[key in string]: string}

const CardNewComponent: React.FC<CardProps> = ({ card }) => {
    if (card == '') {
        return (
            <StyledCard $bgColor='grey'></StyledCard>
        )
    }
    const cardElements: Array<string> = card.split('')
    const suit: string = cardElements?.pop() ?? 'c'
    const value: string = cardElements.join('')
    const suitsSimbols: Suits = {
        c: "♣", 
        d: "♦", 
        s: "♠",
        h: "♥" 
    };
    const bgColorBySuit: Suits = {
        c: "green", 
        d: "blue", 
        s: "black",
        h: "red" 
    }
    return (
        <StyledPlayingCardContainer >
            <StyledPlayingCardContent $bgColor={bgColorBySuit[suit]}>
                <StyledPlayingCardText >{value}</StyledPlayingCardText>
                <StyledPlayingCardSuit></StyledPlayingCardSuit>
                <StyledPlayingCardText>{value}</StyledPlayingCardText>
            </StyledPlayingCardContent>
        </StyledPlayingCardContainer>
    )
}

export default CardNewComponent;