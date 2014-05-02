// enemy.js

'use strict';


var util = require('util'),
    $ = require('jquery'),
    Raphael = require('raphael'),
    Vector = require('vector2-node');

var smartimage = require('smartimage');

function getEnemyImage(cb){
    var si_opts = {
        protocol: 'https',
        //host: 'localhost:1337/https://my.smartimage.com',
        //host: 'localhost:1337/my.smartimage.com',
        //host: 'cors-anywhere.herokuapp.com/my.smartimage.com',
        host: 'cors-anywhere-eu.herokuapp.com/https://my.smartimage.com',
        auth: {
            // @TODO: REMOVE CREDENTIALS DUMMY!
            type: 'basic',
            username: 'mfeltner@widen.com',
            password: '@TODO'
        }
    };

    var query = {
        id: 'b39005eb-de38-44da-8f91-dd6c33198091'
    };
    return smartimage('GET', '/collections/:id/files', query, si_opts, cb);
}

var Moveable = require('./mixins/moveable');

var Enemy = function(canvas, position, vector, heading, initial_rotation, expire_time) {

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
    this.box = null;
    this.item = this.canvas.circle(this.position.x, this.position.y, 5);
    this.item.attr({fill: '#F1A128', stroke: 'none'});

    var self = this;
    getEnemyImage(function(err, res){
        if (!err){
            var baseUrl = 'http://mfeltner.smartimagecdn.com/img/%s/100px/%s.png';

            if (res.body){
                console.log(res.body);

                var thumbnailId = res.body.data.thumbnailId,
                    filename = res.body.data.filename;

                url = util.format(baseUrl, thumbnailId, filename);

                this.item = canvas.image(url, this.position.x, this.position.y, 5);
                this.box = this.item.getBBox();
            } else {
                var baseUrl = 'http://mfeltner.smartimagecdn.com/img/thdl1l/100px/ie.png';
                self.item = canvas.image(baseUrl, self.position.x, self.position.y, 5);
                self.box = self.item.getBBox();
            }
        }
    });

    //this.item = canvas.circle(this.position.x, this.position.y, 5);
    //this.item.attr({fill: 'red', stroke: 'none'});
    //this.box = this.item.getBBox();

    //console.log("ENEMY: " + this.position);
    //console.log("ENEMY BOX: " + this.box);

    //var transform = "t"+[this.position.x,this.position.y];
    //this.item.transform(transform);

}

util.inherits(Enemy, Moveable);
module.exports = Enemy;

