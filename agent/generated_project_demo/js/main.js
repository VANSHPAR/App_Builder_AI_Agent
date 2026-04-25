// Main dashboard script
// Implements chart initialization, UI interactivity, and data rendering.

// Import chart configuration helpers (ES module syntax)
import { getSalesTrendConfig, getEnrollmentDistConfig } from "./chart-config.js";

/**
 * Helper to safely create a Chart instance.
 * If Chart.js is not available, logs a warning and hides the container.
 * @param {HTMLCanvasElement} canvas
 * @param {object} config
 * @returns {Chart|null}
 */
function safeCreateChart(canvas, config) {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js library is not loaded. Hiding chart container.");
    const parent = canvas.parentElement;
    if (parent) parent.style.display = "none";
    return null;
  }
  try {
    return new Chart(canvas.getContext("2d"), config);
  } catch (e) {
    console.error("Failed to create chart:", e);
    const parent = canvas.parentElement;
    if (parent) parent.style.display = "none";
    return null;
  }
}

/**
 * Create a dashboard card element.
 * @param {string} id - element id
 * @param {string} title - card title text
 * @param {string|number} value - displayed value
 * @param {string} iconPath - path to an SVG/icon (optional)
 * @returns {HTMLElement}
 */
function createCard(id, title, value, iconPath) {
  const card = document.createElement("div");
  card.id = id;
  card.className = "dashboard-card card text-white h-100";
  // Use a generic background; caller can set via CSS class later.

  const body = document.createElement("div");
  body.className = "card-body d-flex align-items-center";

  if (iconPath) {
    const img = document.createElement("img");
    img.src = iconPath;
    img.alt = "";
    img.className = "me-2";
    img.width = 32;
    img.height = 32;
    body.appendChild(img);
  }

  const textContainer = document.createElement("div");
  const h5 = document.createElement("h5");
  h5.className = "card-title mb-1";
  h5.textContent = title;
  const p = document.createElement("p");
  p.className = "card-text mb-0";
  p.textContent = value;

  textContainer.appendChild(h5);
  textContainer.appendChild(p);
  body.appendChild(textContainer);
  card.appendChild(body);
  return card;
}

/**
 * Render the four overview cards with dynamic data.
 * The cards exist in the HTML with ids: card-courses, card-enrollments, card-revenue, card-stats.
 * This function updates their inner text values.
 */
function renderDashboardCards(courses) {
  const totalCourses = courses.length;
  const totalEnrollments = courses.reduce((sum, c) => sum + (c.enrolled || 0), 0);
  const totalRevenue = courses.reduce((sum, c) => sum + (c.revenue || 0), 0);
  const quickStat = totalEnrollments > 0 ? `${((totalRevenue / totalEnrollments) * 100).toFixed(2)}% ROI` : "N/A";

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("totalCourses", totalCourses);
  setText("totalEnrollments", totalEnrollments);
  setText("totalRevenue", `$${totalRevenue.toLocaleString()}`);
  setText("quickStat", quickStat);
}

/**
 * Render rows for the course table.
 * @param {Array<Object>} data - array of course objects to display (already paginated)
 */
function renderCourseTable(data) {
  const tbody = document.querySelector("#courseTable tbody");
  if (!tbody) return;
  tbody.innerHTML = ""; // clear

  data.forEach((course) => {
    const tr = document.createElement("tr");
    const tdTitle = document.createElement("td");
    tdTitle.textContent = course.title;
    const tdCat = document.createElement("td");
    tdCat.textContent = course.category;
    const tdEnrolled = document.createElement("td");
    tdEnrolled.textContent = course.enrolled;
    const tdRevenue = document.createElement("td");
    tdRevenue.textContent = `$${course.revenue.toLocaleString()}`;
    const tdActions = document.createElement("td");
    // Simple action buttons (non‑functional placeholders)
    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-sm btn-outline-primary me-1";
    editBtn.textContent = "Edit";
    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-sm btn-outline-danger";
    delBtn.textContent = "Delete";
    tdActions.appendChild(editBtn);
    tdActions.appendChild(delBtn);

    tr.appendChild(tdTitle);
    tr.appendChild(tdCat);
    tr.appendChild(tdEnrolled);
    tr.appendChild(tdRevenue);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
  });
}

/**
 * Pagination logic.
 */
let currentPage = 1;
const rowsPerPage = 10;
let filteredCourses = [];

function updatePaginationControls() {
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) {
    const totalPages = Math.ceil(filteredCourses.length / rowsPerPage) || 1;
    nextBtn.disabled = currentPage >= totalPages;
  }
}

function renderCurrentPage() {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = filteredCourses.slice(start, end);
  renderCourseTable(pageData);
  updatePaginationControls();
}

/**
 * Apply search and filter criteria to the master courses list.
 */
