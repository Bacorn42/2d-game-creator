import Tokenizer from './Tokenizer';

const tokenize = (str) => {
  const tokenizer = new Tokenizer(str);
  return tokenizer.tokenize();
}

export default tokenize;