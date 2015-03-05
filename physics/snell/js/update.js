var update = function(game) {
    // updates particles position
    [game.world.particles,
     game.world.trails].forEach (
        function(gameElementArray) {
            gameElementArray.forEach(function(gameElement) {
                gameElement.update();
            });
        }
    );

    game.world.trails = game.world.trails.filter(function(trail) {
        return trail.active;
    });
    game.world.particles = game.world.particles.filter(function(particle) {
        return particle.active;
    });
};
