import { GameState } from "./game_state";

export interface Command {
    execute(state: GameState): GameState;
    undo(state: GameState): GameState;
  }