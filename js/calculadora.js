const buttons = document.querySelectorAll('button');

const btnNumbers = document.querySelectorAll('.button-number');
const btnOperations = document.querySelectorAll('.button-operation');

const btnPercentage = document.querySelector('#btnPercentage');
const btnFactorial = document.querySelector('#btnFactorial');
const btnSquare = document.querySelector('#btnSquare');
const btnSquareRoot = document.querySelector('#btnSquareRoot');

const btnClearEntry = document.querySelector('#btnClearEntry');
const btnClear = document.querySelector('#btnClear');
const btnDelete = document.querySelector('#btnDelete');
const btnSign = document.querySelector('#btnSign')
const btnDecimal = document.querySelector('#btnDecimal');
const btnEquals = document.querySelector('#btnEquals');

const previous = document.querySelector('#previous');
const result = document.querySelector('#result');

let previousValue = 0;
let resultValue = 0;

let fontSize = 48;
let reset = false;
let hardReset = false;
let blockOperations = false;

const MAXIMUM_NUMBER_OF_DIGITS = 16;

executeKeyCommands();
pressNumberButton();
pressClearEntryButton();
pressClearButton();
pressDeleteButton();
pressOperationButton();
pressSignButton();
pressDecimalButton();
pressEqualsButton();
pressPercentageButton();
pressFactorialButton();
pressSquareButton();
pressSquareRootButton();
pressButton();

function executeKeyCommands() {
    addEventListener('keydown', (event) => {
        event.preventDefault();

        switch (event.key) {
            case 'Escape':
                clearNumber();
                break;
            case 'Backspace':
                deleteNumber();
                break;
            case 'Enter':
                performEqualsOperation();
                break;
        }
        formatScreen();
    });
}

function pressButton() {
    buttons.forEach((button => {
        button.addEventListener('click', () => {
            formatScreen();
        });
    }))
}

function formatScreen() {
    switch (result.textContent.length) {
        case 11:
            fontSize = 44;
            break;
        case 12:
            fontSize = 40.5;
            break;
        case 13:
            fontSize = 37.5;
            break;
        case 14:
            fontSize = 35;
            break;
        case 15:
            fontSize = 32.5;
            break;
        case 16:
            fontSize = 30.5;
            break;
        case 17:
            fontSize = 30;
            break;
        case 18:
            fontSize = 29;
            break;
        default:
            fontSize = 48;
            break;
    }
    result.style.fontSize = `${fontSize}px`;
}

function pressNumberButton() {
    btnNumbers.forEach((number) => {
        number.addEventListener('click', () => {
            if (result.textContent.length < MAXIMUM_NUMBER_OF_DIGITS || reset) {
                writeResult(number.textContent);
            }
        });
    });
}

function writeResult(number) {
    if (result.textContent !== '0' && !reset) {
        result.textContent += number;
    } else {
        if (hardReset) {
            previous.textContent = null;
        }
        result.textContent = number;
        reset = false;
        hardReset = false;
    }
    resultValue = parseFloat(result.textContent);
}

function pressClearButton() {
    btnClear.addEventListener('click', () => {
        clearNumber();
    });
}

function clearNumber() {
    result.textContent = '0';
    resultValue = 0;
    previous.textContent = null;
    previousValue = 0;
    blockOperations = false;
}

function pressClearEntryButton() {
    btnClearEntry.addEventListener('click', () => {
        clearEntry();
    });
}

function clearEntry() {
    result.textContent = '0';
    resultValue = 0;
    blockOperations = false;
}

function pressDeleteButton() {
    btnDelete.addEventListener('click', () => {
        deleteNumber();
    });
}

function deleteNumber() {
    if (!reset) {
        if (result.textContent !== '0') {
            result.textContent = result.textContent.substring(0, result.textContent.length - 1);
            resultValue = parseFloat(result.textContent);
        }

        if (!result.textContent) {
            result.textContent = '0';
            resultValue = 0;
        }
    }
}

function pressOperationButton() {
    btnOperations.forEach((operation) => {
        operation.addEventListener('click', () => {
            if (!blockOperations) {
                if (!previous.textContent) {
                    previous.textContent = `${resultValue} ${operation.textContent}`;
                } else {
                    if (!reset) {
                        performOperation(operation);
                    }
                    resultValue = parseFloat(result.textContent);
                    previous.textContent = `${resultValue} ${operation.textContent}`;
                }
                previousValue = resultValue;
                reset = true;
            }
        });
    });
}

function pressSignButton() {
    btnSign.addEventListener('click', () => {
        if (!blockOperations) {
            if (parseFloat(result.textContent) != 0) {
                resultValue = parseFloat(result.textContent);
                resultValue *= -1;
                result.textContent = resultValue;
            }

            if (previous.textContent) {
                previous.textContent = null;
            }
        }
    });
}

function pressDecimalButton() {
    btnDecimal.addEventListener('click', () => {
        if (!blockOperations && !result.textContent.includes('.')) {
            result.textContent += '.';
        }
    });
}

