'use strict';

var $;
var jquery = $ = require('jquery'),
    raphael = require('raphael');

var Game = require('./lib/game');

$(document).ready(function(){
    var game = new Game();
    game.start();
});

