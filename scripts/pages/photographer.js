import { displayModal, closeModal } from "../utils/contactForm.js";
import Photographer from "../models/Photographer.js";
import BannerPhotograph from "../templates/BannerPhotograph.js";
import MediasFactory from "../factories/MediasFactory.js";
import Photo from "../models/Photo.js";
import Video from "../models/Video.js";

let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPhotograph = JSON.parse(urlParams.get("id"));

//close modal
const closeForm = document.querySelector(".close-modal");
closeForm.addEventListener("click", closeModal);

async function getJson() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      banner(data.photographers);
      gallery(data.media);
    });
}

// Banner photograph
function banner(data) {
  const photographersId = data.filter(
    (photograph) => photograph.id === idPhotograph
  );

  photographersId.map((photographId) => {
    const template = new BannerPhotograph(photographId);
    return template.createBannerPhotograph();
  });

  const btnContact = document.querySelector(".contact_button");
  btnContact.addEventListener("click", displayModal);
}

//Gallery of pictures
function gallery(data) {
  const buttonSort = document.getElementById("sort");
  const gallery = document.querySelector(".gallery");

  const galleryId = data.filter(
    (idPics) => idPics.photographerId === idPhotograph
  );

  const galleryUser = new Photographer(galleryId);

  // Nombre total de likes ////////////
  console.log(galleryId);
  console.log("Total : " + galleryUser.counterOfLikes());

  //Sort by
  buttonSort.addEventListener("change", function (e) {
    switch (e.target.value) {
      case "popularity":
        galleryUser.sortByPopularity();

        gallery.innerHTML = galleryId.map((idPic) =>
          galleryUser.displayGallery(idPic)
        );
        break;
      case "date":
        galleryUser.sortByDate();

        gallery.innerHTML = galleryId.map((idPic) =>
          galleryUser.displayGallery(idPic)
        );
        break;
      case "title":
        galleryUser.sortByTitle();

        gallery.innerHTML = galleryId.map((idPic) =>
          galleryUser.displayGallery(idPic)
        );
        break;
      default:
        console.log(`Out of ${e.target.value}`);
    }
  });

  // Display when page is loaded
  galleryUser.sortByPopularity();
  gallery.innerHTML = galleryId.map((idPic) => {
    const results = galleryUser.displayGallery(idPic);

    return results;
  });

  const likes = document.querySelectorAll(".likes");
  // console.log($likes);
  likes.forEach((like) => {
    like.addEventListener("click", function (e) {
      console.log(this);
    });
  });
}

getJson();
