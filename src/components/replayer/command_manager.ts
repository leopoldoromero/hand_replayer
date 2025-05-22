import { Command } from "./command";
import { GameState } from "./game_state";

export class CommandManager {
    private commands: Command[] = [];
    private undoneCommands: Command[] = [];
    private state: GameState;
  
    constructor(initialState: GameState) {
      this.state = initialState;
    }
  
    execute(command: Command) {
      this.state = command.execute(this.state);
      this.commands.push(command);
      this.undoneCommands = []; 
    }
  
    undo() {
      const command = this.commands.pop();
      if (command) {
        this.state = command.undo(this.state);
        this.undoneCommands.push(command);
      }
    }
  
    redo() {
      const command = this.undoneCommands.pop();
      if (command) {
        this.state = command.execute(this.state);
        this.commands.push(command);
      }
    }
  
    getState(): GameState {
      return this.state;
    }
  
    reset(state: GameState) {
      this.state = state;
      this.commands = [];
      this.undoneCommands = [];
    }
  }