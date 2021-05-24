class PlayScene extends Phaser.Scene {

    constructor() {
        super('playScene');
    }

    preload ()
    {
        this.load.audio('glass', 'assets/audio/glass.ogg');
        this.load.audio('jump', 'assets/audio/jump.wav');
        this.load.audio('starpickup', 'assets/audio/starpickup.wav');
        this.load.audio('dead', 'assets/audio/dead.wav');
        this.load.audio('fire', 'assets/audio/fire.ogg');
        
        this.load.image('red', 'assets/red.png');
        this.load.image('blue', 'assets/blue.png');
        this.load.image('fire', 'assets/fire.png');
        this.load.image('sky', 'assets/sky.png');
        
        this.load.image('platform', 'assets/platform.png');
        this.load.image('platform2', 'assets/platform2.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('star_red', 'assets/star_red.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('madera', 'assets/madera.png');

        this.load.image('rotoshield', 'assets/shield.png');
        this.load.image('shield', 'assets/shield.png');

        this.load.image('rotoshieldP', 'assets/rotoshield.png');
        this.load.image('rotoshieldCol', 'assets/rotoshieldCol.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('lava', 'assets/lava.png', { frameWidth: 1000, frameHeight: 1200 });
    }

    create ()
    {
        //650
        //1135
        glass = this.sound.add('glass');

        jump = this.sound.add('jump');
        starpickup = this.sound.add('starpickup');
        dead = this.sound.add('dead');

        fireAtmos = this.sound.add('fire', {loop: true, volume: 0})
        fireAtmos.play();

        // Set controls
        left = document.getElementsByClassName("left");
        right = document.getElementsByClassName("right");
        salto = document.getElementsByClassName("salto");

        //  A simple background for our game
        this.add.image(500, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        lava = this.physics.add.staticGroup();
        platforms = this.physics.add.staticGroup();
        platforms2 = this.physics.add.staticGroup();
        rotoescudos = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        lava.create(500, 1135, 'lava').refreshBody();

        platforms.create(100, 530, 'platform').setScale(2).refreshBody();
        platforms.create(300, 530, 'platform').setScale(2).refreshBody();
        platforms.create(500, 530, 'platform').setScale(2).refreshBody();
        platforms.create(700, 530, 'platform').setScale(2).refreshBody();
        platforms.create(900, 530, 'platform').setScale(2).refreshBody();

        lava.setDepth(1);

        rotoescudos.create(0, 0, 'rotoshieldCol').refreshBody();

        rotoescudos.getChildren()[0].setOrigin(0.5, 3.5);

        //rotoescudos.getChildren()[0].setSize(32,8,30);

        //  Now let's create some ledges

        // The player and its settings
        player = this.physics.add.sprite(100, 150, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.1);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'lava',
            frames: this.anims.generateFrameNumbers('lava', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.play('lava', lava.getChildren()[0]);

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 4,
            setXY: { x: 100, y: 0, stepX: 200 }
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        shields = this.physics.add.group();

        bombs = this.physics.add.group();

        stars_red = this.physics.add.group();

        maderas = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, 'Puntos: 0', { fontSize: '32px', fill: '#FFF', fontFamily: 'Helvetica', fontWeight: 'bold'});

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, lava, morir, null, this);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, platforms2);
        this.physics.add.collider(stars, lava);
        this.physics.add.collider(stars, platforms);
        //this.physics.add.collider(bombs, lava);
        this.physics.add.collider(stars_red, lava);
        this.physics.add.collider(maderas, lava);
        this.physics.add.collider(rotoescudos, platforms);

        this.physics.add.collider(rotoescudos, bombs);

        this.physics.add.overlap(rotoescudos, bombs, rebotarBomba, null, this);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.overlap(player, stars_red, collectStar, null, this);
        this.physics.add.overlap(player, maderas, collectStar, null, this);
        this.physics.add.overlap(player, shields, collectStar, null, this);

        this.physics.add.collider(player, bombs, morir, null, this);

        document.getElementsByClassName("right")[0].addEventListener("mousedown", function() {
            playerVelocity = 160;
        });
        document.getElementsByClassName("right")[0].addEventListener("mouseup", function() {
            playerVelocity = 0;
        });
        document.getElementsByClassName("right")[0].addEventListener("mouseout", function() {
            playerVelocity = 0;
        });
        document.getElementsByClassName("left")[0].addEventListener("mousedown", function() {
            playerVelocity = -160;
        });
        document.getElementsByClassName("left")[0].addEventListener("mouseup", function() {
            playerVelocity = 0;
        });
        document.getElementsByClassName("left")[0].addEventListener("mouseout", function() {
            playerVelocity = 0;
        });
        document.getElementsByClassName("salto")[0].addEventListener("click", function() {
            if (player.body.touching.down)
            {
                jump.play();
                player.setVelocityY(-560);
            }
        });
    }

    update()
    {

        if (gameOver)
        {
            return;
        }

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            if(playerVelocity == 160) {
                player.setVelocityX(160);
                player.anims.play('right', true);
            }else if(playerVelocity == -160) {
                player.setVelocityX(-160);
                player.anims.play('left', true);
            }else 
            {
                player.setVelocityX(0);

                player.anims.play('turn');
            }
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            jump.play();
            player.setVelocityY(-560);
        }
    
        lava.getChildren()[0].y -= lavaDir;
        lava.getChildren()[0].refreshBody();

        platforms.children.iterate(function(child) {
            child.y -= lavaDir;
            child.refreshBody();
        });

        platforms2.children.iterate(function(child) {
            child.y = platforms.getChildren()[0].y;
            child.refreshBody();
        });

        if (lavaDir<.15) {lavaDir++;}
        else if (lavaDir>.15) {lavaDir = .15;}

        if(escudo) {player.setTint(0x0000ff);} else {
            player.setTint(0xffffff);
        }

        if (rotoescudo) {
            rotoescudos.getChildren()[0].x = player.x;
            rotoescudos.getChildren()[0].y = player.y;
            rotoescudos.getChildren()[0].enableBody();
        }
        else {
            rotoescudos.getChildren()[0].x = 1000;
            rotoescudos.getChildren()[0].y = 1000;
            rotoescudos.getChildren()[0].disableBody();
        }
        rotoescudos.getChildren()[0].refreshBody();

        document.body.style.backgroundColor = `rgba(${255 - ((lava.getChildren()[0].y - 650)/1.9)},0,0)`;
        document.getElementsByClassName("fire")[0].style.top = `${(Phaser.Math.Percent((lava.getChildren()[0].y - 650), 0, 650) * 100) + 30}%`;
        document.getElementsByClassName("fire")[1].style.top = `${(Phaser.Math.Percent((lava.getChildren()[0].y - 650), 0, 650) * 100) + 30}%`;
        document.getElementsByClassName("fire")[2].style.top = `${(Phaser.Math.Percent((lava.getChildren()[0].y - 650), 0, 650) * 100) + 30}%`;
        document.getElementsByClassName("lava")[0].style.top = `${(Phaser.Math.Percent((lava.getChildren()[0].y - 650), 0, 650) * 100) + 115}%`;      
        fireAtmos.volume = Phaser.Math.Clamp((.50 - Phaser.Math.Percent((lava.getChildren()[0].y - 650), 0, 650)), 0, 1);
        if ((Phaser.Math.Percent((lava.getChildren()[0].y - 650), 0, 650) * 100) < 40) {
            if (document.getElementsByClassName("broken-glass")[0].style.opacity != 1) {
                glass.play();
            }
            document.getElementsByClassName("broken-glass")[0].style.opacity = `100%`;
        }
    }  
}

