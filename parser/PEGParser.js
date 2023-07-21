// Generated from .\\parser\\PEG.g4 by ANTLR 4.13.0
// jshint ignore: start
import * as antlr4 from '../antlr4/index.web.js';
import PEGListener from './PEGListener.js';
const serializedATN = [4,1,19,74,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,
2,5,7,5,2,6,7,6,2,7,7,7,1,0,4,0,18,8,0,11,0,12,0,19,1,1,1,1,1,1,1,1,1,1,
1,2,1,2,1,2,1,2,1,2,3,2,32,8,2,1,3,1,3,4,3,36,8,3,11,3,12,3,37,1,3,1,3,3,
3,42,8,3,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,58,
8,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,3,5,68,8,5,1,6,1,6,1,7,1,7,1,7,0,0,8,
0,2,4,6,8,10,12,14,0,0,79,0,17,1,0,0,0,2,21,1,0,0,0,4,31,1,0,0,0,6,41,1,
0,0,0,8,57,1,0,0,0,10,67,1,0,0,0,12,69,1,0,0,0,14,71,1,0,0,0,16,18,3,2,1,
0,17,16,1,0,0,0,18,19,1,0,0,0,19,17,1,0,0,0,19,20,1,0,0,0,20,1,1,0,0,0,21,
22,5,16,0,0,22,23,5,1,0,0,23,24,3,4,2,0,24,25,5,2,0,0,25,3,1,0,0,0,26,27,
3,6,3,0,27,28,5,3,0,0,28,29,3,4,2,0,29,32,1,0,0,0,30,32,3,6,3,0,31,26,1,
0,0,0,31,30,1,0,0,0,32,5,1,0,0,0,33,35,3,8,4,0,34,36,3,8,4,0,35,34,1,0,0,
0,36,37,1,0,0,0,37,35,1,0,0,0,37,38,1,0,0,0,38,42,1,0,0,0,39,42,3,8,4,0,
40,42,5,4,0,0,41,33,1,0,0,0,41,39,1,0,0,0,41,40,1,0,0,0,42,7,1,0,0,0,43,
44,3,10,5,0,44,45,5,5,0,0,45,58,1,0,0,0,46,47,3,10,5,0,47,48,5,6,0,0,48,
58,1,0,0,0,49,50,3,10,5,0,50,51,5,7,0,0,51,58,1,0,0,0,52,58,3,10,5,0,53,
54,5,8,0,0,54,58,3,10,5,0,55,56,5,9,0,0,56,58,3,10,5,0,57,43,1,0,0,0,57,
46,1,0,0,0,57,49,1,0,0,0,57,52,1,0,0,0,57,53,1,0,0,0,57,55,1,0,0,0,58,9,
1,0,0,0,59,68,5,14,0,0,60,68,3,12,6,0,61,68,3,14,7,0,62,68,5,10,0,0,63,64,
5,11,0,0,64,65,3,4,2,0,65,66,5,12,0,0,66,68,1,0,0,0,67,59,1,0,0,0,67,60,
1,0,0,0,67,61,1,0,0,0,67,62,1,0,0,0,67,63,1,0,0,0,68,11,1,0,0,0,69,70,5,
16,0,0,70,13,1,0,0,0,71,72,5,13,0,0,72,15,1,0,0,0,6,19,31,37,41,57,67];


