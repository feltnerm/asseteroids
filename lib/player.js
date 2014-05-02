// player.js

'use strict';

var util = require('util'),
    $ = require('jquery'),
    Raphael = require('raphael'),
    Vector = require('vector2-node');

var Moveable = require('./mixins/moveable'),
    Laser = require('./laser');

var Player = function(canvas, position, vector, heading, initial_rotation, expire_time){

    //this.constructor.super_(canvas, position, vector, heading, initial_rotation, expire_time);
    Moveable.call(this, canvas, position, vector, heading, initial_rotation, expire_time);

    this.MAX_VELOCITY = 50;
    this.FIRED_AT = $.now();
    this.TIME_BETWEEN_FIRE = 150;

    this.dead = false;
    this.expired = false;
    this.canvas = canvas;
    this.position = position;
    this.vector = vector;
    this.heading = heading;
    this.initial_rotation = initial_rotation;
    this.expire_time = expire_time;
    this.created_at = $.now();

    // raphael.js.com/icons
    this.item = canvas.path('M15.834,29.084 15.834,16.166 2.917,16.166 29.083,2.917z');
    this.box = this.item.getBBox();

    //this.item.transform("s1.5");
    this.item.attr({
        fill: '#000000',
        stroke: 'none'
    });
    var transform = "t"+[this.position.x,this.position.y];
    this.item.transform(transform);
};

util.inherits(Player, Moveable);

Player.prototype.debug = function(){
};

Player.prototype.thrust = function(velocity){
    this.emit('thrust');
    var magnitude = new Vector(0.0, -0.55);

    magnitude.rotateDeg(this.heading);
    var vc = this.vector.clone();
    if (vc.add(magnitude).length() < this.MAX_VELOCITY) {
        this.vector.add(magnitude);
    }
};

/**
Player.prototype.brake = function(velocity){
    this.emit('brake');
    var magnitude = new Vector(0.0, +0.55);

    magnitude.rotateDeg(this.heading);
    var vc = this.vector.clone();
    if (vc.add(magnitude).length() < this.MAX_VELOCITY) {
        this.vector.add(magnitude);
    }
};
*/
Player.prototype.center = function() {
        var clone = this.position.clone(),
            box = this.item.getBBox();

        //this.canvas.rect(box.x, box.y, box.width, box.height);

        return new Vector(box.x, box.y);
        //return clone.add(new Vector(box.x, box.y));
        //return clone.add(new Vector((box.x + box.x2)/2, (box.y1 + box.y2)/2));
        //return clone.add(new Vector((this.box.x + this.box.x2)/2, (this.box.y1 + this.box.y2)/2));
}

Player.prototype.rotateLeft = function(){
    this.emit('rotateLeft');
    this.heading -= 5.0;

};

Player.prototype.rotateRight = function(){
    this.emit('rotateRight');
    this.heading += 5.0;
};

Player.prototype.shoot = function(){
    this.emit('shoot');

    var now = $.now();
    if (now - this.fired_at < this.TIME_BETWEEN_FIRE){
        return;
    }

    this.fired_at = now;

    //console.log("SHIP: " + this.position);
    //console.log("SHIP BOX: " + this.box);
    //var position = this.position.clone();
    //var position = new Vector(this.position.x, this.position.y);
    //position.add(new Vector(this.center().x, this.center().y));
    //var position = new Vector(this.center().x - this.canvas.width, this.center().y - this.canvas.height);
    var position = new Vector(this.center().x, this.center().y);
    //var position = new Vector(this.position.x, this.position.y);

    var force = new Vector(0.0, -8.0);
    //force.rotateDeg(this.heading);
    //force.add(this.vector);

    var laser = new Laser(this.canvas, position, force, 0, 0, 2000);

    return laser;

};

module.exports = Player;
