import PreloadScene from "./scenes/PreloadScene.js";
import GameScene from "./scenes/GameScene.js";
import EndScene from "./scenes/EndScene.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [PreloadScene, GameScene, EndScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

