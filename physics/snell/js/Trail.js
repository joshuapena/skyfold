var Trail = function(world, options) {
    this.world = world;

    this.x = options.x;
    this.y = options.y;
    this.radius = options.radius;
    this.color = options.color;
    this.active = true;
    this.date = new Date();
    this.seconds = this.date.getTime();
};

Trail.prototype.update = function() {
    this.date = new Date();
    if (this.date.getTime() - this.seconds > 100) {
        //this.radius -= 1;
        this.seconds = this.date.getTime();
    }
    if (this.radius < 1) {
        this.active = false;
    }
};

Trail.prototype.draw = function() {
    this.world.drawCircle(this.color, this.x, this.y, this.radius);
};
