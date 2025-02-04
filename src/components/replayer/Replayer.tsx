'use client';
import { useReducer, useEffect } from "react";
import Block from "@/components/block/Block";
import PlayerComponent from "@/components/player/Player";
import TableComponent from "@/components/table/Table";
import { useHandContext } from "@/contexts/HandContext";
import { Action } from "@/modules/hand/domain/action";
import { Player } from "@/modules/hand/domain/player";
import { StyledButton } from "./Replayer.styles";
import Icon from "../icon/Icon";

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
    }>;
    actionIndex: number;
}

type ChangeStateAction =
    | { type: "LOAD_STATE", players: Array<Player> }
    | { type: "PLAY" }
    | { type: "PAUSE" }
    | { type: "NEXT_ACTION"; action: Action }
    | { type: "PREV_ACTION"; prevState: GameState }
    | { type: "TOGGLE_BIG_BLINDS" }
    | { type: "NEXT_HAND" };

const gameReducer = (state: GameState, action: ChangeStateAction): GameState => {
    switch (action.type) {
        case "LOAD_STATE":
            const { players } = action;
            return { ...state, playersActions: players?.map((player) => ({
                name: player.name,
                stack: player.stack,
                action: null,
                amount: null,
            })) };
        case "PLAY":
            return { ...state, isPlaying: true };
        case "PAUSE":
            return { ...state, isPlaying: false };
        case "NEXT_ACTION":
            const { action: currentAction } = action;
            return {
                ...state,
                actionIndex: state.actionIndex + 1,
                playersActions: state.playersActions.map((player) =>
                    player.name === currentAction.player
                        ? {
                              ...player,
                              stack: currentAction.amount
                                  ? player.stack - currentAction.amount
                                  : player.stack,
                              action: currentAction.action,
                              amount: currentAction.amount ?? null,
                          }
                        : player
                ),
                pot: currentAction.amount ? state.pot + currentAction.amount : state.pot,
                board: currentAction.cards?.length ? currentAction.cards : state.board,
            };
        case "PREV_ACTION":
            return action.prevState;
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
        })) || [],
        actionIndex: 0,
    };

    const [state, dispatch] = useReducer(gameReducer, initialState);
    
    const formatAmount = (amount: number, bb: number) => {
        return state?.showInBigBlinds ? amount / bb : amount;
    }

    const handleNextHand = () => {
        dispatch({ type: "NEXT_HAND"});
        nextHand()
    }

    useEffect(() => {
        if (currentHand && !state.playersActions?.length) {
            dispatch({ type: "LOAD_STATE", players: currentHand.players })
        }
    }, [currentHand])

    useEffect(() => {
        console.log('HANDLING', state.isPlaying)
        if (!state.isPlaying || !currentHand) return;

        if (state.actionIndex >= currentHand.actions.length) {
            dispatch({ type: "PAUSE" });
            return;
        }

        const timer = setTimeout(() => {
            dispatch({ type: "NEXT_ACTION", action: currentHand.actions[state.actionIndex] });
        }, 2000);

        return () => clearTimeout(timer);
    }, [state.isPlaying, state.actionIndex]);

    if (!currentHand) return <p>Loading...</p>;

    return (
        <Block display="flex" justify="center" align="center" height="100%">
            {state.playersActions.map((player) => (
                <PlayerComponent
                    key={player.name}
                    nick={player.name}
                    stack={formatAmount(player.stack, currentHand.bb)}
                    currency={state?.showInBigBlinds ? 'BB' : currentHand?.currency}
                    cards={["", ""]} 
                    seat={currentHand.players.find((p) => p.name === player.name)?.seat || 1}
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
