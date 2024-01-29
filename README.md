# jmp
VS Code motion extension inspired by leap.nvim and other similar projects. Named after the JMP instruction.


## Features
Allows you to jump to anywhere within the visible editor.


## Extension Settings
1. `jmp.centerOnJump`
    1. Move line of jump target to center of screen.
    1. Defaults to `false`.
        - This scrolls the entire screen to try to show the cursor's line in the center, which is bad if you are not used to the screen jumping around and having to move your eyes and head to follow it. It is expected that your sight is already focused on the jump target when you type in the target label, so turning this off causes the least intrusion to your workflow.


## Release Notes
### 0.0.1
Initial release of jmp


## How to contribute
Create an issue or fork this project!

Steps to build:
1. git clone the project
1. `npm install` to install dependencies
1. `npm run watch` to watch for source changes and compile using TSC
1. Press F5 on extension.ts to start and a new VSCode window will open