import * as antlr4 from './antlr4/index.web.js';
import PEGLexer from './PEGLexer.js';
import PEGParser from './PEGParser.js';

const input = document.getElementById('input');
const error = document.getElementById('error');

function setCursorToEnd(contentEditableElement)
{
    let range,selection;
    if(document.createRange)
    {
        range = document.createRange();
        range.selectNodeContents(contentEditableElement);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    else if(document.selection)
    { 
        range = document.body.createTextRange();
        range.moveToElementText(contentEditableElement);
        range.collapse(false);
        range.select();
    }
}


class CustomErrorListener extends antlr4.ErrorListener {
    constructor() {
        super();
        this.errorMessage = '';
        this.errorColumn = -1;
    }

    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        this.errorMessage = `Line ${line}:${column} - ${msg}`;
        this.errorColumn = column;
    }
}

class Visitor {
    visitChildren(ctx) {
      if (!ctx) {
        return;
      }
  
      if (ctx.children) {
        return ctx.children.map(child => {
          if (child.children && child.children.length != 0) {
            return child.accept(this);
          } else {
            return child.getText();
          }
        });
      }
    }
}

function verifyGrammar() {
    let text = input.textContent;
    const chars = new antlr4.InputStream(text + "\n"); 
    const lexer = new PEGLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new PEGParser(tokens);
    parser.buildParseTrees = true;
    
    const errorListener = new CustomErrorListener();
    parser.removeErrorListeners(); // Remove os ouvintes de erro padrão
    parser.addErrorListener(errorListener); // Anexa nosso ouvinte de erro personalizado

    const tree = parser.rules();
    

    if (parser.syntaxErrorsCount > 0) {
        error.textContent = errorListener.errorMessage;

        const errorCharIndex = errorListener.errorColumn;
        const beforeError = text.slice(0, errorCharIndex);
        const errorChar = text.charAt(errorCharIndex);
        const afterError = text.slice(errorCharIndex + 1);

        const html = `${beforeError}<span class="error">${errorChar}</span>${afterError}`;

        input.innerHTML = html;
        setCursorToEnd(input);
    } else {
        error.textContent = '';

        const html = text.replace(/<span class="error">/g, '').replace(/<\/span>/g, '');
        input.innerHTML = html;
        setCursorToEnd(input);
        console.log(parseTreeToJson(tree));
    }
}

function parseTreeToJson(tree) {
    const ruleName = PEGParser.ruleNames[tree.ruleIndex];
    const result = { rule: ruleName };
    tree.accept(new Visitor());

    if (tree.children) {
        result.children = tree.children.map(child => parseTreeToJson(child));
    } else {
        if (tree.symbol) {
            result.value = tree.symbol.text;
        }
    }

    if (result.rule === 'peg_expr' || result.rule === 'peg_unary_op' || result.rule === 'peg_factor') {
        return result.children[0];
    }

    return result;
}

input.addEventListener('input', verifyGrammar);
