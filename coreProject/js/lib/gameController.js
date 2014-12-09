var Control = function() {
    this.hasController = false;
    this.num = 0;
};

var Controller = function(num) {
    this.controller = navigator.getGamepads()[num];
    this.buttonA = this.controller.buttons[0].pressed;
    this.xAxis = this.controller.axes[0];
    this.yAxis = this.controller.axes[1];
};

Controller.prototype.update = function() {
    this.buttonA = this.controller.buttons[0].pressed;
    this.xAxis = this.controller.axes[0];
    this.yAxis = this.controller.axes[1];
};

function canGame() {
    return "getGamepads" in navigator;
};

$(document).ready(function() {
    control = new Control();
    console.log("documentReady");

    if (canGame()) {

        var prompt = "For Chrome Users : To play the game using the gamepad, connect it and press any button!";
        $("#controllerPrompt").text(prompt);

        $(window).on("controllerconnected", function() {
            control.hasController = true;
            $("#controllerPrompt").html("Controller connected!");
            console.log("controller ready");
        });

        $(window).on("controllerdisconnected", function() {
            console.log("controller disconnected");
            $("#controllerPrompt").text(prompt);
        });

        var checkController = window.setInterval(function() {
            console.log("Check Controller");
            if (navigator.getGamepads()[0]) {
                if (!control.hasController) {
                    $(window).trigger("controllerconnected");
                    window.clearInterval(checkController);
                }
            }
        }, 500);

    }
});
