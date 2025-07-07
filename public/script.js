const taskIn = document.getElementById("task-in");
const taskList = document.getElementById("task-list");
const addBtn = document.getElementById("add");
const themeToggle = document.getElementById("contrast-icon");
const body = document.querySelector("body");

let tasks = [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

function createTaskElement(text, completed = false) {
  const task = document.createElement("li");

  if (completed) {
    task.classList.add("dim");
  }

  task.innerHTML = `<div class="task-li">${text}</div>`;
  taskList.appendChild(task);

  const span = document.createElement("span");
  task.appendChild(span);

  // Check button
  const check = document.createElement("button");
  check.innerHTML = '<i class="material-icons">check</i>';
  check.classList.add("clickable", "button-icon");
  span.appendChild(check);

  // Edit button
  const edit = document.createElement("button");
  edit.innerHTML = '<i class="material-icons">edit</i>';
  edit.classList.add("clickable", "button-icon");
  span.appendChild(edit);

  // Delete button
  const del = document.createElement("button");
  del.innerHTML = '<i class="material-icons">close</i>';
  del.classList.add("clickable", "button-icon");
  span.appendChild(del);

  // Check button click
  check.addEventListener("click", () => {
    if (task.classList.contains("dim")) {
      task.classList.remove("dim");
    } else {
      task.classList.add("dim");
    }
    saveTasks();
  });

  // Edit button click
  edit.addEventListener("click", () => {
    const taskText = task.querySelector(".task-li");
    const currentText = taskText.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-input";

    if (!task.classList.contains("dim")) {
      taskText.replaceWith(input);
      input.focus();
      input.select();
    } else return;

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const newText = input.value.trim();
        if (newText) {
          const newTaskText = document.createElement("div");
          newTaskText.className = "task-li";
          newTaskText.textContent = newText;
          input.replaceWith(newTaskText);
          saveTasks();
        }
      } else if (e.key === "Escape") {
        const newTaskText = document.createElement("div");
        newTaskText.className = "task-li";
        newTaskText.textContent = currentText;
        input.replaceWith(newTaskText);
      }
    });

    input.addEventListener("blur", () => {
      const newText = input.value.trim();
      const newTaskText = document.createElement("div");
      newTaskText.className = "task-li";
      newTaskText.textContent = newText || currentText;
      input.replaceWith(newTaskText);
      saveTasks();
    });
  });

  // Delete button click
  del.addEventListener("click", () => {
    task.style.transform = "scale(0.8)";
    task.style.opacity = "0";

    setTimeout(() => {
      task.remove();
      saveTasks();
    }, 300);
  });
}

// Add new task
function addTask() {
  const text = taskIn.value.trim();
  if (text === "") return;

  createTaskElement(text, false);
  taskIn.value = "";
  saveTasks();
}

// Search tasks
function searchTasks() {
  const searchIn = document.getElementById("search-in");

  searchIn.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase().trim();
    const taskElements = taskList.querySelectorAll("li");

    taskElements.forEach((task) => {
      const taskText = task.querySelector(".task-li").textContent.toLowerCase();
      if (taskText.includes(searchText)) {
        task.style.display = "flex";
        task.style.opacity = "1";
        task.style.transform = "scale(1)";
      } else {
        task.style.opacity = "0";
        task.style.transform = "scale(0.8)";
        setTimeout(() => {
          if (task.style.opacity === "0") {
            task.style.display = "none";
          }
        }, 300);
      }
    });
  });
}

// Typewriter effect for title
function typewriter() {
  const title = document.querySelector("h1");
  const titleTxt = "It doesn't have to be pretty.";
  title.classList.add("blink");
  let i = 0;

  function type() {
    if (i < titleTxt.length) {
      title.innerHTML += titleTxt.charAt(i);
      i++;
      setTimeout(type, 70);
    }
  }
  type();
}

// Initialize app
function init() {
  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light");
  }

  // Load saved tasks
  loadTasks();
  tasks.forEach((task) => createTaskElement(task.text, task.completed));

  // Start typewriter
  typewriter();

  // Setup search
  searchTasks();
}

// Event listeners
addBtn.addEventListener("click", addTask);
taskIn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Start app when page loads
document.addEventListener("DOMContentLoaded", init);
