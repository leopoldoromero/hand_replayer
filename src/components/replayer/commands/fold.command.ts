import { Command } from "../command";
import { GameState } from "../game_state";

export class FoldCommand implements Command {
  private removedIndex: number | null = null;

  constructor(private playerName: string) {}

  execute(state: GameState): GameState {
    const newPlayersInHand = [...state.playersInHand];
    this.removedIndex = newPlayersInHand.indexOf(this.playerName);
    if (this.removedIndex !== -1) {
      newPlayersInHand.splice(this.removedIndex, 1);
    }

    return {
      ...state,
      players: state.players.map(player =>
        player.name === this.playerName
          ? { ...player, action: 'fold', showAction: true }
          : { ...player, showAction: false }
      ),
      playersInHand: newPlayersInHand
    };
  }

  undo(state: GameState): GameState {
    if (this.removedIndex === null) return state;

    const newPlayersInHand = [...state.playersInHand];
    newPlayersInHand.splice(this.removedIndex, 0, this.playerName); // restore to original index

    return {
      ...state,
      players: state.players.map(player =>
        player.name === this.playerName
          ? { ...player, action: null, showAction: false }
          : player
      ),
      playersInHand: newPlayersInHand
    };
  }
}
