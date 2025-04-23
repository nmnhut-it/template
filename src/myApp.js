var GameLayer = cc.Layer.extend({
    score: 0,
    timeLeft: 60,
    isGameActive: false,
    whale: null,
    scoreLabel: null,
    timerLabel: null,
    whaleTimer: null,
    welcomeMsg: null,
    gameOverMsg: null,

    ctor: function () {
        this._super();
        
        // Initialize background
        var background = new cc.Sprite(res.background_png);
        background.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(background);

        // Initialize whale (hidden initially)
        this.whale = new cc.Sprite(res.whale_png);
        this.whale.setScale(0.15); // Scale down the whale
        this.whale.setVisible(false);
        this.addChild(this.whale);

        // Setup custom cursor
        this.setupCursor();

        // Initialize UI
        this.setupUI();

        // Setup event listeners
        this.setupListeners();

        // Show welcome screen
        this.showWelcomeScreen();

        cc.log("Game initialized");
        return true;
    },

    setupCursor: function() {
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Create custom hammer cursor
        this.hammer = new cc.Sprite(res.hammer_png);
        this.hammer.setScale(0.08);
        this.addChild(this.hammer, 10);
        
        cc.log("Custom cursor setup complete");
    },

    setupUI: function() {
        // Score label
        this.scoreLabel = new cc.LabelTTF("Score: 0", "Arial", 32);
        this.scoreLabel.setPosition(100, cc.winSize.height - 30);
        this.addChild(this.scoreLabel);

        // Timer label
        this.timerLabel = new cc.LabelTTF("Time: 60", "Arial", 32);
        this.timerLabel.setPosition(cc.winSize.width - 100, cc.winSize.height - 30);
        this.addChild(this.timerLabel);

        cc.log("UI elements initialized");
    },

    setupListeners: function() {
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function(event) {
                var pos = event.getLocation();
                this.hammer.setPosition(pos);
            }.bind(this),
            onMouseDown: function(event) {
                if (!this.isGameActive) {
                    this.startGame();
                    return;
                }
                this.checkWhaleHit(event.getLocation());
            }.bind(this)
        }, this);

        cc.log("Event listeners setup complete");
    },

    showWelcomeScreen: function() {
        var welcomeMsg = new cc.LabelTTF("Click anywhere to start\nWhack-a-Whale!", "Arial", 48);
        welcomeMsg.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        welcomeMsg.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(welcomeMsg, 10, "welcome");
        this.welcomeMsg = welcomeMsg; // Store reference
        
        cc.log("Welcome screen displayed");
    },

    startGame: function() {
        // Remove welcome and gameover messages if they exist
        if (this.welcomeMsg) {
            this.removeChild(this.welcomeMsg);
            this.welcomeMsg = null;
        }
        if (this.gameOverMsg) {
            this.removeChild(this.gameOverMsg);
            this.gameOverMsg = null;
        }

        this.score = 0;
        this.timeLeft = 60;
        this.isGameActive = true;
        this.updateScore(0);
        this.scheduleUpdate();
        this.moveWhale();
        this.schedule(this.updateTimer, 1);
        
        cc.log("Game started");
    },

    moveWhale: function() {
        if (!this.isGameActive) return;

        this.whale.stopAllActions();
        
        // Random position
        var margin = 100;
        var x = margin + Math.random() * (cc.winSize.width - 2 * margin);
        var y = margin + Math.random() * (cc.winSize.height - 2 * margin);
        
        this.whale.setPosition(x, y);
        this.whale.setVisible(true);

        // Hide whale after 2-3 seconds
        var hideDelay = 2 + Math.random();
        this.whale.runAction(cc.sequence(
            cc.delayTime(hideDelay),
            cc.callFunc(function() {
                if (this.isGameActive) {
                    this.whale.setVisible(false);
                    this.updateScore(-20);
                    this.moveWhale();
                }
            }, this)
        ));

        cc.log("Whale moved to new position: " + x + ", " + y);
    },

    checkWhaleHit: function(clickPos) {
        if (!this.whale.isVisible()) return;

        var whaleBox = this.whale.getBoundingBox();
        if (cc.rectContainsPoint(whaleBox, clickPos)) {
            this.updateScore(10);
            this.whale.setVisible(false);
            this.moveWhale();
            cc.log("Whale hit! Score increased");
        } else {
            this.updateScore(-20);
            cc.log("Missed whale! Score decreased");
        }
    },

    updateScore: function(points) {
        this.score = Math.max(0, this.score + points);
        this.scoreLabel.setString("Score: " + this.score);
    },

    updateTimer: function() {
        this.timeLeft--;
        this.timerLabel.setString("Time: " + this.timeLeft);
        
        if (this.timeLeft <= 0) {
            this.endGame();
        }
    },

    endGame: function() {
        this.isGameActive = false;
        this.whale.setVisible(false);
        this.unscheduleUpdate();
        this.unschedule(this.updateTimer);

        var gameOverMsg = new cc.LabelTTF(
            "Game Over!\nFinal Score: " + this.score + "\nClick to play again",
            "Arial", 48
        );
        gameOverMsg.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        gameOverMsg.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(gameOverMsg, 10);
        this.gameOverMsg = gameOverMsg; // Store reference
        
        cc.log("Game ended with score: " + this.score);
    },

    update: function(dt) {
        if (!this.isGameActive) return;
        
        // Update game state here if needed
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
        cc.log("Game scene created");
    }
});
