const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Carregar tarefas salvas ao iniciar
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';

  if (tasks.length === 0) {
    const message = document.createElement('li');

    message.textContent = 'Nenhuma tarefa cadastrada.';
    message.className = 'empty-message';

    list.appendChild(message);

    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    li.className = `todo-item ${task.completed ? 'completed' : ''}`;

    const span = document.createElement('span');

    span.textContent = task.text;

    span.addEventListener('click', () => toggleTask(index));

    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Excluir';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click', () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();

  const text = input.value.trim();

  if (text !== '') {
    tasks.push({
      text,
      completed: false
    });

    input.value = '';

    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;

  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);

  saveTasks();
  renderTasks();
}

form.addEventListener('submit', addTask);

// Renderização inicial
renderTasks();