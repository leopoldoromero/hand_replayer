import Block from "../block/Block";
import CardComponent from "../card/Card";
import Text from "../text/Text";
import { StyledPlayerBetConatiner, StyledPlayerContainer, StyledPlayerInfoContainer } from "./Player.styles";

interface PlayerProps {
    nick: string;
    stack: number;
    currency: string;
    cards: Array<string>;
    seat: number;
    amount: number | null;
    isHero: boolean;
}

const PlayerComponent: React.FC<PlayerProps> = ({nick, stack, currency, cards, seat, amount, isHero}) => (
      <StyledPlayerContainer $seat={seat}>
        <Block display="flex" direction="column" justify="center" align="center">
          <Block display="flex">
            {
                cards?.map((card, i) => (
                    <CardComponent card={card} key={i} showSliced={!isHero}/>
                ))
            }
          </Block>
          <StyledPlayerInfoContainer $isHero={isHero}>
            <Text fontSize="tiny">{nick}</Text>
            <Text fontSize="tiny" weight="bold">{`${stack.toFixed(2)} ${currency}`}</Text>
          </StyledPlayerInfoContainer>
        </Block>
        <StyledPlayerBetConatiner $seat={seat}>
          {
            amount && (
              <Text fontSize="small">{amount}{currency}</Text>
            )
          }
        </StyledPlayerBetConatiner>
      </StyledPlayerContainer>
)

export default PlayerComponent;