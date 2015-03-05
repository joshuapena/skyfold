var Particle = function(world, options) {
    // sets inital values for particles
    this.world = world;
    this.radius = 10;
    this.id = options.id;
    // places particles on either mouse click or random place
    this.x = options.x || this.world.width / 8;
    this.y = options.y || this.world.height;
    // sets random speed
    //this.speedX = Math.floor((Math.random() * 7) + 3);
    //this.speedY = Math.floor((Math.random() * 7) + 3);
    this.speedX = 5;
    this.speedY = 5;
    // sets the direction of x and y vel
    this.velX = this.speedX;
    this.velY = -this.speedY;

    this.hitboxMetrics = {
        x : 0,
        y : 0,
        width : this.width,
        height : this.height
    };

    this.hitbox = {
        x : this.x + this.hitboxMetrics.x,
        y : this.y + this.hitboxMetrics.h,
        width : this.hitboxMetrics.width,
        height : this.hitboxMetrics.height
    };

    // set up for color transition
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.updateColor();
    this.incrementStops = 50;
    this.iteration = Math.round(1000 / (this.incrementStops / 2));

    // time for particle
    this.time = new Date();
    this.seconds = this.time.getTime();

    this.front = false;
    this.back = false;
    this.n = this.world.n1;

    this.active = true;
};

Particle.prototype.update = function() {
    // update position
    this.x += this.velX;
    this.y += this.velY;

    // checks if either world has walls or wraps around
    if (this.world.wall) {
        // if particle leaves canvas, puts it in the correct position
        if (this.x >= this.world.width + this.radius) {
            this.x = this.world.width - this.radius;
            this.velX *= -1;
            this.active = false;
        } else if(this.x <= 0) {
            this.x = this.radius;
            this.velX *= -1;
        }

        if (this.y >= this.world.height - this.radius) {
            this.y = this.world.height - this.radius;
            this.velY *= -1;
        } else if (this.y <= 0) {
            this.y = this.radius;
            this.velY *= -1;
            this.active = false;
        }
    } else {
        // if particle leaves canvas, puts it in the correct position
        if (this.x >= this.world.width) {
            this.x = 0;
        } else if (this.x <= 0 - this.radius) {
            this.x = this.world.width - this.radius;
        }

        if (this.y >= this.world.height) {
            this.y = 0;
        } else if (this.y <= 0 - this.radius) {
            this.y = this.world.height - this.radius;
        }
    }

    this.transition();
    this.updateHitbox();

    this.time = new Date();
    if (this.world.trail) {
        if (this.time.getTime() - this.seconds > 50) {
            this.world.addTrail(new Trail(this.world, {
                x : this.x,
                y : this.y,
                color : this.color,
                radius : this.radius
            }));

            this.seconds = this.time.getTime();
        }
    }
};

Particle.prototype.draw = function() {
    // draws particle on canvas
    this.world.drawCircle(this.color, this.x, this.y, this.radius);
};

Particle.prototype.updateHitbox = function() {
    this.hitbox = {
        x : this.x + this.hitboxMetrics.x,
        y : this.y + this.hitboxMetrics.y,
        width : this.hitboxMetrics.width,
        height : this.hitboxMetrics.height
    };
};

Particle.prototype.transition = function() {
    /// moves the rgb of the color to the new one
    if (this.currentColor[0] > this.randomColor[0]) {
        this.currentColor[0] -= this.increment[0];
        if (this.currentColor[0] <= this.randomColor[0]) {
            this.increment[0] = 0;
        }
    } else {
        this.currentColor[0] += this.increment[0];
        if (this.currentColor[0] >= this.randomColor[0]) {
            this.increment[0] = 0;
        }
    }

    if (this.currentColor[1] > this.randomColor[1]) {
        this.currentColor[1] -= this.increment[1];
        if (this.currentColor[1] <= this.randomColor[1]) {
            this.increment[1] = 0;
        }
    } else {
        this.currentColor[1] += this.increment[1];
        if (this.currentColor[1] >= this.randomColor[1]) {
            this.increment[1] = 0;
        }
    }

    if (this.currentColor[2] > this.randomColor[2]) {
        this.currentColor[2] -= this.increment[2];
        if (this.currentColor[2] <= this.randomColor[2]){
            this.increment[2] = 0;
        }
    } else {
        this.currentColor[2] += this.increment[2];
        if (this.currentColor[2] >= this.randomColor[2]) {
            this.increment[2] = 0;
        }
    }

    this.color = this.rgb2Hex(this.currentColor);

    // once gets to new color, gets new color to transition to
    if (this.increment[0] == 0 && this.increment[1] == 0 && this.increment[2] == 0) {
        this.updateColor();
    }
};

Particle.prototype.updateColor = function() {
    // updates values to transition
    this.currentColor = this.hexToRgb(this.color);
    this.randomColor = this.generateRGB();
    this.distance = this.calculateDistance(this.currentColor, this.randomColor);
    this.increment = this.calculateIncrement(this.distance);
};

Particle.prototype.hexToRgb = function(hex) {
    // converts color in hex form to rgb form
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    // if no result, choose a new color
    if (!result) {
        console.log("cat");
        this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        result = this.hexToRgb(this.color);
    }
    return [parseInt(result[1], 16), 
            parseInt(result[2], 16), 
            parseInt(result[3], 16)];
};

Particle.prototype.rgb2Hex = function(color) {
    // converts color in rgb form to hex form
    var hex = [];
    for (var i = 0; i < 3; i++) {
        hex.push(color[i].toString(16));
        if (hex[i].length < 2) {
            hex[i] = "0" + hex[i];
        }
    }
    return "#" + hex[0] + hex[1] + hex[2];
};

Particle.prototype.generateRGB = function() {
    // gets new color
    var color = [];
    for (var i = 0; i < 3; i++) {
        var num = Math.floor(Math.random() * 255);
        while (num < 25) {
            num = Math.floor(Math.random() * 255);
        }
        color.push(num);
    }
    return color;
};

Particle.prototype.calculateDistance = function(current, next) {
    // calculates distance from current to new color
    var distance = [];
    for (var i = 0; i < 3; i++) {
        distance.push(Math.abs(current[i] - next[i]));
    }
    return distance;
};

Particle.prototype.calculateIncrement = function(distance) {
    // calculates how quickly color gets incremented by
    var increment = [];
    for (var i = 0; i < 3; i++) {
        increment.push(Math.abs(Math.floor(distance[i] / 50)));
        if (increment[i] == 0) {
            increment[i]++;
        }
    }
    return increment;
};
