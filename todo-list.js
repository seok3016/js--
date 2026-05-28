const input = document.querySelector(".todo-input");
const button = document.querySelector(".add-btn");
const list = document.querySelector(".todo-list");

let todoArr = [];

if (localStorage.getItem("todos")) {
  todoArr = JSON.parse(localStorage.getItem("todos"));
}
showTodo();
button.addEventListener("click", function () {
  addList();
});
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addList();
  }
});
function addList() {
  let value = input.value.trim();

  if (value === "") {
    alert("할 일을 입력하세요");
    return;
  }

  let todo = {
    text: value,
    done: false,
    id: new Date().getTime(),
  };

  todoArr.push(todo);
  localStorage.setItem("todos", JSON.stringify(todoArr));
  input.value = "";
  showTodo();
}
function showTodo() {
  list.innerHTML = "";

  for (let i = 0; i < todoArr.length; i++) {
    let li = document.createElement("li");

    li.classList.add("todo-item");
    if (todoArr[i].done === true) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${todoArr[i].text}</span>

      <div class="btn-group">
        <button class="check-btn">
          ${todoArr[i].done ? "취소" : "완료"}
        </button>

        <button class="edit-btn">수정</button>

        <button class="remove-btn">삭제</button>
      </div>
    `;

    let checkBtn = li.querySelector(".check-btn");
    checkBtn.addEventListener("click", function () {
      todoArr[i].done = !todoArr[i].done;

      localStorage.setItem("todos", JSON.stringify(todoArr));

      showTodo();
    });

    let editBtn = li.querySelector(".edit-btn");

    editBtn.addEventListener("click", function () {
      let newText = prompt(
        "수정할 내용을 입력하세요",
        todoArr[i].text
      );
      if (newText === null) {
        return;
      }
      newText = newText.trim();

      if (newText === "") {
        alert("내용을 입력하세요");
        return;
      }

      todoArr[i].text = newText;

      localStorage.setItem("todos", JSON.stringify(todoArr));

      showTodo();
    });
    let removeBtn = li.querySelector(".remove-btn");

    removeBtn.addEventListener("click", function () {
      todoArr.splice(i, 1);

      localStorage.setItem("todos", JSON.stringify(todoArr));

      showTodo();
    });
    list.appendChild(li);
  }
}
