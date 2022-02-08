document.addEventListener("DOMContentLoaded", () => {
  const submit = document.querySelector(".add-button");
  const form = document.querySelector("form");
  const read = document.querySelector(".read-book")
  const completed = document.querySelector(".completed-book")

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    addBook();
  });
  form.addEventListener("submit", e => {
    e.preventDefault();
    addBook();
  });

  read.addEventListener("input", e => {
    console.log(e)
  })
  
  
});


loadBook();
