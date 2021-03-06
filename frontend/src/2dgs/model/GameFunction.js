import Parser from "../Parser";
import Interpreter from "../Interpreter";

class GameFunction {
  constructor(func, game) {
    this.func = func;
    this.game = game;
    const parser = new Parser(func.code, game, func.args, game.names);
    this.statements = parser.parse();
    this.args = [...func.args];
  }

  call = (values, thisObject) => {
    const interpreter = new Interpreter(this.statements, this.game, thisObject);
    interpreter.setVariables(this.args, values);
    return interpreter.interpret();
  };
}

export default GameFunction;
