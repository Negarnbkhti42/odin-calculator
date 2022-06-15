buttons = document.querySelectorAll(".btn");
window.addEventListener("keyup", function (e) {
    key = this.document.querySelector(`.btn[data-key="${e.key}"]`);
    console.log(key);

    if (!key) {
        return;
    }
});