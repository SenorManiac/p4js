const addTaskButton = document.getElementById('addtask');
const inputContainer = document.getElementById('input-container');
const submitButton = document.getElementById('submit-button');
const formid = document.getElementById('task-form');
const taskrow = document.getElementById('tasks');
const tasks = [];
const taskInput = document.getElementById('task');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('dueDate');
const priorityInput = document.getElementById('priority');
const buttonlistener = document.querySelectorAll('button');

function displayAddTaskForm() {
  inputContainer.style.display = 'flex';
}
document.body.addEventListener('click', (event) => {
  if (event.target == inputContainer) {
    console.log(event.target);
   hideAddTaskForm();
  }
});

function hideAddTaskForm() {
  inputContainer.style.display = 'none';
}

class Task {
  constructor(task, description, dueDate, priority, ) {
    this.task = task;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}


function addTask() {  
    let newtask = new Task(taskInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value);
    tasks.push(newtask);
    console.log(tasks);
  }

function displayNewTask(task) {
    const taskDiv = document.createElement('tr');
    taskDiv.id = `tr${tasks.length - 1}`;
    taskDiv.innerHTML = `<td>${task.task}</td>`
    taskDiv.innerHTML += `<td>${task.description}</td>`
    taskDiv.innerHTML += `<td>${task.dueDate}</td>`
    taskDiv.innerHTML += `<td>${task.priority}</td>`
    taskDiv.innerHTML += `<td><input type="checkbox"></td>`;
    taskDiv.innerHTML += `<td><button class ="removebutton" id="button${tasks.length -1}">X</button></td>`;
    taskrow.appendChild(taskDiv);
    }

function clearForm() {
    taskInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = '';
  }

taskrow.addEventListener('click', (e) => {
    if (e.target.className === 'removebutton') {
        const taskRow = e.target.parentElement.parentElement;
        const rowId = taskRow.id;
        const numericPart = rowId.match(/\d+/)[0];
        const rowIndex = Number(numericPart);
        deleteTask(taskRow.id);
    }
});



function updateExistingTaskID() {
    const taskRows = document.querySelectorAll('[id^="tr"]');
    taskRows.forEach((taskDiv, index) => {
        taskDiv.id = `tr${index}`; 
    });
}


function deleteTask(taskId) {
    const numericPart = taskId.match(/\d+/)[0];
    const rowIndex = Number(numericPart);
    tasks.splice(rowIndex, 1);
    document.getElementById(taskId).remove();
    updateExistingTaskID();
}


addTaskButton.addEventListener('click', displayAddTaskForm);
submitButton.addEventListener('click', (e) => {
    addTask();
    displayNewTask(tasks[tasks.length - 1]);
    hideAddTaskForm();
    clearForm();
    e.preventDefault()});
    
