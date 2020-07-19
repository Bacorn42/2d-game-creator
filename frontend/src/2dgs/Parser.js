import tokenize from "./tokenize";
import TokenType from "./TokenType";
import Stmt from "./Stmt";
import Expr from "./Expr";

class Parser {
  constructor(code, game, args, names, logger) {
    this.game = game;
    this.logger = logger || console;
    const tokens = tokenize(code, args, names);
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
        this.logger.log("Parsing error: " + err);
        this.logger.log(err.stack);
      }
    }

    return statements;
  };

  statement = () => {
    const token = this.getNextToken();
    switch (token.type) {
      case TokenType.LEFT_BRACE:
        return this.blockStatement();
      case TokenType.IF:
        return this.ifStatement();
      case TokenType.FOR:
        return this.forStatement();
      case TokenType.WHILE:
        return this.whileStatement();
      case TokenType.RETURN:
        return this.returnStatement();
      case TokenType.PRINT:
        return this.printStatement();
      default:
        this.current--;
        return this.expressionStatement();
    }
  };

  blockStatement = () => {
    const stmts = [];

    while (this.getToken().type !== TokenType.RIGHT_BRACE && !this.isEnd()) {
      stmts.push(this.statement());
    }

    this.expect(TokenType.RIGHT_BRACE, "Expected '}'");
    return new Stmt.Block(stmts);
  };

  ifStatement = () => {
    this.expect(TokenType.LEFT_PAREN, "Expected '('");
    const condition = this.expression();
    this.expect(TokenType.RIGHT_PAREN, "Expected ')'");

    const thenBranch = this.statement();
    const elseBranch = this.isNextToken(TokenType.ELSE)
      ? this.statement()
      : new Stmt.Empty();

    return new Stmt.If(condition, thenBranch, elseBranch);
  };

  forStatement = () => {
    let init = new Stmt.Empty();
    let condition = null;
    let post = new Stmt.Empty();

    this.expect(TokenType.LEFT_PAREN, "Expected '('");
    if (this.getToken().type !== TokenType.SEMICOLON) {
      init = this.expressionStatement();
    } else {
      this.expect(TokenType.SEMICOLON, "Expected ';'");
    }

    if (this.getToken().type !== TokenType.SEMICOLON) {
      condition = this.expression();
    }
    this.expect(TokenType.SEMICOLON, "Expected ';'");

    if (this.getToken().type !== TokenType.RIGHT_PAREN) {
      post = new Stmt.Expression(this.expression());
    }
    this.expect(TokenType.RIGHT_PAREN, "Expected ')'");

    const body = this.statement();

    return new Stmt.For(init, condition, post, body);
  };

  whileStatement = () => {
    this.expect(TokenType.LEFT_PAREN, "Expected '('");
    const condition = this.expression();
    this.expect(TokenType.RIGHT_PAREN, "Expected ')'");

    const body = this.statement();

    return new Stmt.While(condition, body);
  };

  returnStatement = () => {
    const expr = this.expression();
    this.expect(TokenType.SEMICOLON, "Expected ';'");
    return new Stmt.Return(expr);
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
    return this.assign();
  };

  assign = () => {
    let expr = this.or();

    while (
      this.isNextToken(
        TokenType.EQUAL,
        TokenType.PLUS_EQUAL,
        TokenType.MINUS_EQUAL,
        TokenType.STAR_EQUAL,
        TokenType.SLASH_EQUAL
      )
    ) {
      const operator = this.getPreviousToken();
      const right = this.assign();

      if (expr instanceof Expr.Identifier || expr instanceof Expr.Dot) {
        return new Expr.Assign(expr, operator, right);
      }
      throw this.error(this.getToken, "You can only assign to a variable");
    }

    return expr;
  };

  or = () => {
    let expr = this.and();

    while (this.isNextToken(TokenType.OR, TokenType.PIPE_PIPE)) {
      const operator = this.getPreviousToken();
      const right = this.and();
      expr = new Expr.Logical(expr, operator, right);
    }

    return expr;
  };

  and = () => {
    let expr = this.equality();

    while (this.isNextToken(TokenType.AND, TokenType.AMPERSAND_AMPERSAND)) {
      const operator = this.getPreviousToken();
      const right = this.equality();
      expr = new Expr.Logical(expr, operator, right);
    }

    return expr;
  };

  equality = () => {
    let expr = this.comparison();

    while (this.isNextToken(TokenType.EQUAL_EQUAL, TokenType.BANG_EQUAL)) {
      const operator = this.getPreviousToken();
      const right = this.comparison();
      expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
  };

  comparison = () => {
    let expr = this.addition();

    while (
      this.isNextToken(
        TokenType.LESS,
        TokenType.LESS_EQUAL,
        TokenType.GREATER,
        TokenType.GREATER_EQUAL
      )
    ) {
      const operator = this.getPreviousToken();
      const right = this.addition();
      expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
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
    let expr = this.unary();

    while (
      this.isNextToken(TokenType.STAR, TokenType.SLASH, TokenType.MODULO)
    ) {
      const operator = this.getPreviousToken();
      const right = this.unary();
      expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
  };

  unary = () => {
    if (this.isNextToken(TokenType.BANG, TokenType.NOT, TokenType.MINUS)) {
      const operator = this.getPreviousToken();
      const right = this.unary();
      return new Expr.Unary(operator, right);
    }
    return this.dot();
  };

  dot = () => {
    let expr = this.primary();

    while (this.isNextToken(TokenType.DOT)) {
      const operator = this.getPreviousToken();
      const right = this.primary();
      expr = new Expr.Dot(expr, operator, right);
    }

    return expr;
  };

  primary = () => {
    const token = this.getNextToken();
    switch (token.type) {
      case TokenType.NULL:
        return new Expr.Literal(null);
      case TokenType.TRUE:
        return new Expr.Literal(true);
      case TokenType.FALSE:
        return new Expr.Literal(false);
      case TokenType.THIS:
        return new Expr.This();
      case TokenType.OTHER:
        return new Expr.Other();
      case TokenType.GLOBAL:
        return new Expr.Global();
      case TokenType.CAMERA:
        return new Expr.Camera();
      case TokenType.NUMBER:
        return new Expr.Literal(token.value);
      case TokenType.STRING:
        return new Expr.Literal(token.value.substr(1, token.value.length - 2));
      case TokenType.IDENTIFIER:
        return this.identifier(token);
      case TokenType.LEFT_PAREN:
        return this.groupExpression();
      default:
        throw this.error(token, "Expected expression");
    }
  };

  identifier = (token) => {
    if (this.game.isFunction(token.value)) {
      return this.functionExpression(token);
    } else {
      return new Expr.Identifier(token);
    }
  };

  functionExpression = (token) => {
    const args = [];

    this.expect(TokenType.LEFT_PAREN, "Expected '('");
    while (this.getToken().type !== TokenType.RIGHT_PAREN) {
      const expr = this.expression();
      args.push(expr);
      this.consume(TokenType.COMMA);
    }
    this.expect(TokenType.RIGHT_PAREN, "Expected ')'");

    return new Expr.Function(args, token);
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

  consume = (type) => {
    if (this.getToken().type === type) {
      this.getNextToken();
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
      "[Line " + token.line + " near '" + token.value + "'] " + message
    );
  };
}

export default Parser;
