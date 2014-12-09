"use strict";

var Player = function(world, audio, controlOptions) {
	this.world = world;
	this.audio = audio;
	this.idleLeftAnimation = new SpriteAnimation("connor/connorL", 2, 1, 32);
	this.idleRightAnimation = new SpriteAnimation("connor/connorR", 2, 1, 32);
	this.walkLeftAnimation = new SpriteAnimation("connor/connorL", 2, 3, 32);
	this.walkRightAnimation = new SpriteAnimation("connor/connorR", 2, 3, 32);
	this.jumpLeftAnimation = new SpriteAnimation("connor/connorL", 1, 6, 32);
	this.jumpRightAnimation = new SpriteAnimation("connor/connorR", 1, 6, 32);
	this.width = 20;
	this.height = 38;
	this.x = this.world.width / 20;
	this.y = this.world.height - this.height;
	this.speed = 3;
	this.velX = 0;
	this.velY = 0;
	
	this.jumping = false;
	this.jumpDown = false;
	
	this.direction = "right";
	this.type = "player";
	this.friction = 0.8;
	this.gravity = 0.3;
	this.state = this.idleRightAnimation;
	this.jumpAudio = "jumpFins";
	this.active = true;
	this.hit = false;
	
	this.hitboxMetrics = {
		x: 0,
		y: 0,
		width: 20,
		height: 38
	};
	
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};

    this.lives = 1;
    this.reachEnd = false;
    if (controlOptions.hasController) {
        this.controller = new Controller(controlOptions.num);
    }
};

var keydown = [];

Player.prototype.explode = function(damage, object) {
    this.lives -= damage;
    console.log("foo");
    this.hit = true;
    if (this.lives < 1) {
        console.log("You Died");
        this.active = false;
    }
};

Player.prototype.collide = function(y) {
    if (this.jumpDown) {
        this.jumping = false;
        this.y = y - this.height;
        this.velY = 0;
    }
};

Player.prototype.update = function() {
    this.controller.update();

	// Jump
	if (keydown[38] || 
            this.controller.buttonA || 
            this.controller.yAxis < -0.5) {
		if (!this.jumping) {
			this.jumping = true;
			this.jumpDown = false;
			this.velY = -this.speed * 2;
		}
	}
	
	// Right
	if (keydown[39] || 
            0.5 < this.controller.xAxis) {
		if (this.velX < this.speed) {
			this.velX++;
			this.direction = "right";
		}
	}
	
	// Left
	if (keydown[37] || 
            this.controller.xAxis < -0.5) {
		if (this.velX > -this.speed) {
			this.velX--;
			this.direction = "left";
		}
	}
	
	this.velX *= this.friction;
	this.velY += this.gravity;
	
	if (this.velY >= 0) {
		this.jumpDown = true;
	}
	
	this.x += this.velX;
	this.y += this.velY;
	
	if (this.x >= this.world.width - this.width) {
		this.x = this.world.width - this.width;
	} else if (this.x <= 0) {
		this.x = 0;
	}
	
	if (this.y >= this.world.height - this.height) {
		this.y = this.world.height - this.height;
		this.jumping = false;
	}
	
	if (this.jumping) {
		if (this.direction === "right") {
			this.state = this.jumpRightAnimation;
		} else {
			this.state = this.jumpLeftAnimation;
		}
	} else if (keydown[37]) {
		this.state = this.walkLeftAnimation;
	} else if (keydown[39]) {
		this.state = this.walkRightAnimation;
	} else {
		if (this.direction === "right") {
			this.state = this.idleRightAnimation;
		} else {
			this.state = this.idleLeftAnimation;
		}
	}
	
	this.updateHitbox();
};

Player.prototype.draw = function() {
	var that = this;
	this.state.draw(this.x, this.y, function(spriteName, x, y) {
		that.width = that.world.sprites[spriteName].width;
		that.world.drawSprite(spriteName, x, y, that.width, that.height);
	});
};

Player.prototype.midpoint = function() {
	return {
		x: (this.x + this.width / 2),
		y: (this.y + this.height / 2)
	}
};

Player.prototype.updateHitbox = function() {
	this.hitbox = {
		x: this.x + this.hitboxMetrics.x,
		y: this.y + this.hitboxMetrics.y,
		width: this.hitboxMetrics.width,
		height: this.hitboxMetrics.height
	};
};

Player.prototype.finished = function() {
    this.reachEnd = true;
    this.active = false;
};

document.body.addEventListener("keydown", function(e) {
	keydown[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
	keydown[e.keyCode] = false;
});
