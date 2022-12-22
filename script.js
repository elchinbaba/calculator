
const allButtons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
let belowWindow =  document.querySelector(".belowWindow");
let firstNum = null;
let secondNum = null;
let operator = null;
let count = 1;
let operatorCount = 0;

allButtons.forEach(button => button.addEventListener("click", function() {
    //deleting default 0 value when clicked buttons except "." button as we may want to enter 0.5 for example
    if(typeof(firstNum) === "object"){

       if(button.className == "number"){

            if(belowWindow.textContent === "0" && button.textContent !== ".") {
                belowWindow.textContent = "";
            }       

            belowWindow.textContent += button.textContent; 
        }
    }

    //assign the value of first number if operator button clicked
    if(button.className == "operator"){
        operatorCount++;

        if(operatorCount % 2 !== 0){
            firstNum = Number(belowWindow.textContent);
        } 
        if(operatorCount % 2 === 0){
            secondNum = Number(belowWindow.textContent);
        }
        operator = button.textContent;

        if(operatorCount > 1){
            belowWindow.textContent = operate(firstNum, secondNum);
            firstNum = belowWindow.textContent;

        }
        console.log(typeof firstNum);
        console.log(`firstnum is ${firstNum}`);
        console.log(`secondnum is ${secondNum}`);
        console.log(operator);
        console.log(`count is ${count}`);
    }

    //starting new number after clicking operator button
    if(typeof(firstNum) === "number"){
        if(button.className == "number"){
            if(operator != null && count === 1){
                count++;
                console.log(`count is ${count}`);
                belowWindow.textContent = "";
            }
            belowWindow.textContent += button.textContent;
               
        }
    }

    if(button.className == "equal"){

        secondNum = Number(belowWindow.textContent);
        belowWindow.textContent = operate(firstNum, secondNum);
    }

}))




document.getElementById("allClear").addEventListener("click", function(){
        belowWindow.textContent = "0";
        //upperWindow.textContent = " ";   
        firstNum = null;
})

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

