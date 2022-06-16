number_buttons = document.querySelectorAll(".btn");

buttons.array.forEach(element => {
    element.addEventListener("click", function (e) {

    });
});

window.addEventListener("keyup", function (e) {
    key = this.document.querySelector(`.btn[data-key="${e.key}"]`);
    console.log(key);

    if (!key) {
        return;
    }
});