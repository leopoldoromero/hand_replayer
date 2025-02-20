'use client';
import Block from "../block/Block";
import Text from "../text/Text";
import { Hand } from "@/modules/hand/domain/hand";

interface Props {
    hand: Hand;
}

const HandInfoComponent: React.FC<Props> = ({ hand }) => {
    if (!hand) return null;
    return (
        <Block 
        display="flex" 
        direction="column" 
        align="flex-start" 
        position="absolute" 
        customStyles={{left: '0', top: '1rem'}}
        pl="s"
        >
            <Block display="flex" align="center">
                <Text mr="xs">Limits:</Text>
                <Text fontSize="small">{hand?.currency}{hand?.sb}/{hand?.currency}{hand?.bb}</Text>
            </Block>
            <Block display="flex" align="center">
                <Text mr="xs">{hand?.tableName}</Text>
                <Text fontSize="small">{hand?.tableType}</Text>
            </Block>
            <Block display="flex" align="center">
                <Text mr="xs">{hand?.game}</Text>
            </Block>
        </Block>
    )
}

export default HandInfoComponent;