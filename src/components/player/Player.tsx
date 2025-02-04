import Block from "../block/Block";
import CardComponent from "../card/Card";
import Text from "../text/Text";
import { StyledPlayerContainer, StyledPlayerInfoContainer } from "./Player.styles";

interface PlayerProps {
    nick: string;
    stack: number;
    currency: string;
    cards: Array<string>,
    seat: number;
}

const PlayerComponent: React.FC<PlayerProps> = ({nick, stack, currency, cards, seat}) => (
    <StyledPlayerContainer $seat={seat}>
      <Block display="flex" gap="5px">
        {
            cards?.map((card, i) => (
                <CardComponent card={card} key={i}/>
            ))
        }
      </Block>
      <StyledPlayerInfoContainer>
        <Text fontSize="tiny">{nick}</Text>
        <Text fontSize="tiny" weight="bold">{`${stack.toFixed(2)} ${currency}`}</Text>
      </StyledPlayerInfoContainer>
    </StyledPlayerContainer>
)

export default PlayerComponent;