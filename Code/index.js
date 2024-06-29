// we have a p5js context here

var myVector = function (x, y) {
	this.x = x || 0;
	this.y = y || 0;
};

myVector.prototype.add = function (v) {
	this.x += v.x;
	this.y += v.y;
};
var Ball = function (x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color(random(255), random(255), random(255));
	this.vel = new myVector(random(-5, 5), random(-5, 5));
	this.acc = new myVector(0, 0);
};

Ball.prototype.draw = function () {
	fill(this.color);
	ellipse(this.x, this.y, this.radius, this.radius);
};

Ball.prototype.update = function () {
	this.vel.add(this.acc);
	this.x += this.vel.x;
	this.y += this.vel.y;
	this.acc.x = 0;
	this.acc.y = 0;
};
var setup = function () {
	createCanvas(400, 400);
};

var draw = function () {};
