var Material = function(world, options) {
    this.world = world;
    this.x = options.x || 3 * this.world.width / 8;
    this.y = options.y || 0;
    this.color = "#EEEEEE";

    this.width = options.width || this.world.width / 4;
    this.height = options.height || this.world.height;
    this.n = options.n || 1.33; //Water
};

Material.prototype.draw = function() {
    this.world.drawRectangle(this.color, this.x, this.y, this.width, this.height);
};
