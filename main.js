/*
Create a simple to-do list app that allows users to search, add, edit, and delete items. Use local storage to store the data.
*/

const addTask = document.querySelector("#add-task");
const addbtn = document.querySelector("#addbtn");
const list = document.querySelector("#list");
const currItem = document.createElement("li");

addTask.addEventListener("keydown", function(e) {
    if(e.key === "Enter") addbtn.click();
});

//add
 addbtn.addEventListener("click", () => {
    const text = addTask.value.trim();
    console.log(typeof(lidt));

    if (text !== "") {
        const currItem = document.createElement("li");
        currItem.innerHTML = text;
        list.append(currItem);
        addTask.value = "";

        currItem.style.overflow = "hidden";

        currItem.addEventListener("click", () => {
            if (currItem.style.textDecoration === "line-through") {
                currItem.style.textDecoration = "none";
                currItem.style.backgroundColor = "transparent";
            } else {
                currItem.style.textDecoration = "line-through";
                currItem.style.backgroundColor = "grey";
            }
        });

        //delete
        const delbtn = document.createElement("button");
        delbtn.innerHTML = "delete";
        currItem.appendChild(delbtn);

        delbtn.addEventListener("click", () => {
            currItem.remove();
            delbtn.remove();
        })

        //edit
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
                editTask.remove();
                currItem.innerHTML = newText;
                savebtn.remove(); 

                currItem.append(editbtn, delbtn);
            })
        })
    } 
}); 

//search
const search = document.querySelector("#search-icon");
const nav = document.querySelector("nav");

search.addEventListener("click", () => {
    if (!document.querySelector("#search-bar")) {
        const searchBar = document.createElement("input");
        searchBar.id = "search-bar";
        searchBar.placeholder = "Type here...";
        nav.append(searchBar);
    }
});