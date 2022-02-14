import MediasFactory from "../factories/MediasFactory.js";

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
    const result = this._arrayMedias
      .map((media) => {
        return this.displayMedias(media);
      })
      .join("");
    return result;
  }

  //Gallery of pictures
  displayMedias(media) {
    const mediaDOM = new MediasFactory(media);

    const result = `
    <div class="gallery-content">
      ${mediaDOM.display()}
      <div class="gallery-details">
        <h3>${media.title}</h3>
        <div>
        <span class="likes">${media.likes}</span>
        <i class="fas fa-heart"></i>
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
