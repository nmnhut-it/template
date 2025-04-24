// src/myApp.js
// Game UI and integration template using GameCore and TestRunner

var DEBUG_MODE = true; // Set to true to run tests at startup

// --- GameLayer: Handles UI, delegates logic to GameCore ---
var GameLayer = cc.Layer.extend({
    core: null,

    ctor: function () {
        this._super();

        // Initialize GameCore
        this.core = new GameCore();

        // Initialize background (replace with your own assets)
        // var background = new cc.Sprite(res.background_png);
        // background.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        // this.addChild(background);

        // Setup UI
        this.setupUI();

        // Setup event listeners
        this.setupListeners();

        // Show welcome screen
        this.showWelcomeScreen();

        cc.log("[GameLayer] Game initialized");
        return true;
    },

    setupUI: function () {
        cc.log("[GameLayer] setupUI called");
        // Initialize your UI elements here
        // Example:
        // this.scoreLabel = new cc.LabelTTF("Score: 0", "Arial", 32);
        // this.addChild(this.scoreLabel);
        cc.log("[GameLayer] UI elements initialized");
    },

    setupListeners: function () {
        cc.log("[GameLayer] setupListeners called");
        // Setup your event listeners here
        // Example: mouse, keyboard, or touch events
        cc.log("[GameLayer] Event listeners setup complete");
    },

    showWelcomeScreen: function () {
        cc.log("[GameLayer] showWelcomeScreen called");
        // Show your welcome/start screen here
        // Example:
        // var welcomeMsg = new cc.LabelTTF("Click to start!", "Arial", 48);
        // this.addChild(welcomeMsg, 10, "welcome");
        cc.log("[GameLayer] Welcome screen displayed");
    },

    startGame: function () {
        cc.log("[GameLayer] startGame called");
        // Start your game logic here
        this.core.startGame();
        // Update UI, schedule updates, etc.
        cc.log("[GameLayer] Game started");
    },

    update: function (dt) {
        cc.log("[GameLayer] update called");
        // Reserved for future game state updates
    }
});

// --- GameScene: Entry point ---
var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        cc.log("[GameScene] onEnter called");
        var layer = new GameLayer();
        this.addChild(layer);
        cc.log("[GameScene] Game scene created");
    }
});

// --- Test Registration and Debug Mode ---
if (typeof TestRunner !== "undefined") {
    // Register your GameCore and resource tests here
    TestRunner.registerTest("GameCore", "Initialization", function () {
        var core = new GameCore();
        return TestRunner.assertEqual(core.gold, 2000, "Initial gold should be 2000")
            && TestRunner.assertEqual(core.isGameActive, false, "Game should not be active after init")
            && TestRunner.assertEqual(core.timeElapsed, 0, "Initial timeElapsed should be 0");
    });
    TestRunner.registerTest("GameCore", "Start Game", function () {
        var core = new GameCore();
        core.startGame();
        return TestRunner.assertEqual(core.isGameActive, true, "Game should be active after startGame");
    });
    TestRunner.registerTest("GameCore", "End Game", function () {
        var core = new GameCore();
        core.startGame();
        core.endGame(true);
        return TestRunner.assertEqual(core.isGameActive, false, "Game should not be active after endGame");
    });
}

// --- Run tests in debug mode ---
if (DEBUG_MODE && typeof TestRunner !== "undefined") {
    TestRunner.debugMode = true;
    cc.game.onStart = function () {
        TestRunner.runAllTests();
    };
}
