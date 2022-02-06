const key = "books";
let books = JSON.parse(localStorage.getItem(key)) || [];
function isStorageAvailible() {
  if (typeof Storage == undefined) {
    alert("Browser anda tidak mendukung local storage");
    return false;
  } else {
    return true;
  }
}

function addDataTostorage() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(key, parsed);
}

function addBookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  };
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) {
      return index;
      index++;
    }
  }
  return -1;
}

function loadBook() {
  const read = document.querySelector(".read");
  const completed = document.querySelector(".completed");

  books.map((book) => {
    const newBook = createBook(
      book.title,
      book.author,
      book.year,
      book.isCompleted
    );
    newBook.id = book.id;

    if (book.isCompleted) {
      completed.append(newBook);
    } else {
      read.append(newBook);
    }
  });
}
