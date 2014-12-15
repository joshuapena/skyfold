"use strict";

// Stages
var nextStage = false;
var minionTime = false;
var bossTime = true;
var round = 0;
var playerEnd = false;

var test = true;
var spawn = true;

var playerReset = [false, false];
var resetInital = true;

var soundPlayed = false;

var update = function (game, audio) {
    // Calls the update function for all objects
	[game.world.platforms,
        game.world.bullets
	].forEach (
		function(gameElementArray) {
			gameElementArray.forEach(function(gameElement) {
				gameElement.update();
			});
		}
	);

    // Calls update for player function
    for (var i = 0; i < game.world.controllers.length; i++) {
        game.world.controllers[i].update();
        if (game.world.controllers[i].buttonSelect) {
            playerReset[i] = true;
        } else {
            playerReset[i] = false;
        }
    }

    if (playerReset[0] && playerReset[1]) {
        soundPlayed = false;
        console.log("reseting . . .");
        game.world.players.forEach(function(player) {
            player.active = false;
        });
        game.world.addPlayer(new Player(game.world, Bullet, game.audio, game.controllerOne, {
            x : game.world.width / 20,
            y : game.world.height / 2,
            type : "playerOne",
            direction : "right",
            healthX : 50,
            percent : game.paramsOne.percent,
            result : game.paramsOne.result,
            walking : "walking1",
            shield : "shield1",
            punch : "punch1",
            hitStart : 1,
            hitEnd : 4,
            fireball : "fireball1",
            jump : "jump1",
            sprite : "connor"
        }));
        game.world.addPlayer(new Player(game.world, Bullet, game.audio, game.controllerTwo, {
            x : game.world.width * 17 / 20,
            y : game.world.height / 2,
            type : "playerTwo",
            direction : "left",
            healthX : 350,
            percent : game.paramsTwo.percent,
            result : game.paramsTwo.result,
            walking : "walking2",
            shield : "shield2",
            punch : "punch2",
            hitStart : 4,
            hitEnd : 7,
            fireball : "fireball2",
            jump : "jump2",
            sprite : "evilConnor"
        }));

        game.world.died = false;
        console.log("reset");
        for (var i = 0; i < playerReset.length; i++) {
            playerReset[i] = false;
        };
        game.audio["reset1"].setVolume(80);
        game.audio["reset1"].play();
        /*
        if (game.audio["reset1"].isEnded() && game.audio["reset2"].isEnded()) {
            if (resetInital) {
                game.audio["reset1"].play();
                resetTime = false;
            } else {
                game.audio["reset2"].play();
                resetTime = true;
            }
        }
        */
    }

    game.world.players.forEach( function(player) {
        player.update();
        if (player.reachEnd === true) {
            playerEnd = true;
        }
    });

    // Filters inactive objects
    game.world.players = game.world.players.filter(function(player) {
        return player.active;
    });
	
	game.world.platforms = game.world.platforms.filter(function(platform) {
		return platform.active;
	});

    game.world.bullets = game.world.bullets.filter(function(bullet) {
        return bullet.active;
    });

    // Start of the level layout
    if (playerEnd === true) {
        game.world.end = true;
    } else if (game.world.players.length < 2) {
        game.world.died = true; 
        if (!soundPlayed) {
            //buzz.all().setVolume(10);
            game.audio["gameover"].setVolume(100);
            game.audio["gameover"].play();
            //buzz.all().setVolume(20);
            soundPlayed = true;
        }
    } else if (spawn) {
        // The floor
        game.world.platforms.push (new Platform(game.world, {
            x: 0,
            y: game.world.height - 30,
            width: game.world.width,
            height: 200
        }));

        // Platforms
        /*
        game.world.platforms.push(new Platform(game.world, {
			x: 175,
			y: 250,
		}));
		game.world.platforms.push(new Platform(game.world, {
			x: 375,
			y: 250,
		}));
		game.world.platforms.push(new Platform(game.world, {
			x: 130,
			y: 196,
		}));
		game.world.platforms.push(new Platform(game.world, {
			x: 420,
			y: 196,
		}));
        game.world.platforms.push(new Platform(game.world, {
            x: 130,
            y: 140
        }));
        game.world.platforms.push(new Platform(game.world, {
            x: 420,
            y: 140
        }));
        game.world.platforms.push(new Platform(game.world, {
            x: 175,
            y: 83
        }));
        game.world.platforms.push(new Platform(game.world, {
            x: 375,
            y: 83
        }));
        game.world.platforms.push(new Platform(game.world, {
            x: 275,
            y: 83
        }));
        */

        spawn = false;
	}

};
