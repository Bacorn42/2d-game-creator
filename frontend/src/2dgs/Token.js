import TokenType from './TokenType';

const Token = function(type, value, line, secondaryType){
  this.type = type;
  this.value = value;
  this.line = line;
  this.secondaryType = secondaryType || TokenType.NONE;
}

export default Token;