const taskInput = document.querySelector("#add-task-input");
const addBtn = document.querySelector("#addbtn");
const taskList = document.querySelector("#list");

const exampleTask = document.querySelector("#example-li");
if (exampleTask) {
  const taskText = exampleTask.textContent;

  exampleTask.innerHTML = `<span class="task-text">${taskText}</span>`;

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  exampleTask.appendChild(editBtn);

  editBtn.addEventListener("click", () => {
    const editInput = document.createElement("input");
    editInput.value = exampleTask.querySelector(".task-text").textContent;
    exampleTask.innerHTML = "";
    exampleTask.appendChild(editInput);

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    exampleTask.appendChild(saveBtn);

    //Add a 'enter key' for the edit box to save content
    editInput.addEventListener("keydown", function (keyPress) {
      if (keyPress.key === "Enter") saveBtn.click();
    });

    // Focus on the input so user can start typing immediately
    editInput.focus();

    // When you click "Save", keep the new words
    saveBtn.addEventListener("click", () => {
      const newWord = editInput.value;
      exampleTask.innerHTML = `<span class="task-text">${newWord}</span>`;
      exampleTask.append(editBtn, deleteBtn);
    });
  });

  // Make a "Delete" button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  exampleTask.appendChild(deleteBtn);

  // When you click "Delete", remove the task
  deleteBtn.addEventListener("click", () => {
    exampleTask.remove();
    hideBorder();
  });

  // When you click on the words, draw a line through them (mark as done)
  exampleTask.addEventListener("click", (clickEvent) => {
    // Don't do anything if you clicked on a button
    if (clickEvent.target.tagName === "BUTTON") return;

    const wordsBox = exampleTask.querySelector(".task-text");
    if (wordsBox.style.textDecoration === "line-through") {
      // Remove the line and grey color
      wordsBox.style.textDecoration = "none";
      exampleTask.style.backgroundColor = "transparent";
    } else {
      // Draw a line through the words and make it grey
      wordsBox.style.textDecoration = "line-through";
      exampleTask.style.backgroundColor = "grey";
    }
  });
}

function hideBorder() {
  const allTasks = taskList.querySelectorAll("li");
  if (allTasks.length === 0) {
    taskList.style.border = "none";
    taskList.style.boxShadow = "none";
  } else {
    taskList.style.border = "";
    taskList.style.boxShadow = "";
  }
}

function showTasks() {
  const allTasks = taskList.querySelectorAll("li");
  allTasks.forEach((task) => {
    task.style.display = "";
  });
}

// Check if we need to hide the box when the page first loads
hideBorder();

// When you press Enter in the task input box, click the Add button
taskInput.addEventListener("keydown", function (keyPress) {
  if (keyPress.key === "Enter") addBtn.click();
});

// When you click the Add button, add a new task
addBtn.addEventListener("click", () => {
  const newTaskWord = taskInput.value.trim(); // Get the words you typed

  // Only add a task if you actually typed something
  if (newTaskWord !== "") {
    // Create a new task item
    const newTask = document.createElement("li");
    newTask.innerHTML = `<span class="task-text">${newTaskWord}</span>`;
    taskList.append(newTask);
    taskInput.value = ""; // Clear the input box
    newTask.style.overflow = "hidden";

    // Make an "Edit" button for the new task
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    newTask.appendChild(editBtn);

    // When you click "Edit", let you change the words
    editBtn.addEventListener("click", () => {
      const editInput = document.createElement("input");
      editInput.value = newTask.querySelector(".task-text").textContent;
      newTask.innerHTML = "";
      newTask.appendChild(editInput);

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      newTask.appendChild(saveBtn);

      //Add a 'enter key' for the edit box to save content
      editInput.addEventListener("keydown", function (keyPress) {
        if (keyPress.key === "Enter") saveBtn.click();
      });

      // Focus on the input so user can start typing immediately
      editInput.focus();

      saveBtn.addEventListener("click", () => {
        const newWord = editInput.value;
        newTask.innerHTML = `<span class="task-text">${newWord}</span>`;
        newTask.append(editBtn, deleteBtn);
      });
    });

    // Make a "Delete" button for the new task
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    newTask.appendChild(deleteBtn);

    // When you click "Delete", remove the task
    deleteBtn.addEventListener("click", () => {
      newTask.remove();
      hideBorder();
    });

    // When you click on the words, draw a line through them (mark as done)
    newTask.addEventListener("click", (clickEvent) => {
      // Don't do anything if you clicked on a button
      if (clickEvent.target.tagName === "BUTTON") return;

      const wordsBox = newTask.querySelector(".task-text");
      if (wordsBox.style.textDecoration === "line-through") {
        // Remove the line and grey color
        wordsBox.style.textDecoration = "none";
        newTask.style.backgroundColor = "transparent";
      } else {
        // Draw a line through the words and make it grey
        wordsBox.style.textDecoration = "line-through";
        newTask.style.backgroundColor = "grey";
      }
    });

    // Show the box around the list since we now have a task
    hideBorder();
  }
});

// Search for tasks
const searchBtn = document.querySelector("#search-icon");
const searchContainer = document.querySelector("#search-container");

searchBtn.addEventListener("click", () => {
  let searchInput = document.querySelector("#search-bar");

  // If there's no search box, make one
  if (!searchInput) {
    searchInput = document.createElement("input");
    searchInput.id = "search-bar";
    searchInput.placeholder = "Search tasks";
    searchInput.type = "text";
    searchInput.className = "search-input";
    searchContainer.appendChild(searchInput);

    searchInput.focus();

    // When you type in the search box, show only matching tasks
    searchInput.addEventListener("input", (e) => {
      const searchWords = e.target.value.toLowerCase().trim();
      const allTasks = taskList.querySelectorAll("li");
      let visibleTasks = 0;

      allTasks.forEach((task) => {
        const taskWords = task.textContent.toLowerCase();
        if (taskWords.includes(searchWords)) {
          task.style.display = ""; // Show this task
          visibleTasks++;
        } else {
          task.style.display = "none"; // Hide this task
        }
      });

      // Hide border if no tasks are visible, show it if tasks are visible
      if (visibleTasks === 0) {
        taskList.style.border = "none";
        taskList.style.boxShadow = "none";
      } else {
        taskList.style.border = "";
        taskList.style.boxShadow = "";
      }
    });

    // When you click outside the search box, close it
    document.addEventListener("click", (clickEvent) => {
      if (!searchContainer.contains(clickEvent.target)) {
        searchInput.remove();
        showTasks();
      }
    });

    // When you press Escape, close the search
    searchInput.addEventListener("keydown", (keyPress) => {
      if (keyPress.key === "Escape") {
        searchInput.remove();
        showTasks();
      }
    });
  } else {
    // If there's already a search box, close it
    searchInput.remove();
    showTasks();
  }
});
