import tokenize from "../tokenize";
import Token from "../Token";
import TokenType from "../TokenType";

test("Tokenizes whitespace", () => {
  const code = " \t\n ";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.TAB, "\t", 1, TokenType.NONE),
    new Token(TokenType.NEWLINE, "\n", 2, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 2, TokenType.NONE),
    new Token(TokenType.EOF, "", 2, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes comments", () => {
  const code = "//Comment\n/*\nBlock*/";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.COMMENT, "//Comment", 1, TokenType.NONE),
    new Token(TokenType.NEWLINE, "\n", 2, TokenType.NONE),
    new Token(TokenType.BLOCK_COMMENT, "/*\nBlock*/", 3, TokenType.NONE),
    new Token(TokenType.EOF, "", 3, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes arithmetic operators", () => {
  const code = "+-*/% = +=-=*=/=";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.PLUS, "+", 1, TokenType.NONE),
    new Token(TokenType.MINUS, "-", 1, TokenType.NONE),
    new Token(TokenType.STAR, "*", 1, TokenType.NONE),
    new Token(TokenType.SLASH, "/", 1, TokenType.NONE),
    new Token(TokenType.MODULO, "%", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.EQUAL, "=", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.PLUS_EQUAL, "+=", 1, TokenType.NONE),
    new Token(TokenType.MINUS_EQUAL, "-=", 1, TokenType.NONE),
    new Token(TokenType.STAR_EQUAL, "*=", 1, TokenType.NONE),
    new Token(TokenType.SLASH_EQUAL, "/=", 1, TokenType.NONE),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes logical operators", () => {
  const code = "!><>=<= ==!=||&& and or not";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.BANG, "!", 1, TokenType.NONE),
    new Token(TokenType.GREATER, ">", 1, TokenType.NONE),
    new Token(TokenType.LESS, "<", 1, TokenType.NONE),
    new Token(TokenType.GREATER_EQUAL, ">=", 1, TokenType.NONE),
    new Token(TokenType.LESS_EQUAL, "<=", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.EQUAL_EQUAL, "==", 1, TokenType.NONE),
    new Token(TokenType.BANG_EQUAL, "!=", 1, TokenType.NONE),
    new Token(TokenType.PIPE_PIPE, "||", 1, TokenType.NONE),
    new Token(TokenType.AMPERSAND_AMPERSAND, "&&", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.AND, "and", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.OR, "or", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.NOT, "not", 1, TokenType.NONE),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes bitwise operators", () => {
  const code = "&|^|=&=^=<<>><<=>>=";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.AMPERSAND, "&", 1, TokenType.NONE),
    new Token(TokenType.PIPE, "|", 1, TokenType.NONE),
    new Token(TokenType.CARET, "^", 1, TokenType.NONE),
    new Token(TokenType.PIPE_EQUAL, "|=", 1, TokenType.NONE),
    new Token(TokenType.AMPERSAND_EQUAL, "&=", 1, TokenType.NONE),
    new Token(TokenType.CARET_EQUAL, "^=", 1, TokenType.NONE),
    new Token(TokenType.LESS_LESS, "<<", 1, TokenType.NONE),
    new Token(TokenType.GREATER_GREATER, ">>", 1, TokenType.NONE),
    new Token(TokenType.LESS_LESS_EQUAL, "<<=", 1, TokenType.NONE),
    new Token(TokenType.GREATER_GREATER_EQUAL, ">>=", 1, TokenType.NONE),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes other symbols", () => {
  const code = "(){}[].,;";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.LEFT_PAREN, "(", 1, TokenType.NONE),
    new Token(TokenType.RIGHT_PAREN, ")", 1, TokenType.NONE),
    new Token(TokenType.LEFT_BRACE, "{", 1, TokenType.NONE),
    new Token(TokenType.RIGHT_BRACE, "}", 1, TokenType.NONE),
    new Token(TokenType.LEFT_BRACKET, "[", 1, TokenType.NONE),
    new Token(TokenType.RIGHT_BRACKET, "]", 1, TokenType.NONE),
    new Token(TokenType.DOT, ".", 1, TokenType.NONE),
    new Token(TokenType.COMMA, ",", 1, TokenType.NONE),
    new Token(TokenType.SEMICOLON, ";", 1, TokenType.NONE),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes identifiers", () => {
  const code = "qwe a asd";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.IDENTIFIER, "qwe", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "a", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "asd", 1, TokenType.NONE),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes numbers", () => {
  const code = "1 42 3.14 31. .2";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.NUMBER, 1, 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.NUMBER, 42, 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.NUMBER, 3.14, 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.NUMBER, 31, 1, TokenType.NONE),
    new Token(TokenType.DOT, ".", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.DOT, ".", 1, TokenType.NONE),
    new Token(TokenType.NUMBER, 2, 1, TokenType.NONE),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes strings", () => {
  const code = "'qwe' \"asd\"";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.STRING, "'qwe'", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.STRING, '"asd"', 1, TokenType.NONE),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes structural keywords", () => {
  const code = "if else for while break continue return print";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.IF, "if", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.ELSE, "else", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.FOR, "for", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.WHILE, "while", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.BREAK, "break", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.CONTINUE, "continue", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.RETURN, "return", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.PRINT, "print", 1, TokenType.NONE),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes primary keywords", () => {
  const code = "true false null this other global camera";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.TRUE, "true", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.FALSE, "false", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.NULL, "null", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.THIS, "this", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.OTHER, "other", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.GLOBAL, "global", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.CAMERA, "camera", 1, TokenType.NONE),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes almost-keywords as identifiers", () => {
  const code = "tru iff";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.IDENTIFIER, "tru", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "iff", 1, TokenType.NONE),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes args", () => {
  const code = "arg arg0 arg1 arg00";
  const tokens = tokenize(code, ["arg0", "arg1"]);

  const expectedTokens = [
    new Token(TokenType.IDENTIFIER, "arg", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "arg0", 1, TokenType.ARG),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "arg1", 1, TokenType.ARG),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "arg00", 1, TokenType.NONE),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes user defined", () => {
  const code = "qw qwe asd asdd";
  const tokens = tokenize(code, null, ["qwe", "asd"]);

  const expectedTokens = [
    new Token(TokenType.IDENTIFIER, "qw", 1, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "qwe", 1, TokenType.USER_DEFINED),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "asd", 1, TokenType.USER_DEFINED),
    new Token(TokenType.SPACE, " ", 1, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "asdd", 1, TokenType.NONE),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes app defined", () => {
  const code = "gsDestroy";
  const tokens = tokenize(code);

  const expectedTokens = [
    new Token(TokenType.IDENTIFIER, "gsDestroy", 1, TokenType.APP_DEFINED),
    new Token(TokenType.EOF, "", 1, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});

