let memory = { 
    last: null,
    lastIndex: 0,
    statement: [],
    operands: ['+', '-', '/', '*', '(', ')', '^']
};
let history = {};

const CalcButtonPress = function(x){
    let {last, lastIndex, statement, operands} = memory;
    if (last == null && typeof(x) == 'number'){
      statement = [...statement, [x]]
      last = statement[statement.length - 1]
      lastIndex = statement.length - 1
    } else if (typeof(last) == 'object' && typeof(x) == 'number'){
      statement = [...statement, x]
      last = statement[lastIndex]
    }
    if (operands.includes(last) && typeof(x) == 'number'){
      statement = [...statement, [x]]
      last = statement[statement.length - 1]
      lastIndex = statement.length - 1
    }
    if (typeof(last) == 'object' && operands.includes(x)){
      statement = [statement, x]
      last = x
      lastIndex = statement.length - 1
    } else if (operands.includes(last) && operands.includes(x)){
      statement[lastIndex] = x
      last = x
    }
    updateMemory(last, lastIndex, statement, operands)
    updateDisplay(statement);
    //'soft' calculate
};

const calcClearPress = function(){
    updateDisplay(statement);
}

const calcDelPress = function(){
       
    console.log("after " + JSON.stringify(memory))
    updateMemory(last, lastIndex, statement, operands)
    updateDisplay(statement);
}

const updateDisplay = function(statement){
    const expressionDisplay = document.getElementById("exp")
    expressionDisplay.innerText = statement.join('')
}

const equal = function(){

}

const updateMemory = function(last, lastIndex, statement, operands){
    //console.log("updating")
    memory = {
        last,
        lastIndex,
        statement,
        operands
    };
    console.log(memory)
}


//Pseudocode first

/* 
//most buttons
statement is ['111', '+', '222', '*',...]
last is '222'
lastIndex is 2
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

if last is array (length > 0)
  select the array at statement[lastIndex] then .pop()?
  update last to the array at statement[lastIndex -1]
  lastIndex remains the same
else (when length = 0)
  remove array via pop?
  update last to the array at statement[lastIndex-1]
  lastIndex--
if last is an operator
  pop statement?
  last to the array at statement[lastIndex -1]
  lastIndex--
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
