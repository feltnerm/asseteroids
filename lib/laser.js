// laser.js

'use strict';


var util = require('util'),
    $ = require('jquery'),
    Raphael = require('raphael'),
    Vector = require('vector2-node');

var Moveable = require('./mixins/moveable');

var Laser = function(canvas, position, vector, heading, initial_rotation, expire_time) {

    Moveable.call(this, canvas, position, vector, heading, initial_rotation, expire_time);
    //this.constructor.super_(canvas, position, vector, heading, initial_rotation, expire_time);

    this.dead = false;
    this.expired = false;
    this.canvas = canvas;
    this.position = position;
    this.vector = vector;
    this.heading = heading;
    this.initial_rotation = initial_rotation;
    this.expire_time = expire_time;
    this.created_at = $.now();

    this.item = this.canvas.circle(this.position.x, this.position.y, 5);
    this.item.attr({fill: 'orange', stroke: 'none'});
    this.box = this.item.getBBox();
    this.canvas.rect(this.box.x, this.box.y, this.box.width, this.box.height);
    //console.log("LASER: " + this.position);
    //console.log("LASER BOX: " + this.box);

    //var transform = "t"+[this.position.x,this.position.y];
    //this.item.transform(transform);

}

util.inherits(Laser, Moveable);

module.exports = Laser;