function rebotarBomba(bomba) {
    // nada
}

function collectStar (player, star)
{
    starpickup.play();
    star.disableBody(true, true);
    console.log(stars.countActive(true));
    //  Add and update the score
    if (star.texture.key == "star_red") {
        score += 15;
        bajarLava(9);
    }else if (star.texture.key == "madera") {
        plataformaNueva();
        bajarLava(2);
    }else if (star.texture.key == "shield") {
        activarEscudo();
    }else if (star.texture.key == "rotoshield") {
        activarRotoescudo();
    }else {
        if (star.tintBottomLeft == 0x0000FF) {
            score += 15;
            bajarLava(2);
        }
        else {
            score += 10;
            bajarLava(2);
        }
    }
    scoreText.setText(`Puntos: ${score}`);

    console.log(stars.getChildren()[0]);

    particulas.forEach(function(part) {
        if (star == part.star) {
            part.particulas.on = false;
        }
    },this);

    if (stars.countActive(true) === 0)
    {   
        //  A new batch of stars to collect
        if (star.tintBottomLeft == 0x0000FF) {
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);
                child.setTint(0xFFFFFF);

            });
        }else {
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);
                child.setTint(0x0000FF);

            });
        }

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        crearBolaDeFuego(this, x);

        switch (Phaser.Math.Between(0, 4)) {
            case 0:
                if (plataformas2 > 800) {
                    crearEstrellaRoja(this, x);
                }
                else {
                    crearMadera(this, x);
                }
                break;
            case 1:
                crearMadera(this, x);
                break;
            case 2:
                if (!escudo) {
                    crearShield(this, x)
                }
                else {
                    crearEstrellaRoja(this, x);
                }
                break;
            case 3:
                if (!rotoescudo) {
                    crearRotoshield(this, x)
                }
                else {
                    crearEstrellaRoja(this, x);
                }
                break;
            default:
                crearEstrellaRoja(this, x);
                break;
        }
    }
}

