import MediasFactory from "../factories/MediasFactory.js";

/**
 * Objet contenant les medias de l'id sélectionné
 * @property {object} arrayMedias
 */

export default class Gallery {
  constructor(arrayMedias) {
    this._arrayMedias = arrayMedias;
  }

  sortByPopularity() {
    this._arrayMedias.sort(function (a, b) {
      return b.likes - a.likes;
    });
  }

  sortByDate() {
    this._arrayMedias.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  sortByTitle() {
    this._arrayMedias.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  }

  displayGallery() {
    const gallery = document.querySelector(".gallery");

    gallery.innerHTML = this._arrayMedias
      .map((media) => {
        return this.displayMedias(media);
      })
      .join("");
    gallery
      .querySelectorAll(".fa-heart")
      .forEach((heart) => heart.addEventListener("click", (e) => this.like(e)));
    return gallery;
  }

  like(e) {
    //Search Balise with number of likes
    let likeSelector = e.path[1].querySelector(".likes");

    let likeContent = parseInt(likeSelector.innerText);

    // Total likes in localStorage
    let totalLikes = localStorage.getItem("totalLikes");
    totalLikes = parseInt(totalLikes);

    if (e.target.dataset.clicked) {
      delete e.target.dataset.clicked;
      likeContent--;
      likeSelector.textContent = likeContent;
      totalLikes = localStorage.setItem("totalLikes", totalLikes - 1);

      Gallery.counterDisplay();
    } else {
      e.target.dataset.clicked = true;
      likeContent++;
      likeSelector.textContent = likeContent;
      totalLikes = localStorage.setItem("totalLikes", totalLikes + 1);

      Gallery.counterDisplay();
    }
  }

  static counterDisplay() {
    const counter = document.querySelector(".counter");

    counter.innerHTML = `
      <div class="container">
        <span class="total">${localStorage.getItem("totalLikes")}</span>
        <img src="./assets/icons/heart.svg" alt="Icon of likes" />
      </div>
      <span class="price">${localStorage.getItem("prix/heure")}€/heure</span>`;
  }

  //Gallery of medias
  displayMedias(media) {
    const mediaDOM = new MediasFactory(media);

    const result = `
    <div class="gallery-content">
      ${mediaDOM.display()}
      <div class="gallery-details">
        <h3>${media.title}</h3>
        <div>
        <span class="likes">${media.likes}</span>
        <i class="fas fa-heart" aria-label="likes"></i>  
        </div>
      </div>
    </div>
    `;

    return result;
  }

  //total of likes
  counterOfLikes() {
    let initialValue = 0;
    let total = this._arrayMedias.reduce(function (acc, val) {
      return acc + val.likes;
    }, initialValue);
    return total;
  }
}
