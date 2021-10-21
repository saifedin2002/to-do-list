let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array to store tasks
let arrayOfTasks = [];

// check if theres in local storage
if (localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// trigger Data from local storage
getDataFromLocalStroage();

// add task

submit.onclick = function () {
    if (input.value !== ""){
        addTaskToArray(input.value);
        input.value = ""; //Empty input field
    }
}

// Click on task element
tasksDiv.addEventListener("click",(e)=>{
    //Delete button
    if(e.target.classList.contains("del")){
        //remove element from page
        e.target.parentElement.remove();
        // remove task from local storage
        deleteTaskeWhit(e.target.parentElement.getAttribute("data-id"));
    }
    if(e.target.classList.contains("task")){
        //toggle completed for the task
        toggleStatusTaskWhit(e.target.getAttribute("data-id"));
       // toggle done class
       e.target.classList.toggle("done");
    }
})
function addTaskToArray(taskText){
    // Task Data
    const task = {
        id : Date.now(),
        title : taskText,
        completed : false,
    } ;
   
    // push task to array of tasks      
    arrayOfTasks.push(task);
    // add tasks to page
    addElementsToPageFrom(arrayOfTasks); 
    //add task to local storage
    addTaskToLocalStorageFrom(arrayOfTasks);               
}

function addElementsToPageFrom(arrayOfTasks){
    //Empty the tasks div
    tasksDiv.innerHTML = " ";
    // looping in array of tasks
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        // check if task done
        if (task.completed == true){
            div.className = "task done"; 
        }
        div.setAttribute("data-id",task.id) 
        div.appendChild(document.createTextNode(task.title)) ;
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete")) ;
        div.append(span);
        //add task to tasks container
        tasksDiv.append(div);
    });
}

function addTaskToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStroage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskeWhit(taskId){
    // for expalin only
    // for (i=0 ; i< arrayOfTasks.length; i++){
    //      console.log(`${arrayOfTasks[i].id==taskId}`)  
    // }

    arrayOfTasks= arrayOfTasks.filter((task)=>{
        task != taskId
    })
    addTaskToLocalStorageFrom(arrayOfTasks)
}

function  toggleStatusTaskWhit(taskId){
    for (i=0 ; i< arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed== false ? arrayOfTasks[i].completed== true : arrayOfTasks[i].completed = false
        } 
    }
    addTaskToLocalStorageFrom(arrayOfTasks)
}