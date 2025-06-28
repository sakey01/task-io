/*
Create a simple to-do list app that allows users to search, add, edit, and delete items. Use local storage to store the data.
*/

const addTask = document.querySelector("#add-task");
const addbtn = document.querySelector("#addbtn");
const list = document.querySelector("#list");

// Set up the template list item
const templateItem = document.querySelector("#example-li");
if (templateItem) {
  const text = templateItem.textContent;
  
  // Wrap text in span for line-through targeting
  templateItem.innerHTML = `<span class="task-text">${text}</span>`;
  
  // Add edit button first
  const editbtn = document.createElement("button");
  editbtn.innerHTML = "Edit";
  templateItem.appendChild(editbtn);

  editbtn.addEventListener("click", () => {
    const editTask = document.createElement("input");
    editTask.value = text;
    templateItem.innerHTML = "";
    templateItem.appendChild(editTask);

    const savebtn = document.createElement("button");
    savebtn.textContent = "Save";
    templateItem.appendChild(savebtn);

    savebtn.addEventListener("click", () => {
      const newText = editTask.value;
      templateItem.innerHTML = `<span class="task-text">${newText}</span>`;
      templateItem.append(editbtn, delbtn);
    });
  });

  // Add delete button second
  const delbtn = document.createElement("button");
  delbtn.innerHTML = "Delete";
  templateItem.appendChild(delbtn);

  delbtn.addEventListener("click", () => {
    templateItem.remove();
    checkEmptyList();
  });

  // Make it selectable with line-through
  templateItem.addEventListener("click", (e) => {
    // Don't trigger if clicking on buttons
    if (e.target.tagName === 'BUTTON') return;
    
    const textSpan = templateItem.querySelector('.task-text');
    if (textSpan.style.textDecoration === "line-through") {
      textSpan.style.textDecoration = "none";
      templateItem.style.backgroundColor = "transparent";
    } else {
      textSpan.style.textDecoration = "line-through";
      templateItem.style.backgroundColor = "grey";
    }
  });
}

// Function to check if list is empty and hide/show borders
function checkEmptyList() {
  const listItems = list.querySelectorAll("li");
  if (listItems.length === 0) {
    list.style.border = "none";
    list.style.boxShadow = "none";
  } else {
    list.style.border = "";
    list.style.boxShadow = "";
  }
}

// Check initial state
checkEmptyList();

addTask.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addbtn.click();
});

addbtn.addEventListener("click", () => {
  const text = addTask.value.trim();

  //add task
  if (text !== "") {
    const currItem = document.createElement("li");
    currItem.innerHTML = `<span class="task-text">${text}</span>`;
    list.append(currItem);
    addTask.value = "";
    currItem.style.overflow = "hidden";

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
        currItem.innerHTML = `<span class="task-text">${newText}</span>`;
        currItem.append(editbtn, delbtn);
      });
    });

    //delete task
    const delbtn = document.createElement("button");
    delbtn.innerHTML = "Delete";
    currItem.appendChild(delbtn);

    delbtn.addEventListener("click", () => {
      currItem.remove();
      checkEmptyList();
    });

    //line through text on click
    currItem.addEventListener("click", (e) => {
      // Don't trigger if clicking on buttons
      if (e.target.tagName === 'BUTTON') return;
      
      const textSpan = currItem.querySelector('.task-text');
      if (textSpan.style.textDecoration === "line-through") {
        textSpan.style.textDecoration = "none";
        currItem.style.backgroundColor = "transparent";
      } else {
        textSpan.style.textDecoration = "line-through";
        currItem.style.backgroundColor = "grey";
      }
    });

    // Show borders when adding first item
    checkEmptyList();
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
        
        const listItems = list.querySelectorAll("li");
        listItems.forEach((item) => {
          item.style.display = "flex";
        });
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
