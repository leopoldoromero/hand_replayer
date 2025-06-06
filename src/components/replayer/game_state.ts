import { Hand, SummaryPlayer } from "@/modules/hand/domain/hand";
import { Player, PreflopStats } from "@/modules/hand/domain/player";
import { Command } from "./command";
import { Action, ActionTypes } from "@/modules/hand/domain/action";
import { BetCommand } from "./commands/bet.command";
import { CallCommand } from "./commands/call.command";
import { RaiseCommand } from "./commands/raise.command";
import { FoldCommand } from "./commands/fold.command";
import { CheckCommand } from "./commands/check.command";

export interface PlayerState {
    name: string;
    stack: number;
    action: string | null;
    amount: number | null;
    showAction: boolean;
    cards?: string[];
    stats?: PreflopStats; 
  }
  
export interface GameState {
    pot: number;
    board: string[];
    players: PlayerState[];
    heroName: string;
    heroCards: string[];
    showKnownCards: boolean;
    playersInHand: string[];
    winner: SummaryPlayer | null;
    looser: SummaryPlayer | null;
}

export class GameStateHandler {
    private hand: Hand;
    private commands: Array<Command> = [];
    private state: GameState;
    public actionIndex = 0;

    constructor(hand: Hand) {
        this.hand = hand;
        this.commands = hand.actions
        .map(this.mapActionToCommand)
        .filter(cmd => cmd !== null) as Command[];
        this.state = this.createInitialGameState();
    }

    private createInitialGameState(): GameState {
        const hand = this.hand;
        return ({
            pot: 0,
            board: [],
            players: hand.players.map((player: Player) => ({
              name: player.name,
              stack: player.stack,
              action: null,
              amount: null,
              showAction: false,
              stats: player.stats,
            })),
            heroName: hand.hero.nick,
            heroCards: hand.hero.cards,
            showKnownCards: false,
            playersInHand: hand.players.map((p: Player) => p.name),
            winner: hand.winner,
            looser: hand.looser,
        });
    }

    private mapActionToCommand(action: Action): Command | null {
        const player = action.player;
        const amount = action.amount;
        switch (action.action) {
          case ActionTypes.SB:
          case ActionTypes.BB:
          case ActionTypes.BET:
            return new BetCommand(player, amount);
          case ActionTypes.CALL:
            return new CallCommand(player, amount);
          case ActionTypes.RAISE:
            return new RaiseCommand(player, amount, 0); 
          case ActionTypes.FOLD:
            return new FoldCommand(player);
          case ActionTypes.CHECK:
            return new CheckCommand(player);
          default:
            return null;
        }
    }

    public getState() {
        return this.state;
    }

    public execute(): GameState {
        if (this.actionIndex > this.commands.length || this.commands.length === 0) {
            return this.state;
        }
        const command = this.commands[this.actionIndex];
        this.state = command.execute(this.state);
        this.actionIndex++
        return this.state;
    }

    public undo(): GameState {
        if (this.actionIndex <= 0) {
            return this.state;
        }
        this.actionIndex--
        const command = this.commands[this.actionIndex];
        this.state = command.undo(this.state);
        return this.state;
    }

    public reset(): GameState {
        this.state = this.createInitialGameState()
        this.actionIndex = 0;
        return this.state;
    }

    public isLastAction(): boolean {
      return this.actionIndex >= this.commands.length
    }

} 