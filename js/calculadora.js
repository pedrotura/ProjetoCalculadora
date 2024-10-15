const btnNumbers = document.querySelectorAll('.button-number');
const btnOperations = document.querySelectorAll('.button-operation');

const btnClear = document.querySelector('#btnClear');
const btnEquals = document.querySelector('#btnEquals');

const previous = document.querySelector('#previous');
const result = document.querySelector('#result');

let previousValue = 0;
let resultValue = 0;

let reset = false;

writeResult();
clearNumber();
pressOperationButton();

function writeResult() {
    btnNumbers.forEach((number) => {
        number.addEventListener('click', () => {
            if (result.textContent != 0 && !reset) {
                result.textContent += number.textContent;
            } else {
                result.textContent = number.textContent;
                reset = false;
            }
            resultValue = parseFloat(result.textContent);
            console.log(resultValue);
        });
    });
}


function clearNumber() {
    btnClear.addEventListener('click', () => {
        result.textContent = '0';
        resultValue = 0;
        previous.textContent = null;
        previousValue = 0;
    });
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
}

function performOperation(btnId) {
    if (!previous.textContent) {
        previous.textContent = `${resultValue} ${btnId.textContent}`;
    } else if (previous.textContent.endsWith('+')) {
        result.textContent = previousValue + resultValue;
    } else if (previous.textContent.endsWith('−')) {
        result.textContent = previousValue - resultValue;
    } else if (previous.textContent.endsWith('×')) {
        result.textContent = previousValue * resultValue;
    } else if (previous.textContent.endsWith('÷')) {
        result.textContent = previousValue / resultValue;
    }
}