const display = document.getElementById('display')

function appendToDisplay(input) {
    display.value += input
    console.log(input)
}

function keyPress(event) {
    const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','Escape'];
    
    if (event.key === "Escape") {
        return clearDisplay();
    } else if (allowedKeys.includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter') {
        try {
            display.value = eval(display.value);
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

document.addEventListener('keydown', keyPress);