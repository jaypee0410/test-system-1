document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
            saveTasks();
        } else if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
            const taskElement = e.target;
            const taskIndex = Array.from(taskList.children).indexOf(taskElement);
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const task = tasks[taskIndex];
            if (task) {
                task.completed = taskElement.classList.contains('completed');
                task.finishDate = task.completed ? new Date().toLocaleString() : null;
                saveTasks();
            }
        }
    });

    function addTask(taskText) {
        const currentDate = new Date();
        const dateString = currentDate.toLocaleString();
        const li = document.createElement('li');
        li.textContent = `${taskText} - Added: ${dateString}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }
    

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.firstChild.textContent,
                completed: li.classList.contains('completed'),
                finishDate: li.classList.contains('completed') ? new Date().toLocaleString() : null
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text);
            if (task.completed) {
                taskList.lastChild.classList.add('completed');
            }
        });
    }
});
