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