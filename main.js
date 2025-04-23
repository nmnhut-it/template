// main.js
// Entry point for the game template

function main() {
    cc.game.onStart = function() {
        // Set default design resolution (customize as needed)
        cc.view.adjustViewPort(true);
        cc.view.setDesignResolutionSize(1024, 1024, cc.ResolutionPolicy.SHOW_ALL);
        cc.view.resizeWithBrowserSize(true);

        // Load resources and start the main scene
        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new GameScene());
        }, this);
    };
    cc.game.run();
}

window.onload = main;
