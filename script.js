// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
    createTaskElement(task.text, task.date, task.priority);
  });
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dueDate = document.getElementById("dueDate");
  const prioritySelect = document.getElementById("priority");

  if (!taskInput.value.trim()) return;

  const taskText = taskInput.value;
  const taskDate = dueDate.value;
  const taskPriority = prioritySelect.value;

  createTaskElement(taskText, taskDate, taskPriority);

  // Save to localStorage
  saveTasksToStorage();

  // Clear inputs
  taskInput.value = "";
  dueDate.value = "";
}

function createTaskElement(text, date, priority) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.className = "task-item";

  const textSpan = document.createElement("span");
  textSpan.className = "task-text";
  textSpan.textContent = text;

  const dateSpan = document.createElement("span");
  dateSpan.className = "task-date";
  dateSpan.textContent = date ? new Date(date).toLocaleString() : "No due date";

  const prioritySpan = document.createElement("span");
  prioritySpan.className = `task-priority priority-${priority}`;
  prioritySpan.textContent = priority;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "🗑️";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasksToStorage();
  };

  li.appendChild(textSpan);
  li.appendChild(dateSpan);
  li.appendChild(prioritySpan);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

function saveTasksToStorage() {
  const taskList = document.getElementById("taskList");
  const tasks = [];

  for (let item of taskList.children) {
    const text = item.querySelector('.task-text').textContent;
    const dateText = item.querySelector('.task-date').textContent;
    const priority = item.querySelector('.task-priority').textContent.toLowerCase();

    let originalDate = "";
    const dateObj = new Date(dateText);
    if (!isNaN(dateObj.getTime())) {
      originalDate = dateObj.toISOString().slice(0, 16);
    }

    tasks.push({ text, date: originalDate, priority });
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
