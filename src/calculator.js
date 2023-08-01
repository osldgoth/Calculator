// window.addEventListener('load', (event) => {
//     // if(sessionStorage.getItem("calculatorMemory")){
//     //     sessionStorage.removeItem("calculatorMemory")
//     // }

//     // if (!sessionStorage.getItem("calculatorMemory")){
//     //     sessionStorage.setItem("calculatorMemory", JSON.stringify(attempt));
//     //     // example storage:
//     //     // {statementIndex:#<if this is even needed?>, statement: [111, '+', 222, '*', '(', 333, '/', 444, ')'], ? }
              // statement: [[1,1,1], '+', [2,2,2], '*', '(', [3,3,3], '/', [4,4,4], ')'] --unnessary complexity?
//     //     //there may be an easier way to do this?
//     // }
//     if (!sessionStorage.getItem('calculatorMemoryHistory')){
//         //store calculatorMemory history - limit to 5?
//         sessionStorage.setItem('calculatorMemoryHistory', {})
//     }
//     //I can see how React would thrive here lol
// });

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
      //statement.push([x])
      console.log("<spread " + statement)
      statement = [...statement, [[x]]]
      console.log(">spread " + statement)

                //console.log('last before ' + last)
      last = statement[statement.length - 1] //lastIndex is 0 first time around, I can just use it here.
                //console.log('last after ' + last)
      lastIndex = statement.length - 1 //same?
      //console.log('a')
    } else if (typeof(last) == 'object' && typeof(x) == 'number'){ 
        //console.log('statement before ' + statement)
      //  console.log("<spread " + statement)
      statement = [...statement, x]
      //console.log(">spread " + statement)

      //statement[lastIndex].push(x) //why does this update last?
      //console.log("after statement " + statement)
      //          console.log('last prior ?' + last) 
      last = statement[lastIndex]
      //          console.log('last after ' + last)
      //console.log('b')
    }
    if (operands.includes(last) && typeof(x) == 'number'){
      //statement.push([x])
      statement = [...statement, [x]]
      //    console.log('last prior ' + last)
      last = statement[statement.length - 1]
      //    console.log('last after ' + last)
      lastIndex = statement.length - 1//?
      //console.log('c')
    }
    if (typeof(last) == 'object' && operands.includes(x)){
      //statement.push(x)
      statement = [statement, x]
      last = x
      lastIndex = statement.length - 1//?
      //console.log('d')
    } else if (operands.includes(last) && operands.includes(x)){
      statement[lastIndex] = x
      last = x
      //console.log('e')
    }
    //console.log('out')
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
statement is [[1,1,1], '+', [2,2,2], '*',...]
last is [2,2,2]
lastIndex is 2
if last is null
  add x to statement via push
  update last (being x)
  lastIndex becomes statement.length-1
if last is array and x is number
  add x to statement[lastIndex] via push
  update last (being the array statement[lastIndex])
  lastIndex remains the same
if last is an operator and x is a number
  add x to statement as an element in a new array
  update last (being the array statment[statement.length-1]?)
  lastIndex becomes statement.length-1
if last is an array and x is an operator
  add x to statement via push
  update last (being x)
  lastIndex becomes statement.length-1
if last and x are both operators
  x replaces last element in statement
  update last (being x)
  lastIndex remains the same
end
updateMemory
update display
+++++++++++++++++++++++++++++++++++++

// del button
statement is [[1,1,1], '+', [2,2,2], '*',...]

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
