import { PreflopStats } from "@/modules/hand/domain/player";
import Block from "../block/Block";
import CardComponent from "../card/Card";
import Text from "../text/Text";
import { StyledDealerButton, StyledPlayerBetConatiner, StyledPlayerContainer, StyledPlayerInfoContainer, StyledVpipContainer } from "./Player.styles";

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
    folded?: boolean;
    stats?: PreflopStats;
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
  isButton,
  folded,
  stats,
}) => (
      <StyledPlayerContainer 
      $seat={seat} 
      $isFullRing={totalSeats > SIX_MAX_TOTAL_SEATS}
      $folded={folded}
      >
        <Block display="flex" direction="column" justify="center" align="center">
          <Block display="flex">
            {
                cards?.map((card, i) => (
                    <CardComponent card={card} key={i} showSliced={!isHero}/>
                ))
            }
          </Block>
          <StyledPlayerInfoContainer $isHero={isHero}>
            {
              stats ? (
                <StyledVpipContainer>{Math.round(stats.vpip)}</StyledVpipContainer>
              ) : null
            }
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