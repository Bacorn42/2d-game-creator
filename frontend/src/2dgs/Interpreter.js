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

  executeExpression = (stmt) => {
    stmt.expr.evaluate(this);
  };

  executeBlock = (stmt) => {
    for (const statement of stmt.stmts) {
      statement.execute(this);
    }
  };

  executeIf = (stmt) => {
    if (stmt.condition.evaluate(this)) {
      stmt.thenBranch.execute(this);
    } else {
      stmt.elseBranch.execute(this);
    }
  };

  executeFor = (stmt) => {
    stmt.init.execute(this);
    while (stmt.condition.evaluate(this)) {
      stmt.body.execute(this);
      stmt.post.execute(this);
    }
  };

  executePrint = (stmt) => {
    console.log(stmt.expr.evaluate(this));
  };

  evaluateBinary = (expr) => {
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
      case TokenType.EQUAL_EQUAL:
        return left === right;
      case TokenType.BANG_EQUAL:
        return left !== right;
      case TokenType.LESS:
        return left < right;
      case TokenType.LESS_EQUAL:
        return left <= right;
      case TokenType.GREATER:
        return left > right;
      case TokenType.GREATER_EQUAL:
        return left >= right;
      default:
        return null;
    }
  };

  evaluateLiteral = (expr) => {
    return expr.value;
  };

  evaluateGroup = (expr) => {
    return expr.expr.evaluate(this);
  };

  evaluateLogical = (expr) => {
    const left = expr.left.evaluate(this);

    switch (expr.operator.type) {
      case TokenType.OR:
      case TokenType.PIPE_PIPE:
        if (left) {
          return left;
        }
        break;
      case TokenType.AND:
      case TokenType.AMPERSAND_AMPERSAND:
        if (!left) {
          return left;
        }
        break;
      default:
        return null;
    }
    return expr.right.evaluate(this);
  };

  evaluateUnary = (expr) => {
    const right = expr.right.evaluate(this);

    switch (expr.operator.type) {
      case TokenType.BANG:
      case TokenType.NOT:
        return !right;
      case TokenType.MINUS:
        return -right;
      default:
        return null;
    }
  };
}

export default Interpreter;
