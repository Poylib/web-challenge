const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('.todo-input');
const toDoList = document.getElementById('todo-list');

const TODOS_KEY = "todos";

let toDosArray = [];

toDoForm.addEventListener("submit", handleToDoSubmit);

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text : newTodo,
    id : Date.now()
  };
  toDosArray.push(newTodoObj);
  paintToDo(newTodoObj);
  saveTodos();
}

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDosArray));
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button =document.createElement("button");
  li.id = newTodo.id;
  span.innerText = newTodo.text;
  button.innerText = "✔️"
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  button.classList.add('toDoButton');
  toDoList.appendChild(li);
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDosArray = toDosArray.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
}