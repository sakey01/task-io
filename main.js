/*
Create a simple to-do list app that allows users to search, add, edit, and delete items. Use local storage to store the data.
*/

//search


//add
const task = document.querySelector("#task-input");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");

btn.addEventListener("click", function() {
    const text = task.value.trim();

    if (text !== "") {
        const currItem = document.createElement("li");
        currItem.innerHTML = text;
        list.append(currItem);
        task.value = "";
    }   
});


//edit
function edit(id) {
   
}



//delete
function edit(id) {
    
}