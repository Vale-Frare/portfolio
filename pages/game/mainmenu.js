class MainMenu extends Phaser.Scene {

    constructor() {
        super({key: 'mainMenu'});
    }

    preload()
    {
        this.load.image('logo', 'assets/mainmenu/logo.png');
    }

    create()
    {
        document.getElementsByClassName("header")[0].style.marginTop = 0;
        const logo = this.add.image(0, 0, 'logo');

        Phaser.Display.Align.In.Center(logo, this.add.zone(500, 150, 800, 600));

        button = this.add.dom(500 + 200, 300).createElement('button', '', 'Play');

        button.addListener('click');

        button.on('click', function () {
            game.scene.start('playScene');
            button.visible = false;
            document.getElementsByClassName("header")[0].style.marginTop = "-250px";
        });
    }

    update()
    {
        
    }

}