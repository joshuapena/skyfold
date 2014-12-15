var Game = function(canvas, sprites, audio, paramsOne, controlOptionsOne, paramsTwo, controlOptionsTwo) {
	this.fps = 60;
	var canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.sprites = sprites;
	this.audio = audio;
    this.paramsOne = paramsOne;
    this.paramsTwo = paramsTwo;

    console.log(paramsOne.sex);
    console.log(paramsOne.ethnicity);
    console.log(paramsOne.major);
		
	var worldOptions = {
		width : canvas.width,
		height : canvas.height
	};
	
	this.world = new World(this.ctx, worldOptions, this.sprites);

    this.controllerOne = new Controller(controlOptionsOne.num);
    this.controllerTwo = new Controller(controlOptionsTwo.num);
    this.world.controllers.push(this.controllerOne);
    this.world.controllers.push(this.controllerTwo);
	
	this.world.addPlayer(new Player(this.world, Bullet, this.audio, this.controllerOne, {
        x : this.world.width / 20,
        y : this.world.height,
        type : "playerOne",
        direction : "right",
        healthX : 50,
        percent : this.paramsOne.percent,
        result : this.paramsOne.result,
        sprite : "connor"
    }));
	this.world.addPlayer(new Player(this.world, Bullet, this.audio, this.controllerTwo, {
        x : this.world.width * 17 / 20,
        y : this.world.height,
        type : "playerTwo",
        direction : "left",
        healthX : 350,
        percent : this.paramsTwo.percent,
        result : this.paramsTwo.result,
        sprite : "evilConnor"
    }));
	
	var game = this;
	
	var gameloop = setInterval(function() {
		collider(game);
		update(game, audio);
		draw(game.world, {
            percentOne : paramsOne.percent,
            percentTwo : paramsTwo.percent,
        });
	}, 1000 / this.fps);
}
