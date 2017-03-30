import Loop from './Client/Loop';
import Ship from './Client/Ship';
import Player from './Client/Player';
import Stars from './Client/Stars';

import GameEngine from './Client/GameEngine';
import Factory from './Common/Factory';

Factory.add('Ship', Ship);
Factory.add('Player', Player);
Factory.add('Stars', Stars);

var app = new GameEngine(new Loop(20), document.getElementById('GameContainer'));

app.createEntity('Stars');

var ship1 = app.createEntity('Ship');
var ship2 = app.createEntity('Ship');

ship1.x -= 100;
ship1.y -= 100;

ship2.x += 100;
ship2.y += 100;

var player = app.createEntity('Player');

player.x -= 100;
player.y += 100;

app.start();
