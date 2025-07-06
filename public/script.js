const taskIn = document.getElementById("task-in");
const taskList = document.getElementById("task-list");
const addBtn = document.getElementById("add");

function makeTask() {
  const text = taskIn.value.trim();
  if (text === "") return;

  const task = document.createElement("li");
  task.innerHTML = `<div class="task-li">${text}</div>`;
  taskList.appendChild(task);

  taskIn.value = "";

  const span = document.createElement("span");
  task.appendChild(span);

  // Create check button
  const check = document.createElement("i");
  check.textContent = "check";
  check.className = "material-icons clickable";
  span.appendChild(check);

  // Create edit button
  const edit = document.createElement("i");
  edit.textContent = "edit";
  edit.className = "material-icons clickable";
  span.appendChild(edit);

  // Create delete button
  const del = document.createElement("i");
  del.textContent = "close";
  del.className = "material-icons clickable";
  span.appendChild(del);

  check.addEventListener("click", () => {
    if (task.classList.contains("dim")) {
      task.classList.remove("dim");
    } else {
      task.classList.add("dim");
    }
  });

  edit.addEventListener("click", () => {
    const taskText = task.querySelector(".task-li");
    const currentText = taskText.textContent;
    const prevText = currentText;
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-input";
    input.style.borderRadius = "1em";

    taskText.replaceWith(input);
    input.focus();
    //
    input.addEventListener("blur", () => {
      const newText = input.value.trim();
      if (newText) {
        const newTaskText = document.createElement("div");
        newTaskText.className = "task-li";
        newTaskText.textContent = prevText;
        input.replaceWith(newTaskText);
      } else {
        task.remove();
      }
    });

    //escape on 'esc'
    taskIn.addEventListener("keydown", (e) => {
      if (e.key === "Escape") input.blur();
    });

    //task added on 'Enter'
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") input.blur();
    });
  });
  //delete task
  del.addEventListener("click", () => {
    task.remove();
  });
}

addBtn.addEventListener("click", () => {
  makeTask();
});

//confirm on enter
taskIn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") makeTask();
});

//search task
function search() {
  const searchIn = document.getElementById("search-in");

  searchIn.addEventListener("input", (e) => {
    const textIn = e.target.value.toLowerCase().trim();
    const tasks = taskList.querySelectorAll("li");

  
    tasks.forEach((task) => {
      if (tasks.includes(textIn)) {
        task.style.display = "";
      } else {
        task.style.display = "none";
      }
    });
  });
}

search();

//storing data locally
const data = {};
const tasks = document.querySelectorAll("ul li");
tasks.forEach((task) => {});

//typewriter effect
const title = document.querySelector("h1");
const titleTxt = "It doesn't have to be pretty.";
title.classList.add("blink");
let i = 0;
function typewriter() {
  if (i < titleTxt.length) {
    title.innerHTML += titleTxt.charAt(i);
    i++;
    setTimeout(typewriter, 70);
  }
}
typewriter();

//dark mode
