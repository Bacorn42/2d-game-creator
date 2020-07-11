class ReturnException extends Error {
  constructor(value) {
    super("Return exception");
    this.value = value;
  }
}

export default ReturnException;
