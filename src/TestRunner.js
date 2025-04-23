// src/TestRunner.js
// Simple in-game test framework for Cocos2d-JS projects

var TestRunner = {
    tests: [],
    passed: 0,
    failed: 0,
    debugMode: false,

    registerTest: function(component, testName, testFn) {
        this.tests.push({component: component, name: testName, fn: testFn});
    },

    assert: function(condition, message) {
        if (!condition) {
            if (this.debugMode) {
                cc.log("TEST FAILED: " + message);
            } else {
                console.error("TEST FAILED: " + message);
            }
            return false;
        }
        return true;
    },

    assertEqual: function(expected, actual, message) {
        return this.assert(expected === actual,
            message + " - Expected: " + expected + ", Got: " + actual);
    },

    assertNotEqual: function(notExpected, actual, message) {
        return this.assert(notExpected !== actual,
            message + " - Not Expected: " + notExpected + ", Got: " + actual);
    },

    assertInRange: function(actual, min, max, message) {
        return this.assert(actual >= min && actual <= max,
            message + " - Expected: " + min + " <= " + actual + " <= " + max);
    },

    runAllTests: function() {
        var log = this.debugMode ? cc.log : console.log;
        log("=== RUNNING ALL TESTS ===");
        this.passed = 0;
        this.failed = 0;

        for (var i = 0; i < this.tests.length; i++) {
            var test = this.tests[i];
            log("Running test: [" + test.component + "] " + test.name);
            try {
                var result = test.fn();
                if (result) {
                    log("✓ PASSED: [" + test.component + "] " + test.name);
                    this.passed++;
                } else {
                    log("✗ FAILED: [" + test.component + "] " + test.name);
                    this.failed++;
                }
            } catch (e) {
                log("✗ ERROR: [" + test.component + "] " + test.name + " - " + e.message);
                this.failed++;
            }
        }

        log("=== TEST RESULTS ===");
        log("Total tests: " + this.tests.length);
        log("Passed: " + this.passed);
        log("Failed: " + this.failed);
    }
};
