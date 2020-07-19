import Token from "./Token";
import TokenType from "./TokenType";
import appDefined from "./appDefined";

class Tokenizer {
  constructor(str, args, names) {
    this.tokens = [];
    this.start = 0;
    this.current = 0;
    this.line = 1;
    this.str = str;
    this.args = args;
    this.names = names;
  }

  tokenize = () => {
    while (!this.isEnd()) {
      this.start = this.current;
      const type = this.getNextToken();
      let substr = this.str.substr(this.start, this.current - this.start);
      if (type === TokenType.NUMBER) {
        substr = Number(substr);
      }
      const secondaryType = this.getSecondaryType(type, substr);
      this.tokens.push(new Token(type, substr, this.line, secondaryType));
    }
    this.tokens.push(new Token(TokenType.EOF, "", this.line));
    return this.tokens;
  };

  getNextToken = () => {
    const c = this.getNextCharacter();
    switch (c) {
      case " ":
        return TokenType.SPACE;
      case "\n":
        this.line++;
        return TokenType.NEWLINE;
      case "\t":
        return TokenType.TAB;
      case "+":
        return this.isNextChar("=") ? TokenType.PLUS_EQUAL : TokenType.PLUS;
      case "-":
        return this.isNextChar("=") ? TokenType.MINUS_EQUAL : TokenType.MINUS;
      case "*":
        return this.isNextChar("=") ? TokenType.STAR_EQUAL : TokenType.STAR;
      case "!":
        return this.isNextChar("=") ? TokenType.BANG_EQUAL : TokenType.BANG;
      case "<":
        return this.processLess();
      case ">":
        return this.processGreater();
      case "=":
        return this.isNextChar("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL;
      case "/":
        return this.processSlash();
      case "%":
        return TokenType.MODULO;
      case "(":
        return TokenType.LEFT_PAREN;
      case ")":
        return TokenType.RIGHT_PAREN;
      case "{":
        return TokenType.LEFT_BRACE;
      case "}":
        return TokenType.RIGHT_BRACE;
      case ";":
        return TokenType.SEMICOLON;
      case ".":
        return TokenType.DOT;
      case ",":
        return TokenType.COMMA;
      case "|":
        return this.processPipe();
      case "&":
        return this.processAmpersand();
      case "'":
      case '"':
        return this.processString(c);
      default:
        if (this.isDigit(c)) {
          return this.processNumber();
        } else if (this.isAlpha(c)) {
          return this.processIdentifier();
        } else {
          return TokenType.UNKNOWN;
        }
    }
  };

  processLess = () => {
    if (this.isNextChar("<")) {
      if (this.isNextChar("=")) {
        return TokenType.LESS_LESS_EQUAL;
      }
      return TokenType.LESS_LESS;
    }
    return TokenType.LESS;
  };

  processGreater = () => {
    if (this.isNextChar(">")) {
      if (this.isNextChar("=")) {
        return TokenType.GREATER_GREATER_EQUAL;
      }
      return TokenType.GREATER_GREATER;
    }
    return TokenType.GREATER;
  };

  processSlash = () => {
    if (this.isNextChar("=")) {
      return TokenType.SLASH_EQUAL;
    }
    if (this.isNextChar("/")) {
      while (this.peek() !== "\n" && !this.isEnd()) {
        this.getNextCharacter();
      }
      return TokenType.COMMENT;
    }
    if (this.isNextChar("*")) {
      while (
        (this.peek() !== "*" || this.peekNext() !== "/") &&
        !this.isEnd()
      ) {
        if (this.peek() === "\n") {
          this.line++;
        }
        this.getNextCharacter();
      }
      this.getNextCharacter(); // Star
      this.getNextCharacter(); // Slash
      return TokenType.BLOCK_COMMENT;
    }
    return TokenType.SLASH;
  };

  processPipe = () => {
    if (this.isNextChar("|")) {
      return TokenType.PIPE_PIPE;
    }
    if (this.isNextChar("=")) {
      return TokenType.PIPE_EQUAL;
    }
    return TokenType.PIPE;
  };

  processAmpersand = () => {
    if (this.isNextChar("&")) {
      return TokenType.AMPERSAND_AMPERSAND;
    }
    if (this.isNextChar("=")) {
      return TokenType.AMPERSAND_EQUAL;
    }
    return TokenType.AMPERSAND;
  };

  processString = (quote) => {
    while (this.peek() !== quote && !this.isEnd()) {
      if (this.peek() === "\n") {
        this.line++;
      }
      this.getNextCharacter();
    }
    this.getNextCharacter(); // Closing quote
    return TokenType.STRING;
  };

  processNumber = () => {
    while (this.isDigit(this.peek())) {
      this.getNextCharacter();
    }
    if (this.peek() === "." && this.isDigit(this.peekNext())) {
      this.getNextCharacter(); // Decimal point
      while (this.isDigit(this.peek())) {
        this.getNextCharacter();
      }
    }
    return TokenType.NUMBER;
  };

  processIdentifier = () => {
    while (this.isAlphaNumeric(this.peek())) {
      this.getNextCharacter();
    }
    switch (this.str.substr(this.start, this.current - this.start)) {
      case "and":
        return TokenType.AND;
      case "or":
        return TokenType.OR;
      case "not":
        return TokenType.NOT;
      case "if":
        return TokenType.IF;
      case "else":
        return TokenType.ELSE;
      case "true":
        return TokenType.TRUE;
      case "false":
        return TokenType.FALSE;
      case "var":
        return TokenType.VAR;
      case "for":
        return TokenType.FOR;
      case "while":
        return TokenType.WHILE;
      case "null":
        return TokenType.NULL;
      case "this":
        return TokenType.THIS;
      case "other":
        return TokenType.OTHER;
      case "global":
        return TokenType.GLOBAL;
      case "break":
        return TokenType.BREAK;
      case "continue":
        return TokenType.CONTINUE;
      case "return":
        return TokenType.RETURN;
      case "print":
        return TokenType.PRINT;
      default:
        return TokenType.IDENTIFIER;
    }
  };

  peek = () => {
    if (this.isEnd()) {
      return "\0";
    }
    return this.str[this.current];
  };

  peekNext = () => {
    if (this.current + 1 >= this.str.length) {
      return "\0";
    }
    return this.str[this.current + 1];
  };

  getNextCharacter = () => {
    this.current++;
    return this.str[this.current - 1];
  };

  isNextChar = (c) => {
    if (this.isEnd()) {
      return false;
    }
    if (this.str[this.current] !== c) {
      return false;
    }
    this.current++;
    return true;
  };

  isDigit = (c) => {
    return c >= "0" && c <= "9";
  };

  isAlpha = (c) => {
    return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_";
  };

  isAlphaNumeric = (c) => {
    return this.isAlpha(c) || this.isDigit(c);
  };

  isEnd = () => {
    return this.current >= this.str.length;
  };

  getSecondaryType = (type, substr) => {
    if (type === TokenType.IDENTIFIER) {
      if (this.args?.includes(substr)) {
        return TokenType.ARG;
      }
      if (appDefined.includes(substr)) {
        return TokenType.APP_DEFINED;
      }
      if (this.names?.includes(substr)) {
        return TokenType.USER_DEFINED;
      }
    }
    return TokenType.NONE;
  };
}

export default Tokenizer;
