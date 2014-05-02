// enemy_factory.js

'use strict';

var util = require('util'),
    events = require('events'),
    $ = require('jquery'),
    Raphael = require('raphael'),
    Vector = require('vector2-node');

//var Moveable = require('./mixins/moveable');
var Enemy = require('./enemy');

var EnemyFactory = function(canvas) {

    events.EventEmitter.call(this);
    this.canvas = canvas;

}

util.inherits(EnemyFactory, events.EventEmitter);

EnemyFactory.prototype.create = function(heading, thrust, position){
    return new Enemy(this.canvas, position, thrust, heading, 0, Infinity);

}

module.exports = EnemyFactory;


