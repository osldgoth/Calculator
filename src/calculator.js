
let statement = [];
let history = {};

const CalcButtonPress = function(x){
  const endEmement = statement.slice(-1)
  if (((statement.length == 0 || isNaN(Number(endEmement))) && Number(x)) 
      || ( Number(endEmement) && isNaN(Number(x)))) {
    statement.push(x.toString())
  } else if (Number(endEmement) && Number(x)) {
    statement.push(statement.pop().concat(x).toString())
  } else if (isNaN(Number(endEmement)) && isNaN(Number(x))) {
    statement.splice(-1, 1, x.toString())
  }
  updateDisplay(statement);
  //'soft' calculate
};

const calcClearPress = function(){
  statement = []
  updateDisplay(statement);
}

const calcDelPress = function(){
  const endEmement = statement.slice(-1).toString()
  if (endEmement.length <= 1 ){
    statement.pop();
  } else if (endEmement.length > 1){
    statement.splice(-1, 1, endEmement.substring(0, endEmement.length - 1))
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
    OR 2 if last element in statement is NaN //it is an operator
    AND 3 if x is Number
    OR 4 last element in statement is a number
    AND 5 x is NaN //it is an operator
    ((1 OR 2) AND 3) OR (4 AND 5)
      push x onto statement as a string

  else if last element in statement is a number 
    AND x is a number
      pop last element off statement, concat x
      push number back onto statement
  else if last element in statement is NaN 
    AND X is NaN //both are operators
        x replaces last element in statement

+++++++++++++++++++++++++++++++++++++

// del button
statement is ['111', '+', '222', '*',...]

if last lessthan 1
  pop statement
else if last is greater than 1
  splice last element in statement
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
