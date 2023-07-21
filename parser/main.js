import * as antlr4 from '../antlr4/index.web.js';
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
    }
}

input.addEventListener('input', verifyGrammar);
