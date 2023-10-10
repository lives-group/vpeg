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

class Visitor extends antlr4.ParseTreeVisitor {
  constructor(tokens) {
    super(tokens);
  }

  visitProduction(ctx) {
    const ruleName = ctx.ID().getText();
    const expression = this.visit(ctx.peg_expr());
    return { rule: ruleName, expression };
  }

  visitPeg_expr(ctx) {
    if (ctx.peg_seq()) {
      return this.visit(ctx.peg_seq());
    } else {
      const left = this.visit(ctx.peg_seq(0));
      const right = this.visit(ctx.peg_expr());
      return { operator: '/', left, right };
    }
  }

  visitPeg_seq(ctx) {
    const prefixes = ctx.peg_prefix().map(prefix => this.visit(prefix));
    return prefixes;
  }

  visitPeg_prefix(ctx) {
    if (ctx.AMPERSAND()) {
      const expression = this.visit(ctx.peg_unary_op());
      return { operator: '&', expression };
    } else if (ctx.EXCLAMATION()) {
      const expression = this.visit(ctx.peg_unary_op());
      return { operator: '!', expression };
    } else {
      return this.visit(ctx.peg_unary_op());
    }
  }

  visitPeg_unary_op(ctx) {
    const factor = this.visit(ctx.peg_factor());
    if (ctx.QUESTION()) {
      return { operator: '?', expression: factor };
    } else if (ctx.STAR()) {
      return { operator: '*', expression: factor };
    } else if (ctx.PLUS()) {
      return { operator: '+', expression: factor };
    } else {
      return factor;
    }
  }

  visitPeg_factor(ctx) {
    if (ctx.STRING_LITERAL()) {
      return ctx.STRING_LITERAL().getText();
    } else if (ctx.ID()) {
      return ctx.ID().getText();
    } else if (ctx.range()) {
      return this.visit(ctx.range());
    } else if (ctx.LAMBDA()) {
      return 'empty';
    } else if (ctx.peg_expr()) {
      return this.visit(ctx.peg_expr());
    } else if (ctx.CHARACTER_CLASS()) {
      return ctx.CHARACTER_CLASS().getText();
    } else {
      return ctx.RANGE_LITERAL().getText();
    }
  }

  visitRange(ctx) {
    const start = ctx.RANGE_CHAR(0).getText();
    const end = ctx.RANGE_CHAR(1).getText();
    return { type: 'range', start, end };
  }

  visit(ctx) {
    if (Array.isArray(ctx)) {
        return ctx.map(function(child) {
            return child.accept(this);
        }, this);
    } else {
        return ctx.accept(this);
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
    const visitor = new Visitor();
    const parsedData = visitor.visit(tree.children[0]);
    console.log(parsedData);

    

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
