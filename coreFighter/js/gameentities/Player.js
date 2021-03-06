"use strict";

var Player = function(world, Bullet, audio, controlOptions, options) {
	this.world = world;
	this.audio = audio;
    this.sprite = options.sprite;
	this.idleLeftAnimation = new SpriteAnimation(this.sprite + "/" + this.sprite + "L", 2, 1, 32);
	this.idleRightAnimation = new SpriteAnimation(this.sprite + "/" + this.sprite + "R", 2, 1, 32);
	this.walkLeftAnimation = new SpriteAnimation(this.sprite + "/" + this.sprite + "L", 2, 3, 32);
	this.walkRightAnimation = new SpriteAnimation(this.sprite + "/" + this.sprite + "R", 2, 3, 32);
    this.shootLeftAnimation = new SpriteAnimation(this.sprite + "/" + this.sprite + "L", 1, 5, 32);
    this.shootRightAnimation = new SpriteAnimation(this.sprite + "/" + this.sprite + "R", 1, 5, 32);
	this.jumpLeftAnimation = new SpriteAnimation(this.sprite + "/" + this.sprite + "L", 1, 6, 32);
	this.jumpRightAnimation = new SpriteAnimation(this.sprite + "/" + this.sprite + "R", 1, 6, 32);
    this.blockLeftAnimation = new SpriteAnimation(this.sprite + "/" + this.sprite + "L", 2, 7, 32);
    this.blockRightAnimation = new SpriteAnimation(this.sprite + "/" + this.sprite + "R", 2, 7, 32);
    this.punchLeftAnimation = new SpriteAnimation(this.sprite + "/" + this.sprite + "L", 1, 9, 32);
    this.punchRightAnimation = new SpriteAnimation(this.sprite + "/" + this.sprite + "R", 1, 9, 32);
	this.width = 20;
	this.height = 38;
	this.x = options.x || this.world.width / 2;
	this.y = options.y || this.world.height - this.height;
	this.speed = 3;
	this.velX = 0;
	this.velY = 0;
	
	this.jumping = false;
	this.jumpDown = false;

    this.action = false;
    this.blocking = false;
    this.punching = false;
	
	this.direction = options.direction || "right";
    this.shootAngle = 0;
    this.bullet = Bullet;
	this.type = options.type || "player";
	this.friction = 0.8;
	this.gravity = 0.3 * 2;
	this.state = this.idleRightAnimation;
	this.active = true;
	this.hit = false;

    // Sounds
    this.fireball = this.audio[options.fireball];
    this.punch = this.audio[options.punch];
    this.walking = this.audio[options.walking];
    this.shield = this.audio[options.shield];
    this.hitStart = options.hitStart;
    this.hitEnd = options.hitEnd;
    this.jump = this.audio[options.jump];
    this.jump.setVolume(80);

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

    this.lives = 100;

    this.myHealth = new HealthBar (this.world, this, {
        x : options.healthX || 50,
        lives: this.lives
    });
    
    this.lives = options.percent;

    this.controller = controlOptions;
    console.log("Player " + this.controller.num + " online, sir.");
};

