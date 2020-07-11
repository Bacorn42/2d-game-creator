const Expr = {};

Expr.Binary = class Binary {
  constructor(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  evaluate = (evaluator) => {
    return evaluator.evaluateBinary(this);
  };
};

Expr.Literal = class Literal {
  constructor(value) {
    this.value = value;
  }

  evaluate = (evaluator) => {
    return evaluator.evaluateLiteral(this);
  };
};

Expr.Group = class Group {
  constructor(expr) {
    this.expr = expr;
  }

  evaluate = (evaluator) => {
    return evaluator.evaluateGroup(this);
  };
};

Expr.Logical = class Logical {
  constructor(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  evaluate = (evaluator) => {
    evaluator.evaluateLogical(this);
  };
};

Expr.Unary = class Unary {
  constructor(operator, expr) {
    this.operator = operator;
    this.expr = expr;
  }

  evaluate = (evaluator) => {
    return evaluator.evaluateUnary(this);
  };
};

Expr.Identifier = class Identifier {
  constructor(identifier) {
    this.identifier = identifier;
  }

  evaluate = (evaluator) => {
    return evaluator.evaluateIdentifier(this);
  };
};

Expr.Assign = class Assign {
  constructor(identifier, operator, right) {
    this.identifier = identifier;
    this.operator = operator;
    this.right = right;
  }

  evaluate = (evaluator) => {
    return evaluator.evaluateAssign(this);
  };
};

Expr.Dot = class Dot {
  constructor(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  evaluate = (evaluator) => {
    return evaluator.evaluateDot(this);
  };
};

Expr.Function = class Function {
  constructor(args, token) {
    this.args = args;
    this.token = token;
  }

  evaluate = (evaluator) => {
    return evaluator.evaluateFunction(this);
  };
};

export default Expr;
