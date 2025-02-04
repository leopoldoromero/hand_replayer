import { StyledBottomContainer, StyledCard, StyledCardText, StyledTopContainer } from "./Card.styles";

interface CardProps {
    card: string;
}

type Suits = {[key in string]: string}

const CardComponent: React.FC<CardProps> = ({ card }) => {
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
        <StyledCard $bgColor={bgColorBySuit[suit]}>
            <StyledTopContainer>
                <StyledCardText >{value}</StyledCardText>
                <StyledCardText $isSuit>{suitsSimbols[suit]}</StyledCardText>
            </StyledTopContainer>
            <StyledBottomContainer>
                <StyledCardText>{value}</StyledCardText>
            </StyledBottomContainer>
        </StyledCard>
    )
}

export default CardComponent;