var Game = function(canvas) {
    this.fps = 60;
    var canvas = canvas;
    this.ctx = canvas.getContext("2d");
    //this.ctx.canvas.height = $(window).height() - 50;
    //this.ctx.canvas.width = $(window).width();

    var worldOptions = {
        width : canvas.width,
        height : canvas.height
    };

    // creates world
    this.world = new World(this.ctx, worldOptions);

    // puts inital amount of particles on graph
    for (var i = 0; i < 1; i++)
        this.world.addParticle(new Particle(this.world, {
            id : this.world.particles.length
        }));

    this.world.addMaterial(new Material(this.world, {
    }));
    var game = this;

    // starts game loop
    var gameloop = setInterval(function() {
        update(game);
        collider(game);
        draw(game.world);
    }, 1000 / this.fps);
}
