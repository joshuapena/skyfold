var Game = function(canvas, sprites, audio, paramsOne, controlOptionsOne, paramsTwo, controlOptionsTwo) {
	this.fps = 60;
	var canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.sprites = sprites;
	this.audio = audio;
	this.backgroundSound = "casanova";

    console.log(paramsOne.sex);
    console.log(paramsOne.ethnicity);
    console.log(paramsOne.major);
		
	var worldOptions = {
		width : canvas.width,
		height : canvas.height
	};
	
	this.world = new World(this.ctx, worldOptions, this.sprites);
	
	this.world.addPlayer(new Player(this.world, Bullet, this.audio, controlOptionsOne, {
        x : this.world.width / 20,
        y : this.world.height,
        type : "playerOne",
        direction : "right",
        healthX : 50,
        percent : paramsOne.percent,
        sprite : "connor"
    }));
	this.world.addPlayer(new Player(this.world, Bullet, this.audio, controlOptionsTwo, {
        x : this.world.width * 18 / 20,
        y : this.world.height,
        type : "playerTwo",
        direction : "left",
        healthX : 350,
        percent : paramsTwo.percent,
        sprite : "evilConnor"
    }));
	
	var game = this;
	
	var gameloop = setInterval(function() {
		collider(game);
		update(game, this.paramsOne, audio);
		draw(game.world);
	}, 1000 / this.fps);
}
