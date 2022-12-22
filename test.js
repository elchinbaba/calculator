function operate(a, b, operation) {
    return eval(`${a} ${operation} ${b}`);
}

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const screen = document.getElementById("belowWindow");

let firstNum = null;
let secondNum = null;
let operator = null;

let hasBeenCalculated = false; // a variable to control calculation and prevent the same recalculations

const cleanScreen = () => { screen.textContent = "0"; }; // a function for cleaning screen

digitButtons.forEach(digit => digit.addEventListener("click", function(){
    if(screen.textContent === "0"){
        screen.textContent = "";
    }
    screen.textContent += digit.textContent;
}));

operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click", function(){

    hasBeenCalculated = false; // once new operation started, calculation is cleared

    operator = operatorButton.textContent;

    // defining the first number
    if (firstNum === null) {
        firstNum = +screen.textContent; // + operator in front of the variable is similar with Number(variable)

        cleanScreen();

    }
    // defining the second number and calculating the result
    else if (secondNum === null) {
        secondNum = +screen.textContent;

        screen.textContent = operate(firstNum, secondNum, operator);

        // once calculation is held, the relevant variable assignment is being done
        hasBeenCalculated = true;
    }
    //after calculation result value is assigned to the first number
    else if (firstNum !== null && secondNum !== null) {
        // comes back to the start of the second situation as a recursion like fibonacci numbers
        firstNum = +screen.textContent; // or result
        secondNum = null;

        cleanScreen();
    }
}));

document.getElementById("calculate").addEventListener("click", function(){
    if (firstNum !== null && !hasBeenCalculated) {
        secondNum = +screen.textContent;

        screen.textContent = operate(firstNum, secondNum, operator);

        hasBeenCalculated = true;

        firstNum = null;
        secondNum = null;
    }
});

document.getElementById("clear-all").addEventListener("click", (event) => {
    firstNum = null;
    secondNum = null;

    cleanScreen();
});

document.getElementById("clear").addEventListener("click", (event) => {
    if (secondNum !== null) {
        secondNum = null;
    }
    else {
        firstNum = null;
    }

    cleanScreen();
})