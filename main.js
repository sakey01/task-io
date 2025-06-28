const taskInput = document.querySelector("#add-task");
const addButton = document.querySelector("#addbtn");
const taskList = document.querySelector("#list");


const exampleTask = document.querySelector("#example-li");
if (exampleTask) {
  const taskText = exampleTask.textContent;

  exampleTask.innerHTML = `<span class="task-text">${taskText}</span>`;

  const editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  exampleTask.appendChild(editButton);

  
  editButton.addEventListener("click", () => {
    const editBox = document.createElement("input");
    editBox.value = taskText;
    exampleTask.innerHTML = "";
    exampleTask.appendChild(editBox);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    exampleTask.appendChild(saveButton);

    // When you click "Save", keep the new words
    saveButton.addEventListener("click", () => {
      const newWords = editBox.value;
      exampleTask.innerHTML = `<span class="task-text">${newWords}</span>`;
      exampleTask.append(editButton, deleteButton);
    });
  });

  // Make a "Delete" button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  exampleTask.appendChild(deleteButton);

  // When you click "Delete", remove the task
  deleteButton.addEventListener("click", () => {
    exampleTask.remove();
    hideBordersIfNoTasks();
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

// This function hides the box around the list when there are no tasks
function hideBordersIfNoTasks() {
  const allTasks = taskList.querySelectorAll("li");
  if (allTasks.length === 0) {
    // No tasks? Hide the box!
    taskList.style.border = "none";
    taskList.style.boxShadow = "none";
  } else {
    // Has tasks? Show the box!
    taskList.style.border = "";
    taskList.style.boxShadow = "";
  }
}

// Check if we need to hide the box when the page first loads
hideBordersIfNoTasks();

// When you press Enter in the task input box, click the Add button
taskInput.addEventListener("keydown", function (keyPress) {
  if (keyPress.key === "Enter") addButton.click();
});

// When you click the Add button, add a new task
addButton.addEventListener("click", () => {
  const newTaskWords = taskInput.value.trim(); // Get the words you typed

  // Only add a task if you actually typed something
  if (newTaskWords !== "") {
    // Create a new task item
    const newTask = document.createElement("li");
    newTask.innerHTML = `<span class="task-text">${newTaskWords}</span>`;
    taskList.append(newTask);
    taskInput.value = ""; // Clear the input box
    newTask.style.overflow = "hidden";

    // Make an "Edit" button for the new task
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    newTask.appendChild(editButton);

    // When you click "Edit", let you change the words
    editButton.addEventListener("click", () => {
      const editBox = document.createElement("input");
      editBox.value = newTaskWords;
      newTask.innerHTML = "";
      newTask.appendChild(editBox);

      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      newTask.appendChild(saveButton);

      // When you click "Save", keep the new words
      saveButton.addEventListener("click", () => {
        const newWords = editBox.value;
        newTask.innerHTML = `<span class="task-text">${newWords}</span>`;
        newTask.append(editButton, deleteButton);
      });
    });

    // Make a "Delete" button for the new task
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    newTask.appendChild(deleteButton);

    // When you click "Delete", remove the task
    deleteButton.addEventListener("click", () => {
      newTask.remove();
      hideBordersIfNoTasks();
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
    hideBordersIfNoTasks();
  }
});

// Search for tasks
const searchButton = document.querySelector("#search-icon");
const searchContainer = document.querySelector("#search-box");

searchButton.addEventListener("click", () => {
  let searchBox = document.querySelector("#search-bar");

  // If there's no search box, make one
  if (!searchBox) {
    searchBox = document.createElement("input");
    searchBox.id = "search-bar";
    searchBox.placeholder = "Search tasks";
    searchBox.type = "text";
    searchBox.className = "search-input";
    searchContainer.appendChild(searchBox);

    searchBox.focus(); // Put the cursor in the search box

    // When you type in the search box, show only matching tasks
    searchBox.addEventListener("input", (typeEvent) => {
      const searchWords = typeEvent.target.value.toLowerCase().trim();
      const allTasks = taskList.querySelectorAll("li");

      allTasks.forEach((task) => {
        const taskWords = task.textContent.toLowerCase();
        if (taskWords.includes(searchWords)) {
          task.style.display = "flex"; // Show this task
        } else {
          task.style.display = "none"; // Hide this task
        }
      });
    });

    // When you click outside the search box, close it
    document.addEventListener("click", (clickEvent) => {
      if (!searchContainer.contains(clickEvent.target)) {
        searchBox.remove();

        // Show all tasks again when search is closed
        const allTasks = taskList.querySelectorAll("li");
        allTasks.forEach((task) => {
          task.style.display = "flex";
        });
      }
    });

    // When you press Escape, close the search
    searchBox.addEventListener("keydown", (keyPress) => {
      if (keyPress.key === "Escape") {
        searchBox.remove();

        // Show all tasks again
        const allTasks = taskList.querySelectorAll("li");
        allTasks.forEach((task) => {
          task.style.display = "flex";
        });
      }
    });
  } else {
    // If there's already a search box, close it
    searchBox.remove();

    // Show all tasks again
    const allTasks = taskList.querySelectorAll("li");
    allTasks.forEach((task) => {
      task.style.display = "flex";
    });
  }
});
