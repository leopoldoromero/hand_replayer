import { positionNumberToName } from "@/modules/hand/domain/hand";
import Block from "../block/Block"
import CardComponent from "../card/Card";
import Text from "../text/Text"
import { StyledHandSummaryContainer } from "./HandSummaryCard.styles";

interface Props {
    handId: string;
    cards: Array<string>;
    heroPosition: number;
    potType: string;
    lastPhaseHeroFolded: string;
    gameType?: string;
    onClickHandler: () => void;
}

const HandSummaryCard: React.FC<Props> = ({
    handId,
    cards, 
    heroPosition, 
    potType, 
    lastPhaseHeroFolded, 
    gameType = '6-max', 
    onClickHandler 
    }) => {
    const isSixMax = gameType === '6-max'
    const position = positionNumberToName(heroPosition, isSixMax);

    return (
        <StyledHandSummaryContainer href={`/hands/${handId}`} onClick={onClickHandler}>
             {
                cards?.length  ? (
                    <Block display="flex" justify="center">
                    {
                        cards.map((card, i) => (
                            <CardComponent card={card} key={i} bigSize/>
                        ))
                    }
                    </Block>
                ) : (
                    null
                )
            }
            <Block display="flex" direction="column" justify="space-between" pt="s" pb="s">
                <Block display="flex" align="center"  mb="s">
                    <Text isUppercase fontSize="small" mr="s">Position:</Text>
                    <Text fontSize="tiny">{position}</Text>
                </Block>
                <Block display="flex" align="center" mb="s">
                    <Text isUppercase fontSize="small"  mr="s">PotType:</Text>
                    <Text fontSize="tiny">{potType?.replaceAll('_', ' ')}</Text>
                </Block>
                <Block display="flex" align="center" mb="s">
                    <Text isUppercase fontSize="small" mr="s">Hero Folded in:</Text>
                    <Text fontSize="tiny">{lastPhaseHeroFolded?.replaceAll('_', ' ')}</Text>
                </Block>
            </Block>
        </StyledHandSummaryContainer>
    )
}

export default HandSummaryCard;