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
1. `jmp.startLabelWithHomeRowChars`
    1. Always start with home row characters like 'f' and 'j' as the first character of label strings instead of any of the available labelling characters to make it easy to start typing the labelling string with the downside being less chance of pressing a unique key immediately for you to press Enter to jump directly.
    1. Set this to false if you don't mind using non-homerow characters as the starting character of longer labels so that you can have a higher chance of hitting a unique label earlier so that you can press `Enter` to jump directly.
    1. Defaults to `true`.
        - This is in line with the design decision to do refinement style search where the labels you type in become increasingly specific, starting from a common character.


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