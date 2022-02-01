import { displayModal, closeModal } from "../utils/contactForm.js";
import Display from "../factories/Display.js";
import GalleryOfPictures from "../factories/GalleryOfPictures.js";

let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPhotograph = JSON.parse(urlParams.get("id"));

async function getJson() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      banner(data.photographers);
      gallery(data.media);
    });
}

function banner(data) {
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

function gallery(data) {
  const buttonSort = document.getElementById("sort");
  const gallery = document.querySelector(".gallery");

  const galleryId = data.filter(
    (idPics) => idPics.photographerId === idPhotograph
  );

  const galleryUser = new GalleryOfPictures(galleryId);

  // Nombre total de likes ////////////
  console.log(galleryId);
  console.log("Total : " + galleryUser.counterOfLikes());

  //Sort by
  buttonSort.addEventListener("change", function (e) {
    switch (e.target.value) {
      case "popularity":
        galleryUser.sortByPopularity();

        gallery.innerHTML = galleryId.map((idPic) =>
          Display.displayGallery(idPic)
        );
        //
        break;
      case "date":
        galleryUser.sortByDate();

        gallery.innerHTML = galleryId.map((idPic) =>
          Display.displayGallery(idPic)
        );
        //
        break;
      case "title":
        galleryUser.sortByTitle();

        gallery.innerHTML = galleryId.map((idPic) => {
          Display.displayGallery(idPic);
        });
        //
        break;
      default:
        console.log(`Out of ${e.target.value}`);
    }
  });

  // Display when page is loaded
  galleryUser.sortByPopularity();
  gallery.innerHTML = galleryId.map((idPic) => {
    const results = Display.displayGallery(idPic);

    const likes = document.querySelector(".likes");
    console.log(likes);

    return results;
  });
}

getJson();
