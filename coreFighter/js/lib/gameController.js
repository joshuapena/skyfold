var Control = function(num) {
    this.hasController = false;
    this.num = num;
};

var ControllersReady = function() {
    this.controllerOne = false;
    this.controllerTwo = false;
    this.playerOneParams = false;
    this.playerTwoParams = false;
};

ControllersReady.prototype.update = function() {
    if (this.controllerOne && this.controllerTwo
            && this.playerOneParams && this.playerTwoParams) {
        document.getElementById("startButton").style.display = "inline";
    } else {
        $("#startButton").hide();
    }
};

var Controller = function(num) {
    this.num = num;
    this.controller = navigator.getGamepads()[this.num];
    this.buttonA = this.controller.buttons[0].pressed;
    this.buttonB = this.controller.buttons[1].pressed;
    this.buttonX = this.controller.buttons[3].pressed;
    this.buttonY = this.controller.buttons[4].pressed;
    this.buttonSelect = this.controller.buttons[9].pressed;
    this.xAxis = this.controller.axes[0];
    this.yAxis = this.controller.axes[1];
};

Controller.prototype.update = function() {
    this.controller = navigator.getGamepads()[this.num];
    this.buttonA = this.controller.buttons[0].pressed;
    this.buttonB = this.controller.buttons[1].pressed;
    this.buttonX = this.controller.buttons[3].pressed;
    this.buttonY = this.controller.buttons[4].pressed;
    this.buttonSelect = this.controller.buttons[9].pressed;
    this.xAxis = this.controller.axes[0];
    this.yAxis = this.controller.axes[1];
};

function canGame() {
    return "getGamepads" in navigator;
};

$(document).ready(function() {
    controlOne = new Control(0);
    controlTwo = new Control(1);
    controllerReady = new ControllersReady();
    console.log("documentReady");
    paramsPlayerOne = new Params(controllerReady);
    paramsPlayerTwo = new ParamsSecond(controllerReady);

    if (canGame()) {

        var prompt = "For Chrome Users : To play the game using the gamepad, connect it and press any button!";
        $("#controllerPrompt").text(prompt);
        $("#controllerPromptTwo").text(prompt);

        $(window).on("controlleroneconnected", function() {
            controlOne.hasController = true;
            $("#controllerPrompt").html("Controller 1 connected!");
            console.log("controller one ready");
            controllerReady.controllerOne = true;
            controllerReady.update();
        });

        $(window).on("controllerdisconnected", function() {
            console.log("controller disconnected");
            $("#controllerPrompt").text(prompt);
        });

        var checkControllerOne = window.setInterval(function() {
            console.log("Check Controller One");
            if (navigator.getGamepads()[0]) {
                if (!controlOne.hasController) {
                    $(window).trigger("controlleroneconnected");
                }
                window.clearInterval(checkControllerOne);
            }
        }, 500);

        $(window).on("controllertwoconnected", function() {
            controlTwo.hasController = true;
            $("#controllerPromptTwo").html("Controller 2 connected!");
            console.log("controller two ready");
            controllerReady.controllerTwo = true;
            controllerReady.update();
        });


        var checkControllerTwo = window.setInterval(function() {
            console.log("Check Controller Two");
            if (navigator.getGamepads()[1]) {
                if (!controlTwo.hasController) {
                    $(window).trigger("controllertwoconnected");
                }
                window.clearInterval(checkControllerTwo);
            }
        }, 500);

    }
});
