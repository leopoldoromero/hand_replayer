import Block from "../block/Block";
import Icon from "../icon/Icon";
import Text from "../text/Text";
import { StyledHeader } from "./HeaderStyles";

const HeaderComponent = () => (
    <StyledHeader>
        <Block 
        display="flex" 
        justify="space-between" 
        pt="m" 
        pr="s" 
        pb="m" 
        pl="s"
        width="100%"
        >
            <Text isUppercase>Replayer</Text>
            <Icon 
            icon="next" 
            size="xs" 
            color="white"
            customStyles={{transform: 'rotate(90deg)'}}
            />
        </Block>
    </StyledHeader>
)

export default HeaderComponent;