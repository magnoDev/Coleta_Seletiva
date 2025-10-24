export default class EndScene extends Phaser.Scene {
    constructor() {
        super("EndScene");
    }

    init(data) {
        this.finalScore = data.score;
        this.isWin = data.isWin;
    }

    create() {
        this.add.image(400, 300, "background").setOrigin(0.5).setDisplaySize(800, 600);
        this.add.rectangle(400, 300, 600, 300, 0x87CAEA).setOrigin(0.5).setAlpha(0.5); // Fundo para mensagem

        let emoji;
        
        let message;
        if (this.isWin) {
            message = "Parabéns!\nVocê é um mestre da reciclagem!";
            emoji = 'win_game';
        } else {
            message = "Fim de Jogo!\nTente novamente.";
            emoji = 'lose_game';
        }

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 100, message, {
            fontFamily: 'Arial Black, "Goudy Bookletter 1911", Times, serif',
            fontSize: "32px",
            fill: "#fff",
            align: "center"
        }).setOrigin(0.5);

        this.add.image(400, 130, emoji).setOrigin(0.5).scale = 0.5;

        this.add.text(this.game.config.width / 2, this.game.config.height / 2, "Pontuação Total: " + this.finalScore, {
            fontSize: "48px",
            fill: "#fff"
        }).setOrigin(0.5);

        const playAgainButton = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 100, "Jogar Novamente", {
            fontSize: "32px",
            fill: "#fff",
            backgroundColor: "#007bff",
            padding: {
                x: 20,
                y: 10
            }
        }).setOrigin(0.5).setInteractive();

        playAgainButton.on("pointerdown", () => {
            this.scene.get('GameScene').score = 0;
            this.scene.get('GameScene').currentPhase = 1;
            this.scene.start("GameScene");
        });
    }
}

