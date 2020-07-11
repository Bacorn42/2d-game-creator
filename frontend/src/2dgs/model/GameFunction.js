import Parser from "../Parser";
import Interpreter from "../Interpreter";

class GameFunction {
  constructor(func, game) {
    this.func = func;
    this.game = game;
    const parser = new Parser(func.code, game);
    this.statements = parser.parse();
    this.args = [...func.args];
  }

  call = (values) => {
    const interpreter = new Interpreter(this.statements, this.game);
    interpreter.setVariables(this.args, values);
    interpreter.interpret();
  };
}

export default GameFunction;
