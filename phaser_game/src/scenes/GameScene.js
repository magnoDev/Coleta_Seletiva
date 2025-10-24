export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        this.score = 0;
        this.currentPhase = 1;
        this.timerEvent = null;
        this.trashItems = [];
        this.bins = [];
        this.correctlySortedTrash = 0;
        this.totalTrashToSort = 0;

        this.phaseConfig = {
            1: {
                bins: ["blue", "red"],
                trashTypes: ["paper", "plastic"],
                binMapping: {
                    "blue": "paper",
                    "red": "plastic"
                }
            },
            2: {
                bins: ["green", "yellow"],
                trashTypes: ["glass", "metal"],
                binMapping: {
                    "green": "glass",
                    "yellow": "metal"
                }
            },
            3: {
                bins: ["brown", "orange"],
                trashTypes: ["organic", "hazardous"],
                binMapping: {
                    "brown": "organic",
                    "orange": "hazardous"
                }
            },
            4: {
                bins: ["blue", "brown", "orange"],
                trashTypes: ["paper", "organic", "hazardous"],
                binMapping: {
                    "blue": "paper",
                    "brown": "organic",
                    "orange": "hazardous"
                }
            },
            5: {
                bins: ["blue", "red", "green", "yellow"],
                trashTypes: ["paper", "plastic", "glass", "metal"],
                binMapping: {
                    "blue": "paper",
                    "red": "plastic",
                    "green": "glass",
                    "yellow": "metal"
                }
            }
        };

        this.trashImages = {
            "paper": ["paper/paper1", "paper/paper2", "paper/paper3"],
            "plastic": ["plastic/plastic1", "plastic/plastic2", "plastic/plastic3"],
            "glass": ["glass/glass1", "glass/glass2", "glass/glass3"],
            "metal": ["metal/metal1", "metal/metal2", "metal/metal3"],
            "organic": ["organic/organic1", "organic/organic2", "organic/organic3"],
            "hazardous": ["hazardous/hazardous1", "hazardous/hazardous2", "hazardous/hazardous3"]
        };
    }

    create() {

        this.add.image(400, 300, "background").setOrigin(0.5).setDisplaySize(800, 600);
        this.add.rectangle(400, 30, 800, 40, 0x87CAEA).setOrigin(0.5).setAlpha(0.5); // Fundo para o placar

        this.scoreText = this.add.text(16, 16, "Pontos: 0", { fontSize: "32px", fill: "#000" });
        this.timerText = this.add.text(this.game.config.width - 16, 16, "Tempo: 60", { fontSize: "32px", fill: "#000" }).setOrigin(1, 0);
        this.phaseText = this.add.text(this.game.config.width / 2, 16, "Fase: 1", { fontSize: "32px", fill: "#000" }).setOrigin(0.5, 0);

        this.input.on("dragstart", this.onDragStart, this);
        this.input.on("drag", this.onDrag, this);
        this.input.on("dragend", this.onDragEnd, this);

        this.startPhase(this.currentPhase);
    }

    update() {
        if (this.timerEvent && !this.timerEvent.paused) {
            const remainingTime = Math.ceil((this.timerEvent.delay - this.timerEvent.elapsed) / 1000);
            this.timerText.setText("Tempo: " + remainingTime);
        }
    }

    startPhase(phaseNumber) {
        this.resetPhase();
        this.phaseText.setText("Fase: " + phaseNumber);

        const currentPhaseData = this.phaseConfig[phaseNumber];
        if (!currentPhaseData) {
            this.endGame(true); // Vitória
            return;
        }

        this.displayBins(currentPhaseData.bins);
        this.generateTrash(currentPhaseData.trashTypes);

        this.timerEvent = this.time.addEvent({
            delay: 60000, // 60 segundos
            callback: this.endPhase, // Chamado quando o tempo acaba
            callbackScope: this,
            loop: false
        });
    }

    resetPhase() {
        this.trashItems.forEach(item => item.destroy());
        this.trashItems = [];
        this.bins.forEach(bin => bin.destroy());
        this.bins = [];
        this.correctlySortedTrash = 0;
        this.totalTrashToSort = 0;
        if (this.timerEvent) {
            this.timerEvent.destroy();
        }
    }

    displayBins(binKeys) {
        const binWidth = 80;
        const binHeight = 100;
        const padding = 60;
        const totalWidth = binKeys.length * (binWidth + padding) - padding;
        let startX = (this.game.config.width - totalWidth) / 2 + binWidth / 2;
        const y = this.game.config.height - 100; // Posição inferior

        binKeys.forEach(key => {
            const textureKey = "bin_" + key;

            const bin = this.physics.add.sprite(startX, y, textureKey).setInteractive();
            bin.body.setAllowGravity(false);
            bin.body.setImmovable(true);
            bin.binType = this.phaseConfig[this.currentPhase].binMapping[key];
            this.bins.push(bin);
            startX += binWidth + padding;
        });
    }

    generateTrash(trashTypes) {
        const trashCountPerType = 10; // 10 resíduos por lixeira
        this.totalTrashToSort = trashTypes.length * trashCountPerType;

        trashTypes.forEach(type => {
            for (let i = 0; i < trashCountPerType; i++) {
                const randomImageKey = Phaser.Utils.Array.GetRandom(this.trashImages[type]);
                const x = Phaser.Math.Between(50, this.game.config.width - 50);
                const y = Phaser.Math.Between(100, this.game.config.height / 2 - 50);
                const trash = this.physics.add.image(x, y, randomImageKey).setInteractive({
                    draggable: true
                });
                trash.body.setAllowGravity(false);
                trash.originalX = x;
                trash.originalY = y;
                trash.trashType = type;
                this.trashItems.push(trash);
            }
        });
    }

    onDragStart(pointer, gameObject) {
        this.children.bringToTop(gameObject);
    }

    onDrag(pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    }

    onDragEnd(pointer, gameObject) {
        let droppedCorrectly = false;
        this.bins.forEach(bin => {
            if (Phaser.Geom.Intersects.RectangleToRectangle(gameObject.getBounds(), bin.getBounds())) {
                if (gameObject.trashType === bin.binType) {
                    this.score += 10;
                    this.scoreText.setText("Pontos: " + this.score);
                    gameObject.destroy();
                    this.sound.play("sfx_correct");
                    this.correctlySortedTrash++;
                    droppedCorrectly = true;
                } else {
                    this.score -= 5;
                    this.scoreText.setText("Pontos: " + this.score);
                    gameObject.x = gameObject.originalX;
                    gameObject.y = gameObject.originalY;
                    this.sound.play("sfx_incorrect");
                    droppedCorrectly = true; // Considera como "drop" mesmo que errado para não ficar arrastando
                }
            }
        });

        if (!droppedCorrectly) {
            gameObject.x = gameObject.originalX;
            gameObject.y = gameObject.originalY;
        }

        if (this.correctlySortedTrash === this.totalTrashToSort) {
            this.time.delayedCall(500, this.nextPhase, [], this);
        }
    }

    endPhase() {
        if (this.correctlySortedTrash === this.totalTrashToSort) {
            this.nextPhase();
        } else {
            this.endGame(false); // Derrota
        }
    }

    nextPhase() {
        this.currentPhase++;
        if (this.currentPhase <= Object.keys(this.phaseConfig).length) {
            this.startPhase(this.currentPhase);
        } else {
            this.endGame(true); // Vitória
        }
    }

    endGame(isWin) {
        this.timerEvent.paused = true;
        this.scene.start("EndScene", { score: this.score, isWin: isWin });
    }
}

