"use strict";

var draw = function(world) {
	world.drawRectangle("#000", 0, 0, world.width, world.height);
	
	[world.platforms,
	world.players,
    world.bullets,
    world.assets
	].forEach (
		function (gameElementArray) {
			gameElementArray.forEach(function(gameElement) {
				world.ctx.globalAlpha = 1.0;
				gameElement.draw();
			});
		}
	);
	
	if (world.end) {
		world.ctx.globalAlpha = 0.4;
		world.ctx.fillStyle = "#333";
		world.ctx.fillRect(0, 0, 600, 300);
		world.ctx.fillStyle = "#FFF";
		world.ctx.font = "50px Ubuntu Mono";
		world.ctx.globalAlpha = 1.0;
		world.ctx.fillText("You Win", 200, 150);
	}

    if (world.died) {
        world.ctx.globalAlpha = 0.4;
		world.ctx.fillStyle = "#333";
		world.ctx.fillRect(0, 0, 600, 300);
		world.ctx.fillStyle = "#FFF";
		world.ctx.font = "50px Ubuntu Mono";
		world.ctx.globalAlpha = 1.0;
		world.ctx.fillText("Game Over", 200, 150);
    }
}
