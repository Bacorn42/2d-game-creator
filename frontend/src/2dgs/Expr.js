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

export default Expr;