function bajarLava(altura) {
    lavaDir -= altura;
}

function morir (player, bomb)
{
    if(!escudo) {
        dead.play();
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;

        this.scene.start('retryMenu');
    }else {
        escudo = false;
        if (bomb.texture.key == "lava") {
            player.setVelocityY(-560);
        }else {
            player.setVelocityY(-320);
            bomb.disableBody(true, true);

            particulas.forEach(function(part) {
            if (bomb == part.star) {
                part.particulas.on = false;
            }
            },this);
        }
    }
}

function crearEstrellaRoja(game, x) {
    var star_red = stars_red.create(x, 16, 'star_red');

    star_red.setBounce(1);
    star_red.setCollideWorldBounds(true);
    star_red.setVelocity(Phaser.Math.Between(-200, 200), 20);

    var particles = game.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        gravity: { x: 0, y: 200 },
        blendMode: 'NORMAL',
        follow: star_red
    });

    particulas.push({
        star: star_red,
        particulas: emitter});
}

function crearMadera(game, x) {
    var madera = maderas.create(x, 16, 'madera');

    madera.setBounce(1);
    madera.setCollideWorldBounds(true);
    madera.setVelocity(Phaser.Math.Between(-200, 200), 20);
}

function crearBolaDeFuego(game, x) {
    var bomb = bombs.create(x, 16, 'bomb');  

    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    var particlesb = game.add.particles('fire');

    var emitterb = particlesb.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        gravity: { x: 0, y: 200 },
        blendMode: 'NORMAL',
        follow: bomb
    });

    particulas.push({
        star: bomb,
        particulas: emitterb});
}

function crearShield(game, x) {
    var xstart;
    var xspeed;
    if (Phaser.Math.Between(0, 1)>0) {
        xstart = 800;
        xspeed = -800;
    }else {
        xstart = 0;
        xspeed = 800;
    }


    var shield = shields.create(xstart, -750, 'shield');  

    shield.setBounce(1);
    shield.setCollideWorldBounds(true);
    shield.setVelocity(xspeed, -300);

    var particles = game.add.particles('blue');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        gravity: { x: 0, y: 200 },
        blendMode: 'NORMAL',
        follow: shield
    });

    particulas.push({
        star: shield,
        particulas: emitter});
}

function crearRotoshield(game, x) {
    var xstart;
    var xspeed;
    if (Phaser.Math.Between(0, 1)>0) {
        xstart = 800;
        xspeed = -800;
    }else {
        xstart = 0;
        xspeed = 800;
    }


    var shield = shields.create(xstart, -750, 'rotoshield');  

    shield.setBounce(1);
    shield.setCollideWorldBounds(true);
    shield.setVelocity(xspeed, -300);

    var particles = game.add.particles('blue');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        gravity: { x: 0, y: 200 },
        blendMode: 'NORMAL',
        tint: [0xffffff, 0x000000],
        follow: shield
    });

    particulas.push({
        star: shield,
        particulas: emitter});
}

function plataformaNueva() {
    if (plataformas2 > 800) {}
    else {
        platforms2.create(plataformas2, 16, 'platform2').setScale(2);
        plataformas2 += 200;
    }
}

function activarEscudo() {
    escudo = true;
}

function activarRotoescudo() {
    rotoescudo = true;
}