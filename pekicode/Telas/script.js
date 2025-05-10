(() => {
  const sidebar = document.getElementById('sidebar');
  const toggleSidebarBtn = document.getElementById('toggleSidebar');
  const navButtons = sidebar.querySelectorAll('nav button');
  const sections = document.querySelectorAll('main > section');
  const addTaskCard = document.getElementById('addTaskCard');
  const addTaskButton = document.getElementById('addTaskButton');
  const taskTitleInput = document.getElementById('taskTitle');
  const taskDescInput = document.getElementById('taskDesc');
  const taskTypeSelect = document.getElementById('taskType');

  // Containers
  const allContainer = document.getElementById('allTasksContainer');
  const lifetimeContainer = document.getElementById('lifetimeTasksContainer');
  const dailyContainer = document.getElementById('dailyTasksContainer');

  // Tasks array
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Save tasks in localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Create task card element
  function createTaskCard(task, index) {
    const card = document.createElement('article');
    card.className = 'task-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label',
      task.title + ', tipo: ' + (task.type === 'daily' ? 'Diária' : 'Momento da vida') + ', ' + (task.done ? 'Feita' : 'Pendente')
    );

    // Title
    const title = document.createElement('h3');
    title.textContent = task.title;
    card.appendChild(title);

    // Description
    if(task.description) {
      const desc = document.createElement('p');
      desc.textContent = task.description;
      card.appendChild(desc);
    }

    // Label
    const dateLabel = document.createElement('div');
    dateLabel.className = 'date-label';
    dateLabel.textContent = task.type === 'daily' ? 'Diária' : 'Para qualquer momento';
    card.appendChild(dateLabel);

    if(task.done) card.classList.add('done');

    // Buttons container
    const buttonsDiv = document.createElement('div');

    // Done Toggle Button
    const doneBtn = document.createElement('button');
    doneBtn.setAttribute('aria-label', task.done ? 'Marcar como não feita' : 'Marcar como feita');
    doneBtn.title = task.done ? 'Desmarcar' : 'Marcar como feita';
    doneBtn.textContent = task.done ? '✔' : '○';
    buttonsDiv.appendChild(doneBtn);

    doneBtn.addEventListener('click', e => {
      e.stopPropagation();
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.setAttribute('aria-label', 'Editar tarefa');
    editBtn.title = 'Editar';
    editBtn.textContent = '✎';
    buttonsDiv.appendChild(editBtn);

    editBtn.addEventListener('click', e => {
      e.stopPropagation();
      // Preenche inputs para edição
      taskTitleInput.value = tasks[index].title;
      taskDescInput.value = tasks[index].description;
      taskTypeSelect.value = tasks[index].type;
      addTaskCard.dataset.editing = index;
      switchSection('add');
      taskTitleInput.focus();
      addTaskButton.textContent = 'Salvar alteração';
    });

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('aria-label', 'Excluir tarefa');
    deleteBtn.title = 'Excluir';
    deleteBtn.textContent = '🗑';
    buttonsDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (confirm('Tem certeza que quer excluir essa tarefa?')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    });

    card.appendChild(buttonsDiv);

    // Click card toggles done
    card.addEventListener('click', () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tasks[index].done = !tasks[index].done;
        saveTasks();
        renderTasks();
      }
    });

    return card;
  }

  // Render tasks in all containers
  function renderTasks() {
    allContainer.innerHTML = '';
    lifetimeContainer.innerHTML = '';
    dailyContainer.innerHTML = '';

    tasks.forEach((task, idx) => {
      const card = createTaskCard(task, idx);
      allContainer.appendChild(card);
      if(task.type === 'lifetime') lifetimeContainer.appendChild(card.cloneNode(true));
      else if(task.type === 'daily') dailyContainer.appendChild(card.cloneNode(true));
    });
  }

  // Switch between sections
  function switchSection(sectionName) {
    sections.forEach(sec => {
      sec.style.display = (sec.id === 'section-' + sectionName) ? '' : 'none';
    });
    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === sectionName);
    });
    if(sectionName !== 'add') clearAddTaskCard();
  }

  // Clear task creation card inputs and reset editing
  function clearAddTaskCard() {
    taskTitleInput.value = '';
    taskDescInput.value = '';
    taskTypeSelect.value = '';
    addTaskCard.removeAttribute('data-editing');
    addTaskButton.textContent = 'Adicionar tarefa';
  }

  // Add or Save task
  addTaskButton.addEventListener('click', () => {
    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();
    const type = taskTypeSelect.value;

    if (!title) {
      alert('Por favor, insira um título para a tarefa.');
      taskTitleInput.focus();
      return;
    }

    if (!type) {
      alert('Por favor, selecione o tipo da tarefa.');
      taskTypeSelect.focus();
      return;
    }

    if (addTaskCard.hasAttribute('data-editing')) {
      const idx = parseInt(addTaskCard.dataset.editing, 10);
      tasks[idx].title = title;
      tasks[idx].description = description;
      tasks[idx].type = type;
      saveTasks();
      renderTasks();
      clearAddTaskCard();
      switchSection('all');
      return;
    }

    const newTask = { title, description, type, done: false };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    clearAddTaskCard();
    switchSection('all');
  });

  // Sidebar toggle
  toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    const main = document.querySelector('main');
    if (sidebar.classList.contains('hidden')) main.classList.add('fullwidth');
    else main.classList.remove('fullwidth');
  });

  // Navigation buttons
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchSection(btn.dataset.section);
    });
  });

  // Inicialização
  renderTasks();
  switchSection('all');

})();
