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

        console.log("[GameLayer] Game initialized");
        return true;
    },

    setupUI: function () {
        // Initialize your UI elements here
        // Example:
        // this.scoreLabel = new cc.LabelTTF("Score: 0", "Arial", 32);
        // this.addChild(this.scoreLabel);
        console.log("[GameLayer] UI elements initialized");
    },

    setupListeners: function () {
        // Setup your event listeners here
        // Example: mouse, keyboard, or touch events
        console.log("[GameLayer] Event listeners setup complete");
    },

    showWelcomeScreen: function () {
        // Show your welcome/start screen here
        // Example:
        // var welcomeMsg = new cc.LabelTTF("Click to start!", "Arial", 48);
        // this.addChild(welcomeMsg, 10, "welcome");
        console.log("[GameLayer] Welcome screen displayed");
    },

    startGame: function () {
        // Start your game logic here
        this.core.startGame();
        // Update UI, schedule updates, etc.
        console.log("[GameLayer] Game started");
    },

    update: function (dt) {
        // Reserved for future game state updates
    }
});

// --- GameScene: Entry point ---
var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
        console.log("[GameScene] Game scene created");
    }
});

// --- Test Registration and Debug Mode ---
if (typeof TestRunner !== "undefined") {
    // Register your GameCore and resource tests here
    // Example:
    // TestRunner.registerTest("GameCore", "Initialization", function () { ... });
}

// --- Run tests in debug mode ---
if (DEBUG_MODE && typeof TestRunner !== "undefined") {
    TestRunner.debugMode = true;
    cc.game.onStart = function () {
        TestRunner.runAllTests();
    };
}
