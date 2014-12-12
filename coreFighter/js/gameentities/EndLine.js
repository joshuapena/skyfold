"use strict";

var EndLine = function(world, options) {
	this.world = world;
	this.color = options.color || "#EEE";
    this.spriteName = options.spriteName || null;
	
	this.x = options.x;
	this.y = options.y;
	this.width = options.width || 24;
	this.height = options.height || 30;
	
	this.active = true;
	
	this.hitbox = {
		x: this.x,
		y: this.y,
		width: this.width,
		height: this.height
	}
};

EndLine.prototype.update = function() {
};

EndLine.prototype.draw = function() {
    if (this.spriteName === null) {
        this.world.drawRectangle(this.color, this.x, this.y, this.width, this.height);
    } else {
        this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
    }
};
