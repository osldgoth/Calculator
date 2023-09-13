
let statement = [];
let decimalFlag = false;
let history = {};

const CalcButtonPress = function(x){
  const endElement = statement.slice(-1).toString()

    //(statement is 0 length OR endElement is NaN) AND x is Number
  if (( (statement.length === 0 || isNaN(Number(endElement)) || Number(endElement) === 0) && Number(x))
    //OR (endElement is a number AND x is NaN) //it is an operator
      || ( Number(endElement) && isNaN(Number(x)))
  ){

    statement.push(x.toString())

    //endElement is a number AND (x is a number OR x is '00' OR x is 0)
  } else if (Number(endElement) && (Number(x) || (x === '00' || x === 0))){

    statement.push(statement.pop().concat(x).toString())

    //endElement in statement is (NaN OR a decimal) AND x is NaN -- I will never have *-, +- ect using this code, which is fine. just a note.
  } else if ((isNaN(Number(endElement)) || endElement === '.') && isNaN(Number(x))) {
    //Bug, current code prevents operators first so no negitive first number, however one can input a decimal first, then minus. this effectively starts the statement with a negitive number
    // or further bug start with any operator.
    const elementBeforeDecimal = statement.slice(-2, -1).toString()
    //How many items to remove to replace the operator
    // removes "[operator]0."
    
    elementBeforeDecimal.length === 1 && elementBeforeDecimal === '0' ? spliceQuantity = 3: spliceQuantity = 1;

    statement.splice(-spliceQuantity, spliceQuantity, x.toString())

  }

  //--watch for numbers being split up ["2", "4", "7"...]
  const CalcButtonPressx = function(x){
    const endElement = statement.slice(-1).toString()
    const zeroToNine = ["0","1","2","3","4","5","6","7","8","9"]
    const statementLengthZero = statement.length === 0;
    const statementLengthOne = statement.length === 1;
    const statementLengthGTOne = statement.length >= 1;
  
    if (  (endElement === "-" && statementLengthGTOne && [...zeroToNine, ".", "*", "/", "+"].includes(x)) //NOT "00"
      || (["*", "/", "+"].includes(endElement) && [...zeroToNine, ".", "*", "/", "+", "-"].includes(x))){ //negative any other time //NOT "00"
        if ( (["*", "/", "+"].includes(x))  //replace "-" with one of these
          ||(["+"].includes(endElement) )){ //replace "+" with "-" but don't replace "*" or "/"
            statement.pop()
        }
        statement.push(x)
    } else if ( (statementLengthZero && [...zeroToNine, ".", "-"].includes(x)) //NOT "00" "*", "/", "+"
      || (endElement === "." && [...zeroToNine, "00", "*", "/", "+", "-"].includes(x)) //NOT "."
      || (endElement === "-" && statementLengthOne && [...zeroToNine, "."].includes(x)) //begin with a negative //NOT "00" "*", "/", "+", "-"
      || (zeroToNine.includes(endElement) && [...zeroToNine,"00", "*", "/", "+", "-" ].includes(x))){ //NOT "."
        statement.push(x)
    }else{
        console.log(`missed endElement ${endElement}, x ${x}`)
    }
    updateDisplay(statement);
    console.log("statement in calcBtnPrss", statement)
  }

  updateDisplay();
  //'soft' calculate
  softEqual()
};


const decimalButtonPress = function(x){
  
  const endElement = statement.slice(-1).toString()
  if (endElement === '.') {return}
  if (statement.length === 0 || isNaN(Number(endElement))){
    statement.push("0")
    statement.push(x)
  } else if (Number(endElement) || Number(endElement) === 0){
    statement.push(x.toString())
  }
  const endElementUpdated = statement.slice(-1).toString()
  if (endElementUpdated.includes('.')){
    decimalFlag = true;
  }
  updateDisplay();
}

const calcClearPress = function(){
  statement = []
  updateDisplay(statement);
}

const calcDelPress = function(){
  if (statement.length === 0){return}
  const endElement = statement.slice(-1).toString()
  if (endElement.length <= 1 ){
    statement.pop();
  } else if (endElement.length > 1){
    statement.splice(-1, 1, endElement.substring(0, endElement.length - 1))
  } 
  updateDisplay();
}

const updateDisplay = function(){
    const expressionDisplay = document.getElementById("exp")
    expressionDisplay.innerText = statement.join('')
}

const calcPlus = function(input){

  for(i = 0; i <= input.length - 1; i++){
    if (input[i] === "+"){
      let beforei = Number(input[i-1]);
      let afterI = Number(input[i+1]);
      //TODO edge case where end of statement is an operator
      const value = beforei + afterI;
      let output = [...input];
      output.splice(i-1, 3, value.toString());
      console.log(output)
      return output;
    }
  }
} 

const softEqual = function(){ 
  let statementCopy = [...statement]
  while(statementCopy.includes("+")){
    statementCopy = calcPlus(statementCopy);
  }
  console.log(statementCopy)


  /* const operatorIndicies = statement.reduce((ops, currentValue, index) => {
    if(["*","/","+","-"].includes(currentValue)){
      return {...ops, [currentValue]: [...ops[currentValue].concat(index)]};
    };
    return ops;
  }, {"*": [], "/": [], "+": [], "-": []}); */

  

  
}

const equal = function(){

}

//Pseudocode first

/* 
//most buttons
statement is ['111', '+', '222', '*',...]

if 1 statement is 0 length // it is an empty array
    OR 2 if endElement in statement is NaN //it is an operator
    AND 3 if x is Number
    OR 4 endElement in statement is a number
    AND 5 x is NaN //it is an operator
    ((1 OR 2) AND 3) OR (4 AND 5)
      push x onto statement as a string

  else if endElement in statement is a number 
    AND x is a number
      pop endElement off statement, concat x
      push number back onto statement
  else if endElement in statement is NaN 
    AND x is NaN //both are operators
        x replaces endElement in statement

+++++++++++++++++++++++++++++++++++++

// del button
statement is ['111', '+', '222', '*',...]

if last lessthan 1
  pop statement
else if last is greater than 1
  splice endElement in statement
end
updateMemory
update display

-----------------------------------

//button clicked 'equals' --recursive oppertunity
//order of opperations -carefuly
 does statement contain a '(', if so, and more than one, find last
    --assuming closing ')' at end if none supplied, maybe add them in?
    calculate inside

    for loop + 'reducer'
*/
