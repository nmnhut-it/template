# Cocos2d-JS Game Development Prompt

## Project Setup
1. This project uses Cocos2d-JS as the game engine, located at `./libs/cocos-min.js`.
2. Before starting, run `npm install` to ensure all dependencies are installed.
3. The game resources and images are located in the `res` directory.
4. Use the MCP tool to get image positioning information. Specify absolute paths when using this tool.

## Technical Requirements
1. Game canvas and background:
   - Set the window size in `project.json` to match the dimensions of `res/background.png`.
   - Ensure the canvas dimensions in the HTML file are consistent with this setting.

2. Code structure and quality:
   - Properly set up resources. 
   - Implement the game logic in one or two well-organized JavaScript files.
   - Separate game logic from UI components for better maintainability and testability.
   - Add clear debug logs for each function to aid in troubleshooting.

3. Testing:
   - Run `node get-console-log.js` to view console logs for smoke testing.
   - Ensure the code is designed with testability in mind.

## Implementation Instructions
1. Review the game design document thoroughly before starting implementation.
2. Implement all features as specified in the game design.
3. Follow good coding practices:
   - Use meaningful variable and function names
   - Add comments for complex logic
   - Organize code into logical sections or classes
   - Implement error handling where appropriate

## Deliverables
1. Complete implementation of the game according to the design specifications
2. Well-structured JavaScript code files with appropriate documentation
3. Instructions for running and testing the game
 