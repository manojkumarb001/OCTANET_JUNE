function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    const priorityInput = document.getElementById('priorityInput').value;
    const deadlineInput = document.getElementById('deadlineInput').value;
    const categoryInput = document.getElementById('categoryInput').value;

    if (taskInput === '') {
        alert('Please enter a task');
        return;
    }

    const taskList = document.getElementById(`${categoryInput.toLowerCase()}List`);

    const li = document.createElement('li');
    li.textContent = `${taskInput} (${priorityInput.charAt(0).toUpperCase() + priorityInput.slice(1)}) - ${new Date(deadlineInput).toLocaleString()}`;
    
    li.classList.add(priorityInput);

    
    const deleteIcon = document.createElement('span');
    deleteIcon.textContent = '❌';
    deleteIcon.classList.add('delete-icon');
    deleteIcon.onclick = function() {
        taskList.removeChild(li);
    };

    
    li.appendChild(deleteIcon);
    
     taskList.appendChild(li);

    document.getElementById('taskInput').value = '';
    document.getElementById('priorityInput').value = 'Not_Important';
    document.getElementById('deadlineInput').value = '';
    document.getElementById('categoryInput').value = 'Personal';

     updateDeadline(li, new Date(deadlineInput));
}

function filterTasks() {
    const filterInput = document.getElementById('filterInput').value;
    const taskContainers = document.querySelectorAll('.task-container ul');

    taskContainers.forEach(taskContainer => {
        const tasks = taskContainer.querySelectorAll('li');
        tasks.forEach(task => {
            if (filterInput === 'All' || task.classList.contains(filterInput)) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    });
}

function updateDeadline(taskElement, deadline) {
    const timer = document.createElement('span');
    timer.classList.add('deadline-timer');
    taskElement.appendChild(timer);

    const interval = setInterval(() => {
        const now = new Date();
        const timeRemaining = deadline - now;

        if (timeRemaining <= 0) {
            clearInterval(interval);
            timer.textContent = 'Expired';
            taskElement.style.backgroundColor = '#f44336';  
        } else {
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            timer.textContent = ` - ${hours}h ${minutes}m ${seconds}s remaining`;
        }
    }, 1000);
}
