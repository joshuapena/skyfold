"use strict";

var Spike = function(world, options) {
    this.world = world;

    this.spriteName = null;

    this.width = options.width || 30;
    this.height = options.height || 30;
    this.x = options.x || this.world.width / 2;
    this.y = options.y || this.world.height - this.height;
    this.type = "enemy";

    this.hitbox = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
    };
};

Spike.prototype.update = function() {
}; 
Spike.prototype.draw = function() {
    if (this.spriteName === null) {
        this.world.drawRectangle("#008000", this.x, this.y, this.width, this.height);
    } else {
        this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
    }

};

Spike.prototype.explode = function() {
};
