document.addEventListener("DOMContentLoaded", () => {
  const submit = document.querySelector(".add-button");
  const form = document.querySelector("form");

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    addBook();
  });
  form.addEventListener("submit", e => {
    e.preventDefault();
    addBook();
  });

  
});

loadBook();
