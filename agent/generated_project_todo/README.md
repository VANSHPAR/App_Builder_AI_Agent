# SimpleTodoApp

**A lightweight, browser‑only Todo application** built with vanilla HTML, CSS, and JavaScript. It demonstrates clean separation of concerns, local‑storage persistence, keyboard shortcuts, and simple filtering without any external libraries.

---

## 📋 Tech Stack
- **HTML5** – Structure and markup.
- **CSS3** – Styling (see `styles.css`).
- **JavaScript (ES6)** – Core logic, DOM manipulation and persistence (see `app.js`).
- **LocalStorage** – Browser‑based data persistence, no backend required.

---

## ✨ Features
| Feature | Description |
|---------|-------------|
| **Add task** | Type a task in the input field and press **Enter** or click the **Add** button. |
| **Edit task** | Click the **Edit** button next to a task, modify the text in the prompt, and confirm. |
| **Delete task** | Click the **Delete** button to remove a task permanently. |
| **Toggle completion** | Click the checkbox to mark a task as completed/incomplete. Completed items are styled differently. |
| **Filter view** | Switch between **All**, **Active**, and **Completed** tasks using the filter buttons. |
| **Clear completed** | Remove all completed tasks with a single click. |
| **Keyboard shortcuts** | • **Enter** on the input → add task.<br>• **Esc** on the input → clear the field.<br>• Global shortcuts also work when the input is focused. |
| **Persistence** | All tasks are saved in `localStorage` under the key `simpleTodoTasks`; they survive page reloads. |

---

## 🚀 Installation & Usage
1. Clone or download the repository.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari, etc.).
3. The app loads automatically – start adding tasks!

> **Note:** Because the app is purely client‑side, no server or build step is required.

---

## 🛠️ Development Notes
### File Structure
```
SimpleTodoApp/
├─ index.html      # Main HTML page – loads CSS & JS
├─ styles.css      # All visual styling for the UI
├─ app.js          # Core JavaScript logic (model, view, controller)
└─ README.md       # Documentation (this file)
```
### Integration Points
- **`index.html`** includes the stylesheet with `<link rel="stylesheet" href="styles.css">` and the script with `<script src="app.js" defer></script>`.
- **`styles.css`** defines classes referenced by the JS (e.g., `.task-item`, `.completed`, `.filter-btn`, `.active`).
- **`app.js`**:
  - Defines the `Task` class and all persistence helpers (`loadTasks`, `saveTasks`).
  - Manages a global `tasks` array and the current filter state.
  - Provides rendering (`renderTasks`) that builds the `<li>` elements inside the `<ul id="task-list">` defined in `index.html`.
  - Registers event listeners for adding, editing, deleting, toggling, filtering, and global keyboard shortcuts.
  - Updates the UI whenever the underlying data changes.

---

## ⌨️ Keyboard Shortcuts & Filter Functionality
### Keyboard Shortcuts
| Context | Key | Action |
|---------|-----|--------|
| **Task input field** (`#new-task-input`) | **Enter** | Adds the typed task (equivalent to clicking the **Add** button). |
| **Task input field** | **Esc** | Clears the input field without adding a task. |
| **Anywhere** (when input is focused) | **Enter** (without modifiers) | Triggers `addTask()` via a global `keydown` listener for consistency. |

### Filter Buttons
- The UI includes three filter buttons with the class `.filter-btn` and a `data-filter` attribute (`all`, `active`, `completed`).
- Clicking a button calls `setFilter(filter)` which:
  1. Updates the global `currentFilter` variable.
  2. Toggles the visual `active` class on the selected button.
  3. Re‑renders the task list showing only tasks that match the chosen filter.
- The filter logic lives in `renderTasks()` – it selects tasks based on `currentFilter` before generating DOM elements.

---

## 📸 Screenshot
> **[Placeholder for screenshot]**
> Insert an image of the running app here, e.g. `![SimpleTodoApp screenshot](screenshot.png)`.

---

## 🤝 Contributing (optional)
Contributions are welcome! Feel free to:
- Open an issue for bugs or feature ideas.
- Submit a pull request with clear commit messages.
- Keep the code style consistent with the existing vanilla‑JS approach.

---

## 📄 License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.
