// Objects for the selectbox.
const objects = [
    {"id": 1, "data": "Tekst 1"},
    {"id": 2, "data": "Tekst 2"},
    {"id": 3, "data": "Tekst 3"},
    {"id": 4, "data": "Tekst 4"}
]

const numListElements = 4;

const main = document.createElement("main");
const paragraph = document.createElement("p");
const select = document.createElement("select");
const testBtn = document.createElement("button");
const resetBtn = document.createElement("button");
const list = document.createElement("ul");

function addElemets() {
    document.body.innerHTML = null;

    // Adds main to body.
    document.body.appendChild(main);

    // Adds text to paragraph, gives the paragraph a class and adds it to main.
    paragraph.textContent = "Jeg trener på JavaScript";
    paragraph.className = "text";
    main.appendChild(paragraph);

    // Centers the selectbox, gives it a max width of 500px and adds it to main.
    select.style.display = "block";
    select.style.margin = "auto";
    select.style.maxWidth = "500px";
    main.appendChild(select);

    populateSelectBox();

    // Adds event listener to "test" button and adds it to main.
    testBtn.textContent = "Test";
    testBtn.addEventListener("click", alterAndPrintText);
    main.appendChild(testBtn);

    // Adds event listener to "reset" button and adds it to main.
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", populateList);
    main.appendChild(resetBtn);

    populateList();

    // Adds list to main.
    main.appendChild(list);
}

// Removes the first letter of each word, reverses the sentence and prints the text.
function alterAndPrintText() {
    let text = paragraph.textContent;
    const words = text.split(" ");

    // Removes the first character of each word.
    words.forEach((word, index) => {
        words[index] = word.substr(1);
    });
    text = words.join(" ");

    // Reverse the sentence.
    text = text.split("").reverse().join("");

    paragraph.textContent = text;
}

// Populates the selectbox with values from the objects array.
function populateSelectBox() {
    // Removes everything from the select box.
    select.innerHTML = null;

    // Populates the select box with options.
    objects.forEach((obj) => {
        const option = document.createElement("option");
        option.textContent = obj.data;
        option.value = obj.id;
        select.appendChild(option);
    });
}

// Populates the list with list elements.
function populateList() {
    // Removes all the elements from the list.
    list.innerHTML = null;
    
    // Populates the list with 4 list elements.
    for (let i = 0; i < numListElements; i++) {
        const listElement = document.createElement("li");
        listElement.textContent = `Listeelement ${i}`;
        list.appendChild(listElement);

        // Creates a button that is added to the list element.
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => listElement.parentNode.removeChild(listElement));
        listElement.appendChild(deleteBtn);
    }
}

addElemets();