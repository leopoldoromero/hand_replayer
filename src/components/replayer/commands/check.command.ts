import { Command } from "../command";
import { GameState } from "../game_state";

export class CheckCommand implements Command {
  constructor(private playerName: string) {}

  execute(state: GameState): GameState {
    return {
      ...state,
      players: state.players.map(player =>
        player.name === this.playerName
          ? {
              ...player,
              action: 'check',
              showAction: true
            }
          : {
              ...player,
              showAction: false
            }
      )
    };
  }

  undo(state: GameState): GameState {
    return {
      ...state,
      players: state.players.map(player =>
        player.name === this.playerName
          ? {
              ...player,
              action: null,
              showAction: false
            }
          : player
      )
    };
  }
}
