// player.js

'use strict';

var util = require('util'),
    $ = require('jquery'),
    Raphael = require('raphael'),
    Vector = require('vector2-node');

var Moveable = require('./mixins/moveable');

var Player = function(canvas, position, vector, heading, initial_rotation){

    this.MAX_VELOCITY = 50;

    //Moveable.call(this, canvas, position, vector, heading);

    this.constructor.super_(canvas, position, vector, heading, initial_rotation);

    this.canvas = canvas;
    this.vector = vector;
    this.heading = heading;
    this.position = position;
    this.initial_rotation = initial_rotation;
    // raphael.js.com/icons
    this.item = canvas.path('M15.834,29.084 15.834,16.166 2.917,16.166 29.083,2.917z');

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
    console.log('pew pew pew');
};

module.exports = Player;
