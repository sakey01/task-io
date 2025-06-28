/*
Create a simple to-do list app that allows users to search, add, edit, and delete items. Use local storage to store the data.
*/

const addTask = document.querySelector("#add-task");
const addbtn = document.querySelector("#addbtn");
const list = document.querySelector("#list");

addTask.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addbtn.click();
});

addbtn.addEventListener("click", () => {
  const text = addTask.value.trim();

  //add task
  if (text !== "") {
    const currItem = document.createElement("li");
    currItem.innerHTML = text;
    list.append(currItem);
    addTask.value = "";
    currItem.style.overflow = "hidden";

    //delete task
    const delbtn = document.createElement("button");
    delbtn.innerHTML = "Delete";
    currItem.appendChild(delbtn);

    delbtn.addEventListener("click", () => {
      currItem.remove();
      delbtn.remove();
    });

    //edit task
    const editbtn = document.createElement("button");
    editbtn.innerHTML = "Edit";
    currItem.appendChild(editbtn);

    editbtn.addEventListener("click", () => {
      const editTask = document.createElement("input");
      editTask.value = text;
      currItem.innerHTML = "";
      currItem.appendChild(editTask);

      const savebtn = document.createElement("button");
      savebtn.textContent = "Save";
      currItem.appendChild(savebtn);

      savebtn.addEventListener("click", () => {
        const newText = editTask.value;
        currItem.innerHTML = newText;
        currItem.append(editbtn, delbtn);
      });
    });

    //text line through on click
    currItem.addEventListener("click", () => {
      if (currItem.style.textDecoration === "line-through") {
        currItem.style.textDecoration = "none";
        currItem.style.backgroundColor = "transparent";
      } else {
        currItem.style.textDecoration = "line-through";
        currItem.style.backgroundColor = "grey";
      }
    });
  }
});

//search tasks
const search = document.querySelector("#search-icon");
const nav = document.querySelector("nav");

search.addEventListener("click", () => {
  if (!document.querySelector("#search-bar")) {
    const searchBar = document.createElement("input");
    searchBar.id = "search-bar";
    searchBar.placeholder = "Search for tasks";
    nav.append(searchBar);
  }
});