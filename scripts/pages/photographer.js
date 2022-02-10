import { displayModal, closeModal } from "../utils/contactForm.js";
import BannerPhotograph from "../templates/BannerPhotograph.js";
import Gallery from "../models/Gallery.js";
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

  // Nombre total de likes ////////////
  console.log(galleryMedias);
  console.log("Total : " + galleryUser.counterOfLikes());

  //Sort by
  buttonSort.addEventListener("change", function (e) {
    switch (e.target.value) {
      case "popularity":
        galleryUser.sortByPopularity();

        gallery.innerHTML = galleryMedias.map((media) =>
          galleryUser.displayGallery(media)
        );
        break;
      case "date":
        galleryUser.sortByDate();

        gallery.innerHTML = galleryMedias.map((media) =>
          galleryUser.displayGallery(media)
        );
        break;
      case "title":
        galleryUser.sortByTitle();

        gallery.innerHTML = galleryMedias.map((media) =>
          galleryUser.displayGallery(media)
        );
        break;
      default:
        console.log(`Out of ${e.target.value}`);
    }
  });

  // Display when page is loaded
  galleryUser.sortByPopularity();
  gallery.innerHTML = galleryUser.displayGallery();

  const likes = document.querySelectorAll(".likes");
  // console.log($likes);
  likes.forEach((like) => {
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
