function operate(a, b) {
    if(operator === "+"){
        return a + b;
    }

    else if(operator === "-"){
        return a - b;
    }

    else if(operator === "x"){
        return a * b;
    }

    else if(operator === "÷"){
        return a / b;
    }

    else{
        return a % b;
    }
}

const allButtons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
let screen = document.querySelector(".belowWindow");
let firstNum = null;
let secondNum = null;
let operatorCount = 0;
let operator = null;
let result = null;
let previousOperatorCount = 0;

numberButtons.forEach(button => button.addEventListener("click", function(){
    if(firstNum === null){
        if(screen.textContent === "0" && button.textContent !== "."){
            screen.textContent = "";
        }
        screen.textContent += button.textContent;
    }

    if(firstNum !== null){
        if(operatorCount !== previousOperatorCount){
            operatorCount++;
            screen.textContent = ""; 
        }
        screen.textContent += button.textContent;
    }
}))

operatorButtons.forEach(button => button.addEventListener("click", function(){
    if(operatorCount === 0){
        previousOperatorCount = operatorCount;
        operatorCount++;
        firstNum = Number(screen.textContent);
    }

    if(operatorCount === 1){
        previousOperatorCount = operatorCount;
        secondNum = Number(screen.textContent);
        operatorCount--;
        if(firstNum !== null && secondNum !== null){
            result = operate(firstNum, secondNum);
            screen.textContent = "";
            screen.textContent = `${result}`;
            secondNum = null;
            firstNum = result;
        }
    }

    operator = button.textContent;
    console.log(`firstnum is ${firstNum}`);
    console.log(`secondNum is ${secondNum}`);
}))

document.querySelector(".equal").addEventListener("click", function(){
        result = operate(firstNum, secondNum);
        screen.textContent = result;
        return result;
})


