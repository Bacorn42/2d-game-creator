import TokenType from "./TokenType";
import ReturnException from "./exceptions/ReturnException";
import BreakException from "./exceptions/BreakException";
import ContinueException from "./exceptions/ContinueException";

class Interpreter {
  constructor(statements, game, thisObject, otherObject, logger) {
    this.statements = statements;
    this.game = game;
    this.thisObject = thisObject;
    this.otherObject = otherObject;
    this.logger = logger || console;
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
      this.logger.log("Interpreter error: " + exception);
      this.logger.log(exception.stack);
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
    this.logger.log(stmt.expr.evaluate(this));
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
      case TokenType.PIPE:
        return left | right;
      case TokenType.CARET:
        return left ^ right;
      case TokenType.AMPERSAND:
        return left & right;
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
      case TokenType.LESS_LESS:
        return left << right;
      case TokenType.GREATER_GREATER:
        return left >> right;
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
    const expression = expr.expr.evaluate(this);

    switch (expr.operator.type) {
      case TokenType.BANG:
      case TokenType.NOT:
        return !expression;
      case TokenType.MINUS:
        return -expression;
      default:
        return null;
    }
  };

  evaluateDot = (expr) => {
    const leftObject = expr.left.evaluate(this);
    const variable = expr.right.identifier.value;
    return leftObject.ownVars[variable];
  };

  getDotCallback = (expr) => {
    const leftObject = expr.left.evaluate(this);
    const variable = expr.right.identifier.value;
    return (newValue) => (leftObject.ownVars[variable] = newValue);
  };

  evaluateIdentifier = (expr) => {
    if (expr.identifier.secondaryType === TokenType.USER_DEFINED) {
      return expr.identifier.value;
    }
    const variable = expr.identifier.value;
    return this.variables[variable];
  };

  getIdentifierCallback = (expr) => {
    const variable = expr.identifier.value;
    return (newValue) => (this.variables[variable] = newValue);
  };

  evaluateAssign = (expr) => {
    const value = expr.left.evaluate(this);
    const callback = expr.left.getCallback(this);
    if (value === undefined && expr.operator.type !== TokenType.EQUAL) {
      throw Error("Variable doesn't exist");
    }

    const rightValue = expr.right.evaluate(this);
    switch (expr.operator.type) {
      case TokenType.EQUAL:
        return this.applyAssignment(rightValue, callback);
      case TokenType.PLUS_EQUAL:
        return this.applyAssignment(value + rightValue, callback);
      case TokenType.MINUS_EQUAL:
        return this.applyAssignment(value - rightValue, callback);
      case TokenType.STAR_EQUAL:
        return this.applyAssignment(value * rightValue, callback);
      case TokenType.SLASH_EQUAL:
        return this.applyAssignment(value / rightValue, callback);
      case TokenType.PIPE_EQUAL:
        return this.applyAssignment(value | rightValue, callback);
      case TokenType.CARET_EQUAL:
        return this.applyAssignment(value ^ rightValue, callback);
      case TokenType.AMPERSAND_EQUAL:
        return this.applyAssignment(value & rightValue, callback);
      case TokenType.LESS_LESS_EQUAL:
        return this.applyAssignment(value << rightValue, callback);
      case TokenType.GREATER_GREATER_EQUAL:
        return this.applyAssignment(value >> rightValue, callback);
      default:
        return null;
    }
  };

  applyAssignment = (newValue, callback) => {
    callback(newValue);
    return newValue;
  };

  evaluateFunction = (expr) => {
    const values = expr.args.map((arg) => arg.evaluate(this));
    return this.game.callFunction(expr.token.value, values, this.thisObject);
  };

  evaluateThis = (expr) => {
    return this.thisObject;
  };

  evaluateOther = (expr) => {
    return this.otherObject;
  };

  evaluateGlobal = (expr) => {
    return this.game;
  };

  evaluateCamera = (expr) => {
    return this.game.camera;
  };
}

export default Interpreter;
