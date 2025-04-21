const display = document.getElementById('display')
const equalsButton = document.getElementById('equals');

let firstOperand = null;
let operator = null;
let operatorJustPressed = false;

equalsButton.addEventListener('click', function() {
    try {
        display.value = calculate();  // Calculate the result
    } catch {
        display.value = "Error";  // Handle any errors
    }
});

function appendToDisplay(input) {
    if (operatorJustPressed) {
        display.value = "";
        operatorJustPressed = false;
    }
    display.value += input;

    display.scrollLeft = display.scrollWidth;
}

function appendDecimal() {
    const value = display.value;
    const parts = value.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes('.')) {
      display.value += '.';
    }
}

function appendOperator(op) {
    const value = display.value;

    if (/[+\-*/]$/.test(value)) {
        return;
    }

    if (value === '') {
        return;
    }

    firstOperand = Number(value);

    operator = op;
    operatorJustPressed = true;
}

function keyPress(event) {
    const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','Escape', 'C', 'c'];
    
    if (event.key === "Escape" || event.key === "C" || event.key === "c") {
        return clearDisplay();
    }

    if (!allowedKeys.includes(event.key) && event.key !== 'Enter' && event.key !== 'Backspace') {
        event.preventDefault();
        return;
    }

    if (event.key === '.') {
        appendDecimal();
    } else if (['+','-','*','/'].includes(event.key)) {
        appendOperator(event.key);
    } else if (event.key === 'Enter') {
        try {
            display.value = calculate(display.value);
        } catch {
            display.value = "Error";
        }
    } else if (event.key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    } else {
        appendToDisplay(event.key);
    }

    event.preventDefault();
}

function clearDisplay() {
    display.value = "";
    operatorJustPressed = false;
}

function calculate() {
    let a = firstOperand;
    let b = display.value;

    if (operator === "+") {
        return Math.round(add(a, b) * 100) / 100;
    } else if (operator === "-") {
        return Math.round(subtract(a, b) * 100) / 100;
    } else if (operator === "*") {
        return Math.round(multiply(a, b) * 100) / 100;
    } else if (operator === "/") {
        if (b === 0) {
            return "Nuh uh uh no 0";
        }
        return Math.round(divide(a, b) * 100) / 100;
    }

    return "Unsupported operation";
}

const add = function(a, b) {
	return a + Number(b)
};

const subtract = function(a, b) {
	return ( a - b)
};

const multiply = function(a, b) {
    return ( a * b)
};

const divide = function(a, b) {
    return ( a / b)
};

document.addEventListener('keydown', keyPress);