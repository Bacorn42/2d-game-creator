import tokenize from "./tokenize";
import TokenType from "./TokenType";
import Stmt from "./Stmt";
import Expr from "./Expr";

class Parser {
  constructor(code) {
    const tokens = tokenize(code);
    this.tokens = this.filterTokens(tokens);
    this.current = 0;
  }

  filterTokens = (tokens) => {
    return tokens.filter(
      (token) =>
        !this.filterTokenType(
          token,
          TokenType.SPACE,
          TokenType.TAB,
          TokenType.NEWLINE,
          TokenType.COMMENT
        )
    );
  };

  filterTokenType = (token, ...types) => {
    for (const type of types) {
      if (token.type === type) {
        return true;
      }
    }
    return false;
  };

  parse = () => {
    const statements = [];

    while (!this.isEnd()) {
      try {
        statements.push(this.statement());
      } catch (err) {
        console.log("Parsing error: " + err);
      }
    }

    return statements;
  };

  statement = () => {
    const token = this.getNextToken();
    switch (token.type) {
      case TokenType.PRINT:
        return this.printStatement();
      default:
        this.current--;
        return this.expressionStatement();
    }
  };

  printStatement = () => {
    const expr = this.expression();
    this.expect(TokenType.SEMICOLON, "Expected ';'");
    return new Stmt.Print(expr);
  };

  expressionStatement = () => {
    const expr = this.expression();
    this.expect(TokenType.SEMICOLON, "Expected ';'");
    return new Stmt.Expression(expr);
  };

  expression = () => {
    return this.addition();
  };

  addition = () => {
    let expr = this.multiplication();

    while (this.isNextToken(TokenType.PLUS, TokenType.MINUS)) {
      const operator = this.getPreviousToken();
      const right = this.multiplication();
      expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
  };

  multiplication = () => {
    let expr = this.primary();

    while (
      this.isNextToken(TokenType.STAR, TokenType.SLASH, TokenType.MODULO)
    ) {
      const operator = this.getPreviousToken();
      const right = this.primary();
      expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
  };

  primary = () => {
    const token = this.getNextToken();
    switch (token.type) {
      case TokenType.NUMBER:
        return new Expr.Literal(token.value);
      case TokenType.LEFT_PAREN:
        return this.groupExpression();
      default:
        throw this.error(token, "Expected expression");
    }
  };

  groupExpression = () => {
    const expr = this.expression();
    this.expect(TokenType.RIGHT_PAREN, "Expected ')'");
    return new Expr.Group(expr);
  };

  isNextToken = (...types) => {
    for (const type of types) {
      if (this.isTokenType(type)) {
        this.getNextToken();
        return true;
      }
    }
    return false;
  };

  getNextToken = () => {
    if (!this.isEnd()) this.current++;
    return this.getPreviousToken();
  };

  getPreviousToken = () => {
    return this.tokens[this.current - 1];
  };

  isEnd = () => {
    return this.getToken().type === TokenType.EOF;
  };

  getToken = () => {
    return this.tokens[this.current];
  };

  expect = (type, message) => {
    if (this.isTokenType(type)) {
      this.getNextToken();
    } else {
      throw this.error(this.getPreviousToken(), message);
    }
  };

  isTokenType = (type) => {
    if (this.isEnd()) {
      return false;
    }
    return this.getToken().type === type;
  };

  error = (token, message) => {
    throw new Error(
      "[Line " + token.line + " near '" + token.lexeme + "'] " + message
    );
  };
}

export default Parser;
