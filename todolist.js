const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const lowPriorityButton = document.getElementById("low");
const mediumPriorityButton = document.getElementById("medium");
const highPriorityButton = document.getElementById("high");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const todoList = document.querySelector(".todo-list");

const TRASH_ICON_WIDTH = 24;
const TRASH_ICON_HEIGHT = 24;

const TaskPriority = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

const TaskColorIndicator = {
  LOW: "white",
  MEDIUM: "#FCFBE4",
  HIGH: "#FFEEEE",
};

let todos = [];

saveButton.disabled = true;

const addTodo = () => {
  const title = titleInput.value;
  const description = descriptionInput.value;
  let priority = TaskPriority.LOW;
  let id = todos.length + 1;

  if (mediumPriorityButton.checked) {
    priority = TaskPriority.MEDIUM;
  } else if (highPriorityButton.checked) {
    priority = TaskPriority.HIGH;
  }

  const todoObject = {
    id,
    title,
    description,
    priority,
    createdAt: new Date(),
    completed: false,
  };

  todos.push(todoObject);
  titleInput.value = "";
  descriptionInput.value = "";
  lowPriorityButton.checked = true;

  renderTodoObjects();
};

const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex >= 0) {
    console.log("INDEX " + todoIndex);
    todos.splice(todoIndex, 1);
  }
  renderTodoObjects();
};

const toggleCompleted = (id) => {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed,
      };
    }
    return todo;
  });
  renderTodoObjects();
};

const renderTodoObjects = () => {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const { id, title, description, priority, createdAt, completed } = todo;

    const todoObject = document.createElement("article");
    todoObject.classList.add("todo-item");
    todoObject.setAttribute("id", id);

    if (priority === TaskPriority.HIGH) {
      todoObject.style.backgroundColor = TaskColorIndicator.HIGH;
      todoObject.style.borderLeftColor = "#BB2B0C";
    } else if (priority === TaskPriority.MEDIUM) {
      todoObject.style.backgroundColor = TaskColorIndicator.MEDIUM;
      todoObject.style.borderLeftColor = "#AAA218";
    } else {
      todoObject.style.backgroundColor = TaskColorIndicator.LOW;
      todoObject.style.borderLeftColor = "green";
    }

    if (completed) {
      
      /* todoObject.style.backgroundColor = "lightgreen"; */
      todoObject.style.textDecoration = "line-through";
      
    }

    const contentEl = document.createElement("div");
    contentEl.classList.add("content-item");

    const overlineEl = document.createElement("div");
    overlineEl.classList.add("overline");
    overlineEl.textContent = `Created: ${createdAt.toLocaleDateString()}`;
    contentEl.appendChild(overlineEl);

    const titleObject = document.createElement("div");
    titleObject.classList.add("title");
    titleObject.style.fontWeight = "bold";
    titleObject.textContent = title;
    contentEl.appendChild(titleObject);

    const descriptionObject = document.createElement("div");
    descriptionObject.classList.add("descr");
    descriptionObject.textContent = description;
    contentEl.appendChild(descriptionObject);

    todoObject.appendChild(contentEl);

    const optionsObject = document.createElement("div");
    optionsObject.classList.add("options-item");

    const trashObject = document.createElement("img");
    trashObject.src = "./img/trash.png";
    trashObject.alt = "Recycle Bin";
    trashObject.width = TRASH_ICON_WIDTH;
    trashObject.height = TRASH_ICON_HEIGHT;
    trashObject.addEventListener(
      "click",
      (function (id) {
        return function () {
          console.log("CLICKED " + id);
          removeTodo(id);
        };
      })(id)
    );
    optionsObject.appendChild(trashObject);

    optionsObject.appendChild(trashObject);

    const checkboxButtonObject = document.createElement("div");
    checkboxButtonObject.classList.add("tick-button");

    const checkboxObject = document.createElement("input");
    checkboxObject.type = "checkbox";
    checkboxObject.checked = completed;
    checkboxObject.addEventListener("change", () => toggleCompleted(id));
    checkboxButtonObject.appendChild(checkboxObject);

    optionsObject.appendChild(checkboxButtonObject);
    todoObject.appendChild(optionsObject);

    todoList.appendChild(todoObject);
  });
};

const updateSaveButton = () => {
  if (titleInput.value && descriptionInput.value) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
};

titleInput.addEventListener("input", updateSaveButton);
descriptionInput.addEventListener("input", updateSaveButton);

saveButton.addEventListener("click", addTodo);
cancelButton.addEventListener("click", () => {
  titleInput.value = "";
  descriptionInput.value = "";
  lowPriorityButton.checked = true;
});

renderTodoObjects();
