// Game Manager - handles score and game state
var GameManager = {
    score: 0,
    highScores: [],
    timeLeft: 60,
    isGameRunning: false,

    resetGame: function() {
        this.score = 0;
        this.timeLeft = 60;
        this.isGameRunning = true;
    },

    addScore: function(points) {
        this.score = Math.max(0, this.score + points);
    },

    updateHighScores: function() {
        this.highScores.push(this.score);
        this.highScores.sort((a, b) => b - a);
        this.highScores = this.highScores.slice(0, 10);
    }
};

// Set window size based on background
var BackgroundConfig = {
    init: function() {
        var background = new cc.Sprite(res.background_png);
        var bgSize = background.getContentSize();
        cc.director.getWinSize().width = bgSize.width;
        cc.director.getWinSize().height = bgSize.height;
        return bgSize;
    }
};

// Welcome Scene
var WelcomeLayer = cc.Layer.extend({
    init: function() {
        this._super();
        var bgSize = BackgroundConfig.init();
        
        var background = new cc.Sprite(res.background_png);
        background.setPosition(bgSize.width/2, bgSize.height/2);
        this.addChild(background, 0);

        var title = new cc.LabelTTF("Whack-a-Whale", "Arial", 38);
        title.setPosition(bgSize.width/2, bgSize.height * 0.7);
        this.addChild(title, 1);

        var startLabel = new cc.LabelTTF("Tap to Start", "Arial", 32);
        startLabel.setPosition(bgSize.width/2, bgSize.height * 0.3);
        this.addChild(startLabel, 1);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function() {
                cc.director.runScene(new GameScene());
                return true;
            }
        }, this);

        return true;
    }
});

// Game Scene
var GameLayer = cc.Layer.extend({
    whale: null,
    scoreLabel: null,
    timeLabel: null,
    gameTimer: null,

    init: function() {
        this._super();
        var bgSize = BackgroundConfig.init();
        
        // Initialize game state
        GameManager.resetGame();

        // Add background at exact size
        var background = new cc.Sprite(res.background_png);
        background.setPosition(bgSize.width/2, bgSize.height/2);
        this.addChild(background, 0);

        // Add whale
        this.whale = new cc.Sprite(res.whale_png);
        this.addChild(this.whale, 1);
        this.moveWhaleRandomly();

        // Update positions based on actual background size
        this.scoreLabel = new cc.LabelTTF("Score: 0", "Arial", 24);
        this.scoreLabel.setPosition(bgSize.width/2, bgSize.height - 30);
        this.addChild(this.scoreLabel, 2);

        this.timeLabel = new cc.LabelTTF("Time: 60", "Arial", 24);
        this.timeLabel.setPosition(80, bgSize.height - 30);
        this.addChild(this.timeLabel, 2);

        // Setup touch handler
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan.bind(this)
        }, this);

        // Custom cursor
        var cursor = new cc.Sprite(res.hammer_png);
        cursor.setScale(0.5);
        this.addChild(cursor, 3);
        this.cursor = cursor;

        // Update cursor position on mouse move
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function(event) {
                cursor.setPosition(event.getLocationX(), event.getLocationY());
            }
        }, this);

        // Start game timer
        this.schedule(this.updateTimer, 1);
        this.schedule(this.moveWhaleRandomly, 2.5);

        return true;
    },

    moveWhaleRandomly: function() {
        if (!GameManager.isGameRunning) return;
        
        var size = cc.director.getWinSize();
        var margin = 50;
        var newX = margin + Math.random() * (size.width - 2 * margin);
        var newY = margin + Math.random() * (size.height - 2 * margin);
        
        this.whale.setPosition(newX, newY);
    },

    updateTimer: function() {
        if (!GameManager.isGameRunning) return;
        
        GameManager.timeLeft--;
        this.timeLabel.setString("Time: " + GameManager.timeLeft);
        
        if (GameManager.timeLeft <= 0) {
            GameManager.isGameRunning = false;
            GameManager.updateHighScores();
            cc.director.runScene(new GameOverScene());
        }
    },

    onTouchBegan: function(touch, event) {
        if (!GameManager.isGameRunning) return;

        var whaleBox = this.whale.getBoundingBox();
        var touchLocation = touch.getLocation();
        
        if (cc.rectContainsPoint(whaleBox, touchLocation)) {
            GameManager.addScore(10);
            this.moveWhaleRandomly();
        } else {
            GameManager.addScore(-20);
        }
        
        this.scoreLabel.setString("Score: " + GameManager.score);
        return true;
    }
});

// Game Over Scene
var GameOverLayer = cc.Layer.extend({
    init: function() {
        this._super();
        var bgSize = BackgroundConfig.init();

        var background = new cc.Sprite(res.background_png);
        background.setPosition(bgSize.width/2, bgSize.height/2);
        this.addChild(background, 0);

        var gameOver = new cc.LabelTTF("Game Over!", "Arial", 38);
        gameOver.setPosition(bgSize.width/2, bgSize.height * 0.7);
        this.addChild(gameOver, 1);

        var finalScore = new cc.LabelTTF("Final Score: " + GameManager.score, "Arial", 32);
        finalScore.setPosition(bgSize.width/2, bgSize.height * 0.6);
        this.addChild(finalScore, 1);

        var playAgain = new cc.LabelTTF("Tap to Play Again", "Arial", 32);
        playAgain.setPosition(bgSize.width/2, bgSize.height * 0.3);
        this.addChild(playAgain, 1);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function() {
                cc.director.runScene(new GameScene());
                return true;
            }
        }, this);

        return true;
    }
});

var WelcomeScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new WelcomeLayer();
        this.addChild(layer);
        layer.init();
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
        layer.init();
    }
});

var GameOverScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameOverLayer();
        this.addChild(layer);
        layer.init();
    }
});