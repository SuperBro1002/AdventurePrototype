let hasWrench = false;
let hasKey = false;
let hasLight = false;
let hasHammer = false;
let ifVent = false;
let rDoor = false;
let lDoor = false;
let power = false;
let sDoor = false;
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
                    this.showMessage("I can open this vent with the wrench.");
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
                    this.gotoScene('demo6');
                }
            })


        let player = this.add.text(this.w * 0.3, this.w * 0.3, "👾")
            .setFontSize(this.s * 2)
            .setInteractive();
        this.showStuff(player, "That's me.", "Cut that out!");


        if (hasWrench == false) {
            let wrench = this.add.text(this.w * 0.5, this.w * 0.1, "🔧")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("This could be helpful.", "Wrench", wrench.x, wrench.y)
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


        // let key = this.add.text(this.w * 0.3, this.w * 0.2, "🔑")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage("This could be helpful.", "Example", key.x, key.y)
        //     });
        // key.on('pointerdown', () => {
        //     this.showMessage("You pick up the key.");
        //     this.gainItem('Key');
        //     this.tweens.add({
        //         targets: key,
        //         y: `-=${2 * this.s}`,
        //         alpha: { from: 1, to: 0 },
        //         duration: 500,
        //         onComplete: () => key.destroy()
        //     });
        // })


        // let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         if (this.hasItem("Wrench")) {
        //             this.showMessage("You've got the key for this door.");
        //         } else {
        //             this.showMessage("It's locked. Can you find a key?");
        //         }
        //     })
        //     .on('pointerdown', () => {
        //         if (this.hasItem("Wrench")) {
        //             this.loseItem("Wrench");
        //             this.showMessage("*squeak*");
        //             door.setText("🚪 unlocked door");
        //             this.gotoScene('demo2');
        //         }
        //     })

    }
}


class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "Central Room");
    }
    onEnter() {
        let player = this.add.text(this.w * 0.3, this.w * 0.3, "👾")
            .setFontSize(this.s * 2)
            .setInteractive();
        this.showStuff(player, "That's me.", "Cut that out!");

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
                this.showMessage("The closet door.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo3');
            })

        let rightDoor = this.add.text(this.w * 0.5, 980, "🚪")
            .setFontSize(this.s * 2)
            .setInteractive();
        rightDoor.setColor(0xffffff);
        rightDoor.on('pointerover', () => {
            if (this.hasItem('flashlight')) {
                this.showMessage("You look inside, but it's too dark to see anything. You'll need something to light it up.");
            }
            else {
                this.showMessage("You'll be able to look around the room with the flashlight.");
            }
        })
            .on('pointerdown', () => {
                if (this.hasItem('flashlight')) {
                    this.gotoScene('demo5');
                }
                else {
                    this.shake(rightDoor);
                }
            })

        let elevator = this.add.text(this.w * 0.7, 540, "🚪")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (power == true) {
                    this.showMessage("An elevator, the power has been turned on.");
                }
                else {
                    this.showMessage("An elevator.")
                }
            })
            .on('pointerdown', () => {
                if (power == true) {
                    this.gotoScene('demo6');
                }
                else {
                    this.showMessage("The power is off, you'll need to turn it on.")
                }
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
    onEnter() {
        let player = this.add.text(this.w * 0.3, this.w * 0.3, "👾")
            .setFontSize(this.s * 2)
            .setInteractive();
        this.showStuff(player, "That's me.", "Cut that out!");

        let Door = this.add.text(this.w * 0.5, 980, "🚪")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Back to Central Room");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo2');
            })


        if (sDoor == false) {
            let secretDoor = this.add.text(1230, 305, "📦")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => {
                    if (sDoor == false) {
                        this.showMessage("Something's here!");
                        this.shake(secretDoor);
                    }
                })
                .on('pointerdown', () => {
                    secretDoor.setText("🚪");
                    sDoor = true;
                    this.gotoScene('demo4');
                })
        } else if (sDoor == true) {
            let secretDoor = this.add.text(1230, 305, "🚪")
                .setFontSize(this.s * 2)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("It's a secret door!");
                })
                .on('pointerdown', () => {
                    this.gotoScene('demo4');
                })

        }

        let box = this.add.text(1020, 505, "📦")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Just a box");
            })
        let box2 = this.add.text(100, 205, "📦")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Just a box");
            })
        let box3 = this.add.text(920, 805, "📦")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Just a box");
            })
        let box4 = this.add.text(420, 335, "📦")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Just a box");
            })
        let box5 = this.add.text(800, 900, "📦")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Just a box");
            })
    }
}