function applyFilters(masterList) {
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categoryFilter");
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const category = categorySelect ? categorySelect.value : "";

  filteredCourses = masterList.filter((c) => {
    const matchesText =
      c.title.toLowerCase().includes(query) || c.category.toLowerCase().includes(query);
    const matchesCat = category === "" || c.category === category;
    return matchesText && matchesCat;
  });
  currentPage = 1; // reset to first page after filter
  renderCurrentPage();
}

/**
 * Initialize dark‑mode based on saved preference.
 */
function initDarkMode() {
  const stored = localStorage.getItem("darkMode");
  const body = document.body;
  if (stored === "true") {
    body.classList.add("dark-mode");
  } else if (stored === "false") {
    body.classList.remove("dark-mode");
  }
}

/**
 * Toggle dark mode and persist the choice.
 */
function toggleDarkMode() {
  const body = document.body;
  const isDark = body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
}

/**
 * Sidebar collapse handling – optional button with id "sidebarToggle".
 */
function initSidebarToggle() {
  const toggleBtn = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");
  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    // Adjust main content margin if needed – assuming main element follows sidebar.
    const main = document.querySelector("main");
    if (main) {
      if (sidebar.classList.contains("collapsed")) {
        main.style.marginLeft = "80px"; // example collapsed width
      } else {
        main.style.marginLeft = "250px"; // example expanded width
      }
    }
  });
}

/**
 * Profile dropdown custom handling – ensures clicks outside close it.
 */
function initProfileDropdown() {
  const dropdownToggle = document.getElementById("profileDropdown");
  const dropdownMenu = dropdownToggle ? dropdownToggle.nextElementSibling : null;
  if (!dropdownToggle || !dropdownMenu) return;

  // Bootstrap already toggles, but we add extra click‑outside handling.
  document.addEventListener("click", (e) => {
    const target = e.target;
    const isInside = dropdownToggle.contains(target) || dropdownMenu.contains(target);
    if (!isInside && dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
    }
  });

  // Ensure toggle works (Bootstrap may need data attributes, but we add fallback)
  dropdownToggle.addEventListener("click", (e) => {
    e.preventDefault();
    dropdownMenu.classList.toggle("show");
  });
}

/**
 * Sample static course data.
 */
const courses = [
  { id: 1, title: "Intro to JavaScript", category: "Development", enrolled: 120, revenue: 2400 },
  { id: 2, title: "Advanced CSS", category: "Design", enrolled: 80, revenue: 1600 },
  { id: 3, title: "Digital Marketing Basics", category: "Marketing", enrolled: 95, revenue: 1900 },
  { id: 4, title: "React for Beginners", category: "Development", enrolled: 150, revenue: 3000 },
  { id: 5, title: "UI/UX Principles", category: "Design", enrolled: 70, revenue: 1400 },
  { id: 6, title: "SEO Fundamentals", category: "Marketing", enrolled: 60, revenue: 1200 },
  { id: 7, title: "Node.js Essentials", category: "Development", enrolled: 110, revenue: 2200 },
  { id: 8, title: "Illustrator Masterclass", category: "Design", enrolled: 55, revenue: 1100 },
  { id: 9, title: "Content Strategy", category: "Marketing", enrolled: 45, revenue: 900 },
  { id: 10, title: "Vue.js Crash Course", category: "Development", enrolled: 85, revenue: 1700 },
  { id: 11, title: "Brand Identity Design", category: "Design", enrolled: 40, revenue: 800 },
  { id: 12, title: "Social Media Advertising", category: "Marketing", enrolled: 70, revenue: 1400 },
];

/**
 * Main entry point – runs after DOM is ready.
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Charts
  const salesCanvas = document.getElementById("salesTrendChart");
  const enrollCanvas = document.getElementById("enrollmentDistChart");
  if (salesCanvas) {
    const cfg = getSalesTrendConfig();
    safeCreateChart(salesCanvas, cfg);
  }
  if (enrollCanvas) {
    const cfg = getEnrollmentDistConfig();
    safeCreateChart(enrollCanvas, cfg);
  }

  // 2. Sidebar toggle (optional)
  initSidebarToggle();

  // 3. Dark mode switch
  initDarkMode();
  const dmBtn = document.getElementById("darkModeToggle");
  if (dmBtn) dmBtn.addEventListener("click", toggleDarkMode);

  // 4. Render dashboard cards
  renderDashboardCards(courses);

  // 5. Course table population + pagination setup
  filteredCourses = courses.slice(); // initial unfiltered list
  renderCurrentPage();

  // 6. Search & filter bindings
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => applyFilters(courses));
  }
  const categorySelect = document.getElementById("categoryFilter");
  if (categorySelect) {
    categorySelect.addEventListener("change", () => applyFilters(courses));
  }

  // 7. Pagination button listeners
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderCurrentPage();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(filteredCourses.length / rowsPerPage) || 1;
      if (currentPage < totalPages) {
        currentPage++;
        renderCurrentPage();
      }
    });
  }

  // 8. Profile dropdown handling
  initProfileDropdown();
});

// Export helpers if other modules need them (currently none are exported).
export {};
