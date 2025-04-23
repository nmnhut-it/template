// src/resource.js
// Resource definitions and loader template

// Define your resources here
var res = {
    // Example:
    // background_png: "res/background.png",
    // player_png: "res/player.png"
};

function getResources() {
    var g_resources = [];
    for (var i in res) {
        g_resources.push(res[i]);
    }
    if (typeof cc !== "undefined" && cc.log) {
        cc.log("[Resource] Loaded resources: " + JSON.stringify(g_resources));
    } else {
        console.log("[Resource] Loaded resources: " + JSON.stringify(g_resources));
    }
    return g_resources;
}

// For compatibility with existing code
var g_resources = getResources();
