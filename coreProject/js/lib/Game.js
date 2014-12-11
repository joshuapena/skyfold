var Game = function(canvas, sprites, audio, params, controlOptions) {
	this.fps = 60;
	var canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.sprites = sprites;
	this.audio = audio;
	this.backgroundSound = "casanova";
    this.params = params;

    console.log(params.sex);
    console.log(params.ethnicity);
    console.log(params.major);
		
	var worldOptions = {
		width : canvas.width,
		height : canvas.height
	};
	
	this.world = new World(this.ctx, worldOptions, this.sprites);

    if (controlOptions.hasController) {
        this.controller = new Controller(controlOptions.num);
        this.world.controllers.push(this.controller);
    } else {
        this.controller = {
        };
    }
	
	this.world.addPlayer(new Player(this.world, this.audio, this.controller));
	
	var game = this;
	
	var gameloop = setInterval(function() {
		collider(game);
		update(game, this.params, audio);
		draw(game.world);
	}, 1000 / this.fps);
}
