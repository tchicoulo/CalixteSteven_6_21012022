export default class Photographer {
  constructor(arrayMedias = []) {
    this.arrayMedias = arrayMedias;
  }

  displayBanner(photographId) {
    localStorage.setItem("namePhotograph", photographId.name);

    const result = `
    <div class='details-photograph'>
      <h1>${photographId.name}</h1>
      <p>${photographId.city}, ${photographId.country}</p>
      <span>${photographId.tagline}</span>
    </div>
    <button class="contact_button">
          Contactez-moi
        </button>
    <img src="assets/photographers/Photographers ID Photos/${photographId.portrait}" alt="portrait de ${photographId.name}" />`;

    return result;
  }

  sortByPopularity() {
    this.arrayMedias.sort(function (a, b) {
      return b.likes - a.likes;
    });
  }

  sortByDate() {
    this.arrayMedias.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  sortByTitle() {
    this.arrayMedias.sort(function (a, b) {
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
    let total = this.arrayMedias.reduce(function (acc, val) {
      return acc + val.likes;
    }, initialValue);
    return total;
  }
}