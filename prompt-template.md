# Cocos2d-JS Game Development Prompt

## Project Setup

1. This project uses Cocos2d-JS as the game engine, located at
   `./libs/cocos-min.js`.
2. Before starting, run `npm install` to ensure all dependencies are installed.
3. The game resources and images are located in the `res` directory.
4. The game code files are located in the `src` directory.
5. Do not look into ./img-size-mcp
6. Use the MCP tool (zps-cocos) to get image positioning information. Specify
   absolute paths when using this tool.
7. Exisiting javascript files in the project are only example. Modify it to
   accommodate user's need.

## Technical Requirements

1. Game canvas and background:
   - Set the window size in `project.json` to match the dimensions of
     `res/background.png`.
   - Ensure the canvas dimensions in the HTML file are consistent with this
     setting.

2. Code structure and quality:
   - Properly set up resources.
   - Implement the game logic in one or two well-organized JavaScript files.
   - Separate game logic from UI components for better maintainability and
     testability.
   - Follow coding best practices.
   - Add clear debug logs for each function to aid in troubleshooting.

3. Testing:
   - Run `node get-console-log.js` to view console logs for smoke testing.
   - Ensure the code is designed with testability in mind.

## Implementation Instructions

1. Review the game design document thoroughly before starting implementation.
2. Implement all features as specified in the game design.
3. Break down implementation to steps.
4. Follow good coding practices:
   - Use meaningful variable and function names
   - Add comments for complex logic
   - Organize code into logical sections or classes
   - Implement error handling where appropriate
5. After implementation is compelted,  Run `node get-console-log.js` to view console logs for smoke testing. You need to wait to get the log.  

## Deliverables

1. Complete implementation of the game according to the design specifications
2. Well-structured JavaScript code files with appropriate documentation
3. Instructions for running and testing the game
