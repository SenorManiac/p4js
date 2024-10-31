const inputContainer = document.getElementById('input-container');
const submitButton = document.getElementById('submit-button');
const taskInput = document.getElementById('task');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('dueDate');
const priorityInput = document.getElementById('priority');
let taskIndex = 0;

// Array to hold all projects, each containing its own task list
let projects = [
  {
    projectId: 1,
    projectName: 'Project 1',
    tasks: []
  }
];

function saveProjectsToLocal() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function loadProjectsFromLocal() {
  const storedProjects = localStorage.getItem('projects');
  if (storedProjects) {
    projects = JSON.parse(storedProjects);
    renderProjects(); // Render only once at page load
  }
}

function renderProjects() {
  const container = document.getElementById('container');
  container.innerHTML = `
    <h1>What to do!</h1>
    <div id="input-container">
      <form id="task-form">
        <label for="task">Task</label>
        <input type="text" id="task" placeholder="Add a task..." required>
        <label for="dueDate">Due Date</label>
        <input type="date" id="dueDate" required>
        <label for="description">Description</label>
        <input type="text" id="description" placeholder="Task description" required>
        <label for="priority">Priority</label>
        <select id="priority" name="priority" required>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" id="submit-button">Add Task</button>
      </form>
    </div>
  `;

  projects.forEach((project, projectIndex) => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project_container');

    projectDiv.innerHTML = `
      <div class="project_title">
        <div class="projectName">
          <h2>${project.projectName}</h2>
          <button class="editproject"><i style="font-size:20px" class="fa">&#xf040;</i></button>
        </div>
        <div class="projectbuttons">
          <button class="removeproject">x</button>
          <button class="addtask" data-index="${projectIndex}">+</button>
          <button class="projectcollapse">&#9660;</button>
        </div>
      </div>
      <div class="tasks_container_show">
        <table>
          <thead>
            <tr>
              <th>Task</th><th>Due Date</th><th>Description</th>
              <th>Priority</th><th>Done</th><th>Remove</th>
            </tr>
          </thead>
          <tbody class="tasks"></tbody>
        </table>
      </div>
    `;

    container.appendChild(projectDiv);

    const taskContainer = projectDiv.querySelector('.tasks');
    project.tasks.forEach(task => {
      displayNewTask(projectIndex, task, taskContainer);
    });
    loadDoneTasks();
  });

  // Add the "Add Project" button
  const addProjectDiv = document.createElement('div');
  addProjectDiv.classList.add('addprojectdiv');
  addProjectDiv.innerHTML = `<button class="addproject">Add Project</button>`;
  container.appendChild(addProjectDiv);
}

function displayAddTaskForm(e) {
  if (e.target.classList.contains('addtask')) {
    const inputContainer = document.getElementById('input-container');
    inputContainer.style.display = 'block'; // Show the modal
    const projectIndex = parseInt(e.target.dataset.index, 10);    
    inputContainer.dataset.projectIndex = projectIndex;
    taskIndex = projectIndex;
    console.log('Modal opened for project index:', taskIndex);
  }
}

function hideAddTaskForm() {
  const inputContainer = document.getElementById('input-container');

  inputContainer.style.display = 'none'; // Hide the modal
}

function clearForm() {
  const taskInput = document.getElementById('task');
  const descriptionInput = document.getElementById('description');
  const dueDateInput = document.getElementById('dueDate');
  const priorityInput = document.getElementById('priority');
  taskInput.value = '';
  descriptionInput.value = '';
  dueDateInput.value = '';
  priorityInput.value = '';
}

function addTask(projectIndex) {
  const taskInput = document.getElementById('task');
  const descriptionInput = document.getElementById('description');
  const dueDateInput = document.getElementById('dueDate');
  const priorityInput = document.getElementById('priority');
  
  if (!taskInput.value || !descriptionInput.value || !dueDateInput.value || !priorityInput.value) {
    alert('Please fill out all fields');
    return;
  }
  const newTask = {
    id: projects[projectIndex].tasks.length,
    task: taskInput.value,
    description: descriptionInput.value,
    dueDate: dueDateInput.value,
    priority: priorityInput.value,
    done: false
  };
  console.log('Adding new task:', taskInput.value);
  projects[projectIndex].tasks.push(newTask);
  saveProjectsToLocal();

  // Display the new task in the corresponding project
  const taskContainer = document.querySelectorAll('.tasks')[projectIndex];
  displayNewTask(projectIndex, newTask, taskContainer);

  hideAddTaskForm(); // Only close the modal after adding the task
  clearForm(); // Clear the form
}

function displayNewTask(projectIndex, task, taskContainer) {
  const taskDiv = document.createElement('tr');
  taskDiv.id = `tr${task.id}`;
  taskDiv.innerHTML = `
    <td>${task.task}</td>
    <td>${task.dueDate}</td>
    <td>${task.description}</td>
    <td>${task.priority}</td>
    <td><input type="checkbox"></td>
    <td><button class="removebutton">x</button></td>
  `;
  taskContainer.appendChild(taskDiv);
}

