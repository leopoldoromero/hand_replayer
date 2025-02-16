'use client';
import { useReducer, useEffect } from "react";
import Block from "@/components/block/Block";
import PlayerComponent from "@/components/player/Player";
import TableComponent from "@/components/table/Table";
import { useHandContext } from "@/contexts/HandContext";
import { Action } from "@/modules/hand/domain/action";
import { Hand } from "@/modules/hand/domain/hand";
import ReplayerControls from "../replayer_controls/ReplayerControls";

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
    showKnownCards: boolean;
}

type ChangeStateAction =
    | { type: "LOAD_STATE", hand: Hand }
    | { type: "PLAY" }
    | { type: "PAUSE" }
    | { type: "NEXT_ACTION"; action: Action; lastActionIdx: number }
    | { type: "HIDE_ACTION"}
    | { type: "PREV_ACTION"; currentHand: Hand}
    | { type: "TOGGLE_BIG_BLINDS" }
    | { type: "NEXT_HAND" }
    | { type: "PREV_HAND" };

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
            const { action: currentAction, lastActionIdx } = action;
            const isShowdown = state.actionIndex  >= lastActionIdx - 1;
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
                                : player.amount, // TODO: This was changed from null, pending to test
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
                showKnownCards: isShowdown,
            };
        case "PREV_ACTION": 
            if (state.actionIndex === 0) return state;
            const { currentHand } = action;
            const prevAction = currentHand.actions[state.actionIndex - 1];
            return {
                ...state,
                actionIndex: state.actionIndex - 1,
                playersActions: state.playersActions.map((player) =>
                    player.name === prevAction.player
                        ? {
                            ...player,
                            stack: prevAction.amount ? player.stack + prevAction.amount : player.stack, // Undo stack deduction
                            action: null, 
                            amount: null,
                            showAction: false,
                        }
                        : player
                ),
                pot: prevAction.amount ? state.pot - prevAction.amount : state.pot,
                board: prevAction.cards, 
            };
        case "HIDE_ACTION":
            return {
                ...state,
                playersActions: state.playersActions.map((player) => ({
                    ...player,
                    showAction: false, 
                })),
            };
        case "TOGGLE_BIG_BLINDS":
            return { ...state, showInBigBlinds: !state.showInBigBlinds };
        case "PREV_HAND":
            return {
                pot: 0,
                isPlaying: false,
                showInBigBlinds: false,
                board: [],
                playersActions: [],
                actionIndex: 0,
                heroCards: [],
                heroName: '',
                showKnownCards: false
            
            }
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
                showKnownCards: false
            }
        default:
            return state;
    }
};

const Replayer = () => {
    const REPRODUCTION_SPEED = 1000;
    const { currentHand, nextHand, prevHand } = useHandContext();
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
        showKnownCards: false,
    };

    const [state, dispatch] = useReducer(gameReducer, initialState);
    
    const formatAmount = (amount: number, bb: number) => {
        const amountToShow = state?.showInBigBlinds ? amount / bb : amount;
        return Number(amountToShow.toFixed(2))
    }

    const handlePrevHand = () => {
        dispatch({ type: "PREV_HAND"});
        prevHand()
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
        if (state.isPlaying && (state.actionIndex >= currentHand!.actions.length)) {
            dispatch({ type: "PAUSE" });
            return;
        }
    
        const nextActionTimer = setTimeout(() => {
            setTimeout(() => {
                dispatch({ type: "HIDE_ACTION" });
            }, REPRODUCTION_SPEED / 2);
            
            if (!state.isPlaying || !currentHand) return
            
            dispatch({ 
                type: "NEXT_ACTION", 
                action: currentHand.actions[state.actionIndex], 
                lastActionIdx: currentHand.actions.length 
            });
        }, REPRODUCTION_SPEED);
    
        return () => clearTimeout(nextActionTimer);
    }, [state.isPlaying, state.actionIndex, currentHand]);

    // useEffect(() => {
    //     if (!state.isPlaying || !currentHand) return;

    //     if (state.actionIndex >= currentHand.actions.length) {
    //         dispatch({ type: "PAUSE" });
    //         return;
    //     }

    //     const timer = setTimeout(() => {
    //         dispatch({ type: "NEXT_ACTION", action: currentHand.actions[state.actionIndex], lastActionIdx: currentHand.actions.length });
    //     }, 2000);

    //     return () => clearTimeout(timer);
    // }, [state.isPlaying, state.actionIndex, currentHand]);

    // useEffect(() => {
    //     if (state.actionIndex === 0) return;

    //     const timer = setTimeout(() => {
    //         dispatch({ type: "HIDE_ACTION" });
    //     }, 1000);

    //     return () => clearTimeout(timer);
    // }, [state.actionIndex]);

    if (!currentHand) return <p>Loading...</p>;

    function setPlayerCards(playerName: string): Array<string> {
        if (playerName === state.heroName) return state.heroCards;
        if (state?.showKnownCards && currentHand?.winner && (playerName === currentHand?.winner.name)) {
            return currentHand?.winner?.cards?.length ? currentHand?.winner?.cards : ["", ""];
        }
        if (state?.showKnownCards && currentHand?.looser && (playerName === currentHand?.looser.name)) {
            return currentHand?.looser?.cards?.length ? currentHand?.looser?.cards : ["", ""];
        }
        return ["", ""]
    }

    return (
        <Block display="flex" justify="center" align="center" height="100%" position="relative" customStyles={{ maxWidth: '400px', maxHeight: '700px'}}>
            {state.playersActions.map((player) => (
                <PlayerComponent
                    key={player.name}
                    nick={player.showAction && player.action ? player.action : player.name}
                    stack={formatAmount(player.stack, currentHand.bb)}
                    currency={state?.showInBigBlinds ? 'BB' : currentHand?.currency}
                    cards={setPlayerCards(player.name)} 
                    seat={currentHand.players.find((p) => p.name === player.name)?.seat || 1}
                    amount={player.amount ? formatAmount(player.amount, currentHand.bb) : null}
                    isHero={player.name === state.heroName}
                    totalSeats={state.playersActions?.length}
                    isButton={(currentHand.players.find((p) => p.name === player.name)?.seat || 1) === currentHand.buttonSeat}
                />
            ))}
            <TableComponent 
            pot={formatAmount(state.pot, currentHand?.bb)} 
            currency={state?.showInBigBlinds ? 'BB' : currentHand?.currency}
            cards={state.board} 
            room={currentHand.room} 
            />
            <ReplayerControls
            onPrevActionHandler={() => dispatch({
                type: "PREV_ACTION",
                currentHand,
            })} 
            onNextActionHandler={() => dispatch({ type: "NEXT_ACTION", action: currentHand.actions[state.actionIndex], lastActionIdx: currentHand.actions.length })} 
            actionIndex={state.actionIndex} 
            lastActionIndex={currentHand?.actions?.length} 
            showInBigBlinds={state.showInBigBlinds}
            currency={currentHand?.currency}
            isPlaying={state.isPlaying}
            onNextHandHandler={() => handleNextHand()}
            onPrevHandHandler={() => handlePrevHand()}
            onShowInBbHandler={() => dispatch({ type: "TOGGLE_BIG_BLINDS" })}
            onReplayHandler={() => dispatch({ type: state.isPlaying ? "PAUSE" : "PLAY" })}
            />
        </Block>
    );
}

export default Replayer;