const atn = new antlr4.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class PEGParser extends antlr4.Parser {

    static grammarFileName = "PEG.g4";
    static literalNames = [ null, "':'", "';'", "'/'", "'\\u03BB'", "'?'", 
                            "'*'", "'+'", "'&'", "'!'", "'_'", "'('", "')'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, "RANGE_LITERAL", 
                             "STRING_LITERAL", "ESC", "ID", "WS", "COMMENT", 
                             "LINE_COMMENT" ];
    static ruleNames = [ "rules", "production", "peg_expr", "peg_seq", "peg_unary_op", 
                         "peg_factor", "ntcall", "range" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = PEGParser.ruleNames;
        this.literalNames = PEGParser.literalNames;
        this.symbolicNames = PEGParser.symbolicNames;
    }



	rules() {
	    let localctx = new RulesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, PEGParser.RULE_rules);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 17; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 16;
	            this.production();
	            this.state = 19; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===16);
	    } catch (re) {
	    	if(re instanceof antlr4.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	production() {
	    let localctx = new ProductionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, PEGParser.RULE_production);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 21;
	        this.match(PEGParser.ID);
	        this.state = 22;
	        this.match(PEGParser.T__0);
	        this.state = 23;
	        this.peg_expr();
	        this.state = 24;
	        this.match(PEGParser.T__1);
	    } catch (re) {
	    	if(re instanceof antlr4.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	peg_expr() {
	    let localctx = new Peg_exprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, PEGParser.RULE_peg_expr);
	    try {
	        this.state = 31;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 26;
	            this.peg_seq();
	            this.state = 27;
	            this.match(PEGParser.T__2);
	            this.state = 28;
	            localctx.e = this.peg_expr();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 30;
	            this.peg_seq();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	peg_seq() {
	    let localctx = new Peg_seqContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, PEGParser.RULE_peg_seq);
	    var _la = 0;
	    try {
	        this.state = 41;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 33;
	            this.peg_unary_op();
	            this.state = 35; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 34;
	                this.peg_unary_op();
	                this.state = 37; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while((((_la) & ~0x1f) === 0 && ((1 << _la) & 93952) !== 0));
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 39;
	            this.peg_unary_op();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 40;
	            this.match(PEGParser.T__3);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	peg_unary_op() {
	    let localctx = new Peg_unary_opContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, PEGParser.RULE_peg_unary_op);
	    try {
	        this.state = 57;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 43;
	            this.peg_factor();
	            this.state = 44;
	            this.match(PEGParser.T__4);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 46;
	            this.peg_factor();
	            this.state = 47;
	            this.match(PEGParser.T__5);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 49;
	            this.peg_factor();
	            this.state = 50;
	            this.match(PEGParser.T__6);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 52;
	            this.peg_factor();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 53;
	            this.match(PEGParser.T__7);
	            this.state = 54;
	            this.peg_factor();
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 55;
	            this.match(PEGParser.T__8);
	            this.state = 56;
	            this.peg_factor();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	peg_factor() {
	    let localctx = new Peg_factorContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, PEGParser.RULE_peg_factor);
	    try {
	        this.state = 67;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 14:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 59;
	            this.match(PEGParser.STRING_LITERAL);
	            break;
	        case 16:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 60;
	            this.ntcall();
	            break;
	        case 13:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 61;
	            this.range();
	            break;
	        case 10:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 62;
	            this.match(PEGParser.T__9);
	            break;
	        case 11:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 63;
	            this.match(PEGParser.T__10);
	            this.state = 64;
	            this.peg_expr();
	            this.state = 65;
	            this.match(PEGParser.T__11);
	            break;
	        default:
	            throw new antlr4.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	ntcall() {
	    let localctx = new NtcallContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, PEGParser.RULE_ntcall);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 69;
	        this.match(PEGParser.ID);
	    } catch (re) {
	    	if(re instanceof antlr4.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	range() {
	    let localctx = new RangeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, PEGParser.RULE_range);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 71;
	        this.match(PEGParser.RANGE_LITERAL);
	    } catch (re) {
	    	if(re instanceof antlr4.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

PEGParser.EOF = antlr4.Token.EOF;
PEGParser.T__0 = 1;
PEGParser.T__1 = 2;
PEGParser.T__2 = 3;
PEGParser.T__3 = 4;
PEGParser.T__4 = 5;
PEGParser.T__5 = 6;
PEGParser.T__6 = 7;
PEGParser.T__7 = 8;
PEGParser.T__8 = 9;
PEGParser.T__9 = 10;
PEGParser.T__10 = 11;
PEGParser.T__11 = 12;
PEGParser.RANGE_LITERAL = 13;
PEGParser.STRING_LITERAL = 14;
PEGParser.ESC = 15;
PEGParser.ID = 16;
PEGParser.WS = 17;
PEGParser.COMMENT = 18;
PEGParser.LINE_COMMENT = 19;

PEGParser.RULE_rules = 0;
PEGParser.RULE_production = 1;
PEGParser.RULE_peg_expr = 2;
PEGParser.RULE_peg_seq = 3;
PEGParser.RULE_peg_unary_op = 4;
PEGParser.RULE_peg_factor = 5;
PEGParser.RULE_ntcall = 6;
PEGParser.RULE_range = 7;

class RulesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PEGParser.RULE_rules;
    }

	production = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ProductionContext);
	    } else {
	        return this.getTypedRuleContext(ProductionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.enterRules(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.exitRules(this);
		}
	}


}



class ProductionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PEGParser.RULE_production;
    }

	ID() {
	    return this.getToken(PEGParser.ID, 0);
	};

	peg_expr() {
	    return this.getTypedRuleContext(Peg_exprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.enterProduction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.exitProduction(this);
		}
	}


}



class Peg_exprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PEGParser.RULE_peg_expr;
        this.e = null;
    }

	peg_seq() {
	    return this.getTypedRuleContext(Peg_seqContext,0);
	};

	peg_expr() {
	    return this.getTypedRuleContext(Peg_exprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.enterPeg_expr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.exitPeg_expr(this);
		}
	}


}



class Peg_seqContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PEGParser.RULE_peg_seq;
    }

	peg_unary_op = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Peg_unary_opContext);
	    } else {
	        return this.getTypedRuleContext(Peg_unary_opContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.enterPeg_seq(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.exitPeg_seq(this);
		}
	}


}



class Peg_unary_opContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PEGParser.RULE_peg_unary_op;
    }

	peg_factor() {
	    return this.getTypedRuleContext(Peg_factorContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.enterPeg_unary_op(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.exitPeg_unary_op(this);
		}
	}


}



class Peg_factorContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PEGParser.RULE_peg_factor;
    }

	STRING_LITERAL() {
	    return this.getToken(PEGParser.STRING_LITERAL, 0);
	};

	ntcall() {
	    return this.getTypedRuleContext(NtcallContext,0);
	};

	range() {
	    return this.getTypedRuleContext(RangeContext,0);
	};

	peg_expr() {
	    return this.getTypedRuleContext(Peg_exprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.enterPeg_factor(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.exitPeg_factor(this);
		}
	}


}



class NtcallContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PEGParser.RULE_ntcall;
    }

	ID() {
	    return this.getToken(PEGParser.ID, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.enterNtcall(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.exitNtcall(this);
		}
	}


}



class RangeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = PEGParser.RULE_range;
    }

	RANGE_LITERAL() {
	    return this.getToken(PEGParser.RANGE_LITERAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.enterRange(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof PEGListener ) {
	        listener.exitRange(this);
		}
	}


}




PEGParser.RulesContext = RulesContext; 
PEGParser.ProductionContext = ProductionContext; 
PEGParser.Peg_exprContext = Peg_exprContext; 
PEGParser.Peg_seqContext = Peg_seqContext; 
PEGParser.Peg_unary_opContext = Peg_unary_opContext; 
PEGParser.Peg_factorContext = Peg_factorContext; 
PEGParser.NtcallContext = NtcallContext; 
PEGParser.RangeContext = RangeContext; 
