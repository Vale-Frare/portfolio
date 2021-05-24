var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    backgroundColor: '#1A1A1A',
    parent: "phaser",
    dom: {
        createContainer: true
    },
    scene: [ MainMenu, PlayScene, RetryMenu ]
};

var game = new Phaser.Game(config);

var player;
var stars;
var stars_red;
var bombs;
var platforms;
var platforms2;
var maderas;
var rotoescudos;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var lava;
var shields;

var button;

var lavaDir = .1;

var particulas = [];

var plataformas2 = 200;

var escudo = false;
var rotoescudo = false;

var left;
var right;
var salto;

var playerVelocity;

var glass;

var jump;
var starpickup;
var dead;