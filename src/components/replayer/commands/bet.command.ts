import { Command } from "../command";
import { GameState } from "../game_state";

export class BetCommand implements Command {
  constructor(
    private playerName: string,
    private amount: number
  ) {}

  execute(state: GameState): GameState {
    return {
      ...state,
      pot: state.pot + this.amount,
      players: state.players.map(player =>
        player.name === this.playerName
          ? {
              ...player,
              stack: player.stack - this.amount,
              action: 'bet',
              amount: (player.amount || 0) + this.amount,
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
      pot: state.pot - this.amount,
      players: state.players.map(player =>
        player.name === this.playerName
          ? {
              ...player,
              stack: player.stack + this.amount,
              action: null,
              amount: (player.amount || 0) - this.amount,
              showAction: false
            }
          : player
      )
    };
  }
}
