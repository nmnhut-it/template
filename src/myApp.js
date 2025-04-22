// TODO: implement the game logic here
var GameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
        layer.init();
    }
});
