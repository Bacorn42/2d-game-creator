const TokenType = {
  SPACE: "SPACE",
  NEWLINE: "NEWLINE",
  TAB: "TAB",
  PLUS: "PLUS",
  MINUS: "MINUS",
  STAR: "STAR",
  SLASH: "SLASH",
  MODULO: "MODULO",
  LEFT_PAREN: "LEFT_PAREN",
  RIGHT_PAREN: "RIGHT_PAREN",
  LEFT_BRACE: "LEFT_BRACE",
  RIGHT_BRACE: "RIGHT_BRACE",
  SEMICOLON: "SEMICOLON",
  DOT: "DOT",
  COMMA: "COMMA",
  GREATER: "GREATER",
  LESS: "LESS",
  COMMENT: "COMMENT",
  BLOCK_COMMENT: "BLOCK_COMMENT",
  AMPERSAND: "AMPERSAND",
  AMPERSAND_AMPERSAND: "AMPERSAND_AMPERSAND",
  PIPE: "PIPE",
  PIPE_PIPE: "PIPE_PIPE",
  CARET: "CARET",

  EQUAL: "EQUAL",
  EQUAL_EQUAL: "EQUAL_EQUAL",
  BANG: "BANG",
  BANG_EQUAL: "BANG_EQUAL",
  PLUS_EQUAL: "PLUS_EQUAL",
  MINUS_EQUAL: "MINUS_EQUAL",
  STAR_EQUAL: "STAR_EQUAL",
  SLASH_EQUAL: "SLASH_EQUAL",
  GREATER_EQUAL: "GREATER_EQUAL",
  LESS_EQUAL: "LESS_EQUAL",
  PIPE_EQUAL: "PIPE_EQUAL",
  AMPERSAND_EQUAL: "AMPERSAND_EQUAL",
  LESS_LESS: "LESS_LESS",
  GREATER_GREATER: "GREATER_GREATER",
  LESS_LESS_EQUAL: "LESS_LESS_EQUAL",
  GREATER_GREATER_EQUAL: "GREATER_GREATER_EQUAL",

  STRING: "STRING",
  NUMBER: "NUMBER",
  IDENTIFIER: "IDENTIFIER",

  AND: "AND",
  OR: "OR",
  NOT: "NOT",
  IF: "IF",
  ELSE: "ELSE",
  TRUE: "TRUE",
  FALSE: "FALSE",
  VAR: "VAR",
  FOR: "FOR",
  WHILE: "WHILE",
  NULL: "NULL",
  THIS: "THIS",
  OTHER: "OTHER",
  BREAK: "BREAK",
  CONTINUE: "CONTINUE",
  RETURN: "RETURN",
  PRINT: "PRINT",

  UNKNOWN: "UNKNOWN",
  EOF: "EOF",

  ARG: "ARG",
  USER_DEFINED: "USER_DEFINED",
  APP_DEFINED: "APP_DEFINED",
  NONE: "NONE",
};

export default TokenType;
