'use client';
import { useHandContext } from "@/contexts/HandContext";
import Block from "../block/Block";
import Text from "../text/Text";


const HandInfoComponent = () => {
    const { currentHand, hands, currentHandIdx } = useHandContext();
    if (!currentHand) return null;
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
                <Text mr="xs">HandID:</Text>
                <Text fontSize="small">{currentHand?.id}</Text>
            </Block>
            <Block display="flex" align="center">
                <Text mr="xs">Limits:</Text>
                <Text fontSize="small">{currentHand?.currency}{currentHand?.sb}/{currentHand?.currency}{currentHand?.bb}</Text>
            </Block>
            <Block display="flex" align="center">
                <Text mr="xs">Hand:</Text>
                <Text fontSize="small">{currentHandIdx + 1}/{hands?.length}</Text>
            </Block>
            <Block display="flex" align="center">
                <Text>{currentHand?.game}</Text>
            </Block>
        </Block>
    )
}

export default HandInfoComponent;