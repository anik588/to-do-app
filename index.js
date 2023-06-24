// taken variables
const inputTodo = document.querySelector("#inputTodo");
const todoSaveButton = document.querySelector("#save");
const todoLists = document.querySelector("#lists");
const messageElement = document.querySelector("#message");
const todoForm = document.querySelector(".todo-form");

// getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};

// addTodo
const addTodo = (event) => {
  event.preventDefault();
  const todoValue = inputTodo.value;

  // unique ID
  const todoId = Date.now().toString();

  createTodo(todoId, todoValue);
  showMessage("Todo is Added!", "success");

  let todos = getTodosFromLocalStorage();
  todos.push({ todoId, todoValue });
  localStorage.setItem("mytodos", JSON.stringify(todos));

  inputTodo.value = "";
};

// createTodo
const createTodo = (todoId, todoValue) => {
  const todoElement = document.createElement("li");
  todoElement.id = todoId;
  todoElement.innerHTML = `<span class="li-style">${todoValue}<button class="dlt-btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>`;

  todoLists.appendChild(todoElement);

  const deleteBtn = todoElement.querySelector("#deleteButton");

  deleteBtn.addEventListener("click", deleteTodo);
};

// showMessage
const showMessage = (text, status) => {
  messageElement.textContent = text;
  messageElement.classList.add(`bg-${status}`);
  setTimeout(() => {
    messageElement.textContent = "";
    messageElement.classList.remove(`bg-${status}`);
  }, 1000);
};

// deleteTodo
const deleteTodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement;
  todoLists.removeChild(selectedTodo);

  showMessage("Todo is Deleted!", "deleted");

  let todos = getTodosFromLocalStorage();
  todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
  localStorage.setItem("mytodos", JSON.stringify(todos));
};

// loadTodos
const loadTodos = () => {
  const todos = getTodosFromLocalStorage();
  todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
};

// adding Listeners
todoForm.addEventListener("submit", addTodo);

window.addEventListener("DOMContentLoaded", loadTodos);
