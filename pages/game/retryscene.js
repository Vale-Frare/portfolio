class RetryMenu extends Phaser.Scene {

    constructor() {
        super({key: 'retryMenu'});
    }

    preload ()
    {
        this.load.image('logo', 'assets/mainmenu/logo.png');
    }

    create ()
    {
        document.getElementsByClassName("header")[0].style.marginTop = 0;
        fireAtmos.stop();
        const logo = this.add.image(0, 0, 'logo');

        Phaser.Display.Align.In.Center(logo, this.add.zone(500, 150, 800, 600));

        var style = '';

        var points = this.add.dom(500 + 200, 230).createElement('h1', style, `Puntos conseguidos: ${score}`);
        var button = this.add.dom(500 + 200, 300).createElement('button', style, 'Retry');

        button.addListener('click');

        button.on('click', function () {
            game.scene.start('playScene');
            gameOver = false;
            logo.visible = false;
            button.visible = false;
            rotoescudo = false;
            points.visible = false;
            document.getElementsByClassName("fire")[0].style.bottom = `-2000px`;
            document.getElementsByClassName("fire")[1].style.bottom = `-2000px`;
            document.getElementsByClassName("fire")[2].style.bottom = `-2000px`;
            document.getElementsByClassName("lava")[0].style.bottom = `-2000px`;
            document.getElementsByClassName("broken-glass")[0].style.opacity = `0%`;
            score = 0;
            plataformas2 = 200;
            rotoescudo = false;
            escudo = false;
            document.getElementsByClassName("header")[0].style.marginTop = "-250px";
        });
    }

    update ()
    {
        document.getElementsByClassName("fire")[0].style.bottom = `${parseFloat(document.getElementsByClassName("fire")[0].style.bottom.replace("px", "")) - 2.5}px`;
        document.getElementsByClassName("fire")[1].style.bottom = `${parseFloat(document.getElementsByClassName("fire")[1].style.bottom.replace("px", "")) - 2.5}px`;
        document.getElementsByClassName("fire")[2].style.bottom = `${parseFloat(document.getElementsByClassName("fire")[2].style.bottom.replace("px", "")) - 2.5}px`;
        document.getElementsByClassName("lava")[0].style.bottom = `${parseFloat(document.getElementsByClassName("lava")[0].style.bottom.replace("px", "")) - 2.5}px`;
    }
}