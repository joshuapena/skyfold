var collider = function(game) {
    for (var i = 0; i < game.world.particles.length; i++) {
        var particle = game.world.particles[i];
        for (var j = 0; j < game.world.materials.length; j++) {
            var material = game.world.materials[j];
            if (particle.x > material.x && !particle.front) {
                console.log("front hit : snell time");
                snellConversion(particle, game.world.n2);
                particle.front = true;
            } else if (particle.x > material.x + material.width && !particle.back) {
                console.log("back hit : snell time");
                snellConversion(particle, game.world.n1);
                particle.back = true;
            }
        }
    }
};

// gets distance between two particles
var distance = function(source, target) {
    return Math.sqrt(Math.pow(source.x - target.x, 2) + Math.pow(source.y - target.y, 2));
};

var snellConversion = function(particle, n2) {
    var velX1 = particle.velX;
    var velY1 = particle.velY;
    var totalVel1 = totalVel(velX1, velY1);
    var angle1 = Math.atan(velY1 / velX1);

    var totalVel2 = (particle.n / n2) * totalVel1;
    var angle2 = Math.asin( (particle.n / n2) * Math.sin(angle1) );
    var velX2 = totalVel2 * Math.cos(angle2);
    var velY2 = totalVel2 * Math.sin(angle2);

    particle.velX = velX2;
    particle.velY = velY2;
    particle.n = n2;
};

var totalVel = function(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

var radToDegree = function(rad) {
    return rad * (180 / Math.PI);
}

var degreeToRad = function(degree) {
    return degree * (Math.PI / 180);
}
