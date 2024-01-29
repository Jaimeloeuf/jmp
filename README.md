# jmp
VS Code motion extension inspired by leap.nvim and other similar projects. Named after the JMP assembly instruction.


## Features
Allows you to jump to anywhere within the visible editor using keystrokes by specifying the first 2 characters after the cursor point where you want to jump to followed by the generated labels.

Use the keybindings `Cmd+e` for Mac and `Alt+e` for Windows/Linux to trigger the command.


## Extension Settings
1. `jmp.jumpOnFound`
    1. Jump to target immediately if the first 2 characters is unique.
    1. Defaults to `false`.
        - Because when you are in the flow and the tag is shown, its bad to suddenly not require the tag, e.g. if you use `so` as the word and the tag is `ff`, you will see `soff` during the targetting process, and you will just type it out `soff`, it will be abrupt if it jumps immediately after you type `so` when you already expected to type `ff` too and more often than not, you are likely to still type `ff`, causing it to be typed into your editor instead of being consumed as the selected label.
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