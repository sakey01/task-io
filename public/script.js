/*
  Create a simple to-do list app that allows users to search, add, edit, and delete items. Use local
  storage to store the data.
*/
const taskInput = document.querySelector("#add-task-input");
const addBtn = document.querySelector("#addbtn");
const taskList = document.querySelector("#list");
const searchBtn = document.querySelector("#search-icon");
const searchContainer = document.querySelector("#search-container");

// Example task setup
const exampleTask = document.querySelector("#example-li");
if (exampleTask) {
  setupTask(exampleTask);
}

// Add new task when button is clicked
addBtn.addEventListener("click", addNewTask);

// Add new task when Enter is pressed
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNewTask();
});

// Search functionality
searchBtn.addEventListener("click", toggleSearch);

// Function to add a new task
function addNewTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  // Create new task element
  const newTask = document.createElement("li");
  newTask.innerHTML = `<span class="task-text">${taskText}</span>`;
  taskList.appendChild(newTask);

  taskInput.value = "";

  setupTask(newTask);

  updateBorder();
}

function setupTask(task) {
  // Create edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  task.appendChild(editBtn);

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  task.appendChild(deleteBtn);

  editBtn.addEventListener("click", () => {
    const currentText = task.querySelector(".task-text").textContent;

    const editInput = document.createElement("input");
    editInput.value = currentText;
    task.innerHTML = "";
    task.appendChild(editInput);

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    task.appendChild(saveBtn);

    editInput.focus();

    // Save when Enter is pressed
    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") saveEdit();
    });

    saveBtn.addEventListener("click", saveEdit);

    function saveEdit() {
      const newText = editInput.value;
      task.innerHTML = `<span class="task-text">${newText}</span>`;
      task.append(editBtn, deleteBtn);
      storeTasks(); // Save after editing
    }
  });

  deleteBtn.addEventListener("click", () => {
    task.remove();
    updateBorder();
    storeTasks(); // Save after deleting
  });

  task.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") return;

    const taskText = task.querySelector(".task-text");
    const checked = taskText.style.textDecoration === "line-through";

    if (checked) {
      taskText.style.textDecoration = "none";
      task.style.backgroundColor = "transparent";
    } else {
      taskText.style.textDecoration = "line-through";
      task.style.backgroundColor = "grey";
    }
    
    storeTasks(); // Save after marking as done/undone
  });
}

// Function to show/hide border based on number of tasks
function updateBorder() {
  const tasks = taskList.querySelectorAll("li");

  if (tasks.length === 0) {
    taskList.style.border = "none";
    taskList.style.boxShadow = "none";
  } else {
    taskList.style.border = "";
    taskList.style.boxShadow = "";
  }
}

function showAllTasks() {
  const tasks = taskList.querySelectorAll("li");
  tasks.forEach((task) => {
    task.style.display = "";
  });
}

function toggleSearch() {
  let searchInput = document.querySelector("#search-bar");

  if (searchInput) {
    // Close search
    searchInput.remove();
    showAllTasks();
    updateBorder();
  } else {
    // Open search
    searchInput = document.createElement("input");
    searchInput.id = "search-bar";
    searchInput.placeholder = "Search tasks";
    searchInput.className = "search-input";
    searchContainer.appendChild(searchInput);

    searchInput.focus();

    // Search as you type
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      const tasks = taskList.querySelectorAll("li");
      let liCount = 0;

      tasks.forEach((task) => {
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(searchTerm)) {
          task.style.display = "";
          liCount++;
        } else {
          task.style.display = "none";
        }
      });

      if (liCount === 0) {
        taskList.style.border = "none";
        taskList.style.boxShadow = "none";
      } else {
        taskList.style.border = "";
        taskList.style.boxShadow = "";
      }
    });

    // Close search when clicking outside
    document.addEventListener("click", (e) => {
      if (!searchContainer.contains(e.target)) {
        searchInput.remove();
        showAllTasks();
        updateBorder();
      }
    });

    // Close search with Escape key
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.remove();
        showAllTasks();
        updateBorder();
      }
    });
  }
}

// Function to save tasks to local storage
function storeTasks() {
  const tasks = taskList.querySelectorAll("li");
  const taskData = [];

  tasks.forEach(task => {
    const taskText = task.querySelector(".task-text").textContent;
    const checked = task.querySelector(".task-text").style.textDecoration === "line-through";
    
    taskData.push({
      text: taskText,
      done: checked
    });
  });

  localStorage.setItem("userTasks", JSON.stringify(taskData));
}

// Function to load tasks from local storage
function getTasks() {
  const savedTasks = localStorage.getItem("userTasks");

  if (savedTasks) {
    const taskData = JSON.parse(savedTasks);

    taskList.innerHTML = "";

    taskData.forEach(task => {
      const newTask = document.createElement("li");
      newTask.innerHTML = `<span class="task-text">${task.text}</span>`;

      if (task.done) {
        newTask.querySelector(".task-text").style.textDecoration = "line-through";
        newTask.style.backgroundColor = "grey";
      }

      taskList.appendChild(newTask);
      setupTask(newTask);
    });
  }
}

// Load tasks when page loads
getTasks();

// Save tasks whenever they change
function saveTasksOnChange() {
  storeTasks();
}

// Add event listeners to save tasks when they change
addBtn.addEventListener("click", saveTasksOnChange);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    setTimeout(saveTasksOnChange, 100);
  }
});