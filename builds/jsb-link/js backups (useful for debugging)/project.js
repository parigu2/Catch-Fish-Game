window.__require = function e(t, o, n) {
function i(s, a) {
if (!o[s]) {
if (!t[s]) {
var u = s.split("/");
u = u[u.length - 1];
if (!t[u]) {
var d = "function" == typeof __require && __require;
if (!a && d) return d(u, !0);
if (c) return c(u, !0);
throw new Error("Cannot find module '" + s + "'");
}
}
var r = o[s] = {
exports: {}
};
t[s][0].call(r.exports, function(e) {
return i(t[s][1][e] || e);
}, r, r.exports, e, t, o, n);
}
return o[s].exports;
}
for (var c = "function" == typeof __require && __require, s = 0; s < n.length; s++) i(n[s]);
return i;
}({
btn: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "fbb97rH+QBIxK6/su23blLp", "btn");
cc.Class({
extends: cc.Component,
properties: {
AudioMain: {
default: null,
url: cc.AudioClip
}
},
start: function() {
cc.director.preloadScene("Game");
this.node.on("touchend", function() {
cc.audioEngine.stopAll();
cc.director.loadScene("Game");
});
cc.audioEngine.play(this.AudioMain, !0, .3);
}
});
cc._RF.pop();
}, {} ],
food: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9a2d0ah71NFNqtGY4tYdGVP", "food");
cc.Class({
extends: cc.Component,
start: function() {
var e = this;
this.node.on("touchend", function() {
if (!e.node.parent.parent.getComponent("game").isPaused) {
e.node.dispatchEvent(new cc.Event.EventCustom("food_Catch", !0));
e.node.removeFromParent();
}
}, this);
}
});
cc._RF.pop();
}, {} ],
game: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "56098C6C/JG5Ksb7PJx3nb9", "game");
cc.Class({
extends: cc.Component,
properties: {
background: {
default: null,
type: cc.Node
},
foodLayer: {
default: null,
type: cc.Layout
},
gameoverLayer: {
default: null,
type: cc.Layout
},
lifeLabel: {
default: null,
type: cc.Label
},
scoreLabel: {
default: null,
type: cc.Label
},
PauseLabel: {
default: null,
type: cc.Label
},
foods: {
default: [],
type: cc.Prefab
},
AudioCatch: {
default: null,
url: cc.AudioClip
},
AudioDrop: {
default: null,
url: cc.AudioClip
},
AudioBGM: {
default: null,
url: cc.AudioClip
},
fishScore: 0,
maxLife: 3,
isLaunched: !1,
isPaused: !1,
isPlayAudio: !0
},
onLoad: function() {
var e = this;
this.scheduleOnce(function() {
e.reGame();
}, 1);
this.node.on("food_Catch", function() {
e.isPlayAudio && cc.audioEngine.play(e.AudioCatch, !1, 1);
e.getScore(1);
}, this);
this.foodLayer.node.setContentSize(this.background.width, this.background.height);
},
start: function() {
cc.audioEngine.play(this.AudioBGM, !0, .2);
},
getScore: function(e) {
this.fishScore += e;
this.scoreLabel.string = this.fishScore;
},
gameOverCheck: function() {
this.life--;
this.lifeLabel.string = this.life;
this.isPlayAudio && cc.audioEngine.play(this.AudioDrop, !1, 1);
if (0 === this.life) {
cc.audioEngine.pauseAll();
this.isLaunched = !1;
this.gameoverLayer.node.active = !0;
this.foodLayer.node.stopAllActions();
this.foodLayer.node.removeAllChildren();
} else this.gameoverLayer.node.active = !1;
},
reGame: function() {
this.fishScore = 0, this.maxLife = 3, this.isLaunched = !0;
this.life = this.maxLife;
this.lifeLabel.string = this.life;
},
update: function(e) {
this.spawnFood(e);
},
spawnFood: function(e) {
var t = this;
if (this.isLaunched) {
this.delta += e;
if (!(this.delta < 1)) {
this.delta = 0;
var o = this.foodLayer.node, n = o.getContentSize(), i = Math.ceil((this.foods.length - 1) * Math.random()), c = cc.instantiate(this.foods[i]);
c.setPosition(this.createFoodPosition());
var s = 9 * Math.random() + 1, a = cc.moveBy(s, 0, -n.height), u = cc.sequence(a, cc.removeSelf(!0), cc.callFunc(function() {
return t.gameOverCheck();
}, this));
c.runAction(u);
o.addChild(c);
}
}
},
createFoodPosition: function() {
var e = this.foodLayer.node.getContentSize(), t = (e.width - 70) * Math.random() + 30, o = e.height + 100;
return cc.v2(t, o);
},
onPause: function() {
if (cc.director.isPaused()) {
this.isPaused = !1;
this.PauseLabel.node.active = !1;
cc.director.resume();
} else {
this.isPaused = !0, this.PauseLabel.node.active = !0;
cc.director.pause();
}
}
});
cc._RF.pop();
}, {} ],
sound: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ee37aWyXINK+KKhP0h7Scp2", "sound");
cc.Class({
extends: cc.Component,
properties: {
sound_on: {
default: null,
type: cc.Sprite
},
sound_off: {
default: null,
type: cc.Sprite
}
},
start: function() {
this.soundOn();
this.soundOff();
this.sound_on.node.active = !1;
},
soundOn: function() {
var e = this, t = this.sound_off;
this.sound_on.node.on("touchend", function() {
t.node.parent.parent.getComponent("game").isPlayAudio = !0;
e.sound_on.node.active = !1;
e.sound_off.node.active = !0;
cc.audioEngine.resumeAll();
});
},
soundOff: function() {
var e = this, t = this.sound_off;
this.sound_off.node.on("touchend", function() {
t.node.parent.parent.getComponent("game").isPlayAudio = !1;
e.sound_off.node.active = !1;
e.sound_on.node.active = !0;
cc.audioEngine.pauseAll();
});
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "btn", "food", "game", "sound" ]);