let activeOperator = null;
let currentValue = 0;
let displayValue = ""; // Since Number("") = 0, it doesn't matter
let returnCarriage = false;
let display = document.querySelector(".display");

function setDisplayValue(val) {
    if (+val === 0) {
        displayValue = "";
        display.textContent = "0";
        // currentValue = 0;
        return;
    }

    displayValue = val.toString()
    display.textContent = displayValue;
}

function writeToDisplay(digit) {
    if (returnCarriage) {
        displayValue = "";
        display.textContent = "0";
        returnCarriage = false;
    }
    if (digit === "0" && displayValue === "") return;
    displayValue += digit.toString();
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = "";
    display.textContent = "0";
    currentValue = 0;
    activeOperator = null;
}

function calculate() {
    let result = null;
    if (activeOperator !== null){
        let newValue = +displayValue;
        console.log(currentValue + activeOperator + newValue);
        result = operatorMap[activeOperator](currentValue, newValue);
        setDisplayValue(result);
    }
    returnCarriage = true;
    activeOperator = null;
    return result;
}

function setOperation(operator) {
    if (activeOperator) {
        currentValue = calculate();
    } else {
        currentValue = +displayValue;
    }
    
    console.log(activeOperator);
    activeOperator = operator;
    returnCarriage = true;
}

// operator map for equal function to access
let operatorMap = {
    "+": (a, b) => a+b,
    "-": (a, b) => a-b,
    "*": (a, b) => a*b,
    "/": (a, b) => a/b,
    "^": (a, b) => a**b,
    "mod": (a, b) => a%b,
}

function flipDisplay() {
    if (displayValue.length === 0) return;
    if (displayValue[0] !== '-') {
        displayValue = '-' + displayValue;
        display.textContent = displayValue;
    } else {
        displayValue = displayValue.slice(1);
        display.textContent = displayValue;
    }
}

function percentDisplay() {
    if (displayValue.length === 0) return;
    displayValue = "0.0" + displayValue;
    display.textContent = displayValue;
}

function factorialOfDisplay() {
    let fact = function(val) {
        if (val <= 1) return 1;
        return val*fact(val-1);
    }
    let val = +displayValue;
    if (val < 0) {
        setDisplayValue("lol, no");
    } else {
        let factorial = fact(val);
        setDisplayValue(factorial);
    }
    returnCarriage = true;
}

function sqrtOfDisplay() {
    let val = +displayValue;
    if (val < 0) {
        setDisplayValue("Lol No");
    } else {
        setDisplayValue(val**0.5);
    }
    returnCarriage = true;
}
// operator map to set event listeners
let instantOperatorFunctions = {
    "+/-": flipDisplay,
    "%": percentDisplay,
    "!": factorialOfDisplay,
    "√": sqrtOfDisplay,
    "=": calculate,
}

// adding the display update functions to number keys
document.querySelectorAll(".number").forEach((button) => {
    button.addEventListener("click", (clicked) => {
        let content = clicked.target.textContent;
        if (content === "x") content = (Math.random()*10).toString()[0];
        writeToDisplay(content);
    });
});

document.querySelector(".clear").addEventListener("click", (clicked) => {
    clearDisplay();
    currentValue = 0;
});

// add all set operator functions
document.querySelectorAll(".operator:not(.instant)").forEach((elem) => {
    elem.addEventListener("click", () => setOperation(elem.textContent));
});

// add instant functions 
document.querySelectorAll(".instant").forEach((elem) => {
    elem.addEventListener("click", instantOperatorFunctions[elem.textContent]);
})