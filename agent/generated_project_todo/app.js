// app.js – Core logic for Simple Todo App
// -------------------------------------------------
// Data model & persistence utilities
// -------------------------------------------------

/**
 * Represents a single todo task.
 */
class Task {
  /**
   * @param {number|string} id - Unique identifier for the task.
   * @param {string} text - The task description.
   * @param {boolean} [completed=false] - Completion state.
   */
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}

const STORAGE_KEY = "simpleTodoTasks";

/**
 * Load tasks from localStorage.
 * @returns {Task[]}
 */
function loadTasks() {
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) return [];
  try {
    const raw = JSON.parse(json);
    // Ensure each item is an instance of Task
    return raw.map(item => new Task(item.id, item.text, item.completed));
  } catch (e) {
    console.error("Failed to parse tasks from storage", e);
    return [];
  }
}

/**
 * Save tasks array to localStorage.
 * @param {Task[]} tasksArr
 */
function saveTasks(tasksArr) {
  try {
    const json = JSON.stringify(tasksArr);
    localStorage.setItem(STORAGE_KEY, json);
  } catch (e) {
    console.error("Failed to save tasks", e);
  }
}

// -------------------------------------------------
// Helper utilities
// -------------------------------------------------
/** Escape HTML to prevent XSS when rendering task text */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/** Find task index by id */
function findTaskIndexById(id) {
  return tasks.findIndex(t => String(t.id) === String(id));
}

// -------------------------------------------------
// Global state
// -------------------------------------------------
let tasks = loadTasks();
let currentFilter = "all"; // all | active | completed

// -------------------------------------------------
// Rendering
// -------------------------------------------------
/**
 * Render the task list based on the current filter.
 * @param {string} [filter=currentFilter]
 */
function renderTasks(filter = currentFilter) {
  const listEl = document.getElementById("task-list");
  if (!listEl) return;
  listEl.innerHTML = ""; // clear

  const filtered = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // all
  });

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.dataset.id = task.id;

    // left side: checkbox + label
    const leftDiv = document.createElement("div");
    leftDiv.className = "left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.dataset.id = task.id;
    if (task.completed) checkbox.checked = true;

    const label = document.createElement("label");
    label.className = "task-label" + (task.completed ? " completed" : "");
    label.dataset.id = task.id;
    label.innerHTML = escapeHtml(task.text);

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(label);

    // right side: edit & delete buttons
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.dataset.id = task.id;
    editBtn.textContent = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.dataset.id = task.id;
    deleteBtn.textContent = "Delete";

    const rightDiv = document.createElement("div");
    rightDiv.className = "right";
    rightDiv.appendChild(editBtn);
    rightDiv.appendChild(deleteBtn);

    li.appendChild(leftDiv);
    li.appendChild(rightDiv);

    listEl.appendChild(li);
  });
}

// -------------------------------------------------
// Event Handlers
// -------------------------------------------------
function addTask(event) {
  const input = document.getElementById("new-task-input");
  const text = input.value.trim();
  if (!text) return;
  const newTask = new Task(Date.now(), text, false);
  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks();
  input.value = "";
}

function toggleTask(event) {
  const checkbox = event.target;
  if (!checkbox.classList.contains("task-checkbox")) return;
  const id = checkbox.dataset.id;
  const idx = findTaskIndexById(id);
  if (idx === -1) return;
  tasks[idx].completed = checkbox.checked;
  saveTasks(tasks);
  renderTasks();
}

function editTask(event) {
  const btn = event.target;
  if (!btn.classList.contains("edit-btn")) return;
  const id = btn.dataset.id;
  const idx = findTaskIndexById(id);
  if (idx === -1) return;
  const currentText = tasks[idx].text;
  const newText = prompt("Edit task", currentText);
  if (newText === null) return; // cancelled
  const trimmed = newText.trim();
  if (!trimmed) return; // ignore empty
  tasks[idx].text = trimmed;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(event) {
  const btn = event.target;
  if (!btn.classList.contains("delete-btn")) return;
  const id = btn.dataset.id;
  const idx = findTaskIndexById(id);
  if (idx === -1) return;
  tasks.splice(idx, 1);
  saveTasks(tasks);
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  // Update button active states
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks(tasks);
  renderTasks();
}

// -------------------------------------------------
// Keyboard shortcuts & global listeners
// -------------------------------------------------
function globalKeydown(e) {
  const activeEl = document.activeElement;
  // Enter on input adds task
  if (activeEl && activeEl.id === "new-task-input") {
    if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      addTask();
    } else if (e.key === "Escape") {
      activeEl.value = "";
    }
  }
}

// -------------------------------------------------
// Initialization
// -------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Initial render
  renderTasks();

  // Add task button
  const addBtn = document.getElementById("add-task-btn");
  if (addBtn) addBtn.addEventListener("click", addTask);

  // Input key handling (Enter already covered globally, but keep for safety)
  const input = document.getElementById("new-task-input");
  if (input) input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });

  // Task list delegation
  const taskList = document.getElementById("task-list");
  if (taskList) {
    taskList.addEventListener("change", toggleTask);
    taskList.addEventListener("click", event => {
      editTask(event);
      deleteTask(event);
    });
  }

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      setFilter(filter);
    });
  });

  // Clear completed button
  const clearBtn = document.getElementById('clear-completed-btn');
  if (clearBtn) clearBtn.addEventListener('click', clearCompleted);

  // Global shortcuts
  document.addEventListener('keydown', globalKeydown);
});
