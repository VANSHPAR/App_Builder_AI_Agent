# Simple Calculator Web App

---

## Project Overview

A lightweight, browser‑based calculator built with **HTML**, **CSS**, and **JavaScript**. It provides a clean UI for basic arithmetic operations (addition, subtraction, multiplication, division) and supports both mouse clicks and keyboard input. The logic is encapsulated in a `Calculator` class (`script.js`) which manages state, performs calculations, and updates the display.

---

## Features

- **Basic arithmetic**: `+`, `-`, `*`, `/`
- **Decimal support**
- **Clear (C) and backspace (⌫) functionality**
- **Keyboard shortcuts** – digits, operators, `Enter`/`=` for evaluation, `Esc`/`c` to clear, `Backspace` to delete.
- **Error handling** – division by zero or any unexpected error displays `Error` and resets the calculator.
- **Responsive layout** – works on desktop and mobile browsers.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (`index.html`) |
| Styling | CSS3 (`style.css`) |
| Logic | Vanilla JavaScript (`script.js`) |
| Browser | Any modern browser with ES6 support |

---

## Setup

1. **Clone or download** the repository.
2. Open the `index.html` file in a web browser (double‑click the file or use `File → Open` in the browser).
3. No build step, server, or package manager is required – the app runs entirely client‑side.

---

## Usage

### Mouse Interaction

| Button | Action |
|--------|--------|
| **0‑9** | Append the digit to the current entry |
| **.** (decimal) | Insert a decimal point (only one per number) |
| **+ – * /** | Set the pending operator. If a previous operator is pending and a new number has been entered, the calculator evaluates the previous expression first. |
| **=** | Evaluate the current expression and display the result |
| **C** | Clear all input and reset the calculator |
| **⌫** (backspace) | Delete the last character of the current entry |

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `0‑9` | Same as clicking the digit button |
| `.` or `,` | Decimal point |
| `+ - * /` | Set operator |
| `Enter` or `=` | Evaluate |
| `Backspace` | Delete last character |
| `Escape` or `c`/`C` | Clear |

### Error Handling

- **Division by zero** – the display shows `Error` and the calculator resets to a clean state.
- **Any uncaught exception** – also results in `Error` on the display, preventing the UI from freezing.

---

## Development

```
project-root/
├─ index.html        # Markup – edit UI layout here
├─ style.css         # Styles – adjust colors, spacing, responsiveness
├─ script.js         # Core logic – Calculator class & event wiring
└─ README.md         # Documentation (this file)
```

- **HTML**: Modify `index.html` to change the structure or add new UI elements. Ensure any new button includes a `data-action` attribute (e.g., `data-action="digit"`) so the event delegation in `script.js` can handle it.
- **CSS**: Tweak `style.css` for visual changes – colors, fonts, layout, media queries, etc.
- **JavaScript**: Extend or refactor the `Calculator` class in `script.js`. All UI interactions are wired via event delegation based on `data-action` and optional `data-value` attributes.

---

## License

This project is released under the **MIT License**. See the `LICENSE` file for full terms.

---

## Screenshot

*Replace the placeholder below with an actual screenshot of the running calculator (e.g., `screenshot.png`).*

![Calculator UI Screenshot](screenshot.png)
