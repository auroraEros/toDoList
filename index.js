const todoTitle = document.querySelector(".todo-input");
const listForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const filteringTodos = document.querySelector(".filter-todos");
let filterValue = "all";

function addTodo(title) {
  const todo = {
    title,
    createdAt: new Date().toLocaleDateString("fa-IR"),
    id: new Date().getTime(),
    isCompleted: false,
  };

  saveTodo(todo);
  filteredTodos();
}

function createTodos(todos) {
  let html = "";

  todos.forEach((todo) => {
    html += ` <li class="todo">
      <p class="todo__title">${todo.title}</p>
      <span class="todo__createdAt">${todo.createdAt}</span>
      <button class="todo__check"
       data-todo-id=${todo.id}><i class="far fa-check-square ${
      todo.isCompleted && "completed"
    }"></i></button>
      <button class="todo__remove" data-todo-id=${
        todo.id
      }><i class="far fa-trash-alt"></i></button>
     </li>`;
  });

  todoList.innerHTML = html;
  const checkBtns = [...document.querySelectorAll(".todo__check")];
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodos));
  const removeBtns = [...document.querySelectorAll(".todo__remove")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodos));
}

function filteredTodos() {
  const todos = getTodos();
  const uncompletedTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  filterValue === "all" && createTodos(todos);

  filterValue === "completed" && createTodos(completedTodos);

  filterValue === "uncompleted" && createTodos(uncompletedTodos);
}


//getting todos from localStorage
function getTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
}

//Saving todos on localStorage
function saveTodo(todo) {
  const todos = getTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  return todos;
}

function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}



// Events:

// page loading
document.addEventListener("DOMContentLoaded", () => {
  const todos = getTodos();
  createTodos(todos);
});

// adding new todo
listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!todoTitle.value) return;
  addTodo(todoTitle.value);
  todoTitle.value = "";
});

// Checking todos 
function checkTodos(e) {
  const todoId = +e.target.dataset.todoId;
  let todos = getTodos();
  const todo = todos.find((todo) => todo.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos); 
  filteredTodos();
}

// deleting a todo
function removeTodos(e) {
  const todoId = +e.target.dataset.todoId;
  let todos = getTodos();
  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodos(todos); 
  filteredTodos();
}

// filtering todos based on completion
filteringTodos.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filteredTodos();
});


