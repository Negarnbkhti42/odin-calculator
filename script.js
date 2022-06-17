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

function handleNumberClick(number) {
    calculator.appendNumber(number.getAttribute("data-key"));
    calculator.updateDisplay();
}

function handleOperatorClick(operation) {
    calculator.setOperation(operation.getAttribute("data-key"));
    calculator.updateDisplay();
}

function handleEqualClick() {
    calculator.setResult();
    calculator.updateDisplay();
}

function handleDelete() {
    calculator.delete();
    calculator.updateDisplay();
}

function handleClear() {
    calculator.clear();
    calculator.updateDisplay();
}

numbers.forEach(element => {
    element.addEventListener("click", () => { handleNumberClick(element); });
});

operators.forEach(element => {
    element.addEventListener("click", () => { handleNumberClick(element); });
});

equal.addEventListener("click", handleEqualClick);

del.addEventListener("click", handleDelete)

clear.addEventListener("click", handleClear)

window.addEventListener("keyup", function (e) {
    let key = this.document.querySelector(`.btn[data-key~="${e.key}"]`);

    if (!key) {
        return;
    }

    if (key.hasAttribute("data-number")) {
        handleNumberClick(key);
        return;
    }

    if (key.hasAttribute("data-operation")) {
        handleOperatorClick(key);
        return;
    }

    if (key.hasAttribute("data-equal")) {
        handleEqualClick();
        return;
    }

    if (key.hasAttribute("data-delete")) {
        handleDelete();
        return;
    }

    if (key.hasAttribute("data-clear")) {
        handleClear();
        return;
    }

});