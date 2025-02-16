import Block from "../block/Block";
import Icon from "../icon/Icon";
import { StyledButton } from "./ReplayerControls.styles";

interface Props {
    onPrevActionHandler:  () => void;
    onNextActionHandler:  () => void;
    isPlaying: boolean;
    actionIndex: number;
    lastActionIndex: number;
    showInBigBlinds: boolean;
    currency: string;
    onNextHandHandler:  () => void;
    onPrevHandHandler:  () => void;
    onShowInBbHandler: () => void;
    onReplayHandler: () => void;
}

const ReplayerControls: React.FC<Props> = ({ 
    onPrevActionHandler, 
    onNextActionHandler, 
    actionIndex, 
    lastActionIndex, 
    showInBigBlinds,
    currency,
    isPlaying,
    onNextHandHandler,
    onPrevHandHandler,
    onShowInBbHandler,
    onReplayHandler
 }) => (
    <Block display="flex" justify="center" mt="m" customStyles={{ position: 'fixed', bottom: '2%'}}>
        <StyledButton onClick={() => onPrevHandHandler()}>
            <Icon icon="prev" size="xs" color="white"/>
        </StyledButton>
        <StyledButton
            onClick={() => onPrevActionHandler()}
            disabled={actionIndex <= 0}
        >
            <Icon icon="backward" size="xs" color="white"/>
        </StyledButton>
        <StyledButton onClick={() => onReplayHandler()}>
            <Icon icon={isPlaying ? 'play' : 'pause'} size="xs" color="white"/>
        </StyledButton>
        <StyledButton
            onClick={() => onNextActionHandler()}
            disabled={actionIndex >= lastActionIndex}
        >
            <Icon icon="forward" size="xs" color="white"/>
        </StyledButton>
        <StyledButton onClick={() => onShowInBbHandler()}>
            {showInBigBlinds ? `Show in ${currency}` : "Show in BB"}
        </StyledButton>
        <StyledButton onClick={() => onNextHandHandler()}>
            <Icon icon="next" size="xs" color="white"/>
        </StyledButton>
    </Block>
)

export default ReplayerControls;