# Cocos2d-JS Game Development Prompt

## Project Setup

1. This project uses Cocos2d-JS as the game engine, located at `./libs/cocos-min.js`.
2. Before starting, run `npm install` to ensure all dependencies are installed.
3. The game resources and images are located in the `res` directory. For any missing images, use labels with Unicode characters as placeholders.
4. The game code files are located in the `src` directory.
5. Focus only on the relevant project files; ignore `node_modules`.
6. Use the MCP tool with absolute paths for image positioning.
7. Existing JavaScript files are examples only - modify them to meet requirements.

## Technical Requirements

1. Game canvas and background:
   - Set the window size in `project.json` to match dimensions of `res/background.png`.
   - Ensure HTML canvas dimensions are consistent with this setting.

2. Code structure and quality:
   - Properly set up resources using Cocos2d-JS resource management.
   - Implement game logic in one or two well-organized JavaScript files.
   - Follow Cocos2d-JS scene and layer architecture.
   - Separate game logic from UI components using Cocos2d-JS node hierarchy.
   - Use cc.log for debug logging in every function and conditional branch.

## Implementation Instructions

1. Review the game design document thoroughly before starting implementation.
2. Implement features specified in design document according to Cocos2d-JS patterns:
   - Create scenes using cc.Scene
   - Implement layers with cc.Layer
   - Use cc.Sprite for game objects 
   - Use cocos class syntax
   - Handle input with Cocos2d-JS event listeners
3. Break down implementation into steps following Cocos2d-JS workflow:
   - Initialize game resources
   - Create main game scene
   - Implement game mechanics using Cocos2d-JS API
   - Add UI elements with Cocos2d-JS components
   - Add approriate display for all game entities. If their image is available, use it. Otherwise, use label with unicode character. 
4. Write tests for each component as you implement them.
5. Follow Cocos2d-JS coding practices:
   - Use cc.Class pattern for objects
   - Implement proper initialization and cleanup
   - Follow Cocos2d-JS naming conventions
6. After implementation, run `node get-console-log.js` to view console logs for testing results.

## Testing Framework Implementation

1. Implement a simple test framework compatible with Cocos2d-JS:
   - Extend `src/TestRunner.js` following Cocos2d-JS patterns.
   - Design tests to run alongside game execution using cc.Director scheduling.
   - Implement basic assertion functions: `assert()`, `assertEqual()`, `assertNotEqual()`, `assertInRange()`.
   - Use cc.log to output test results clearly.

2. Test implementation requirements:
   - Create test functions for each game component.
   - Organize tests by feature following Cocos2d-JS structure.
   - Test normal behavior and edge cases.
   - Cover core game functionality:
     - Scene initialization
     - Resource loading
     - Game mechanics
     - Input handling
     - State transitions
     - Score tracking

3. Test execution:
   - Implement a debug flag in Cocos2d-JS config.
   - Run tests automatically on game start when in debug mode.
   - Log results using cc.log with clear PASS/FAIL indicators.
   - Include details for failed tests (expected vs. actual).

4. Test automation:
   - Use `node get-console-log.js` to capture test output.
   - Parse test results from console logs.
   - Generate simple test summary.

## Deliverables

1. Complete implementation of the game using Cocos2d-JS API according to design specifications.
2. Well-structured JavaScript code files following Cocos2d-JS patterns with appropriate documentation.
3. Comprehensive tests for all game components.
4. Console log analysis with identified and fixed bugs.
5. Make sure the game fully comply with the given design with fully displayed UI. 

Remember to stay within the capabilities of Cocos2d-JS and follow its specific API patterns rather than introducing external concepts or frameworks.