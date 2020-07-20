import Parser from "../Parser";
import Expr from "../Expr";
import Stmt from "../Stmt";
import Token from "../Token";
import TokenType from "../TokenType";

test("Parses primary expression statements", () => {
  const code =
    "1; 'asd'; null; true; false; this; other; global; camera; i; (2);";
  const statements = new Parser(code).parse();

  const expectedStatements = [
    new Stmt.Expression(new Expr.Literal(1)),
    new Stmt.Expression(new Expr.Literal("asd")),
    new Stmt.Expression(new Expr.Literal(null)),
    new Stmt.Expression(new Expr.Literal(true)),
    new Stmt.Expression(new Expr.Literal(false)),
    new Stmt.Expression(new Expr.This()),
    new Stmt.Expression(new Expr.Other()),
    new Stmt.Expression(new Expr.Global()),
    new Stmt.Expression(new Expr.Camera()),
    new Stmt.Expression(
      new Expr.Identifier(
        new Token(TokenType.IDENTIFIER, "i", 1, TokenType.NONE)
      )
    ),
    new Stmt.Expression(new Expr.Group(new Expr.Literal(2))),
  ];

  expect(statements).toEqual(expectedStatements);
});

test("Parses arithmetic operators with correct precedence", () => {
  const code = "1 + 2 - 3 * 4 / 5 % 6;";
  const statements = new Parser(code).parse();

  const expectedStatements = [
    new Stmt.Expression(
      new Expr.Binary(
        new Expr.Binary(
          new Expr.Literal(1),
          new Token(TokenType.PLUS, "+", 1, TokenType.NONE),
          new Expr.Literal(2)
        ),
        new Token(TokenType.MINUS, "-", 1, TokenType.NONE),
        new Expr.Binary(
          new Expr.Binary(
            new Expr.Binary(
              new Expr.Literal(3),
              new Token(TokenType.STAR, "*", 1, TokenType.NONE),
              new Expr.Literal(4)
            ),
            new Token(TokenType.SLASH, "/", 1, TokenType.NONE),
            new Expr.Literal(5)
          ),
          new Token(TokenType.MODULO, "%", 1, TokenType.NONE),
          new Expr.Literal(6)
        )
      )
    ),
  ];

  expect(statements).toEqual(expectedStatements);
});

test("Parses logical operators with correct precedence", () => {
  const code = "1 == 2 || 3 and not 4 > 5;";
  const statements = new Parser(code).parse();

  const expectedStatements = [
    new Stmt.Expression(
      new Expr.Logical(
        new Expr.Logical(
          new Expr.Literal(1),
          new Token(TokenType.EQUAL_EQUAL, "==", 1, TokenType.NONE),
          new Expr.Literal(2)
        ),
        new Token(TokenType.PIPE_PIPE, "||", 1, TokenType.NONE),
        new Expr.Logical(
          new Expr.Literal(3),
          new Token(TokenType.AND, "and", 1, TokenType.NONE),
          new Expr.Logical(
            new Expr.Unary(
              new Token(TokenType.NOT, "not", 1, TokenType.NONE),
              new Expr.Literal(4)
            ),
            new Token(TokenType.GREATER, ">", 1, TokenType.NONE),
            new Expr.Literal(5)
          )
        )
      )
    ),
  ];

  expect(statements).toEqual(expectedStatements);
});

test("Parses assignment operators", () => {
  const code = "i = 1; i += 2; i /= 3;";
  const statements = new Parser(code).parse();

  const expectedStatements = [
    new Stmt.Expression(
      new Expr.Assign(
        new Expr.Identifier(
          new Token(TokenType.IDENTIFIER, "i", 1, TokenType.NONE)
        ),
        new Token(TokenType.EQUAL, "=", 1, TokenType.NONE),
        new Expr.Literal(1)
      )
    ),
    new Stmt.Expression(
      new Expr.Assign(
        new Expr.Identifier(
          new Token(TokenType.IDENTIFIER, "i", 1, TokenType.NONE)
        ),
        new Token(TokenType.PLUS_EQUAL, "+=", 1, TokenType.NONE),
        new Expr.Literal(2)
      )
    ),
    new Stmt.Expression(
      new Expr.Assign(
        new Expr.Identifier(
          new Token(TokenType.IDENTIFIER, "i", 1, TokenType.NONE)
        ),
        new Token(TokenType.SLASH_EQUAL, "/=", 1, TokenType.NONE),
        new Expr.Literal(3)
      )
    ),
  ];

  expect(statements).toEqual(expectedStatements);
});

