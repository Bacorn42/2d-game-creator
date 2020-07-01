import Parser from "../Parser";

function GameFunction(func) {
  const parser = new Parser(func.code);
  this.statements = parser.parse();
  this.args = [...func.args];
}

export default GameFunction;
