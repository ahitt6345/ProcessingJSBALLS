// we have a p5js context here
const friction_coefficient = 0.001;
const velocity_lower_bound = 0.001;
var myVector = function (x, y) {
	this.x = x || 0;
	this.y = y || 0;
};

myVector.prototype.add = function (v) {
	this.x += v.x;
	this.y += v.y;
};
var Ball = function (x, y, radius) {
	this.position = new myVector(x, y);
	this.radius = radius;
	this.color = color(random(255), random(255), random(255));
	this.vel = new myVector(random(-5, 5), random(-5, 5));
};

Ball.prototype.draw = function () {
	fill(this.color);
	ellipse(this.position.x, this.position.y, this.radius, this.radius);
};

Ball.prototype.update = function () {
	this.position.add(this.vel);
	if (this.position.x > width || this.position.x < 0) {
		if (this.vel.x > 0) {
			while (this.position.x > width) {
				this.position.x--;
			}
			this.vel.x = this.vel.x > 0 ? -this.vel.x : this.vel.x;
		} else if (this.vel.x < 0) {
			while (this.position.x < 0) {
				this.position.x++;
			}
			this.vel.x = this.vel.x < 0 ? -this.vel.x : this.vel.x;
		}
	}
	if (this.position.y > height || this.position.y < 0) {
		if (this.vel.y > 0) {
			while (this.position.y > height) {
				this.position.y--;
			}
			this.vel.y = this.vel.y > 0 ? -this.vel.y : this.vel.y;
		} else if (this.vel.y < 0) {
			while (this.position.y < 0) {
				this.position.y++;
			}
			this.vel.y = this.vel.y < 0 ? -this.vel.y : this.vel.y;
		}
	}

	// add friction
	this.vel.x *= 1 - friction_coefficient;
	this.vel.y *= 1 - friction_coefficient;
	if (Math.abs(this.vel.x) < velocity_lower_bound) {
		this.vel.x = 0;
	}
	if (Math.abs(this.vel.y) < velocity_lower_bound) {
		this.vel.y = 0;
	}

	// ball to ball collision
	var balls = Ball.ballContainer;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i] !== this) {
			var distance = dist(
				this.position.x,
				this.position.y,
				balls[i].position.x,
				balls[i].position.y
			);
			if (distance < (this.radius + balls[i].radius) / 2) {
				// find the angle from this ball to the other ball
				var angle = atan2(
					balls[i].position.y - this.position.y,
					balls[i].position.x - this.position.x
				);

				// find the opposite angle
				var opposite_angle = angle + PI;

				// have the balls move away from each other using a fraction of their velocity until they are no longer colliding
				while (distance < (this.radius + balls[i].radius) / 2) {
					this.position.x -= cos(angle) * 0.1;
					this.position.y -= sin(angle) * 0.1;
					balls[i].position.x -= cos(opposite_angle) * 0.1;
					balls[i].position.y -= sin(opposite_angle) * 0.1;
					distance = dist(
						this.position.x,
						this.position.y,
						balls[i].position.x,
						balls[i].position.y
					);
				}

				// swap velocities
				var temp = this.vel.x;
				this.vel.x = balls[i].vel.x;
				balls[i].vel.x = temp;
				temp = this.vel.y;
				this.vel.y = balls[i].vel.y;
				balls[i].vel.y = temp;
			}
		}
	}
};

var setup = function () {
	createCanvas(window.innerWidth, window.innerHeight);
	Ball.ballContainer = [];
	for (var i = 0; i < 100; i++) {
		Ball.ballContainer.push(new Ball(random(width), random(height), 20));
	}
};

var mouseClicked = function () {};

function FullScreenButtonPress() {
	fullscreen(true);
}
var draw = function () {
	background(0);
	var balls = Ball.ballContainer;
	for (var i = 0; i < balls.length; i++) {
		balls[i].draw();
		balls[i].update();
	}
};
