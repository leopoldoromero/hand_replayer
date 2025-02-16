import Block from "../block/Block";
import CardComponent from "../card/Card";
import Text from "../text/Text";
import { StyledDealerButton, StyledPlayerBetConatiner, StyledPlayerContainer, StyledPlayerInfoContainer } from "./Player.styles";

interface PlayerProps {
    nick: string;
    stack: number;
    currency: string;
    cards: Array<string>;
    seat: number;
    amount: number | null;
    isHero: boolean;
    totalSeats: number;
    isButton: boolean;
}

const SIX_MAX_TOTAL_SEATS = 6;
const PlayerComponent: React.FC<PlayerProps> = ({
  nick, 
  stack, 
  currency, 
  cards, 
  seat,
  amount, 
  isHero, 
  totalSeats,
  isButton
}) => (
      <StyledPlayerContainer $seat={seat} $isFullRing={totalSeats > SIX_MAX_TOTAL_SEATS}>
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
        {
          isButton ? (
            <StyledDealerButton>D</StyledDealerButton>
          ) : null
        }
        <StyledPlayerBetConatiner $seat={seat} $isFullRing={totalSeats > SIX_MAX_TOTAL_SEATS}>
          {
            amount && (
              <Text fontSize="small">{amount}{currency}</Text>
            )
          }
        </StyledPlayerBetConatiner>
      </StyledPlayerContainer>
)

export default PlayerComponent;