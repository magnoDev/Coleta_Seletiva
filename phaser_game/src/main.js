import PreloadScene from "./scenes/PreloadScene.js";
import GameScene from "./scenes/GameScene.js";
import EndScene from "./scenes/EndScene.js";

// Calcular dimensões responsivas
function getGameDimensions() {

    const containerWidth = 800;
    const containerHeight = 600;

    // Manter a proporção 4:3
    const aspectRatio = 4 / 3;
    let width = containerWidth - 20; // Margem
    let height = width / aspectRatio;

    // Se a altura exceder o container, ajustar
    if (height > containerHeight - 20) {
        height = containerHeight - 20;
        width = height * aspectRatio;
    }

    // Limitar a um máximo razoável
    if (width > 800) width = 800;
    if (height > 600) height = 600;

    return { width: Math.floor(width), height: Math.floor(height) };
}

const dimensions = getGameDimensions();

const config = {
    type: Phaser.AUTO,
    width: dimensions.width,
    height: dimensions.height,
    parent: 'game',
    scene: [PreloadScene, GameScene, EndScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        expandParent: false,
        fullscreenTarget: 'parent'
    }
};

const game = new Phaser.Game(config);

