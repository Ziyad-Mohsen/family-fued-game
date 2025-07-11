# Family Feud Web Game

A web-based Family Feud game for group play, featuring host controls, sound effects, and support for English and Arabic questions.

## Live Demo

Try the game online: [Play Family Feud Web Game](https://ziyad-mohsen.github.io/family-fued-game/)

## Features

- Modern, responsive UI
- Host and player separation (host.html for questions/answers, index.html for main game board)
- Keyboard shortcuts for host controls
- Sound effects for game actions
- CSV-based question/answer data
- Supports English and Arabic

## Project Structure

```
family-feud/
├── assets/
│   ├── images/
│   ├── sounds/
│   └── favicon.png
├── css/
│   ├── game.css
│   ├── host.css
│   ├── main.css
│   └── help.css
├── data/
│   ├── data-en.csv
│   ├── data-ar.csv
│   └── ...
├── js/
│   ├── controls.js
│   ├── data.js
│   ├── elements.js
│   ├── host.js
│   ├── main.js
│   └── ...
├── index.html
├── host.html
├── help.html
└── README.md
```

## How to Play

- Open `index.html` for the main game board (players view)
- Host opens `host.html` to see questions and answers
- Use keyboard shortcuts on `index.html` to reveal answers, play sounds, and show strikes

## Host Controls

- **Reveal Answers:** 1-5 keys
- **Play Introduction Sound:** I
- **Show Strikes:** Q, W, E
- **Next Round:** N
- **Previous Round:** P

## Setup

No build step required. Just open the HTML files in your browser. For best experience, use a local server (e.g. VS Code Live Server).
