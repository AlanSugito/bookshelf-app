function addBook() {
  const shelf = document.querySelector(".read");
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const year = document.querySelector("#year");

  const book = createBook(title.value, author.value, year.value, false);
  const data = addBookObject(title.value, author.value, year.value, false);

  book.id = data.id;
  book.classList.add("putted");
  shelf.append(book);
  books.push(data);
  title.value = "";
  author.value = "";
  year.value = "";
  addDataTostorage();
}

function createBook(title, author, year, isCompleted) {
  const book = document.createElement("div");
  const bookDetail = document.createElement("div");
  const bookUtilities = document.createElement("div");
  const buttonContainer = document.createElement("div");

  book.setAttribute("class", "book");
  bookUtilities.setAttribute("class", "book-utilities");
  bookDetail.setAttribute("class", "detail");
  buttonContainer.setAttribute("class", "button-container");

  const bookTitle = document.createElement("h2");
  bookTitle.innerText = title;

  const bookYear = document.createElement("p");
  bookYear.classList.add("year");
  bookYear.innerText = year;

  const bookAuthor = document.createElement("p");
  bookAuthor.classList.add("author");
  bookAuthor.innerText = author;

  bookDetail.append(bookAuthor, bookYear);
  bookUtilities.append(bookDetail, buttonContainer);
  book.append(bookTitle, bookUtilities);

  if (isCompleted) {
    buttonContainer.append(createUndoButton(), createTrashButton());
  } else {
    buttonContainer.append(createCompleteButton(), createTrashButton());
  }

  return book;
}

function createButton(src, event) {
  const button = document.createElement("img");
  button.src = src;

  button.addEventListener("click", (e) => {
    event(e);
  });
  return button;
}

function createCompleteButton() {
  const src = "images/vector/Ellipse-1.svg";
  return createButton(src, (e) => {
    addBookCompleted(e.target.parentElement.parentElement.parentElement);
  });
}
function createTrashButton() {
  const src = "images/vector/Ellipse-3.svg";
  return createButton(src, (e) => {
    removeBook(e.target.parentElement.parentElement.parentElement);
  });
}
function createUndoButton() {
  const src = "images/vector/Ellipse-2.svg";
  return createButton(src, (e) => {
    undoBook(e.target.parentElement.parentElement.parentElement);
  });
}

function addBookCompleted(book) {
  const completed = document.querySelector(".completed");
  const title = book.querySelector(".book h2").innerText;
  const author = book.querySelector(".detail p.author").innerText;
  const year = book.querySelector(".detail p.year").innerText;
  const completedBook = createBook(title, author, year, true);
  const selectedBook = books.find((b) => b.id == book.id);
  completedBook.id = selectedBook.id;
  selectedBook.isCompleted = true;
  completedBook.classList.add("putted");
  completed.append(completedBook);
  book.remove();
  addDataTostorage();
}

function removeBook(book) {
  toggle();
  const index = findBookIndex(book.id);
  books.splice(index, 1);
  book.remove();

  addDataTostorage();
}
function undoBook(book) {
  const previousShelf = document.querySelector(".read");
  const title = book.querySelector(".book h2").innerText;
  const author = book.querySelector(".detail p.author").innerText;
  const year = book.querySelector(".detail p.year").innerText;
  const completedBook = createBook(title, author, year, false);
  const selectedBook = books.find((b) => b.id == book.id);
  completedBook.id = selectedBook.id;
  selectedBook.isCompleted = false;
  completedBook.classList.add("putted");
  previousShelf.append(completedBook);
  book.remove();
  addDataTostorage();
}

function toggle() {
  const modal = document.querySelector(".modal");
  const app = document.querySelector(".app");
  const close = document.querySelector(".modal .close-button");
  modal.classList.toggle("active");
  app.classList.toggle("active");

  close.addEventListener("click", toggle);
}
