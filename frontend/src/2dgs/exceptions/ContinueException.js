class ContinueException extends Error {
  constructor(value) {
    super("Continue Exception");
    this.value = value;
  }
}

export default ContinueException;
