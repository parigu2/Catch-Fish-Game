cc.Class({
    extends: cc.Component,

    properties: {
        sound_on: {
          default: null,
          type: cc.Sprite,
        },
        sound_off: {
          default: null,
          type: cc.Sprite,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.soundOn();
        this.soundOff();
        this.sound_on.node.active = false;
    },

    soundOn () {
        var self = this.sound_off;
        this.sound_on.node.on("touchend", () => {
            self.node.parent.parent.getComponent("game").isPlayAudio = true;
            this.sound_on.node.active = false;
            this.sound_off.node.active = true;
            cc.audioEngine.resumeAll()
        })
    },

    soundOff () {
        var self = this.sound_off
        this.sound_off.node.on("touchend", () => {
            self.node.parent.parent.getComponent("game").isPlayAudio = false;
            this.sound_off.node.active = false;
            this.sound_on.node.active = true;
            cc.audioEngine.pauseAll();
         })
    },

    // update (dt) {},
});
