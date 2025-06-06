import { Command } from "../command";
import { GameState } from "../game_state";

export class RaiseCommand implements Command {
  private raiseAmount: number;

  constructor(
    private playerName: string,
    private totalPutIn: number,
    private amountAlreadyPutIn: number
  ) {
    this.raiseAmount = this.totalPutIn - this.amountAlreadyPutIn;
  }

  execute(state: GameState): GameState {
    return {
      ...state,
      pot: state.pot + this.raiseAmount,
      players: state.players.map(player =>
        player.name === this.playerName
          ? {
              ...player,
              stack: player.stack - this.raiseAmount,
              action: 'raise',
              amount: (player.amount || 0) + this.raiseAmount,
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
      pot: state.pot - this.raiseAmount,
      players: state.players.map(player =>
        player.name === this.playerName
          ? {
              ...player,
              stack: player.stack + this.raiseAmount,
              action: null,
              amount: (player.amount || 0) - this.raiseAmount,
              showAction: false
            }
          : player
      )
    };
  }
}
