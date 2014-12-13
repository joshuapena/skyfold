var collider = function(game) {
	
	game.world.players.forEach(function(player) {
        game.world.platforms.forEach(function(platform) {
            if (collides(player, platform)) {
                /*
                if (player.jumpDown == true) {
                    player.jumping = false;
                    player.y = platform.y - player.height;
                    player.velY = 0;
                }
                */
                player.collide(platform.y);
            }
        });

        game.world.spikes.forEach(function(spike) {
            if (collides(player, spike)) {
                console.log("foo");
                player.explode(15);
                spike.explode();
            }
        });

        game.world.assets.forEach(function(asset) {
            if (collides(player, asset)) {
                player.finished();
            }
        });

        game.world.bullets.forEach(function(bullet) {
            if (collides(bullet, player)) {
                player.explode(10);
                bullet.explode();
            }
        });

        game.world.players.forEach(function(playerTwo) {
            if (collides(player, playerTwo)) {
                if (player.type !== playerTwo.type) {
                    console.log("two players");
                    if (player.punching) {
                        playerTwo.explode(15, player);
                    }
                }
            }
        });
    });
};

var collides = function(source, target) {
	var lethal = false;
	if (source.hasOwnProperty("owner") && target.hasOwnProperty("type")) {
		lethal = (source.owner == "playerOne" && target.type == "playerTwo") ||
				 (source.owner == "playerTwo" && target.type == "playerOne");
	} else {
		lethal = true;
	}
	
	if (source.hasOwnProperty("owner") && target.hasOwnProperty("owner") && source.owner == target.owner) {
		lethal = false;
	}
	
	return source.hitbox.x < target.hitbox.x + target.hitbox.width &&
		   source.hitbox.x + source.hitbox.width > target.hitbox.x &&
		   source.hitbox.y < target.hitbox.y + target.hitbox.height &&
		   source.hitbox.y + source.hitbox.height > target.hitbox.y &&
		   lethal;
};