function removeTask(e) {
  if (e.target.classList.contains('removebutton')) {
    const taskRow = e.target.parentElement.parentElement;
    const projectIndex = Array.from(document.getElementsByClassName('tasks')).indexOf(taskRow.parentElement);
    deleteTask(taskRow.id, projectIndex);
  }
}

function deleteTask(taskId, projectIndex) {
  const numericPart = taskId.match(/\d+/)[0];
  const rowIndex = Number(numericPart);

  projects[projectIndex].tasks.splice(rowIndex, 1);
  document.getElementById(taskId).remove();
  updateExistingTaskID(projectIndex);
  saveProjectsToLocal();
}

function updateExistingTaskID(projectIndex) {
  const taskRows = document.querySelectorAll('.tasks')[projectIndex].querySelectorAll('[id^="tr"]');
  taskRows.forEach((taskDiv, index) => {
    taskDiv.id = `tr${index}`;
  });
}

function toggleProject(e) {
  const parent = e.target.closest('.project_container');
  if (e.target.classList.contains('projectcollapse')) {
    const taskContainer = parent.querySelector('.tasks_container_show');
    taskContainer.classList.toggle('hide');
  }
}

function newProject() {
  projects.push({
    projectId: projects.length + 1,
    projectName: `Project ${projects.length + 1}`,
    tasks: []
  });
  saveProjectsToLocal();
  renderProjects(); // Re-render projects to include the new project
}
function hideProject(){
  const project = document.querySelectorAll('.tasks_container_show');
  for (let i = 0; i < project.length; i++){
      if(project[i].classList.contains('hide') == true){
          project[i].style.display = 'none';}
      else if(project[i].classList.contains('hide') == false){
          project[i].style.display = 'block';}
  }
}

function removeProject(e) {
 
    const projectIndex = Array.from(document.getElementsByClassName('project_container')).indexOf(e.target.parentElement.parentElement);
    projects.splice(projectIndex, 1);
    saveProjectsToLocal();
    renderProjects();
  
}

function taskDone(e) {
  if (e.target.type === 'checkbox') {
    const taskRow = e.target.parentElement.parentElement;
    const projectIndex = Array.from(document.getElementsByClassName('tasks')).indexOf(taskRow.parentElement);
    const taskIndex = Array.from(taskRow.parentElement.children).indexOf(taskRow);
    projects[projectIndex].tasks[taskIndex].done = e.target.checked;
    e.target.checked ? taskRow.classList.add('done') : taskRow.classList.remove('done');
    saveProjectsToLocal();
  }
}

function loadDoneTasks() {
  const doneTasks = projects.map(project => project.tasks.filter(task => task.done));
  for (let i = 0; i < doneTasks.length; i++) {
    doneTasks[i].forEach(task => {
      const taskRow = document.getElementById(`tr${task.id}`);
      taskRow.classList.add('done');
      taskRow.querySelector('input[type="checkbox"]').checked = true;
    });
  }
}

function editProject(e) {
  if (e.target.classList.contains('editproject')) {
    const projectIndex = Array.from(document.getElementsByClassName('project_container')).indexOf(e.target.parentElement.parentElement.parentElement);
    const projectTitleElement = e.target.closest('.project_title').querySelector('h2');
    const currentProjectName = projectTitleElement.textContent;
    projectTitleElement.innerHTML = `<input type="text" value="${currentProjectName}" class="edit-project-name">`;
    
    const inputElement = projectTitleElement.querySelector('.edit-project-name');
    inputElement.focus();
    inputElement.addEventListener('blur', () => {
      const newProjectName = inputElement.value.trim();
      if (newProjectName) {
        projects[projectIndex].projectName = newProjectName;
        saveProjectsToLocal();
        renderProjects();
      } else {
        projectTitleElement.textContent = currentProjectName; // Revert back to the original name
      }
    });
    if (newProjectName) {
      projects[projectIndex].projectName = newProjectName;
      saveProjectsToLocal();
      renderProjects();
    }
  }
}

document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('addtask')) {
    clearForm();
    displayAddTaskForm(e);
  } else if (e.target.id === submitButton.id) {
    console.log('Adding task to project index:', taskIndex);
    console.log('Task:', taskInput.value);
    addTask(taskIndex);
    e.preventDefault();
  } else if (e.target.classList.contains('addproject')) {
    newProject();
  } else if (e.target.classList.contains('removebutton')) {
    removeTask(e);
  } else if (e.target.classList.contains('projectcollapse')) {
    toggleProject(e);
    hideProject();
  }else if (e.target  == document.getElementById('input-container')){
    hideAddTaskForm();
  }else if (e.target.classList.contains('removeproject')) {
    removeProject(e);
  }else if (e.target.type === 'checkbox') {
    taskDone(e);
  }else if (e.target.classList.contains('editproject')) {
    editProject(e);
  }

});


document.addEventListener('DOMContentLoaded', () => {
  loadProjectsFromLocal(); // Load projects from local storage on page load
  loadDoneTasks();
});
