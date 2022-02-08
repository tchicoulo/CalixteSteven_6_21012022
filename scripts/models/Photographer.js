export default class Photographer {
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

  //Gallery of pictures
  displayGallery(idPic) {
    const result = `
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

  displaycounter() {
    const counter = document.querySelector(".counter");
  }
}
