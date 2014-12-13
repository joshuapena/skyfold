"use strict";

var Bullet = function(world, options, audio) {
	this.world = world;
	this.color = options.color || "#F00";
	this.lines = 4;
	this.audio = audio;
	this.hitAudio = "enemyDamageBraqoon";
	
	this.x = options.x;
	this.y = options.y;
	
	this.speed = options.speed || 4;
	this.angle = options.angle;
	
	this.spriteName = options.spriteName || null;
    if (this.spriteName !== null) {
        this.moveAnimation = new SpriteAnimation(this.spriteName + "/" + this.spriteName, 8, 1, 32);
        console.log("evil bullet ready");
    }
	this.active = true;
	
	this.width = options.width;
	this.height = options.height;
	this.velX = this.speed * Math.cos(this.angle);
	this.velY = this.speed * Math.sin(this.angle);
	this.accelerationX = options.acceleration * Math.cos(this.angle);
	this.accelerationY = options.acceleration * Math.sin(this.angle);
	
	this.player = options.kill;
	
	this.owner = options.owner;
	
	this.hitboxMetrics = options.hitboxMetrics;
	
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

Bullet.prototype.explode = function(typeOfOther) {
	this.active = false;
	if (this.player) {
	}
}

Bullet.prototype.update = function () {
	this.y += this.velY;
	this.x += this.velX;
	
	this.velX += this.accelerationX;
	this.velY += this.accelerationY;
	
	if ((this.hitbox.x < 0 - this.hitbox.width) || (this.hitbox.x > this.world.width) || (this.hitbox.y < 0 - this.height ) || (this.hitbox.y > this.world.height)) {
		this.active = false;
	}
	
	this.updateHitbox();
	//this.updatePoints();
};

Bullet.prototype.draw = function () {
    var that = this;
	if (this.spriteName === null) {
		this.world.drawRectangle(this.color, this.x, this.y, this.width, this.height);
		//this.world.drawPolygon(this.color, this.lines, this.points);
	} else {
        this.moveAnimation.draw(this.x, this.y, function(spriteName, x, y) {
            that.world.drawSprite(spriteName, x, y, that.width, that.height);
        });
	}
};

Bullet.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

/*
Bullet.prototype.updatePoints = function() {
	this.points = {
		x0: this.x + this.pointsMetrics.x0,
		y0: this.y + this.pointsMetrics.y0,
		x1: this.x + this.pointsMetrics.x1,
		y1: this.y + this.pointsMetrics.y1,
		x2: this.x + this.pointsMetrics.x2,
		y2: this.y + this.pointsMetrics.y2,
		x3: this.x + this.pointsMetrics.x3,
		y3: this.y + this.pointsMetrics.y3
	};
};
*/
