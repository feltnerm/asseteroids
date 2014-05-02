'use strict';

var $ = require('jquery'),
    keycode = require('keycode'),
    Raphael = require('raphael'),
    Vector = require('vector2-node');

var Player = require('./player'),
    EnemyFactory = require('./enemy_factory');

module.exports = function(){

    this.debug = false;
    this.ENEMY_CREATE_DELAY = 3000; // 3 seconds

    this.fps = 50;
    this.canvas = Raphael(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
    console.log("width: ", this.canvas.width);
    console.log("height: ", this.canvas.height);
    this.last_enemy_created = 0;
    this.paused = false;
    this.keys_pressed = {};
    this.moveables = [];
    this.player = null;
    this.enemyFactory = null;

    this.start = function(){
        this.player = new Player(
            this.canvas,
            new Vector(this.canvas.width/2, this.canvas.height/2), // center of screen
            new Vector(0.0, 0.0),   // no initial thrust
            90,                     // initial movement to the right
            -45,                    // initial icon is rotated,
            Infinity                // never expires
        );

        this.enemyFactory = new EnemyFactory(this.canvas);

        this.moveables.push(this.player);
        this.setupEvents();
        this.startLoop();
    };

    this.setupEvents = function(){
        var self = this;

        $(window).resize(function() {
            self.canvas.setSize(document.documentElement.clientWidth, document.documentElement.clientWidth);
        });

        $(window).focus();

        $(document).keydown(function(e){
            var key = keycode(e.keyCode);
            self.keys_pressed[key] = true;

            if (key === 'p'){
                if (self.paused){
                    self.startLoop();
                } else {
                    self.pauseLoop();
                }
            }

        });

        $(document).keyup(function(e){
            var key = keycode(e.keyCode);
            self.keys_pressed[key] = false;
        });

    };

    this.startLoop = function(){
        console.log('start');

        this.runLoop = setInterval(this.tick.bind(this), 1000 / this.fps);
        this.paused = false;
        if (this.pauseItem) this.pauseItem.remove();
    }

    this.pauseLoop = function(){
        console.log('pause');

        clearInterval(this.runLoop);
        this.paused = true;
        this.pauseItem = this.canvas.text(this.canvas.width/2, this.canvas.height/2, 'PAUSED').attr({font:"80px Fontin-Sans, Arial, sans-serif", fill:"#000000", stroke: "#FFFFFF" });
    };

    this.isKeyPressed = function(key) {
        return this.keys_pressed[key] === true;
    };

    this.tick = function(){
        //console.log('tick');

        // spawn enemies (assets)
        var self = this;

        if ($.now() - this.last_enemy_created > this.ENEMY_CREATE_DELAY){
            this.last_enemy_created = $.now();

            var heading, thrust, position;

            heading = Math.floor(Math.random() * (360 + 1));

            thrust = new Vector(0.0,-6);
            thrust.rotateDeg(heading);

            if (this.player.position.x < this.canvas.width/2) {
            // Player is left, so start enemy right
            if (this.player.position.y < this.canvas.height/2) {
                // Player is at top half, so start enemy bottom
                position = new Vector(this.canvas.width-50, this.canvas.height-50);
            } else {
                position = new Vector(this.canvas.width-50, 50);
            }

            } else {
            // Player is right, so start enemy left
                if (this.player.position.y < this.canvas.height/2) {
                    // Player is at top half, so start enemy bottom
                    position = new Vector(50, this.canvas.height-50);
                } else {
                    position = new Vector(50, 50);
                }
            }
            var enemy = this.enemyFactory.create(heading, thrust, position);
            this.moveables.push(enemy);
            console.log('new enemy', enemy);
        }

        if (this.isKeyPressed('up')){
            this.player.thrust();
        }

        //if (this.isKeyPressed('down')){
        //    this.player.brake();
        //}

        if (this.isKeyPressed('left')){
            this.player.rotateLeft();

        }

        if (this.isKeyPressed('right')){
            this.player.rotateRight();
        }

        if (this.isKeyPressed('space')){
            var laser = this.player.shoot();
            if (laser) {
                this.moveables.push(laser);
            }
        }

        this.moveables.forEach(function(m) {
            if (m.dead === true || m.expired === true){
                var i = self.moveables.indexOf(m);
                self.moveables.splice(i, 1);
                return;
            }
            m.update(m);
        });

        //console.log('tock');
    };

};
