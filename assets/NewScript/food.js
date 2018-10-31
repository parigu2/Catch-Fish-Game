cc.Class({
    extends: cc.Component,

    start () {
        this.node.on("touchend", () => {

            if (this.node.parent.parent.getComponent("game").isPaused) {
                return
            }

            this.node.dispatchEvent(new cc.Event.EventCustom("food_Catch", true));
            this.node.removeFromParent();
        }, this)
    },
});
