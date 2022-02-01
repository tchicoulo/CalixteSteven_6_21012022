function displayModal() {
  const formName = document.querySelector(".form-name");
  formName.innerHTML = `Contactez moi <br> ${localStorage.getItem(
    "namePhotograph"
  )}
  `;
  const modal = document.querySelector(".contact-modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.querySelector(".contact-modal");
  modal.style.display = "none";
}

export { displayModal, closeModal };
