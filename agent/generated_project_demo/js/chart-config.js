// Chart.js configuration module for the dashboard
// This module exports configuration objects for two charts and helper functions
// that return deep copies of those configurations.

// Sales Trend Line Chart Configuration
export const salesTrendConfig = {
  type: "line",
  data: {
    // Labels for the last 12 months (generic month names)
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1500, 1100, 1700, 1600, 1900, 2100, 1800, 2000, 2300, 2500, 2700],
        borderColor: "#6a0dad", // Primary purple
        backgroundColor: "rgba(106,13,173,0.2)", // Semi‑transparent fill
        fill: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

// Enrollment Distribution Pie Chart Configuration
export const enrollmentDistConfig = {
  type: "pie",
  data: {
    labels: ["Development", "Design", "Marketing"],
    datasets: [
      {
        label: "Enrollments",
        data: [120, 80, 100],
        backgroundColor: ["#6a0dad", "#8e44ad", "#9b59b6"], // Shades of purple
        hoverOffset: 4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  },
};

// Helper to return a deep copy of the sales trend config
export function getSalesTrendConfig() {
  // Using JSON methods for a deep clone (Chart.js config objects are JSON‑compatible)
  return JSON.parse(JSON.stringify(salesTrendConfig));
}

// Helper to return a deep copy of the enrollment distribution config
export function getEnrollmentDistConfig() {
  return JSON.parse(JSON.stringify(enrollmentDistConfig));
}

// No code is executed on module load; only definitions are exported.
