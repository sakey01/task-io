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

    //line through text on click
    const li = list.querySelector("li");
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
const searchBox = document.querySelector("#search-box");

search.addEventListener("click", () => {
  let searchBar = document.querySelector("#search-bar");

  if (!searchBar) {
    searchBar = document.createElement("input");
    searchBar.id = "search-bar";
    searchBar.placeholder = "Search tasks";
    searchBar.type = "text";
    searchBar.className = "search-input";
    searchBox.appendChild(searchBar);

    searchBar.focus();

    searchBar.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      const listItems = list.querySelectorAll("li");

      listItems.forEach((item) => {
        const itemText = item.textContent.toLowerCase();
        if (itemText.includes(searchTerm)) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });

    // Close search when clicking outside
    document.addEventListener("click", (e) => {
      if (!searchBox.contains(e.target)) {
        searchBar.remove();
      }
    });

    // Close search on Escape key
    searchBar.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchBar.remove();

        const listItems = list.querySelectorAll("li");
        listItems.forEach((item) => {
          item.style.display = "flex";
        });
      }
    });
  } else {
    searchBar.remove();

    const listItems = list.querySelectorAll("li");
    listItems.forEach((item) => {
      item.style.display = "flex";
    });
  }
});
