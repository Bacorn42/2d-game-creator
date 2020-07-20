const Stmt = {};

Stmt.Expression = class Expression {
  constructor(expr) {
    this.expr = expr;
  }

  execute(executor) {
    executor.executeExpression(this);
  }
};

Stmt.Block = class Block {
  constructor(stmts) {
    this.stmts = stmts;
  }

  execute(executor) {
    executor.executeBlock(this);
  }
};

Stmt.If = class If {
  constructor(condition, thenBranch, elseBranch) {
    this.condition = condition;
    this.thenBranch = thenBranch;
    this.elseBranch = elseBranch;
  }

  execute(executor) {
    executor.executeIf(this);
  }
};

Stmt.For = class For {
  constructor(init, condition, post, body) {
    this.init = init;
    this.condition = condition;
    this.post = post;
    this.body = body;
  }

  execute(executor) {
    executor.executeFor(this);
  }
};

Stmt.While = class While {
  constructor(condition, body) {
    this.condition = condition;
    this.body = body;
  }

  execute(executor) {
    executor.executeWhile(this);
  }
};

Stmt.Return = class Return {
  constructor(expr) {
    this.expr = expr;
  }

  execute(executor) {
    executor.executeReturn(this);
  }
};

Stmt.Break = class Break {
  execute(executor) {
    executor.executeBreak(this);
  }
};

Stmt.Continue = class Continue {
  execute(executor) {
    executor.executeContinue(this);
  }
};

Stmt.Print = class Print {
  constructor(expr) {
    this.expr = expr;
  }

  execute(executor) {
    executor.executePrint(this);
  }
};

Stmt.Empty = class Empty {
  execute(executor) {}
};

export default Stmt;
