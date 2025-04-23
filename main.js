function main() {
cc.game.onStart = function(){
    var background = new cc.Sprite(res.background_png);
    var bgSize = background.getContentSize();
    
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(bgSize.width, bgSize.height, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new GameScene());
    }, this);
};
cc.game.run();
}
window.onload = main;