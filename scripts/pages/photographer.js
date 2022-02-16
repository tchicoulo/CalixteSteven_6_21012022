import Form from "../utils/contactForm.js";
import BannerPhotograph from "../templates/BannerPhotograph.js";
import Gallery from "../models/Gallery.js";
import Lightbox from "../models/Lightbox.js";

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

// Banner photograph
function banner(data) {
  //find photograph with Id
  const photographer = data.filter(
    (photograph) => photograph.id === idPhotograph
  )[0];

  //Save price of the photograph per hours
  localStorage.setItem("prix/heure", Math.round(photographer.price / 7));

  new BannerPhotograph(photographer);

  const btnContact = document.querySelector(".contact_button");
  btnContact.addEventListener("click", Form.displayModal);
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
  // console.log("Total : " + galleryUser.counterOfLikes());
  const totalLikes = galleryUser.counterOfLikes();

  // Display when page is loaded
  galleryUser.sortByPopularity();
  gallery.innerHTML = galleryUser.displayGallery();

  const heartIcons = document.querySelectorAll(".fa-heart");

  addLike(heartIcons, totalLikes);
}

function addLike(heartIcons, totalLikes) {
  heartIcons.forEach((heart) => {
    heart.addEventListener("click", function (e) {
      const like = heart.parentElement.querySelector(".likes");
      let countLike = parseInt(like.textContent);

      if (this.dataset.clicked) {
        delete this.dataset.clicked;
        countLike--;
        totalLikes--;

        console.log("-1");
      } else {
        this.dataset.clicked = true;
        console.log("+1");
        countLike++;
        totalLikes++;
      }
      like.textContent = countLike;
      console.log(totalLikes);
    });
  });
}

function counterDisplay() {
  const counter = document.querySelector(".counter");
  // counter.innerHTML =
}

counterDisplay();
getJson();
