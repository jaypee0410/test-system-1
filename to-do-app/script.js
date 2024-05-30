document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    let dragged = null;

    // Load tasks from local storage
    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
            sortTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
            saveTasks();
        } else if (e.target.tagName === 'LI' && !e.target.classList.contains('priority-button')) {
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

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text, task.priority);
            const taskElement = taskList.lastChild;
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskElement.querySelector('span').textContent += ` - Added: ${task.addedDate}`;
            if (task.finishDate) {
                taskElement.querySelector('span').textContent += ` - Finished: ${task.finishDate}`;
            }
        });
        sortTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent.split(' - Added: ')[0],
                completed: li.classList.contains('completed'),
                addedDate: li.querySelector('span').textContent.split(' - Added: ')[1],
                finishDate: li.classList.contains('completed') ? new Date().toLocaleString() : null,
                priority: li.dataset.priority
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function sortTasks() {
        const tasksArray = Array.from(taskList.children);
        tasksArray.sort((a, b) => b.dataset.priority - a.dataset.priority);
        tasksArray.forEach(task => taskList.appendChild(task));
    }


    function addTask(taskText, taskPriority = 0) {
        const currentDate = new Date();
        const dateString = currentDate.toLocaleString();
    
        const li = document.createElement('li');
        li.dataset.priority = taskPriority;
        li.setAttribute('draggable', true);
    
        const hamburger = document.createElement('span');
        hamburger.textContent = '≡';
        hamburger.classList.add('hamburger');
    
        const priorityButton = document.createElement('button');
        priorityButton.textContent = 'Priority';
        priorityButton.classList.add('priority-button');
        priorityButton.addEventListener('click', () => {
            taskPriority = (taskPriority + 1) % 3;
            li.dataset.priority = taskPriority;
            saveTasks();
            sortTasks();
        });
    
        const taskContent = document.createElement('span');
        taskContent.textContent = `${taskText} - Added: ${dateString}`;
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
    
        li.appendChild(hamburger);
        li.appendChild(priorityButton);
        li.appendChild(taskContent);
        li.appendChild(deleteButton);
    
        taskList.appendChild(li);
    
        addDragAndDropHandlers(li);
    }

    function addDragAndDropHandlers(taskElement) {
        taskElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', null); // For Firefox compatibility
            dragged = taskElement;
            taskElement.style.opacity = '0.5';
            taskElement.classList.add('task-moving');
        });
    
        taskElement.addEventListener('dragend', () => {
            dragged.style.opacity = '1';
            dragged.classList.remove('task-moving');
            dragged = null;
            saveTasks();
        });
    
        taskElement.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
    
        taskElement.addEventListener('dragenter', (e) => {
            if (e.target.tagName === 'LI' && e.target !== dragged) {
                e.target.style.borderTop = '2px solid #000';
            }
        });
    
        taskElement.addEventListener('dragleave', (e) => {
            if (e.target.tagName === 'LI' && e.target !== dragged) {
                e.target.style.borderTop = '';
            }
        });
    
        taskElement.addEventListener('drop', (e) => {
            e.stopPropagation();
            if (e.target.tagName === 'LI' && e.target !== dragged) {
                e.target.style.borderTop = '';
                taskList.insertBefore(dragged, e.target.nextSibling);
                saveTasks();
            }
        });
    }
    

});
