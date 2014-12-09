"use strict";

var MovingSpike = function(world, options) {
    this.world = world;

    this.spriteName = null;

    this.width = 30;
    this.height = 30;
    this.x = options.x || this.world.width / 2;
    this.y = options.y || this.world.height / 2;
    this.type = "enemy";

    this.leftBound = options.leftBound || null;
    this.rightBound = options.rightBound || null;
    this.topBound = options.topBound || null;
    this.bottomBound = options.bottomBound || null;
    this.velX = 0;
    this.velY = 0;
    this.speed = options.speed || 2;
    this.movingUp = options.movingUp || false;
    this.movingRight = options.movingRight || false;

    this.hitboxMetrics = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
    };

    this.hitbox = {
        x: this.x + this.hitboxMetrics.x,
        y: this.y + this.hitboxMetrics.y,
        width: this.hitboxMetrics.width,
        height: this.hitboxMetrics.height
    };
};

MovingSpike.prototype.update = function() {
    if (this.movingUp) {
        if (this.velY > -this.speed) {
            this.velY--;
        }
    } else {
        if (this.velY < this.speed) {
            this.velY++;
        }
    }

    if (this.movingRight) {
        if (this.velX < this.speed) {
            this.velX++;
        }
    } else {
        if (this.velX > -this.speed) {
            this.velX--;
        }
    }


    if (this.topBound == null) {
        this.velY = 0;
    } else if (this.leftBound == null) {
        this.velX = 0;
    }

    this.x += this.velX;
    this.y += this.velY;

    if (this.x < this.leftBound) {
        this.movingRight = true;
    } else if (this.x > this.rightBound) {
        this.movingRight = false;
    }
    if (this.y < this.topBound) {
        this.movingUp = false;
    } else if (this.y > this.bottomBound) {
        this.movingUp = true;
    }

    this.updateHitbox();
};

MovingSpike.prototype.updateHitbox = function() {
    this.hitbox = {
        x: this.x + this.hitboxMetrics.x,
        y: this.y + this.hitboxMetrics.y,
        width: this.hitboxMetrics.width,
        height: this.hitboxMetrics.height
    };
};

MovingSpike.prototype.draw = function() {
    if (this.spriteName === null) {
        this.world.drawRectangle("#008000", this.x, this.y, this.width, this.height);
    } else {
        this.world.drawSprite(this.spriteName, this.x, this.y, this.width, this.height);
    }

};

MovingSpike.prototype.explode = function() {
};
