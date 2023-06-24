
//taken variables
const inputTodo = document.querySelector ("#inputTodo");
const todoSaveButton = document.querySelector ("#save");
const todoLists = document.querySelector ("#lists");
const messegeElement = document.querySelector ("#message");
const todoForm = document.querySelector (".todo-form");


//getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos")
      ? JSON.parse(localStorage.getItem("mytodos"))
      : [];
  };


//addtodo
const addTodo = (event) => {
    event.preventDefault();
const todoValue = inputTodo.value;

//unique ID
const todoId = Date.now().toString();

createTodo(todoId,todoValue);
showMessege("Todo is Added!","success");


const todos = getTodosFromLocalStorage();
todos.push(todoId,todoValue);
localStorage.setItem("mytodos", JSON.stringify(todos));

inputTodo.value="";

};
   
//create Todo
const createTodo=(todoId,todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id=todoId;
    todoElement.innerHTML= `<span class="li-style"> ${todoValue} <button class="dlt-btn" id="deleteButton" >
    <i class="fa fa-trash"></i> </button> </span>`;

    todoLists.appendChild(todoElement);

    const deleteBut = todoElement.querySelector("#deleteButton");
    
    deleteBut.addEventListener("click", deleteTodo);
};


//ShowMessege
const showMessege = (text,status) => {
    messegeElement.textContent = text;
    messegeElement.classList.add(`bg-${status}`);
    setTimeout(()=> {
        messegeElement.textContent="";
        messegeElement.classList.remove(`bg-${status}`);
    },1000);
};

//delete messege

const deleteTodo=(event)=> {
    const selectedTodo = event.target.parentElement.parentElement;
    todoLists.removeChild(selectedTodo);

    showMessege("Todo is Deleted!", "deleted");

    let todos = getTodosFromLocalStorage();
    todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));
    
}; 

//load Todo
const loadTodos =()=> {
    const todos = getTodosFromLocalStorage();
    todos.map((todo)=> createTodo(todo.todoId,todo.todoValue));
}

//adding Listeners
todoForm.addEventListener("submit", addTodo);

window.addEventListener("DOMContentLoaded",loadTodos);

