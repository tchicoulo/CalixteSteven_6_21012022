export default class Display {
  static displayPhotographers(photographer) {
    return `  
    <article>
      <a href="./photographer.html?id=${photographer.id}"><div>
        <img
          src="./assets/photographers/Photographers ID Photos/${
            photographer.portrait
          }"
          alt="Aller sur la page photographe du nom de ${photographer.name}"
        />
        <h2>${photographer.name}</h2>
        </a>
      </div>
      <div class="description">
        <p class= "home-city">
          ${photographer.city}, ${photographer.country}
        </p>
        <p>${photographer.tagline}</p>
        <p class="home-price">${Math.round(photographer.price / 7)}€/heure</p>
      </div>
    </article>
    `;
  }
  static displayBanner(photographId) {
    localStorage.setItem("namePhotograph", photographId.name);

    return `
    <div class='details-photograph'>
      <h1>${photographId.name}</h1>
      <p>${photographId.city}, ${photographId.country}</p>
      <span>${photographId.tagline}</span>
    </div>
    <button class="contact_button">
          Contactez-moi
        </button>
    <img src="assets/photographers/Photographers ID Photos/${photographId.portrait}" alt="portrait de ${photographId.name}" />`;
  }

  static displayGallery(idPic) {
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

  // static displayCounter {

  // }
}
