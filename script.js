const display = document.getElementById('display')

function appendToDisplay(input) {
    display.value += input
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
  
    if (/[+\-*/]/.test(value)) {
      return;
    }
  
    if (value === '') {
      return;
    }
  
    display.value += op;
  }

function keyPress(event) {
    const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','Escape', 'C', 'c'];
    
    if (event.key === "Escape" || event.key === "C" || event.key === "c") {
        return clearDisplay();
    } else if (allowedKeys.includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter') {
        try {
            display.value = calculate(display.value);
        } catch {
            display.value = "Error";
        }
    } else if (event.key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    }

    event.preventDefault();
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    display.value
}

const add = function(a, b) {
	return (a + b)
};

const subtract = function(a, b) {
	return ( a - b)
};

const multiply = function(a, b) {
    return ( a - b)
};

document.addEventListener('keydown', keyPress);