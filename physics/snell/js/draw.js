var draw = function(world) {
    // draws background
    world.drawRectangle("#000000", 0, 0, world.width, world.height);

    // draws particles and trail
    [ world.materials,
      world.trails,
      world.particles ].forEach (
        function(gameElementArray) {
            gameElementArray.forEach(function(gameElement) {
                gameElement.draw();
            });
        }
    );
};
