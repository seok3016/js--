// script.js

const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

renderTodo();

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", function(e){
  if(e.key === "Enter"){
    addTodo();
  }
});

function addTodo(){

  const text = todoInput.value;

  if(text === ""){
    alert("입력하세요");
    return;
  }

  const todo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(todo);

  saveTodo();
  renderTodo();

  todoInput.value = "";
}

function renderTodo(){

  todoList.innerHTML = "";

  todos.forEach(function(todo){

    const li = document.createElement("li");

    li.classList.add("todo-item");

    if(todo.completed){
      li.classList.add("completed");
    }

    li.innerHTML = `
      ${todo.text}

      <button class="complete-btn">
        완료
      </button>

      <button class="delete-btn">
        삭제
      </button>
    `;

    const completeBtn = li.querySelector(".complete-btn");

    completeBtn.addEventListener("click", function(){

      todo.completed = !todo.completed;

      saveTodo();
      renderTodo();
    });

    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function(){

      todos = todos.filter(function(item){
        return item.id !== todo.id;
      });

      saveTodo();
      renderTodo();
    });

    todoList.appendChild(li);

  });
}

function saveTodo(){
  localStorage.setItem("todos", JSON.stringify(todos));
}