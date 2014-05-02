// mixins/moveable.js

'use strict';

var util = require('util'),
    events = require('events');

var $ = require('jquery'),
    Vector = require('vector2-node');

var Moveable = function(canvas, position, vector, heading, initial_rotation, expire_time){

    events.EventEmitter.call(this);

    this.dead = false;
    this.expired = false;
    this.canvas = canvas;
    this.position = position;
    this.vector = vector;
    this.heading = heading;
    this.initial_rotation = initial_rotation;
    this.expire_time = expire_time;
    this.created_at = $.now();
    console.log(this.position.x, this.position.y);

};

Moveable.prototype.center = function(){
    return this.position;
};

util.inherits(Moveable, events.EventEmitter);

Moveable.prototype.die = function(){
    console.log('die');
    this.dead = true;
    this.item.remove();
}

Moveable.prototype.expire = function(){
    this.expired = true;
    this.item.remove();
}

Moveable.prototype.update = function(){
    this.emit('update', this.vector);

    if ($.now() - this.created_at > this.expire_time){
        this.die();
    } else {

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

        var new_heading = this.heading+this.initial_rotation;
        var transform = "t"+[this.position.x, this.position.y]+"r"+new_heading;
        //var transform = "r"+new_heading+"t"+[this.position.x-current_position.x, this.position.y-current_position.y];
        this.item.transform(transform);

        // DEBUG ONLY
        //if (this.box){
        //    this.box = this.item.getBBox();
        //    this.debug_item = this.canvas.rect(this.box.x, this.box.y, this.box.width, this.box.height);
        //}


    }
};

module.exports = Moveable;
