import { displayModal, closeModal } from "../utils/contactForm.js";
import Display from "../factories/Display.js";
import LightBox from "../factories/LightBox.js";

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
  const buttonSort = document.getElementById("sort");

  buttonSort.addEventListener("change", function (e) {
    switch (e.target.value) {
      case "popularity":
        console.log("Popularity");
        //
        break;
      case "date":
        console.log("Date");
        //
        break;
      case "title":
        console.log("Title");
        //
        break;
    }
  });

  const gallery = document.querySelector(".gallery");
  const galleryId = data.filter(
    (idPics) => idPics.photographerId === idPhotograph
  );

  // //console.log(galleryId);
  // localStorage.setItem("galleryIdStorage", JSON.stringify(galleryId));
  // const getGalleryIdStorage = localStorage.getItem("galleryIdStorage");

  // //console.log(JSON.parse(getGalleryIdStorage));

  const test = new LightBox(galleryId);
  console.log(test.sortByPopularity());

  gallery.innerHTML = galleryId.map((idPic) => Display.displayGallery(idPic));
}

getJson();
