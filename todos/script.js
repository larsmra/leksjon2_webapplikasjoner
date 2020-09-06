// An array of active todos.
const activeTodos = [];

// An array of completed todos.
const completedTodos = [];

const modalBtn = document.getElementById("openModalBtn");
const todoContainer = document.getElementById("todoContainer");
const filter = document.getElementById("filter");
const completedTodosTable = document.getElementById("completedTodosTable");
const overlay = document.getElementById("overlay");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.getElementById("todoForm");
const title = document.getElementById("todoTitle");
const desc = document.getElementById("todoDesc");
const author = document.getElementById("todoAuthor");
const descLengthText = document.getElementById("descLength");

const maxVisibleCards = 3;
const maxDescLength = desc.getAttribute("maxlength");

let todoId = 0;

function openModal() {
    updateDescriptionLength();
    overlay.style.visibility = "visible";
    title.focus();
}

function updateDescriptionLength() {
    descLengthText.textContent = maxDescLength - desc.value.length;
}

function closeModal() {
    // Resets the values of the input fields.
    title.value = null;
    desc.value = null;
    author.value = null;
    overlay.style.visibility = "hidden";
}

function submitTodo(event) {
    event.preventDefault();
    const todo = {"id": todoId++, "title": title.value, "desc": desc.value, "author": author.value};
    activeTodos.push(todo);
    renderCards();
    closeModal();
}

function renderCards() {
    // Clears the todo container.
    todoContainer.innerHTML = null;

    let counter = 0;
    // Renders the todo cards.
    activeTodos.slice().reverse().forEach((todo) => {
        // Only renders the last 3 cards.
        if (counter == maxVisibleCards) {
            return;
        }
        todoContainer.appendChild(createCard(todo));
        counter++;
    });
}

function createCard(todo) {
    const card = document.createElement("section");
    card.className = "todoCard";

    const header = document.createElement("header");
    const h2 = document.createElement("h2");
    h2.textContent = todo.title;
    header.appendChild(h2);

    const p = document.createElement("p");
    p.textContent = todo.desc;

    const btnSection = document.createElement("section");
    btnSection.className = "btnSection";
    const deleteBtn = createButton("Delete", "deleteBtn", () => deleteTodo(todo));
    const completeBtn = createButton("Complete", "completeBtn", () => completeTodo(todo));
    btnSection.appendChild(deleteBtn);
    btnSection.appendChild(completeBtn);

    card.appendChild(header);
    card.appendChild(p);
    card.appendChild(btnSection);

    return card;
}

function createButton(text, className, fn) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.addEventListener("click", fn);
    return button;
}

function deleteTodo(todo) {
    // Retrieves the index of the todo.
    const index = activeTodos.indexOf(todo);
    // Uses the index to remove the todo.
    activeTodos.splice(index, 1);
    renderCards();
}

function completeTodo(todo) {
    // Retrieves the index of the todo.
    const index = activeTodos.indexOf(todo);
    // Uses the index to remove the todo.
    activeTodos.splice(index, 1);
    // Adds date of completion.
    todo["completedDate"] = new Date();
    // Adds todo to array of completed todos.
    completedTodos.push(todo);
    renderCards();
    sortAndRenderTableData();
}

function sortAndRenderTableData() {
    sortCompletedTodos();
    // Clears the table by setting the inner HTML of the table to only be the table header.
    completedTodosTable.innerHTML = completedTodosTable.rows[0].innerHTML;
    // Adds the rows to the table.
    completedTodos.forEach((todo) => {
        const row = createTableRow(todo);
        completedTodosTable.appendChild(row);
    });
}

// Sorts the todos based on either the date of completion or the title, depending on whether the filter checkbox is checked or not.
function sortCompletedTodos() {
    if (filter.checked) {
        completedTodos.sort((a, b) => compareDate(a, b));
    }
    else {
        completedTodos.sort((a, b) => compareTitle(a, b));
    }
}

function compareDate(a, b) {
    return b.completedDate - a.completedDate;
}

function compareTitle(a, b) {
    if (a.title.toUpperCase() > b.title.toUpperCase()) {
        return 1;
    }
    if (a.title.toUpperCase() < b.title.toUpperCase()) {
        return -1;
    }
    return 0;
}

function createTableRow(todo) {
    const row = document.createElement("tr");
    row.appendChild(createTableCell(todo.title));
    row.appendChild(createTableCell(todo.author));
    row.appendChild(createTableCell(todo.desc));
    row.appendChild(createTableCell(formatDateString(todo.completedDate)));
    return row;
}

function createTableCell(value) {
    const cell = document.createElement("td");
    cell.textContent = value;
    return cell;
}

// Formats the date.
function formatDateString(date) {
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString().substr(-2);

    // Adds a 0 in front of the string if the day is only 1 digit.
    if (day.length == 1) {
        day = `0${day}`;
    }

    // Adds a 0 in front of the string if the month is only 1 digit.
    if (month.length == 1) {
        month = `0${month}`;
    }

    return `${day}.${month}.${year}`;
}

// A function that adds some example data to the arrays.
// This function is used to test the application.
function createExampleTodos() {
    // Adds example todos to the completed todos.
    completedTodos.push({"id": todoId++, "title": "Todotitle 1", "desc": "Lorem ipsum ...", "author": "Ola", "completedDate": new Date(2018, 3, 3)});
    completedTodos.push({"id": todoId++, "title": "Todotitle 2", "desc": "Lorem ipsum ...", "author": "Kari", "completedDate": new Date(2019, 4, 4)});

    // Adds example todos to the active todos.
    activeTodos.push({"id": todoId++, "title": "Todotitle 3", "desc": "Lorem ipsum ...", "author": "Ola"});
    activeTodos.push({"id": todoId++, "title": "Todotitle 4", "desc": "Lorem ipsum ...", "author": "Kari"});
}

modalBtn.addEventListener("click", openModal);
filter.addEventListener("click", sortAndRenderTableData);
desc.addEventListener("input", updateDescriptionLength);
form.addEventListener("submit", submitTodo);
cancelBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => {
    if (e.target == overlay) {
        closeModal();
    }
});

createExampleTodos();

renderCards();
sortAndRenderTableData();