window.addEventListener('load', (event) => {
    //I am seccond guessing initializing here
    if (!sessionStorage.getItem('calculatorMemory')){
        //store each part of the expression
        sessionStorage.setItem('calculatorMemory', {
            statementIndex: 0,
            statement: [],
            operands: ['+', '-', '/', '*', '(', ')']
        });
        // example storage:
        // {statementIndex:#<if this is even needed?>, statement: [111, '+', 222, '*', '(', 333, '/', 444, ')'], ? }
    }
    if (!sessionStorage.getItem('calculatorMemoryHistory')){
        //store calculatorMemory history - limit to 5?
        sessionStorage.setItem('calculatorMemoryHistory', {})
    }
    //I can see how React would thrive here lol

});

const addNumeral = function(numeral){
    //insertNumeralIntocalculatorMemory()
    //showcalculatorMemory();
    const {statementIndex, statement, operands} = sessionStorage.getItem('calculatorMemory')
    const lastIndex = statement.length - 1
    const lastItem = statement.pop();
    operands.includes(lastItem) ? 1 : 2; //where was I going here?
    typeof(lastItem) == typeof(numeral) ? statement[lastIndex].concat(numeral) : statement.push(numeral)


};

const addOperand = function(operand){
    console.log(operand)
};