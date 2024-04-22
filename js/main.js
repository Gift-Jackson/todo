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

const themeToggle = () => {
    document.body.classList.toggle("light-mode")
    document.body.classList.contains("light-mode") ? themeIcon.textContent = "dark_mode" : themeIcon.textContent = "light_mode";
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
    }
    else {
        addIcon.textContent = "add"
        title.textContent = "Todo"
    }
}


// Form validation
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!todoInput.value && !categoryInput) {
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
    data?.length === 0 ? noItem.classList.remove("hide") : noItem.classList.add("hide")
}

const acceptData = () => {
    data.unshift({
        todo: todoInput.value,
        category: categoryInput.value,
    })

    console.log(data)
    emptyData();
    saveData()
}

const displayTodo = () => {
    todoList.innerHTML = ""
    const todos = data.map((item, index) => {
        const { todo, category } = item

        return ` <li class="todo flex-gap" id="${index}">
                    <button class="check-btn">
                        <span class="material-symbols-rounded">
                            circle
                        </span>
                    </button>
                    <div class="flex-1">
                        <p class="big-text">${todo}</p>
                        <p class="small-text">Monday 23rd, April, 2024. 10:28pm</p>
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
    emptyData()
    saveData()
}


// localstorage
const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(data))
}

(() => {
    data = JSON.parse(localStorage.getItem("todos")) || []
    displayTodo()
    saveData()
    emptyData()
})()

emptyData()

