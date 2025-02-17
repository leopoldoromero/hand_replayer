'use client';
import { useReducer, useEffect } from "react";
import Block from "@/components/block/Block";
import PlayerComponent from "@/components/player/Player";
import TableComponent from "@/components/table/Table";
import { useHandContext } from "@/contexts/HandContext";
import ReplayerControls from "../replayer_controls/ReplayerControls";
import { gameReducer, initialState } from "./game_reducer";

const Replayer = () => {
    const REPRODUCTION_SPEED = 1000;
    const { currentHand, nextHand, prevHand } = useHandContext();
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
            {/* {state.playersActions.map((player) => (
                <PlayerComponent
                    key={player.name}
                    nick={player.showAction && player.action ? player.action : player.name}
                    stack={formatAmount(player.stack, currentHand.bb)}
                    currency={state?.showInBigBlinds ? 'BB' : currentHand?.currency}
                    cards={player.action === 'fold' ? ['X', 'X'] : setPlayerCards(player.name)} 
                    seat={currentHand.players.find((p) => p.name === player.name)?.seat || 1}
                    amount={player.amount ? formatAmount(player.amount, currentHand.bb) : null}
                    isHero={player.name === state.heroName}
                    totalSeats={state.playersActions?.length}
                    isButton={(currentHand.players.find((p) => p.name === player.name)?.seat || 1) === currentHand.buttonSeat}
                    folded={player.action === 'fold'}
                />
            ))} */}
            {state.playersActions.map((player) => {
            const isWinner = currentHand.winner?.name === player.name;
                return (
                        <PlayerComponent
                            key={player.name}
                            nick={player.showAction && player.action ? player.action : player.name}
                            stack={formatAmount(player.stack, currentHand.bb)}
                            currency={state?.showInBigBlinds ? 'BB' : currentHand?.currency}
                            cards={
                                state.actionIndex < currentHand.actions.length
                                ? player.action === 'fold' && player.name !== currentHand.hero.nick ? ['X', 'X'] : setPlayerCards(player.name)
                                : isWinner
                                ? currentHand!.winner!.cards?.length ? currentHand!.winner!.cards : ["X", "X"]
                                : ["", ""]
                            }
                            seat={currentHand.players.find((p) => p.name === player.name)?.seat || 1}
                            amount={
                            state.actionIndex < currentHand.actions.length
                            ? player.amount ? formatAmount(player.amount, currentHand.bb) : null
                            : isWinner
                            ? formatAmount(currentHand!.winner!.amount, currentHand.bb)
                            : null
                            }
                            isHero={player.name === state.heroName}
                            totalSeats={state.playersActions?.length}
                            isButton={(currentHand.players.find((p) => p.name === player.name)?.seat || 1) === currentHand.buttonSeat}
                            folded={player.action === 'fold'}
                        />
                );
            })}
            <TableComponent 
            pot={state.actionIndex < currentHand.actions.length ? formatAmount(state.pot, currentHand?.bb) : 0} 
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