function operate(a, b, operation) {
    return eval(`${a} ${operation} ${b}`);
}

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const screen = document.getElementById("belowWindow");

let firstNum = null;
let secondNum = null;
let operator = null;
let secondOperator = null; // will work a temporary variable role

let hasBeenCalculated = false; // a variable to control calculation and prevent the same recalculations

const cleanScreen = () => { screen.textContent = "0"; };

let passToSecondNumber = false; // a variable to pass to second number valuation

digitButtons.forEach(digit => digit.addEventListener("click", function(){
    if(passToSecondNumber || screen.textContent === '0'){
        screen.textContent = "";

        passToSecondNumber = false;
    }
    screen.textContent += digit.textContent;
}));

operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click", function(){
    if (operator === null) {
        // first number and operator are being declared
        firstNum = +screen.textContent;
        operator = operatorButton.textContent;

        hasBeenCalculated = false;
    }
    else if (secondOperator === null) {
        // second number and next operator are being declared and result is evaluated based on <firstNum, operation, secondNum>
        secondNum = +screen.textContent;
        secondOperator = operatorButton.textContent;

        let result = operate(firstNum, +screen.textContent, operator);
        screen.textContent = result;

        // cleaning the memory; converting the next operator into main operator and the result to the first number
        operator = secondOperator;
        secondOperator = null;

        firstNum = result;
        secondNum = null;
    }

    passToSecondNumber = true;
}));

document.getElementById("calculate").addEventListener("click", function(){
    if (firstNum !== null && !hasBeenCalculated) {
        secondNum = +screen.textContent;

        let result = operate(firstNum, secondNum, operator);
        screen.textContent = result;

        hasBeenCalculated = true;
        
        firstNum = null;
        secondNum = null;

        operator = null;
        secondOperator = null;
    }
});

document.getElementById("clear-all").addEventListener("click", (event) => {
    firstNum = null;
    secondNum = null;

    operator = null;
    secondOperator = null;

    cleanScreen();
});

document.getElementById("clear").addEventListener("click", (event) => {
    cleanScreen();
});