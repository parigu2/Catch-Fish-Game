// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        AudioMain: {
            default: null,
            url: cc.AudioClip,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.director.preloadScene("Game");

        this.node.on("touchend", () => {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Game")
        })

        // var audioUrl = cc.url.raw("sound/joy.mp3");
        cc.audioEngine.play(this.AudioMain, true, 0.3)
    },

    // update (dt) {},
});
