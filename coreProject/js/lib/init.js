"use strict";

var start = function(params, controlOptions) {
	document.getElementById("world").style.display = "inline";
	document.getElementById("instructions").style.display = "inline";
	document.getElementById("startButton").style.display = "none";
    document.getElementById("instructionsChoose").style.display = "none";
    document.getElementById("sexUndo").style.display = "none";
    document.getElementById("ethnicityUndo").style.display = "none";
    document.getElementById("majorUndo").style.display = "none";
    document.getElementById("controllerPrompt").style.display = "none";
	
	var sprites = initGame();
	var audio = initSound();

    params.setPercent();
	
	var game = new Game(document.getElementById("world"), sprites, audio, params, controlOptions);
}

function initGame() {
	var spriteLoader = new SpriteLoader();
	var sprites = {};
	var spriteNames = ["endFlag"];
	for (var i = 1; i < 7; i++) {
		spriteNames.push("connor/connorL" + i);
		spriteNames.push("connor/connorR" + i);
	}
	spriteLoader.load("./assets/images", spriteNames, ".png", function (loadedSprites) {
		for (var spriteName in loadedSprites) {
			sprites[spriteName] = loadedSprites[spriteName];
		}
	});
	
	return sprites;
}

function initSound() {
	var soundLoader = new SoundLoader();
	var audio = {};
	var audioNames = ["casanova", "jumpFins", "pewPewBizNiss", "enemyDamageBraqoon", "meow", "pokemonRuby", "itsPossible", "underTheSea"];
	var extensions = [".mp3", ".wav", ".wav", ".wav", ".wav", ".mp3", ".mp3", ".mp3"];
	soundLoader.load("./assets/sounds", audioNames, extensions, function (loadedAudio) {
		for (var audioName in loadedAudio) {
			//audio[audioName] = loadedAudio[audioName];
			//audio[audioName].setVolume(20);
		}
	});
	return audio;
}
