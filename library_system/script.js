document.addEventListener("DOMContentLoaded", loadBooks);

const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");

bookForm.addEventListener("submit", addBook);

function addBook(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    const book = { title, author, isbn };

    let books = getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));

    displayBook(book);
    bookForm.reset();
}

function displayBook(book) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class="delete">Delete</button></td>
    `;

    row.querySelector(".delete").addEventListener("click", () => {
        deleteBook(book.isbn);
        row.remove();
    });

    bookList.appendChild(row);
}

function loadBooks() {
    getBooks().forEach(displayBook);
}

function getBooks() {
    return localStorage.getItem("books")
        ? JSON.parse(localStorage.getItem("books"))
        : [];
}

function deleteBook(isbn) {
    let books = getBooks();
    books = books.filter(book => book.isbn !== isbn);
    localStorage.setItem("books", JSON.stringify(books));
}
