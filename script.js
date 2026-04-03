const myLibrary = [];

class Book {
    constructor(title, author, numPages, hasRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.hasRead = hasRead;
        this.id = crypto.randomUUID();
    }

    toggleRead() {
        if (!this.hasRead) {
            this.hasRead = true;
        }
    }
}

function addBookToLibrary(title, author, numPages, hasRead) {
    const book = new Book(title, author, numPages, hasRead);
    myLibrary.push(book);
}

const libraryContainer = document.getElementById("library-container");
const form = document.querySelector("form");
const dialog = document.getElementById("new-book-form");

addBookToLibrary("Hamlet", "William Shakespeare", 324, true);
addBookToLibrary("Green Eggs and Ham", "Dr. Seuss", 32, true);
addBookToLibrary("Game of Thrones", "George R.R. Martin", 674, false);

displayBooks();

function displayBooks() {
    libraryContainer.textContent = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = myLibrary[i].id; //custom tag attribute

        const title = document.createElement("p");
        title.textContent = `Title: ${myLibrary[i].title}`;
        card.appendChild(title);

        const author = document.createElement("p");
        author.textContent = `Author: ${myLibrary[i].author}`;
        card.appendChild(author);

        const id = document.createElement("p");
        id.textContent = `ID: ${myLibrary[i].id}`;
        card.appendChild(id);

        const numPages = document.createElement("p");
        numPages.textContent = `Number of Pages: ${myLibrary[i].numPages}`;
        card.appendChild(numPages);

        const hasRead = document.createElement("p");
        hasRead.textContent = `Has been read: ${myLibrary[i].hasRead}`;
        card.appendChild(hasRead);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove");
        card.appendChild(removeBtn);

        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.textContent = "Toggle Read";
        toggleReadBtn.classList.add("toggleRead");
        card.appendChild(toggleReadBtn)

        libraryContainer.appendChild(card);
    }
}

// if you have a bunch of buttons in a card, you should just add an event listener to the main container and check if it matches. 
// this is called event delegation

libraryContainer.addEventListener("click", e => {
    if (e.target.matches(".remove")) {
        const card = e.target.parentElement;
        const id = card.dataset.id; // custom attribute

        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id === id) {
                myLibrary.splice(i, 1) // starts at i and deletes 1 starting from i so it just deletes the object at i
            }
        }

        displayBooks();
    }
})

libraryContainer.addEventListener("click", e => {
    if (e.target.matches(".toggleRead")) {
        const card = e.target.parentElement;
        const id = card.dataset.id; 

        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id === id) {
                myLibrary[i].toggleRead(); 
            }
        }

        displayBooks();
    }
})

form.addEventListener("submit", e => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const author = e.target.elements.author.value;
    const numPages = e.target.elements.numPages.value;
    const hasRead = e.target.elements.hasRead.value === "true";

    addBookToLibrary(title, author, numPages, hasRead);

    displayBooks();
    
    dialog.close();
})


