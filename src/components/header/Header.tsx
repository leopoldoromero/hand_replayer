import Block from "../block/Block";
// import Icon from "../icon/Icon";
import Text from "../text/Text";
import { StyledHeader, StyledTextLink } from "./HeaderStyles";

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
            <StyledTextLink href={`/`}>
                <Text isUppercase >Replayer</Text>
            </StyledTextLink>
            {/* <Icon 
            icon="next" 
            size="xs" 
            color="white"
            customStyles={{transform: 'rotate(90deg)'}}
            /> */}
        </Block>
    </StyledHeader>
)

export default HeaderComponent;