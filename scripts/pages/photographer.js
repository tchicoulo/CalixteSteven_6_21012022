import { displayModal, closeModal } from "../utils/contactForm.js";
import Display from "../factories/Display.js";

let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPhotograph = JSON.parse(urlParams.get("id"));

async function getJson() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      Banner(data.photographers);
      Gallery(data.media);
    });
}

function Banner(data) {
  const photographHeader = document.querySelector(".photograph-header");

  const photographersId = data.filter(
    (photograph) => photograph.id === idPhotograph
  );
  photographersId.map((photographId) => {
    const results = (photographHeader.innerHTML =
      Display.displayBanner(photographId));

    const btnContact = document.querySelector(".contact_button");
    btnContact.addEventListener("click", displayModal);

    return results;
  });
}

function Gallery(data) {
  const gallery = document.querySelector(".gallery");
  const galleryId = data.filter(
    (idPics) => idPics.photographerId === idPhotograph
  );
  console.log(galleryId);
  gallery.innerHTML = galleryId.map(
    (idPic) => `
    <div class="gallery-content">
      <img src="./assets/photographers/${idPic.photographerId}/${idPic.image}" alt="media: ${idPic.title}" /> 
      <div class="gallery-details">
        <h3>${idPic.title}</h3>
        <div>
        <span>${idPic.likes}</span>
        <i class="fas fa-heart likes"></i>
        </div>
      </div>
    </div>
    `
  );
}

getJson();
