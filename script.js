async function loadTasks() {
    const response = await fetch('tasks.php');
    const data = await response.json();
    const tasksContainer = document.getElementById('to-do');
    tasksContainer.innerHTML = '';

    data.tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('flex', 'items-center', 'mb-4');
        taskElement.innerHTML = `
            <div class="bg-gray-200 p-3 rounded w-full">
                <span>${task.title}</span>
            </div>
        `;
        tasksContainer.appendChild(taskElement);
    });
}

async function addTask() {
    const taskTitle = document.getElementById('new-task').value;
    if (!taskTitle) {
        alert('Please enter a task');
        return;
    }

    const response = await fetch('tasks.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: taskTitle }),
    });

    if (response.ok) {
        loadTasks();
    } else {
        alert('Error adding task');
    }

    document.getElementById('new-task').value = ''; 
}

const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
}


window.onload = loadTasks();
