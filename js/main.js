// Variables
const todoList = document.querySelector(".todo-list")
const formContainer = document.querySelector(".add-task-container")
const addIcon = document.querySelector(".add-icon")
const title = document.querySelector(".title")
const themeIcon = document.querySelector(".theme-icon")
const searchBar = document.querySelector(".search-bar")
const searchIcon = document.querySelector(".search-icon")
const todoInput = document.querySelector(".todo-input")
const categoryInput = document.querySelector("#category")
const form = document.querySelector(".task-form")
const noItem = document.querySelector(".no-item")
// const checkIcon = document.querySelector(".check-icon")

const themeToggle = () => {
    document.body.classList.toggle("light-mode")
    document.body.classList.contains("light-mode") ? themeIcon.textContent = "dark_mode" : themeIcon.textContent = "light_mode";
    saveData()
}

const showHideSearch = () => {
    searchBar.classList.toggle("hide")
    searchBar.classList.contains("hide") ? searchIcon.textContent = "search" : searchIcon.textContent = "close";
}

const showHideForm = () => {
    todoList.classList.toggle("hide")
    formContainer.classList.toggle("hide")

    if (todoList.classList.contains("hide")) {
        addIcon.textContent = "close"
        title.textContent = "Add Todo"
        noItem.classList.remove("active")
    }
    else {
        addIcon.textContent = "add"
        title.textContent = "Todo"
    }
}


// Form validation
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!todoInput.value) {
        alert("Stop young man!")
    }
    else if (!categoryInput.value) {
        alert("Stop young man!")
    }
    else {
        acceptData()
        showHideForm()
        displayTodo()
        resetForm()
        emptyData()
    }
})

let data = []

const emptyData = () => {
    console.log("Data length:", data.length);
    data?.length === 0 ? noItem.classList.add("active") : noItem.classList.remove("active")
}

const acceptData = () => {
    data.unshift({
        todo: todoInput.value,
        category: categoryInput.value,
        completed: false,
    })

    console.log(data)
    emptyData(data);
    saveData()
}

const now = new Date()
const formattedTime = Intl.DateTimeFormat('en-US',
    {
        dateStyle: "full",
        timeStyle: "short"
    }
).format(now)



const displayTodo = () => {
    todoList.innerHTML = ""
    const todos = data.map((item, index) => {
        const { todo, category } = item


        return ` <li class="todo flex-gap" id="${index}">
                    <button class="check-btn" onclick="completeTodo(this)">
                        <span class="material-symbols-rounded circle">
                            circle
                        </span>
                        <span class="material-symbols-rounded check hide">
                            check_circle
                        </span>
                    </button>
                    <div class="flex-1">
                        <p class="big-text">${todo}</p>
                        <p class="small-text">${formattedTime}</p>
                        <p class="small-text mt-1"><span class="group">${category}</span></p>
                    </div>
                    <button class="del-btn" onclick="deleteTodo(this); displayTodo()">
                        <span class="material-symbols-rounded">
                            delete
                        </span>
                    </button>
                </li>`
    }).join("")

    todoList.innerHTML += todos
}

const resetForm = () => {
    todoInput.value = ""
    categoryInput.value = ""
}

const deleteTodo = (e) => {
    const todoId = e.parentElement.id
    e.parentElement.remove()
    data.splice(todoId, 1)
    console.log(data)
    emptyData(data)
    saveData()
}

const completeTodo = (e) => {
    const parent = e.parentElement;
    parent.classList.toggle("completed");
    const todoId = parent.id;
    const todo = data[todoId];
    const checkIcon = parent.querySelector(".check")
    const circleIcon = parent.querySelector(".circle")
    const todoText = parent.querySelector(".big-text")
    const dateText = parent.querySelector(".small-text")
    const delBtn = parent.querySelector(".del-btn")

    if (parent.classList.contains("completed")) {
        todo.completed = true;
        checkIcon.classList.remove("hide")
        circleIcon.classList.add("hide")
        todoText.classList.add("done")
        delBtn.classList.add("done")
        dateText.classList.add("done")
    } else {
        todo.completed = false;
        checkIcon.classList.add("hide")
        circleIcon.classList.remove("hide")
        todoText.classList.remove("done")
        delBtn.classList.remove("done")
        dateText.classList.remove("done")
    }
    console.log(todo.completed)

    saveData();

}



const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(data))
}


(() => {
    data = JSON.parse(localStorage.getItem("todos")) || []
    displayTodo()
    saveData()
    emptyData()

    // const todos = document.querySelectorAll(".todo")


    // todos.forEach((todo) => {
    //     const checkIcon = todo.querySelector(".check-btn")
    //     if (todo.classList.contains("completed")) {
    //         data.completed = true;
    //         checkIcon.innerHTML = "check_circle"
    //     } else {
    //         data.completed = false;
    //         checkIcon.innerHTML = "circle"
    //     }
    // })

    
    
})()

emptyData(data)

