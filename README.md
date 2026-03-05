# Password Generator

A modern, responsive password generator web tool built with vanilla HTML, CSS, and JavaScript.

## Features

- Clean card-style UI with gradient background, rounded corners, and soft shadows
- Password display field with one-click copy button
- Password length slider (6 to 32)
- Character options:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Symbols
- Generate Password button with random secure generation logic
- Visual strength indicator:
  - Weak (red)
  - Medium (orange)
  - Strong (green)
- User-friendly validation and error handling messages

## Validation and Error Handling

- Shows `Please select at least one character type.` if no options are selected
- Shows `Password length should be at least 8 for better security.` when length is below 8
- Shows `No password to copy.` if copy is clicked before generation
- Uses safe try/catch blocks to avoid app crashes on unexpected errors

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6)

## How to Run

1. Open the project folder.
2. Open `index.html` in any modern browser.
3. Choose password settings and click **Generate Password**.

No build step or installation is required.