test("Tokenizes sample code", () => {
  const code =
    "//Function\nsum=1;\nfor(i=0;i<=10;i+=1){\nsum*=num;\n}\nreturn func(num+sum,'str');";
  const tokens = tokenize(code, ["num"], ["func"]);

  const expectedTokens = [
    new Token(TokenType.COMMENT, "//Function", 1, TokenType.NONE),
    new Token(TokenType.NEWLINE, "\n", 2, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "sum", 2, TokenType.NONE),
    new Token(TokenType.EQUAL, "=", 2, TokenType.NONE),
    new Token(TokenType.NUMBER, 1, 2, TokenType.NONE),
    new Token(TokenType.SEMICOLON, ";", 2, TokenType.NONE),
    new Token(TokenType.NEWLINE, "\n", 3, TokenType.NONE),
    new Token(TokenType.FOR, "for", 3, TokenType.NONE),
    new Token(TokenType.LEFT_PAREN, "(", 3, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "i", 3, TokenType.NONE),
    new Token(TokenType.EQUAL, "=", 3, TokenType.NONE),
    new Token(TokenType.NUMBER, 0, 3, TokenType.NONE),
    new Token(TokenType.SEMICOLON, ";", 3, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "i", 3, TokenType.NONE),
    new Token(TokenType.LESS_EQUAL, "<=", 3, TokenType.NONE),
    new Token(TokenType.NUMBER, 10, 3, TokenType.NONE),
    new Token(TokenType.SEMICOLON, ";", 3, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "i", 3, TokenType.NONE),
    new Token(TokenType.PLUS_EQUAL, "+=", 3, TokenType.NONE),
    new Token(TokenType.NUMBER, 1, 3, TokenType.NONE),
    new Token(TokenType.RIGHT_PAREN, ")", 3, TokenType.NONE),
    new Token(TokenType.LEFT_BRACE, "{", 3, TokenType.NONE),
    new Token(TokenType.NEWLINE, "\n", 4, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "sum", 4, TokenType.NONE),
    new Token(TokenType.STAR_EQUAL, "*=", 4, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "num", 4, TokenType.ARG),
    new Token(TokenType.SEMICOLON, ";", 4, TokenType.NONE),
    new Token(TokenType.NEWLINE, "\n", 5, TokenType.NONE),
    new Token(TokenType.RIGHT_BRACE, "}", 5, TokenType.NONE),
    new Token(TokenType.NEWLINE, "\n", 6, TokenType.NONE),
    new Token(TokenType.RETURN, "return", 6, TokenType.NONE),
    new Token(TokenType.SPACE, " ", 6, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "func", 6, TokenType.USER_DEFINED),
    new Token(TokenType.LEFT_PAREN, "(", 6, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "num", 6, TokenType.ARG),
    new Token(TokenType.PLUS, "+", 6, TokenType.NONE),
    new Token(TokenType.IDENTIFIER, "sum", 6, TokenType.NONE),
    new Token(TokenType.COMMA, ",", 6, TokenType.NONE),
    new Token(TokenType.STRING, "'str'", 6, TokenType.NONE),
    new Token(TokenType.RIGHT_PAREN, ")", 6, TokenType.NONE),
    new Token(TokenType.SEMICOLON, ";", 6, TokenType.NONE),
    new Token(TokenType.EOF, "", 6, TokenType.NONE),
  ];

  expect(tokens).toEqual(expectedTokens);
});
