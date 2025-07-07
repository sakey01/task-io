const taskIn = document.getElementById("task-in");
const taskList = document.getElementById("task-list");
const addBtn = document.getElementById("add");
let tasks = [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      tasks = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      tasks = [];
    }
  } else {
    tasks = [];
  }
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function createTaskElement(text, completed = false) {
  const task = document.createElement("li");
  if (completed) task.classList.add("dim");
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

    function saveEdit(newText) {
      // Find the index of this task in the tasks array
      const index = Array.from(taskList.children).indexOf(task);
      if (index !== -1) {
        tasks[index].text = newText;
        saveTasks();
      }
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const newText = input.value.trim();
        if (newText) {
          const newTaskText = document.createElement("div");
          newTaskText.className = "task-li";
          newTaskText.textContent = newText;
          input.replaceWith(newTaskText);
          saveEdit(newText);
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
      if (newText) saveEdit(newText);
    });
  });

  // Delete button
  const del = document.createElement("button");
  del.innerHTML = '<i class="material-icons">close</i>';
  del.classList.add("clickable", "button-icon");
  span.appendChild(del);
  del.addEventListener("click", () => {
    task.style.transform = "scale(0.8)";
    task.style.opacity = "0";
    setTimeout(() => {
      task.remove();
      tasks = tasks.filter(t => t.text !== text || t.completed !== completed);
      saveTasks();
    }, 300);
  });
}

function addTask() {
  const text = taskIn.value.trim();
  if (text === "") return;
  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  taskIn.value = "";
}

addBtn.addEventListener("click", addTask);
taskIn.addEventListener("keydown", (e) => {
  // Only add task if Enter is pressed and the event target is the main input
  if (e.key === "Enter" && e.target === taskIn) {
    e.preventDefault();
    addTask();
  }
});

// ===== Theme Management =====
const themeToggle = document.getElementById("contrast-icon");
const body = document.querySelector("body");
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("theme", body.classList.contains("light") ? "light" : "dark");
});

// ===== Search Functionality =====
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

// ===== Typewriter Effect =====
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

document.addEventListener("DOMContentLoaded", () => {
  // Theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") body.classList.add("light");
  // Tasks
  loadTasks();
  renderTasks();
  // Typewriter
  typewriter();
});
