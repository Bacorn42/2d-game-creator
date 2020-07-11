class BreakException extends Error {
  constructor(value) {
    super("Break Exception");
    this.value = value;
  }
}

export default BreakException;
