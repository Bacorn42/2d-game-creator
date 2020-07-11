import TokenType from "./TokenType";
import ReturnException from "./exceptions/ReturnException";
import BreakException from "./exceptions/BreakException";
import ContinueException from "./exceptions/ContinueException";

class Interpreter {
  constructor(statements, game) {
    this.statements = statements;
    this.game = game;
    this.variables = {};
  }

  setVariables = (names, values) => {
    for (let i = 0; i < names.length; i++) {
      this.variables[names[i]] = values[i];
    }
  };

  interpret = () => {
    try {
      for (const statement of this.statements) {
        statement.execute(this);
      }
    } catch (exception) {
      if (exception instanceof ReturnException) {
        return exception.value;
      }
      console.log("Interpreter error: " + exception);
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
      try {
        stmt.body.execute(this);
        stmt.post.execute(this);
      } catch (exception) {
        if (exception instanceof BreakException) {
          break;
        }
      }
    }
  };

  executeWhile = (stmt) => {
    while (stmt.condition.evaluate(this)) {
      stmt.body.execute(this);
    }
  };

  executeReturn = (stmt) => {
    const value = stmt.expr.evaluate(this);
    throw new ReturnException(value);
  };

  executeBreak = (stmt) => {
    throw new BreakException();
  };

  executeContinue = (stmt) => {
    throw new ContinueException();
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

  evaluateDot = (expr) => {
    return expr.left?.ownVars[expr.right.value];
  };

  evaluateIdentifier = (expr) => {
    return this.variables[expr.identifier.value];
  };

  evaluateAssign = (expr) => {
    const varName = expr.identifier.value;
    const value = this.variables[varName];
    if (value === null && expr.operator.type !== TokenType.EQUAL) {
      return;
    }

    const rightValue = expr.right.evaluate(this);
    switch (expr.operator.type) {
      case TokenType.EQUAL:
        return this.applyAssignment(rightValue, varName);
      case TokenType.PLUS_EQUAL:
        return this.applyAssignment(value + rightValue, varName);
      case TokenType.MINUS_EQUAL:
        return this.applyAssignment(value - rightValue, varName);
      case TokenType.STAR_EQUAL:
        return this.applyAssignment(value * rightValue, varName);
      case TokenType.SLASH_EQUAL:
        return this.applyAssignment(value / rightValue, varName);
      default:
        return null;
    }
  };

  applyAssignment = (newValue, identifierName) => {
    this.variables[identifierName] = newValue;
    return newValue;
  };

  evaluateFunction = (expr) => {
    const values = expr.args.map((arg) => arg.evaluate(this));
    return this.game.callFunction(expr.token.value, values);
  };
}

export default Interpreter;
