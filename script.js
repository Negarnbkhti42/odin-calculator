class Calculator {
    constructor(calculationText, previousText) {
        this.calculationTextElement = calculationText;
        this.previousTextElement = previousText;
    }

    clear() {
        this.calculationText = "";
        this.previousText = "";
    }

    delete() {

    }

    appendNumber(number) {
        if (number == "." && this.calculationText.includes(".")) {
            return;
        }
        this.calculationText = this.calculationText.toString() + number.toString();
    }

    updateDisplay() {
        this.calculationTextElement.innerHTML = this.calculationText || "0";
    }
}

const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operation");
const equal = document.querySelector("[data-equal]");
const del = document.querySelector("[data-delete]");
const clear = document.querySelector("[data-clear]");

const calculationText = document.querySelector("[data-calculation]");
const previousText = document.querySelector("[data-previous]")

const calculator = new Calculator(calculationText, previousText);
calculator.clear();

numbers.forEach(element => {
    element.addEventListener("click", () => {
        calculator.appendNumber(element.getAttribute("data-key"));
        calculator.updateDisplay();
    });
});

operators.forEach(element => {
    element.addEventListener("click", () => { });
});

window.addEventListener("keyup", function (e) {
    key = this.document.querySelector(`.btn[data-key="${e.key}"]`);
    console.log(key);

    if (!key) {
        return;
    }
});