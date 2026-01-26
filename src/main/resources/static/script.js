// script.js
const API_URL = "http://localhost:8080";

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
});

// 1. GET: Fetch all tasks
async function loadTodos() {
    const response = await fetch(API_URL + "/");
    const todos = await response.json();
    
    const list = document.getElementById("todoList");
    list.innerHTML = ""; // Clear current list

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.dataset.id = todo.id; // Store ID for later usage

        // Add class if completed (for styling)
        if (todo.completed) {
            li.classList.add("completed");
        }

        // Create the HTML structure for each task
        li.innerHTML = `
            <span onclick="toggleTodo(${todo.id}, ${todo.completed}, '${todo.title}')" 
                  style="cursor: pointer; text-decoration: ${todo.completed ? 'line-through' : 'none'}; color: ${todo.completed ? '#888' : 'inherit'};">
                ${todo.title}
            </span>
            <button onclick="deleteTodo(${todo.id})" style="background-color: #cf6679; color: white; margin-left: 10px;">
                X
            </button>
        `;
        list.appendChild(li);
    });
}

// 2. POST: Add a new task
async function addTodo() {
    const input = document.getElementById("todoInput");
    const title = input.value;
    if (!title) return;

    await fetch(API_URL + "/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, completed: false })
    });

    input.value = "";
    loadTodos();
}

// 3. DELETE: Remove a task
async function deleteTodo(id) {
    await fetch(API_URL + "/" + id, {
        method: "DELETE"
    });
    loadTodos();
}

// 4. PUT: Toggle completed status
async function toggleTodo(id, currentStatus, title) {
    await fetch(API_URL + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            title: title, 
            completed: !currentStatus // Flip the status (true -> false, false -> true)
        })
    });
    loadTodos();
}