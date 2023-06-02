var selectedTask = null;

function addTask() {
  var titleInput = document.getElementById("titleInput");
  var descriptionInput = document.getElementById("descriptionInput");
  var taskList = document.getElementById("taskList");

  var title = titleInput.value;
  var description = descriptionInput.value;

  if (title && description) {
    var noTaskMessage = document.getElementById("noTaskMessage");
    noTaskMessage.style.display = "none";

    var task = document.createElement("div");
    task.classList.add("task");

    var titleElement = document.createElement("h3");
    titleElement.textContent = title;
    task.appendChild(titleElement);

    var descriptionElement = document.createElement("p");
    descriptionElement.classList.add("description");
    descriptionElement.innerHTML = truncateText(description, 40);
    if (description.length > 40) {
      descriptionElement.innerHTML += '<span class="expand" onclick="expandDescription(this)">... </span>';
    }
    task.appendChild(descriptionElement);

    var infoButton = document.createElement("button");
    infoButton.innerHTML = '<i class="btn1 fa-solid fa-info"></i>';
    infoButton.classList.add("info-button");
    infoButton.addEventListener("click", function() {
      var actionsElement = task.querySelector(".actions");
      if (actionsElement.style.display === "flex") {
        actionsElement.style.display = "none";
      } else {
        actionsElement.style.display = "flex";
       }
    });
    task.appendChild(infoButton);

    var actionsElement = document.createElement("div");
    actionsElement.classList.add("actions");
    actionsElement.style.display = "none";
    actionsElement.innerHTML = '<button onclick="editTask(this)"><i class="btn1 fa-sharp fa-solid fa-pen"></i></button><button onclick="confirmDeleteTask(this)"><i class="btn1 fa-solid fa-xmark"></i></button>';
    task.appendChild(actionsElement);

    taskList.appendChild(task);

    // Clear input fields
    titleInput.value = "";
    descriptionInput.value = "";

    // Show at most three tasks in a single row
    var tasks = document.querySelectorAll(".task");
    if (tasks.length % 3 === 0) {
      task.classList.add("new-row");
    }
  }
}

function expandDescription(element) {
  var descriptionElement = element.parentNode.previousSibling;
  var descriptionText = descriptionElement.textContent;
  var task = element.parentNode.parentNode;

  if (descriptionElement.classList.contains('expanded')) {
    descriptionElement.classList.remove('expanded');
    descriptionElement.innerHTML = truncateText(descriptionText, 40);
    task.classList.remove('task-expanded');
  } else {
    descriptionElement.classList.add('expanded');
    descriptionElement.innerHTML = descriptionText;
    task.classList.add('task-expanded');
  }
}

function truncateText(text, length) {
  if (text.length > length) {
    return text.slice(0, length) + '... <strong>Read more</strong>';
  }
  return text;
}

function editTask(element) {
  var task = element.parentNode.parentNode;
  var titleElement = task.querySelector("h3");
  var descriptionElement = task.querySelector(".description");
  var addButton = document.getElementById("addButton");
  var updateButton = document.getElementById("updateButton");

  // Update input fields with task details
  document.getElementById("titleInput").value = titleElement.textContent;
  document.getElementById("descriptionInput").value = descriptionElement.textContent;

  // Hide add button and show update button
  addButton.style.display = "none";
  updateButton.style.display = "inline-block";

  // Save the selected task for update
  selectedTask = task;
}

function updateTask() {
  var titleInput = document.getElementById("titleInput");
  var descriptionInput = document.getElementById("descriptionInput");
  var addButton = document.getElementById("addButton");
  var updateButton = document.getElementById("updateButton");

  var title = titleInput.value;
  var description = descriptionInput.value;

  if (title && description && selectedTask) {
    var titleElement = selectedTask.querySelector("h3");
    var descriptionElement = selectedTask.querySelector(".description");

    // Update task details
    titleElement.textContent = title;
    descriptionElement.textContent = description;
    descriptionElement.innerHTML = truncateText(description, 40);
    if (description.length > 40) {
      descriptionElement.innerHTML += '<span class="expand" onclick="expandDescription(this)">...</span>';
    }

    // Clear input fields
    titleInput.value = "";
    descriptionInput.value = "";

    // Show add button and hide update button
    addButton.style.display = "inline-block";
    updateButton.style.display = "none";

    // Clear selected task
    selectedTask = null;
  }
}

function confirmDeleteTask(element) {
  var task = element.parentNode.parentNode;
  var confirmation = window.confirm(" Delete this task?");
  if (confirmation) {
    task.remove();

    var taskList = document.getElementById("taskList");
    var noTaskMessage = document.getElementById("noTaskMessage");

    // Show "NO TASK" message if no tasks are left
    if (taskList.childElementCount === 0) {
      noTaskMessage.style.display = "block";
    }
  }
}
