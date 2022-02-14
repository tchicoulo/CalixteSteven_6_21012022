import { displayModal, closeModal } from "../utils/contactForm.js";
import BannerPhotograph from "../templates/BannerPhotograph.js";
import Gallery from "../models/Gallery.js";
import Lightbox from "../models/Lightbox.js";

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
  const photographer = data.filter(
    (photograph) => photograph.id === idPhotograph
  )[0];

  new BannerPhotograph(photographer);

  const btnContact = document.querySelector(".contact_button");
  btnContact.addEventListener("click", displayModal);
}

//Gallery of pictures
function gallery(data) {
  const buttonSort = document.getElementById("sort");
  const gallery = document.querySelector(".gallery");

  const galleryMedias = data.filter(
    (idPics) => idPics.photographerId === idPhotograph
  );

  const galleryUser = new Gallery(galleryMedias);

  //Sort by
  buttonSort.addEventListener("change", function (e) {
    switch (e.target.value) {
      case "popularity":
        galleryUser.sortByPopularity();
        Lightbox.init();
        gallery.innerHTML = galleryUser.displayGallery();
        break;

      case "date":
        galleryUser.sortByDate();
        Lightbox.init();
        gallery.innerHTML = galleryUser.displayGallery();
        break;

      case "title":
        galleryUser.sortByTitle();
        Lightbox.init();
        gallery.innerHTML = galleryUser.displayGallery();
        break;
      default:
        console.log(`Out of ${e.target.value}`);
    }
  });

  // Nombre total de likes ////////////
  console.log("Total : " + galleryUser.counterOfLikes());

  // Display when page is loaded
  galleryUser.sortByPopularity();
  gallery.innerHTML = galleryUser.displayGallery();

  const likesIcons = document.querySelectorAll(".fa-heart");

  likesIcons.forEach((like) => {
    like.addEventListener("click", function (e) {
      if (this.dataset.clicked) {
        delete this.dataset.clicked;

        console.log("-1");
      } else {
        this.dataset.clicked = true;
        console.log("+1");
      }
    });
  });
}

getJson();
