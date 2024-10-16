const buttons = document.querySelectorAll('button');

const btnNumbers = document.querySelectorAll('.button-number');
const btnOperations = document.querySelectorAll('.button-operation');

const btnPercentage = document.querySelector('#btnPercentage');
const btnFactorial = document.querySelector('#btnFactorial');
const btnSquare = document.querySelector('#btnSquare');
const btnSquareRoot = document.querySelector('#btnSquareRoot');

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

const MAXIMUM_NUMBER_OF_DIGITS = 16;

executeKeyCommands();
formatScreen();
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
    });
}

function formatScreen() {
    btnNumbers.forEach((number) => {
        number.addEventListener('click', () => {
            if (result.textContent.length < MAXIMUM_NUMBER_OF_DIGITS) {
                writeResult(number);
            }
        });
    });
}

function writeResult(number) {
    if (result.textContent !== '0' && !reset) {
        result.textContent += number.textContent;
    } else {
        result.textContent = number.textContent;
        reset = false;
    }
    resultValue = parseFloat(result.textContent);
    console.log(result.textContent.length);
    console.log(resultValue);
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
            if (!previous.textContent) {
                previous.textContent = `${resultValue} ${operation.textContent}`;
            } else {
                performOperation(operation);
                resultValue = parseFloat(result.textContent);
                previous.textContent = `${resultValue} ${operation.textContent}`;
            }
            previousValue = resultValue;
            reset = true;
        });
    })

    alert('previous: ' + previousValue + ', result: ' + resultValue)

}

function pressSignButton() {
    btnSign.addEventListener('click', () => {
        if (parseFloat(result.textContent) != 0) {
            resultValue = parseFloat(result.textContent);
            resultValue *= -1;
            result.textContent = resultValue;
            alert('previous: ' + previousValue + ', result: ' + resultValue)
            alert('sinaaal')
        }

        if (previous.textContent) {
            previous.textContent = null;
        }

    });
}

function pressDecimalButton() {
    btnDecimal.addEventListener('click', () => {
        if (!result.textContent.includes('.')) {
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
}

function performOperation(btnId) {
    if (!previous.textContent) {
        previous.textContent = `${resultValue} ${btnId.textContent}`;
    } else if (previous.textContent.includes('+')) {
        result.textContent = previousValue + resultValue;
    } else if (previous.textContent.includes('-')) {
        result.textContent = previousValue - resultValue;
    } else if (previous.textContent.includes('×')) {
        result.textContent = previousValue * resultValue;
    } else if (previous.textContent.includes('÷')) {
        result.textContent = roundNumber(previousValue / resultValue, MAXIMUM_NUMBER_OF_DIGITS - Math.round(previousValue / resultValue).toString().length);
    } else if (previous.textContent.includes('%')) {
        performPercentageOperation();
    } else if (previous.textContent.includes('!')) {
        performFactorialOperation();
    } else if (previous.textContent.includes('²')) {
        performSquareOperation();
    } else if (previous.textContent.includes('√')) {
        performSquareRootOperation();
    }
}

function pressPercentageButton() {
    btnPercentage.addEventListener('click', () => {
        performPercentageOperation();
    });
}

function performPercentageOperation() {
    previousValue = resultValue;
    previous.textContent = `${previousValue}% =`;
    resultValue /= 100;
    result.textContent = resultValue;
    reset = true;
}

function pressFactorialButton() {
    btnFactorial.addEventListener('click', () => {
       performFactorialOperation(); 
    });
}

function performFactorialOperation() {
    previousValue = resultValue;
    previous.textContent = `${previousValue}! =`;
    resultValue = calculateFactorial(resultValue);
    result.textContent = resultValue;
    reset = true;
}

function pressSquareButton() {
    btnSquare.addEventListener('click', () => {
        performSquareOperation();
    });
}

function performSquareOperation() {
    previousValue = resultValue;
    previous.textContent = `${previousValue}² =`;
    resultValue *= resultValue;
    result.textContent = resultValue;
    reset = true;
}

function pressSquareRootButton() {
    btnSquareRoot.addEventListener('click', () => {
        performSquareRootOperation();
    });
}

function performSquareRootOperation() {
    previousValue = resultValue;
    previous.textContent = `√(${previousValue}) =`;
    resultValue = Math.sqrt(resultValue);
    result.textContent = resultValue;
    reset = true;
}

function calculateFactorial(number) { 
    let factorial = 1;
    
    for (let i = 1; i <= number; i++) {
        factorial *= i;
    }
    return factorial;
}

function roundNumber(number, decimal) {
    return Math.round(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
}