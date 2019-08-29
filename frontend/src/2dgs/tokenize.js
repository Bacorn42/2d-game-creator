import Tokenizer from './Tokenizer';

const tokenize = (str, args, names) => {
  const tokenizer = new Tokenizer(str, args, names);
  return tokenizer.tokenize();
}

export default tokenize;