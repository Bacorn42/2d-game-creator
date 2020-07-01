import TokenType from "./TokenType";

class Interpreter {
  constructor(statements) {
    this.statements = statements;
  }

  interpret = () => {
    try {
      for (const statement of this.statements) {
        statement.execute(this);
      }
    } catch (err) {
      console.log("Interpreter error: " + err);
    }
  };

  executeExpression(stmt) {
    stmt.expr.evaluate(this);
  }

  executePrint(stmt) {
    console.log(stmt.expr.evaluate(this));
  }

  evaluateBinary(expr) {
    const left = expr.left.evaluate(this);
    const right = expr.right.evaluate(this);

    switch (expr.operator.type) {
      case TokenType.PLUS:
        return left + right;
      case TokenType.MINUS:
        return left - right;
      case TokenType.STAR:
        return left * right;
      case TokenType.SLASH:
        return left / right;
      case TokenType.MODULO:
        return left % right;
      default:
        return null;
    }
  }

  evaluateLiteral = (expr) => {
    return expr.value;
  };

  evaluateGroup = (expr) => {
    return expr.expr.evaluate(this);
  };
}

export default Interpreter;
