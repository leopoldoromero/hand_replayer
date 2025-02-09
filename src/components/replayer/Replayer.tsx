'use client';
import { useReducer, useEffect } from "react";
import Block from "@/components/block/Block";
import PlayerComponent from "@/components/player/Player";
import TableComponent from "@/components/table/Table";
import { useHandContext } from "@/contexts/HandContext";
import { Action } from "@/modules/hand/domain/action";
import { StyledButton } from "./Replayer.styles";
import Icon from "../icon/Icon";
import { Hand } from "@/modules/hand/domain/hand";

interface GameState {
    pot: number;
    isPlaying: boolean;
    showInBigBlinds: boolean;
    board: Array<string>;
    playersActions: Array<{
        name: string;
        stack: number;
        action: string | null;
        amount: number | null;
        showAction: boolean;
    }>;
    actionIndex: number;
    heroCards: Array<string>;
    heroName: string;
}

type ChangeStateAction =
    | { type: "LOAD_STATE", hand: Hand }
    | { type: "PLAY" }
    | { type: "PAUSE" }
    | { type: "NEXT_ACTION"; action: Action }
    | { type: "HIDE_ACTION"}
    | { type: "PREV_ACTION"; prevState: GameState }
    | { type: "TOGGLE_BIG_BLINDS" }
    | { type: "NEXT_HAND" };

const gameReducer = (state: GameState, action: ChangeStateAction): GameState => {
    switch (action.type) {
        case "LOAD_STATE":
            const { hand } = action;
            return { ...state, playersActions: hand?.players?.map((player) => ({
                name: player.name,
                stack: player.stack,
                action: null,
                amount: null,
                showAction: false,
            })),
        heroCards: hand?.hero?.cards,
        heroName: hand?.hero?.nick 
    };
        case "PLAY":
            return { ...state, isPlaying: true };
        case "PAUSE":
            return { ...state, isPlaying: false };
        case "NEXT_ACTION":
            const { action: currentAction } = action;
            const isNewRound = state.playersActions.length > 0 &&
        state.playersActions.some(player => player.action !== null) &&
        (state.actionIndex === 0 || state.board.length !== (currentAction.cards?.length || state.board.length));
            return {
                ...state,
                actionIndex: state.actionIndex + 1,
                playersActions: state.playersActions.map((player) =>
                    player.name === currentAction.player
                        ? {
                            ...player,
                            stack: currentAction.amount ? player.stack - currentAction.amount : player.stack,
                            action: currentAction.action,
                            amount: currentAction.amount 
                                ? (player.amount || 0) + currentAction.amount 
                                : null,
                            showAction: true,
                        }
                        : {
                            ...player,
                            showAction: false,
                            amount: isNewRound ? null : player.amount, 
                        }
                ),
                pot: currentAction.amount ? state.pot + currentAction.amount : state.pot,
                board: currentAction.cards?.length ? currentAction.cards : state.board,
            };
        case "PREV_ACTION":
            return action.prevState;
        case "HIDE_ACTION":
            console.log('HIDDING')
            return {
                ...state,
                playersActions: state.playersActions.map((player) => ({
                    ...player,
                    showAction: false, 
                })),
            };
        case "TOGGLE_BIG_BLINDS":
            return { ...state, showInBigBlinds: !state.showInBigBlinds };
        case "NEXT_HAND":
            return {
                pot: 0,
                isPlaying: false,
                showInBigBlinds: false,
                board: [],
                playersActions: [],
                actionIndex: 0,
                heroCards: [],
                heroName: '',
            }
        default:
            return state;
    }
};