test("Parses function expression", () => {
  const code = "func(1, 'asd', func(arg1, notArg));";
  const statements = new Parser(
    code,
    { isFunction: (func) => func === "func" },
    ["arg1"],
    ["func"]
  ).parse();

  const expectedStatements = [
    new Stmt.Expression(
      new Expr.Function(
        [
          new Expr.Literal(1),
          new Expr.Literal("asd"),
          new Expr.Function(
            [
              new Expr.Identifier(
                new Token(TokenType.IDENTIFIER, "arg1", 1, TokenType.ARG)
              ),
              new Expr.Identifier(
                new Token(TokenType.IDENTIFIER, "notArg", 1, TokenType.NONE)
              ),
            ],
            new Token(TokenType.IDENTIFIER, "func", 1, TokenType.USER_DEFINED)
          ),
        ],
        new Token(TokenType.IDENTIFIER, "func", 1, TokenType.USER_DEFINED)
      )
    ),
  ];

  expect(statements).toEqual(expectedStatements);
});

test("Parses block statement", () => {
  const code = "1; {2; 3;} 4;";
  const statements = new Parser(code).parse();

  const expectedStatements = [
    new Stmt.Expression(new Expr.Literal(1)),
    new Stmt.Block([
      new Stmt.Expression(new Expr.Literal(2)),
      new Stmt.Expression(new Expr.Literal(3)),
    ]),
    new Stmt.Expression(new Expr.Literal(4)),
  ];

  expect(statements).toEqual(expectedStatements);
});

test("Parses if statement", () => {
  const code = "if(1) 2; else if(3) {4; 5;} else 6;";
  const statements = new Parser(code).parse();

  const expectedStatements = [
    new Stmt.If(
      new Expr.Literal(1),
      new Stmt.Expression(new Expr.Literal(2)),
      new Stmt.If(
        new Expr.Literal(3),
        new Stmt.Block([
          new Stmt.Expression(new Expr.Literal(4)),
          new Stmt.Expression(new Expr.Literal(5)),
        ]),
        new Stmt.Expression(new Expr.Literal(6))
      )
    ),
  ];

  expect(statements).toEqual(expectedStatements);
});

test("Parses for statement", () => {
  const code = "for(i = 0; i < 10; i += 1) { 42; continue; }";
  const statements = new Parser(code).parse();

  const expectedStatements = [
    new Stmt.For(
      new Stmt.Expression(
        new Expr.Assign(
          new Expr.Identifier(
            new Token(TokenType.IDENTIFIER, "i", 1, TokenType.NONE)
          ),
          new Token(TokenType.EQUAL, "=", 1, TokenType.NONE),
          new Expr.Literal(0)
        )
      ),
      new Expr.Logical(
        new Expr.Identifier(
          new Token(TokenType.IDENTIFIER, "i", 1, TokenType.NONE)
        ),
        new Token(TokenType.LESS, "<", 1, TokenType.NONE),
        new Expr.Literal(10)
      ),
      new Stmt.Expression(
        new Expr.Assign(
          new Expr.Identifier(
            new Token(TokenType.IDENTIFIER, "i", 1, TokenType.NONE)
          ),
          new Token(TokenType.PLUS_EQUAL, "+=", 1, TokenType.NONE),
          new Expr.Literal(1)
        )
      ),
      new Stmt.Block([
        new Stmt.Expression(new Expr.Literal(42)),
        new Stmt.Continue(),
      ])
    ),
  ];

  expect(statements).toEqual(expectedStatements);
});

test("Parses while statement", () => {
  const code = "while(true) { 3; break; }";
  const statements = new Parser(code).parse();

  const expectedStatements = [
    new Stmt.While(
      new Expr.Literal(true),
      new Stmt.Block([
        new Stmt.Expression(new Expr.Literal(3)),
        new Stmt.Break(),
      ])
    ),
  ];

  expect(statements).toEqual(expectedStatements);
});

test("Parses return statement", () => {
  const code = "return 42;";
  const statements = new Parser(code).parse();

  const expectedStatements = [new Stmt.Return(new Expr.Literal(42))];

  expect(statements).toEqual(expectedStatements);
});

test("Parses print statement", () => {
  const code = "print 'hello';";
  const statements = new Parser(code).parse();

  const expectedStatements = [new Stmt.Print(new Expr.Literal("hello"))];

  expect(statements).toEqual(expectedStatements);
});
