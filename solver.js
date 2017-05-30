class Solver {
	constructor(type, value){
		this.type = type;
		this.value = value;
	}
}

let splitArray = [];
let tokenize = function(str) {
	str.replace(/\s+/g, "");
	str=str.split("");

	var result=[];
	var letterCollector=[];
	var numberCollector=[];
		let collector = "";
	let tokenResult = [];
	str.forEach(function (char, index) {
		if(isDigit(char)) {
			numberCollector.push(char);
		} else if(char==".") {
			numberCollector.push(char);
		} else if (isLetter(char)) {
			if(numberCollector.length) {
				emptyNumberCollectorAsLiteral();
				result.push(new Solver("Operator", "*"));
			}
			letterCollector.push(char);
		} else if (isOperator(char)) {
			emptyNumberCollectorAsLiteral();
			emptyLetterCollectorAsVariables();
			result.push(new Solver("Operator", char));
		} else if (isLeftParenthesis(char)) {
			if(letterCollector.length) {
				result.push(new Solver("Function", letterCollector.join("")));
				letterCollector=[];
			} else if(numberCollector.length) {
				emptyNumberCollectorAsLiteral();
				result.push(new Solver("Operator", "*"));
			}
			result.push(new Solver("Left Parenthesis", char));
		} else if (isRightParenthesis(char)) {
			emptyLetterCollectorAsVariables();
			emptyNumberCollectorAsLiteral();
			result.push(new Solver("Right Parenthesis", char));
		} else if (isComma(char)) {
			emptyNumberCollectorAsLiteral();
			emptyLetterCollectorAsVariables();
			result.push(new Solver("Function Argument Separator", char));
		}
	});
	if (numberCollector.length) {
		emptyNumberCollectorAsLiteral();
	}
	if(letterCollector.length) {
		emptyLetterCollectorAsVariables();
	}
   result.forEach(function(token, index) {
splitArray.push(token.value);
});
return splitArray;
	function emptyLetterCollectorAsVariables() {
		var l = letterCollector.length;
		for (var i = 0; i < l; i++) {
			result.push(new Solver("Variable", letterCollector[i]));
          if(i< l-1) { //there are more Variables left
          	result.push(new Solver("Operator", "*"));
          }
      }
      letterCollector = []; 
  }

  function emptyNumberCollectorAsLiteral() {
  	if(numberCollector.length) {
  		result.push(new Solver("Literal", numberCollector.join("")));
  		numberCollector=[];
  	}
  }

}

	let isComma = function(ch) {
 return (ch === ",");
}
	 let isDigit = function(ch) {
 return /\d/.test(ch);
}
	let isLetter = function(ch)  {
 return /[a-z]/i.test(ch);
}
	let isOperator = function(ch) {
 return /\+|=|-|\*|\/|\^/.test(ch);
}
	let isLeftParenthesis = function(ch) {
		// body...
 return (ch === "(");
}
	let isRightParenthesis = function(ch)  {
		// body...
 return (ch == ")");
}

let eqn = "23 + 34 = 996 + 5";
tokenize(eqn);


module.exports = tokenize;
