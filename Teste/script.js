(() => {
    // Elementos principais
    const authScreen = document.getElementById('auth-screen');
    const taskScreen = document.getElementById('task-screen');
    const createTaskScreen = document.getElementById('create-task-screen');
    const authForm = document.getElementById('auth-form');
    const authError = document.getElementById('auth-error');

    const taskForm = document.getElementById('task-form');
    const taskError = document.getElementById('task-error');
    const taskCardsContainer = document.getElementById('task-cards-container');
    const taskTypeSelect = document.getElementById('task-type');
    const scheduledDateContainer = document.getElementById('scheduled-date-container');
    const taskDateInput = document.getElementById('task-date');

    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const showAllTasksBtn = document.getElementById('show-all-tasks');
    const showDailyTasksBtn = document.getElementById('show-daily-tasks');
    const showScheduledTasksBtn = document.getElementById('show-scheduled-tasks');
    const showCreateTaskBtn = document.getElementById('show-create-task');
    const logoutBtn = document.getElementById('logout');

    // Usuários e tarefas (simples armazenamento em memória)
    const usersDB = {};
    let loggedInUser = null;
    let tasksDB = {};

    // Estado filtro atual da lista de tarefas
    let currentTaskFilter = 'all';

    // Alternar menu responsivo
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Mostrar campo data se tipo for agendada
    taskTypeSelect.addEventListener('change', () => {
        if (taskTypeSelect.value === 'scheduled') {
            scheduledDateContainer.style.display = 'block';
            taskDateInput.setAttribute('required', 'required');
        } else {
            scheduledDateContainer.style.display = 'none';
            taskDateInput.removeAttribute('required');
            taskDateInput.value = '';
        }
    });

    // Validação simples email
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para esconder todas as seções menos a escolhida
    function showSection(section) {
        authScreen.style.display = 'none';
        taskScreen.style.display = 'none';
        createTaskScreen.style.display = 'none';

        section.style.display = 'block';
        menu.classList.add('hidden');
    }

    // Renderizar tarefas no container
    function renderTasks() {
        if (!loggedInUser) return;
        taskCardsContainer.innerHTML = '';
        const userTasks = tasksDB[loggedInUser] || [];

        let filteredTasks = [];
        switch (currentTaskFilter) {
            case 'all':
                filteredTasks = userTasks;
                break;
            case 'daily':
                filteredTasks = userTasks.filter(t => t.type === 'daily');
                break;
            case 'scheduled':
                filteredTasks = userTasks.filter(t => t.type === 'scheduled');
                break;
        }

        if (filteredTasks.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.textContent = 'Nenhuma tarefa encontrada.';
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.fontWeight = '600';
            emptyMsg.style.color = '#5a4b00';
            taskCardsContainer.appendChild(emptyMsg);
            return;
        }

        filteredTasks.forEach(task => {
            const card = document.createElement('article');
            card.classList.add('task-card');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Tarefa: ${task.title}`);

            const title = document.createElement('h3');
            title.textContent = task.title;

            const description = document.createElement('p');
            description.textContent = task.description;

            const typeBadge = document.createElement('span');
            typeBadge.classList.add('task-type');
            typeBadge.textContent = task.type === 'daily' ? 'Dia-a-Dia' : 'Agendada';

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(typeBadge);

            if (task.type === 'scheduled') {
                const date = document.createElement('span');
                date.classList.add('task-date');
                date.textContent = `Agendada para: ${task.date}`;
                card.appendChild(date);
            }

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('task-actions');

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.setAttribute('aria-label', `Editar tarefa: ${task.title}`);
            editBtn.addEventListener('click', () => editTask(task.id));
            actionsDiv.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.setAttribute('aria-label', `Excluir tarefa: ${task.title}`);
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
            actionsDiv.appendChild(deleteBtn);

            card.appendChild(actionsDiv);

            taskCardsContainer.appendChild(card);
        });
    }

    // Limpar formulário tarefa
    function clearTaskForm() {
        taskForm.reset();
        scheduledDateContainer.style.display = 'none';
        taskDateInput.removeAttribute('required');
    }

    function generateTaskId() {
        return `task_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Variável para controlar se estamos editando:
    let editingTaskId = null;

    // Editar tarefa
    function editTask(taskId) {
        const userTasks = tasksDB[loggedInUser] || [];
        const task = userTasks.find(t => t.id === taskId);
        if (!task) return;

        // Preencher form
        taskForm['task-title'].value = task.title;
        taskForm['task-description'].value = task.description;
        taskForm['task-type'].value = task.type;

        if (task.type === 'scheduled') {
            scheduledDateContainer.style.display = 'block';
            taskDateInput.value = task.date;
            taskDateInput.setAttribute('required', 'required');
        } else {
            scheduledDateContainer.style.display = 'none';
            taskDateInput.removeAttribute('required');
            taskDateInput.value = '';
        }

        editingTaskId = taskId;

        // Mostrar tela criação tarefa
        showSection(createTaskScreen);
        const submitBtn = taskForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Salvar Alterações';
        taskForm['task-title'].focus();
    }

    // Excluir tarefa
    function deleteTask(taskId) {
        if (!confirm('Tem certeza que deseja excluir essa tarefa?')) return;
        let userTasks = tasksDB[loggedInUser] || [];
        tasksDB[loggedInUser] = userTasks.filter(t => t.id !== taskId);
        renderTasks();
    }

    // Manipula submit do form de tarefa (criar ou editar)
    taskForm.addEventListener('submit', e => {
        e.preventDefault();
        taskError.style.display = 'none';
        taskError.textContent = '';

        const title = taskForm['task-title'].value.trim();
        const description = taskForm['task-description'].value.trim();
        const type = taskForm['task-type'].value;
        const date = taskForm['task-date'].value;

        if (!title || !description) {
            taskError.textContent = 'Preencha todos os campos.';
            taskError.style.display = 'block';
            return;
        }
        if (type === 'scheduled' && !date) {
            taskError.textContent = 'Escolha uma data para agendamento.';
            taskError.style.display = 'block';
            return;
        }

        if (!tasksDB[loggedInUser]) {
            tasksDB[loggedInUser] = [];
        }

        if (editingTaskId) {
            // Editar tarefa existente
            const userTasks = tasksDB[loggedInUser];
            const task = userTasks.find(t => t.id === editingTaskId);
            if (task) {
                task.title = title;
                task.description = description;
                task.type = type;
                if (type === 'scheduled') {
                    task.date = date;
                } else {
                    delete task.date;
                }
            }
            editingTaskId = null;
        } else {
            // Criar nova tarefa
            const newTask = {
                id: generateTaskId(),
                title,
                description,
                type
            };
            if (type === 'scheduled') {
                newTask.date = date;
            }
            tasksDB[loggedInUser].push(newTask);
        }

        clearTaskForm();
        // Voltar para lista de tarefas
        showSection(taskScreen);
        renderTasks();
    });

    // Navegação pelo menu
    showAllTasksBtn.addEventListener('click', () => {
        currentTaskFilter = 'all';
        renderTasks();
        showSection(taskScreen);
    });
    showDailyTasksBtn.addEventListener('click', () => {
        currentTaskFilter = 'daily';
        renderTasks();
        showSection(taskScreen);
    });
    showScheduledTasksBtn.addEventListener('click', () => {
        currentTaskFilter = 'scheduled';
        renderTasks();
        showSection(taskScreen);
    });
    showCreateTaskBtn.addEventListener('click', () => {
        editingTaskId = null;
        clearTaskForm();
        const submitBtn = taskForm.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Criar Tarefa';
        showSection(createTaskScreen);
    });

    logoutBtn.addEventListener('click', () => {
        if (confirm('Deseja realmente sair?')) {
            loggedInUser = null;
            tasksDB = {};
            authScreen.style.display = 'block';
            taskScreen.style.display = 'none';
            createTaskScreen.style.display = 'none';
            authForm.reset();
            authError.style.display = 'none';
            authError.textContent = '';
            menu.classList.add('hidden');
        }
    });

    // Autenticação simples (login; se email novo, cadastra automaticamente)
    authForm.addEventListener('submit', e => {
        e.preventDefault();
        authError.style.display = 'none';
        authError.textContent = '';

        const email = authForm['auth-email'].value.trim();
        const password = authForm['auth-password'].value.trim();

        if (!email || !password) {
            authError.textContent = 'Preencha todos os campos.';
            authError.style.display = 'block';
            return;
        }

        if (!isValidEmail(email)) {
            authError.textContent = 'Email inválido.';
            authError.style.display = 'block';
            return;
        }

        if (usersDB[email]) {
            if (usersDB[email] === password) {
                loggedInUser = email;
                authScreen.style.display = 'none';
                showSection(taskScreen);
                renderTasks();
                authForm.reset();
            } else {
                authError.textContent = 'Senha incorreta.';
                authError.style.display = 'block';
            }
        } else {
            usersDB[email] = password;
            tasksDB[email] = [];
            loggedInUser = email;
            authScreen.style.display = 'none';
            showSection(taskScreen);
            renderTasks();
            authForm.reset();
            alert('Conta criada automaticamente e logado.');
        }
    });

    // Botão criar conta exibe alerta informativo
    document.getElementById('create-account-btn').addEventListener('click', () => {
        alert('Para criar conta, basta usar um email e senha não registrados na tela de login. O cadastro será realizado automaticamente.');
    });

    // Inicializa na tela de login
    showSection(authScreen);
})();
