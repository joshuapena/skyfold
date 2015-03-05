$(function() {
    //start();
    var game = new Game(document.getElementById("world"));
    var wall = true;
    var trail = false;
    game.world.trail = trail;

    // adds new particle
    $("#world").click(function(e) {
        console.log("new particle");
        game.world.addParticle(new Particle(game.world, {
            x : e.offsetX,
            y : e.offsetY
        }));
    });

    // resets particles
    $("#resetButton").click(function(e) {
        console.log("reset");
        game.world.particles = [];
        game.world.trails = [];
        for (var i = 0; i < 1; i++) {
            game.world.addParticle(new Particle(game.world, {
            }));
        }
    });

    // changes from wall to wrap
    /*
    $("#wallButton").click(function(e) {
        if (wall) {
            game.world.wall = false;
            wall = false;
        } else {
            game.world.wall = true;
            wall = true;
        }
        $("#wallButton").attr('value', game.world.wall ? "Wall" : "Wrap");
    });
    */

    $("#slider").slider({
        formatter : function(value) {
                        game.world.n2 = value;
                        return 'Current n2 value : ' + value;
                    }
    });

    $("#trailsButton").click(function(e) {
        if (trail) {
            trail = false;
            game.world.trail = false;
            game.world.trails = [];
        } else {
            trail = true;
            game.world.trail = true;
        }
        $("#trailsButton").attr('value', game.world.trail ? "Trail" : "No Trail");
    });
});
