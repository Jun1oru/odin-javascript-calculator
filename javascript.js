const buttons = document.querySelectorAll('button');

const display = document.querySelector('.display');
display.textContent = '0';

let a = '',
    b = '',
    result = '',
    operator = '',
    displayValue = display.textContent;

buttons.forEach((button) => button.addEventListener('click', (event) => {
    const key = event.target;
    const keyValue = key.textContent;
    if(key.getAttribute('data-number') !== null) {
        showOnDisplay(keyValue);
        return addNumber(keyValue);
    } else if(key.getAttribute('data-operator') !== null) {
        return setOperator(keyValue);
    } else if(key.getAttribute('data-operate') !== null) {
        return equalFunc();
    } else if(key.getAttribute('data-decimal') !== null) {
        return addDecimalPoint();
    } else if(key.getAttribute('data-delete') !== null) {
        return deleteCharacter();
    } else if(key.getAttribute('data-clear') !== null) {
        return clearDisplay();
    } else if(key.getAttribute('data-reverse') !== null) {
        return reverseNumber();
    }
}));

window.addEventListener('keydown', (event) => {
    if(event.defaultPrevented) {
        return;
    }
    if(!event.ctrlKey && !event.altKey) {
        switch(event.code) {
            case "Digit0":
            case "Digit1":
            case "Digit2":
            case "Digit3":
            case "Digit4":
            case "Digit5":
            case "Digit6":
            case "Digit7":
            case "Digit8":
            case "Digit9":
                if(!event.shiftKey) {
                    showOnDisplay(event.key);
                    addNumber(event.key);
                }
                if(event.code === 'Digit8' && event.shiftKey) {
                    setOperator(event.key);
                }
                break;
            case "Slash":
            case "Minus":
                if(!event.shiftKey) {
                    setOperator(event.key);
                }
                break;
            case "Equal":
                if(!event.shiftKey) {
                    equalFunc();
                } else if(event.shiftKey) {
                    setOperator(event.key);
                }
                break;
            case "Period":
                if(!event.shiftKey) {
                    addDecimalPoint();
                }
                break;
            case "Backspace":
                deleteCharacter();
                break;
            case "KeyC":
                clearDisplay();
                break;
        }
        return console.log(event);
    }
});

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

function operate(a, b, operator) {
    if(operator === '+') {
        return add(a, b);
    } else if(operator === '-') {
        return subtract(a, b);
    } else if(operator === '*') {
        return multiply(a, b);
    } else if(operator === '/') {
        return divide(a, b);
    }
}

function showOnDisplay(elem) {
    if(displayValue === '0') {
        displayValue = elem;
    } else {
        displayValue += elem;
    }
    return display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = '0',
    operator = '',
    a = '',
    b = '',
    result = '';
    return display.textContent = displayValue;
}

function deleteCharacter() {
    if(displayValue.charAt(0) === '-') {
        displayValue = displayValue.slice(1);
        a = displayValue;
        return display.textContent = displayValue;
    }
    if(displayValue.length === 1) {
        displayValue = '0';
        a = displayValue;
        return display.textContent = displayValue;
    }
    if(operator === '') {
        if(parseFloat(a) === 0) return;
        if(displayValue !== '0') {
            displayValue = displayValue.slice(0, -1);
            a = displayValue;
            return display.textContent = displayValue; 
        }
    } else if(operator !== '' && b === '') {
        displayValue = displayValue.slice(0, -1);
        operator = '';
        return display.textContent = displayValue;
    } else {
        displayValue = displayValue.slice(0, -1);
        b = b.slice(0, -1);
        return display.textContent = displayValue;
    }
}

function addNumber(num) {
    if(operator === '') {
        if(a === '') {
            return a = num;
        } else {
            return a += num;
        }
    } else {
        if(b === '') {
            return b = num;
        } else {
            return b += num;
        }
    }
}

function reverseNumber() {
    if(operator === '') {
        a = -a;
        displayValue = `${a}`;
        return display.textContent = displayValue;
    } else {
        b = -b;
        displayValue = `${a}${operator}${b}`;
        return display.textContent = displayValue;
    }
}

function addDecimalPoint() {
    if(operator === '') {
        if(a.includes('.')) return;
        if(a === '') {
            a = '0.';
        } else {
            a += '.';
        }
        displayValue += '.';
        return display.textContent = displayValue;
    } else {
        if(b.includes('.')) return;
        if(b === '') {
            b = '0.';
            displayValue += '0.';
        } else {
            b += '.';
            displayValue += '.';
        }
        return display.textContent = displayValue;
    }
}

function setOperator(keyValue) {
    if(a === '') {
        a = '0';
    }
    if(operator === '') {
        if(a === '0.') {
            a = '0.0';
            displayValue += '0';
        }
        operator = keyValue;
        displayValue += operator;
        return display.textContent = displayValue;
    } else {
        if(b === '') {
            operator = keyValue;
            displayValue = displayValue.slice(0, -1);
            displayValue += operator;
            return display.textContent = displayValue;
        } else {
            result = operate(a, b, operator);
            a = result;
            a = Math.round((a + Number.EPSILON) * 100) / 100;
            b = '';
            result = '';
            operator = keyValue;
            displayValue = a + operator;
            return display.textContent = displayValue;
        }
    }
}

function equalFunc() {
    if(a === '' || b === '') return;
    if(operator === '') return;
    if(operator === '/' && parseFloat(b) === 0) {
        displayValue = 'Impossible',
        operator = '',
        a = '',
        b = '',
        result = '';
        return display.textContent = displayValue;
    }
    result = operate(a, b, operator);
    a = result;
    a = Math.round((a + Number.EPSILON) * 100) / 100;
    b = '';
    result = '';
    operator = '';
    displayValue = `${a}`;
    return display.textContent = displayValue;
}