class Demo4 extends AdventureScene {
    constructor() {
        super("demo4", "Basement");
    }
    onEnter() {
        let player = this.add.text(this.w * 0.3, this.w * 0.3, "👾")
            .setFontSize(this.s * 2)
            .setInteractive();
        this.showStuff(player, "That's me.", "Cut that out!");

        let Door = this.add.text(300, 980, "🚪")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Back to the closet.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo3');
            })

        let book1 = this.add.text(200, 505, "📙")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's an orange book.");
            })
        let flashlight = this.add.text(370, 330, "🔦")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a flashlight.");
            })
            .on('pointerdown', () => {
                this.gainItem('flashlight');
                this.showMessage("You pick up the flashlight.");
                hasLight = true;
                this.tweens.add({
                    targets: flashlight,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => flashlight.destroy()
                });
            })
        let book2 = this.add.text(660, 705, "📗")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a green book.");
            })
        let pc = this.add.text(1220, 555, "💻")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a laptop. It won't turn on.");
            })
        let bag = this.add.text(1020, 860, "💼")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's an empty bag.");
            })
        let book3 = this.add.text(1320, 920, "📘")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a blue book.");
            })
    }
}

class Demo5 extends AdventureScene {
    constructor() {
        super("demo5", "Dark Room");
    }

    onEnter() {
        let player = this.add.text(this.w * 0.3, this.w * 0.3, "👾")
            .setFontSize(this.s * 2)
            .setInteractive();
        this.showStuff(player, "That's me.", "Cut that out!");

        let Door = this.add.text(this.w * 0.3, 80, "🚪")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Back to Central Room");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo2');
            })

        let plug = this.add.text(660, 705, "🔌")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("A plug.", "Plug", plug.x, plug.y);
            })
            .on('pointerdown', () => {
                this.gainItem('plug');
                this.showMessage("You pick up the plug.");
                this.tweens.add({
                    targets: plug,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => plug.destroy()
                });
            })
        this.cameras.main.fadeFrom(6000, 0, 0, 0, true);

        let outlet = this.add.rectangle(720, 540, 20, 40, 0x000000)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem('plug') == false && power == false) {
                    this.showStuff(outlet, "It's an empty outlet.", "I need to plug something in.");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem('plug')) {
                    this.loseItem('plug');
                    power = true;
                    outlet.x = 4000;
                    outlet.y = 4000;
                    this.showMessage("You put the plug in the outlet. The power turns on!");
                }
            });

    }
}

class Demo6 extends AdventureScene {
    constructor() {
        super("demo6", "Elevator");
    }

    onEnter() {
        let Door = this.add.text(720, -50, "🚪")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("Escape.");
            })
            .on('pointerdown', () => {
                this.gotoScene('outro');
            })

        let player = this.add.text(this.w * 0.3, this.w * 0.3, "👾")
            .setFontSize(this.s * 2)
            .setInteractive();
        this.showStuff(player, "That's me.", "Cut that out!");

        let button = this.add.circle(720, 540, 25, 0x000000)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a button.")
            })
            .on('pointerdown', () => {
                this.showMessage("The elevator starts to move.");
                this.cameras.main.shake(2000, 0.01);

                this.time.delayedCall(3000, () => {
                    Door.setY(30);
                });
            });
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

