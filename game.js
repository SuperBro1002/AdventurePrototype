let hasWrench = false;
let hasKey = false;
let hasLight = false;
let hasHammer = false;
let ifVent, rDoor, lDoor, sDoor, power = false;
class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "Starting Room");
    }

    onEnter() {
        //this.add.text(50,50,hasWrench);
        let vent = this.add.rectangle(1040, 70, 50, 50, 0x5f5f5f)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("Wrench")) {
                    this.showMessage("I can open this with the wrench.");
                } else if (ifVent == true) {
                    this.showMessage("The vent is open.");
                } else if (hasWrench == false) {
                    this.showStuff(vent, "It's a vent.", "I need something to help me remove the cover.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("Wrench") || ifVent == true) {
                    this.loseItem("Wrench");
                    ifVent = true;
                    this.showMessage("*squeak squeak*");
                    this.gotoScene('demo2');
                }
            })
        //test commit
        let player = this.add.text(this.w * 0.3, this.w * 0.3, "👾")
            .setFontSize(this.s * 2)
            .setInteractive();
        this.showStuff(player, "That's me.", "Cut that out!");

        if (hasWrench == false) {
            let wrench = this.add.text(this.w * 0.5, this.w * 0.1, "🔧")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("This could be helpful.", "Example", wrench.x, wrench.y)
                });
            wrench.on('pointerdown', () => {
                this.showMessage("You pick up the wrench.");
                this.gainItem('Wrench');
                hasWrench = true;
                this.tweens.add({
                    targets: wrench,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => wrench.destroy()
                });
            })
        }

        let key = this.add.text(this.w * 0.3, this.w * 0.2, "🔑")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("This could be helpful.", "Example", key.x, key.y)
            });
        key.on('pointerdown', () => {
            this.showMessage("You pick up the key.");
            this.gainItem('Key');
            this.tweens.add({
                targets: key,
                y: `-=${2 * this.s}`,
                alpha: { from: 1, to: 0 },
                duration: 500,
                onComplete: () => key.destroy()
            });
        })


        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("Wrench")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("Wrench")) {
                    this.loseItem("Wrench");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "Central Room");
    }
    onEnter() {
        let vent = this.add.rectangle(70, 980, 50, 50, 0x5f5f5f)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Go back through the vent");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let leftDoor = this.add.text(this.w * 0.5, 50, "🚪")
            .setFontSize(this.s * 2)
         .setInteractive()
            .on('pointerover', () => {
                    this.showMessage("The North Door");
            })
            .on('pointerdown', () => {
                    this.gotoScene('demo3');
            })

        let rightDoor = this.add.text(this.w * 0.5, 980, "🚪")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                    this.showMessage("The South Door"); 
            })
            .on('pointerdown', () => {
                    this.gotoScene('demo5');
            })
            
        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Demo3 extends AdventureScene {
    constructor() {
        super("demo3", "Closet");
    }
}

class Demo4 extends AdventureScene {
    constructor() {
        super("demo4", "Basement");
    }
}

class Demo5 extends AdventureScene {
    constructor() {
        super("demo5", "Dark Room");
    }
}

class Demo6 extends AdventureScene {
    constructor() {
        super("demo6", "Elevator");
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50, 50, "Adventure awaits!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Demo1, Demo2, Demo3, Demo4, Demo5, Demo6, Outro],
    title: "Adventure Game",
});

