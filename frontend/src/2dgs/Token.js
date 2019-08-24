const Token = function(type, value, line){
  this.type = type;
  this.value = value;
  this.line = line;
}

export default Token;