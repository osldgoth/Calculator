
let statement = [];
let history = {};

const CalcButtonPress = function(x){
  const endElement = statement.slice(-1)
  if (((statement.length == 0 || isNaN(Number(endElement))) && Number(x)) 
      || ( Number(endElement) && isNaN(Number(x)))){
    statement.push(x.toString())
  } else if (Number(endElement) && (Number(x) || (x === '00' || x === 0))){
    statement.push(statement.pop().concat(x).toString())
  } else if (isNaN(Number(endElement)) && isNaN(Number(x))) {
    statement.splice(-1, 1, x.toString())
  } 
  updateDisplay(statement);
  console.log(statement)
  //'soft' calculate
};

const calcClearPress = function(){
  statement = []
  updateDisplay(statement);
}

const calcDelPress = function(){
  const endElement = statement.slice(-1).toString()
  if (endElement.length <= 1 ){
    statement.pop();
  } else if (endElement.length > 1){
    statement.splice(-1, 1, endElement.substring(0, endElement.length - 1))
  }
    updateDisplay(statement);
}

const updateDisplay = function(statement){
    const expressionDisplay = document.getElementById("exp")
    expressionDisplay.innerText = statement.join('')
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
    AND X is NaN //both are operators
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