Player.prototype.explode = function(damage, object) {
    var that = this;
    if (!this.hit) {
        if (object) {
            if (!this.blocking || object.punching) {
                this.audio["hit" + (Math.floor(Math.random() * (this.hitEnd - this.hitStart)) + this.hitStart)].play();

                this.lives -= damage;
                this.hit = true;
                var hitTimeOut = setTimeout(function() {
                    that.hit = false;
                    clearTimeout(hitTimeOut);
                }, 400);
            }
        } else {
            if (!this.blocking) {
                this.audio["hit" + (Math.floor(Math.random() * (this.hitEnd - this.hitStart)) + this.hitStart)].play();

                this.lives -= damage;
                this.hit = true;
                var hitTimeOut = setTimeout(function() {
                    that.hit = false;
                    clearTimeout(hitTimeOut);
                }, 400);
            }
        }
    }
    if (this.lives < 1) {
        console.log("You Died");
        this.active = false;
        this.myHealth.update();
        this.myHealth.draw();
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
	// Jump
	if (!this.action && this.controller.yAxis < -0.5) {
		if (!this.jumping) {
            this.jump.play();
			this.jumping = true;
			this.jumpDown = false;
			this.velY = -this.speed * 2 * 2;
		}
	}
	
	// Right
	if (!this.action && 0.5 < this.controller.xAxis) {
		if (this.velX < this.speed * 3) {
			this.velX++;
			this.direction = "right";
		}
	}
	
	// Left
	if (!this.action && this.controller.xAxis < -0.5) {
		if (this.velX > -this.speed * 3) {
			this.velX--;
			this.direction = "left";
		}
	}

    // Shoot
    if (!this.blocking && !this.punching &&
            this.controller.buttonA) {
        if (!this.shootLock) {
            this.shootLock = true;
            this.action = true;
            if (this.direction === "left") {
                this.shootAngle = Math.PI;
            } else if (this.direction === "right") {
                this.shootAngle = 0;
            }
            this.shoot();
            var that = this;
            setTimeout(function() {
                that.shootLock = false;
                that.action = false;
            }, 500);
        }
    } else if (!this.shootLock && !this.punching &&
            this.controller.buttonB) {
        this.action = true;
        this.blocking = true;
        this.audio["shield2"].play();
    } else if (!this.shootLock && !this.blocking &&
            this.controller.buttonX) {
        this.punching = true;
        this.punch.play();
    } else {
        this.blocking = false;
        this.punching = false;
        this.action = false;
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
    } else if (this.blocking) {
        if (this.direction === "right") {
            this.state = this.blockRightAnimation;
        } else {
            this.state = this.blockLeftAnimation;
        }
    } else if (this.punching) {
        if (this.direction === "right") {
            this.state = this.punchRightAnimation;
        } else {
            this.state = this.punchLeftAnimation;
        }
    } else if (this.shootLock) {
        if (this.direction === "right") {
            this.state = this.shootRightAnimation;
        } else {
            this.state = this.shootLeftAnimation;
        }
	} else if (this.controller.xAxis < -0.5) {
		this.state = this.walkLeftAnimation;
	} else if (0.5 < this.controller.xAxis) {
		this.state = this.walkRightAnimation;
	} else {
		if (this.direction === "right") {
			this.state = this.idleRightAnimation;
		} else {
			this.state = this.idleLeftAnimation;
		}
	}

    if ((this.controller.xAxis < -0.5 || 0.5 < this.controller.xAxis) && !this.jumping) {
        this.walking.play();
    } else {
        this.walking.pause();
    }

    if (this.blocking) {
        this.shield.play();
    } else {
        this.shield.pause();
    }
	
	this.updateHitbox();
    this.myHealth.update(this.lives);
};

Player.prototype.draw = function() {
	var that = this;
	this.state.draw(this.x, this.y, function(spriteName, x, y) {
		that.width = 3 * that.world.sprites[spriteName].width;
		that.height = 3 * that.world.sprites[spriteName].height;
		that.world.drawSprite(spriteName, x, y, that.width, that.height);
        that.hitboxMetrics.width = that.width;
        that.hitboxMetrics.height = that.height;
	});

    this.myHealth.draw();
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

Player.prototype.shoot = function() {
    this.fireball.stop();
    this.fireball.play();
    this.world.bullets.push (
            new this.bullet(this.world, {
                x: this.midpoint().x,
                y: this.midpoint().y - 3,
                width: 6 * 3,
                height: 6 * 3,
                hitboxMetrics: {
                    x: 0,
                    y: 0,
                    width: 6 * 3,
                    height: 6 * 3
                },
                angle: this.shootAngle,
                speed: 16,
                acceleration: 0.2,
                owner: this.type,
                kill: this,
                spriteName : "evilBullet"
            }, this.audio
    ));
};

Player.prototype.grab = function() {
};
