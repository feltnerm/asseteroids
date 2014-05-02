'use strict';

var $;
var jquery = $ = require('jquery'),
    raphael = require('raphael');

var Game = require('./lib/game');

$(document.body).css({ background: '#36949C' });

$(document).ready(function(){
    var game = new Game();
    game.start();
});

