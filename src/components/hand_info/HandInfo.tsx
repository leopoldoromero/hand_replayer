'use client';
import Block from "../block/Block";
import Text from "../text/Text";
import { Hand } from "@/modules/hand/domain/hand";
import { StyledHandInfoContainer } from "./HandInfo.styles";

interface Props {
    hand: Hand;
}

const HandInfoComponent: React.FC<Props> = ({ hand }) => {
    if (!hand) return null;
    return (
        <StyledHandInfoContainer>
            <Block display="flex" align="center" mb="xs">
                {/* <Text mr="xs">Limits:</Text> */}
                <Text fontSize="small">{hand?.currency}{hand?.sb}/{hand?.currency}{hand?.bb}</Text>
            </Block>
            <Block display="flex" align="center" mb="xs">
                <Text fontSize="small" mr="xs">{hand?.tableName}</Text>
                <Text fontSize="small">{hand?.tableType}</Text>
            </Block>
            <Block display="flex" align="center" mb="xs">
                <Text fontSize="small" mr="xs">{hand?.game}</Text>
            </Block>
        </StyledHandInfoContainer>
    )
}

export default HandInfoComponent;