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
    taskDiv.id = `tr${tasks.length}`;
    taskDiv.innerHTML = `<td>${task.task}</td>`
    taskDiv.innerHTML += `<td>${task.description}</td>`
    taskDiv.innerHTML += `<td>${task.dueDate}</td>`
    taskDiv.innerHTML += `<td>${task.priority}</td>`
    taskDiv.innerHTML += `<td><input type="checkbox"></td>`;
    taskDiv.innerHTML += `<td><button id="button${tasks.length}">X</button></td>`;
    taskrow.appendChild(taskDiv);
    }

function clearForm() {
    taskInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = '';
  }
    


addTaskButton.addEventListener('click', displayAddTaskForm);
submitButton.addEventListener('click', (e) => {
    addTask();
    displayNewTask(tasks[tasks.length - 1]);
    hideAddTaskForm();
    clearForm();
    e.preventDefault()});
    
