var World = function(context, options) {
    this.ctx = context;
    this.width = options.width;
    this.height = options.height;
    this.wall = true;
    this.trail = false;

    this.particles = [];
    this.trails = [];
    this.materials = [];
    
    this.n1 = 1;
    this.n2 = 1.333;
};

// adds particle to array
World.prototype.addParticle = function(particle) {
    this.particles.push(particle);
};

World.prototype.addTrail = function(trail) {
    this.trails.push(trail);
};

World.prototype.addMaterial = function(material) {
    this.materials.push(material);
};

// draws background
World.prototype.drawRectangle = function(color, x, y, width, height) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
};

// draws particle
World.prototype.drawCircle = function(color, x, y, radius) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
};
