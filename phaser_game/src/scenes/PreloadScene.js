export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Lixeiras
        this.load.image("bin_blue", "assets/bin_blue.png");
        this.load.image("bin_red", "assets/bin_red.png");
        this.load.image("bin_green", "assets/bin_green.png");
        this.load.image("bin_yellow", "assets/bin_yellow.png");
        this.load.image("bin_brown", "assets/bin_brown.png");
        this.load.image("bin_orange", "assets/bin_orange.png");

        // Resíduos
        this.load.image("plastic/plastic1", "assets/plastic/plastic1.png");
        this.load.image("plastic/plastic2", "assets/plastic/plastic2.png");
        this.load.image("plastic/plastic3", "assets/plastic/plastic3.png");
        this.load.image("paper/paper1", "assets/paper/paper1.png");
        this.load.image("paper/paper2", "assets/paper/paper2.png");
        this.load.image("paper/paper3", "assets/paper/paper3.png");
        this.load.image("glass/glass1", "assets/glass/glass1.png");
        this.load.image("glass/glass2", "assets/glass/glass2.png");
        this.load.image("glass/glass3", "assets/glass/glass3.png");
        this.load.image("metal/metal1", "assets/metal/metal1.png");
        this.load.image("metal/metal2", "assets/metal/metal2.png");
        this.load.image("metal/metal3", "assets/metal/metal3.png");
        this.load.image("organic/organic1", "assets/organic/organic1.png");
        this.load.image("organic/organic2", "assets/organic/organic2.png");
        this.load.image("organic/organic3", "assets/organic/organic3.png");
        this.load.image("hazardous/hazardous1", "assets/hazardous/hazardous1.png");
        this.load.image("hazardous/hazardous2", "assets/hazardous/hazardous2.png");
        this.load.image("hazardous/hazardous3", "assets/hazardous/hazardous3.png");

        // Sons (placeholders)
        this.load.audio('sfx_correct', 'assets/sfx_correct.wav');
        this.load.audio('sfx_incorrect', 'assets/sfx_incorrect.wav');

        // Imagem de fundo (placeholder)
        this.load.image('background', 'assets/background.png');
    }

    create() {
        this.scene.start('GameScene');
    }
}