function pressEqualsButton() {
    btnEquals.addEventListener('click', () => {
        performEqualsOperation();
    });
}

function performEqualsOperation() {
    if (!blockOperations) {
        if (!previous.textContent) {
            previous.textContent += `${resultValue} =`;
        } else if (previous.textContent.endsWith('=')) {
            previousValue = parseFloat(result.textContent);
            previous.textContent = previous.textContent.replace(/(\-?\d+\.?\d*) (\D)/, `${previousValue} $2`);
            performOperation(btnEquals);
        } else {
            performOperation(btnEquals);
            previous.textContent += ` ${resultValue} =`;
        }
        reset = true;
    }
}

function performOperation(btnId) {
    if (!previous.textContent) {
        previous.textContent = `${resultValue} ${btnId.textContent}`;
    } else if (previous.textContent.includes('+')) {
        result.textContent = (Math.round(previousValue + resultValue)).toString().length > MAXIMUM_NUMBER_OF_DIGITS ? 'Overflow' : previousValue + resultValue;
    } else if (previous.textContent.includes('×')) {
        result.textContent = (Math.round(previousValue * resultValue)).toString().length > MAXIMUM_NUMBER_OF_DIGITS ? 'Overflow' : previousValue * resultValue;
    } else if (previous.textContent.includes('÷')) {
        if (resultValue === 0 && previousValue === 0) {
            result.textContent = 'Indeterminate';
            hardReset = true;
            blockOperations = true;
        } else if (resultValue === 0) {
            result.textContent = 'Undefined';
            hardReset = true;
            blockOperations = true;
        } else {
            result.textContent = roundNumber(previousValue / resultValue, MAXIMUM_NUMBER_OF_DIGITS - Math.round(previousValue / resultValue).toString().length);
        }
    } else if (previous.textContent.includes('%')) {
        performPercentageOperation();
    } else if (previous.textContent.includes('!')) {
        performFactorialOperation();
    } else if (previous.textContent.includes('²')) {
        performSquareOperation();
    } else if (previous.textContent.includes('√')) {
        performSquareRootOperation();
    } else if (previous.textContent.includes('-')) {
        result.textContent = (Math.round(previousValue - resultValue)).toString().length > MAXIMUM_NUMBER_OF_DIGITS ? 'Overflow' : previousValue - resultValue;
    }

    if (result.textContent == 'Overflow') {
        hardReset = true;
        blockOperations = true;
    }

}

function pressPercentageButton() {
    btnPercentage.addEventListener('click', () => {
        performPercentageOperation();
    });
}

function performPercentageOperation() {
    if (!blockOperations) {
        previousValue = resultValue;
        previous.textContent = `${previousValue}% =`;
        resultValue = roundNumber(resultValue / 100, MAXIMUM_NUMBER_OF_DIGITS - Math.round(resultValue / 100).toString().length);
        result.textContent = resultValue;
        reset = true;
        hardReset = true;
    }
}

function pressFactorialButton() {
    btnFactorial.addEventListener('click', () => {
        performFactorialOperation(); 
    });
}

function performFactorialOperation() {
    if (!blockOperations) {
        previousValue = resultValue;
        previous.textContent = `${previousValue}! =`;
        resultValue = calculateFactorial(resultValue);
        result.textContent = resultValue === -1 ? 'Overflow' : resultValue;
        reset = true;
        hardReset = true;

        if (result.textContent == 'Overflow') {
            blockOperations = true;
        }

    }
}

function pressSquareButton() {
    btnSquare.addEventListener('click', () => {
        performSquareOperation();
    });
}

function performSquareOperation() {
    if (!blockOperations) {
        previousValue = resultValue;
        previous.textContent = `${previousValue}² =`;
        resultValue = (Math.round(resultValue ** 2)).toString().length > MAXIMUM_NUMBER_OF_DIGITS ? 'Overflow' : resultValue ** 2;
        result.textContent = resultValue;
        reset = true;
        hardReset = true;

        if (result.textContent == 'Overflow') {
            blockOperations = true;
        }

    }
}

function pressSquareRootButton() {
    btnSquareRoot.addEventListener('click', () => {
        performSquareRootOperation();
    });
}

function performSquareRootOperation() {
    if (!blockOperations) {
        previousValue = resultValue;
        previous.textContent = `√(${previousValue}) =`;
        if (previousValue < 0) {
            resultValue = 0;
            result.textContent = 'Invalid';
            blockOperations = true;
        } else {
            resultValue = roundNumber(Math.sqrt(resultValue), MAXIMUM_NUMBER_OF_DIGITS - Math.round(Math.sqrt(resultValue)).toString().length);
            result.textContent = resultValue;
        }
        reset = true;
        hardReset = true;
    }
}

function calculateFactorial(number) { 
    
    if (number < 0) {
        number *= -1;
    }
    
    if (number > 18) {
        return -1;
    }
    
    let factorial = 1;

    for (let i = 1; i <= number; i++) {
        factorial *= i;
    }
    return factorial;
}

function roundNumber(number, decimal) {
    return Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
}