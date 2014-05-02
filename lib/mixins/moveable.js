// mixins/moveable.js

'use strict';

var util = require('util'),
    events = require('events');

var $ = require('jquery'),
    Vector = require('vector2-node');

var Moveable = function(canvas, position, vector, heading, initial_rotation){

    //events.EventEmitter.call(this);

    this.canvas = canvas;
    this.position = position;
    this.vector = vector;
    this.heading = heading;
    this.initial_rotation = initial_rotation;
    this.created_at = $.now();

};

Moveable.prototype.center = function(){
    return this.position;
};

util.inherits(Moveable, events.EventEmitter);

Moveable.prototype.update = function(){
    this.emit('update', this.vector);

    var current_position = this.position.clone();

    this.position.add(this.vector);

    if (this.position.x >= this.canvas.width) {
        this.position.x = 0;
    } else if (this.position.x < 0) {
        this.position.x = this.canvas.width - 1;
    }

    if (this.position.y >= this.canvas.height) {
        this.position.y = 0;
    } else if (this.position.y < 0) {
        this.position.y = this.canvas.height - 1;
    }

    var new_position = new Vector(
        this.position.x - current_position.x,
        this.position.y - current_position.y
    );

    console.log(this.heading, this.initial_rotation);
    var new_heading = this.heading+this.initial_rotation;
    //this.item.transform(transform);
    //var transform = "r"+new_heading;
    //var transform = "...T"+[new_position.x, new_position.y]+"r"+new_heading;
    var transform = "t"+[this.position.x, this.position.y]+"r"+new_heading;
    console.log(transform);
    this.item.transform(transform);
    //var transform = "...R"+(this.heading+this.initial_rotation);
    //this.item.transform(transform);

};

module.exports = Moveable;
