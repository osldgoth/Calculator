window.addEventListener('load', (event) => {
    if(sessionStorage.getItem('calculatorMemory')){
        sessionStorage.removeItem('calculatorMemory')
    }
    if (!sessionStorage.getItem('calculatorMemory')){
        sessionStorage.setItem('calculatorMemory', {
            last: null,
            lastIndex: 0,
            statement: [],
            operands: ['+', '-', '/', '*', '(', ')', '^']
        });
        // example storage:
        // {statementIndex:#<if this is even needed?>, statement: [111, '+', 222, '*', '(', 333, '/', 444, ')'], ? }
        //there may be an easier way to do this?
    }
    if (!sessionStorage.getItem('calculatorMemoryHistory')){
        //store calculatorMemory history - limit to 5?
        sessionStorage.setItem('calculatorMemoryHistory', {})
    }
    //I can see how React would thrive here lol
});

const addNumeral = function(x){
    const {last, lastIndex, statement, operands} = sessionStorage.getItem('calculatorMemory');
    if (typeof(last) == 'number' &&  typeof(x) == 'number'){
        last = Number([statement[lastIndex], x].join(''));
        statement[lastIndex] = last;
    } else if (operands.includes(last) && typeof(x) == 'number'){
        statement.push(x);
        last = x;
        lastIndex = statement.length - 1;
    } else if (operands.includes(last) && operands.includes(x)){
        statement[lastIndex] = x
        last = x;
        //lastIndex stays the same
    }
    sessionStorage.setItem('calculatorMemory', {
        last,
        lastIndex,
        statement,
        operands
    })
    let expressionDisplay = document.getElementsByClassName("expression")
    expressionDisplay.innerText = statement.join('')
};

const addOperand = function(operand){
    console.log(operand)
};

//Pseudocode first

/* 
//button clicked 'x' (for most buttons)
if last item and x are both numbers
    concat last item and x in memory
    set concat as last
    
if last item is an operator and x is a number
    push x into statement
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
*/


// -- documentation
//store last 'operation'