grammar PEG;

/***
 * Grammar Rule Section
 ***/

rules:
   production+
;

// A definition of an APEG rule
production:
   ID ':' peg_expr ';'
;

/***
 * PEG Expressions
 ***/

// Definition of the right side of a PEG
// This rule defines that the CHOICE operator has the lowest precedence 
// The precedence of CHOICE operator is 1
// CHOICE is an associative operator. We decided for right association because it may be faster to interpret
peg_expr:
  peg_seq '/' e=peg_expr
 |
  peg_seq
;

// This rule defines a sequence operator: e1 e2 
// The precedence of sequence operator is 2
peg_seq: 
   peg_unary_op
   peg_unary_op+
  |
   peg_unary_op
  |
   '\u03bb' // LAMBDA parsing expression
;


// This rule defines the operators with precedence 4 and 3  
// e? (Optional with precedence 4
// e* (Zero-or-more with precedence 4)
// e+ (One-or-more with precedence 4)
// &e (And-predicate with precedence 3)
// !e (Not-predicate with precedence 3)
peg_unary_op:
   peg_factor '?'
  | 
   peg_factor '*'
  | 
   peg_factor '+'
  |
   peg_factor
  |
   '&' peg_factor
  |
   '!' peg_factor 
;

// This rule defines the other operators and basic expressions
// ' ' (Literal string with precedence 5)
// [ ] (Character class with precedence 5)
// _ (Any character with precedence 5)
// (e) (Grouping with precedence 5)
// A<...> (non-terminal basic expression)
// \lambda (empty basic expression)
peg_factor:
   STRING_LITERAL
  |
   ntcall
  |
   range
  |
   '_' 
  |
   '(' peg_expr ')'
;

ntcall:
  ID 
;

range: 
  RANGE_LITERAL
;

/*************************************************
 ***************** Lexical *************************
 *************************************************/

/*
 * Lexical rule for a range (character group)
 */

RANGE_LITERAL: RANGE_CHAR '..' RANGE_CHAR;
fragment RANGE_CHAR:
   ESC
 | ~('\n' | '\r' | '\t' | '\b' | '\f' | ' ' | '\\' | '\'')
;

/*
 * Literals
 */

STRING_LITERAL: '\'' (ESC | ~('\'' | '\\'))* '\'';

ESC : '\\' (SPECIAL_ESC | HEX_ESC | TOOL_ESC);

fragment SPECIAL_ESC: ('n' | 'r' | 't' | 'b' | 'f');
fragment HEX_ESC: 'u' XDIGIT XDIGIT XDIGIT XDIGIT;
fragment TOOL_ESC: ('\'' | '\\');

fragment XDIGIT :
    '0' .. '9'
  | 'a' .. 'f'
  | 'A' .. 'F'
  ;
fragment LETTER : 'a'..'z' | 'A'..'Z';
fragment DIGIT : '0'..'9';
ID : LETTER (LETTER | DIGIT | '_')*;

/*
 * Comments and whitespaces
 */
 
WS : (' ' | '\t' | '\r' | '\n') -> skip;
COMMENT : '/*' .*? ('*/' | EOF) -> skip ;
LINE_COMMENT : '--' ~('\n'|'\r')* '\r'? '\n' -> skip;