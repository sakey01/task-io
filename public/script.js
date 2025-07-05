//add task
const taskIn = document.getElementById("task-in");
const taskList = document.getElementById("task-list");
const addBtn = document.getElementById("add");

function addTask() {
  addBtn.addEventListener("click", () => {
    const text = taskIn.value.trim();
    if (text === "") return;

    const task = document.createElement("li");
    task.innerHTML = `<span class="task-li">${text}</span>`;
    taskList.appendChild(task);

    taskIn.value = "";
  });
}

addTask();

//check button

//edit task
const edit = document.createElement("button");

//delete task

const del = document.createElement("button");

//open search bar
const searchIcon = document.getElementById("search-icon");
searchIcon.addEventListener("click", () => {});

//search task

//typewriter effect
const title = document.querySelector("h1");
const titleTxt = "It doesn't have to be pretty.";
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
