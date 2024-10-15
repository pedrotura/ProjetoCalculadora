const btnNumbers = document.querySelectorAll('.button-number');
const btnOperations = document.querySelectorAll('.button-operation');

const btnFactorial = document.querySelector('#btnFactorial');
const btnSquare = document.querySelector('#btnSquare');
const btnSquareRoot = document.querySelector('#btnSquareRoot');

const btnClear = document.querySelector('#btnClear');
const btnDelete = document.querySelector('#btnDelete');
const btnEquals = document.querySelector('#btnEquals');

const previous = document.querySelector('#previous');
const result = document.querySelector('#result');

let previousValue = 0;
let resultValue = 0;

let reset = false;

writeResult();
clearNumber();
deleteNumber();
pressOperationButton();
pressEqualsButton();
pressFactorialButton();
pressSquareButton();
pressSquareRootButton();

function writeResult() {
    btnNumbers.forEach((number) => {
        number.addEventListener('click', () => {
            if (result.textContent.length != 10 || reset) {
                if (result.textContent != 0 && !reset) {
                    result.textContent += number.textContent;
                } else {
                    result.textContent = number.textContent;
                    reset = false;
                }
                resultValue = parseFloat(result.textContent);
            }
            console.log(result.textContent.length);
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

function deleteNumber() {
    btnDelete.addEventListener('click', () => {
        if (result.textContent != 0) {
            result.textContent = result.textContent.substring(0, result.textContent.length - 1);
            resultValue = parseFloat(result.textContent);
        }

        if (!result.textContent) {
            result.textContent = '0';
            resultValue = 0;
        }
        console.log(resultValue);
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

    alert('previous: ' + previousValue + ', result: ' + resultValue)

}

function pressEqualsButton() {
    btnEquals.addEventListener('click', () => {

        if (!previous.textContent) {
            previous.textContent += `${resultValue} =`;
        } else if (previous.textContent.endsWith('=')) {
            previousValue = parseFloat(result.textContent);
            previous.textContent = previous.textContent.replace(/(\d+) (\D)/, `${previousValue} $2`);
            performOperation(btnEquals);
        } else {
            performOperation(btnEquals);
            previous.textContent += ` ${resultValue} =`;
        }

        alert('previous: ' + previousValue + ', result: ' + resultValue)

    });
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
        result.textContent = previousValue / resultValue;
    } else if (previous.textContent.includes('!')) {
        performFactorialOperation();
    } else if (previous.textContent.includes('²')) {
        performSquareOperation();
    } else if (previous.textContent.includes('√')) {
        performSquareRootOperation();
    }
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