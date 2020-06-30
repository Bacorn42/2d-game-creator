const Stmt = {};

Stmt.Expression = class Expression {
  constructor(expr) {
    this.expr = expr;
  }

  execute = (executor) => {
    executor.executeExpression(this);
  };
};

Stmt.Print = class Print {
  constructor(expr) {
    this.expr = expr;
  }

  execute = (executor) => {
    executor.executePrint(this);
  };
};

export default Stmt;
