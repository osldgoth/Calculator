
let statement = [];
let history = {};

const CalcButtonPress = function(x){
    if (statement.length == 0 && Number(x)){ //
      statement = [...statement, `${x}`]
    } else if (Number(statement[statement.length - 1]) && Number(x)){ 

      statement = [...statement[statement.length - 1].concat(`${x}`)]
    } else if (Number(statement[statement.length - 1]) && Number(x)){
      statement = [...statement, `${x}`]
    } else if (Number(statement[statement.length - 1]) && Number(x)){
      statement[statement.length - 1] = `${x}`
    }
    updateDisplay(statement);
    //'soft' calculate
};

const calcClearPress = function(){
    updateDisplay(statement);
}

const calcDelPress = function(){   
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

if statement is 0 length // it is an empty array
    OR if last element in statement is NAN //it is an operator
    AND if x is Number
    OR last element in statement is a number
    AND x is NAN //it is an operator
    ((1 OR 2) AND 3) OR (4 AND 5)
      push x onto statement as a string
  else if last element in statement is a number 
    AND x is a number
      pop last element off statement, concat x
      push number back onto statement
  

if last element in statement is NAN 
  AND X is NAN //both are operators
    x replaces last element in statement





if last is null and x being number
  add x to statement as string
  update last (being the string at statement[statement.length-1])
  lastIndex becomes length of statement - 1
if last is a number and x is number
  add x to statement via concat
  update last (being the string at statement[statement.length-1])
  lastIndex remains the same
if last is an operator(ie NAN) and x is a number
  set statement equal an array with spread statement and x
  update last (being the array statment[statement.length-1])
  lastIndex becomes length of statement - 1
if last is a number and x is an operator
  set statement equal an array with spread statement and x
  update last (being the array statment[statement.length-1])
  lastIndex becomes length of statement - 1
if last and x are both operators
  x replaces last element in statement by using statement and lastIndex set to x
  update last (being the string at statement[statement.length-1])
  lastIndex remains the same
end
updateMemory
update display
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

//button clicked 'x' (for most buttons)
if last item and x are both numbers
    concat last item and x in memory
    set concat as last
if last is a number and x is an operator or 
   last is an operator and x is a number
    push x into statement
    set last to x
    set lastIndex
if last item and x are both operators
    x replaces last item
end
set session storage
update display



//button clicked 'equals' --recursive oppertunity
//order of opperations -carefuly
 does statement contain a '(', if so, and more than one, find last
    --assuming closing ')' at end if none supplied, maybe add them in?
    calculate inside

    for loop + 'reducer'
*/
