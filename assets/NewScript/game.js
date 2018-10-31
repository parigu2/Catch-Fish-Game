cc.Class({
    extends: cc.Component,

    properties: {
        background: {
            default: null,
            type: cc.Node,
        },
        foodLayer: {
            default: null,
            type: cc.Layout
        },
        gameoverLayer: {
            default: null,
            type: cc.Layout,
        },
        lifeLabel: {
            default: null,
            type: cc.Label,
        },
        scoreLabel: {
            default: null,
            type: cc.Label,
        },
        PauseLabel: {
            default: null,
            type: cc.Label,
        },
        foods: {
            default: [],
            type: cc.Prefab,
        },
        AudioCatch: {
            default: null,
            url: cc.AudioClip
        },
        AudioDrop: {
            default: null,
            url: cc.AudioClip,
        },
        AudioBGM: {
            default: null,
            url: cc.AudioClip,
        },
        fishScore: 0,
        maxLife: 3,
        isLaunched: false,
        isPaused: false,
        isPlayAudio: true,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.scheduleOnce(() => {
            this.reGame();
        }, 1);

        this.node.on("food_Catch", () => {
            if (this.isPlayAudio) {
                cc.audioEngine.play(this.AudioCatch, false, 1);
            }
            this.getScore(1)
        }, this);

        this.foodLayer.node.setContentSize(this.background.width, this.background.height);
    },

    start () {
        cc.audioEngine.play(this.AudioBGM, true, 0.2)
    },

    getScore (score) {
        this.fishScore += score;
        this.scoreLabel.string = this.fishScore;
    },

    gameOverCheck () {
        this.life--
        this.lifeLabel.string = this.life
        if (this.isPlayAudio) {
            cc.audioEngine.play(this.AudioDrop, false, 1);
        }

        if (this.life === 0) {
            cc.audioEngine.pauseAll()
            this.isLaunched = false;
            this.gameoverLayer.node.active = true;
            this.foodLayer.node.stopAllActions();
            this.foodLayer.node.removeAllChildren();
        } else {
            this.gameoverLayer.node.active = false;
        }
    },

    reGame () {
        this.fishScore = 0,
        this.maxLife = 3,
        this.isLaunched = true;

        this.life = this.maxLife;
        this.lifeLabel.string = this.life;
    },

    update (dt) {
        this.spawnFood(dt)
    },

    spawnFood (dt) {
        if (!this.isLaunched) {
            return
        }

        this.delta += dt;
        if (this.delta < 1) {
            return;
        }

        this.delta = 0;

        var layerFood = this.foodLayer.node;
        var positionSize = layerFood.getContentSize()

        var foodIndex = Math.ceil((this.foods.length - 1) * Math.random());

        var food = cc.instantiate(this.foods[foodIndex])

        food.setPosition(this.createFoodPosition());

        var speed = Math.random() * 9 + 1

        var moveby = cc.moveBy(speed, 0, -positionSize.height);
        var sequence = cc.sequence(
            moveby,
            cc.removeSelf(true),
            cc.callFunc(() => this.gameOverCheck(), this)
        )

        food.runAction(sequence)
        layerFood.addChild(food)
    },

    createFoodPosition () {
        var positionSize = this.foodLayer.node.getContentSize();

        var x = (positionSize.width - 70) * Math.random() + 30;
        var y = positionSize.height + 100;

        return cc.v2(x, y);
    },

    onPause () {
        if (cc.director.isPaused()) {
            this.isPaused = false;
            this.PauseLabel.node.active = false;
            cc.director.resume()
        } else {
            this.isPaused = true,
            this.PauseLabel.node.active = true;
            cc.director.pause()
        }

    }
});
