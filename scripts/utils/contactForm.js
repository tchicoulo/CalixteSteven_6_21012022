function displayModal() {
  const formName = document.querySelector(".form-name");
  formName.innerHTML = `Contactez moi <br> ${localStorage.getItem(
    "namePhotograph"
  )}`;
  const modal = document.querySelector(".contact-modal");
  modal.classList.add("modalIn");
}

function closeModal() {
  const modal = document.querySelector(".contact-modal");
  modal.classList.add("modalOut");
  setTimeout(() => {
    modal.classList.remove("modalOut");
    modal.classList.remove("modalIn");
  }, 600);
}

export { displayModal, closeModal };
