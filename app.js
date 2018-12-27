//Define UI variables

const form = document.querySelector('#task-form');

const taskList = document.querySelector('.collection');

const clearBtn = document.querySelector('.clear-tasks');

const filter = document.querySelector('#filter');

const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {

    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear task event
    clearBtn.addEventListener('click', clearTasks);

    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);
    
}

//Get Tasks from Local Storage
function getTasks() {

    let tasks;

    if(localStorage.getItem('tasks') === null) {

        tasks = [];
    } else {

        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {

        const li = document.createElement('li');

        li.className = 'collection-item';

        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';

        link.innerHTML = '<i class="fa fa-times-circle"></i>';

        li.appendChild(link);

        taskList.appendChild(li);
    });

}

//Add Tasks
function addTask(e) {

    if(taskInput.value === '') {
        alert('Add a Task');
    } else {
        //Create li element
        const li = document.createElement('li');

        //Add a class to the li element
        li.className = 'collection-item';

        //Create a text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));

        //Create new link element
        const link = document.createElement('a');

        link.className = 'delete-item secondary-content';

        //Add icon html
        link.innerHTML = '<i class="fa fa-times-circle"></i>';

        //Append the link to the li
        li.appendChild(link);

        //Append the li to the ul
        taskList.appendChild(li);

        //Store in local storage
        storeTaskInLocalStorage(taskInput.value);

        //Clear input
        taskInput.value = '';
    }

    e.preventDefault();
}

//Store tasks in local storage
function storeTaskInLocalStorage(task) {
    let tasks;

    //If local storage returns a value of null it is empty so have tasks set to an empty array
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //If local storage already contains tasks then get the values in it
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //Push the new value entered by the user onto the tasks array
    tasks.push(task);

    //Convert the value into a string and set the value with the key of item
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Tasks
function removeTask(e) {

    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove the task from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from local storage
function removeTaskFromLocalStorage(taskItem) {

    let tasks;

    if(localStorage.getItem('tasks') === null) {

        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {

        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
    //taskList.innerHTML = '';

    //Faster way of doing it
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from local storage
    clearTasksFromLocalStorage();
}

//Clear tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent;

            if(item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );

    console.log(text);
}