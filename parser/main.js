import * as antlr4 from 'antlr4';
import CalculatorLexer from './CalculatorLexer.js';
import CalculatorParser from './CalculatorParser.js';

const input = "3  2 * (9 - 2)\n";
const chars = new antlr4.InputStream(input);
const lexer = new CalculatorLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new CalculatorParser(tokens);
parser.buildParseTrees = true;
const tree = parser.prog();

// Verifica a quantidade de erros
parser.syntaxErrorsCount 

console.log(tree.toStringTree(parser.ruleNames));