import { Command } from "../command";
import { GameState } from "../game_state";

export class CallCommand implements Command {
  constructor(
    private playerName: string,
    private amountToCall: number
  ) {}

  execute(state: GameState): GameState {
    return {
      ...state,
      pot: state.pot + this.amountToCall,
      players: state.players.map(player =>
        player.name === this.playerName
          ? {
              ...player,
              stack: player.stack - this.amountToCall,
              action: 'call',
              amount: (player.amount || 0) + this.amountToCall,
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
      pot: state.pot - this.amountToCall,
      players: state.players.map(player =>
        player.name === this.playerName
          ? {
              ...player,
              stack: player.stack + this.amountToCall,
              action: null,
              amount: (player.amount || 0) - this.amountToCall,
              showAction: false
            }
          : player
      )
    };
  }
}