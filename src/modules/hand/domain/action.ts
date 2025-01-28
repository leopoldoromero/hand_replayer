export enum ActionPhaseTypes {
    PRE_FLOP = 'PRE_FLOP',
    FLOP = 'FLOP',
    TURN = 'TURN',
    RIVER = 'RIVER',
    SHOW_DOWN = 'SHOW_DOWN'
}

export enum ActionTypes {
    SB = 'SB',
    BB = 'BB',
    CHECK = 'CHECK',
    CALL = 'CALL',
    FOLD = 'FOLD',
    RAISE = 'RAISE'
}

export interface Action {
    phase: ActionPhaseTypes,
    player: string,
    action: ActionTypes,
    amount: number,
    cards: Array<string>,
}