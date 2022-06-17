class Calculator {
    static Operate = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    };

    constructor(calculationText, previousText) {
        this.calculationTextElement = calculationText;
        this.previousTextElement = previousText;
    }

    clear() {
        this.calculationText = "";
        this.previousText = "";
        this.operation = "";
    }

    delete() {
        if (this.calculationText) {
            this.calculationText = this.calculationText.slice(0, this.calculationText.length - 1);
        }
    }

    appendNumber(number) {
        if (number == "." && this.calculationText.includes(".")) {
            return;
        }
        this.calculationText = this.calculationText.toString() + number.toString();
    }

    setOperation(operation) {

        if (this.operation && this.operation !== "=") {
            this.calculationText = this.compute();
        }
        this.operation = operation;
        this.previousText = this.calculationText;
        this.calculationText = "";
    }

    compute() {
        if (this.previousText && this.operation) {
            return Calculator.Operate[this.operation](parseFloat(this.previousText), parseFloat(this.calculationText || 0));
        }
    }

    setResult() {
        let result = this.compute();
        this.previousText += this.operation + this.calculationText;
        this.calculationText = result;
        this.operation = "=";
    }

    updateDisplay() {
        this.calculationTextElement.innerHTML = this.calculationText || "0";
        this.previousTextElement.innerHTML = this.previousText + this.operation;
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
    element.addEventListener("click", () => {
        calculator.setOperation(element.getAttribute("data-key"));
        calculator.updateDisplay();
    });
});

equal.addEventListener("click", () => {
    calculator.setResult();
    calculator.updateDisplay();
})

del.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

clear.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

window.addEventListener("keyup", function (e) {
    key = this.document.querySelector(`.btn[data-key="${e.key}"]`);
    console.log(numbers.values());

    if (!key) {
        return;
    }

    // if (numbers.array.includes(key)) {
    //     calculator.appendNumber(element.getAttribute("data-key"));
    //     calculator.updateDisplay();
    // }
});