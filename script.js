const display = document.getElementById('display')
let operatorJustPressed = false;

function appendToDisplay(input) {
    if (operatorJustPressed) {
        display.value = "";
        operatorJustPressed = false;
    }
    display.value += input;
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

    display.value += op;
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
    const value = display.value;

    if (value.includes("+")) {
        const [a, b] = value.split("+").map(Number);
        return add(a, b);
    } else if (value.includes("-")) {
        const [a, b] = value.split("-").map(Number);
        return subtract(a, b);
    } else if (value.includes("*")) {
        const [a, b] = value.split("*").map(Number);
        return multiply(a, b);
    } else if (value.includes("/" && "0")) {
        return "Nuh uh uh no 0"
    } else if (value.includes("/")) {
        const [a, b] = value.split("/").map(Number);
        return divide(a, b);
    }
    return "Unsupported operation";
};

const add = function(a, b) {
	return (a + b)
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