export default function GameTable() {
    const { currentHand, nextHand } = useHandContext();
    const initialState: GameState = {
        pot: 0,
        isPlaying: false,
        showInBigBlinds: false,
        board: [],
        playersActions: currentHand?.players.map((p) => ({
            name: p.name,
            stack: p.stack,
            action: null,
            amount: null,
            showAction: false,
        })) || [],
        actionIndex: 0,
        heroCards: currentHand?.hero?.cards ?? [],
        heroName: currentHand?.hero?.nick ?? '',
    };

    const [state, dispatch] = useReducer(gameReducer, initialState);
    
    const formatAmount = (amount: number, bb: number) => {
        const amountToShow = state?.showInBigBlinds ? amount / bb : amount;
        return Number(amountToShow.toFixed(2))
    }

    const handleNextHand = () => {
        dispatch({ type: "NEXT_HAND"});
        nextHand()
    }

    useEffect(() => {
        if (currentHand && !state.playersActions?.length) {
            dispatch({ type: "LOAD_STATE", hand: currentHand })
        }
    }, [currentHand, state.playersActions?.length])

    useEffect(() => {
        console.log('HANDLING', currentHand)
        if (!state.isPlaying || !currentHand) return;

        if (state.actionIndex >= currentHand.actions.length) {
            dispatch({ type: "PAUSE" });
            return;
        }

        const timer = setTimeout(() => {
            dispatch({ type: "NEXT_ACTION", action: currentHand.actions[state.actionIndex] });
        }, 2000);

        return () => clearTimeout(timer);
    }, [state.isPlaying, state.actionIndex, currentHand]);

    useEffect(() => {
        if (!currentHand || state.actionIndex === 0) return;

        const timer = setTimeout(() => {
            dispatch({ type: "HIDE_ACTION" });
        }, 1000);

        return () => clearTimeout(timer);
    }, [state.actionIndex, currentHand]);

    if (!currentHand) return <p>Loading...</p>;

    return (
        <Block display="flex" justify="center" align="center" height="100%">
            {state.playersActions.map((player) => (
                <PlayerComponent
                    key={player.name}
                    nick={player.showAction && player.action ? player.action : player.name}
                    stack={formatAmount(player.stack, currentHand.bb)}
                    currency={state?.showInBigBlinds ? 'BB' : currentHand?.currency}
                    cards={player.name === state.heroName ? state.heroCards : ["", ""]} 
                    seat={currentHand.players.find((p) => p.name === player.name)?.seat || 1}
                    amount={player.amount ? formatAmount(player.amount, currentHand.bb) : null}
                    isHero={player.name === state.heroName}
                />
            ))}

            <TableComponent 
            pot={formatAmount(state.pot, currentHand?.bb)} 
            currency={state?.showInBigBlinds ? 'BB' : currentHand?.currency}
            cards={state.board} 
            room={currentHand.room} 
            />

            <Block display="flex" justify="center" mt="m" customStyles={{ position: 'fixed', bottom: '5%'}}>
                <StyledButton
                    onClick={() =>
                        dispatch({
                            type: "PREV_ACTION",
                            prevState: initialState, 
                        })
                    }
                    disabled={state.actionIndex === 0}
                >
                    <Icon icon="backward" size="s" color="white"/>
                </StyledButton>
                <StyledButton onClick={() => dispatch({ type: state.isPlaying ? "PAUSE" : "PLAY" })}>
                    <Icon icon={state.isPlaying ? 'play' : 'pause'} size="s" color="white"/>
                </StyledButton>
                <StyledButton
                    onClick={() => dispatch({ type: "NEXT_ACTION", action: currentHand.actions[state.actionIndex] })}
                    disabled={state.actionIndex >= currentHand.actions.length}
                >
                    <Icon icon="forward" size="s" color="white"/>
                </StyledButton>
                <StyledButton onClick={() => dispatch({ type: "TOGGLE_BIG_BLINDS" })}>
                    {state.showInBigBlinds ? "Show €" : "Show BB"}
                </StyledButton>
                <StyledButton onClick={() => handleNextHand()}>
                    <Icon icon="next" size="s" color="white"/>
                </StyledButton>
            </Block>
        </Block>
    );
}
